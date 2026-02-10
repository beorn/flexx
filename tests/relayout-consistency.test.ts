/**
 * Re-layout Consistency Tests
 *
 * Tests that re-layout of partially-dirty trees produces identical results
 * to fresh layout of the same tree. Uses a differential oracle pattern:
 * build tree → layout → mark dirty → re-layout → compare against fresh layout.
 *
 * Bug classes caught:
 * 1. measureNode overwriting layout.width/height on clean nodes (km-10mat)
 * 2. NaN cache sentinel: resetLayoutCache used NaN to "invalidate" entries,
 *    but NaN is a legitimate "unconstrained" query — Object.is(NaN,NaN)===true
 *    caused false cache hits returning stale computed values (km-frod5)
 * 3. Fingerprint mismatch with parent override: auto-sized children get NaN
 *    as availableWidth from parent, but parent overrides layout after layoutNode
 *    returns (flex shrinkage). When shrinkage changes between passes, the stale
 *    overridden value is preserved because NaN===NaN fingerprint matches (km-frod5)
 *
 * Run: bun vitest run vendor/beorn-flexx/tests/relayout-consistency.test.ts
 */

import { describe, expect, it } from "vitest"
import {
  ALIGN_FLEX_START,
  DIRECTION_LTR,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_ROW,
  MEASURE_MODE_AT_MOST,
  MEASURE_MODE_EXACTLY,
  Node,
} from "../src/index.js"

// ============================================================================
// Helpers
// ============================================================================

interface LayoutResult {
  left: number
  top: number
  width: number
  height: number
  children: LayoutResult[]
}

function getLayout(node: Node): LayoutResult {
  return {
    left: node.getComputedLeft(),
    top: node.getComputedTop(),
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
    children: Array.from({ length: node.getChildCount() }, (_, i) =>
      getLayout(node.getChild(i)!),
    ),
  }
}

function formatLayout(layout: LayoutResult, indent = 0): string {
  const pad = "  ".repeat(indent)
  let result = `${pad}{ left: ${layout.left}, top: ${layout.top}, width: ${layout.width}, height: ${layout.height} }`
  if (layout.children.length > 0) {
    result += ` [\n${layout.children.map((c) => formatLayout(c, indent + 1)).join(",\n")}\n${pad}]`
  }
  return result
}

/**
 * Wrapping text measure function factory.
 * Simulates text of given width that wraps to multiple lines when constrained.
 */
function textMeasure(textWidth: number) {
  return (
    width: number,
    widthMode: number,
    _height: number,
    _heightMode: number,
  ) => {
    if (
      widthMode === MEASURE_MODE_EXACTLY ||
      widthMode === MEASURE_MODE_AT_MOST
    ) {
      if (width >= textWidth) return { width: textWidth, height: 1 }
      const lines = Math.ceil(textWidth / width)
      return { width: Math.min(textWidth, width), height: lines }
    }
    return { width: textWidth, height: 1 }
  }
}

interface BuildTreeResult {
  root: Node
  dirtyTargets: Node[]
}

/**
 * Collect node-by-node diffs between two layout trees.
 * Returns empty array if layouts match.
 */
function diffLayouts(
  a: LayoutResult,
  b: LayoutResult,
  path = "root",
): string[] {
  const diffs: string[] = []
  // Use Object.is for NaN-safe comparison (NaN === NaN is false, Object.is(NaN, NaN) is true)
  if (!Object.is(a.left, b.left)) diffs.push(`${path}: left ${a.left} vs ${b.left}`)
  if (!Object.is(a.top, b.top)) diffs.push(`${path}: top ${a.top} vs ${b.top}`)
  if (!Object.is(a.width, b.width))
    diffs.push(`${path}: width ${a.width} vs ${b.width}`)
  if (!Object.is(a.height, b.height))
    diffs.push(`${path}: height ${a.height} vs ${b.height}`)
  for (let i = 0; i < Math.max(a.children.length, b.children.length); i++) {
    if (a.children[i] && b.children[i]) {
      diffs.push(...diffLayouts(a.children[i]!, b.children[i]!, `${path}[${i}]`))
    } else if (a.children[i]) {
      diffs.push(`${path}[${i}]: missing in incremental`)
    } else {
      diffs.push(`${path}[${i}]: missing in reference`)
    }
  }
  return diffs
}

/**
 * Differential oracle: re-layout of partially-dirty tree must match fresh layout.
 * On failure, provides detailed node-by-node diff for debugging.
 */
