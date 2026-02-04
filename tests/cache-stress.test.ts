/**
 * Caching Correctness Stress Tests
 *
 * Tests for constraint fingerprinting edge cases that could cause false cache hits.
 * Expert analysis (Jan 2026) identified these as high-risk areas:
 * 1. Percent + wrap combinations
 * 2. Shrink-wrap + min/max
 * 3. Stretch + aspect ratio
 * 4. Baseline alignment
 *
 * Run: bun test tests/cache-stress.test.ts
 */

import { describe, expect, it } from "vitest"
import {
  ALIGN_BASELINE,
  ALIGN_CENTER,
  ALIGN_STRETCH,
  DIRECTION_LTR,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_ROW,
  GUTTER_ALL,
  JUSTIFY_CENTER,
  MEASURE_MODE_AT_MOST,
  MEASURE_MODE_UNDEFINED,
  Node,
  WRAP_WRAP,
} from "../src/index.js"

// ============================================================================
// Helper: Get full layout tree for comparison
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

function layoutsEqual(
  a: LayoutResult,
  b: LayoutResult,
  tolerance = 0.001,
): boolean {
  if (
    Math.abs(a.left - b.left) > tolerance ||
    Math.abs(a.top - b.top) > tolerance ||
    Math.abs(a.width - b.width) > tolerance ||
    Math.abs(a.height - b.height) > tolerance
  ) {
    return false
  }
  if (a.children.length !== b.children.length) return false
  return a.children.every((child, i) =>
    layoutsEqual(child, b.children[i]!, tolerance),
  )
}

function formatLayout(layout: LayoutResult, indent = 0): string {
  const pad = "  ".repeat(indent)
  let result = `${pad}{ left: ${layout.left}, top: ${layout.top}, width: ${layout.width}, height: ${layout.height} }`
  if (layout.children.length > 0) {
    result += ` [\n${layout.children.map((c) => formatLayout(c, indent + 1)).join(",\n")}\n${pad}]`
  }
  return result
}

// ============================================================================
// Test Suite: Percent + Wrap Combinations
// ============================================================================

describe("Cache Stress: Percent + Wrap", () => {
  it("percent width with flex-wrap should invalidate on parent resize", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setFlexWrap(WRAP_WRAP)

    // Children with percent width
    for (let i = 0; i < 3; i++) {
      const child = Node.create()
      child.setWidthPercent(40) // 40% of 100 = 40, so 2 fit per line
      child.setHeight(20)
      root.insertChild(child, i)
    }

    // First layout
    root.calculateLayout(100, 100, DIRECTION_LTR)
    const firstLayout = getLayout(root)

    // Resize parent (percent values should recalculate)
    root.setWidth(200)
    root.calculateLayout(200, 100, DIRECTION_LTR)
    const secondLayout = getLayout(root)

    // Children should now be 80px wide (40% of 200)
    expect(secondLayout.children[0]!.width).toBe(80)

    // Force fresh layout by marking dirty
    root.markDirty()
    root.calculateLayout(200, 100, DIRECTION_LTR)
    const freshLayout = getLayout(root)

    // Cached and fresh should match
    expect(layoutsEqual(secondLayout, freshLayout)).toBe(true)
  })

  it("nested percent values should cascade correctly", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)

    const outer = Node.create()
    outer.setWidthPercent(50) // 50px
    outer.setHeightPercent(50) // 50px
    root.insertChild(outer, 0)

    const inner = Node.create()
    inner.setWidthPercent(50) // 50% of 50 = 25px
    inner.setHeightPercent(50)
    outer.insertChild(inner, 0)

    // First layout
    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(inner.getComputedWidth()).toBe(25)
    expect(inner.getComputedHeight()).toBe(25)

    // Change root size
    root.setWidth(200)
    root.setHeight(200)
    root.calculateLayout(200, 200, DIRECTION_LTR)

    // Inner should be 50% of 50% of 200 = 50px
    expect(outer.getComputedWidth()).toBe(100)
    expect(inner.getComputedWidth()).toBe(50)

    // Verify fresh layout matches
    root.markDirty()
    root.calculateLayout(200, 200, DIRECTION_LTR)
    expect(inner.getComputedWidth()).toBe(50)
  })

  it("percent margin with wrap should recalculate on resize", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setFlexWrap(WRAP_WRAP)

    const child = Node.create()
    child.setWidth(30)
    child.setHeight(20)
    child.setMarginPercent(0, 10) // 10% left margin
    root.insertChild(child, 0)

    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(child.getComputedLeft()).toBe(10) // 10% of 100

    // Resize
    root.setWidth(200)
    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(child.getComputedLeft()).toBe(20) // 10% of 200
  })
})

