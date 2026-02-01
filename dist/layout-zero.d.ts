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
 * In Yoga, START/END are stored separately and resolved based on flex direction:
 * - Row (LTR): START→left, END→right
 * - Row-reverse (LTR): START→right, END→left
 * - Column: START→top, END→bottom
 * - Column-reverse: START→bottom, END→top
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
export declare function markSubtreeLayoutSeen(node: Node): void;
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
 */
export declare function measureNode(node: Node, availableWidth: number, availableHeight: number): void;
/**
 * Compute layout for a node tree.
 */
export declare function computeLayout(root: Node, availableWidth: number, availableHeight: number, direction?: number): void;
//# sourceMappingURL=layout-zero.d.ts.map