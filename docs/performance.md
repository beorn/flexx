# Flexx Performance

This document explains why Flexx is faster than Yoga and provides benchmark methodology.

## Why Pure JavaScript Beats WASM

Flexx is 1.5-2x faster than Yoga for most layouts. This is counterintuitive—shouldn't compiled WASM be faster than interpreted JavaScript? The answer lies in where the work happens.

### JS/WASM Interop Overhead

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

Each boundary crossing involves:
- Type conversion (JS numbers ↔ WASM f64/i32)
- Memory read/write to WASM linear memory
- Function call overhead

For a 100-node layout, that's 400+ boundary crossings. The overhead adds up.

### Flexx: Everything Stays in JS

Flexx runs entirely in JavaScript. Property access is direct object field access—no boundary crossing, no type conversion, no memory marshalling.

```typescript
// Flexx: Direct field access
node.style.width = 100;  // Just a property write
node.flex.mainSize = 80; // Just a property write
```

Modern JS engines (V8, JSC, SpiderMonkey) heavily optimize this pattern.

### Zero-Allocation Design

The default Flexx algorithm eliminates temporary allocations during layout:

1. **FlexInfo structs on nodes** - Mutated in place, not reallocated
2. **Pre-allocated typed arrays** - For flex-line tracking
3. **Inline iteration** - No `filter()` calls that allocate arrays

This reduces GC pressure for high-frequency renders (60fps TUI updates).

See [zero-allocation.md](zero-allocation.md) for implementation details.

## Benchmark Results

All benchmarks on Apple M1 Max, Bun 1.3.7, with 1000-iteration JIT warmup.

### Flat Layouts

| Nodes | Flexx | Yoga | Winner |
|-------|-------|------|--------|
| 100 | 82 µs | 200 µs | Flexx 2.5x |
| 500 | 427 µs | 1045 µs | Flexx 2.4x |
| 1000 | 923 µs | 2191 µs | Flexx 2.4x |
| 2000 | 1707 µs | 4761 µs | Flexx 2.8x |
| 5000 | 4819 µs | 14720 µs | Flexx 3.1x |

The advantage grows with node count because each node means more JS/WASM boundary crossings for Yoga.

### Nested Layouts

| Depth | Flexx | Yoga | Winner |
|-------|-------|------|--------|
| 1 | 1.5 µs | 3.2 µs | Flexx 2.1x |
| 5 | 7.0 µs | 11.4 µs | Flexx 1.6x |
| 10 | 13 µs | 22 µs | Flexx 1.6x |
| 20 | 26 µs | 42 µs | Flexx 1.6x |
| 50 | 67 µs | 104 µs | Flexx 1.55x |
| 100 | 237 µs | 227 µs | ~Equal |

Flexx wins at all depths except 100 levels where they're equal.

### Feature-Specific

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

## Benchmark Variance

Cold benchmarks (without JIT warmup) show high variance:

| Engine | Cold RME | Warm RME |
|--------|----------|----------|
| Flexx | ±5-12% | ±1-3% |
| Yoga | ±0.3-1% | ±0.3-1% |

**Why?** Two factors affect cold JavaScript performance:
1. **JIT compilation** - JS engines need warmup to optimize hot paths
2. **GC pauses** - Object allocation triggers garbage collection cycles

WASM is AOT-compiled with manual memory management, so it's consistent from the first run.

**Implication:** For single cold-start layouts, performance is roughly equal. For repeated high-frequency layouts (TUI updates), Flexx pulls ahead after warmup. The zero-allocation design also minimizes GC pauses during sustained rendering.

## Running Benchmarks

```bash
# All benchmarks (cold)
bun bench

# With warmup (stable results)
bun bench bench/yoga-compare-warmup.bench.ts

# Feature comparison
bun bench bench/features.bench.ts
```

## When to Use Yoga Instead

- **Very deep nesting (100+ levels)** - Performance is equal, Yoga is more battle-tested
- **React Native ecosystem** - Yoga is the native choice
- **Cold single-shot layouts** - No warmup benefit for Flexx
