# Flexx

**Pure JavaScript flexbox layout engine with Yoga-compatible API.**

[![npm version](https://img.shields.io/npm/v/@beorn/flexx.svg)](https://www.npmjs.com/package/@beorn/flexx)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

```typescript
import { Node, FLEX_DIRECTION_ROW, DIRECTION_LTR } from "@beorn/flexx"

const root = Node.create()
root.setWidth(100)
root.setFlexDirection(FLEX_DIRECTION_ROW)

const child = Node.create()
child.setFlexGrow(1)
root.insertChild(child, 0)

root.calculateLayout(100, 100, DIRECTION_LTR)
console.log(child.getComputedWidth()) // 100
```

## Why Flexx?

**TL;DR:** 1.5-2.5x faster initial layout, 5.5x faster no-change re-layout, 5x smaller, pure JavaScript (no WASM), synchronous initialization.

|                      | Yoga              | Flexx           |
| -------------------- | ----------------- | --------------- |
| **Runtime**          | WebAssembly       | Pure JavaScript |
| **Bundle (gzipped)** | 38 KB             | ~8 KB           |
| **Initialization**   | Async (WASM load) | Synchronous     |
| **Dependencies**     | WASM runtime      | Zero            |

## Status

**Production-ready. 1357 tests passing including 41/41 Yoga compatibility tests and 1200+ incremental re-layout fuzz tests.**

| Feature                                       | Status      |
| --------------------------------------------- | ----------- |
| Core flexbox (direction, grow, shrink, basis) | ✅ Complete |
| Alignment (justify-content, align-items)      | ✅ Complete |
| Spacing (gap, padding, margin, border)        | ✅ Complete |
| Constraints (min/max width/height)            | ✅ Complete |
| Measure functions (text sizing)               | ✅ Complete |
| Absolute positioning                          | ✅ Complete |
| Aspect ratio                                  | ✅ Complete |
| Flex-wrap (multi-line layouts)                | ✅ Complete |
| Logical edges (EDGE_START/END)                | ✅ Complete |
| RTL support                                   | ✅ Complete |
| Baseline alignment                            | ✅ Complete |

## Installation

```bash
npm install @beorn/flexx
# or
bun add @beorn/flexx
```

## Performance

Flexx and Yoga each win in different scenarios:

| Scenario                                      | Winner    | Margin     |
| --------------------------------------------- | --------- | ---------- |
| **Initial layout** (create + calculate)       | Flexx     | 1.5-2.5x   |
| **No-change re-layout** (fingerprint cache)   | **Flexx** | **5.5x**   |
| **Incremental re-layout** (single dirty leaf) | Yoga      | 2.8-3.4x   |
| **Deep nesting** (15+ levels)                 | Yoga      | increasing |

Flexx wins at initial layout because JS node creation avoids WASM boundary crossings (~8x cheaper). Flexx's fingerprint cache makes no-change re-layout essentially free (27ns regardless of tree size). Yoga's WASM layout computation is faster for per-node work during re-layout.

For interactive TUIs, the no-change case (cursor movement, selection) dominates — Flexx's 5.5x advantage there is the key differentiator.

See [docs/performance.md](docs/performance.md) for detailed benchmarks including TUI-realistic trees with measure functions.

```bash
bun bench bench/yoga-compare-rich.bench.ts    # TUI boards, measure funcs, property diversity
bun bench bench/incremental.bench.ts          # No-change, dirty leaf, resize
```

## Correctness

Flexx pursues both maximum performance **and** maximum correctness through aggressive caching with extensive verification.

**The problem**: Incremental re-layout (caching unchanged subtrees) is essential for performance but introduces subtle bugs. Chrome's Blink team experienced a "chain of ~10 bugs over a year" in their flexbox implementation. Flexx addresses this with a multi-layered test strategy:

| Layer              | Tests     | What it verifies                                               |
| ------------------ | --------- | -------------------------------------------------------------- |
| Yoga compatibility | 41        | Identical output to Yoga for every feature                     |
| Feature tests      | ~110      | Each flexbox feature in isolation                              |
| **Re-layout fuzz** | **1200+** | Incremental re-layout matches fresh layout across random trees |

The fuzz tests use a **differential oracle**: build a random tree, layout, mark nodes dirty, re-layout, then compare against a fresh layout of the identical tree. This has caught 3 distinct caching bugs that all 524 single-pass tests missed.

See [docs/testing.md](docs/testing.md) for the full testing methodology and [docs/incremental-layout-bugs.md](docs/incremental-layout-bugs.md) for the bug taxonomy.

## Bundle Size

|         | Yoga   | Flexx | Savings        |
| ------- | ------ | ----- | -------------- |
| Raw     | 272 KB | 38 KB | **7x smaller** |
| Gzipped | 38 KB  | 7 KB  | **5x smaller** |

## API Compatibility

**100% Yoga API compatibility** (41/41 comparison tests passing). Drop-in replacement:

```typescript
// Yoga
import Yoga from "yoga-wasm-web"
const yoga = await Yoga.init() // Async!
const root = yoga.Node.create()

// Flexx
import { Node } from "@beorn/flexx"
const root = Node.create() // Sync!
```

Same constants, same method names, same behavior.

## Use Cases

Flexx was built primarily for **terminal UIs**, but works anywhere you need flexbox layout:

- **Terminal UIs** — our primary target (used by [inkx](https://github.com/beorn/inkx))
- **CLI tools** — synchronous init, fast startup
- **Canvas/game UIs** — calculate layout, render however you want
- **Edge runtimes** — 7KB bundle, no WASM complexity
- **PDF/document generation** — layout before rendering

**Use Yoga instead when:**

- Your primary workload is frequent incremental re-layout of large pre-existing trees
- You have deep nesting (15+ levels) as primary use case
- You're in the React Native ecosystem
- You need battle-tested stability across diverse environments

## Documentation

| Document                                                   | Description                         |
| ---------------------------------------------------------- | ----------------------------------- |
| [Getting Started](docs/getting-started.md)                 | Quick guide to building layouts     |
| [API Reference](docs/api.md)                               | Complete API documentation          |
| [Algorithm](docs/algorithm.md)                             | How the layout algorithm works      |
| [Performance](docs/performance.md)                         | Benchmarks and methodology          |
| [Yoga Comparison](docs/yoga-comparison.md)                 | Feature comparison with Yoga        |
| [Testing](docs/testing.md)                                 | Test infrastructure and methodology |
| [Incremental Layout Bugs](docs/incremental-layout-bugs.md) | Bug taxonomy and debugging guide    |

## Related Projects

### Flexbox Layout Engines

| Project                                                                | Language   | Description                                                                                                                               |
| ---------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [Yoga](https://yogalayout.dev/)                                        | C++/WASM   | Facebook's flexbox engine. The industry standard, used by React Native, Ink, and Litho. Mature and battle-tested across millions of apps. |
| [Taffy](https://github.com/DioxusLabs/taffy)                           | Rust       | High-performance layout library supporting Flexbox and CSS Grid. Used by Dioxus and Bevy. Evolved from Stretch.                           |
| [yoga-wasm-web](https://github.com/shuding/yoga-wasm-web)              | WASM       | Popular WASM build of Yoga for web/Node.js (~900K weekly npm downloads). Used by Satori and others.                                       |
| [flexbox.js](https://github.com/Planning-nl/flexbox.js)                | JavaScript | Pure JS flexbox engine by Planning-nl. Reference implementation that inspired Flexx's algorithm.                                          |
| [css-layout](https://www.npmjs.com/package/css-layout)                 | JavaScript | Facebook's original pure-JS flexbox, predecessor to Yoga. Deprecated but historically significant.                                        |
| [stretch](https://github.com/vislyhq/stretch)                          | Rust       | Visly's flexbox implementation. Deprecated; evolved into Taffy.                                                                           |
| [troika-flex-layout](https://www.npmjs.com/package/troika-flex-layout) | JavaScript | Flexbox for WebGL/3D scenes via Yoga in a web worker. Part of the Troika framework.                                                       |

### Terminal UI Frameworks

| Project                                                         | Description                                                                             |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Ink](https://github.com/vadimdemedes/ink)                      | React for CLIs. Uses Yoga for layout. Powers Claude Code, Wrangler, and many CLI tools. |
| [inkx](https://github.com/beorn/inkx)                           | React for CLIs with layout feedback. Uses Flexx by default. Drop-in Ink replacement.    |
| [blessed](https://github.com/chjj/blessed)                      | Curses-like terminal library with its own layout system.                                |
| [react-blessed](https://github.com/Yomguithereal/react-blessed) | React renderer for blessed.                                                             |

### Related Packages

| Project                                   | Description                                                                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| [chalkx](https://github.com/beorn/chalkx) | Terminal primitives with capability detection, extended underlines, and hyperlinks. |

## Code Structure

```
src/
├── index.ts        # Main export
├── node-zero.ts    # Node class with FlexInfo
├── layout-zero.ts  # Layout algorithm (~2300 lines)
├── constants.ts    # Flexbox constants (Yoga-compatible)
├── types.ts        # TypeScript interfaces
├── utils.ts        # Shared utilities
└── classic/        # Allocating algorithm (for debugging)
    ├── node.ts
    └── layout.ts
```

The layout algorithm implements CSS Flexbox spec Section 9.7 with:

- Iterative freeze algorithm for min/max constraints
- Yoga-compatible edge-based rounding (prevents pixel gaps)
- Weighted flex-shrink (larger items shrink more)
- Auto margin absorption before justify-content
- Full RTL support with EDGE_START/END resolution

## Classic Algorithm

The classic (allocating) algorithm is available for debugging or comparison:

```typescript
import { Node } from "@beorn/flexx/classic"
```

Both algorithms pass identical tests and produce identical output.

## License

MIT
