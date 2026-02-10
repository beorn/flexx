# Flexx Performance

Flexx and Yoga each win in different scenarios. The right choice depends on your workload.

## Performance Profile

Flexx's pure JavaScript architecture creates a distinctive performance profile compared to Yoga's WASM:

| Scenario | Winner | Margin | Why |
|----------|--------|--------|-----|
| **Initial layout** (create + layout) | Flexx | 1.5-2.5x | JS node creation is cheap; no WASM boundary crossings |
| **No-change re-layout** | Flexx | **5.5x** | Fingerprint cache catches unchanged trees at the root |
| **Incremental re-layout** (single dirty leaf) | Yoga | 2.8-3.4x | WASM per-node computation is faster |
| **Full re-layout** (constraint change on pre-existing tree) | Yoga | 2.7x | Same reason — WASM layout computation is faster |
| **Deep nesting** (15+ levels) | Yoga | increasing | Flexx's function call overhead compounds at depth |

**Key insight**: Flexx wins at node creation and cache hits. Yoga wins at raw layout computation. The "2x faster" initial-layout advantage comes from JS node creation being ~8x cheaper than WASM node creation, which more than compensates for Yoga's faster layout algorithm.

## Why These Trade-offs Exist

### JS/WASM Interop: Flexx's Initial Layout Advantage

Yoga's WASM module is fast internally, but every interaction crosses the JS/WASM boundary:

```
JS                          WASM
│                           │
├─ node.setWidth(100) ──────┼─► Write to linear memory
├─ node.setFlexGrow(1) ─────┼─► Write to linear memory
├─ node.insertChild() ──────┼─► Update pointers in memory
├─ calculateLayout() ───────┼─► Run layout algorithm
├─ node.getComputedWidth() ─┼─► Read from linear memory
│                           │
```

Each boundary crossing involves type conversion, memory read/write, and function call overhead. For a 100-node layout, that's 400+ crossings. This makes Yoga's node creation ~8x slower than Flexx's pure-JS creation, which dominates initial layout benchmarks.

### WASM Computation: Yoga's Re-layout Advantage

When re-laying out a pre-existing tree, node creation is amortized away. The benchmark becomes pure layout computation, where WASM's compiled code outperforms JIT-compiled JavaScript. Flexx's per-node overhead (5-field fingerprint comparison, cache management) is more expensive than Yoga's simpler dirty-flag check.

### Fingerprint Cache: Flexx's No-Change Advantage

Flexx stores a 5-field fingerprint per node: `(availableWidth, availableHeight, direction, offsetX, offsetY)`. When `calculateLayout()` is called with unchanged constraints on a clean tree, Flexx checks the fingerprint at the root and returns immediately — **zero tree traversal**. Yoga must still walk the tree to verify nothing changed.

This makes Flexx **5.5x faster** for the common case of cursor movement, selection changes, and other UI updates that don't affect layout.

### Zero-Allocation Design

The layout algorithm eliminates temporary allocations during layout:

1. **FlexInfo structs on nodes** — Mutated in place, not reallocated each pass
2. **Pre-allocated typed arrays** — For flex-line tracking
3. **Inline iteration** — No `filter()` calls that allocate intermediate arrays

This reduces GC pressure for high-frequency renders.

See [zero-allocation.md](zero-allocation.md) for implementation details.

## Benchmark Results

All benchmarks on Apple M-series, Bun, with JIT warmup. Times are mean per operation.

### Initial Layout (Create + Layout)

The primary benchmark. Includes tree creation + `calculateLayout()`.

#### Flat Layouts

| Nodes | Flexx | Yoga | Ratio |
|-------|-------|------|-------|
| 100 | 74 µs | 157 µs | Flexx 2.1x |
| 500 | 371 µs | 835 µs | Flexx 2.3x |
| 1000 | 767 µs | 1797 µs | Flexx 2.3x |
| 2000 | 1497 µs | 3937 µs | Flexx 2.6x |
| 5000 | 4929 µs | 12496 µs | Flexx 2.5x |

#### TUI Board (columns × bordered cards with measure functions)

This mirrors real terminal UI structure: columns with headers, bordered card containers, icon + text rows, text nodes with measure functions.

| Structure | ~Nodes | Flexx | Yoga | Ratio |
|-----------|--------|-------|------|-------|
| 3×5 | 64 | 124 µs | 191 µs | Flexx 1.5x |
| 5×10 | 206 | 367 µs | 619 µs | Flexx 1.7x |
| 5×20 | 406 | 605 µs | 1234 µs | Flexx 2.0x |
| 8×30 | 969 | 1479 µs | 3015 µs | Flexx 2.0x |

#### Property-Rich (shrink, align, justify, wrap)

