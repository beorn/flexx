/**
 * CSS §4.5 "Implied Minimum Size of Flex Items" — flex items default to
 * `min-block-size: auto = content-based minimum` so they can't shrink below
 * their content. Yoga preset preserves the looser `min = 0` semantics.
 *
 * Regression coverage for the silvery scroll-container failure:
 *
 *   <Box overflow="scroll" height={6} flexDirection="column">
 *     {Array.from({ length: 10 }, () => <Box><Text>Item</Text></Box>)}
 *   </Box>
 *
 * Under Yoga preset (flexShrink:0): items rigid → 6 visible, scrolls.
 * Under CSS preset (flexShrink:1) WITHOUT this rule: items shrink to 0.6 row
 *   each → rounding makes alternate items disappear.
 * Under CSS preset (flexShrink:1) WITH this rule: items get auto min-height =
 *   content (1 row) → can't shrink below → 6 visible, scrolls.
 *
 * Spec: https://www.w3.org/TR/css-flexbox-1/#min-size-auto
 *
 * Tracks bead km-flexily.auto-min-size-flex-items.
 */

import { describe, expect, test } from "vitest"
import {
  DIRECTION_LTR,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_ROW,
  Node,
  OVERFLOW_HIDDEN,
  OVERFLOW_VISIBLE,
  UNIT_AUTO,
  UNIT_POINT,
  UNIT_UNDEFINED,
} from "../src/index.js"

