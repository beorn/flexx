/**
 * Flexx Layout Algorithm
 *
 * Core flexbox layout computation extracted from node.ts.
 * Based on Planning-nl/flexbox.js reference implementation.
 */
import type { Node } from "./node-zero.js";
import type { Value } from "./types.js";
/**
 * Check if flex direction is row-oriented (horizontal main axis).
 */
export declare function isRowDirection(flexDirection: number): boolean;
/**
 * Check if flex direction is reversed.
 */
export declare function isReverseDirection(flexDirection: number): boolean;
/**
 * Resolve logical (START/END) margins/padding to physical values.
 * EDGE_START/EDGE_END always resolve along the inline (horizontal) axis:
 * - LTR: START→left, END→right
 * - RTL: START→right, END→left
 *
 * Physical edges (LEFT/RIGHT/TOP/BOTTOM) are used directly.
 * When both physical and logical are set, logical takes precedence.
 */
export declare function resolveEdgeValue(arr: [Value, Value, Value, Value, Value, Value], physicalIndex: number, // 0=left, 1=top, 2=right, 3=bottom
flexDirection: number, availableSize: number, direction?: number): number;
/**
 * Check if a logical edge margin is set to auto.
 */
export declare function isEdgeAuto(arr: [Value, Value, Value, Value, Value, Value], physicalIndex: number, flexDirection: number, direction?: number): boolean;
/**
 * Resolve logical (START/END) border widths to physical values.
 * Border values are plain numbers (always points), so resolution is simpler
 * than for margin/padding. Uses NaN as the "not set" sentinel for logical slots.
 * When both physical and logical are set, logical takes precedence.
 *
 * EDGE_START/EDGE_END always resolve along the inline (horizontal) axis,
 * regardless of flex direction. Direction (LTR/RTL) determines the mapping:
 * - LTR: START→left, END→right
 * - RTL: START→right, END→left
 */
export declare function resolveEdgeBorderValue(arr: [number, number, number, number, number, number], physicalIndex: number, // 0=left, 1=top, 2=right, 3=bottom
_flexDirection: number, direction?: number): number;
/**
 * Mark subtree as having new layout and clear dirty flags (iterative to avoid stack overflow).
 * This is called after layout completes to reset dirty tracking for all nodes.
 */
export declare function markSubtreeLayoutSeen(node: Node): void;
/**
 * Count total nodes in tree (iterative to avoid stack overflow).
 */
export declare function countNodes(node: Node): number;
export declare let layoutNodeCalls: number;
export declare let measureNodeCalls: number;
export declare let resolveEdgeCalls: number;
export declare let layoutSizingCalls: number;
export declare let layoutPositioningCalls: number;
export declare let layoutCacheHits: number;
export declare function resetLayoutStats(): void;
/**
 * Measure a node to get its intrinsic size without computing positions.
 * This is a lightweight alternative to layoutNode for sizing-only passes.
 *
 * Sets layout.width and layout.height but NOT layout.left/top.
 *
 * @param node - The node to measure
 * @param availableWidth - Available width (NaN for unconstrained)
 * @param availableHeight - Available height (NaN for unconstrained)
 * @param direction - Layout direction (LTR or RTL)
 */
export declare function measureNode(node: Node, availableWidth: number, availableHeight: number, direction?: number): void;
/**
 * Compute layout for a node tree.
 */
export declare function computeLayout(root: Node, availableWidth: number, availableHeight: number, direction?: number): void;
//# sourceMappingURL=layout-zero.d.ts.map