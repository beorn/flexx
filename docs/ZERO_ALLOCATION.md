# Zero-Allocation Layout Engine

This document describes the zero-allocation optimization in Flexx and its trade-offs.

## Motivation

High-frequency TUI rendering (60+ fps) creates significant GC pressure from temporary objects allocated during each layout pass. The classic algorithm allocates:

- `ChildLayout` objects for each child during flex distribution
- `FlexLine[]` arrays for flex-wrap support
- Temporary arrays during filtered iteration

These allocations trigger frequent garbage collection, causing frame drops and latency spikes.

## Design

### FlexInfo on Nodes

Each Node stores a 14-field `FlexInfo` struct that is mutated (not reallocated) each layout pass:

```typescript
interface FlexInfo {
  mainSize: number;      // Current main-axis size
  baseSize: number;      // Original base size (for weighted shrink)
  mainMargin: number;    // Total main-axis margin (non-auto only)
  flexGrow: number;      // Cached flex-grow value
  flexShrink: number;    // Cached flex-shrink value
  minMain: number;       // Min main-axis constraint
  maxMain: number;       // Max main-axis constraint
  frozen: boolean;       // Frozen during flex distribution
  lineIndex: number;     // Which flex line this child belongs to
  relativeIndex: number; // Position among relative children (-1 if absolute/hidden)
  // Auto margin tracking
  mainStartMarginAuto: boolean;
  mainEndMarginAuto: boolean;
  mainStartMarginValue: number;
  mainEndMarginValue: number;
}
```

### Pre-allocated Line Arrays

Module-level typed arrays store per-line metrics:

```typescript
let _lineCrossSizes = new Float64Array(32);   // Cross size per line
let _lineCrossOffsets = new Float64Array(32); // Cross offset per line
let _lineLengths = new Uint16Array(32);       // Children count per line
let _lineChildren: Node[][] = [...];          // Children per line (grows if needed)
```

Memory usage: ~768 bytes total (covers 32 flex lines - virtually all real layouts).

### Filtered Iteration

The `relativeIndex` field enables skipping absolute/hidden children without `filter()`:

```typescript
// Classic (allocates filtered array):
const relative = children.filter(c => !isAbsolute(c) && !isHidden(c));

// Zero-alloc (skips inline):
for (const child of children) {
  if (child.flex.relativeIndex < 0) continue;
  // Process child...
}
```

## Benchmark Results

| Scenario | Flexx Classic | Flexx Zero | Yoga WASM |
|----------|--------------|------------|-----------|
| Flat 500 nodes | 1x | 1.75-2x faster | ~0.9x |
| Deep 50 levels | 1x | ~0.7x (slower) | 29-45x faster |
| Kanban TUI | 1x | ~1.1x faster | ~1.7x faster |

**Key insight**: Zero-alloc excels at flat, wide layouts but struggles with deep hierarchies.

## Trade-offs

### Advantages

- Eliminates temporary object allocation during layout
- Faster for flat, wide layouts (typical TUI structure)
- Cache-friendly contiguous memory access
- Reduces GC pause frequency

### Disadvantages

- Slower for deep hierarchies due to O(N×L) child scanning
- Not reentrant (single layout calculation at a time)
- Higher memory per node (FlexInfo struct)
- No incremental layout yet

## Root Cause: Deep Hierarchy Slowness

Analysis identified several factors:

1. **Repeated child scanning**: `distributeFlexSpaceForLine()` scans ALL children for EACH line instead of using line boundary indices (O(N×L) vs O(N))

2. **No caching**: Every layout recalculates everything - no memoization of measure results or subtree layouts

3. **Recursion overhead**: Deep JS recursion has higher function call costs than C++ native code

4. **No incremental layout**: Full tree recalculation even for single-node changes

## Future Improvements

### P0: Line Boundary Indices (Low effort, High impact)

Store line start/end indices during `breakIntoLines()` to avoid re-scanning:

```typescript
// Instead of scanning all children per line:
for (let lineIdx = 0; lineIdx < lineCount; lineIdx++) {
  const start = _lineStarts[lineIdx];
  const end = start + _lineLengths[lineIdx];
  for (let i = start; i < end; i++) {
    const child = _lineChildren[lineIdx][i - start];
    // Process without re-scanning
  }
}
```

### P1: Dirty-flag Incremental Layout (Medium effort, Very High impact)

Mark nodes dirty on style/content change, propagate up tree, skip clean subtrees:

```typescript
class Node {
  private _isDirty = true;

  markDirty() {
    if (this._isDirty) return;
    this._isDirty = true;
    this._parent?.markDirty();
  }

  calculateLayout() {
    if (!this._isDirty) return; // Skip clean subtrees
    // ... layout logic
    this._isDirty = false;
  }
}
```

### P2: Measure Result Caching (Low effort, Medium impact)

Cache `(availW, availH) → (computedW, computedH)` per node to avoid redundant measure calls.

### P3: Special-case Single-child Containers (Low effort, Medium impact)

Skip flex distribution logic for containers with only one child - direct assignment instead.

### P4: Iterative Traversal (High effort, Medium impact)

Replace recursion with explicit stack for better JIT optimization and reduced call overhead.

## Usage

```typescript
// Classic algorithm (default)
import { Node } from '@beorn/flexx';

// Zero-allocation algorithm
import { Node } from '@beorn/flexx/zero';
```

Both exports have identical APIs - only the internal algorithm differs.

## Feature Gap

The zero-allocation algorithm is missing some features from the classic algorithm:

| Feature | Classic | Zero-alloc |
|---------|---------|------------|
| RTL (direction: rtl) | ✅ | ❌ (69 direction refs to port) |
| Baseline alignment | ✅ (baselineFunc) | ❌ |
| All Yoga tests | 33/41 | 33/41 |

These gaps should be addressed before deprecating the classic algorithm.
See `km-flexx-parity` bead for tracking.

## Files

| File | Description |
|------|-------------|
| `src/layout.ts` | Classic layout algorithm |
| `src/layout-zero.ts` | Zero-allocation layout algorithm |
| `src/node.ts` | Classic Node class |
| `src/node-zero.ts` | Zero-allocation Node class (with FlexInfo) |
| `src/index.ts` | Classic entry point |
| `src/index-zero.ts` | Zero-allocation entry point |
