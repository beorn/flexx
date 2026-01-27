/**
 * Flexx Node
 *
 * Yoga-compatible Node class for flexbox layout.
 */
import createDebug from "debug";
import * as C from "./constants.js";
const debug = createDebug("flexx:layout");
import { createDefaultStyle, } from "./types.js";
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
    /**
     * Create a new layout node.
     *
     * @returns A new Node instance
     * @example
     * ```typescript
     * const root = Node.create();
     * root.setWidth(100);
     * root.setHeight(200);
     * ```
     */
    static create() {
        return new Node();
    }
    // ============================================================================
    // Tree Operations
    // ============================================================================
    /**
     * Get the number of child nodes.
     *
     * @returns The number of children
     */
    getChildCount() {
        return this._children.length;
    }
    /**
     * Get a child node by index.
     *
     * @param index - Zero-based child index
     * @returns The child node at the given index, or undefined if index is out of bounds
     */
    getChild(index) {
        return this._children[index];
    }
    /**
     * Get the parent node.
     *
     * @returns The parent node, or null if this is a root node
     */
    getParent() {
        return this._parent;
    }
    /**
     * Insert a child node at the specified index.
     * If the child already has a parent, it will be removed from that parent first.
     * Marks the node as dirty to trigger layout recalculation.
     *
     * @param child - The child node to insert
     * @param index - The index at which to insert the child
     * @example
     * ```typescript
     * const parent = Node.create();
     * const child1 = Node.create();
     * const child2 = Node.create();
     * parent.insertChild(child1, 0);
     * parent.insertChild(child2, 1);
     * ```
     */
    insertChild(child, index) {
        if (child._parent !== null) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        this._children.splice(index, 0, child);
        this.markDirty();
    }
    /**
     * Remove a child node from this node.
     * The child's parent reference will be cleared.
     * Marks the node as dirty to trigger layout recalculation.
     *
     * @param child - The child node to remove
     */
    removeChild(child) {
        const index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
            child._parent = null;
            this.markDirty();
        }
    }
    /**
     * Free this node and clean up all references.
     * Removes the node from its parent, clears all children, and removes the measure function.
     * This does not recursively free child nodes.
     */
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
    /**
     * Dispose the node (calls free)
     */
    [Symbol.dispose]() {
        this.free();
    }
    // ============================================================================
    // Measure Function
    // ============================================================================
    /**
     * Set a measure function for intrinsic sizing.
     * The measure function is called during layout to determine the node's natural size.
     * Typically used for text nodes or other content that has an intrinsic size.
     * Marks the node as dirty to trigger layout recalculation.
     *
     * @param measureFunc - Function that returns width and height given available space and constraints
     * @example
     * ```typescript
     * const textNode = Node.create();
     * textNode.setMeasureFunc((width, widthMode, height, heightMode) => {
     *   // Measure text and return dimensions
     *   return { width: 50, height: 20 };
     * });
     * ```
     */
    setMeasureFunc(measureFunc) {
        this._measureFunc = measureFunc;
        this.markDirty();
    }
    /**
     * Remove the measure function from this node.
     * Marks the node as dirty to trigger layout recalculation.
     */
    unsetMeasureFunc() {
        this._measureFunc = null;
        this.markDirty();
    }
    /**
     * Check if this node has a measure function.
     *
     * @returns True if a measure function is set
     */
    hasMeasureFunc() {
        return this._measureFunc !== null;
    }
    // ============================================================================
    // Dirty Tracking
    // ============================================================================
    /**
     * Check if this node needs layout recalculation.
     *
     * @returns True if the node is dirty and needs layout
     */
    isDirty() {
        return this._isDirty;
    }
    /**
     * Mark this node and all ancestors as dirty.
     * A dirty node needs layout recalculation.
     * This is automatically called by all style setters and tree operations.
     */
    markDirty() {
        this._isDirty = true;
        if (this._parent !== null) {
            this._parent.markDirty();
        }
    }
    /**
     * Check if this node has new layout results since the last check.
     *
     * @returns True if layout was recalculated since the last call to markLayoutSeen
     */
    hasNewLayout() {
        return this._hasNewLayout;
    }
    /**
     * Mark that the current layout has been seen/processed.
     * Clears the hasNewLayout flag.
     */
    markLayoutSeen() {
        this._hasNewLayout = false;
    }
    // ============================================================================
    // Layout Calculation
    // ============================================================================
    /**
     * Calculate layout for this node and all descendants.
     * This runs the flexbox layout algorithm to compute positions and sizes.
     * Only recalculates if the node is marked as dirty.
     *
     * @param width - Available width for layout
     * @param height - Available height for layout
     * @param _direction - Text direction (LTR or RTL), defaults to LTR
     * @example
     * ```typescript
     * const root = Node.create();
     * root.setFlexDirection(FLEX_DIRECTION_ROW);
     * root.setWidth(100);
     * root.setHeight(50);
     *
     * const child = Node.create();
     * child.setFlexGrow(1);
     * root.insertChild(child, 0);
     *
     * root.calculateLayout(100, 50, DIRECTION_LTR);
     *
     * // Now you can read computed layout
     * console.log(child.getComputedWidth());
     * ```
     */
    calculateLayout(width, height, _direction = C.DIRECTION_LTR) {
        if (!this._isDirty) {
            debug("layout skip (not dirty)");
            return;
        }
        const start = Date.now();
        const nodeCount = countNodes(this);
        // Run the layout algorithm
        computeLayout(this, width, height);
        // Mark layout computed
        this._isDirty = false;
        this._hasNewLayout = true;
        markSubtreeLayoutSeen(this);
        debug("layout: %dx%d, %d nodes in %dms", width, height, nodeCount, Date.now() - start);
    }
    // ============================================================================
    // Layout Results
    // ============================================================================
    /**
     * Get the computed left position after layout.
     *
     * @returns The left position in points
     */
    getComputedLeft() {
        return this._layout.left;
    }
    /**
     * Get the computed top position after layout.
     *
     * @returns The top position in points
     */
    getComputedTop() {
        return this._layout.top;
    }
    /**
     * Get the computed width after layout.
     *
     * @returns The width in points
     */
    getComputedWidth() {
        return this._layout.width;
    }
    /**
     * Get the computed height after layout.
     *
     * @returns The height in points
     */
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
    /**
     * Set the width to a fixed value in points.
     *
     * @param value - Width in points
     */
    setWidth(value) {
        this._style.width = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the width as a percentage of the parent's width.
     *
     * @param value - Width as a percentage (0-100)
     */
    setWidthPercent(value) {
        this._style.width = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the width to auto (determined by layout algorithm).
     */
    setWidthAuto() {
        this._style.width = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    // ============================================================================
    // Height Setters
    // ============================================================================
    /**
     * Set the height to a fixed value in points.
     *
     * @param value - Height in points
     */
    setHeight(value) {
        this._style.height = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the height as a percentage of the parent's height.
     *
     * @param value - Height as a percentage (0-100)
     */
    setHeightPercent(value) {
        this._style.height = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the height to auto (determined by layout algorithm).
     */
    setHeightAuto() {
        this._style.height = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    // ============================================================================
    // Min/Max Size Setters
    // ============================================================================
    /**
     * Set the minimum width in points.
     *
     * @param value - Minimum width in points
     */
    setMinWidth(value) {
        this._style.minWidth = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the minimum width as a percentage of the parent's width.
     *
     * @param value - Minimum width as a percentage (0-100)
     */
    setMinWidthPercent(value) {
        this._style.minWidth = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the minimum height in points.
     *
     * @param value - Minimum height in points
     */
    setMinHeight(value) {
        this._style.minHeight = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the minimum height as a percentage of the parent's height.
     *
     * @param value - Minimum height as a percentage (0-100)
     */
    setMinHeightPercent(value) {
        this._style.minHeight = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the maximum width in points.
     *
     * @param value - Maximum width in points
     */
    setMaxWidth(value) {
        this._style.maxWidth = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the maximum width as a percentage of the parent's width.
     *
     * @param value - Maximum width as a percentage (0-100)
     */
    setMaxWidthPercent(value) {
        this._style.maxWidth = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the maximum height in points.
     *
     * @param value - Maximum height in points
     */
    setMaxHeight(value) {
        this._style.maxHeight = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the maximum height as a percentage of the parent's height.
     *
     * @param value - Maximum height as a percentage (0-100)
     */
    setMaxHeightPercent(value) {
        this._style.maxHeight = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    // ============================================================================
    // Flex Setters
    // ============================================================================
    /**
     * Set the flex grow factor.
     * Determines how much the node will grow relative to siblings when there is extra space.
     *
     * @param value - Flex grow factor (typically 0 or 1+)
     * @example
     * ```typescript
     * const child = Node.create();
     * child.setFlexGrow(1); // Will grow to fill available space
     * ```
     */
    setFlexGrow(value) {
        this._style.flexGrow = value;
        this.markDirty();
    }
    /**
     * Set the flex shrink factor.
     * Determines how much the node will shrink relative to siblings when there is insufficient space.
     *
     * @param value - Flex shrink factor (default is 1)
     */
    setFlexShrink(value) {
        this._style.flexShrink = value;
        this.markDirty();
    }
    /**
     * Set the flex basis to a fixed value in points.
     * The initial size of the node before flex grow/shrink is applied.
     *
     * @param value - Flex basis in points
     */
    setFlexBasis(value) {
        this._style.flexBasis = { value, unit: C.UNIT_POINT };
        this.markDirty();
    }
    /**
     * Set the flex basis as a percentage of the parent's size.
     *
     * @param value - Flex basis as a percentage (0-100)
     */
    setFlexBasisPercent(value) {
        this._style.flexBasis = { value, unit: C.UNIT_PERCENT };
        this.markDirty();
    }
    /**
     * Set the flex basis to auto (based on the node's width/height).
     */
    setFlexBasisAuto() {
        this._style.flexBasis = { value: 0, unit: C.UNIT_AUTO };
        this.markDirty();
    }
    /**
     * Set the flex direction (main axis direction).
     *
     * @param direction - FLEX_DIRECTION_ROW, FLEX_DIRECTION_COLUMN, FLEX_DIRECTION_ROW_REVERSE, or FLEX_DIRECTION_COLUMN_REVERSE
     * @example
     * ```typescript
     * const container = Node.create();
     * container.setFlexDirection(FLEX_DIRECTION_ROW); // Lay out children horizontally
     * ```
     */
    setFlexDirection(direction) {
        this._style.flexDirection = direction;
        this.markDirty();
    }
    /**
     * Set the flex wrap behavior.
     *
     * @param wrap - WRAP_NO_WRAP, WRAP_WRAP, or WRAP_WRAP_REVERSE
     */
    setFlexWrap(wrap) {
        this._style.flexWrap = wrap;
        this.markDirty();
    }
    // ============================================================================
    // Alignment Setters
    // ============================================================================
    /**
     * Set how children are aligned along the cross axis.
     *
     * @param align - ALIGN_FLEX_START, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_STRETCH, or ALIGN_BASELINE
     * @example
     * ```typescript
     * const container = Node.create();
     * container.setFlexDirection(FLEX_DIRECTION_ROW);
     * container.setAlignItems(ALIGN_CENTER); // Center children vertically
     * ```
     */
    setAlignItems(align) {
        this._style.alignItems = align;
        this.markDirty();
    }
    /**
     * Set how this node is aligned along the parent's cross axis.
     * Overrides the parent's alignItems for this specific child.
     *
     * @param align - ALIGN_AUTO, ALIGN_FLEX_START, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_STRETCH, or ALIGN_BASELINE
     */
    setAlignSelf(align) {
        this._style.alignSelf = align;
        this.markDirty();
    }
    /**
     * Set how lines are aligned in a multi-line flex container.
     * Only affects containers with wrap enabled and multiple lines.
     *
     * @param align - ALIGN_FLEX_START, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_STRETCH, ALIGN_SPACE_BETWEEN, or ALIGN_SPACE_AROUND
     */
    setAlignContent(align) {
        this._style.alignContent = align;
        this.markDirty();
    }
    /**
     * Set how children are distributed along the main axis.
     *
     * @param justify - JUSTIFY_FLEX_START, JUSTIFY_CENTER, JUSTIFY_FLEX_END, JUSTIFY_SPACE_BETWEEN, JUSTIFY_SPACE_AROUND, or JUSTIFY_SPACE_EVENLY
     * @example
     * ```typescript
     * const container = Node.create();
     * container.setJustifyContent(JUSTIFY_SPACE_BETWEEN); // Space children evenly with edges at start/end
     * ```
     */
    setJustifyContent(justify) {
        this._style.justifyContent = justify;
        this.markDirty();
    }
    // ============================================================================
    // Spacing Setters
    // ============================================================================
    /**
     * Set padding for one or more edges.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Padding in points
     * @example
     * ```typescript
     * node.setPadding(EDGE_ALL, 10); // Set 10pt padding on all edges
     * node.setPadding(EDGE_HORIZONTAL, 5); // Set 5pt padding on left and right
     * ```
     */
    setPadding(edge, value) {
        setEdgeValue(this._style.padding, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    /**
     * Set margin for one or more edges.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Margin in points
     * @example
     * ```typescript
     * node.setMargin(EDGE_ALL, 5); // Set 5pt margin on all edges
     * node.setMargin(EDGE_TOP, 10); // Set 10pt margin on top only
     * ```
     */
    setMargin(edge, value) {
        setEdgeValue(this._style.margin, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    /**
     * Set border width for one or more edges.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Border width in points
     */
    setBorder(edge, value) {
        setEdgeBorder(this._style.border, edge, value);
        this.markDirty();
    }
    /**
     * Set gap between flex items.
     *
     * @param gutter - GUTTER_COLUMN (horizontal gap), GUTTER_ROW (vertical gap), or GUTTER_ALL (both)
     * @param value - Gap size in points
     * @example
     * ```typescript
     * container.setGap(GUTTER_ALL, 8); // Set 8pt gap between all items
     * container.setGap(GUTTER_COLUMN, 10); // Set 10pt horizontal gap only
     * ```
     */
    setGap(gutter, value) {
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
    /**
     * Set the position type.
     *
     * @param positionType - POSITION_TYPE_STATIC, POSITION_TYPE_RELATIVE, or POSITION_TYPE_ABSOLUTE
     * @example
     * ```typescript
     * node.setPositionType(POSITION_TYPE_ABSOLUTE);
     * node.setPosition(EDGE_LEFT, 10);
     * node.setPosition(EDGE_TOP, 20);
     * ```
     */
    setPositionType(positionType) {
        this._style.positionType = positionType;
        this.markDirty();
    }
    /**
     * Set position offset for one or more edges.
     * Only applies when position type is ABSOLUTE or RELATIVE.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Position offset in points
     */
    setPosition(edge, value) {
        setEdgeValue(this._style.position, edge, value, C.UNIT_POINT);
        this.markDirty();
    }
    // ============================================================================
    // Other Setters
    // ============================================================================
    /**
     * Set the display type.
     *
     * @param display - DISPLAY_FLEX or DISPLAY_NONE
     */
    setDisplay(display) {
        this._style.display = display;
        this.markDirty();
    }
    /**
     * Set the overflow behavior.
     *
     * @param overflow - OVERFLOW_VISIBLE, OVERFLOW_HIDDEN, or OVERFLOW_SCROLL
     */
    setOverflow(overflow) {
        this._style.overflow = overflow;
        this.markDirty();
    }
    // ============================================================================
    // Style Getters
    // ============================================================================
    /**
     * Get the width style value.
     *
     * @returns Width value with unit (points, percent, or auto)
     */
    getWidth() {
        return this._style.width;
    }
    /**
     * Get the height style value.
     *
     * @returns Height value with unit (points, percent, or auto)
     */
    getHeight() {
        return this._style.height;
    }
    /**
     * Get the minimum width style value.
     *
     * @returns Minimum width value with unit
     */
    getMinWidth() {
        return this._style.minWidth;
    }
    /**
     * Get the minimum height style value.
     *
     * @returns Minimum height value with unit
     */
    getMinHeight() {
        return this._style.minHeight;
    }
    /**
     * Get the maximum width style value.
     *
     * @returns Maximum width value with unit
     */
    getMaxWidth() {
        return this._style.maxWidth;
    }
    /**
     * Get the maximum height style value.
     *
     * @returns Maximum height value with unit
     */
    getMaxHeight() {
        return this._style.maxHeight;
    }
    /**
     * Get the flex grow factor.
     *
     * @returns Flex grow value
     */
    getFlexGrow() {
        return this._style.flexGrow;
    }
    /**
     * Get the flex shrink factor.
     *
     * @returns Flex shrink value
     */
    getFlexShrink() {
        return this._style.flexShrink;
    }
    /**
     * Get the flex basis style value.
     *
     * @returns Flex basis value with unit
     */
    getFlexBasis() {
        return this._style.flexBasis;
    }
    /**
     * Get the flex direction.
     *
     * @returns Flex direction constant
     */
    getFlexDirection() {
        return this._style.flexDirection;
    }
    /**
     * Get the flex wrap setting.
     *
     * @returns Flex wrap constant
     */
    getFlexWrap() {
        return this._style.flexWrap;
    }
    /**
     * Get the align items setting.
     *
     * @returns Align items constant
     */
    getAlignItems() {
        return this._style.alignItems;
    }
    /**
     * Get the align self setting.
     *
     * @returns Align self constant
     */
    getAlignSelf() {
        return this._style.alignSelf;
    }
    /**
     * Get the align content setting.
     *
     * @returns Align content constant
     */
    getAlignContent() {
        return this._style.alignContent;
    }
    /**
     * Get the justify content setting.
     *
     * @returns Justify content constant
     */
    getJustifyContent() {
        return this._style.justifyContent;
    }
    /**
     * Get the padding for a specific edge.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
     * @returns Padding value with unit
     */
    getPadding(edge) {
        return getEdgeValue(this._style.padding, edge);
    }
    /**
     * Get the margin for a specific edge.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
     * @returns Margin value with unit
     */
    getMargin(edge) {
        return getEdgeValue(this._style.margin, edge);
    }
    /**
     * Get the border width for a specific edge.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
     * @returns Border width in points
     */
    getBorder(edge) {
        return getEdgeBorderValue(this._style.border, edge);
    }
    /**
     * Get the position offset for a specific edge.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
     * @returns Position value with unit
     */
    getPosition(edge) {
        return getEdgeValue(this._style.position, edge);
    }
    /**
     * Get the position type.
     *
     * @returns Position type constant
     */
    getPositionType() {
        return this._style.positionType;
    }
    /**
     * Get the display type.
     *
     * @returns Display constant
     */
    getDisplay() {
        return this._style.display;
    }
    /**
     * Get the overflow setting.
     *
     * @returns Overflow constant
     */
    getOverflow() {
        return this._style.overflow;
    }
    /**
     * Get the gap for column or row.
     *
     * @param gutter - GUTTER_COLUMN or GUTTER_ROW
     * @returns Gap size in points
     */
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
function countNodes(node) {
    let count = 1;
    for (const child of node.children) {
        count += countNodes(child);
    }
    return count;
}
// ============================================================================
// Layout Algorithm
// Based on Planning-nl/flexbox.js reference implementation
// ============================================================================
/**
 * Epsilon value for floating point comparisons in flex distribution.
 * Used to determine when remaining space is negligible and iteration should stop.
 */
const EPSILON_FLOAT = 0.001;
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
    const marginLeft = resolveValue(style.margin[0], availableWidth);
    const marginTop = resolveValue(style.margin[1], availableHeight);
    const marginRight = resolveValue(style.margin[2], availableWidth);
    const marginBottom = resolveValue(style.margin[3], availableHeight);
    const paddingLeft = resolveValue(style.padding[0], availableWidth);
    const paddingTop = resolveValue(style.padding[1], availableHeight);
    const paddingRight = resolveValue(style.padding[2], availableWidth);
    const paddingBottom = resolveValue(style.padding[3], availableHeight);
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
        nodeWidth = availableWidth - marginLeft - marginRight;
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
        nodeHeight = availableHeight - marginTop - marginBottom;
    }
    nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
    // Content area (inside border and padding)
    const innerLeft = borderLeft + paddingLeft;
    const innerTop = borderTop + paddingTop;
    const innerRight = borderRight + paddingRight;
    const innerBottom = borderBottom + paddingBottom;
    const contentWidth = Math.max(0, nodeWidth - innerLeft - innerRight);
    const contentHeight = Math.max(0, nodeHeight - innerTop - innerBottom);
    // Handle measure function (text nodes)
    if (node.hasMeasureFunc() && node.children.length === 0) {
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
        layout.left = Math.round(offsetX + marginLeft);
        layout.top = Math.round(offsetY + marginTop);
        return;
    }
    // Separate relative and absolute children
    const relativeChildren = node.children.filter((c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE);
    const absoluteChildren = node.children.filter((c) => c.style.positionType === C.POSITION_TYPE_ABSOLUTE);
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
                while (remaining > 0.001 && totalGrow > 0) {
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
                    if (distributed < 0.001)
                        break;
                }
            }
        }
        // Shrink algorithm (based on flexbox.js SizeShrinker)
        else if (freeSpace < 0) {
            let totalShrink = children.reduce((sum, c) => (c.mainSize > c.minMain ? sum + c.flexShrink : sum), 0);
            if (totalShrink > 0) {
                let remaining = -freeSpace;
                while (remaining > 0.001 && totalShrink > 0) {
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
                    if (shrunk < 0.001)
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
        let startOffset = 0;
        let itemSpacing = mainGap;
        switch (style.justifyContent) {
            case C.JUSTIFY_FLEX_END:
                startOffset = remainingSpace;
                break;
            case C.JUSTIFY_CENTER:
                startOffset = remainingSpace / 2;
                break;
            case C.JUSTIFY_SPACE_BETWEEN:
                if (children.length > 1) {
                    itemSpacing = mainGap + remainingSpace / (children.length - 1);
                }
                break;
            case C.JUSTIFY_SPACE_AROUND:
                if (children.length > 0) {
                    const extraSpace = remainingSpace / children.length;
                    startOffset = extraSpace / 2;
                    itemSpacing = mainGap + extraSpace;
                }
                break;
            case C.JUSTIFY_SPACE_EVENLY:
                if (children.length > 0) {
                    const extraSpace = remainingSpace / (children.length + 1);
                    startOffset = extraSpace;
                    itemSpacing = mainGap + extraSpace;
                }
                break;
        }
        // Handle reverse
        const ordered = isReverse ? [...children].reverse() : children;
        // Round main sizes to get integer widths for gap calculation
        // This ensures consistent gaps by rounding sizes before positioning
        for (const c of children) {
            c.mainSize = Math.round(c.mainSize);
        }
        // Position and layout children
        let mainPos = startOffset;
        for (let i = 0; i < ordered.length; i++) {
            const c = ordered[i];
            const child = c.node;
            const cs = child.style;
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
            let childWidth = isRow ? childMainSize : childCrossSize;
            let childHeight = isRow ? childCrossSize : childMainSize;
            if (child.hasMeasureFunc() && child.children.length === 0) {
                const widthAuto = cs.width.unit === C.UNIT_AUTO || cs.width.unit === C.UNIT_UNDEFINED;
                const heightAuto = cs.height.unit === C.UNIT_AUTO || cs.height.unit === C.UNIT_UNDEFINED;
                if (widthAuto || heightAuto) {
                    // Call measure function with available space
                    const widthMode = widthAuto
                        ? C.MEASURE_MODE_AT_MOST
                        : C.MEASURE_MODE_EXACTLY;
                    const heightMode = heightAuto
                        ? C.MEASURE_MODE_UNDEFINED
                        : C.MEASURE_MODE_EXACTLY;
                    const availW = widthAuto
                        ? isRow
                            ? childMainSize
                            : crossAxisSize - crossMargin
                        : cs.width.value;
                    const availH = heightAuto
                        ? isRow
                            ? crossAxisSize - crossMargin
                            : childMainSize
                        : cs.height.value;
                    const measured = child.measureFunc(availW, widthMode, availH, heightMode);
                    // For measure function nodes, intrinsic size takes precedence
                    if (widthAuto) {
                        childWidth = measured.width;
                    }
                    if (heightAuto) {
                        childHeight = measured.height;
                    }
                }
            }
            // Child position within content area
            const childX = isRow ? mainPos + childMarginLeft : childMarginLeft;
            const childY = isRow ? childMarginTop : mainPos + childMarginTop;
            // Calculate child's actual position
            const childLeft = Math.round(offsetX + marginLeft + innerLeft + childX);
            const childTop = Math.round(offsetY + marginTop + innerTop + childY);
            // Recurse to layout any grandchildren
            layoutNode(child, childWidth, childHeight, childLeft, childTop);
            // Set this child's layout - override what layoutNode computed
            // because flex algorithm determines sizes, not the child's style
            child.layout.width = Math.round(childWidth);
            child.layout.height = Math.round(childHeight);
            child.layout.left = childLeft;
            child.layout.top = childTop;
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
            // Advance main position - add gap only between items, not after the last one
            mainPos += childMainSize + c.mainMargin;
            if (i < ordered.length - 1) {
                mainPos += itemSpacing;
            }
        }
    }
    // Set this node's layout
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    layout.left = Math.round(offsetX + marginLeft);
    layout.top = Math.round(offsetY + marginTop);
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