# Flexx vs Yoga: Layout Engine Comparison

Flexx is a pure JavaScript flexbox layout engine with a Yoga-compatible API.

**TL;DR:** Flexx is **1.5-3x faster for flat layouts**, **5x smaller** than Yoga, with a synchronous API and zero dependencies. Yoga is faster for deeply nested layouts.

## Status

|                      | Yoga                                                 | Flexx                                        |
| -------------------- | ---------------------------------------------------- | -------------------------------------------- |
| **Maturity**         | Production, battle-tested (React Native, Ink, Litho) | Production-ready, fully tested               |
| **Test coverage**    | Extensive (auto-generated from Chrome)               | 524 tests, 41/41 Yoga compatibility          |
| **Real-world usage** | Millions of apps                                     | Used in production by inkx                   |

---

## Why Flexx Exists

| Concern            | Yoga                  | Flexx                  |
| ------------------ | --------------------- | ---------------------- |
| **Runtime**        | WebAssembly           | Pure JavaScript        |
| **Initialization** | Async (WASM load)     | Synchronous            |
| **Dependencies**   | WASM runtime required | Zero dependencies      |
| **Debugging**      | WASM stack traces     | Native JS stack traces |

### Bundle Size

|             | Yoga                            | Flexx | Savings        |
| ----------- | ------------------------------- | ----- | -------------- |
| **Raw**     | 272 KB (183 KB JS + 89 KB WASM) | 38 KB | **7x smaller** |
| **Gzipped** | 38 KB (9 KB JS + 28 KB WASM)    | 7 KB  | **5x smaller** |

Flexx is **5-7x smaller** than Yoga, which matters for:

- CLI tools where startup time matters
- Edge runtimes with size limits
- Bundlers that struggle with WASM

**Use Flexx when:**

- You want synchronous initialization (no async `await init()`)
- You're in an environment where WASM is awkward (older bundlers, edge runtimes)
- You want smaller bundles and simpler debugging
- You're building terminal UIs where layouts are typically flat/wide

**Use Yoga when:**

- You have deeply nested layouts (>50 levels) as your primary use case
- You're already using React Native or another Yoga-based system
- You need the battle-tested stability of a mature project

---

## API Compatibility

Flexx is designed as a **drop-in replacement** for Yoga's JavaScript API:

```typescript
// Same constants
import {
  FLEX_DIRECTION_ROW,
  JUSTIFY_CENTER,
  ALIGN_STRETCH,
} from "@beorn/flexx";

// Same Node API
const root = Node.create();
root.setWidth(100);
root.setFlexDirection(FLEX_DIRECTION_ROW);
root.setJustifyContent(JUSTIFY_CENTER);

const child = Node.create();
child.setFlexGrow(1);
root.insertChild(child, 0);

root.calculateLayout(100, 100, DIRECTION_LTR);

console.log(child.getComputedWidth()); // Same output
```

**API coverage**: 100% of Yoga's commonly-used API is implemented with identical method signatures. 41/41 Yoga comparison tests pass.

---

## Flexbox Spec Compliance

| Feature                                   | Yoga | Flexx | Notes                      |
| ----------------------------------------- | ---- | ----- | -------------------------- |
| **flex-direction** (row, column, reverse) | ✅   | ✅    |                            |
| **flex-grow**                             | ✅   | ✅    |                            |
| **flex-shrink**                           | ✅   | ✅\*  | Simplified algorithm       |
| **flex-basis**                            | ✅   | ✅    |                            |
| **justify-content** (6 values)            | ✅   | ✅    |                            |
| **align-items** (5 values)                | ✅   | ✅    |                            |
| **align-self**                            | ✅   | ✅    |                            |
| **align-content** (6 values)              | ✅   | ✅    |                            |
| **gap** (row/column)                      | ✅   | ✅    |                            |
| **padding** (per-edge)                    | ✅   | ✅    |                            |
| **margin** (per-edge)                     | ✅   | ✅    |                            |
| **border** (per-edge)                     | ✅   | ✅    |                            |
| **min/max width/height**                  | ✅   | ✅    |                            |
| **percent values**                        | ✅   | ✅    |                            |
| **absolute positioning**                  | ✅   | ✅    |                            |
| **measure functions**                     | ✅   | ✅    | For text nodes             |
| **flex-wrap**                             | ✅   | ✅    |                            |
| **baseline alignment**                    | ✅   | ✅    |                            |
| **RTL direction**                         | ✅   | ✅    |                            |
| **EDGE_START/END**                        | ✅   | ✅    | Full logical edge support  |
| **aspect-ratio**                          | ✅   | ✅    |                            |

\*Flexx uses proportional shrink (simpler), not CSS spec's basis-weighted shrink. This matches real-world behavior for most layouts.

---

## Algorithm Differences

### Shrink Calculation

**Yoga (CSS spec)**: Shrinks items proportionally to `flex-shrink × flex-basis`
**Flexx (simplified)**: Shrinks items proportionally to `flex-shrink` only

In practice, this rarely matters for terminal UIs where flex-basis is typically 0 or auto.

### Grow/Shrink Iteration

Both engines iterate to handle min/max constraints:

1. Calculate proportional distribution
2. Cap items that hit min/max limits
3. Redistribute remaining space
4. Repeat until space is fully allocated

---

## Performance

Benchmarks run on Apple M1 Max, Bun 1.3.7 (January 2026).

### Flat Layouts (Flexx wins)

Tree creation + layout together (the fair comparison):

