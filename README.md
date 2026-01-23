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
| RTL support                                   | ❌ Not implemented |
| Baseline alignment                            | ❌ Not implemented |
| flex-wrap                                     | ⚠️ Partial         |

## Installation

```bash
npm install @beorn/flexx
# or
bun add @beorn/flexx
```

## Performance

Benchmarks on Apple M1 Max, Bun 1.3.6 (tree creation + layout):

| Benchmark        | Flexx  | Yoga    | Winner            |
| ---------------- | ------ | ------- | ----------------- |
| Flat 100 nodes   | 50 µs  | 168 µs  | Flexx 3.4x faster |
| Flat 1000 nodes  | 479 µs | 1857 µs | Flexx 3.9x faster |
| Kanban 150 nodes | 125 µs | 316 µs  | Flexx 2.5x faster |

**Why is pure JS faster than WASM?**

- Avoids WASM ↔ JS boundary crossing overhead
- Bun's JS engine is highly optimized for this workload
- Tree creation dominates these benchmarks

Run yourself: `bun bench/compare.ts`

## Bundle Size

|         | Yoga   | Flexx | Savings        |
| ------- | ------ | ----- | -------------- |
| Raw     | 272 KB | 38 KB | **7x smaller** |
| Gzipped | 38 KB  | 7 KB  | **5x smaller** |

## API Compatibility

~95% drop-in replacement for Yoga's JavaScript API:

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

## Documentation

- [Yoga Comparison](docs/yoga-comparison.md) — detailed feature comparison and benchmarks
- [Algorithm](ALGORITHM.md) — how the layout algorithm works

## Related Projects

- [Inkx](https://github.com/beorn/inkx) — React terminal UI framework using Flexx
- [Yoga](https://yogalayout.dev/) — Facebook's flexbox implementation (WASM)
- [Taffy](https://github.com/DioxusLabs/taffy) — Rust flexbox/grid engine

## License

MIT
