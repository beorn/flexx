/**
 * Deterministic cell-grid quantization for terminal layout (A0.1).
 *
 * Two policies:
 *
 *   - **Sizes** (`largestRemainder`): allocate a fixed integer total across
 *     items with fractional weights. Floor each, then distribute the leftover
 *     by descending remainder. Stable tiebreaker: input order.
 *
 *   - **Spacing** (`floorCells`): plain floor. Padding, margin, gap never
 *     get a "leftover cell" — they round down so the sum never exceeds the
 *     budget. Spacing's job is to consume budget predictably, not absorb it.
 *
 * Why this matters (recap from the dragon bead, §"Quantization policy"):
 *
 *   Without a stable policy, sub-cell drift accumulates differently each
 *   layout pass — a parent at 80 cells laying out three flex:1 children
 *   could oscillate between [27, 27, 26], [26, 27, 27], [27, 26, 27] across
 *   resizes. The visible effect is jitter on SIGWINCH bursts and "snap-left"
 *   at intermediate widths. Largest-remainder with input-order tiebreak
 *   pins the allocation: same inputs → byte-identical output.
 *
 * Late-binding contract (for A0.3 math functions): both fns are pure and
 * synchronous. Math functions (`min`/`max`/`clamp`) evaluate against the
 * cqi-resolved float values BEFORE quantization. Quantization is the final
 * pack step — never run mid-resolution.
 */

/**
 * Distribute `total` integer cells across `weights` using largest-remainder.
 *
 * Properties (verified by `tests/quantization.test.ts`):
 *
 *   - **Sum**: `result.reduce((a, b) => a + b) === total`
 *   - **Floor lower bound**: `result[i] >= Math.floor(total * weights[i] / sum)`
 *   - **Ceiling upper bound**: `result[i] <= Math.ceil(total * weights[i] / sum)`
 *   - **Stability**: identical inputs produce identical outputs (reference-equal not required)
 *   - **Monotone in total**: incrementing `total` by 1 increments exactly one slot by 1
 *   - **Stable tiebreak**: ties on remainder go to lower input index (DOM order)
 *
 * Edge cases:
 *
 *   - `weights.length === 0` → returns `[]`
 *   - `total === 0` → returns all-zero array of `weights.length`
 *   - `sum(weights) === 0` (all-zero weights) → returns all-zero array (degenerate but valid)
 *   - Negative weights are NOT supported; callers must coerce to ≥ 0 upstream.
 *   - Non-integer `total` is floored before allocation.
 *
 * @param weights Per-item weights (typically flex-grow factors or fractional shares). Must be ≥ 0.
 * @param total   Integer total cells to distribute. Floored if fractional.
 * @returns       Integer per-item allocation, sum === floor(total).
 */
export function largestRemainder(weights: readonly number[], total: number): number[] {
  const n = weights.length
  if (n === 0) return []

  const T = Math.floor(total)
  if (T <= 0) {
    const zeros = new Array<number>(n)
    for (let i = 0; i < n; i++) zeros[i] = 0
    return zeros
  }

  let sum = 0
  for (let i = 0; i < n; i++) sum += weights[i]

  if (sum <= 0) {
    const zeros = new Array<number>(n)
    for (let i = 0; i < n; i++) zeros[i] = 0
    return zeros
  }

  const result = new Array<number>(n)
  let allocated = 0

  // Pair-array of (index, remainder) for the leftover-cell distribution.
  // Allocated once; we sort by descending remainder with stable index tiebreak.
  const pairs: Array<{ index: number; remainder: number }> = new Array(n)

  for (let i = 0; i < n; i++) {
    const raw = (T * weights[i]) / sum
    const floor = Math.floor(raw)
    result[i] = floor
    allocated += floor
    pairs[i] = { index: i, remainder: raw - floor }
  }

  let leftover = T - allocated

  if (leftover > 0) {
    // Sort by descending remainder, then ascending index (stable tiebreak — DOM order wins).
    pairs.sort((a, b) => {
      const dr = b.remainder - a.remainder
      if (dr !== 0) return dr
      return a.index - b.index
    })

    for (let i = 0; i < n && leftover > 0; i++) {
      result[pairs[i].index] += 1
      leftover -= 1
    }
  }

  return result
}

/**
 * Floor a value to an integer cell count for spacing (padding, margin, gap).
 *
 * Negative inputs floor toward negative infinity (matches `Math.floor`), then
 * clamp to 0 — spacing is never negative. NaN and non-finite values clamp to 0
 * defensively (an upstream parser bug should not blow up layout).
 *
 * @param value Raw float cell value (post-cqi resolution, post-math-functions).
 * @returns     Integer cell count ≥ 0.
 */
export function floorCells(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0
  return Math.floor(value)
}
