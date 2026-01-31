# Flexx

**Pure JavaScript flexbox layout engine with Yoga-compatible API.**

```typescript
import { Node, FLEX_DIRECTION_ROW, DIRECTION_LTR } from "@beorn/flexx";

const root = Node.create();
root.setWidth(100);
root.setFlexDirection(FLEX_DIRECTION_ROW);

const child = Node.create();
child.setFlexGrow(1);
root.insertChild(child, 0);

root.calculateLayout(100, 100, DIRECTION_LTR);
console.log(child.getComputedWidth()); // 100
```

## Why Flexx?

**TL;DR:** 2.5x faster, 5x smaller than Yoga, with synchronous initialization.

|                      | Yoga              | Flexx       |
| -------------------- | ----------------- | ----------- |
| **Bundle (gzipped)** | 38 KB             | 7 KB        |
| **Performance**      | 316 µs            | 125 µs      |
| **Initialization**   | Async (WASM load) | Synchronous |
| **Dependencies**     | WASM runtime      | Zero        |

## Status

**New, functionally complete, seeking feedback.**

We've written thorough tests and use Flexx in production ourselves, but it hasn't been battle-tested across diverse environments. We welcome feedback and bug reports.

| Feature                                       | Status             |
| --------------------------------------------- | ------------------ |
| Core flexbox (direction, grow, shrink, basis) | ✅ Complete        |
| Alignment (justify-content, align-items)      | ✅ Complete        |
| Spacing (gap, padding, margin, border)        | ✅ Complete        |
| Constraints (min/max width/height)            | ✅ Complete        |
| Measure functions (text sizing)               | ✅ Complete        |
| Absolute positioning                          | ✅ Complete        |
| Aspect ratio                                  | ✅ Complete        |
| Flex-wrap (multi-line layouts)                | ✅ Complete        |
| Logical edges (EDGE_START/END)                | ✅ Complete        |
| RTL support                                   | ❌ Not implemented |
| Baseline alignment                            | ⚠️ Partial         |

## Installation

```bash
bun add @beorn/flexx
# or
npm install @beorn/flexx
```

## Performance

Benchmarks on Apple M1 Max, Bun 1.3.7 (tree creation + layout):

| Benchmark        | Flexx   | Yoga    | Winner            |
| ---------------- | ------- | ------- | ----------------- |
| Flat 100 nodes   | 77 µs   | 189 µs  | Flexx 2.4x faster |
| Flat 500 nodes   | 345 µs  | 987 µs  | Flexx 2.9x faster |
| Flat 1000 nodes  | 681 µs  | 2097 µs | Flexx 3.1x faster |
| Deep 50 levels   | 41 µs   | 97 µs   | Flexx 2.4x faster |
| Kanban 150 nodes | 125 µs  | 316 µs  | Flexx 2.5x faster |

### Feature-Specific (Flexx wins 7/9)

| Feature              | Winner    | Difference   |
| -------------------- | --------- | ------------ |
| AbsolutePositioning  | **Flexx** | 3.24x faster |
| Gap                  | **Flexx** | 2.34x faster |
| AlignContent         | **Flexx** | 2.17x faster |
| FlexShrink           | **Flexx** | 1.99x faster |
| FlexGrow             | **Flexx** | 1.84x faster |
| FlexWrap             | **Flexx** | 1.23x faster |
| NestedLayouts        | Yoga      | 1.08x faster |
| PercentValues        | Yoga      | 1.10x faster |

**Why is pure JS faster than WASM?**

- Avoids WASM ↔ JS boundary crossing overhead
- Bun's JS engine is highly optimized for this workload
- Tree creation dominates these benchmarks
- No FFI marshalling for node properties

Run benchmarks: `bun bench` or `bun bench bench/features.bench.ts`

## Bundle Size

|         | Yoga   | Flexx | Savings        |
| ------- | ------ | ----- | -------------- |
| Raw     | 272 KB | 38 KB | **7x smaller** |
| Gzipped | 38 KB  | 7 KB  | **5x smaller** |

## API Compatibility

**42% Yoga test suite passing** (261/518 tests, excluding AspectRatio tests which have different semantics). Drop-in replacement for most use cases:

```typescript
// Yoga
import Yoga from "yoga-wasm-web";
const yoga = await Yoga.init(); // Async!
const root = yoga.Node.create();

// Flexx
import { Node } from "@beorn/flexx";
const root = Node.create(); // Sync!
```

Same constants, same method names, same behavior for supported features.

## Use Cases

**Use Flexx when:**

- Building terminal UIs (where layout complexity is bounded)
- CLI tools where startup time matters
- Edge runtimes with size limits
- Bundlers that struggle with WASM
- You want synchronous initialization

**Use Yoga when:**

- You need RTL, baseline alignment, or aspect-ratio
- You're in the React Native ecosystem
- You need battle-tested stability

## Code Structure

```
src/
├── node.ts      # Node class (public API, ~1000 lines)
├── layout.ts    # Layout algorithm (~1200 lines)
├── utils.ts     # Edge/value helpers
├── constants.ts # Flexbox constants
└── types.ts     # TypeScript types
```

The layout algorithm implements CSS Flexbox spec Section 9.7 (resolving flexible lengths) with:
- Iterative freeze algorithm for min/max constraints
- Yoga-compatible edge-based rounding (prevents pixel gaps)
- Weighted flex-shrink (larger items shrink more)
- Auto margin absorption before justify-content

## Documentation

- [Yoga Comparison](docs/yoga-comparison.md) — detailed feature comparison and benchmarks
- [Algorithm](ALGORITHM.md) — how the layout algorithm works

## Related Projects

- [Inkx](https://github.com/beorn/inkx) — React terminal UI framework using Flexx
- [Yoga](https://yogalayout.dev/) — Facebook's flexbox implementation (WASM)
- [Taffy](https://github.com/DioxusLabs/taffy) — Rust flexbox/grid engine

## License

MIT