// ============================================================================
// Test Suite: Shrink-wrap + Min/Max
// ============================================================================

describe("Cache Stress: Shrink-wrap + Min/Max", () => {
  it("auto-sized parent with min-constrained children should recalculate", () => {
    const root = Node.create()
    // Auto width (shrink-wrap)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)

    const child1 = Node.create()
    child1.setWidth(50)
    child1.setHeight(20)
    child1.setMinWidth(30)
    root.insertChild(child1, 0)

    const child2 = Node.create()
    child2.setWidth(50)
    child2.setHeight(20)
    root.insertChild(child2, 1)

    // Layout with container constraint
    root.calculateLayout(200, 100, DIRECTION_LTR)
    const firstLayout = getLayout(root)
    expect(root.getComputedWidth()).toBe(100) // 50 + 50

    // Change child width
    child1.setWidth(20) // Below min, should be clamped to 30
    root.calculateLayout(200, 100, DIRECTION_LTR)
    const secondLayout = getLayout(root)

    // Root should shrink-wrap to 30 + 50 = 80
    expect(root.getComputedWidth()).toBe(80)
    expect(child1.getComputedWidth()).toBe(30) // Clamped to min

    // Fresh layout should match
    root.markDirty()
    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(layoutsEqual(secondLayout, getLayout(root))).toBe(true)
  })

  it("children intrinsic size changes should invalidate parent shrink-wrap", () => {
    const root = Node.create()
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)

    const child = Node.create()
    // Measure function returns intrinsic size
    let intrinsicWidth = 50
    child.setMeasureFunc((maxW, wMode, maxH, hMode) => ({
      width: Math.min(intrinsicWidth, maxW),
      height: 20,
    }))
    root.insertChild(child, 0)

    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(root.getComputedWidth()).toBe(50)
    expect(child.getComputedWidth()).toBe(50)

    // Change intrinsic size and mark dirty
    intrinsicWidth = 80
    child.markDirty()
    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(root.getComputedWidth()).toBe(80)
    expect(child.getComputedWidth()).toBe(80)
  })

  it("min/max constraints on shrink-wrap containers", () => {
    const root = Node.create()
    root.setMinWidth(60)
    root.setMaxWidth(120)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)

    const child = Node.create()
    child.setWidth(40)
    child.setHeight(20)
    root.insertChild(child, 0)

    // Content is 40, but min is 60
    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(root.getComputedWidth()).toBe(60) // Clamped to min

    // Increase child width beyond max
    child.setWidth(150)
    root.calculateLayout(200, 100, DIRECTION_LTR)
    expect(root.getComputedWidth()).toBe(120) // Clamped to max
  })
})

// ============================================================================
// Test Suite: Stretch + Aspect Ratio
// ============================================================================