Trees using diverse flex properties (justifyContent, alignItems, alignSelf, flexWrap, flexShrink, margin).

| Nodes | Flexx | Yoga | Ratio |
|-------|-------|------|-------|
| ~100 | 228 µs | 284 µs | Flexx 1.2x |
| ~300 | 635 µs | 861 µs | Flexx 1.4x |
| ~600 | 1348 µs | 1762 µs | Flexx 1.3x |

#### Deep Nesting

| Depth | Flexx | Yoga | Ratio |
|-------|-------|------|-------|
| 1 | 1.4 µs | 3.1 µs | Flexx 2.2x |
| 5 | 7.3 µs | 11 µs | Flexx 1.5x |
| 10 | 19 µs | 21 µs | Flexx 1.1x |
| 15 | 39 µs | 31 µs | Yoga 1.3x |
| 20 | 53 µs | 41 µs | Yoga 1.3x |
| 50 | 255 µs | 101 µs | Yoga 2.5x |

Flexx wins at shallow nesting but Yoga overtakes at 15+ levels.

### Re-layout (Pre-existing Tree)

For applications that create the tree once and re-layout repeatedly (React UIs, TUI apps).

#### No-Change Re-layout

When nothing changed — tests the fingerprint cache (Flexx's key innovation).

| Structure | Flexx | Yoga | Ratio |
|-----------|-------|------|-------|
| 5×20 TUI (~406 nodes) | 0.027 µs | 0.15 µs | **Flexx 5.5x** |
| 8×30 TUI (~969 nodes) | 0.026 µs | 0.14 µs | **Flexx 5.5x** |

Flexx returns in **27 nanoseconds** regardless of tree size — fingerprint check at root, zero traversal.

#### Single Leaf Dirty (Incremental)

One text node marked dirty, full tree re-laid out. The most common update pattern.

| Structure | Flexx | Yoga | Ratio |
|-----------|-------|------|-------|
| 5×20 TUI (~406 nodes) | 123 µs | 37 µs | Yoga 3.4x |
| 8×30 TUI (~969 nodes) | 244 µs | 87 µs | Yoga 2.8x |

#### Width Change Cycle (120→80→120)

Full constraint change requiring complete re-layout.

| Structure | Flexx | Yoga | Ratio |
|-----------|-------|------|-------|
| 5×20 TUI (~406 nodes) | 955 µs (2 layouts) | 353 µs (2 layouts) | Yoga 2.7x |

### Feature-Specific Benchmarks

| Feature | Winner | Margin |
|---------|--------|--------|
| AbsolutePositioning | Flexx | 3.5x |
| FlexShrink | Flexx | 2.7x |
| AlignContent | Flexx | 2.3x |
| FlexGrow | Flexx | 1.9x |
| Gap | Flexx | 1.5x |
| MeasureFunc | Flexx | 1.4x |
| FlexWrap | Flexx | 1.2x |
| PercentValues | ~Equal | - |

These are initial layout benchmarks (create + layout), where Flexx's node creation advantage dominates.

## Real-World Performance Mix

For a terminal UI app (our primary target), the operation mix is roughly:

| Operation | Frequency | Winner |
|-----------|-----------|--------|
| Initial render | Once | Flexx 1.5-2x |
| Cursor movement (no layout change) | Very frequent | **Flexx 5.5x** |
| Content edit (single node dirty) | Frequent | Yoga 3x |
| Window resize | Occasional | Yoga 2.7x |

The no-change case dominates in interactive TUIs (most keystrokes don't change layout). Flexx's fingerprint cache makes this essentially free.

## Benchmark Variance

| Engine | Cold RME | Warm RME |
|--------|----------|----------|
| Flexx | ±5-12% | ±1-3% |
| Yoga | ±0.3-1% | ±0.3-1% |

WASM is AOT-compiled with manual memory management, so it's consistent from the first run. JavaScript needs JIT warmup. For sustained rendering, both stabilize.

## Running Benchmarks

```bash
# Quick comparison (flat + deep, with warmup)
bun bench bench/yoga-compare-warmup.bench.ts

# Real-world scenarios (TUI boards, measure functions, property diversity)
bun bench bench/yoga-compare-rich.bench.ts

# Incremental re-layout (no-change, dirty leaf, resize)
bun bench bench/incremental.bench.ts

# Feature-specific
bun bench bench/features.bench.ts
```

## When to Use Yoga Instead

- **Frequent incremental re-layout** — If your primary workload is single-node updates on large pre-existing trees, Yoga's WASM layout computation is 2-3x faster
- **Deep nesting (15+ levels)** — Yoga's per-node overhead is lower
- **React Native ecosystem** — Yoga is the native choice
- **Cold single-shot layouts** — No warmup benefit for Flexx
