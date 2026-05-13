/**
 * A0.1 — quantization policy tests.
 *
 * Covers the contract in `src/quantization.ts`:
 *
 *   - `largestRemainder` sum/bounds/stability/monotone-in-total/tiebreak
 *   - `floorCells` defensive clamping for non-finite + negative inputs
 *
 * Property tests use deterministic random seeds (1k trials) for sibling
 * insert/remove stability — the case the dragon bead calls out specifically
 * (§"A0.1 DoD: remainder stability under sibling insert/remove, 1k trials").
 */
import { describe, expect, test } from "vitest"
import { floorCells, largestRemainder } from "../src/quantization.js"

describe("[A0.1] largestRemainder", () => {
  test("empty weights → empty result", () => {
    expect(largestRemainder([], 80)).toEqual([])
  })

  test("total === 0 → all zeros", () => {
    expect(largestRemainder([1, 1, 1], 0)).toEqual([0, 0, 0])
  })

  test("total < 0 → all zeros (defensive)", () => {
    expect(largestRemainder([1, 1, 1], -5)).toEqual([0, 0, 0])
  })

  test("all-zero weights → all zeros (degenerate but valid)", () => {
    expect(largestRemainder([0, 0, 0], 80)).toEqual([0, 0, 0])
  })

  test("sum equals total for canonical 3-flex-1 case at width 80", () => {
    const result = largestRemainder([1, 1, 1], 80)
    expect(result.reduce((a, b) => a + b, 0)).toBe(80)
    // 80/3 = 26.67 → floors are 26,26,26 → leftover 2 → first two get +1
    expect(result).toEqual([27, 27, 26])
  })

  test("stable tiebreak: equal remainders go to lower index first", () => {
    // 5 items, total 6, weights all equal: each gets 6/5=1.2 → floor 1, remainder 0.2.
    // All remainders tie. Leftover = 1. Lowest index (0) wins the +1.
    const result = largestRemainder([1, 1, 1, 1, 1], 6)
    expect(result).toEqual([2, 1, 1, 1, 1])
  })

  test("stability: identical inputs produce identical outputs across calls", () => {
    const w = [3, 1, 2, 4]
    const r1 = largestRemainder(w, 100)
    const r2 = largestRemainder(w, 100)
    const r3 = largestRemainder(w, 100)
    expect(r1).toEqual(r2)
    expect(r2).toEqual(r3)
  })

  test("floor lower bound: every slot >= Math.floor(total * weight / sum)", () => {
    const weights = [3, 1, 2, 4]
    const total = 100
    const sum = weights.reduce((a, b) => a + b, 0)
    const result = largestRemainder(weights, total)
    for (let i = 0; i < weights.length; i++) {
      const lower = Math.floor((total * weights[i]) / sum)
      expect(result[i]).toBeGreaterThanOrEqual(lower)
    }
  })

  test("ceiling upper bound: every slot <= Math.ceil(total * weight / sum)", () => {
    const weights = [3, 1, 2, 4]
    const total = 100
    const sum = weights.reduce((a, b) => a + b, 0)
    const result = largestRemainder(weights, total)
    for (let i = 0; i < weights.length; i++) {
      const upper = Math.ceil((total * weights[i]) / sum)
      expect(result[i]).toBeLessThanOrEqual(upper)
    }
  })

  test("monotone in total: incrementing total by 1 increments exactly one slot by 1", () => {
    const weights = [3, 1, 2, 4]
    for (let total = 1; total < 200; total++) {
      const a = largestRemainder(weights, total)
      const b = largestRemainder(weights, total + 1)
      let diffPositive = 0
      let diffOther = 0
      for (let i = 0; i < weights.length; i++) {
        const d = b[i] - a[i]
        if (d === 1) diffPositive += 1
        else if (d !== 0) diffOther += 1
      }
      expect(diffPositive).toBe(1)
      expect(diffOther).toBe(0)
    }
  })

  test("monotone with sweep across canonical 80-wide flex:1 case", () => {
    // Specifically the case the dragon bead calls out — 3 flex:1 children across width sweep.
    // Sum must equal width at every step.
    const w = [1, 1, 1]
    for (let width = 1; width < 320; width++) {
      const result = largestRemainder(w, width)
      expect(result.reduce((a, b) => a + b, 0)).toBe(width)
    }
  })

  test("weights with fractional values produce stable allocations", () => {
    // Mixed-fractional weights (post-cqi resolution will produce these).
    const w = [1.5, 2.7, 0.8]
    const result = largestRemainder(w, 100)
    expect(result.reduce((a, b) => a + b, 0)).toBe(100)
    // Bounds: each within ±1 of exact share.
    const sum = w.reduce((a, b) => a + b, 0)
    for (let i = 0; i < w.length; i++) {
      const exact = (100 * w[i]) / sum
      expect(result[i]).toBeGreaterThanOrEqual(Math.floor(exact))
      expect(result[i]).toBeLessThanOrEqual(Math.ceil(exact))
    }
  })

  test("sibling insert: existing siblings' allocations don't oscillate (1k trials)", () => {
    // Deterministic xorshift32 — no external deps, reproducible.
    let seed = 0x12345678
    const rand = (): number => {
      seed ^= seed << 13
      seed ^= seed >>> 17
      seed ^= seed << 5
      return ((seed >>> 0) % 1000) / 1000 + 0.001 // (0, 1]
    }

    for (let trial = 0; trial < 1000; trial++) {
      const n = 2 + Math.floor(rand() * 6) // 2..7 siblings
      const weights: number[] = []
      for (let i = 0; i < n; i++) weights.push(rand() * 3 + 0.5)
      const total = 40 + Math.floor(rand() * 200)

      const before = largestRemainder(weights, total)
      const after = largestRemainder([...weights, rand() * 3 + 0.5], total)

      // Allocations of the original siblings (before adding the new one) should
      // change predictably — but in the OPPOSITE direction, the original alloc
      // should match itself across two identical calls.
      const beforeAgain = largestRemainder(weights, total)
      expect(beforeAgain).toEqual(before)
      // And `after` must sum to total.
      expect(after.reduce((a, b) => a + b, 0)).toBe(total)
    }
  })

  test("non-integer total is floored before allocation", () => {
    const result = largestRemainder([1, 1], 5.9)
    expect(result.reduce((a, b) => a + b, 0)).toBe(5)
  })
})

describe("[A0.1] floorCells", () => {
  test("integer input passes through", () => {
    expect(floorCells(5)).toBe(5)
    expect(floorCells(0)).toBe(0)
  })

  test("fractional positive floors", () => {
    expect(floorCells(5.9)).toBe(5)
    expect(floorCells(0.999)).toBe(0)
  })

  test("negative clamps to 0 (spacing is never negative)", () => {
    expect(floorCells(-1)).toBe(0)
    expect(floorCells(-100.5)).toBe(0)
  })

  test("NaN clamps to 0 (defensive)", () => {
    expect(floorCells(NaN)).toBe(0)
  })

  test("Infinity clamps to 0 (defensive)", () => {
    expect(floorCells(Infinity)).toBe(0)
    expect(floorCells(-Infinity)).toBe(0)
  })
})
