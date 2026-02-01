# Flexx vs Yoga: Layout Engine Comparison

**TL;DR:** Flexx is **2-3x faster** for most layouts, **5x smaller** than Yoga, with a synchronous API and zero dependencies. Equal at 100+ nesting levels.

## Status

|                      | Yoga                                                 | Flexx                                        |
| -------------------- | ---------------------------------------------------- | -------------------------------------------- |
| **Maturity**         | Production, battle-tested (React Native, Ink, Litho) | Production-ready, fully tested               |
| **Test coverage**    | Extensive (auto-generated from Chrome)               | 524 tests, 41/41 Yoga compatibility          |
| **Real-world usage** | Millions of apps                                     | Used in production                           |

## Why Flexx Exists

| Concern            | Yoga                  | Flexx                  |
| ------------------ | --------------------- | ---------------------- |
| **Runtime**        | WebAssembly           | Pure JavaScript        |
| **Initialization** | Async (WASM load)     | Synchronous            |
| **Dependencies**   | WASM runtime required | Zero                   |
| **Debugging**      | WASM stack traces     | Native JS stack traces |
| **Bundle size**    | 38 KB gzipped         | ~7 KB gzipped          |

**Use Flexx when:**
- You want synchronous initialization
- You're in an environment where WASM is awkward (edge runtimes, older bundlers)
- You want smaller bundles and simpler debugging
- You're building terminal UIs with flat/wide layouts

**Use Yoga when:**
- You have extremely deep nesting (100+ levels)
- You're in the React Native ecosystem
- You need battle-tested stability across diverse environments

## API Compatibility

Flexx is a **drop-in replacement** for Yoga's JavaScript API:

```typescript
// Same constants
import { FLEX_DIRECTION_ROW, JUSTIFY_CENTER } from "@beorn/flexx";

// Same Node API
const root = Node.create();
root.setWidth(100);
root.setFlexDirection(FLEX_DIRECTION_ROW);
root.calculateLayout(100, 100, DIRECTION_LTR);
```

**API coverage**: 100% of Yoga's commonly-used API. 41/41 Yoga comparison tests pass.

## Flexbox Spec Compliance

| Feature                                   | Yoga | Flexx |
| ----------------------------------------- | ---- | ----- |
| **flex-direction** (row, column, reverse) | ✅   | ✅    |
| **flex-grow / flex-shrink / flex-basis**  | ✅   | ✅    |
| **justify-content** (6 values)            | ✅   | ✅    |
| **align-items / align-self / align-content** | ✅ | ✅   |
| **gap** (row/column)                      | ✅   | ✅    |
| **padding / margin / border** (per-edge)  | ✅   | ✅    |
| **min/max width/height**                  | ✅   | ✅    |
| **percent values**                        | ✅   | ✅    |
| **absolute positioning**                  | ✅   | ✅    |
| **measure functions**                     | ✅   | ✅    |
| **flex-wrap**                             | ✅   | ✅    |
| **baseline alignment**                    | ✅   | ✅    |
| **RTL direction / EDGE_START/END**        | ✅   | ✅    |
| **aspect-ratio**                          | ✅   | ✅    |

Both use CSS spec's basis-weighted shrink (`flexShrink × flexBasis`).

## Performance

See [performance.md](performance.md) for detailed benchmarks.

**Summary:** Flexx is 2-3x faster for flat layouts (100-5000 nodes), 1.5-2x faster for nested layouts (1-50 levels), equal at 100+ levels.

## Known Limitations

1. **No `order` property** — Items laid out in insertion order
2. **No writing modes** — Horizontal-tb only

## Migration Guide

```diff
- import Yoga from 'yoga-wasm-web';
- const yoga = await Yoga.init();
- const root = yoga.Node.create();
+ import { Node } from '@beorn/flexx';
+ const root = Node.create();  // Synchronous!

// Rest of the API is identical
```

## Test Coverage

Flexx includes 524 tests covering all flexbox features, plus 401 differential fuzz tests comparing random layouts against Yoga.

## References

- [Yoga Layout](https://yogalayout.dev/)
- [Taffy](https://github.com/DioxusLabs/taffy)
- [CSS Flexbox Spec](https://www.w3.org/TR/css-flexbox-1/)
- [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js)
