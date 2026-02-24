/**
 * Layout Helper Functions
 *
 * Edge resolution helpers for margins, padding, borders.
 * These are pure functions with no state — safe to extract.
 */
import type { Value } from "./types.js";
export declare const EDGE_LEFT = 0;
export declare const EDGE_TOP = 1;
export declare const EDGE_RIGHT = 2;
export declare const EDGE_BOTTOM = 3;
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
 * - LTR: START->left, END->right
 * - RTL: START->right, END->left
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
 * - LTR: START->left, END->right
 * - RTL: START->right, END->left
 */
export declare function resolveEdgeBorderValue(arr: [number, number, number, number, number, number], physicalIndex: number, // 0=left, 1=top, 2=right, 3=bottom
_flexDirection: number, direction?: number): number;
//# sourceMappingURL=layout-helpers.d.ts.map