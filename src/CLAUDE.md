# Flexx Internals

Read this before modifying any source file. This documents the layout algorithm, zero-allocation design, caching system, and integration points.

## Architecture Overview

Flexx is a pure-JavaScript flexbox layout engine with a Yoga-compatible API. The "zero" in `layout-zero.ts` / `node-zero.ts` means **zero-allocation layout** -- the layout pass reuses pre-allocated structures instead of creating temporary objects on the heap.

```
                            Public API
                          ┌────────────┐
                          │  index.ts  │  Re-exports Node + constants
                          └─────┬──────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
         ┌──────┴──────┐                 ┌──────┴──────┐
         │ node-zero.ts│                 │layout-zero.ts│
         │  (1412 LOC) │                 │  (2485 LOC)  │
         │  Node class │                 │  Algorithm   │
         └──────┬──────┘                 └──────┬───────┘
                │                               │
         ┌──────┴──────┐                 ┌──────┴──────┐
         │  types.ts   │                 │  utils.ts   │
         │  Interfaces │                 │  Helpers    │
         └─────────────┘                 └─────────────┘

         constants.ts - Yoga-compatible enum values
         logger.ts    - Optional debug logging (conditional)
         testing.ts   - Layout inspection + differential oracles
         classic/     - Allocating algorithm (debugging reference)
```

**Key design decisions:**
- Factory function API: `Node.create()` (no `new` in user code, though `Node` is a class internally)
- Yoga-compatible API surface: same method names, same constants, drop-in replacement
- Pure JavaScript: no WASM, no native dependencies, synchronous initialization
- Single-threaded: layout uses module-level pre-allocated arrays (not reentrant)

## Source Files

| File | LOC | Role | Hot path? |
|------|-----|------|-----------|
| `layout-zero.ts` | 2485 | Core layout algorithm | **Yes** - most critical |
| `node-zero.ts` | 1412 | Node class, tree ops, caching | **Yes** - second most critical |
| `types.ts` | 229 | `FlexInfo`, `Style`, `Layout`, `Value` interfaces | No (types only) |
| `utils.ts` | 217 | `resolveValue`, `applyMinMax`, edge helpers, shared traversal stack | Yes (called frequently) |
| `constants.ts` | 81 | Yoga-compatible numeric constants | No |
| `logger.ts` | 67 | Conditional debug logger (`log.debug?.()`) | No (conditional) |
| `testing.ts` | 209 | `getLayout`, `diffLayouts`, `expectRelayoutMatchesFresh` | No (test only) |
| `classic/` | ~800 | Allocating reference algorithm | No (debugging only) |

## Layout Algorithm Phases

`layoutNode()` in `layout-zero.ts` implements CSS Flexbox Section 9.7. It is called recursively for each node. The algorithm has 11 phases:

### Phase 1: Early Exit Checks
- `display: none` -> zero-size return
- **Constraint fingerprinting**: If `layoutValid && !isDirty && same(availW, availH, dir)`, skip layout entirely. Only update position delta if offset changed. This is the core of the 5.5x re-layout speedup.

### Phase 2: Resolve Spacing
- Resolve margins, padding, borders from `Value` (point/percent/auto) to absolute numbers
- CSS spec: percentage margins AND padding resolve against containing block's **width only**
- Logical edges (START/END) resolve based on `direction` (LTR/RTL)

### Phase 3: Calculate Node Dimensions
- Resolve width/height from style (point, percent, or auto/NaN)
- Apply aspect ratio constraint
- Apply min/max constraints
- Compute content area (inside border+padding)
- Compute position offsets for relative/static children

### Phase 4: Handle Leaf Nodes
Two cases:
- **With measureFunc**: Call `cachedMeasure()` to get intrinsic size (text nodes)
- **Without measureFunc**: Intrinsic size = padding + border (empty boxes)