function expectRelayoutMatchesFresh(
  buildTree: () => BuildTreeResult,
  layoutWidth: number,
  layoutHeight: number,
): void {
  // 1. Build, layout, mark dirty, re-layout
  const { root, dirtyTargets } = buildTree()
  root.calculateLayout(layoutWidth, layoutHeight, DIRECTION_LTR)
  for (const t of dirtyTargets) t.markDirty()
  root.calculateLayout(layoutWidth, layoutHeight, DIRECTION_LTR)
  const incremental = getLayout(root)

  // 2. Build identical fresh tree, layout once
  const fresh = buildTree()
  fresh.root.calculateLayout(layoutWidth, layoutHeight, DIRECTION_LTR)
  const reference = getLayout(fresh.root)

  // 3. Must be identical — show detailed diff on failure
  const diffs = diffLayouts(reference, incremental)
  if (diffs.length > 0) {
    const detail = diffs.map((d) => `  ${d}`).join("\n")
    expect.unreachable(
      `Incremental layout differs from fresh (${diffs.length} diffs):\n${detail}\n\nFresh:\n${formatLayout(reference)}\n\nIncremental:\n${formatLayout(incremental)}`,
    )
  }
}

/**
 * Assert that laying out twice with identical constraints produces identical results.
 * Catches non-determinism or state corruption from a single layout pass.
 */
function expectIdempotent(
  buildTree: () => BuildTreeResult,
  layoutWidth: number,
  layoutHeight: number,
): void {
  const { root } = buildTree()
  root.calculateLayout(layoutWidth, layoutHeight, DIRECTION_LTR)
  const first = getLayout(root)
  root.calculateLayout(layoutWidth, layoutHeight, DIRECTION_LTR)
  const second = getLayout(root)

  const diffs = diffLayouts(first, second)
  if (diffs.length > 0) {
    const detail = diffs.map((d) => `  ${d}`).join("\n")
    expect.unreachable(
      `Layout not idempotent (${diffs.length} diffs after 2nd pass):\n${detail}`,
    )
  }
}

/**
 * Assert that layout at width W, then different width W', then back to W
 * produces the same result as fresh layout at W.
 * Catches stale cache entries that don't update on constraint change.
 */
function expectResizeRoundTrip(
  buildTree: () => BuildTreeResult,
  widths: number[],
): void {
  const { root } = buildTree()
  for (const w of widths) {
    root.setWidth(w)
    root.calculateLayout(w, NaN, DIRECTION_LTR)
  }
  const incremental = getLayout(root)

  // Fresh reference at final width
  const finalWidth = widths[widths.length - 1]!
  const fresh = buildTree()
  fresh.root.setWidth(finalWidth)
  fresh.root.calculateLayout(finalWidth, NaN, DIRECTION_LTR)
  const reference = getLayout(fresh.root)

  const diffs = diffLayouts(reference, incremental)
  if (diffs.length > 0) {
    const detail = diffs.map((d) => `  ${d}`).join("\n")
    expect.unreachable(
      `Resize round-trip differs (widths: ${widths.join("→")}, ${diffs.length} diffs):\n${detail}`,
    )
  }
}

/**
 * Asserts all layout values are non-negative and width is finite.
 * Height may be NaN for auto-height trees with unconstrained height.
 * (Children CAN legitimately overflow parents in flexbox when they have
 * explicit sizes or min constraints, so we only check basic sanity.)
 */
function assertLayoutSanity(node: Node): void {
  const w = node.getComputedWidth()
  const h = node.getComputedHeight()
  const l = node.getComputedLeft()
  const t = node.getComputedTop()

  expect(w).toBeGreaterThanOrEqual(0)
  expect(Number.isFinite(w)).toBe(true)
  expect(Number.isFinite(l)).toBe(true)
  // Height and top may be NaN for unconstrained auto-height trees
  if (Number.isFinite(h)) {
    expect(h).toBeGreaterThanOrEqual(0)
  }
  if (Number.isFinite(t)) {
    expect(t).toBeGreaterThanOrEqual(0)
  }

  for (let i = 0; i < node.getChildCount(); i++) {
    assertLayoutSanity(node.getChild(i)!)
  }
}

