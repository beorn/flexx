/**
 * Flexx Node
 *
 * Yoga-compatible Node class for flexbox layout.
 */
import * as C from "./constants.js";
import { createDefaultStyle, } from "./types.js";
/**
 * Floating-point tolerance for flex grow/shrink distribution.
 * Used to determine when remaining space is negligible.
 */
const EPSILON_FLOAT = 0.001;
/**
 * Validate that a value is a finite, non-negative number.
 * @throws Error if the value is invalid
 */
function validateNonNegative(value, name) {
    if (!Number.isFinite(value) || value < 0) {
        throw new Error(`Invalid ${name}: ${value} (must be a finite non-negative number)`);
    }
}
/**
 * Validate that a value is a finite number (can be negative for percent values).
 * @throws Error if the value is invalid
 */
function validateFinite(value, name) {
    if (!Number.isFinite(value)) {
        throw new Error(`Invalid ${name}: ${value} (must be a finite number)`);
    }
}
/**
 * A layout node in the flexbox tree.
 */
export class Node {
    // Tree structure
    _parent = null;
    _children = [];
    // Style
    _style = createDefaultStyle();
    // Measure function for intrinsic sizing
    _measureFunc = null;
    // Computed layout
    _layout = { left: 0, top: 0, width: 0, height: 0 };
    // Dirty flags
    _isDirty = true;
    _hasNewLayout = false;
    // ============================================================================
    // Static Factory
    // ============================================================================
    static create() {
        return new Node();
    }
    // ============================================================================
    // Tree Operations
    // ============================================================================
    getChildCount() {
        return this._children.length;
    }
    getChild(index) {
        return this._children[index];
    }
    getParent() {
        return this._parent;
    }
    insertChild(child, index) {
        // Prevent circular parent-child relationships
        if (child === this) {
            throw new Error("Cannot insert a node as its own child");
        }
        let ancestor = this._parent;
        while (ancestor !== null) {
            if (ancestor === child) {
                throw new Error("Cannot insert an ancestor as a child (would create cycle)");
            }
            ancestor = ancestor._parent;
        }
        if (child._parent !== null) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        this._children.splice(index, 0, child);
        this.markDirty();
    }
    removeChild(child) {
        const index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
            child._parent = null;
            this.markDirty();
        }
    }
    free() {
        // Remove from parent
        if (this._parent !== null) {
            this._parent.removeChild(this);
        }
        // Clear children
        for (const child of this._children) {
            child._parent = null;
        }
        this._children = [];
        this._measureFunc = null;
    }
    // ============================================================================
    // Measure Function
    // ============================================================================
    setMeasureFunc(measureFunc) {
        this._measureFunc = measureFunc;
        this.markDirty();
    }
    unsetMeasureFunc() {
        this._measureFunc = null;
        this.markDirty();
    }
    hasMeasureFunc() {
        return this._measureFunc !== null;
    }
    // ============================================================================
    // Dirty Tracking
    // ============================================================================
    isDirty() {
        return this._isDirty;
    }
    markDirty() {
        this._isDirty = true;
        if (this._parent !== null) {
            this._parent.markDirty();
        }
    }
    hasNewLayout() {
        return this._hasNewLayout;
    }
    markLayoutSeen() {
        this._hasNewLayout = false;
    }
    // ============================================================================
    // Layout Calculation
    // ============================================================================
    calculateLayout(width, height, _direction = C.DIRECTION_LTR) {
        if (!this._isDirty)
            return;
        // Run the layout algorithm
        computeLayout(this, width, height);
        // Mark layout computed
        this._isDirty = false;
        this._hasNewLayout = true;
        markSubtreeLayoutSeen(this);
    }
    // ============================================================================
    // Layout Results
    // ============================================================================
    getComputedLeft() {
        return this._layout.left;
    }
    getComputedTop() {
        return this._layout.top;
    }
    getComputedWidth() {
        return this._layout.width;
    }
    getComputedHeight() {
        return this._layout.height;
    }
    // ============================================================================
    // Internal Accessors (for layout algorithm)
    // ============================================================================
    get children() {
        return this._children;
    }
    get style() {
        return this._style;
    }
    get layout() {
        return this._layout;
    }
    get measureFunc() {
        return this._measureFunc;
    }
    // ============================================================================
    // Width Setters
    // ============================================================================
    setWidth(value) {
        validateNonNegative(value, "width");
        this._style.width = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setWidthPercent(value) {
        validateFinite(value, "width percent");
        this._style.width = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setWidthAuto() {
        this._style.width = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    // ============================================================================
    // Height Setters
    // ============================================================================
    setHeight(value) {
        validateNonNegative(value, "height");
        this._style.height = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setHeightPercent(value) {
        validateFinite(value, "height percent");
        this._style.height = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setHeightAuto() {
        this._style.height = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    // ============================================================================
    // Min/Max Size Setters
    // ============================================================================
    setMinWidth(value) {
        validateNonNegative(value, "minWidth");
        this._style.minWidth = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setMinWidthPercent(value) {
        validateFinite(value, "minWidth percent");
        this._style.minWidth = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setMinHeight(value) {
        validateNonNegative(value, "minHeight");
        this._style.minHeight = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setMinHeightPercent(value) {
        validateFinite(value, "minHeight percent");
        this._style.minHeight = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setMaxWidth(value) {
        validateNonNegative(value, "maxWidth");
        this._style.maxWidth = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setMaxWidthPercent(value) {
        validateFinite(value, "maxWidth percent");
        this._style.maxWidth = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setMaxHeight(value) {
        validateNonNegative(value, "maxHeight");
        this._style.maxHeight = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setMaxHeightPercent(value) {
        validateFinite(value, "maxHeight percent");
        this._style.maxHeight = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    // ============================================================================
    // Flex Setters
    // ============================================================================
    setFlexGrow(value) {
        validateNonNegative(value, "flexGrow");
        this._style.flexGrow = value;
        this.markDirty();
    }
    setFlexShrink(value) {
        validateNonNegative(value, "flexShrink");
        this._style.flexShrink = value;
        this.markDirty();
    }
    setFlexBasis(value) {
        validateNonNegative(value, "flexBasis");
        this._style.flexBasis = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    setFlexBasisPercent(value) {
        validateFinite(value, "flexBasis percent");
        this._style.flexBasis = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    setFlexBasisAuto() {
        this._style.flexBasis = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    setFlexDirection(direction) {
        this._style.flexDirection = direction;
        this.markDirty();
    }
    setFlexWrap(wrap) {
        this._style.flexWrap = wrap;
        this.markDirty();
    }
    // ============================================================================
    // Alignment Setters
    // ============================================================================
    setAlignItems(align) {
        this._style.alignItems = align;
        this.markDirty();
    }
    setAlignSelf(align) {
        this._style.alignSelf = align;
        this.markDirty();
    }
    setAlignContent(align) {
        this._style.alignContent = align;
        this.markDirty();
    }
    setJustifyContent(justify) {
        this._style.justifyContent = justify;
        this.markDirty();
    }
    // ============================================================================
    // Spacing Setters
    // ============================================================================
    setPadding(edge, value) {
        validateNonNegative(value, "padding");
        setEdgeValue(this._style.padding, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    setMargin(edge, value) {
        validateFinite(value, "margin"); // Margins can be negative in CSS
        setEdgeValue(this._style.margin, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    setBorder(edge, value) {
        validateNonNegative(value, "border");
        setEdgeBorder(this._style.border, edge, value);
        this.markDirty();
    }
    setGap(gutter, value) {
        validateNonNegative(value, "gap");
        if (gutter === C.GUTTER_COLUMN) {
            this._style.gap[0] = value;
        }
        else if (gutter === C.GUTTER_ROW) {
            this._style.gap[1] = value;
        }
        else if (gutter === C.GUTTER_ALL) {
            this._style.gap[0] = value;
            this._style.gap[1] = value;
        }
        this.markDirty();
    }
    // ============================================================================
    // Position Setters
    // ============================================================================
    setPositionType(positionType) {
        this._style.positionType = positionType;
        this.markDirty();
    }
    setPosition(edge, value) {
        validateFinite(value, "position"); // Position can be negative
        setEdgeValue(this._style.position, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    // ============================================================================
    // Other Setters
    // ============================================================================
    setDisplay(display) {
        this._style.display = display;
        this.markDirty();
    }
    setOverflow(overflow) {
        this._style.overflow = overflow;
        this.markDirty();
    }
    // ============================================================================
    // Style Getters
    // ============================================================================
    getWidth() {
        return this._style.width;
    }
    getHeight() {
        return this._style.height;
    }
    getMinWidth() {
        return this._style.minWidth;
    }
    getMinHeight() {
        return this._style.minHeight;
    }
    getMaxWidth() {
        return this._style.maxWidth;
    }
    getMaxHeight() {
        return this._style.maxHeight;
    }
    getFlexGrow() {
        return this._style.flexGrow;
    }
    getFlexShrink() {
        return this._style.flexShrink;
    }
    getFlexBasis() {
        return this._style.flexBasis;
    }
    getFlexDirection() {
        return this._style.flexDirection;
    }
    getFlexWrap() {
        return this._style.flexWrap;
    }
    getAlignItems() {
        return this._style.alignItems;
    }
    getAlignSelf() {
        return this._style.alignSelf;
    }
    getAlignContent() {
        return this._style.alignContent;
    }
    getJustifyContent() {
        return this._style.justifyContent;
    }
    getPadding(edge) {
        return getEdgeValue(this._style.padding, edge);
    }
    getMargin(edge) {
        return getEdgeValue(this._style.margin, edge);
    }
    getBorder(edge) {
        return getEdgeBorderValue(this._style.border, edge);
    }
    getPosition(edge) {
        return getEdgeValue(this._style.position, edge);
    }
    getPositionType() {
        return this._style.positionType;
    }
    getDisplay() {
        return this._style.display;
    }
    getOverflow() {
        return this._style.overflow;
    }
    getGap(gutter) {
        if (gutter === C.GUTTER_COLUMN) {
            return this._style.gap[0];
        }
        else if (gutter === C.GUTTER_ROW) {
            return this._style.gap[1];
        }
        return this._style.gap[0]; // Default to column gap
    }
}
// ============================================================================
// Helper Functions
// ============================================================================
function setEdgeValue(arr, edge, value, unit) {
    const v = { value, unit };
    switch (edge) {
        case C.EDGE_LEFT:
            arr[0] = v;
            break;
        case C.EDGE_TOP:
            arr[1] = v;
            break;
        case C.EDGE_RIGHT:
            arr[2] = v;
            break;
        case C.EDGE_BOTTOM:
            arr[3] = v;
            break;
        case C.EDGE_HORIZONTAL:
            arr[0] = v;
            arr[2] = v;
            break;
        case C.EDGE_VERTICAL:
            arr[1] = v;
            arr[3] = v;
            break;
        case C.EDGE_ALL:
            arr[0] = v;
            arr[1] = v;
            arr[2] = v;
            arr[3] = v;
            break;
    }
}
function setEdgeBorder(arr, edge, value) {
    switch (edge) {
        case C.EDGE_LEFT:
            arr[0] = value;
            break;
        case C.EDGE_TOP:
            arr[1] = value;
            break;
        case C.EDGE_RIGHT:
            arr[2] = value;
            break;
        case C.EDGE_BOTTOM:
            arr[3] = value;
            break;
        case C.EDGE_HORIZONTAL:
            arr[0] = value;
            arr[2] = value;
            break;
        case C.EDGE_VERTICAL:
            arr[1] = value;
            arr[3] = value;
            break;
        case C.EDGE_ALL:
            arr[0] = value;
            arr[1] = value;
            arr[2] = value;
            arr[3] = value;
            break;
    }
}
function getEdgeValue(arr, edge) {
    switch (edge) {
        case C.EDGE_LEFT:
            return arr[0];
        case C.EDGE_TOP:
            return arr[1];
        case C.EDGE_RIGHT:
            return arr[2];
        case C.EDGE_BOTTOM:
            return arr[3];
        default:
            return arr[0]; // Default to left
    }
}
function getEdgeBorderValue(arr, edge) {
    switch (edge) {
        case C.EDGE_LEFT:
            return arr[0];
        case C.EDGE_TOP:
            return arr[1];
        case C.EDGE_RIGHT:
            return arr[2];
        case C.EDGE_BOTTOM:
            return arr[3];
        default:
            return arr[0]; // Default to left
    }
}
function markSubtreeLayoutSeen(node) {
    for (const child of node.children) {
        child["_hasNewLayout"] = true;
        markSubtreeLayoutSeen(child);
    }
}
// ============================================================================
// Layout Algorithm
// Based on Planning-nl/flexbox.js reference implementation
// ============================================================================
/**
 * Compute intrinsic main-axis size for a node.
 * For nodes with measureFunc, calls the measure function.
 * For containers, recursively computes children's sizes and sums them.
 *
 * @param node - The node to measure
 * @param isRow - Whether parent flex direction is row
 * @param availMainAxis - Available space on main axis (for at-most constraint)
 * @param availCrossAxis - Available space on cross axis
 * @returns The intrinsic main-axis size
 */
function computeIntrinsicMainSize(node, isRow, availMainAxis, availCrossAxis) {
    const style = node.style;
    // If explicit main-axis size, use it
    const mainDim = isRow ? style.width : style.height;
    if (mainDim.unit === C.UNIT_POINT) {
        return mainDim.value;
    }
    if (mainDim.unit === C.UNIT_PERCENT && availMainAxis > 0) {
        return availMainAxis * (mainDim.value / 100);
    }
    // If has measure function (leaf node like text), call it
    if (node.measureFunc !== null && node.children.length === 0) {
        const measured = node.measureFunc(availMainAxis, C.MEASURE_MODE_AT_MOST, availCrossAxis, C.MEASURE_MODE_UNDEFINED);
        return isRow ? measured.width : measured.height;
    }
    // Container: compute intrinsic size based on children
    const relativeChildren = node.children.filter((c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE && c.style.display !== C.DISPLAY_NONE);
    if (relativeChildren.length === 0) {
        return 0;
    }
    // Determine THIS node's flex direction
    const nodeIsRow = style.flexDirection === C.FLEX_DIRECTION_ROW ||
        style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
    // Padding and border on the axis we're measuring
    const padding = style.padding;
    const border = style.border;
    const paddingOnAxis = isRow
        ? resolveValue(padding[0], availMainAxis) + resolveValue(padding[2], availMainAxis)
        : resolveValue(padding[1], availMainAxis) + resolveValue(padding[3], availMainAxis);
    const borderOnAxis = isRow ? border[0] + border[2] : border[1] + border[3];
    // If measuring the SAME axis as this node's main axis, sum children + gaps
    // If measuring the CROSS axis, take the max
    const measuringMainAxis = isRow === nodeIsRow;
    if (measuringMainAxis) {
        // Sum children along main axis
        const gap = nodeIsRow ? style.gap[0] : style.gap[1];
        const totalGaps = relativeChildren.length > 1 ? gap * (relativeChildren.length - 1) : 0;
        let totalChildMain = 0;
        for (const child of relativeChildren) {
            const cs = child.style;
            // Child margin on the axis we're measuring
            const mainMargin = isRow
                ? resolveValue(cs.margin[0], availMainAxis) + resolveValue(cs.margin[2], availMainAxis)
                : resolveValue(cs.margin[1], availMainAxis) + resolveValue(cs.margin[3], availMainAxis);
            // Recursively compute child's intrinsic size on this axis
            const childIntrinsic = computeIntrinsicMainSize(child, isRow, availMainAxis, availCrossAxis);
            totalChildMain += childIntrinsic + mainMargin;
        }
        return totalChildMain + totalGaps + paddingOnAxis + borderOnAxis;
    }
    else {
        // Max of children (cross axis stacking)
        let maxChild = 0;
        for (const child of relativeChildren) {
            const cs = child.style;
            // Child margin on the axis we're measuring
            const mainMargin = isRow
                ? resolveValue(cs.margin[0], availMainAxis) + resolveValue(cs.margin[2], availMainAxis)
                : resolveValue(cs.margin[1], availMainAxis) + resolveValue(cs.margin[3], availMainAxis);
            // Recursively compute child's intrinsic size on this axis
            const childIntrinsic = computeIntrinsicMainSize(child, isRow, availMainAxis, availCrossAxis);
            maxChild = Math.max(maxChild, childIntrinsic + mainMargin);
        }
        return maxChild + paddingOnAxis + borderOnAxis;
    }
}
/**
 * Compute layout for a node tree.
 */
function computeLayout(root, availableWidth, availableHeight) {
    layoutNode(root, availableWidth, availableHeight, 0, 0);
}
/**
 * Layout a node and its children.
 */
function layoutNode(node, availableWidth, availableHeight, offsetX, offsetY) {
    const style = node.style;
    const layout = node.layout;
    // Handle display: none
    if (style.display === C.DISPLAY_NONE) {
        layout.left = 0;
        layout.top = 0;
        layout.width = 0;
        layout.height = 0;
        return;
    }
    // Calculate spacing
    const margin = resolveSpacing(style.margin, availableWidth, availableHeight);
    const padding = resolveSpacing(style.padding, availableWidth, availableHeight);
    const borderLeft = style.border[0];
    const borderTop = style.border[1];
    const borderRight = style.border[2];
    const borderBottom = style.border[3];
    // Calculate node dimensions
    let nodeWidth;
    if (style.width.unit === C.UNIT_POINT) {
        nodeWidth = style.width.value;
    }
    else if (style.width.unit === C.UNIT_PERCENT) {
        nodeWidth = availableWidth * (style.width.value / 100);
    }
    else {
        nodeWidth = availableWidth - margin.left - margin.right;
    }
    nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
    let nodeHeight;
    if (style.height.unit === C.UNIT_POINT) {
        nodeHeight = style.height.value;
    }
    else if (style.height.unit === C.UNIT_PERCENT) {
        nodeHeight = availableHeight * (style.height.value / 100);
    }
    else {
        nodeHeight = availableHeight - margin.top - margin.bottom;
    }
    nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
    // Content area (inside border and padding)
    const innerLeft = borderLeft + padding.left;
    const innerTop = borderTop + padding.top;
    const innerRight = borderRight + padding.right;
    const innerBottom = borderBottom + padding.bottom;
    const contentWidth = Math.max(0, nodeWidth - innerLeft - innerRight);
    const contentHeight = Math.max(0, nodeHeight - innerTop - innerBottom);
    // Handle measure function (text nodes)
    if (node.measureFunc !== null && node.children.length === 0) {
        const measureFunc = node.measureFunc;
        const widthMode = style.width.unit === C.UNIT_AUTO
            ? C.MEASURE_MODE_AT_MOST
            : C.MEASURE_MODE_EXACTLY;
        const heightMode = style.height.unit === C.UNIT_AUTO
            ? C.MEASURE_MODE_UNDEFINED
            : C.MEASURE_MODE_EXACTLY;
        const measured = measureFunc(contentWidth, widthMode, contentHeight, heightMode);
        if (style.width.unit === C.UNIT_AUTO) {
            nodeWidth = measured.width + innerLeft + innerRight;
        }
        if (style.height.unit === C.UNIT_AUTO) {
            nodeHeight = measured.height + innerTop + innerBottom;
        }
        layout.width = Math.round(nodeWidth);
        layout.height = Math.round(nodeHeight);
        layout.left = Math.round(offsetX + margin.left);
        layout.top = Math.round(offsetY + margin.top);
        return;
    }
    // Separate relative and absolute children, excluding display:none
    const relativeChildren = node.children.filter((c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE &&
        c.style.display !== C.DISPLAY_NONE);
    const absoluteChildren = node.children.filter((c) => c.style.positionType === C.POSITION_TYPE_ABSOLUTE &&
        c.style.display !== C.DISPLAY_NONE);
    // Flex layout for relative children
    if (relativeChildren.length > 0) {
        const isRow = style.flexDirection === C.FLEX_DIRECTION_ROW ||
            style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
        const isReverse = style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE ||
            style.flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;
        const mainAxisSize = isRow ? contentWidth : contentHeight;
        const crossAxisSize = isRow ? contentHeight : contentWidth;
        const mainGap = isRow ? style.gap[0] : style.gap[1];
        const children = [];
        let totalBaseMain = 0;
        for (const child of relativeChildren) {
            const cs = child.style;
            // Child margin on main axis
            const mainMargin = isRow
                ? resolveValue(cs.margin[0], mainAxisSize) +
                    resolveValue(cs.margin[2], mainAxisSize)
                : resolveValue(cs.margin[1], mainAxisSize) +
                    resolveValue(cs.margin[3], mainAxisSize);
            // Determine base size (flex-basis or explicit size)
            let baseSize = 0;
            if (cs.flexBasis.unit === C.UNIT_POINT) {
                baseSize = cs.flexBasis.value;
            }
            else if (cs.flexBasis.unit === C.UNIT_PERCENT) {
                baseSize = mainAxisSize * (cs.flexBasis.value / 100);
            }
            else {
                const sizeVal = isRow ? cs.width : cs.height;
                if (sizeVal.unit === C.UNIT_POINT) {
                    baseSize = sizeVal.value;
                }
                else if (sizeVal.unit === C.UNIT_PERCENT) {
                    baseSize = mainAxisSize * (sizeVal.value / 100);
                }
                else if (child.measureFunc !== null &&
                    child.children.length === 0) {
                    // For children with measure functions and no explicit size,
                    // call the measure function to get intrinsic size
                    const crossSize = isRow ? crossAxisSize : mainAxisSize;
                    const measured = child.measureFunc(mainAxisSize, C.MEASURE_MODE_AT_MOST, crossSize, C.MEASURE_MODE_UNDEFINED);
                    baseSize = isRow ? measured.width : measured.height;
                }
                else if (child.children.length > 0) {
                    // Container child with auto main-axis size - compute intrinsic size
                    baseSize = computeIntrinsicMainSize(child, isRow, mainAxisSize, crossAxisSize);
                }
            }
            // Min/max on main axis
            const minVal = isRow ? cs.minWidth : cs.minHeight;
            const maxVal = isRow ? cs.maxWidth : cs.maxHeight;
            const minMain = minVal.unit !== C.UNIT_UNDEFINED
                ? resolveValue(minVal, mainAxisSize)
                : 0;
            const maxMain = maxVal.unit !== C.UNIT_UNDEFINED
                ? resolveValue(maxVal, mainAxisSize)
                : Infinity;
            children.push({
                node: child,
                mainSize: baseSize,
                mainMargin,
                flexGrow: cs.flexGrow,
                flexShrink: cs.flexShrink,
                minMain,
                maxMain,
            });
            totalBaseMain += baseSize + mainMargin;
        }
        // Calculate gaps
        const totalGaps = relativeChildren.length > 1 ? mainGap * (relativeChildren.length - 1) : 0;
        const freeSpace = mainAxisSize - totalBaseMain - totalGaps;
        // Grow algorithm (based on flexbox.js SizeGrower)
        if (freeSpace > 0) {
            let totalGrow = children.reduce((sum, c) => (c.mainSize < c.maxMain ? sum + c.flexGrow : sum), 0);
            if (totalGrow > 0) {
                let remaining = freeSpace;
                while (remaining > EPSILON_FLOAT && totalGrow > 0) {
                    const amountPerGrow = remaining / totalGrow;
                    let distributed = 0;
                    for (const c of children) {
                        if (c.flexGrow > 0 && c.mainSize < c.maxMain) {
                            let grow = c.flexGrow * amountPerGrow;
                            // Cap at maxMain
                            if (c.mainSize + grow > c.maxMain) {
                                grow = c.maxMain - c.mainSize;
                                totalGrow -= c.flexGrow; // Remove from next iteration
                            }
                            c.mainSize += grow;
                            distributed += grow;
                        }
                    }
                    remaining -= distributed;
                    if (distributed < EPSILON_FLOAT)
                        break;
                }
            }
        }
        // Shrink algorithm (based on flexbox.js SizeShrinker)
        else if (freeSpace < 0) {
            let totalShrink = children.reduce((sum, c) => (c.mainSize > c.minMain ? sum + c.flexShrink : sum), 0);
            if (totalShrink > 0) {
                let remaining = -freeSpace;
                while (remaining > EPSILON_FLOAT && totalShrink > 0) {
                    const amountPerShrink = remaining / totalShrink;
                    let shrunk = 0;
                    for (const c of children) {
                        if (c.flexShrink > 0 && c.mainSize > c.minMain) {
                            let shrink = c.flexShrink * amountPerShrink;
                            // Cap at minMain
                            if (c.mainSize - shrink < c.minMain) {
                                shrink = c.mainSize - c.minMain;
                                totalShrink -= c.flexShrink; // Remove from next iteration
                            }
                            c.mainSize -= shrink;
                            shrunk += shrink;
                        }
                    }
                    remaining -= shrunk;
                    if (shrunk < EPSILON_FLOAT)
                        break;
                }
            }
        }
        // Apply min/max constraints to final sizes
        for (const c of children) {
            c.mainSize = Math.max(c.minMain, Math.min(c.maxMain, c.mainSize));
        }
        // Calculate final used space and justify-content
        const usedMain = children.reduce((sum, c) => sum + c.mainSize + c.mainMargin, 0) +
            totalGaps;
        const remainingSpace = Math.max(0, mainAxisSize - usedMain);
        // startOffset is used for flex-start/flex-end/center positioning
        let startOffset = 0;
        switch (style.justifyContent) {
            case C.JUSTIFY_FLEX_END:
                startOffset = remainingSpace;
                break;
            case C.JUSTIFY_CENTER:
                startOffset = remainingSpace / 2;
                break;
            // space-between/around/evenly calculate positions directly in the loop
        }
        // Handle reverse
        const ordered = isReverse ? [...children].reverse() : children;
        // Round main sizes to integers before positioning.
        //
        // Why: Terminal UIs render on a character grid, so fractional widths cause
        // visual artifacts. Without rounding, a 3-column layout in 80 chars might
        // produce widths like [26.67, 26.67, 26.66] which, when floored during
        // rendering, leaves a 1-char gap at the end. By rounding before positioning,
        // we get [27, 27, 26] with gaps that align to character boundaries.
        //
        // This happens AFTER flex distribution to preserve the flex algorithm's
        // proportional calculations, but BEFORE positioning so gaps are consistent.
        for (const c of children) {
            c.mainSize = Math.round(c.mainSize);
        }
        // Position and layout children
        // For space-between/around/evenly, we calculate positions directly to match
        // Yoga's integer rounding behavior (floor-based distribution)
        const numChildren = ordered.length;
        const isSpaceBetween = style.justifyContent === C.JUSTIFY_SPACE_BETWEEN;
        const isSpaceAround = style.justifyContent === C.JUSTIFY_SPACE_AROUND;
        const isSpaceEvenly = style.justifyContent === C.JUSTIFY_SPACE_EVENLY;
        // Pre-calculate cumulative sizes for direct position calculation
        const cumulativeSizes = [0];
        for (let i = 0; i < ordered.length; i++) {
            cumulativeSizes.push(cumulativeSizes[i] + ordered[i].mainSize + ordered[i].mainMargin);
        }
        for (let i = 0; i < ordered.length; i++) {
            const c = ordered[i];
            const child = c.node;
            const cs = child.style;
            // Calculate main position directly (not accumulated) to match Yoga's rounding
            let mainPos;
            if (isSpaceBetween && numChildren > 1) {
                // space-between: gaps distributed using floor((i * totalGap) / (n-1))
                const gapBefore = Math.floor((i * remainingSpace) / (numChildren - 1));
                mainPos = cumulativeSizes[i] + gapBefore;
            }
            else if (isSpaceAround && numChildren > 0) {
                // space-around: half gap at edges, full gaps between
                const unitGap = remainingSpace / numChildren;
                const gapBefore = Math.floor(unitGap / 2 + i * unitGap);
                mainPos = cumulativeSizes[i] + gapBefore;
            }
            else if (isSpaceEvenly && numChildren > 0) {
                // space-evenly: equal gaps everywhere including edges
                const unitGap = remainingSpace / (numChildren + 1);
                const gapBefore = Math.floor((i + 1) * unitGap);
                mainPos = cumulativeSizes[i] + gapBefore;
            }
            else {
                // flex-start, flex-end, center: use startOffset + accumulated size
                mainPos = startOffset + cumulativeSizes[i] + i * mainGap;
            }
            const childMarginLeft = resolveValue(cs.margin[0], contentWidth);
            const childMarginTop = resolveValue(cs.margin[1], contentHeight);
            const childMarginRight = resolveValue(cs.margin[2], contentWidth);
            const childMarginBottom = resolveValue(cs.margin[3], contentHeight);
            // Main axis size comes from flex algorithm (already rounded)
            const childMainSize = c.mainSize;
            // Cross axis: determine alignment mode
            let alignment = style.alignItems;
            if (cs.alignSelf !== C.ALIGN_AUTO) {
                alignment = cs.alignSelf;
            }
            // Cross axis size depends on alignment and child's explicit dimensions
            // IMPORTANT: Resolve percent against parent's cross axis, not child's available
            let childCrossSize;
            const crossDim = isRow ? cs.height : cs.width;
            const crossMargin = isRow
                ? childMarginTop + childMarginBottom
                : childMarginLeft + childMarginRight;
            if (crossDim.unit === C.UNIT_POINT) {
                // Explicit cross size
                childCrossSize = crossDim.value;
            }
            else if (crossDim.unit === C.UNIT_PERCENT) {
                // Percent of PARENT's cross axis (not available size)
                childCrossSize = crossAxisSize * (crossDim.value / 100);
            }
            else if (alignment === C.ALIGN_STRETCH) {
                // Stretch to fill (minus margins)
                childCrossSize = crossAxisSize - crossMargin;
            }
            else {
                // Auto size - let child determine via layoutNode
                childCrossSize = crossAxisSize - crossMargin;
            }
            // Handle measure function for intrinsic sizing
            // Measure functions provide intrinsic sizes for text/content nodes
            // Main axis size comes from flex algorithm (already considers grow/shrink)
            // Cross axis size may need to be measured
            //
            // IMPORTANT: When passing sizes to layoutNode, we pass the "available" space
            // which includes margin. The child's layoutNode will subtract its own margin
            // to determine its actual content size.
            //
            // - childMainSize is the CONTENT size from flex algorithm (doesn't include margin)
            // - childCrossSize is the NODE size (cross dimension, margin already subtracted)
            // - We need to add margin back so child can compute: nodeSize = available - margin
            const mainMargin = isRow
                ? childMarginLeft + childMarginRight
                : childMarginTop + childMarginBottom;
            let childWidth = isRow ? childMainSize + mainMargin : childCrossSize + crossMargin;
            let childHeight = isRow ? childCrossSize + crossMargin : childMainSize + mainMargin;
            if (child.measureFunc !== null && child.children.length === 0) {
                const widthAuto = cs.width.unit === C.UNIT_AUTO || cs.width.unit === C.UNIT_UNDEFINED;
                const heightAuto = cs.height.unit === C.UNIT_AUTO || cs.height.unit === C.UNIT_UNDEFINED;
                // Only measure cross-axis if it's auto-sized AND alignment is not stretch
                // Stretch already sets cross-axis size to fill parent
                const crossAxisAuto = isRow ? heightAuto : widthAuto;
                const needsCrossAxisMeasure = crossAxisAuto && alignment !== C.ALIGN_STRETCH;
                if (needsCrossAxisMeasure) {
                    // Call measure function to determine cross-axis size
                    const widthMode = widthAuto
                        ? C.MEASURE_MODE_AT_MOST
                        : C.MEASURE_MODE_EXACTLY;
                    const heightMode = heightAuto
                        ? C.MEASURE_MODE_UNDEFINED
                        : C.MEASURE_MODE_EXACTLY;
                    const availW = isRow ? childMainSize : crossAxisSize - crossMargin;
                    const availH = isRow ? crossAxisSize - crossMargin : childMainSize;
                    const measured = child.measureFunc(availW, widthMode, availH, heightMode);
                    // Use measured size only for cross-axis (main axis comes from flex algorithm)
                    if (isRow && heightAuto) {
                        childHeight = measured.height;
                    }
                    else if (!isRow && widthAuto) {
                        childWidth = measured.width;
                    }
                }
            }
            // Child position within content area (RELATIVE to parent's content area)
            const childX = isRow ? mainPos + childMarginLeft : childMarginLeft;
            const childY = isRow ? childMarginTop : mainPos + childMarginTop;
            // Relative position from parent (what we store in layout)
            const childRelLeft = Math.round(innerLeft + childX);
            const childRelTop = Math.round(innerTop + childY);
            // Absolute position (for passing to grandchildren's layout)
            const childAbsLeft = Math.round(offsetX + margin.left + childRelLeft);
            const childAbsTop = Math.round(offsetY + margin.top + childRelTop);
            // Recurse to layout any grandchildren (pass absolute offset)
            layoutNode(child, childWidth, childHeight, childAbsLeft, childAbsTop);
            // Set this child's layout - store RELATIVE position (like Yoga)
            // Use the NODE size (content), not the AVAILABLE size (content + margin)
            child.layout.width = Math.round(isRow ? childMainSize : childCrossSize);
            child.layout.height = Math.round(isRow ? childCrossSize : childMainSize);
            child.layout.left = childRelLeft;
            child.layout.top = childRelTop;
            // Apply cross-axis alignment offset
            const finalCrossSize = isRow ? child.layout.height : child.layout.width;
            let crossOffset = 0;
            switch (alignment) {
                case C.ALIGN_FLEX_END:
                    crossOffset = crossAxisSize - finalCrossSize - crossMargin;
                    break;
                case C.ALIGN_CENTER:
                    crossOffset = (crossAxisSize - finalCrossSize - crossMargin) / 2;
                    break;
            }
            if (crossOffset > 0) {
                if (isRow) {
                    child.layout.top += Math.round(crossOffset);
                }
                else {
                    child.layout.left += Math.round(crossOffset);
                }
            }
            // Note: mainPos is calculated directly per-item above, no accumulation needed
        }
    }
    // Set this node's layout
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    layout.left = Math.round(offsetX + margin.left);
    layout.top = Math.round(offsetY + margin.top);
    // Layout absolute children - margin is the offset from container
    for (const child of absoluteChildren) {
        const cs = child.style;
        const childMarginLeft = resolveValue(cs.margin[0], nodeWidth);
        const childMarginTop = resolveValue(cs.margin[1], nodeHeight);
        layoutNode(child, nodeWidth, nodeHeight, layout.left + childMarginLeft, layout.top + childMarginTop);
        // For absolute children, position is relative to container + margin
        child.layout.left = layout.left + childMarginLeft;
        child.layout.top = layout.top + childMarginTop;
    }
}
/**
 * Resolve a Value to a number given the available size.
 */
function resolveValue(value, availableSize) {
    switch (value.unit) {
        case C.UNIT_POINT:
            return value.value;
        case C.UNIT_PERCENT:
            return availableSize * (value.value / 100);
        default:
            return 0;
    }
}
/**
 * Resolve a 4-edge spacing array (margin, padding, or position) to pixel values.
 * Takes into account that horizontal edges resolve against width, vertical against height.
 */
function resolveSpacing(spacing, availableWidth, availableHeight) {
    return {
        left: resolveValue(spacing[0], availableWidth),
        top: resolveValue(spacing[1], availableHeight),
        right: resolveValue(spacing[2], availableWidth),
        bottom: resolveValue(spacing[3], availableHeight),
    };
}
/**
 * Apply min/max constraints to a size.
 */
function applyMinMax(size, min, max, available) {
    let result = size;
    if (min.unit !== C.UNIT_UNDEFINED) {
        const minValue = resolveValue(min, available);
        result = Math.max(result, minValue);
    }
    if (max.unit !== C.UNIT_UNDEFINED) {
        const maxValue = resolveValue(max, available);
        result = Math.min(result, maxValue);
    }
    return result;
}
//# sourceMappingURL=node.js.map