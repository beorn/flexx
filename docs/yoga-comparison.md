# Flexx vs Yoga: Layout Engine Comparison

Flexx is a pure JavaScript flexbox layout engine with a Yoga-compatible API.

**TL;DR:** Flexx is **2.5x faster** and **5x smaller** than Yoga for terminal UI workloads, with a synchronous API and zero dependencies. Trade-off: Flexx is new and doesn't support RTL or baseline alignment.

## Status

| | Yoga | Flexx |
|---|------|-------|
| **Maturity** | Production, battle-tested (React Native, Ink, Litho) | New, functionally complete, seeking feedback |
| **Test coverage** | Extensive (auto-generated from Chrome) | Comprehensive unit tests |
| **Real-world usage** | Millions of apps | Early adopters welcome |

**Flexx is new.** We've written thorough tests and use it in production ourselves, but it hasn't been battle-tested across diverse environments. We welcome feedback and bug reports.

---

## Why Flexx Exists

| Concern | Yoga | Flexx |
|---------|------|-------|
| **Runtime** | WebAssembly | Pure JavaScript |
| **Initialization** | Async (WASM load) | Synchronous |
| **Dependencies** | WASM runtime required | Zero dependencies |
| **Debugging** | WASM stack traces | Native JS stack traces |

### Bundle Size

| | Yoga | Flexx | Savings |
|---|------|-------|---------|
| **Raw** | 272 KB (183 KB JS + 89 KB WASM) | 38 KB | **7x smaller** |
| **Gzipped** | 38 KB (9 KB JS + 28 KB WASM) | 7 KB | **5x smaller** |

Flexx is **5-7x smaller** than Yoga, which matters for:
- CLI tools where startup time matters
- Edge runtimes with size limits
- Bundlers that struggle with WASM

**Use Flexx when:**
- You want synchronous initialization (no async `await init()`)
- You're in an environment where WASM is awkward (older bundlers, edge runtimes)
- You want smaller bundles and simpler debugging
- You're building terminal UIs where layout complexity is bounded

**Use Yoga when:**
- You need features Flexx doesn't implement (RTL, baseline alignment, aspect-ratio)
- You're already using React Native or another Yoga-based system
- You need the battle-tested stability of a mature project

---

## API Compatibility

Flexx is designed as a **drop-in replacement** for Yoga's JavaScript API:

```typescript
// Same constants
import { FLEX_DIRECTION_ROW, JUSTIFY_CENTER, ALIGN_STRETCH } from '@beorn/flexx';

// Same Node API
const root = Node.create();
root.setWidth(100);
root.setFlexDirection(FLEX_DIRECTION_ROW);
root.setJustifyContent(JUSTIFY_CENTER);

const child = Node.create();
child.setFlexGrow(1);
root.insertChild(child, 0);

root.calculateLayout(100, 100, DIRECTION_LTR);

console.log(child.getComputedWidth());  // Same output
```

**API coverage**: ~95% of Yoga's commonly-used API is implemented with identical method signatures.

---

## Flexbox Spec Compliance

| Feature | Yoga | Flexx | Notes |
|---------|------|-------|-------|
| **flex-direction** (row, column, reverse) | ✅ | ✅ | |
| **flex-grow** | ✅ | ✅ | |
| **flex-shrink** | ✅ | ✅* | Simplified algorithm |
| **flex-basis** | ✅ | ✅ | |
| **justify-content** (6 values) | ✅ | ✅ | |
| **align-items** (5 values) | ✅ | ✅ | |
| **align-self** | ✅ | ✅ | |
| **gap** (row/column) | ✅ | ✅ | |
| **padding** (per-edge) | ✅ | ✅ | |
| **margin** (per-edge) | ✅ | ✅ | |
| **border** (per-edge) | ✅ | ✅ | |
| **min/max width/height** | ✅ | ✅ | |
| **percent values** | ✅ | ✅ | |
| **absolute positioning** | ✅ | ✅ | |
| **measure functions** | ✅ | ✅ | For text nodes |
| **flex-wrap** | ✅ | ⚠️ | Declared, not fully tested |
| **baseline alignment** | ✅ | ❌ | Not implemented |
| **RTL direction** | ✅ | ❌ | LTR only |
| **aspect-ratio** | ✅ | ❌ | Not implemented |

*Flexx uses proportional shrink (simpler), not CSS spec's basis-weighted shrink. This matches real-world behavior for most layouts.

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

Benchmarks run on Apple M1 Max, Bun 1.3.6 (January 2026).
Measures tree creation + layout together (the fair comparison).

| Benchmark | Flexx | Yoga | Comparison |
|-----------|-------|------|------------|
| **Flat 100 nodes** | 50 µs | 168 µs | Flexx 3.4x faster |
| **Flat 500 nodes** | 251 µs | 862 µs | Flexx 3.4x faster |
| **Flat 1000 nodes** | 479 µs | 1857 µs | Flexx 3.9x faster |
| **Deep 50 levels** | 55 µs | 105 µs | Flexx 1.9x faster |
| **Kanban 3×50 (~156 nodes)** | 125 µs | 316 µs | Flexx 2.5x faster |
| **Kanban 3×100 (~306 nodes)** | 246 µs | 613 µs | Flexx 2.5x faster |

**Summary: Flexx is ~2.5x faster on average**

**Why is pure JavaScript faster than WASM?**
- Flexx avoids WASM ↔ JS boundary crossing overhead
- Bun's JS engine is highly optimized
- Yoga's WASM includes features Flexx doesn't (RTL, baseline, etc.)
- Tree creation dominates these benchmarks (both allocate nodes)

**Key takeaways:**
- Both engines handle terminal UIs (<500 nodes) in under 1ms
- Both are fast enough for 60fps (16.67ms budget per frame)
- Choose based on features, not performance

Run benchmarks yourself:
```bash
bun bench/run.ts      # Flexx standalone
bun bench/compare.ts  # Flexx vs Yoga comparison
```

---

## Known Limitations

### What Flexx Doesn't Support

1. **RTL layouts** - Constants exported for API compatibility, but layout is always LTR
2. **Baseline alignment** - `ALIGN_BASELINE` is declared but not implemented
3. **Aspect ratio** - Not implemented
4. **Wrap reverse** - `WRAP_WRAP_REVERSE` declared but not tested

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
3. **Check unsupported features** - RTL, baseline, aspect-ratio

---

## Test Coverage

Flexx includes tests for:

- ✅ Basic layout (single node, column, row)
- ✅ Flex grow distribution
- ✅ Flex shrink with constraints
- ✅ Gap between items
- ✅ Absolute positioning
- ✅ Padding and border
- ✅ Justify content (all 6 values)
- ✅ Align items (center, flex-end, stretch)
- ✅ Measure functions (text sizing)
- ✅ Min/max constraints
- ✅ Percent values
- ✅ Dirty tracking
- ✅ Node lifecycle (create, insert, remove, free)
- ✅ Style getters/setters

See [tests/layout.test.ts](../tests/layout.test.ts) for the full test suite.

---

## Contributing

Found a bug? Layout doesn't match Yoga? We want to know!

- File issues with reproduction cases
- Include expected vs actual layout values
- Bonus: Include equivalent Yoga output for comparison

We're actively developing Flexx and welcome community feedback.

---

## References

- [Yoga Layout](https://yogalayout.dev/) - Facebook's flexbox implementation
- [Taffy](https://github.com/DioxusLabs/taffy) - Rust flexbox/grid engine (comparison methodology inspiration)
- [CSS Flexbox Spec](https://www.w3.org/TR/css-flexbox-1/) - W3C specification
- [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js) - Algorithm reference
