/**
 * A0.2 — fitWidth single-pass lane snap.
 *
 * CSS precedent: `width: fit-content(<length>)` extended to a list.
 * Algorithm (per dragon bead § A0.2):
 *   1. Compute children's max-content unconstrained (via measureNode)
 *   2. Pick smallest lane >= max-content (else last entry)
 *   3. Set Box's used inline-size to that lane
 *   4. Lay out children within that width
 *
 * Single pass, no React round-trip — replaces AutoFit's phantom-subtree
 * + useState + useMemo + R3/R6 invariants entirely.
 */
import { describe, expect, test } from "vitest"
import * as C from "../src/constants.js"
import { createFlexily } from "../src/index.js"

describe("[A0.2] fitWidth lane selection", () => {
  test("picks the smallest lane >= max-content", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(100) // max-content = 100

    box.insertChild(child, 0)
    flex.calculateLayout(box, 320, 100)

    // smallest lane >= 100 is 120
    expect(box.getComputedWidth()).toBe(120)
  })

  test("picks the last lane when no lane fits", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(200) // overflows all lanes

    box.insertChild(child, 0)
    flex.calculateLayout(box, 320, 100)

    // No lane fits → use last (160)
    expect(box.getComputedWidth()).toBe(160)
  })

  test("picks the first lane when content fits in any", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(50)

    box.insertChild(child, 0)
    flex.calculateLayout(box, 320, 100)

    // smallest lane >= 50 is 80
    expect(box.getComputedWidth()).toBe(80)
  })

  test("exact-fit content selects the exact lane (no overshoot)", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(120)

    box.insertChild(child, 0)
    flex.calculateLayout(box, 320, 100)

    expect(box.getComputedWidth()).toBe(120)
  })

  test("two children sum to total max-content for lane selection", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const c1 = flex.createNode()
    c1.setWidth(40)
    const c2 = flex.createNode()
    c2.setWidth(50)

    box.insertChild(c1, 0)
    box.insertChild(c2, 1)
    flex.calculateLayout(box, 320, 100)

    // max-content = 40 + 50 = 90 → smallest lane >= 90 is 120
    expect(box.getComputedWidth()).toBe(120)
  })

  test("padding + border add to max-content for lane selection", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])
    box.setPadding(C.EDGE_LEFT, 10, C.UNIT_POINT)
    box.setPadding(C.EDGE_RIGHT, 10, C.UNIT_POINT)

    const child = flex.createNode()
    child.setWidth(100) // child max-content

    box.insertChild(child, 0)
    flex.calculateLayout(box, 320, 100)

    // max-content including padding = 100 + 10 + 10 = 120 → exact lane 120
    expect(box.getComputedWidth()).toBe(120)
  })

  test("gap between children adds to max-content", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])
    box.setGap(C.GUTTER_COLUMN, 5)

    const c1 = flex.createNode()
    c1.setWidth(40)
    const c2 = flex.createNode()
    c2.setWidth(50)

    box.insertChild(c1, 0)
    box.insertChild(c2, 1)
    flex.calculateLayout(box, 320, 100)

    // max-content = 40 + 5 (gap) + 50 = 95 → smallest >= 95 is 120
    expect(box.getComputedWidth()).toBe(120)
  })

  test("cqi entries resolve against CQ ancestor's frozen size", () => {
    const flex = createFlexily()
    const outer = flex.createNode()
    outer.setContainerType(C.CONTAINER_TYPE_INLINE_SIZE)
    outer.setContainSize(true)
    outer.setWidth(200)

    const box = flex.createNode()
    // fitWidth = [80, "100cqi"] → 80 or 200 (100% of outer's frozen 200)
    box.setFitWidth([80, { value: 100, unit: C.UNIT_CQI }])

    const child = flex.createNode()
    child.setWidth(150) // overflows lane 80, fits lane 200

    outer.insertChild(box, 0)
    box.insertChild(child, 0)
    flex.calculateLayout(outer, 200, 100)

    // max-content 150 → smallest fitting lane is "100cqi" = 200
    expect(box.getComputedWidth()).toBe(200)
  })

  test("setFitWidth(undefined) disables fit-width selection", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(100)
    box.insertChild(child, 0)

    flex.calculateLayout(box, 320, 100)
    expect(box.getComputedWidth()).toBe(120) // fit-width active

    box.setFitWidth(undefined) // disable
    flex.calculateLayout(box, 320, 100)
    // Without fit-width: auto-width root with one child → flexily's leaf-children
    // shrink-wrap path applies. Box becomes whatever its layout assigns —
    // typically the constraint width (auto + finite avail = avail - margins).
    expect(box.getComputedWidth()).not.toBe(120) // No longer locked to a lane
  })

  test("setFitWidth([]) disables fit-width selection", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([])
    // Should be equivalent to undefined — no lane selection

    const child = flex.createNode()
    child.setWidth(100)
    box.insertChild(child, 0)

    flex.calculateLayout(box, 320, 100)
    // Without fit-width: behaves like a normal Box.
    expect(box.getComputedWidth()).not.toBe(80)
    expect(box.getComputedWidth()).not.toBe(120)
  })

  test("fit-width box is stable across re-layout (no oscillation)", () => {
    const flex = createFlexily()
    const box = flex.createNode()
    box.setFitWidth([80, 120, 160])

    const child = flex.createNode()
    child.setWidth(100)
    box.insertChild(child, 0)

    const widths: number[] = []
    for (let i = 0; i < 8; i++) {
      flex.calculateLayout(box, 320, 100)
      widths.push(box.getComputedWidth())
    }
    expect(new Set(widths).size).toBe(1) // All 8 identical
    expect(widths[0]).toBe(120)
  })
})
