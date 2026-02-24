/**
 * Layout Helper Functions
 *
 * Edge resolution helpers for margins, padding, borders.
 * These are pure functions with no state — safe to extract.
 */
import * as C from "./constants.js";
import { resolveValue } from "./utils.js";
// ============================================================================
// Constants for Edge Indices (avoid magic numbers)
// ============================================================================
export const EDGE_LEFT = 0;
export const EDGE_TOP = 1;
export const EDGE_RIGHT = 2;
export const EDGE_BOTTOM = 3;
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Check if flex direction is row-oriented (horizontal main axis).
 */
export function isRowDirection(flexDirection) {
    return flexDirection === C.FLEX_DIRECTION_ROW || flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
}
/**
 * Check if flex direction is reversed.
 */
export function isReverseDirection(flexDirection) {
    return flexDirection === C.FLEX_DIRECTION_ROW_REVERSE || flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;
}
/**
 * Get the logical edge value (START/END) for a given physical index.
 * Returns undefined if no logical value applies to this physical edge.
 *
 * EDGE_START/EDGE_END always resolve along the inline (horizontal) axis,
 * regardless of flex direction. Direction (LTR/RTL) determines the mapping:
 * - LTR: START->left, END->right
 * - RTL: START->right, END->left
 */
function getLogicalEdgeValue(arr, physicalIndex, _flexDirection, direction = C.DIRECTION_LTR) {
    const isRTL = direction === C.DIRECTION_RTL;
    // START/END always map to left/right (inline direction)
    if (physicalIndex === 0) {
        return isRTL ? arr[5] : arr[4]; // Left: START (LTR) or END (RTL)
    }
    else if (physicalIndex === 2) {
        return isRTL ? arr[4] : arr[5]; // Right: END (LTR) or START (RTL)
    }
    return undefined;
}
/**
 * Resolve logical (START/END) margins/padding to physical values.
 * EDGE_START/EDGE_END always resolve along the inline (horizontal) axis:
 * - LTR: START->left, END->right
 * - RTL: START->right, END->left
 *
 * Physical edges (LEFT/RIGHT/TOP/BOTTOM) are used directly.
 * When both physical and logical are set, logical takes precedence.
 */
export function resolveEdgeValue(arr, physicalIndex, // 0=left, 1=top, 2=right, 3=bottom
flexDirection, availableSize, direction = C.DIRECTION_LTR) {
    const logicalValue = getLogicalEdgeValue(arr, physicalIndex, flexDirection, direction);
    // Logical takes precedence if defined
    if (logicalValue && logicalValue.unit !== C.UNIT_UNDEFINED) {
        return resolveValue(logicalValue, availableSize);
    }
    // Fall back to physical
    return resolveValue(arr[physicalIndex], availableSize);
}
/**
 * Check if a logical edge margin is set to auto.
 */
export function isEdgeAuto(arr, physicalIndex, flexDirection, direction = C.DIRECTION_LTR) {
    const logicalValue = getLogicalEdgeValue(arr, physicalIndex, flexDirection, direction);
    // Check logical first
    if (logicalValue && logicalValue.unit !== C.UNIT_UNDEFINED) {
        return logicalValue.unit === C.UNIT_AUTO;
    }
    // Fall back to physical
    return arr[physicalIndex].unit === C.UNIT_AUTO;
}
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
export function resolveEdgeBorderValue(arr, physicalIndex, // 0=left, 1=top, 2=right, 3=bottom
_flexDirection, direction = C.DIRECTION_LTR) {
    const isRTL = direction === C.DIRECTION_RTL;
    // START/END always map to left/right (inline direction)
    let logicalSlot;
    if (physicalIndex === 0)
        logicalSlot = isRTL ? 5 : 4;
    else if (physicalIndex === 2)
        logicalSlot = isRTL ? 4 : 5;
    // Logical takes precedence if set (NaN = not set)
    if (logicalSlot !== undefined && !Number.isNaN(arr[logicalSlot])) {
        return arr[logicalSlot];
    }
    return arr[physicalIndex];
}
//# sourceMappingURL=layout-helpers.js.map