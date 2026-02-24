/**
 * Layout Tree Traversal Utilities
 *
 * Iterative tree traversal functions that avoid recursion
 * (prevents stack overflow on deep trees).
 * Uses shared traversalStack from utils.ts for zero-allocation.
 */
import type { Node } from "./node-zero.js";
/**
 * Mark subtree as having new layout and clear dirty flags (iterative to avoid stack overflow).
 * This is called after layout completes to reset dirty tracking for all nodes.
 */
export declare function markSubtreeLayoutSeen(node: Node): void;
/**
 * Count total nodes in tree (iterative to avoid stack overflow).
 */
export declare function countNodes(node: Node): number;
/**
 * Propagate position delta to all descendants (iterative to avoid stack overflow).
 * Used when parent position changes but layout is cached.
 *
 * Only updates the constraint fingerprint's lastOffset values, NOT layout.top/left.
 * layout.top/left store RELATIVE positions (relative to parent's border box),
 * so they don't change when an ancestor moves — only the absolute offset
 * (tracked via lastOffsetX/Y) changes.
 */
export declare function propagatePositionDelta(node: Node, deltaX: number, deltaY: number): void;
//# sourceMappingURL=layout-traversal.d.ts.map