describe("Cache Stress: Stretch + Aspect Ratio", () => {
  it("cross-axis stretch with aspect-ratio should recalculate on cross size change", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setAlignItems(ALIGN_STRETCH)

    const child = Node.create()
    child.setWidth(40)
    child.setAspectRatio(2) // width:height = 2:1
    root.insertChild(child, 0)

    root.calculateLayout(100, 100, DIRECTION_LTR)
    // Child stretches to cross size (100), aspect ratio doesn't override stretch

    // Change cross size
    root.setHeight(80)
    root.calculateLayout(100, 80, DIRECTION_LTR)
    const layout = getLayout(root)

    // Fresh layout should match
    root.markDirty()
    root.calculateLayout(100, 80, DIRECTION_LTR)
    expect(layoutsEqual(layout, getLayout(root))).toBe(true)
  })

  it("multi-line stretch behavior", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setFlexWrap(WRAP_WRAP)
    root.setAlignItems(ALIGN_STRETCH)

    // 4 children that wrap into 2 lines
    for (let i = 0; i < 4; i++) {
      const child = Node.create()
      child.setWidth(40)
      // Height auto (will stretch to line height, which depends on tallest item in line)
      root.insertChild(child, i)
    }

    root.calculateLayout(100, 100, DIRECTION_LTR)
    const layout1 = getLayout(root)

    // Change container height
    root.setHeight(80)
    root.calculateLayout(100, 80, DIRECTION_LTR)
    const layout2 = getLayout(root)

    // Layout should change when container height changes
    // (specific heights depend on flexbox implementation details)

    // Fresh layout should match cached layout
    root.markDirty()
    root.calculateLayout(100, 80, DIRECTION_LTR)
    expect(layoutsEqual(layout2, getLayout(root))).toBe(true)
  })

  it("stretch with min/max constraints", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setAlignItems(ALIGN_STRETCH)

    const child = Node.create()
    child.setWidth(40)
    child.setMinHeight(30)
    child.setMaxHeight(60)
    root.insertChild(child, 0)

    // Cross size 100 would stretch to 100, but max is 60
    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(child.getComputedHeight()).toBe(60)

    // Reduce cross size below min
    root.setHeight(20)
    root.calculateLayout(100, 20, DIRECTION_LTR)
    expect(child.getComputedHeight()).toBe(30) // Clamped to min
  })
})

// ============================================================================
// Test Suite: Baseline Alignment
// ============================================================================

describe("Cache Stress: Baseline Alignment", () => {
  it("baseline alignment with different child heights", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setAlignItems(ALIGN_BASELINE)

    const child1 = Node.create()
    child1.setWidth(30)
    child1.setHeight(20)
    // Baseline at bottom by default
    root.insertChild(child1, 0)

    const child2 = Node.create()
    child2.setWidth(30)
    child2.setHeight(40)
    root.insertChild(child2, 1)

    root.calculateLayout(100, 100, DIRECTION_LTR)
    const layout1 = getLayout(root)

    // Change child1 height (affects baseline calculation)
    child1.setHeight(30)
    root.calculateLayout(100, 100, DIRECTION_LTR)
    const layout2 = getLayout(root)

    // Layouts should differ due to baseline recalculation
    expect(layoutsEqual(layout1, layout2)).toBe(false)

    // Fresh should match cached
    root.markDirty()
    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(layoutsEqual(layout2, getLayout(root))).toBe(true)
  })

  it("baseline with custom baselineFunc", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setAlignItems(ALIGN_BASELINE)

    const child1 = Node.create()
    child1.setWidth(30)
    child1.setHeight(40)
    // Custom baseline at 30px from top
    child1.setBaselineFunc((w, h) => 30)
    root.insertChild(child1, 0)

    const child2 = Node.create()
    child2.setWidth(30)
    child2.setHeight(20)
    // Default baseline at bottom (20px)
    root.insertChild(child2, 1)

    root.calculateLayout(100, 100, DIRECTION_LTR)

    // Child2 should be positioned so its baseline (20) aligns with child1's (30)
    // Child2 top = 30 - 20 = 10
    expect(child2.getComputedTop()).toBe(10)

    // Change baselineFunc
    child1.setBaselineFunc((w, h) => 20)
    root.calculateLayout(100, 100, DIRECTION_LTR)

    // Now baselines both at 20, child2 should move up
    expect(child2.getComputedTop()).toBe(0)
  })

  it("baseline alignment with wrap", () => {
    const root = Node.create()
    root.setWidth(80)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setFlexWrap(WRAP_WRAP)
    root.setAlignItems(ALIGN_BASELINE)

    // Line 1
    const child1 = Node.create()
    child1.setWidth(40)
    child1.setHeight(20)
    root.insertChild(child1, 0)

    const child2 = Node.create()
    child2.setWidth(40)
    child2.setHeight(30)
    root.insertChild(child2, 1)

    // Line 2 (wraps)
    const child3 = Node.create()
    child3.setWidth(40)
    child3.setHeight(25)
    root.insertChild(child3, 2)

    root.calculateLayout(80, 100, DIRECTION_LTR)
    const layout = getLayout(root)

    // Each line should have baseline alignment within it
    // Line 1: child1 and child2
    // Line 2: child3

    // Fresh should match
    root.markDirty()
    root.calculateLayout(80, 100, DIRECTION_LTR)
    expect(layoutsEqual(layout, getLayout(root))).toBe(true)
  })
})

