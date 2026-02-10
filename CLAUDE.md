# Flexx - Pure JavaScript Flexbox Layout Engine

Yoga-compatible API, 2-3x faster, 5x smaller, pure JavaScript (no WASM).

## Commands

```bash
bun test              # Run all tests
bun bench             # Run performance benchmarks
bun run typecheck     # Type check
```

## Performance is Critical

Flexx's value proposition is **performance**. Any change that MAY impact performance requires benchmark verification:

```bash
# Check for CPU-heavy processes that would skew results
top -l 1 -n 5 -stats command,cpu | head -10

# BEFORE making changes
bun bench bench/yoga-compare-warmup.bench.ts > /tmp/bench-before.txt

# Make your changes...

# Check CPU load again (should match pre-change conditions)
top -l 1 -n 5 -stats command,cpu | head -10

# AFTER making changes
bun bench bench/yoga-compare-warmup.bench.ts > /tmp/bench-after.txt

# Compare results - look for regressions
diff /tmp/bench-before.txt /tmp/bench-after.txt
```

**Before each benchmark run**, verify no CPU-heavy processes (builds, other test suites, browsers, video encoding) are running. Inconsistent system load invalidates comparisons.

**Changes that require benchmarking:**

- Any modification to `src/layout-zero.ts` (the core algorithm)
- Any modification to `src/node-zero.ts` (Node class)
- Adding new features that affect layout calculation
- Refactoring hot paths

**Acceptable performance impact:**

- Regressions < 5% for minor features
- No regressions for refactoring (must be neutral or faster)
- Document any trade-offs in PR description

## Code Structure

```
src/
├── index.ts        # Main export
├── node-zero.ts    # Node class with FlexInfo (hot path)
├── layout-zero.ts  # Layout algorithm (~2300 lines, hot path)
├── constants.ts    # Flexbox constants (Yoga-compatible)
├── types.ts        # TypeScript interfaces
├── utils.ts        # Shared utilities
└── classic/        # Allocating algorithm (for debugging)
```

## Key Files

| File                                 | Purpose                                               |
| ------------------------------------ | ----------------------------------------------------- |
| `src/layout-zero.ts`                 | Core layout algorithm - **most performance-critical** |
| `src/node-zero.ts`                   | Node class - **second most performance-critical**     |
| `bench/yoga-compare-warmup.bench.ts` | Main benchmark comparing Flexx vs Yoga                |
| `tests/yoga-compat/`                 | Yoga compatibility tests (41 tests)                   |

## Architecture

- **Zero-allocation design** in layout-zero.ts - reuses FlexInfo objects
- **Yoga API compatibility** - same constants, same method names
- **Two algorithms**: zero (production) and classic (debugging)

## Intentional Divergences from Yoga

Flexx is Yoga-compatible but follows CSS spec where Yoga doesn't:

| Behavior                                  | Yoga                                                     | Flexx                      | CSS Spec                                             |
| ----------------------------------------- | -------------------------------------------------------- | -------------------------- | ---------------------------------------------------- |
| `overflow:hidden/scroll` + `flexShrink:0` | Item expands to content size (ignores parent constraint) | Item shrinks to fit parent | §4.5: automatic min-size = 0 for overflow containers |

**Details**: Yoga defaults `flexShrink` to 0 (unlike CSS's default of 1) and doesn't implement CSS §4.5's rule that overflow containers have `min-size: auto = 0`. This means in Yoga, an `overflow:hidden` child with 30 lines of content inside a height-10 parent will compute as height 30 — defeating the purpose of overflow clipping. Flexx ensures overflow containers can always shrink (`flexShrink >= 1`), matching CSS browser behavior. See `tests/yoga-overflow-compare.test.ts` for comparison tests.

## Testing

```bash
bun test                           # All tests
bun test tests/yoga-compat/        # Yoga compatibility only
bun test tests/layout/             # Layout algorithm tests
```

## Anti-Patterns

- **Don't allocate in hot paths** - layout-zero.ts avoids `new` in layout loops
- **Don't add WASM** - pure JS is the point
- **Don't break Yoga API** - compatibility is a feature
