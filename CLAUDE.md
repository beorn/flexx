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
# BEFORE making changes
bun bench bench/yoga-compare-warmup.bench.ts > /tmp/bench-before.txt

# Make your changes...

# AFTER making changes
bun bench bench/yoga-compare-warmup.bench.ts > /tmp/bench-after.txt

# Compare results - look for regressions
diff /tmp/bench-before.txt /tmp/bench-after.txt
```

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

| File | Purpose |
|------|---------|
| `src/layout-zero.ts` | Core layout algorithm - **most performance-critical** |
| `src/node-zero.ts` | Node class - **second most performance-critical** |
| `bench/yoga-compare-warmup.bench.ts` | Main benchmark comparing Flexx vs Yoga |
| `tests/yoga-compat/` | Yoga compatibility tests (41 tests) |

## Architecture

- **Zero-allocation design** in layout-zero.ts - reuses FlexInfo objects
- **Yoga API compatibility** - same constants, same method names
- **Two algorithms**: zero (production) and classic (debugging)

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
