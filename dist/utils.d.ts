/**
 * Flexily Utility Functions
 *
 * Helper functions for edge value manipulation and value resolution.
 */
import type { Value } from "./types.js";
/**
 * Shared traversal stack for iterative tree operations.
 * Avoids recursion (prevents stack overflow on deep trees) and avoids
 * allocation during layout passes.
 */
export declare const traversalStack: unknown[];
/**
 * Set a value on an edge array (supports all edge types including logical START/END).
 */
export declare function setEdgeValue(arr: [Value, Value, Value, Value, Value, Value], edge: number, value: number, unit: number): void;
/**
 * Set a border value on an edge array.
 */
export declare function setEdgeBorder(arr: [number, number, number, number, number, number], edge: number, value: number): void;
/**
 * Get a value from an edge array.
 */
export declare function getEdgeValue(arr: [Value, Value, Value, Value, Value, Value], edge: number): Value;
/**
 * Get a border value from an edge array.
 */
export declare function getEdgeBorderValue(arr: [number, number, number, number, number, number], edge: number): number;
/**
 * Resolve a value (point or percent) to an absolute number.
 */
export declare function resolveValue(value: Value, availableSize: number): number;
/**
 * Apply min/max constraints to a size.
 *
 * CSS behavior:
 * - min: Floor constraint. Does NOT affect children's layout — the container expands
 *   after shrink-wrap. When size is NaN (auto-sized), min is NOT applied here;
 *   the post-shrink-wrap applyMinMax call (Phase 9) handles it.
 * - max: Ceiling constraint. DOES affect children's layout — content wraps/clips
 *   within the max. When size is NaN (auto-sized), max constrains the container
 *   so children are laid out within the max bound.
 *
 * Percent constraints that can't resolve (available is NaN) are skipped entirely,
 * since resolveValue returns 0 for percent-against-NaN, which would incorrectly
 * clamp sizes to 0.
 */
export declare function applyMinMax(size: number, min: Value, max: Value, available: number): number;
//# sourceMappingURL=utils.d.ts.map