| Benchmark                     | Flexx   | Yoga    | Comparison        |
| ----------------------------- | ------- | ------- | ----------------- |
| **Flat 100 nodes**            | 101 µs  | 157 µs  | Flexx 1.6x faster |
| **Flat 500 nodes**            | 470 µs  | 884 µs  | Flexx 1.9x faster |
| **Flat 1000 nodes**           | 964 µs  | 1889 µs | Flexx 2.0x faster |

### Deep Layouts (high variance)

| Benchmark                     | Result                                     |
| ----------------------------- | ------------------------------------------ |
| **Deep 20 levels**            | Yoga slightly faster (~1.1-1.2x)           |
| **Deep 50 levels**            | Roughly equal (varies between runs)        |
| **Deep 100 levels**           | Roughly equal (varies between runs)        |

**Note:** Deep layout benchmarks show significant variance between runs (up to 2x). This makes definitive comparisons difficult. Both engines handle deep nesting efficiently for practical UI use cases.

### TUI Patterns (Mixed)

| Benchmark                     | Flexx   | Yoga    | Comparison        |
| ----------------------------- | ------- | ------- | ----------------- |
| **Kanban 3×10 (~36 nodes)**   | 78 µs   | 82 µs   | ~Equal            |
| **Kanban 3×50 (~156 nodes)**  | 348 µs  | 306 µs  | Yoga 1.1x faster  |
| **Kanban 3×100 (~306 nodes)** | 354 µs  | 598 µs  | Flexx 1.7x faster |

### Feature-Specific Performance

Different flexbox features have different performance characteristics:

| Feature                 | Winner    | Speed Difference |
| ----------------------- | --------- | ---------------- |
| **AbsolutePositioning** | **Flexx** | 3.5x faster      |
| **FlexShrink**          | **Flexx** | 2.7x faster      |
| **AlignContent**        | **Flexx** | 2.3x faster      |
| **FlexGrow**            | **Flexx** | 1.9x faster      |
| **Gap**                 | **Flexx** | 1.5x faster      |
| **MeasureFunc**         | **Flexx** | 1.4x faster      |
| **FlexWrap**            | **Flexx** | 1.2x faster      |
| **PercentValues**       | ~Equal    | -                |
| **NestedLayouts**       | Yoga      | 1.2x faster      |

**Flexx wins 7 of 9 features**, with 1 tie and Yoga winning nested layouts.

### Why is Pure JavaScript Faster for Flat Layouts?

- Flexx avoids WASM ↔ JS boundary crossing overhead
- Bun's JS engine is highly optimized for this workload
- No FFI marshalling for node properties
- Tree creation dominates these benchmarks (both allocate nodes)

### Why Do Deep Layout Benchmarks Vary?

- JIT warmup and compilation timing affects results
- GC pauses can shift individual benchmark runs
- Both engines are fast enough that measurement noise dominates
- Practical UI depths (5-20 levels) show both engines performing well

### Key Takeaways

- Both engines handle terminal UIs (<500 nodes) in under 1ms
- Both are fast enough for 60fps (16.67ms budget per frame)
- Flexx excels at absolute positioning, flex distribution, and flat layouts
- Yoga excels at deeply nested layouts

Run benchmarks yourself:

```bash
bun bench                          # All benchmarks
bun bench bench/features.bench.ts  # Feature comparison
bun bench bench/yoga-compare.bench.ts  # Overall comparison
```

---

## Exports

```typescript
// Default: Zero-allocation algorithm (faster for typical TUI workloads)
import { Node } from "@beorn/flexx";

// Classic algorithm (for debugging or comparison)
import { Node } from "@beorn/flexx/classic";
```

Both exports have identical APIs.

---

## Known Limitations

### Intentional Simplifications

1. **Shrink algorithm** - Proportional only (see above)
2. **No `order` property** - Items laid out in insertion order
3. **No writing modes** - Horizontal-tb only

---

## Migration Guide

### From Yoga to Flexx

```diff
- import Yoga from 'yoga-wasm-web';
- const yoga = await Yoga.init();
- const root = yoga.Node.create();
+ import { Node } from '@beorn/flexx';
+ const root = Node.create();  // Synchronous!

// Rest of the API is identical
root.setWidth(100);
root.setFlexDirection(FLEX_DIRECTION_ROW);
// ...
```

### Key Changes

1. **No async init** - Remove `await Yoga.init()`
2. **Import from package** - `import { Node, FLEX_DIRECTION_ROW } from '@beorn/flexx'`

---

## Test Coverage

Flexx includes 524 tests covering:

- ✅ Basic layout (single node, column, row)
- ✅ Flex grow distribution
- ✅ Flex shrink with constraints
- ✅ Gap between items
- ✅ Absolute positioning
- ✅ Padding and border
- ✅ Justify content (all 6 values)
- ✅ Align items and align-content
- ✅ Measure functions (text sizing)
- ✅ Min/max constraints
- ✅ Percent values
- ✅ RTL direction with EDGE_START/END
- ✅ Baseline alignment
- ✅ Dirty tracking
- ✅ Node lifecycle (create, insert, remove, free)
- ✅ Style getters/setters
- ✅ Differential fuzz tests (401 tests comparing vs Yoga)
- ✅ Cache stress tests

See [tests/](../tests/) for the full test suite.

---

## Contributing

Found a bug? Layout doesn't match Yoga? We want to know!

- File issues with reproduction cases
- Include expected vs actual layout values
- Bonus: Include equivalent Yoga output for comparison

---

## References

- [Yoga Layout](https://yogalayout.dev/) - Facebook's flexbox implementation
- [Taffy](https://github.com/DioxusLabs/taffy) - Rust flexbox/grid engine (comparison methodology inspiration)
- [CSS Flexbox Spec](https://www.w3.org/TR/css-flexbox-1/) - W3C specification
- [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js) - Algorithm reference
