/**
 * Layout Tree Traversal Utilities
 *
 * Iterative tree traversal functions that avoid recursion
 * (prevents stack overflow on deep trees).
 * Uses shared traversalStack from utils.ts for zero-allocation.
 */
import { traversalStack } from "./utils.js";
/**
 * Mark subtree as having new layout and clear dirty flags (iterative to avoid stack overflow).
 * This is called after layout completes to reset dirty tracking for all nodes.
 */
export function markSubtreeLayoutSeen(node) {
    traversalStack.length = 0;
    traversalStack.push(node);
    while (traversalStack.length > 0) {
        const current = traversalStack.pop();
        current["_isDirty"] = false;
        current["_hasNewLayout"] = true;
        for (const child of current.children) {
            traversalStack.push(child);
        }
    }
}
/**
 * Count total nodes in tree (iterative to avoid stack overflow).
 */
export function countNodes(node) {
    let count = 0;
    traversalStack.length = 0;
    traversalStack.push(node);
    while (traversalStack.length > 0) {
        const current = traversalStack.pop();
        count++;
        for (const child of current.children) {
            traversalStack.push(child);
        }
    }
    return count;
}
/**
 * Propagate position delta to all descendants (iterative to avoid stack overflow).
 * Used when parent position changes but layout is cached.
 *
 * Only updates the constraint fingerprint's lastOffset values, NOT layout.top/left.
 * layout.top/left store RELATIVE positions (relative to parent's border box),
 * so they don't change when an ancestor moves — only the absolute offset
 * (tracked via lastOffsetX/Y) changes.
 */
export function propagatePositionDelta(node, deltaX, deltaY) {
    traversalStack.length = 0;
    // Start with all children of the node
    for (const child of node.children) {
        traversalStack.push(child);
    }
    while (traversalStack.length > 0) {
        const current = traversalStack.pop();
        current.flex.lastOffsetX += deltaX;
        current.flex.lastOffsetY += deltaY;
        for (const child of current.children) {
            traversalStack.push(child);
        }
    }
}
//# sourceMappingURL=layout-traversal.js.map