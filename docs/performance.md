# Flexx Performance

Detailed benchmarks and methodology for Flexx vs Yoga comparisons.

## Why Pure JavaScript Beats WASM

Every Yoga call crosses the JS/WASM boundary:

```
JS                          WASM
│                           │
├─ node.setWidth(100) ──────┼─► Write to linear memory
├─ node.setFlexGrow(1) ─────┼─► Write to linear memory
├─ node.insertChild() ──────┼─► Update pointers in memory
├─ calculateLayout() ───────┼─► Run layout algorithm
├─ node.getComputedWidth() ─┼─► Read from linear memory
```

Each boundary crossing involves:
- Type conversion (JS numbers ↔ WASM f64/i32)
- Memory read/write to WASM linear memory
- Function call overhead

For a 100-node layout, that's 400+ boundary crossings.

Flexx runs entirely in JavaScript. Property access is direct object field access—no boundary crossing, no type conversion.

## Benchmark Results

All benchmarks on Apple M1 Max, Bun 1.3.7, with 1000-iteration JIT warmup.

### Flat Layouts

| Nodes | Flexx   | Yoga     | Flexx Advantage |
| ----- | ------- | -------- | --------------- |
| 100   | 82 µs   | 200 µs   | 2.5x faster     |
| 500   | 427 µs  | 1045 µs  | 2.4x faster     |
| 1000  | 923 µs  | 2191 µs  | 2.4x faster     |
| 2000  | 1707 µs | 4761 µs  | 2.8x faster     |
| 5000  | 4819 µs | 14720 µs | 3.1x faster     |

### Nested Layouts

| Depth | Flexx  | Yoga   | Flexx Advantage |
| ----- | ------ | ------ | --------------- |
| 1     | 1.5 µs | 3.2 µs | 2.1x faster     |
| 5     | 7.0 µs | 11 µs  | 1.6x faster     |
| 10    | 13 µs  | 22 µs  | 1.6x faster     |
| 20    | 26 µs  | 42 µs  | 1.6x faster     |
| 50    | 67 µs  | 104 µs | 1.5x faster     |
| 100   | 237 µs | 227 µs | ~Equal          |

## Zero-Allocation Design

See [zero-allocation.md](zero-allocation.md) for implementation details.

Key techniques:
1. **FlexInfo structs on nodes** — Mutated in place, not reallocated
2. **Pre-allocated typed arrays** — For flex-line tracking
3. **Inline iteration** — No `filter()` calls that allocate arrays

## Benchmark Variance

| Engine | Cold RME  | Warm RME  |
| ------ | --------- | --------- |
| Flexx  | ±5-12%    | ±1-3%     |
| Yoga   | ±0.3-1%   | ±0.3-1%   |

**Why the difference?** JS engines need warmup to optimize hot paths. WASM is AOT-compiled, so it's consistent from the first run.

**Implication:** For repeated high-frequency layouts (TUI updates), Flexx pulls ahead after warmup.

## Running Benchmarks

```bash
# All benchmarks (cold)
bun bench

# With warmup (stable results)
bun bench bench/yoga-compare-warmup.bench.ts
```

## When to Use Yoga Instead

- **Very deep nesting (100+ levels)** — Performance is equal, Yoga is more battle-tested
- **React Native ecosystem** — Yoga is the native choice
- **Cold single-shot layouts** — No warmup benefit for Flexx
