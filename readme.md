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

**TL;DR:** 2-3x faster than Yoga, 5x smaller, pure JavaScript (no WASM), synchronous initialization.

|                      | Yoga              | Flexx            |
| -------------------- | ----------------- | ---------------- |
| **Runtime**          | WebAssembly       | Pure JavaScript  |
| **Bundle (gzipped)** | 38 KB             | ~8 KB            |
| **Initialization**   | Async (WASM load) | Synchronous      |
| **Dependencies**     | WASM runtime      | Zero             |

## Status

**Functionally complete. 524 tests passing including 41/41 Yoga compatibility tests.**

We use Flexx in production. All features are implemented and tested.

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
| RTL support                                   | ✅ Complete        |
| Baseline alignment                            | ✅ Complete        |

## Installation

```bash
bun add @beorn/flexx
# or
npm install @beorn/flexx
```

## Performance

**Flexx is 2-3x faster than Yoga** for most layouts. The advantage grows with more nodes.

Why? Every Yoga call crosses the JS/WASM boundary (type conversion, memory marshalling). For a 100-node layout, that's 400+ boundary crossings. Flexx stays in pure JS where property access is direct and JIT-optimized.

| Layout Type | Flexx vs Yoga |
|-------------|---------------|
| Flat 100-1000 nodes | Flexx 2.4-2.5x faster |
| Flat 2000-5000 nodes | Flexx 2.8-3.1x faster |
| Nested 1-50 levels | Flexx 1.6-2.1x faster |
| Very deep (100+ levels) | ~Equal |

See [docs/performance.md](docs/performance.md) for detailed benchmarks, methodology, and explanation of the zero-allocation design.

Run benchmarks: `bun bench bench/yoga-compare-warmup.bench.ts`

## Bundle Size

|         | Yoga   | Flexx | Savings        |
| ------- | ------ | ----- | -------------- |
| Raw     | 272 KB | 38 KB | **7x smaller** |
| Gzipped | 38 KB  | 7 KB  | **5x smaller** |

## API Compatibility

**100% Yoga compatibility** (41/41 comparison tests passing). Drop-in replacement:

```typescript
// Yoga
import Yoga from "yoga-wasm-web";
const yoga = await Yoga.init(); // Async!
const root = yoga.Node.create();

// Flexx
import { Node } from "@beorn/flexx";
const root = Node.create(); // Sync!
```

Same constants, same method names, same behavior.

## Exports

```typescript
// Default: Zero-allocation algorithm (faster for typical TUI workloads)
import { Node } from "@beorn/flexx";

// Classic algorithm (for debugging or comparison)
import { Node } from "@beorn/flexx/classic";
```

## Use Cases

Flexx was built primarily for **terminal UIs**, but works anywhere you need flexbox layout:

- **Terminal UIs** - our primary target (used by [inkx](https://github.com/beorn/inkx))
- **CLI tools** - synchronous init, fast startup
- **Canvas/game UIs** - calculate layout, render however you want
- **Edge runtimes** - 7KB bundle, no WASM complexity
- **PDF/document generation** - layout before rendering

**Use Yoga instead when:**

- You have extremely deep nesting (100+ levels) as primary use case
- You're in the React Native ecosystem
- You need battle-tested stability across diverse environments

## Code Structure

```
src/
├── node-zero.ts    # Node class (zero-alloc, default)
├── layout-zero.ts  # Layout algorithm (zero-alloc, ~2300 lines)
├── node.ts         # Node class (classic)
├── layout.ts       # Layout algorithm (classic, ~1800 lines)
├── index.ts        # Default export (zero-alloc)
├── index-classic.ts # Classic export
├── constants.ts    # Flexbox constants
└── types.ts        # TypeScript types
```

The layout algorithm implements CSS Flexbox spec Section 9.7 (resolving flexible lengths) with:
- Iterative freeze algorithm for min/max constraints
- Yoga-compatible edge-based rounding (prevents pixel gaps)
- Weighted flex-shrink (larger items shrink more)
- Auto margin absorption before justify-content
- Full RTL support with EDGE_START/END resolution

## Documentation

- [Yoga Comparison](docs/yoga-comparison.md) — detailed feature comparison and benchmarks
- [Algorithm](algorithm.md) — how the layout algorithm works
- [Zero-Allocation Design](docs/zero-allocation.md) — zero-alloc optimization details

## Related Projects

- [Inkx](https://github.com/beorn/inkx) — React terminal UI framework using Flexx
- [Yoga](https://yogalayout.dev/) — Facebook's flexbox implementation (WASM)
- [Taffy](https://github.com/DioxusLabs/taffy) — Rust flexbox/grid engine

## License

MIT
