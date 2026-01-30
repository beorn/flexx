/**
 * Flexx Layout Algorithm
 *
 * Core flexbox layout computation extracted from node.ts.
 * Based on Planning-nl/flexbox.js reference implementation.
 */
import type { Node } from "./node.js";
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
flexDirection: number, availableSize: number): number;
/**
 * Check if a logical edge margin is set to auto.
 */
export declare function isEdgeAuto(arr: [Value, Value, Value, Value, Value, Value], physicalIndex: number, flexDirection: number): boolean;
export declare function markSubtreeLayoutSeen(node: Node): void;
export declare function countNodes(node: Node): number;
/**
 * Compute layout for a node tree.
 */
export declare function computeLayout(root: Node, availableWidth: number, availableHeight: number): void;
//# sourceMappingURL=layout.d.ts.map