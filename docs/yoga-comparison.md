# Flexx vs Yoga: Layout Engine Comparison

Flexx is a pure JavaScript flexbox layout engine with a Yoga-compatible API.

**TL;DR:** Flexx is **2-3x faster** for most layouts, **5x smaller** than Yoga, with a synchronous API and zero dependencies. They're roughly equal at 100+ nesting levels.

## Status

|                      | Yoga                                                 | Flexx                                        |
| -------------------- | ---------------------------------------------------- | -------------------------------------------- |
| **Maturity**         | Production, battle-tested (React Native, Ink, Litho) | Production-ready, fully tested               |
| **Test coverage**    | Extensive (auto-generated from Chrome)               | 524 tests, 41/41 Yoga compatibility          |
| **Real-world usage** | Millions of apps                                     | Used in production                           |

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

- You have extremely deep nesting (100+ levels) as your primary use case
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

| Feature                                   | Yoga | Flexx | Notes                     |
| ----------------------------------------- | ---- | ----- | ------------------------- |
| **flex-direction** (row, column, reverse) | ✅   | ✅    |                           |
| **flex-grow**                             | ✅   | ✅    |                           |
| **flex-shrink**                           | ✅   | ✅    | CSS-spec compliant        |
| **flex-basis**                            | ✅   | ✅    |                           |
| **justify-content** (6 values)            | ✅   | ✅    |                           |
| **align-items** (5 values)                | ✅   | ✅    |                           |
| **align-self**                            | ✅   | ✅    |                           |
| **align-content** (6 values)              | ✅   | ✅    |                           |
| **gap** (row/column)                      | ✅   | ✅    |                           |
| **padding** (per-edge)                    | ✅   | ✅    |                           |
| **margin** (per-edge)                     | ✅   | ✅    |                           |
| **border** (per-edge)                     | ✅   | ✅    |                           |
| **min/max width/height**                  | ✅   | ✅    |                           |
| **percent values**                        | ✅   | ✅    |                           |
| **absolute positioning**                  | ✅   | ✅    |                           |
| **measure functions**                     | ✅   | ✅    | For text nodes            |
| **flex-wrap**                             | ✅   | ✅    |                           |
| **baseline alignment**                    | ✅   | ✅    |                           |
| **RTL direction**                         | ✅   | ✅    |                           |
| **EDGE_START/END**                        | ✅   | ✅    | Full logical edge support |
| **aspect-ratio**                          | ✅   | ✅    |                           |

Flexx implements CSS spec's basis-weighted shrink (`flexShrink × flexBasis`).

---

## Algorithm Differences

### Shrink Calculation

Both use CSS spec's basis-weighted shrink: items shrink proportionally to `flex-shrink × flex-basis`.

### Grow/Shrink Iteration

Both engines iterate to handle min/max constraints:

1. Calculate proportional distribution
2. Cap items that hit min/max limits
3. Redistribute remaining space
4. Repeat until space is fully allocated

---

## Performance

See [performance.md](performance.md) for detailed benchmarks, methodology, and technical explanation.

**Summary:** Flexx is 2-3x faster for most layouts after JIT warmup. Both handle terminal UIs (<500 nodes) in under 1ms.

| Layout Type             | Flexx vs Yoga         |
| ----------------------- | --------------------- |
| Flat (100-1000 nodes)   | Flexx 2.4-2.5x faster |
| Flat (2000-5000 nodes)  | Flexx 2.8-3.1x faster |
| Nested (1-50 levels)    | Flexx 1.5-2.1x faster |
| Very deep (100+ levels) | ~Equal                |

**Why?** Every Yoga call crosses the JS/WASM boundary (type conversion, memory marshalling). For a 100-node layout, that's 400+ boundary crossings. Flexx stays in JS where property access is direct and JIT-optimized.

Run benchmarks: `bun bench bench/yoga-compare-warmup.bench.ts`

---

## Known Limitations

### Intentional Simplifications

1. **No `order` property** — Items laid out in insertion order
2. **No writing modes** — Horizontal-tb only

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

1. **No async init** — Remove `await Yoga.init()`
2. **Import from package** — `import { Node, FLEX_DIRECTION_ROW } from '@beorn/flexx'`

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

---

## References

- [Yoga Layout](https://yogalayout.dev/) — Facebook's flexbox implementation
- [Taffy](https://github.com/DioxusLabs/taffy) — Rust flexbox/grid engine
- [CSS Flexbox Spec](https://www.w3.org/TR/css-flexbox-1/) — W3C specification
- [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js) — Algorithm reference