// Mulberry32 seeded RNG (from differential-fuzz.fuzz.ts)
function createRng(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ============================================================================
// Group 1: Re-layout Consistency (targeted scenarios)
// ============================================================================

describe("Re-layout Consistency: targeted scenarios", () => {
  it("partial dirty: text sibling preserves height", () => {
    // The exact km-10mat bug: row with fixed child + wrapping text,
    // mark only fixed child dirty.
    function buildTree(): BuildTreeResult {
      const root = Node.create()
      root.setWidth(40)

      const row = Node.create()
      row.setFlexDirection(FLEX_DIRECTION_ROW)
      root.insertChild(row, 0)

      const fixed = Node.create()
      fixed.setWidth(10)
      fixed.setHeight(1)
      row.insertChild(fixed, 0)

      const flex = Node.create()
      flex.setFlexGrow(1)
      flex.setFlexShrink(1)
      flex.setMeasureFunc(textMeasure(50))
      row.insertChild(flex, 1)

      return { root, dirtyTargets: [fixed] }
    }

    expectRelayoutMatchesFresh(buildTree, 40, NaN)
  })

  it("partial dirty: bordered card structure", () => {
    // Real-world inkx card: border > row > prefix(fixed) + content(flexGrow>text)
    // Mark prefix dirty.
    function buildTree(): BuildTreeResult {
      const root = Node.create()
      root.setWidth(40)

      const bordered = Node.create()
      bordered.setBorder(0, 1) // left
      bordered.setBorder(1, 1) // top
      bordered.setBorder(2, 1) // right
      bordered.setBorder(3, 1) // bottom
      bordered.setPadding(2, 1) // paddingRight
      root.insertChild(bordered, 0)

      const row = Node.create()
      row.setFlexDirection(FLEX_DIRECTION_ROW)
      bordered.insertChild(row, 0)

      const prefix = Node.create()
      prefix.setWidth(3)
      prefix.setFlexShrink(0)
      row.insertChild(prefix, 0)

      const prefixText = Node.create()
      prefixText.setMeasureFunc(textMeasure(3))
      prefix.insertChild(prefixText, 0)

      const content = Node.create()
      content.setFlexGrow(1)
      content.setFlexShrink(1)
      row.insertChild(content, 1)

      const contentText = Node.create()
      contentText.setMeasureFunc(textMeasure(50))
      content.insertChild(contentText, 0)

      return { root, dirtyTargets: [prefix] }
    }

    expectRelayoutMatchesFresh(buildTree, 40, NaN)
  })

  it("partial dirty: deep tree, dirty leaf, clean wrapping sibling", () => {
    // 3+ nesting levels, dirty node far from the text node
    function buildTree(): BuildTreeResult {
      const root = Node.create()
      root.setWidth(60)

      const level1 = Node.create()
      level1.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.insertChild(level1, 0)

      const level2a = Node.create()
      level2a.setFlexDirection(FLEX_DIRECTION_ROW)
      level1.insertChild(level2a, 0)

      const deepFixed = Node.create()
      deepFixed.setWidth(8)
      deepFixed.setHeight(1)
      level2a.insertChild(deepFixed, 0)

      const deepFlex = Node.create()
      deepFlex.setFlexGrow(1)
      deepFlex.setFlexShrink(1)
      deepFlex.setMeasureFunc(textMeasure(80))
      level2a.insertChild(deepFlex, 1)

      const level2b = Node.create()
      level2b.setFlexDirection(FLEX_DIRECTION_ROW)
      level1.insertChild(level2b, 1)

      const leaf = Node.create()
      leaf.setWidth(15)
      leaf.setHeight(2)
      level2b.insertChild(leaf, 0)

      return { root, dirtyTargets: [leaf] }
    }

    expectRelayoutMatchesFresh(buildTree, 60, NaN)
  })

  it("content change: dirty measure node gets correct new height", () => {
    // Change text width via closure, mark dirty, verify re-measurement works
    let currentTextWidth = 30

    const root = Node.create()
    root.setWidth(40)

    const row = Node.create()
    row.setFlexDirection(FLEX_DIRECTION_ROW)
    root.insertChild(row, 0)

    const flex = Node.create()
    flex.setFlexGrow(1)
    flex.setMeasureFunc((w, wm, h, hm) => {
      if (
        wm === MEASURE_MODE_EXACTLY ||
        wm === MEASURE_MODE_AT_MOST
      ) {
        if (w >= currentTextWidth) return { width: currentTextWidth, height: 1 }
        return {
          width: Math.min(currentTextWidth, w),
          height: Math.ceil(currentTextWidth / w),
        }
      }
      return { width: currentTextWidth, height: 1 }
    })
    row.insertChild(flex, 0)

    // Initial layout — text fits in 1 line
    root.calculateLayout(40, NaN, DIRECTION_LTR)
    expect(flex.getComputedHeight()).toBe(1)

    // Change text to 80 chars — should wrap to 2 lines
    currentTextWidth = 80
    flex.markDirty()
    root.calculateLayout(40, NaN, DIRECTION_LTR)
    expect(flex.getComputedHeight()).toBe(2)
    expect(row.getComputedHeight()).toBe(2)
  })

  it("multiple dirty nodes in kanban-like structure", () => {
    function buildTree(): BuildTreeResult {
      const root = Node.create()
      root.setWidth(80)
      root.setFlexDirection(FLEX_DIRECTION_ROW)

      const dirtyTargets: Node[] = []

      for (let col = 0; col < 3; col++) {
        const column = Node.create()
        column.setFlexGrow(1)
        column.setFlexDirection(FLEX_DIRECTION_COLUMN)
        root.insertChild(column, col)

        for (let card = 0; card < 4; card++) {
          const cardNode = Node.create()
          cardNode.setBorder(0, 1)
          cardNode.setBorder(1, 1)
          cardNode.setBorder(2, 1)
          cardNode.setBorder(3, 1)
          column.insertChild(cardNode, card)

          const row = Node.create()
          row.setFlexDirection(FLEX_DIRECTION_ROW)
          cardNode.insertChild(row, 0)

          const prefix = Node.create()
          prefix.setWidth(3)
          prefix.setHeight(1)
          row.insertChild(prefix, 0)

          const text = Node.create()
          text.setFlexGrow(1)
          text.setFlexShrink(1)
          text.setMeasureFunc(textMeasure(20 + card * 10))
          row.insertChild(text, 1)

          // Scatter dirty marks across columns
          if ((col + card) % 3 === 0) {
            dirtyTargets.push(prefix)
          }
        }
      }

      return { root, dirtyTargets }
    }

    expectRelayoutMatchesFresh(buildTree, 80, NaN)
  })

  it("tree mutation: insert child then re-layout", () => {
    const root = Node.create()
    root.setWidth(40)
    root.setFlexDirection(FLEX_DIRECTION_COLUMN)

    const child1 = Node.create()
    child1.setHeight(3)
    root.insertChild(child1, 0)

    const child2 = Node.create()
    child2.setFlexDirection(FLEX_DIRECTION_ROW)
    root.insertChild(child2, 1)

    const text = Node.create()
    text.setFlexGrow(1)
    text.setMeasureFunc(textMeasure(60))
    child2.insertChild(text, 0)

    // Initial layout
    root.calculateLayout(40, NaN, DIRECTION_LTR)
    const beforeChild2Height = child2.getComputedHeight()

    // Insert new child — triggers markDirty internally
    const child3 = Node.create()
    child3.setHeight(5)
    root.insertChild(child3, 2)

    // Re-layout
    root.calculateLayout(40, NaN, DIRECTION_LTR)

    // Existing siblings should retain their dimensions
    expect(child1.getComputedHeight()).toBe(3)
    expect(child2.getComputedHeight()).toBe(beforeChild2Height)
    expect(child3.getComputedHeight()).toBe(5)
  })
})

// ============================================================================
// Group 2: measureNode Isolation (white-box invariant)
// ============================================================================

describe("Re-layout Consistency: measureNode invariant", () => {
  it("layout.width/height unchanged for clean nodes after re-layout", () => {
    const root = Node.create()
    root.setWidth(40)

    const row = Node.create()
    row.setFlexDirection(FLEX_DIRECTION_ROW)
    root.insertChild(row, 0)

    const fixed = Node.create()
    fixed.setWidth(10)
    fixed.setHeight(1)
    row.insertChild(fixed, 0)

    const flex = Node.create()
    flex.setFlexGrow(1)
    flex.setFlexShrink(1)
    flex.setMeasureFunc(textMeasure(50))
    row.insertChild(flex, 1)

    // Initial layout
    root.calculateLayout(40, NaN, DIRECTION_LTR)

    // Record dimensions of every node
    const before = {
      root: { w: root.getComputedWidth(), h: root.getComputedHeight() },
      row: { w: row.getComputedWidth(), h: row.getComputedHeight() },
      fixed: { w: fixed.getComputedWidth(), h: fixed.getComputedHeight() },
      flex: { w: flex.getComputedWidth(), h: flex.getComputedHeight() },
    }

    // Mark only fixed dirty (nothing actually changed)
    fixed.markDirty()
    root.calculateLayout(40, NaN, DIRECTION_LTR)

    // All dimensions must be identical
    expect(root.getComputedWidth()).toBe(before.root.w)
    expect(root.getComputedHeight()).toBe(before.root.h)
    expect(row.getComputedWidth()).toBe(before.row.w)
    expect(row.getComputedHeight()).toBe(before.row.h)
    expect(fixed.getComputedWidth()).toBe(before.fixed.w)
    expect(fixed.getComputedHeight()).toBe(before.fixed.h)
    expect(flex.getComputedWidth()).toBe(before.flex.w)
    expect(flex.getComputedHeight()).toBe(before.flex.h)
  })
})

// ============================================================================
// Group 3: Snapshot Regression
// ============================================================================

describe("Re-layout Consistency: snapshot regression", () => {
  it("idempotency: layout twice with no changes", () => {
    const root = Node.create()
    root.setWidth(40)

    const bordered = Node.create()
    bordered.setBorder(0, 1)
    bordered.setBorder(1, 1)
    bordered.setBorder(2, 1)
    bordered.setBorder(3, 1)
    bordered.setPadding(2, 1)
    root.insertChild(bordered, 0)

    const row = Node.create()
    row.setFlexDirection(FLEX_DIRECTION_ROW)
    bordered.insertChild(row, 0)

    const prefix = Node.create()
    prefix.setWidth(3)
    prefix.setFlexShrink(0)
    row.insertChild(prefix, 0)

    const prefixText = Node.create()
    prefixText.setMeasureFunc(textMeasure(3))
    prefix.insertChild(prefixText, 0)

    const content = Node.create()
    content.setFlexGrow(1)
    content.setFlexShrink(1)
    row.insertChild(content, 1)

    const contentText = Node.create()
    contentText.setMeasureFunc(textMeasure(50))
    content.insertChild(contentText, 0)

    // Layout once
    root.calculateLayout(40, NaN, DIRECTION_LTR)
    const first = getLayout(root)

    // Layout again — identical constraints, no dirty marking
    root.calculateLayout(40, NaN, DIRECTION_LTR)
    const second = getLayout(root)

    expect(first).toEqual(second)
  })

  it("card tree geometry locked down", () => {
    // Exact expected dimensions for the km-10mat card structure
    const root = Node.create()
    root.setWidth(40)

    const bordered = Node.create()
    bordered.setBorder(0, 1) // left
    bordered.setBorder(1, 1) // top
    bordered.setBorder(2, 1) // right
    bordered.setBorder(3, 1) // bottom
    bordered.setPadding(2, 1) // paddingRight
    root.insertChild(bordered, 0)

    const row = Node.create()
    row.setFlexDirection(FLEX_DIRECTION_ROW)
    bordered.insertChild(row, 0)

    const prefix = Node.create()
    prefix.setWidth(3)
    prefix.setFlexShrink(0)
    row.insertChild(prefix, 0)

    const prefixText = Node.create()
    prefixText.setMeasureFunc(textMeasure(3))
    prefix.insertChild(prefixText, 0)

    const content = Node.create()
    content.setFlexGrow(1)
    content.setFlexShrink(1)
    row.insertChild(content, 1)

    const contentText = Node.create()
    contentText.setMeasureFunc(textMeasure(50))
    content.insertChild(contentText, 0)

    // Initial layout
    root.calculateLayout(40, NaN, DIRECTION_LTR)

    // Content area: 40 - 1(left border) - 1(right border) - 1(paddingRight) = 37
    // Row width: 37
    // prefix: 3, content: 37 - 3 = 34
    // text: 50 chars at 34 wide → ceil(50/34) = 2 lines
    expect(contentText.getComputedWidth()).toBe(34)
    expect(contentText.getComputedHeight()).toBe(2)
    expect(content.getComputedWidth()).toBe(34)
    expect(content.getComputedHeight()).toBe(2)
    expect(row.getComputedWidth()).toBe(37)
    expect(row.getComputedHeight()).toBe(2)
    // bordered: row(2) + top(1) + bottom(1) = 4
    expect(bordered.getComputedWidth()).toBe(40)
    expect(bordered.getComputedHeight()).toBe(4)

    // Now mark prefix dirty and re-layout — should be identical
    prefix.markDirty()
    root.calculateLayout(40, NaN, DIRECTION_LTR)

    expect(contentText.getComputedWidth()).toBe(34)
    expect(contentText.getComputedHeight()).toBe(2)
    expect(content.getComputedWidth()).toBe(34)
    expect(content.getComputedHeight()).toBe(2)
    expect(row.getComputedHeight()).toBe(2)
    expect(bordered.getComputedHeight()).toBe(4)
  })
})

// ============================================================================
// Group 4: Resize Stability
// ============================================================================

describe("Re-layout Consistency: resize stability", () => {
  it("resize sweep: layout at W, resize to W', back to W", () => {
    const root = Node.create()
    root.setWidth(80)

    const bordered = Node.create()
    bordered.setBorder(0, 1)
    bordered.setBorder(1, 1)
    bordered.setBorder(2, 1)
    bordered.setBorder(3, 1)
    root.insertChild(bordered, 0)

    const row = Node.create()
    row.setFlexDirection(FLEX_DIRECTION_ROW)
    bordered.insertChild(row, 0)

    const prefix = Node.create()
    prefix.setWidth(3)
    prefix.setFlexShrink(0)
    row.insertChild(prefix, 0)

    const prefixText = Node.create()
    prefixText.setMeasureFunc(textMeasure(3))
    prefix.insertChild(prefixText, 0)

    const content = Node.create()
    content.setFlexGrow(1)
    content.setFlexShrink(1)
    row.insertChild(content, 1)

    const contentText = Node.create()
    contentText.setMeasureFunc(textMeasure(50))
    content.insertChild(contentText, 0)

    // Layout at 80
    root.calculateLayout(80, NaN, DIRECTION_LTR)
    const layout80 = getLayout(root)

    // Resize to 60
    root.setWidth(60)
    root.calculateLayout(60, NaN, DIRECTION_LTR)

    // Resize back to 80
    root.setWidth(80)
    root.calculateLayout(80, NaN, DIRECTION_LTR)
    const layout80Again = getLayout(root)

    // Must match the initial layout at 80
    expect(layout80Again).toEqual(layout80)
  })

  it("column direction: measure function height constrained by parent", () => {
    // km-flexx.measure-height regression: in column layouts, measure func
    // height should be constrained by parent main axis size
    const root = Node.create()
    root.setWidth(40)
    root.setHeight(10)
    root.setFlexDirection(FLEX_DIRECTION_COLUMN)

    const child = Node.create()
    child.setMeasureFunc((_w, wm, _h, hm) => {
      // Return a large height — should be constrained
      if (
        wm === MEASURE_MODE_EXACTLY ||
        wm === MEASURE_MODE_AT_MOST
      ) {
        const w = Math.min(40, _w)
        if (
          hm === MEASURE_MODE_EXACTLY ||
          hm === MEASURE_MODE_AT_MOST
        ) {
          return { width: w, height: Math.min(20, _h) }
        }
        return { width: w, height: 20 }
      }
      return { width: 40, height: 20 }
    })
    root.insertChild(child, 0)

    root.calculateLayout(40, 10, DIRECTION_LTR)

    // Child height should not exceed parent height
    expect(child.getComputedHeight()).toBeLessThanOrEqual(10)
  })
})

// ============================================================================
// Group 5: Fuzz — Re-layout vs Fresh
// ============================================================================

function buildRandomTree(
  rng: () => number,
): () => BuildTreeResult {
    // Capture the seed state by building a spec first, then replaying
    const nodeCount = 3 + Math.floor(rng() * 8)
    const specs: Array<{
      width?: number
      height?: number
      flexGrow?: number
      flexShrink?: number
      hasMeasure: boolean
      measureWidth: number
      isBordered: boolean
      flexDirection: number
      children: number[] // indices of children
    }> = []

    // Generate flat-ish spec
    for (let i = 0; i < nodeCount; i++) {
      const isLeaf = i >= nodeCount / 2
      const hasMeasure = isLeaf && rng() < 0.4
      specs.push({
        width: !hasMeasure && rng() < 0.5 ? 5 + Math.floor(rng() * 20) : undefined,
        height: !hasMeasure && rng() < 0.3 ? 1 + Math.floor(rng() * 5) : undefined,
        flexGrow: rng() < 0.4 ? 1 : undefined,
        flexShrink: rng() < 0.3 ? 1 : undefined,
        hasMeasure,
        measureWidth: 10 + Math.floor(rng() * 60),
        isBordered: !isLeaf && rng() < 0.2,
        flexDirection: rng() < 0.5 ? FLEX_DIRECTION_ROW : FLEX_DIRECTION_COLUMN,
        children: [],
      })
    }

    // Build parent-child relationships (simple: each non-root attaches to a random earlier node)
    for (let i = 1; i < nodeCount; i++) {
      const parentIdx = Math.floor(rng() * i)
      // Don't attach children to measure nodes
      if (!specs[parentIdx]!.hasMeasure) {
        specs[parentIdx]!.children.push(i)
      } else {
        // Attach to root instead
        specs[0]!.children.push(i)
      }
    }

    // Pick random dirty targets (1-3 non-root nodes)
    const dirtyCount = 1 + Math.floor(rng() * 3)
    const dirtyIndices: number[] = []
    for (let d = 0; d < dirtyCount && d < nodeCount - 1; d++) {
      const idx = 1 + Math.floor(rng() * (nodeCount - 1))
      if (!dirtyIndices.includes(idx)) dirtyIndices.push(idx)
    }

    return function buildTree(): BuildTreeResult {
      const nodes: Node[] = []
      const dirtyTargets: Node[] = []

      for (let i = 0; i < nodeCount; i++) {
        const spec = specs[i]!
        const node = Node.create()
        if (i === 0) {
          node.setWidth(80)
          node.setFlexDirection(spec.flexDirection)
        } else {
          if (spec.width !== undefined) node.setWidth(spec.width)
          if (spec.height !== undefined) node.setHeight(spec.height)
          if (spec.flexGrow !== undefined) node.setFlexGrow(spec.flexGrow)
          if (spec.flexShrink !== undefined) node.setFlexShrink(spec.flexShrink)
          node.setFlexDirection(spec.flexDirection)
        }
        if (spec.isBordered) {
          node.setBorder(0, 1)
          node.setBorder(1, 1)
          node.setBorder(2, 1)
          node.setBorder(3, 1)
        }
        if (spec.hasMeasure) {
          node.setMeasureFunc(textMeasure(spec.measureWidth))
        }
        nodes.push(node)

        if (dirtyIndices.includes(i)) {
          dirtyTargets.push(node)
        }
      }

      // Wire parent-child
      for (let i = 0; i < nodeCount; i++) {
        const spec = specs[i]!
        for (let c = 0; c < spec.children.length; c++) {
          nodes[i]!.insertChild(nodes[spec.children[c]!]!, c)
        }
      }

      return { root: nodes[0]!, dirtyTargets }
    }
  }

describe("Re-layout Consistency: fuzz", () => {
  for (let seed = 0; seed < 500; seed++) {
    it(`seed=${seed}: re-layout matches fresh`, () => {
      const rng = createRng(seed * 997 + 42)
      const buildTree = buildRandomTree(rng)
      expectRelayoutMatchesFresh(buildTree, 80, NaN)
    })
  }

  it("structural invariant: layout values are finite and non-negative after re-layout", () => {
    for (let seed = 0; seed < 50; seed++) {
      const rng = createRng(seed * 1009 + 7)
      const buildTree = buildRandomTree(rng)
      const { root, dirtyTargets } = buildTree()
      root.calculateLayout(80, NaN, DIRECTION_LTR)
      for (const t of dirtyTargets) t.markDirty()
      root.calculateLayout(80, NaN, DIRECTION_LTR)
      assertLayoutSanity(root)
    }
  })
})

describe("Fuzz: cache invalidation stress", () => {
  // Targeted test for the resetLayoutCache NaN sentinel bug:
  // Layout caches use NaN as "unconstrained" dimension. If cache invalidation
  // also uses NaN, getCachedLayout(NaN, NaN) falsely matches invalidated entries,
  // returning stale computed values from a previous pass with different constraints.
  //
  // Tests re-layout at multiple root widths using the SAME node tree to exercise
  // cache rotation: entries from width=W1 must not leak into width=W2 queries.
  for (let seed = 0; seed < 100; seed++) {
    it(`seed=${seed}: re-layout on same tree at different widths`, () => {
      const rng = createRng(seed * 1013 + 73)
      const buildTree = buildRandomTree(rng)

      // Build a SINGLE tree and re-layout at multiple widths
      const { root, dirtyTargets } = buildTree()
      const widths = [60, 80, 100, 80] // include a return to 80 to test round-trip

      for (const w of widths) {
        root.setWidth(w)
        root.calculateLayout(w, NaN, DIRECTION_LTR)
        const incremental = getLayout(root)

        // Fresh reference at same width
        const fresh = buildTree()
        fresh.root.setWidth(w)
        fresh.root.calculateLayout(w, NaN, DIRECTION_LTR)
        const reference = getLayout(fresh.root)

        expect(incremental).toEqual(reference)
      }

      // Also test: mark dirty + re-layout at final width
      for (const t of dirtyTargets) t.markDirty()
      root.calculateLayout(80, NaN, DIRECTION_LTR)
      const incremental = getLayout(root)

      const fresh = buildTree()
      fresh.root.calculateLayout(80, NaN, DIRECTION_LTR)
      const reference = getLayout(fresh.root)

      expect(incremental).toEqual(reference)
    })
  }
})

// ============================================================================
// Group 6: Idempotency — layout twice with no changes
// ============================================================================

describe("Fuzz: idempotency", () => {
  // Layout the same tree twice with identical constraints. The second pass
  // should produce bit-identical results. Catches non-determinism from
  // uninitialized state or cache corruption within a single layout pass.
  for (let seed = 0; seed < 200; seed++) {
    it(`seed=${seed}: layout twice produces identical results`, () => {
      const rng = createRng(seed * 1021 + 31)
      const buildTree = buildRandomTree(rng)
      expectIdempotent(buildTree, 80, NaN)
    })
  }
})

// ============================================================================
// Group 7: Resize round-trip — layout at W, resize to W', back to W
// ============================================================================

describe("Fuzz: resize round-trip", () => {
  // Layout at width W1, then W2, then W1 again. Final result must match
  // a fresh layout at W1. Catches stale cache entries that persist across
  // constraint changes (e.g. the NaN sentinel bug, fingerprint override bug).
  for (let seed = 0; seed < 200; seed++) {
    it(`seed=${seed}: resize round-trip matches fresh`, () => {
      const rng = createRng(seed * 1031 + 53)
      const buildTree = buildRandomTree(rng)
      // Pick random width sequence: start → different → back to start
      const w1 = 40 + Math.floor(rng() * 80) // 40-119
      const w2 = 40 + Math.floor(rng() * 80)
      expectResizeRoundTrip(buildTree, [w1, w2, w1])
    })
  }
})

// ============================================================================
// Group 8: Multi-step constraint sweep
// ============================================================================

describe("Fuzz: multi-step constraint sweep", () => {
  // Exercise the full lifecycle: layout → resize → dirty → resize → re-layout.
  // Combines width changes with dirty marking to stress all cache layers.
  for (let seed = 0; seed < 100; seed++) {
    it(`seed=${seed}: full lifecycle matches fresh`, () => {
      const rng = createRng(seed * 1039 + 97)
      const buildTree = buildRandomTree(rng)

      const { root, dirtyTargets } = buildTree()
      const widths = [
        40 + Math.floor(rng() * 80),
        40 + Math.floor(rng() * 80),
        40 + Math.floor(rng() * 80),
      ]

      // Phase 1: layout at varying widths
      for (const w of widths) {
        root.setWidth(w)
        root.calculateLayout(w, NaN, DIRECTION_LTR)
      }

      // Phase 2: mark dirty + re-layout at a new width
      const finalWidth = 40 + Math.floor(rng() * 80)
      for (const t of dirtyTargets) t.markDirty()
      root.setWidth(finalWidth)
      root.calculateLayout(finalWidth, NaN, DIRECTION_LTR)
      const incremental = getLayout(root)

      // Fresh reference
      const fresh = buildTree()
      fresh.root.setWidth(finalWidth)
      fresh.root.calculateLayout(finalWidth, NaN, DIRECTION_LTR)
      const reference = getLayout(fresh.root)

      const diffs = diffLayouts(reference, incremental)
      if (diffs.length > 0) {
        const detail = diffs.map((d) => `  ${d}`).join("\n")
        expect.unreachable(
          `Full lifecycle differs at finalWidth=${finalWidth} (widths: ${widths.join("→")}, ${diffs.length} diffs):\n${detail}`,
        )
      }
    })
  }
})