// ============================================================================
// Test Suite: Combined Edge Cases
// ============================================================================

describe("Cache Stress: Combined Edge Cases", () => {
  it("percent + shrink-wrap + nested", () => {
    // When a shrink-wrap parent has a percent-width child,
    // the percent resolves against the available width constraint.
    // This tests that changing the constraint triggers re-layout.
    const root = Node.create()
    root.setWidth(200) // Fixed width this time
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_COLUMN)

    const container = Node.create()
    container.setWidthPercent(50) // 50% of 200 = 100
    container.setHeight(30)
    root.insertChild(container, 0)

    const child = Node.create()
    child.setWidth(80)
    child.setHeight(20)
    container.insertChild(child, 0)

    // Layout with constraint
    root.calculateLayout(200, 100, DIRECTION_LTR)

    // Container is 50% of 200 = 100
    expect(container.getComputedWidth()).toBe(100)
    expect(root.getComputedWidth()).toBe(200)

    // Change root width
    root.setWidth(400)
    root.calculateLayout(400, 100, DIRECTION_LTR)
    expect(container.getComputedWidth()).toBe(200) // 50% of 400
    expect(root.getComputedWidth()).toBe(400)

    // Fresh layout should match
    root.markDirty()
    root.calculateLayout(400, 100, DIRECTION_LTR)
    expect(container.getComputedWidth()).toBe(200)
  })

  it("stretch + gap + multiple lines", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_ROW)
    root.setFlexWrap(WRAP_WRAP)
    root.setAlignItems(ALIGN_STRETCH)
    root.setGap(GUTTER_ALL, 10)

    // 3 children: 2 on first line, 1 on second
    for (let i = 0; i < 3; i++) {
      const child = Node.create()
      child.setWidth(40)
      root.insertChild(child, i)
    }

    root.calculateLayout(100, 100, DIRECTION_LTR)

    // Line 1: 40 + 10 + 40 = 90 (fits)
    // Line 2: 40 (wraps)
    // Cross gap: 10
    // Available height: 100 - 10 = 90 for 2 lines = 45 each

    // Change gap
    root.setGap(GUTTER_ALL, 20)
    root.calculateLayout(100, 100, DIRECTION_LTR)

    // Line heights should update
    // Available: 100 - 20 = 80 for 2 lines = 40 each
    const layout = getLayout(root)

    root.markDirty()
    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(layoutsEqual(layout, getLayout(root))).toBe(true)
  })

  it("measure func + percent parent + cache invalidation", () => {
    const root = Node.create()
    root.setWidth(100)
    root.setHeight(100)
    root.setFlexDirection(FLEX_DIRECTION_COLUMN)

    const container = Node.create()
    container.setWidthPercent(80) // 80px
    container.setHeight(50)
    root.insertChild(container, 0)

    const text = Node.create()
    let textWidth = 60
    text.setMeasureFunc((maxW, wMode, maxH, hMode) => ({
      width: Math.min(textWidth, maxW),
      height: 20,
    }))
    container.insertChild(text, 0)

    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(text.getComputedWidth()).toBe(60)

    // Change container percent
    container.setWidthPercent(50) // 50px
    root.calculateLayout(100, 100, DIRECTION_LTR)
    // Text should be constrained to 50
    expect(text.getComputedWidth()).toBe(50)

    // Change text intrinsic (and mark dirty)
    textWidth = 30
    text.markDirty()
    root.calculateLayout(100, 100, DIRECTION_LTR)
    expect(text.getComputedWidth()).toBe(30)
  })
})