### Phase 5: Collect Children and Compute Base Sizes
Single pass over children:
- Skip `display:none` and `position:absolute` (set `relativeIndex = -1`)
- Cache all 4 resolved margins on `child.flex`
- Compute base size from: `flexBasis` > explicit `width`/`height` > `measureFunc` > recursive `measureNode` > padding+border
- Track flex factors, min/max, auto margins
- **CSS 4.5 divergence**: For `overflow:hidden/scroll`, force `flexShrink >= 1` (Yoga doesn't do this)

### Phase 6a: Line Breaking and Space Distribution
- `breakIntoLines()` splits children into flex lines (for wrap)
- `distributeFlexSpaceForLine()` implements CSS 9.7 iterative freeze algorithm:
  - Positive free space -> grow (distribute by `flexGrow` ratio)
  - Negative free space -> shrink (distribute by `flexShrink * baseSize` ratio -- weighted shrink)
  - Items that hit min/max are "frozen"; iteration continues with remaining items
  - Single-child fast path skips iteration

### Phase 6b: Justify-Content and Auto Margins (Per Line)
- Auto margins absorb space BEFORE `justifyContent` (CSS spec)
- Per-line calculation for multi-line (flex-wrap) layouts
- Space-between/around/evenly only apply with positive remaining space

### Phase 6c: Baseline Alignment
- Pre-compute baselines for `align-items: baseline` (row direction only)
- Uses `baselineFunc` if set, otherwise falls back to bottom of content box

### Phase 7a: Estimate Line Cross Sizes
- Tentative cross-axis sizes from definite child dimensions
- Auto-sized children use 0 (actual size computed in Phase 8)

### Phase 7b: Apply alignContent
- Distribute flex lines within the cross-axis (stretch, center, space-between, etc.)
- Yoga quirk: `ALIGN_STRETCH` applies even to single-line layouts

### Phase 8: Position and Layout Children
The most complex phase. For each relative child:
1. Determine cross-axis alignment (alignItems/alignSelf)
2. Resolve cross-axis size (explicit, percent, stretch, or shrink-wrap/NaN)
3. Handle measure function for intrinsic sizing
4. Compute fractional position (main-axis from `mainPos`, cross-axis from `lineCrossOffset`)
5. **Edge-based rounding** (Yoga-compatible): Round absolute edges, derive sizes as `round(end) - round(start)`. This prevents pixel gaps between adjacent elements.
6. Recursively call `layoutNode()` for grandchildren
7. Override sizes based on flex distribution results
8. Apply cross-axis alignment offset (flex-end, center, baseline)
9. Advance `mainPos` for next child

### Phase 9: Shrink-Wrap Auto-Sized Containers
- For containers without explicit size, compute actual used space from children
- Main axis: sum of child sizes + margins + gaps
- Cross axis: max child size + margins

### Phase 10: Final Output
- Edge-based rounding for the node itself
- Position stored as relative (to parent), not absolute

### Phase 11: Layout Absolute Children
- Absolute children positioned relative to padding box (not content box)
- Support for left/right/top/bottom offsets
- Auto margins for centering
- Alignment when no position is set

## Zero-Allocation Design

### Why It Matters
Interactive TUIs re-layout on every keystroke. GC pauses cause visible jank. Flexx avoids heap allocation during layout passes.

### Module-Level Pre-Allocated Arrays
```typescript
// Used for flex-wrap multi-line layouts (layout-zero.ts)
let _lineCrossSizes = new Float64Array(32)   // Cross-axis size per line
let _lineCrossOffsets = new Float64Array(32)  // Cross-axis offset per line
let _lineLengths = new Uint16Array(32)        // Children per line
let _lineChildren: Node[][] = Array(32)       // Node refs per line
let _lineJustifyStarts = new Float64Array(32) // Per-line justify start
let _lineItemSpacings = new Float64Array(32)  // Per-line item spacing
```
These grow dynamically if >32 lines (rare). Total memory: ~768 bytes.

**Consequence: Not reentrant.** Layout is single-threaded; concurrent `calculateLayout()` calls corrupt shared state. This is safe because layout is synchronous.

### Per-Node FlexInfo (`node.flex`)
Instead of creating `ChildLayout` objects per child per pass, intermediate layout state is stored directly on each node in the `_flex: FlexInfo` field. This struct is mutated in place each pass:

```typescript
interface FlexInfo {
  // Flex distribution state (mutated during Phase 5-6)
  mainSize, baseSize, mainMargin, flexGrow, flexShrink
  minMain, maxMain, frozen
  mainStartMarginAuto, mainEndMarginAuto
  mainStartMarginValue, mainEndMarginValue
  marginL, marginT, marginR, marginB
  lineIndex, relativeIndex, baseline

  // Constraint fingerprinting (mutated at end of layoutNode)
  lastAvailW, lastAvailH, lastOffsetX, lastOffsetY
  lastDir, layoutValid
}
```

### Shared Traversal Stack
```typescript
// utils.ts - single pre-allocated stack for all iterative traversals
export const traversalStack: unknown[] = []
```
Used by `markSubtreeLayoutSeen`, `countNodes`, `resetLayoutCache`, `propagatePositionDelta`. Avoids recursion (prevents stack overflow on deep trees) and avoids per-traversal allocation.

### Measure Cache (Per-Node)
4-entry numeric cache on each Node (`_m0` through `_m3`), avoiding Map/object allocations:
```typescript
interface MeasureEntry { w, wm, h, hm, rw, rh }
```
Returns a stable `_measureResult` object (mutated in place) to avoid allocation on cache hits. Cache is cleared on `markDirty()`.

### Layout Cache (Per-Node)
2-entry cache (`_lc0`, `_lc1`) for sizing passes. Stores `availW, availH -> computedW, computedH`. Cleared at start of each `calculateLayout()` pass. Returns a stable `_layoutResult` object. Uses `-1` as invalidation sentinel (not `NaN`, because `Object.is(NaN, NaN)` is true and would cause false hits).

## Caching and Dirty Tracking

### Dirty Propagation
`markDirty()` propagates up to root:
1. Clears measure cache (`_m0-_m3`) and layout cache (`_lc0-_lc1`) on every ancestor
2. Sets `_isDirty = true`
3. Invalidates `flex.layoutValid`
4. Stops early if an ancestor is already dirty (caches still cleared)

**Subtlety**: Even if a node is already dirty, child changes may invalidate cached layout results that used the old child size. That's why caches are always cleared, even when `_isDirty` is already true.

### Constraint Fingerprinting
The core re-layout optimization. At the end of `layoutNode()`, fingerprint values are stored:
```typescript
flex.lastAvailW = availableWidth
flex.lastAvailH = availableHeight
flex.lastOffsetX = offsetX
flex.lastOffsetY = offsetY
flex.lastDir = direction
flex.layoutValid = true
```

On next call, if `layoutValid && !isDirty && same constraints`, the entire subtree is skipped. Only position delta is propagated (if offset changed).

**`Object.is()` is required** for NaN-safe comparison. `NaN === NaN` is `false`; `Object.is(NaN, NaN)` is `true`. NaN represents "unconstrained" -- a legitimate and common constraint value.

### Invalidation Triggers
`layoutValid` is set to `false` when:
- `markDirty()` is called (style change, content change)
- A sibling is inserted/removed (positions change)

### `calculateLayout()` Top-Level Skip
The root node also has a constraint-based skip:
```typescript
if (!this._isDirty && same(_lastCalcW, availW) && same(_lastCalcH, availH) && _lastCalcDir === dir)
  return  // No layout needed at all
```
This makes the no-change case ~27ns (a simple comparison, not even entering the algorithm).

## Edge-Based Rounding (Yoga-Compatible)

**Problem**: Naive `Math.round(width)` creates pixel gaps between adjacent elements. If child1 has `width=10.5` and child2 starts at `x=10.5`, rounding each independently gives `width=11` and `x=11` -- 0.5px gap.

**Solution**: Round **absolute edge positions**, then derive sizes as differences:
```typescript
const absLeft = Math.round(absX + marginLeft + fractionalLeft)
const absRight = Math.round(absX + marginLeft + fractionalLeft + childWidth)
child.layout.width = absRight - absLeft  // Always gap-free
```

This is Yoga's algorithm. Layout positions stored in `layout.left`/`layout.top` are **relative** to parent.

## measureNode vs layoutNode

`measureNode()` (~240 lines) is a lightweight alternative to `layoutNode()` (~1650 lines). It computes `width` and `height` but NOT `left`/`top`. Used during Phase 5 for intrinsic sizing of auto-sized container children. Save/restore of `layout.width`/`layout.height` is required around `measureNode` calls because it overwrites those fields.

## Integration: How inkx Uses Flexx

inkx uses flexx through an adapter layer:
1. `inkx/src/layout-engine.ts` defines the `LayoutEngine` / `LayoutNode` interfaces
2. `inkx/src/adapters/flexx-zero-adapter.ts` wraps `Node` in `FlexxZeroNodeAdapter`
3. The adapter is mostly delegation (Flexx already has a Yoga-compatible API)
4. Measure modes are translated from numeric constants to strings (`"exactly"`, `"at-most"`, `"undefined"`)

inkx calls `calculateLayout()` on every render. The no-change case (cursor movement, selection) is the most common scenario in the km TUI, which is why the 5.5x fingerprint-cache advantage matters.

## Intentional Divergences from Yoga

| Behavior | Yoga | Flexx | CSS Spec |
|----------|------|-------|----------|
| `overflow:hidden/scroll` + `flexShrink:0` | Item expands to content (ignores parent) | Item shrinks to fit parent | 4.5: auto min-size = 0 for overflow containers |
| Default `flexShrink` | 0 (Yoga native default) | 0 (matches Yoga) | CSS default is 1 |
| Default `flexDirection` | Column | Column | CSS default is Row |
| Baseline alignment | Full spec (recursive first-child) | Simplified (no recursive propagation) | Recursive first-child |

The `flexShrink` override for overflow containers (line ~1244 in layout-zero.ts) is the most significant divergence. Without it, `overflow:hidden` children inside constrained parents balloon to content size, defeating the purpose of clipping.

## Style and Value System

### Value Type
```typescript
interface Value { value: number; unit: number }
// unit: UNIT_UNDEFINED(0), UNIT_POINT(1), UNIT_PERCENT(2), UNIT_AUTO(3)
```

### Style Storage
Edge-based properties use 6-element arrays: `[left, top, right, bottom, start, end]`
- Physical edges: indices 0-3
- Logical edges: indices 4-5 (resolved at layout time based on direction)
- Logical takes precedence over physical when both are set

Border widths are plain numbers (always points). Logical border slots use `NaN` as "not set" sentinel.

### Default Style (Yoga-compatible, not CSS)
```typescript
flexDirection: COLUMN      // CSS default is ROW
flexShrink: 0              // CSS default is 1
alignItems: STRETCH        // Same as CSS
flexBasis: AUTO            // Same as CSS
width/height: AUTO         // Same as CSS
positionType: RELATIVE     // Same as CSS
```

## Performance Characteristics

### Where Flexx Wins
- **Node creation**: ~8x cheaper than Yoga (no WASM boundary crossing)
- **Initial layout**: 1.5-2.5x faster (JS node creation dominates)
- **No-change re-layout**: 5.5x faster (fingerprint cache, 27ns regardless of tree size)
- **Bundle size**: 7x smaller raw, 5x smaller gzipped

### Where Yoga Wins
- **Incremental re-layout** (dirty leaf in existing tree): 2.8-3.4x faster (WASM per-node computation is faster)
- **Deep nesting** (15+ levels): Yoga's advantage increases with depth

### For TUI Use Cases
The no-change case dominates (cursor movement, selection, scrolling). Flexx's fingerprint cache makes this essentially free. This is the key differentiator.

## Common Pitfalls

### Modifying layout-zero.ts
1. **Always benchmark** after any change (see instructions below)
2. **Don't allocate in the hot path** -- no `new`, no object literals, no array construction inside `layoutNode()` or `distributeFlexSpaceForLine()`
3. **NaN semantics are load-bearing** -- `NaN` means "unconstrained/auto". Use `Number.isNaN()` checks, not `=== NaN`. Use `Object.is()` for equality comparison.
4. **Edge-based rounding must use absolute coordinates** -- rounding relative positions creates gaps
5. **Save/restore `layout.width`/`layout.height` around `measureNode`** -- it overwrites those fields with intrinsic measurements

### Modifying node-zero.ts
1. **markDirty() always clears caches** -- even if node is already dirty, because child content may have changed
2. **Cache invalidation uses `-1` sentinel, not `NaN`** -- because `Object.is(NaN, NaN)` is true, NaN would cause false cache hits
3. **Lazy allocation for cache entries** -- `_m0` through `_m3` and `_lc0`/`_lc1` are `undefined` until first use

### Modifying caching/fingerprinting
1. **Run the re-layout fuzz tests**: `bun test tests/relayout-consistency.test.ts` (1200+ tests)
2. **Run mutation testing**: `bun scripts/mutation-test.ts` to verify fuzz suite catches deliberate cache mutations
3. The differential oracle (`expectRelayoutMatchesFresh`) is the primary correctness tool: build tree -> layout -> dirty -> re-layout -> compare against fresh layout

### Adding features
1. Update `createDefaultStyle()` in `types.ts` with correct default
2. Add setter/getter to `Node` class (call `markDirty()` in setters)
3. Handle in `layoutNode()` (and `measureNode()` if it affects sizing)
4. Add to Yoga compatibility tests if corresponding Yoga behavior exists
5. Verify re-layout fuzz tests still pass

## Benchmarking Protocol

After ANY change to `layout-zero.ts` or `node-zero.ts`:

```bash
# 1. Check CPU load -- no heavy processes running
top -l 1 -n 5 -stats command,cpu | head -10

# 2. Run benchmark
cd vendor/beorn-flexx && bun bench bench/yoga-compare-warmup.bench.ts

# 3. Compare against baseline:
#    Flexx should be ~2x Yoga for flat trees
#    Flexx should be ~2.3x Yoga for shallow deep trees
#    No-change re-layout should be ~5.5x Yoga

# 4. If you changed source, rebuild:
cd vendor/beorn-flexx && bun run build
```

**Acceptable impact:**
- Regressions < 5% for minor features
- No regressions for refactoring (must be neutral or faster)
- Document any trade-offs

## Testing Hierarchy

| Layer | Tests | Command | What it verifies |
|-------|-------|---------|-----------------|
| Yoga compat | 41 | `bun test tests/yoga-compat/` | Identical output to Yoga |
| Feature tests | ~110 | `bun test tests/layout/` | Each flexbox feature in isolation |
| **Re-layout fuzz** | **1200+** | `bun test tests/relayout-consistency.test.ts` | Incremental matches fresh |
| Mutation testing | 4+ | `bun scripts/mutation-test.ts` | Fuzz catches cache mutations |
| All tests | 1357 | `bun test` | Everything |

The fuzz tests are the most important layer. They've caught 3 distinct caching bugs that all single-pass tests missed.