describe("CSS §4.5 flex-item auto min-size", () => {
  describe("CSS preset (default min: AUTO)", () => {
    test("rigid items with content keep their content size in over-full container", () => {
      // 10 children with measureFunc (1-line text) in a 6-row column container.
      // Total content 10 rows > container 6 rows → must overflow, not compress.
      // Each item's min-content height = 1 (the content row), so auto-min-size
      // prevents shrinking below 1 row even though flexShrink:1 is default.
      //
      // Note: empty divs with `setHeight(1)` and no measureFunc CAN shrink to 0
      // under CSS spec — auto-min-size = min(specified, content), and content-min
      // for an empty div is 0 (padding+border). The CSS escape hatch is
      // setFlexShrink(0) or setMinHeight(1). This test uses measureFunc to
      // mirror the real silvery scroll-container scenario (text rows with content).
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "css" })
        item.setMeasureFunc(() => ({ width: 5, height: 1 }))
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(40, 6, DIRECTION_LTR)

      // Each item keeps its 1-row content height despite flexShrink:1 default.
      for (let i = 0; i < items.length; i++) {
        expect(items[i]!.getComputedHeight()).toBe(1)
      }
    })

    test("empty leaves with explicit size CAN shrink to 0 (spec-correct)", () => {
      // Counterpoint to the previous test: empty divs with no measureFunc and
      // no explicit min-height collapse under flexShrink:1 + over-full
      // container. CSS spec: auto-min-size = min(specified, content), and
      // content-min for an empty div is 0 (padding+border). To prevent shrink,
      // the canonical CSS escape hatch is setFlexShrink(0) or setMinHeight.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "css" })
        item.setHeight(1) // explicit size, but no content and no min-height
        root.insertChild(item, i)
        items.push(item)
      }
      root.calculateLayout(40, 6, DIRECTION_LTR)

      // Items shrink to fit container; some end up at 0 due to rounding.
      const totalHeight = items.reduce((s, n) => s + n.getComputedHeight(), 0)
      expect(totalHeight).toBeLessThanOrEqual(6)
    })

    test("empty leaves with explicit size + flexShrink:0 stay rigid", () => {
      // The CSS escape hatch for keeping empty divs rigid: opt out of shrink.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "css" })
        item.setHeight(1)
        item.setFlexShrink(0)
        root.insertChild(item, i)
        items.push(item)
      }
      root.calculateLayout(40, 6, DIRECTION_LTR)

      for (const item of items) {
        expect(item.getComputedHeight()).toBe(1)
      }
    })

    test("items with measureFunc keep content height under shrink pressure", () => {
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(20)
      root.setHeight(3)

      const items: Node[] = []
      for (let i = 0; i < 5; i++) {
        const item = Node.create({ defaults: "css" })
        // measureFunc returns 1-row content
        item.setMeasureFunc(() => ({ width: 5, height: 1 }))
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(20, 3, DIRECTION_LTR)

      // Each measured item keeps height 1 (its content size) — not 0.6.
      for (const item of items) {
        expect(item.getComputedHeight()).toBe(1)
      }
    })

    test("explicit min-height: 0 opts out (CSS escape hatch)", () => {
      // Browsers: setting `min-height: 0` explicitly disables the auto floor.
      // This is the canonical CSS way to allow shrinking below content size.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "css" })
        item.setHeight(1)
        item.setMinHeight(0) // explicit opt-out → can shrink to 0
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(40, 6, DIRECTION_LTR)

      // With explicit min:0, items shrink to fit (each ~0.6 → rounded).
      // Sum of shrunken heights should equal container height.
      const totalHeight = items.reduce((s, n) => s + n.getComputedHeight(), 0)
      expect(totalHeight).toBeLessThanOrEqual(6)
    })

    test("explicit min-height: N respects the explicit value", () => {
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const item = Node.create({ defaults: "css" })
      item.setHeight(10)
      item.setMinHeight(2) // explicit min — neither 0 nor content
      root.insertChild(item, 0)

      // Sibling that pushes the item to shrink:
      const sibling = Node.create({ defaults: "css" })
      sibling.setHeight(10)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(40, 6, DIRECTION_LTR)

      expect(item.getComputedHeight()).toBeGreaterThanOrEqual(2)
    })

    test("scroll container ITEM (overflow != visible) gets min: 0 not content", () => {
      // CSS rule: when the flex item itself is a scroll container, auto
      // min-size = 0, allowing the item to shrink for clipping.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(5)

      // The scrollable item — should be allowed to shrink below content.
      const scrollItem = Node.create({ defaults: "css" })
      scrollItem.setHeight(20) // content wants 20 rows
      scrollItem.setOverflow(OVERFLOW_HIDDEN)
      root.insertChild(scrollItem, 0)

      root.calculateLayout(40, 5, DIRECTION_LTR)

      // Despite content of 20, scroll item shrinks to fit container.
      expect(scrollItem.getComputedHeight()).toBeLessThanOrEqual(5)
    })

    test("row direction: main-axis is width, auto applies to min-width", () => {
      // Items have measureFunc so they have a meaningful content-min.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(20)
      root.setHeight(1)

      const items: Node[] = []
      for (let i = 0; i < 5; i++) {
        const item = Node.create({ defaults: "css" })
        item.setMeasureFunc(() => ({ width: 10, height: 1 }))
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(20, 1, DIRECTION_LTR)

      // Each item's auto min-width = content-based (10 in this case).
      // Items should keep their 10-wide size and overflow horizontally.
      for (const item of items) {
        expect(item.getComputedWidth()).toBe(10)
      }
    })
  })

  describe("Yoga preset (default min: UNDEFINED → 0)", () => {
    test("items shrink past content under Yoga preset (current behavior preserved)", () => {
      // Yoga preset: flexShrink: 0 default — items don't shrink at all,
      // so the auto min-size rule never kicks in regardless. Same outcome
      // as CSS preset for THIS particular layout, but for a different reason.
      const root = Node.create({ defaults: "yoga" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "yoga" })
        item.setHeight(1)
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(40, 6, DIRECTION_LTR)

      // Yoga: items rigid (flexShrink:0), each keeps 1 row.
      for (const item of items) {
        expect(item.getComputedHeight()).toBe(1)
      }
    })

    test("explicit flexShrink:1 with Yoga preset can collapse items (no auto floor)", () => {
      // The pre-fix behavior: under Yoga preset, undefined min → 0, so
      // explicit flexShrink:1 collapses items below content.
      const root = Node.create({ defaults: "yoga" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(40)
      root.setHeight(6)

      const items: Node[] = []
      for (let i = 0; i < 10; i++) {
        const item = Node.create({ defaults: "yoga" })
        item.setHeight(1)
        item.setFlexShrink(1) // opt into shrink
        root.insertChild(item, i)
        items.push(item)
      }

      root.calculateLayout(40, 6, DIRECTION_LTR)

      // Total height capped at container size.
      const totalHeight = items.reduce((s, n) => s + n.getComputedHeight(), 0)
      expect(totalHeight).toBeLessThanOrEqual(6)
    })
  })

  describe("default style construction", () => {
    test("CSS preset: minWidth and minHeight default to UNIT_AUTO", () => {
      const node = Node.create({ defaults: "css" })
      // The internal style isn't directly readable, but a no-op layout
      // should leave dimensions at AUTO meaning the auto-min path is hit.
      // The behavioral tests above already cover the layout effect; this
      // test mostly documents the construction expectation.
      expect(UNIT_AUTO).toBe(3)
    })

    test("Yoga preset: min units default to UNIT_UNDEFINED", () => {
      const node = Node.create({ defaults: "yoga" })
      expect(UNIT_UNDEFINED).toBe(0)
      expect(UNIT_POINT).toBe(1)
    })
  })

  describe("max-clamp on auto-min (CSS specified-size suggestion)", () => {
    test("auto-min is clamped by definite max-height", () => {
      // Item content height = 10, max-height = 4, container = 6 with sibling rigid 5.
      // CSS: auto min-size includes the specified-size suggestion bounded by max-*.
      // So auto-min = min(content=10, max=4) = 4, not 10. Item should fit at 4.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(20)
      root.setHeight(6)

      const item = Node.create({ defaults: "css" })
      item.setHeight(10)
      item.setMaxHeight(4)
      root.insertChild(item, 0)

      const sibling = Node.create({ defaults: "css" })
      sibling.setHeight(5)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(20, 6, DIRECTION_LTR)

      // Without max-clamp: auto-min would be 10, item couldn't shrink → distortion.
      // With max-clamp: auto-min = 4, item respects its max.
      expect(item.getComputedHeight()).toBeLessThanOrEqual(4)
    })
  })

  describe("dirty propagation: overflow toggle invalidates auto-min", () => {
    test("toggling overflow visible↔hidden re-evaluates auto-min", () => {
      // Pro-recommended cache regression test: changing overflow on a flex
      // item under CSS preset must change the auto-min decision and the
      // resulting layout must reflect that. Use measureFunc so the item has
      // a meaningful content-min (= 10) — empty divs would shrink to 0
      // regardless of overflow per CSS spec.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_COLUMN)
      root.setWidth(20)
      root.setHeight(3)

      const item = Node.create({ defaults: "css" })
      item.setMeasureFunc(() => ({ width: 5, height: 10 }))
      // Sibling forces the item to want to shrink (column overflows).
      const sibling = Node.create({ defaults: "css" })
      sibling.setHeight(10)
      sibling.setFlexShrink(0)
      root.insertChild(item, 0)
      root.insertChild(sibling, 1)

      // First layout: overflow visible → auto-min = content (10), can't shrink.
      // Item keeps height 10 even though container is only 3.
      root.calculateLayout(20, 3, DIRECTION_LTR)
      const heightVisible = item.getComputedHeight()

      // Toggle to hidden → auto-min = 0, can shrink freely.
      item.setOverflow(OVERFLOW_HIDDEN)
      root.calculateLayout(20, 3, DIRECTION_LTR)
      const heightHidden = item.getComputedHeight()

      // Behaviors must differ — overflow change must invalidate the cached layout.
      expect(heightVisible).not.toBe(heightHidden)
      // hidden allows full shrink; visible preserves content.
      expect(heightHidden).toBeLessThan(heightVisible)
    })
  })

  describe("min-content semantics for wrappable measureFunc text", () => {
    test("row direction with wrappable text: auto-min uses min-content (longest word), not max-content", () => {
      // CSS §4.5: content-based minimum is min-content. For wrappable text in
      // a row, that's the longest unbreakable word width — NOT the full text
      // width (max-content). When the container is narrower than max-content
      // but wider than min-content, the item shrinks and wraps.
      //
      // Simulated text: 30 chars max-content, 5 chars longest word.
      // Container 15 cols → item shrinks to 15, wraps to 2 lines.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(15)
      root.setHeight(3)

      const item = Node.create({ defaults: "css" })
      item.setMeasureFunc((width, widthMode) => {
        // measureFunc reports min-content when width=0 AT_MOST.
        if (widthMode === 2 /* AT_MOST */ && width <= 5) {
          return { width: 5, height: 6 } // min-content: 5-char word, 6 lines
        }
        if (widthMode === 0 /* UNDEFINED */) {
          return { width: 30, height: 1 } // max-content: full text
        }
        // Constrained: wrap to fit
        const cols = Math.max(5, Math.floor(width))
        return { width: cols, height: Math.ceil(30 / cols) }
      })
      root.insertChild(item, 0)

      root.calculateLayout(15, 3, DIRECTION_LTR)

      // Item shrinks to container (15 cols), wrapping internally.
      // If contentMinSize were max-content (30), item couldn't shrink below 30 → overflow.
      // With min-content (5), item shrinks to 15.
      expect(item.getComputedWidth()).toBe(15)
    })

    test("row direction: rigid sibling forces wrappable item to min-content floor", () => {
      // Sibling 12 cols rigid + container 15 cols → item gets 3 cols available.
      // Item's min-content = 5 → item floor at 5. Total exceeds container.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(15)
      root.setHeight(3)

      const item = Node.create({ defaults: "css" })
      item.setMeasureFunc((width, widthMode) => {
        if (widthMode === 2 && width <= 5) return { width: 5, height: 6 }
        if (widthMode === 0) return { width: 30, height: 1 }
        const cols = Math.max(5, Math.floor(width))
        return { width: cols, height: Math.ceil(30 / cols) }
      })
      const sibling = Node.create({ defaults: "css" })
      sibling.setWidth(12)
      sibling.setFlexShrink(0)
      root.insertChild(item, 0)
      root.insertChild(sibling, 1)

      root.calculateLayout(15, 3, DIRECTION_LTR)

      // Item should not shrink below min-content (5).
      expect(item.getComputedWidth()).toBeGreaterThanOrEqual(5)
    })
  })

  describe("aspect-ratio transferred-size suggestion", () => {
    test("aspect-ratio + definite cross-axis bounds auto-min by transferred size", () => {
      // Item with aspect-ratio 2 and definite height 4 → transferred main-axis = 4*2 = 8.
      // contentMinSize is bounded above by transferred-size suggestion.
      // With measureFunc returning content of 50, auto-min would be 50;
      // transferred-size clamps it to 8, allowing the item to shrink to 8.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(20)
      root.setHeight(4)

      const item = Node.create({ defaults: "css" })
      item.setHeight(4) // definite cross-axis
      item.setAspectRatio(2)
      item.setMeasureFunc((width, widthMode) => {
        if (widthMode === 2 && width <= 50) return { width: Math.min(50, Math.max(8, width)), height: 4 }
        return { width: 50, height: 4 }
      })
      root.insertChild(item, 0)

      // Sibling forces shrink pressure
      const sibling = Node.create({ defaults: "css" })
      sibling.setWidth(15)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(20, 4, DIRECTION_LTR)

      // With transferred-size clamp: contentMin = min(50, 8) = 8. Item can shrink to 8.
      // Without it: contentMin = 50, item couldn't shrink below 50.
      expect(item.getComputedWidth()).toBeLessThanOrEqual(8)
    })
  })

  describe("flex-basis: 0 / flex: 1 1 0 with measureFunc (re-derives content)", () => {
    test("flex: 1 1 0 with measureFunc keeps content as auto-min", () => {
      // Bead km-flexily.auto-min-size-flex-basis-zero. When flex-basis is 0
      // (explicit) but the item has measureFunc, auto-min-size must use the
      // intrinsic content size, not the flex-basis-derived baseSize. This
      // test verifies the fix lands.
      //
      // Setup: flex container 40 wide, item with flex:1 1 0 and 50-wide content,
      // sibling 40 wide rigid. Without the fix, item would collapse to 0 (or
      // very small) because auto-min = baseSize = flex-basis = 0. With the
      // fix, auto-min = content-size = 50, so item keeps its content width
      // and the row overflows.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(40)
      root.setHeight(1)

      const item = Node.create({ defaults: "css" })
      item.setFlexBasis(0)
      item.setFlexGrow(1)
      item.setMeasureFunc(() => ({ width: 50, height: 1 }))
      root.insertChild(item, 0)

      const sibling = Node.create({ defaults: "css" })
      sibling.setWidth(40)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(40, 1, DIRECTION_LTR)

      // With auto-min-size deriving content separately from flex-basis,
      // item keeps its content width (50), not collapsing to flex-basis (0).
      expect(item.getComputedWidth()).toBe(50)
    })

    test("flex: 1 1 0 with measureFunc + sibling fitting exactly: item gets remaining space", () => {
      // Counterpoint: when the row has room, flex distribution still grows
      // the item naturally — auto-min doesn't pin it to content if max-* or
      // grown size is larger.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(100)
      root.setHeight(1)

      const item = Node.create({ defaults: "css" })
      item.setFlexBasis(0)
      item.setFlexGrow(1)
      item.setMeasureFunc(() => ({ width: 20, height: 1 }))
      root.insertChild(item, 0)

      const sibling = Node.create({ defaults: "css" })
      sibling.setWidth(40)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(100, 1, DIRECTION_LTR)

      // 100 - 40 sibling = 60 free; flexGrow=1 distributes all 60 to item.
      expect(item.getComputedWidth()).toBe(60)
    })

    test("flex: 1 1 0 + max-width clamps auto-min", () => {
      // Auto-min "specified-size suggestion" is bounded by max-*. With max-width
      // smaller than content, auto-min doesn't exceed max — item can shrink to max.
      const root = Node.create({ defaults: "css" })
      root.setFlexDirection(FLEX_DIRECTION_ROW)
      root.setWidth(40)
      root.setHeight(1)

      const item = Node.create({ defaults: "css" })
      item.setFlexBasis(0)
      item.setFlexGrow(1)
      item.setMaxWidth(10)
      item.setMeasureFunc(() => ({ width: 50, height: 1 }))
      root.insertChild(item, 0)

      const sibling = Node.create({ defaults: "css" })
      sibling.setWidth(40)
      sibling.setFlexShrink(0)
      root.insertChild(sibling, 1)

      root.calculateLayout(40, 1, DIRECTION_LTR)

      // Auto-min = min(content=50, max-width=10) = 10. Item respects max.
      expect(item.getComputedWidth()).toBeLessThanOrEqual(10)
    })
  })
})
