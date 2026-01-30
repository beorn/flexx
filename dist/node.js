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
        // Treat undefined as unconstrained (NaN signals content-based sizing)
        const availableWidth = width ?? NaN;
        const availableHeight = height ?? NaN;
        // Run the layout algorithm
        computeLayout(this, availableWidth, availableHeight);
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
        // NaN means "auto" in Yoga API
        if (Number.isNaN(value)) {
            this._style.width = { value: 0, unit: C.UNIT_AUTO };
        }
        else {
            this._style.width = { value, unit: C.UNIT_POINT };
        }
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
        // NaN means "auto" in Yoga API
        if (Number.isNaN(value)) {
            this._style.height = { value: 0, unit: C.UNIT_AUTO };
        }
        else {
            this._style.height = { value, unit: C.UNIT_POINT };
        }
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
     * Set padding as a percentage of the parent's width.
     * Per CSS spec, percentage padding always resolves against the containing block's width.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Padding as a percentage (0-100)
     */
    setPaddingPercent(edge, value) {
        setEdgeValue(this._style.padding, edge, value, C.UNIT_PERCENT);
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
     * Set margin as a percentage of the parent's size.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Margin as a percentage (0-100)
     */
    setMarginPercent(edge, value) {
        setEdgeValue(this._style.margin, edge, value, C.UNIT_PERCENT);
        this.markDirty();
    }
    /**
     * Set margin to auto (for centering items with margin: auto).
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     */
    setMarginAuto(edge) {
        setEdgeValue(this._style.margin, edge, 0, C.UNIT_AUTO);
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
        // NaN means "auto" (unset) in Yoga API
        if (Number.isNaN(value)) {
            setEdgeValue(this._style.position, edge, 0, C.UNIT_UNDEFINED);
        }
        else {
            setEdgeValue(this._style.position, edge, value, C.UNIT_POINT);
        }
        this.markDirty();
    }
    /**
     * Set position offset as a percentage.
     *
     * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
     * @param value - Position offset as a percentage of parent's corresponding dimension
     */
    setPositionPercent(edge, value) {
        setEdgeValue(this._style.position, edge, value, C.UNIT_PERCENT);
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
        case C.EDGE_START:
            // Store in logical START slot (resolved to physical at layout time)
            arr[4] = v;
            break;
        case C.EDGE_END:
            // Store in logical END slot (resolved to physical at layout time)
            arr[5] = v;
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
        case C.EDGE_START:
            // In LTR mode, START = LEFT
            arr[0] = value;
            break;
        case C.EDGE_END:
            // In LTR mode, END = RIGHT
            arr[2] = value;
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
        case C.EDGE_START:
            return arr[4];
        case C.EDGE_END:
            return arr[5];
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
function resolveEdgeValue(arr, physicalIndex, // 0=left, 1=top, 2=right, 3=bottom
flexDirection, availableSize) {
    // Check if logical START/END should override physical
    const isRow = flexDirection === C.FLEX_DIRECTION_ROW || flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
    const isReverse = flexDirection === C.FLEX_DIRECTION_ROW_REVERSE || flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;
    let logicalValue;
    if (isRow) {
        // Horizontal main axis
        if (physicalIndex === 0) {
            // Left: use START in normal, END in reverse
            logicalValue = isReverse ? arr[5] : arr[4];
        }
        else if (physicalIndex === 2) {
            // Right: use END in normal, START in reverse
            logicalValue = isReverse ? arr[4] : arr[5];
        }
    }
    else {
        // Vertical main axis
        if (physicalIndex === 1) {
            // Top: use START in normal, END in reverse
            logicalValue = isReverse ? arr[5] : arr[4];
        }
        else if (physicalIndex === 3) {
            // Bottom: use END in normal, START in reverse
            logicalValue = isReverse ? arr[4] : arr[5];
        }
    }
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
function isEdgeAuto(arr, physicalIndex, flexDirection) {
    const isRow = flexDirection === C.FLEX_DIRECTION_ROW || flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
    const isReverse = flexDirection === C.FLEX_DIRECTION_ROW_REVERSE || flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;
    let logicalValue;
    if (isRow) {
        if (physicalIndex === 0) {
            logicalValue = isReverse ? arr[5] : arr[4];
        }
        else if (physicalIndex === 2) {
            logicalValue = isReverse ? arr[4] : arr[5];
        }
    }
    else {
        if (physicalIndex === 1) {
            logicalValue = isReverse ? arr[5] : arr[4];
        }
        else if (physicalIndex === 3) {
            logicalValue = isReverse ? arr[4] : arr[5];
        }
    }
    // Check logical first
    if (logicalValue && logicalValue.unit !== C.UNIT_UNDEFINED) {
        return logicalValue.unit === C.UNIT_AUTO;
    }
    // Fall back to physical
    return arr[physicalIndex].unit === C.UNIT_AUTO;
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
 * Distribute free space among flex children using grow or shrink factors.
 * Handles both positive (grow) and negative (shrink) free space.
 *
 * For shrinking, per CSS Flexbox spec, the shrink factor is weighted by the item's
 * base size: scaledShrinkFactor = flexShrink * baseSize
 *
 * @param children - Array of child layout info to distribute space among
 * @param freeSpace - Amount of space to distribute (positive for grow, negative for shrink)
 */
function distributeFlexSpace(children, initialFreeSpace) {
    // CSS Flexbox spec section 9.7: Resolving Flexible Lengths
    // This implements the iterative algorithm where items are frozen when they hit constraints.
    //
    // Key insight: Items start at BASE size, not hypothetical. Free space was calculated from
    // hypothetical sizes. When distributing, items that hit min/max are frozen and we redistribute.
    const isGrowing = initialFreeSpace > 0;
    if (initialFreeSpace === 0)
        return;
    // Calculate container inner size from initial state (before any mutations)
    // freeSpace was computed from BASE sizes, so: container = freeSpace + sum(base)
    let totalBase = 0;
    for (const c of children) {
        totalBase += c.baseSize;
    }
    const containerInner = initialFreeSpace + totalBase;
    // Initialize: all items start unfrozen
    for (const c of children) {
        c.frozen = false;
    }
    // Track current free space (will be recalculated each iteration)
    let freeSpace = initialFreeSpace;
    // Iterate until all items are frozen or free space is negligible
    let iterations = 0;
    const maxIterations = children.length + 1; // Prevent infinite loops
    while (iterations++ < maxIterations) {
        // Calculate total flex factor for unfrozen items
        let totalFlex = 0;
        for (const c of children) {
            if (c.frozen)
                continue;
            if (isGrowing) {
                totalFlex += c.flexGrow;
            }
            else {
                // Shrink weighted by base size per CSS spec
                totalFlex += c.flexShrink * c.baseSize;
            }
        }
        if (totalFlex === 0)
            break;
        // CSS Flexbox spec: when total flex-grow is less than 1, only distribute that fraction
        let effectiveFreeSpace = freeSpace;
        if (isGrowing && totalFlex < 1) {
            effectiveFreeSpace = freeSpace * totalFlex;
        }
        // Calculate target sizes for unfrozen items
        let totalViolation = 0;
        for (const c of children) {
            if (c.frozen)
                continue;
            // Calculate target from base size + proportional free space
            const flexFactor = isGrowing ? c.flexGrow : c.flexShrink * c.baseSize;
            const ratio = totalFlex > 0 ? flexFactor / totalFlex : 0;
            const target = c.baseSize + effectiveFreeSpace * ratio;
            // Clamp by min/max
            const clamped = Math.max(c.minMain, Math.min(c.maxMain, target));
            const violation = clamped - target;
            totalViolation += violation;
            // Store clamped target
            c.mainSize = clamped;
        }
        // Freeze items based on violations (CSS spec 9.7 step 9)
        let anyFrozen = false;
        if (Math.abs(totalViolation) < EPSILON_FLOAT) {
            // No violations - freeze all remaining items and we're done
            for (const c of children) {
                c.frozen = true;
            }
            break;
        }
        else if (totalViolation > 0) {
            // Positive total violation: freeze items with positive violations (clamped UP to min)
            for (const c of children) {
                if (c.frozen)
                    continue;
                const target = c.baseSize + (isGrowing ? c.flexGrow : c.flexShrink * c.baseSize) / totalFlex * effectiveFreeSpace;
                if (c.mainSize > target + EPSILON_FLOAT) {
                    c.frozen = true;
                    anyFrozen = true;
                }
            }
        }
        else {
            // Negative total violation: freeze items with negative violations (clamped DOWN to max)
            for (const c of children) {
                if (c.frozen)
                    continue;
                const flexFactor = isGrowing ? c.flexGrow : c.flexShrink * c.baseSize;
                const target = c.baseSize + flexFactor / totalFlex * effectiveFreeSpace;
                if (c.mainSize < target - EPSILON_FLOAT) {
                    c.frozen = true;
                    anyFrozen = true;
                }
            }
        }
        if (!anyFrozen)
            break;
        // Recalculate free space for next iteration
        // After freezing, available = container - frozen sizes
        // Free space = available - sum of unfrozen BASE sizes
        let frozenSpace = 0;
        let unfrozenBase = 0;
        for (const c of children) {
            if (c.frozen) {
                frozenSpace += c.mainSize;
            }
            else {
                unfrozenBase += c.baseSize;
            }
        }
        // New free space = container - frozen - unfrozen base sizes
        freeSpace = containerInner - frozenSpace - unfrozenBase;
    }
}
/**
 * Compute layout for a node tree.
 */
function computeLayout(root, availableWidth, availableHeight) {
    // Pass absolute position (0,0) for root node - used for Yoga-compatible edge rounding
    layoutNode(root, availableWidth, availableHeight, 0, 0, 0, 0);
}
/**
 * Layout a node and its children.
 *
 * @param absX - Absolute X position from document root (for Yoga-compatible edge rounding)
 * @param absY - Absolute Y position from document root (for Yoga-compatible edge rounding)
 */
function layoutNode(node, availableWidth, availableHeight, offsetX, offsetY, absX, absY) {
    debug('layoutNode called: availW=%d, availH=%d, offsetX=%d, offsetY=%d, absX=%d, absY=%d, children=%d', availableWidth, availableHeight, offsetX, offsetY, absX, absY, node.children.length);
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
    // CSS spec: percentage margins AND padding resolve against containing block's WIDTH only
    // Use resolveEdgeValue to respect logical EDGE_START/END
    const marginLeft = resolveEdgeValue(style.margin, 0, style.flexDirection, availableWidth);
    const marginTop = resolveEdgeValue(style.margin, 1, style.flexDirection, availableWidth);
    const marginRight = resolveEdgeValue(style.margin, 2, style.flexDirection, availableWidth);
    const marginBottom = resolveEdgeValue(style.margin, 3, style.flexDirection, availableWidth);
    const paddingLeft = resolveEdgeValue(style.padding, 0, style.flexDirection, availableWidth);
    const paddingTop = resolveEdgeValue(style.padding, 1, style.flexDirection, availableWidth);
    const paddingRight = resolveEdgeValue(style.padding, 2, style.flexDirection, availableWidth);
    const paddingBottom = resolveEdgeValue(style.padding, 3, style.flexDirection, availableWidth);
    const borderLeft = style.border[0];
    const borderTop = style.border[1];
    const borderRight = style.border[2];
    const borderBottom = style.border[3];
    // Calculate node dimensions
    // When available dimension is NaN (unconstrained), auto-sized nodes use NaN
    // and will be sized by shrink-wrap logic based on children
    let nodeWidth;
    if (style.width.unit === C.UNIT_POINT) {
        nodeWidth = style.width.value;
    }
    else if (style.width.unit === C.UNIT_PERCENT) {
        // Percentage against NaN (auto-sized parent) resolves to 0 via resolveValue
        nodeWidth = resolveValue(style.width, availableWidth);
    }
    else if (Number.isNaN(availableWidth)) {
        // Unconstrained: use NaN to signal shrink-wrap (will be computed from children)
        nodeWidth = NaN;
    }
    else {
        nodeWidth = availableWidth - marginLeft - marginRight;
    }
    // Apply min/max constraints (works even with NaN available for point-based constraints)
    nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
    let nodeHeight;
    if (style.height.unit === C.UNIT_POINT) {
        nodeHeight = style.height.value;
    }
    else if (style.height.unit === C.UNIT_PERCENT) {
        // Percentage against NaN (auto-sized parent) resolves to 0 via resolveValue
        nodeHeight = resolveValue(style.height, availableHeight);
    }
    else if (Number.isNaN(availableHeight)) {
        // Unconstrained: use NaN to signal shrink-wrap (will be computed from children)
        nodeHeight = NaN;
    }
    else {
        nodeHeight = availableHeight - marginTop - marginBottom;
    }
    // Apply min/max constraints (works even with NaN available for point-based constraints)
    nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
    // Content area (inside border and padding)
    // When node dimensions are NaN (unconstrained), content dimensions are also NaN
    const innerLeft = borderLeft + paddingLeft;
    const innerTop = borderTop + paddingTop;
    const innerRight = borderRight + paddingRight;
    const innerBottom = borderBottom + paddingBottom;
    // Enforce box model constraint: minimum size = padding + border
    const minInnerWidth = innerLeft + innerRight;
    const minInnerHeight = innerTop + innerBottom;
    if (!Number.isNaN(nodeWidth) && nodeWidth < minInnerWidth) {
        nodeWidth = minInnerWidth;
    }
    if (!Number.isNaN(nodeHeight) && nodeHeight < minInnerHeight) {
        nodeHeight = minInnerHeight;
    }
    const contentWidth = Number.isNaN(nodeWidth) ? NaN : Math.max(0, nodeWidth - innerLeft - innerRight);
    const contentHeight = Number.isNaN(nodeHeight) ? NaN : Math.max(0, nodeHeight - innerTop - innerBottom);
    // Compute position offsets early (needed for children's absolute position calculation)
    // This ensures children's absolute positions include parent's position offset
    let parentPosOffsetX = 0;
    let parentPosOffsetY = 0;
    if (style.positionType === C.POSITION_TYPE_STATIC || style.positionType === C.POSITION_TYPE_RELATIVE) {
        const leftPos = style.position[0];
        const topPos = style.position[1];
        const rightPos = style.position[2];
        const bottomPos = style.position[3];
        if (leftPos.unit !== C.UNIT_UNDEFINED) {
            parentPosOffsetX = resolveValue(leftPos, availableWidth);
        }
        else if (rightPos.unit !== C.UNIT_UNDEFINED) {
            parentPosOffsetX = -resolveValue(rightPos, availableWidth);
        }
        if (topPos.unit !== C.UNIT_UNDEFINED) {
            parentPosOffsetY = resolveValue(topPos, availableHeight);
        }
        else if (bottomPos.unit !== C.UNIT_UNDEFINED) {
            parentPosOffsetY = -resolveValue(bottomPos, availableHeight);
        }
    }
    // Handle measure function (text nodes)
    if (node.hasMeasureFunc() && node.children.length === 0) {
        const measureFunc = node.measureFunc;
        // For unconstrained dimensions (NaN), treat as auto-sizing
        const widthIsAuto = style.width.unit === C.UNIT_AUTO || style.width.unit === C.UNIT_UNDEFINED || Number.isNaN(nodeWidth);
        const heightIsAuto = style.height.unit === C.UNIT_AUTO || style.height.unit === C.UNIT_UNDEFINED || Number.isNaN(nodeHeight);
        const widthMode = widthIsAuto ? C.MEASURE_MODE_AT_MOST : C.MEASURE_MODE_EXACTLY;
        const heightMode = heightIsAuto ? C.MEASURE_MODE_UNDEFINED : C.MEASURE_MODE_EXACTLY;
        // For unconstrained width, use a large value; measureFunc should return intrinsic size
        const measureWidth = Number.isNaN(contentWidth) ? Infinity : contentWidth;
        const measureHeight = Number.isNaN(contentHeight) ? Infinity : contentHeight;
        const measured = measureFunc(measureWidth, widthMode, measureHeight, heightMode);
        if (widthIsAuto) {
            nodeWidth = measured.width + innerLeft + innerRight;
        }
        if (heightIsAuto) {
            nodeHeight = measured.height + innerTop + innerBottom;
        }
        layout.width = Math.round(nodeWidth);
        layout.height = Math.round(nodeHeight);
        layout.left = Math.round(offsetX + marginLeft);
        layout.top = Math.round(offsetY + marginTop);
        return;
    }
    // Handle leaf nodes without measureFunc - when unconstrained, use padding+border as intrinsic size
    if (node.children.length === 0) {
        // For leaf nodes without measureFunc, intrinsic size is just padding+border
        if (Number.isNaN(nodeWidth)) {
            nodeWidth = innerLeft + innerRight;
        }
        if (Number.isNaN(nodeHeight)) {
            nodeHeight = innerTop + innerBottom;
        }
        layout.width = Math.round(nodeWidth);
        layout.height = Math.round(nodeHeight);
        layout.left = Math.round(offsetX + marginLeft);
        layout.top = Math.round(offsetY + marginTop);
        return;
    }
    // Separate relative and absolute children
    // Filter out display:none children - they don't participate in layout at all
    const relativeChildren = node.children.filter((c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE && c.style.display !== C.DISPLAY_NONE);
    const absoluteChildren = node.children.filter((c) => c.style.positionType === C.POSITION_TYPE_ABSOLUTE && c.style.display !== C.DISPLAY_NONE);
    // Flex layout for relative children
    debug('layoutNode: node.children=%d, relativeChildren=%d, absolute=%d', node.children.length, relativeChildren.length, absoluteChildren.length);
    if (relativeChildren.length > 0) {
        const isRow = style.flexDirection === C.FLEX_DIRECTION_ROW ||
            style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
        const isReverse = style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE ||
            style.flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;
        const mainAxisSize = isRow ? contentWidth : contentHeight;
        const crossAxisSize = isRow ? contentHeight : contentWidth;
        const mainGap = isRow ? style.gap[0] : style.gap[1];
        // Prepare child layout info
        const children = [];
        let totalBaseMain = 0;
        for (const child of relativeChildren) {
            const cs = child.style;
            // Check for auto margins on main axis
            // Physical indices depend on axis and reverse direction:
            // - Row: main-start=left(0), main-end=right(2)
            // - Row-reverse: main-start=right(2), main-end=left(0)
            // - Column: main-start=top(1), main-end=bottom(3)
            // - Column-reverse: main-start=bottom(3), main-end=top(1)
            const mainStartIndex = isRow ? (isReverse ? 2 : 0) : (isReverse ? 3 : 1);
            const mainEndIndex = isRow ? (isReverse ? 0 : 2) : (isReverse ? 1 : 3);
            const mainStartMarginAuto = isEdgeAuto(cs.margin, mainStartIndex, style.flexDirection);
            const mainEndMarginAuto = isEdgeAuto(cs.margin, mainEndIndex, style.flexDirection);
            // Resolve non-auto margins (auto margins resolve to 0 initially)
            // CSS spec: percentage margins resolve against containing block's WIDTH only
            // For row: mainAxisSize is contentWidth; for column: crossAxisSize is contentWidth
            const parentWidth = isRow ? mainAxisSize : crossAxisSize;
            const mainStartMarginValue = mainStartMarginAuto ? 0 : resolveEdgeValue(cs.margin, mainStartIndex, style.flexDirection, parentWidth);
            const mainEndMarginValue = mainEndMarginAuto ? 0 : resolveEdgeValue(cs.margin, mainEndIndex, style.flexDirection, parentWidth);
            // Total non-auto margin for flex calculations
            const mainMargin = mainStartMarginValue + mainEndMarginValue;
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
                else if (child.hasMeasureFunc() && cs.flexGrow === 0) {
                    // For auto-sized children with measureFunc but no flexGrow,
                    // pre-measure to get intrinsic size for justify-content calculation
                    // CSS spec: percentage margins resolve against containing block's WIDTH only
                    // Use resolveEdgeValue to respect logical EDGE_START/END
                    const crossMargin = isRow
                        ? resolveEdgeValue(cs.margin, 1, style.flexDirection, mainAxisSize) +
                            resolveEdgeValue(cs.margin, 3, style.flexDirection, mainAxisSize)
                        : resolveEdgeValue(cs.margin, 0, style.flexDirection, mainAxisSize) +
                            resolveEdgeValue(cs.margin, 2, style.flexDirection, mainAxisSize);
                    const availCross = crossAxisSize - crossMargin;
                    const measured = child.measureFunc(mainAxisSize, C.MEASURE_MODE_AT_MOST, availCross, C.MEASURE_MODE_UNDEFINED);
                    baseSize = isRow ? measured.width : measured.height;
                }
                else if (child.children.length > 0) {
                    // For auto-sized children WITH children but no measureFunc,
                    // recursively compute intrinsic size by laying out with unconstrained main axis
                    // Use 0,0 for absX/absY since this is just measurement, not final positioning
                    layoutNode(child, isRow ? NaN : crossAxisSize, isRow ? crossAxisSize : NaN, 0, 0, 0, 0);
                    baseSize = isRow ? child.layout.width : child.layout.height;
                }
                else {
                    // For auto-sized LEAF children without measureFunc, use padding + border as minimum
                    // This ensures elements with only padding still have proper size
                    // CSS spec: percentage padding resolves against containing block's WIDTH only
                    // Use resolveEdgeValue to respect logical EDGE_START/END
                    // For row: mainAxisSize is contentWidth; for column: crossAxisSize is contentWidth
                    const parentWidth = isRow ? mainAxisSize : crossAxisSize;
                    const childPadding = isRow
                        ? resolveEdgeValue(cs.padding, 0, cs.flexDirection, parentWidth) + resolveEdgeValue(cs.padding, 2, cs.flexDirection, parentWidth)
                        : resolveEdgeValue(cs.padding, 1, cs.flexDirection, parentWidth) + resolveEdgeValue(cs.padding, 3, cs.flexDirection, parentWidth);
                    const childBorder = isRow
                        ? cs.border[0] + cs.border[2]
                        : cs.border[1] + cs.border[3];
                    baseSize = childPadding + childBorder;
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
            // Clamp base size to get hypothetical size (CSS Flexbox spec)
            const hypotheticalSize = Math.max(minMain, Math.min(maxMain, baseSize));
            children.push({
                node: child,
                mainSize: baseSize, // Start from base size - distribution happens from here
                baseSize,
                mainMargin,
                flexGrow: cs.flexGrow,
                flexShrink: cs.flexShrink,
                minMain,
                maxMain,
                mainStartMarginAuto,
                mainEndMarginAuto,
                mainStartMarginValue,
                mainEndMarginValue,
                frozen: false, // Will be set during distribution
            });
            // Free space calculation uses BASE sizes (per Yoga/CSS spec algorithm)
            // The freeze loop handles min/max clamping iteratively
            totalBaseMain += baseSize + mainMargin;
        }
        // Calculate total hypothetical main size for free space calculation
        // (already included in totalBaseMain since we use hypothetical sizes)
        // Calculate gaps
        const totalGaps = relativeChildren.length > 1 ? mainGap * (relativeChildren.length - 1) : 0;
        // Distribute free space using grow or shrink factors
        // When mainAxisSize is constrained (not NaN), use it directly.
        // When unconstrained (NaN), check if there's a max constraint that would be exceeded -
        // in that case, use the max constraint to trigger shrinking.
        let effectiveMainSize = mainAxisSize;
        if (Number.isNaN(mainAxisSize)) {
            // Shrink-wrap mode - check if max constraint applies
            const maxMainVal = isRow ? style.maxWidth : style.maxHeight;
            if (maxMainVal.unit !== C.UNIT_UNDEFINED) {
                const maxMain = resolveValue(maxMainVal, isRow ? availableWidth : availableHeight);
                if (!Number.isNaN(maxMain) && totalBaseMain + totalGaps > maxMain) {
                    // Children exceed max constraint - use max as effective size for shrinking
                    const innerMain = isRow ? (innerLeft + innerRight) : (innerTop + innerBottom);
                    effectiveMainSize = maxMain - innerMain;
                }
            }
        }
        if (!Number.isNaN(effectiveMainSize)) {
            // Use hypothetical sizes for free space calculation (totalBaseMain now contains hypothetical sizes)
            const adjustedFreeSpace = effectiveMainSize - totalBaseMain - totalGaps;
            distributeFlexSpace(children, adjustedFreeSpace);
        }
        // Apply min/max constraints to final sizes (handles any remaining edge cases)
        for (const c of children) {
            c.mainSize = Math.max(c.minMain, Math.min(c.maxMain, c.mainSize));
        }
        // Calculate final used space and justify-content
        const usedMain = children.reduce((sum, c) => sum + c.mainSize + c.mainMargin, 0) +
            totalGaps;
        // For auto-sized containers (NaN mainAxisSize), there's no remaining space to justify
        // Use NaN check instead of style check - handles minWidth/minHeight constraints properly
        const remainingSpace = Number.isNaN(mainAxisSize) ? 0 : mainAxisSize - usedMain;
        // Handle auto margins on main axis
        // Auto margins absorb free space BEFORE justify-content
        const totalAutoMargins = children.reduce((sum, c) => sum + (c.mainStartMarginAuto ? 1 : 0) + (c.mainEndMarginAuto ? 1 : 0), 0);
        let hasAutoMargins = totalAutoMargins > 0;
        // Auto margins absorb ALL remaining space (including negative for overflow positioning)
        if (hasAutoMargins) {
            const autoMarginValue = remainingSpace / totalAutoMargins;
            for (const c of children) {
                if (c.mainStartMarginAuto) {
                    c.mainStartMarginValue = autoMarginValue;
                }
                if (c.mainEndMarginAuto) {
                    c.mainEndMarginValue = autoMarginValue;
                }
            }
        }
        // When space is negative or zero, auto margins stay at 0
        let startOffset = 0;
        let itemSpacing = mainGap;
        // justify-content is ignored when any auto margins exist
        if (!hasAutoMargins) {
            switch (style.justifyContent) {
                case C.JUSTIFY_FLEX_END:
                    startOffset = remainingSpace;
                    break;
                case C.JUSTIFY_CENTER:
                    startOffset = remainingSpace / 2;
                    break;
                case C.JUSTIFY_SPACE_BETWEEN:
                    // Only apply space-between when remaining space is positive
                    // With overflow (negative), fall back to flex-start behavior
                    if (children.length > 1 && remainingSpace > 0) {
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
        }
        // NOTE: We do NOT round sizes here. Instead, we use edge-based rounding below.
        // This ensures adjacent elements share exact boundaries without gaps.
        // The key insight: round(pos) gives the edge position, width = round(end) - round(start)
        // Compute baseline alignment info if needed
        // For ALIGN_BASELINE in row direction, we need to know the max baseline first
        let maxBaseline = 0;
        const childBaselines = [];
        const hasBaselineAlignment = style.alignItems === C.ALIGN_BASELINE ||
            relativeChildren.some(c => c.style.alignSelf === C.ALIGN_BASELINE);
        if (hasBaselineAlignment && isRow) {
            // First pass: compute each child's baseline and find the maximum
            for (let i = 0; i < children.length; i++) {
                const c = children[i];
                const child = c.node;
                const cs = child.style;
                // Get cross-axis (top/bottom) margins for this child
                // Use resolveEdgeValue to respect logical EDGE_START/END
                const topMargin = resolveEdgeValue(cs.margin, 1, style.flexDirection, contentWidth);
                // Compute child's height - need to do a mini-layout or use the cached size
                // For children with explicit height, use that
                // For auto-height children, we need to layout them first
                let childHeight;
                const heightDim = cs.height;
                if (heightDim.unit === C.UNIT_POINT) {
                    childHeight = heightDim.value;
                }
                else if (heightDim.unit === C.UNIT_PERCENT && !Number.isNaN(crossAxisSize)) {
                    childHeight = crossAxisSize * (heightDim.value / 100);
                }
                else {
                    // Auto height - need to layout to get intrinsic size
                    // For now, do a preliminary layout (measurement, not final positioning)
                    layoutNode(child, c.mainSize, NaN, 0, 0, 0, 0);
                    childHeight = child.layout.height;
                }
                // Baseline for non-text elements is at the bottom of the margin box
                // baseline = topMargin + height (distance from top of margin box to baseline)
                const baseline = topMargin + childHeight;
                childBaselines.push(baseline);
                maxBaseline = Math.max(maxBaseline, baseline);
            }
        }
        // Position and layout children
        // For reverse directions, start from the END of the container
        // Use fractional mainPos for edge-based rounding
        let mainPos = isReverse ? mainAxisSize - startOffset : startOffset;
        debug('positioning children: isRow=%s, startOffset=%d, relativeChildren=%d, isReverse=%s', isRow, startOffset, relativeChildren.length, isReverse);
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            const child = c.node;
            const cs = child.style;
            // For main-axis margins, use computed auto margin values
            // For cross-axis margins, resolve normally (auto margins on cross axis handled separately)
            let childMarginLeft;
            let childMarginTop;
            let childMarginRight;
            let childMarginBottom;
            // CSS spec: percentage margins resolve against containing block's WIDTH only
            // Use resolveEdgeValue to respect logical EDGE_START/END
            if (isRow) {
                // Row: main axis is horizontal
                // In row-reverse, mainStart=right(2), mainEnd=left(0)
                childMarginLeft = c.mainStartMarginAuto && !isReverse ? c.mainStartMarginValue :
                    c.mainEndMarginAuto && isReverse ? c.mainEndMarginValue :
                        resolveEdgeValue(cs.margin, 0, style.flexDirection, contentWidth);
                childMarginRight = c.mainEndMarginAuto && !isReverse ? c.mainEndMarginValue :
                    c.mainStartMarginAuto && isReverse ? c.mainStartMarginValue :
                        resolveEdgeValue(cs.margin, 2, style.flexDirection, contentWidth);
                childMarginTop = resolveEdgeValue(cs.margin, 1, style.flexDirection, contentWidth);
                childMarginBottom = resolveEdgeValue(cs.margin, 3, style.flexDirection, contentWidth);
            }
            else {
                // Column: main axis is vertical
                // In column-reverse, mainStart=bottom(3), mainEnd=top(1)
                childMarginTop = c.mainStartMarginAuto && !isReverse ? c.mainStartMarginValue :
                    c.mainEndMarginAuto && isReverse ? c.mainEndMarginValue :
                        resolveEdgeValue(cs.margin, 1, style.flexDirection, contentWidth);
                childMarginBottom = c.mainEndMarginAuto && !isReverse ? c.mainEndMarginValue :
                    c.mainStartMarginAuto && isReverse ? c.mainStartMarginValue :
                        resolveEdgeValue(cs.margin, 3, style.flexDirection, contentWidth);
                childMarginLeft = resolveEdgeValue(cs.margin, 0, style.flexDirection, contentWidth);
                childMarginRight = resolveEdgeValue(cs.margin, 2, style.flexDirection, contentWidth);
            }
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
            // Check if parent has definite cross-axis size
            // Parent can have definite cross from either:
            // 1. Explicit style (width/height in points or percent)
            // 2. Definite available space (crossAxisSize is not NaN)
            const parentCrossDim = isRow ? style.height : style.width;
            const parentHasDefiniteCrossStyle = parentCrossDim.unit === C.UNIT_POINT || parentCrossDim.unit === C.UNIT_PERCENT;
            // crossAxisSize comes from available space - if it's a real number, we have a constraint
            const parentHasDefiniteCross = parentHasDefiniteCrossStyle || !Number.isNaN(crossAxisSize);
            if (crossDim.unit === C.UNIT_POINT) {
                // Explicit cross size
                childCrossSize = crossDim.value;
            }
            else if (crossDim.unit === C.UNIT_PERCENT) {
                // Percent of PARENT's cross axis (resolveValue handles NaN → 0)
                childCrossSize = resolveValue(crossDim, crossAxisSize);
            }
            else if (parentHasDefiniteCross && alignment === C.ALIGN_STRETCH) {
                // Stretch alignment with definite parent cross size - fill the cross axis
                childCrossSize = crossAxisSize - crossMargin;
            }
            else {
                // Non-stretch alignment or no definite cross size - shrink-wrap to content
                childCrossSize = NaN;
            }
            // Apply cross-axis min/max constraints
            const crossMinVal = isRow ? cs.minHeight : cs.minWidth;
            const crossMaxVal = isRow ? cs.maxHeight : cs.maxWidth;
            const crossMin = crossMinVal.unit !== C.UNIT_UNDEFINED
                ? resolveValue(crossMinVal, crossAxisSize)
                : 0;
            const crossMax = crossMaxVal.unit !== C.UNIT_UNDEFINED
                ? resolveValue(crossMaxVal, crossAxisSize)
                : Infinity;
            // Apply constraints - for NaN (shrink-wrap), use min as floor
            if (Number.isNaN(childCrossSize)) {
                // For shrink-wrap, min sets the floor - child will be at least this size
                if (crossMin > 0) {
                    childCrossSize = crossMin;
                }
            }
            else {
                childCrossSize = Math.max(crossMin, Math.min(crossMax, childCrossSize));
            }
            // Handle intrinsic sizing for auto-sized children
            // For auto main size children, use flex-computed size if flexGrow > 0,
            // otherwise pass remaining available space for shrink-wrap behavior
            const mainDim = isRow ? cs.width : cs.height;
            const mainIsAuto = mainDim.unit === C.UNIT_AUTO || mainDim.unit === C.UNIT_UNDEFINED;
            const hasFlexGrow = c.flexGrow > 0;
            // Check if parent has definite main-axis size
            const parentMainDim = isRow ? style.width : style.height;
            const parentHasDefiniteMain = parentMainDim.unit === C.UNIT_POINT || parentMainDim.unit === C.UNIT_PERCENT;
            // Use flex-computed mainSize for all cases - it includes padding/border as minimum
            // The flex algorithm already computed the proper size based on content/padding/border
            let effectiveMainSize;
            if (hasFlexGrow) {
                effectiveMainSize = childMainSize;
            }
            else if (mainIsAuto) {
                // Child is auto: use flex-computed size which includes padding/border minimum
                effectiveMainSize = childMainSize;
            }
            else {
                effectiveMainSize = childMainSize;
            }
            let childWidth = isRow ? effectiveMainSize : childCrossSize;
            let childHeight = isRow ? childCrossSize : effectiveMainSize;
            // Only use measure function for intrinsic sizing when flexGrow is NOT set
            // When flexGrow > 0, the flex algorithm determines size, not the content
            const shouldMeasure = child.hasMeasureFunc() && child.children.length === 0 && !hasFlexGrow;
            if (shouldMeasure) {
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
                    // For unconstrained dimensions (NaN), use Infinity for measure func
                    const rawAvailW = widthAuto
                        ? isRow
                            ? mainAxisSize - mainPos // Remaining space after previous children
                            : crossAxisSize - crossMargin
                        : cs.width.value;
                    const rawAvailH = heightAuto
                        ? isRow
                            ? crossAxisSize - crossMargin
                            : mainAxisSize - mainPos // Remaining space for COLUMN
                        : cs.height.value;
                    const availW = Number.isNaN(rawAvailW) ? Infinity : rawAvailW;
                    const availH = Number.isNaN(rawAvailH) ? Infinity : rawAvailH;
                    const measured = child.measureFunc(availW, widthMode, availH, heightMode);
                    // For measure function nodes without flexGrow, intrinsic size takes precedence
                    if (widthAuto) {
                        childWidth = measured.width;
                    }
                    if (heightAuto) {
                        childHeight = measured.height;
                    }
                }
            }
            // Child position within content area (fractional for edge-based rounding)
            // For reverse directions, position from mainPos - childSize, otherwise from mainPos
            // IMPORTANT: In reverse, swap which margin is applied to which side
            // EDGE_START (margin[0]/[1]) becomes the trailing margin in reverse layout
            // EDGE_END (margin[2]/[3]) becomes the leading margin in reverse layout
            let childX;
            let childY;
            if (isReverse) {
                if (isRow) {
                    // Row-reverse: items positioned from right, margin_start applied on right
                    childX = mainPos - childMainSize - childMarginLeft; // Use left margin (EDGE_START) as trailing
                    childY = childMarginTop;
                }
                else {
                    // Column-reverse: items positioned from bottom, margin_start applied on bottom
                    childX = childMarginLeft;
                    childY = mainPos - childMainSize - childMarginTop; // Use top margin (EDGE_START) as trailing
                }
            }
            else {
                childX = isRow ? mainPos + childMarginLeft : childMarginLeft;
                childY = isRow ? childMarginTop : mainPos + childMarginTop;
            }
            // Edge-based rounding using ABSOLUTE coordinates (Yoga-compatible)
            // This ensures adjacent elements share exact boundaries without gaps
            // Key insight: round absolute edges, derive sizes from differences
            const fractionalLeft = innerLeft + childX;
            const fractionalTop = innerTop + childY;
            // Compute position offsets for RELATIVE/STATIC positioned children
            // These must be included in the absolute position BEFORE rounding (Yoga-compatible)
            let posOffsetX = 0;
            let posOffsetY = 0;
            if (cs.positionType === C.POSITION_TYPE_RELATIVE || cs.positionType === C.POSITION_TYPE_STATIC) {
                const relLeftPos = cs.position[0];
                const relTopPos = cs.position[1];
                const relRightPos = cs.position[2];
                const relBottomPos = cs.position[3];
                // Left offset (takes precedence over right)
                if (relLeftPos.unit !== C.UNIT_UNDEFINED) {
                    posOffsetX = resolveValue(relLeftPos, contentWidth);
                }
                else if (relRightPos.unit !== C.UNIT_UNDEFINED) {
                    posOffsetX = -resolveValue(relRightPos, contentWidth);
                }
                // Top offset (takes precedence over bottom)
                if (relTopPos.unit !== C.UNIT_UNDEFINED) {
                    posOffsetY = resolveValue(relTopPos, contentHeight);
                }
                else if (relBottomPos.unit !== C.UNIT_UNDEFINED) {
                    posOffsetY = -resolveValue(relBottomPos, contentHeight);
                }
            }
            // Compute ABSOLUTE float positions for edge rounding (including position offsets)
            // absX/absY are the parent's absolute position from document root
            // Include BOTH parent's position offset and child's position offset
            const absChildLeft = absX + marginLeft + parentPosOffsetX + fractionalLeft + posOffsetX;
            const absChildTop = absY + marginTop + parentPosOffsetY + fractionalTop + posOffsetY;
            // For main axis: round ABSOLUTE edges and derive size
            // Only use edge-based rounding when childMainSize is valid (positive)
            let roundedAbsMainStart;
            let roundedAbsMainEnd;
            let edgeBasedMainSize;
            const useEdgeBasedRounding = childMainSize > 0;
            // Compute child's box model minimum early (needed for edge-based rounding)
            // Use resolveEdgeValue to respect logical EDGE_START/END for padding
            const childPaddingL = resolveEdgeValue(cs.padding, 0, cs.flexDirection, contentWidth);
            const childPaddingT = resolveEdgeValue(cs.padding, 1, cs.flexDirection, contentWidth);
            const childPaddingR = resolveEdgeValue(cs.padding, 2, cs.flexDirection, contentWidth);
            const childPaddingB = resolveEdgeValue(cs.padding, 3, cs.flexDirection, contentWidth);
            const childBorderL = cs.border[0];
            const childBorderT = cs.border[1];
            const childBorderR = cs.border[2];
            const childBorderB = cs.border[3];
            const childMinW = childPaddingL + childPaddingR + childBorderL + childBorderR;
            const childMinH = childPaddingT + childPaddingB + childBorderT + childBorderB;
            const childMinMain = isRow ? childMinW : childMinH;
            // Apply box model constraint to childMainSize before edge rounding
            const constrainedMainSize = Math.max(childMainSize, childMinMain);
            if (useEdgeBasedRounding) {
                if (isRow) {
                    roundedAbsMainStart = Math.round(absChildLeft);
                    roundedAbsMainEnd = Math.round(absChildLeft + constrainedMainSize);
                    edgeBasedMainSize = roundedAbsMainEnd - roundedAbsMainStart;
                }
                else {
                    roundedAbsMainStart = Math.round(absChildTop);
                    roundedAbsMainEnd = Math.round(absChildTop + constrainedMainSize);
                    edgeBasedMainSize = roundedAbsMainEnd - roundedAbsMainStart;
                }
            }
            else {
                // For children without valid main size, use simple rounding
                roundedAbsMainStart = isRow ? Math.round(absChildLeft) : Math.round(absChildTop);
                edgeBasedMainSize = childMinMain; // Use minimum size instead of 0
            }
            // Calculate child's RELATIVE position (stored in layout)
            // Yoga behavior: position is rounded locally, size uses absolute edge rounding
            // This ensures sizes are pixel-perfect at document level while positions remain intuitive
            const childLeft = Math.round(fractionalLeft + posOffsetX);
            const childTop = Math.round(fractionalTop + posOffsetY);
            // Check if cross axis is auto-sized (needed for deciding what to pass to layoutNode)
            const crossDimForLayoutCall = isRow ? cs.height : cs.width;
            const crossIsAutoForLayoutCall = crossDimForLayoutCall.unit === C.UNIT_AUTO || crossDimForLayoutCall.unit === C.UNIT_UNDEFINED;
            // For auto-sized children (no flexGrow, no measureFunc), pass NaN to let them compute intrinsic size
            // Otherwise layoutNode would subtract margins from the available size
            const passWidthToChild = (isRow && mainIsAuto && !hasFlexGrow) ? NaN :
                (!isRow && crossIsAutoForLayoutCall && !parentHasDefiniteCross) ? NaN :
                    childWidth;
            const passHeightToChild = (!isRow && mainIsAuto && !hasFlexGrow) ? NaN :
                (isRow && crossIsAutoForLayoutCall && !parentHasDefiniteCross) ? NaN :
                    childHeight;
            // Recurse to layout any grandchildren
            // Pass the child's FLOAT absolute position (margin box start, before child's own margin)
            // absChildLeft/Top include the child's margins, so subtract them to get margin box start
            const childAbsX = absChildLeft - childMarginLeft;
            const childAbsY = absChildTop - childMarginTop;
            layoutNode(child, passWidthToChild, passHeightToChild, childLeft, childTop, childAbsX, childAbsY);
            // Enforce box model constraint: child can't be smaller than its padding + border
            // (using childMinW/childMinH computed earlier for edge-based rounding)
            if (childWidth < childMinW)
                childWidth = childMinW;
            if (childHeight < childMinH)
                childHeight = childMinH;
            // Set this child's layout - override what layoutNode computed
            // Override if any of:
            // - Child has explicit main dimension (not auto)
            // - Child has flexGrow > 0 (flex distribution applied)
            // - Child has measureFunc
            // - Parent did flex distribution (effectiveMainSize not NaN) - covers flex-shrink case
            const hasMeasure = child.hasMeasureFunc() && child.children.length === 0;
            const parentDidFlexDistribution = !Number.isNaN(effectiveMainSize);
            if (!mainIsAuto || hasFlexGrow || hasMeasure || parentDidFlexDistribution) {
                // Use edge-based rounding: size = round(end_edge) - round(start_edge)
                if (isRow) {
                    child.layout.width = edgeBasedMainSize;
                }
                else {
                    child.layout.height = edgeBasedMainSize;
                }
            }
            // Cross axis: only override for explicit sizing or when we have a real constraint
            // For auto-sized children, let layoutNode determine the size
            const crossDimForCheck = isRow ? cs.height : cs.width;
            const crossIsAuto = crossDimForCheck.unit === C.UNIT_AUTO || crossDimForCheck.unit === C.UNIT_UNDEFINED;
            // Only override if child has explicit sizing OR parent has explicit cross size
            // When parent has auto cross size, let children shrink-wrap first
            // Note: parentCrossDim and parentHasDefiniteCross already computed above
            const parentCrossIsAuto = !parentHasDefiniteCross;
            // Also check if childCrossSize was constrained by min/max - if so, we should override
            const hasCrossMinMax = crossMinVal.unit !== C.UNIT_UNDEFINED || crossMaxVal.unit !== C.UNIT_UNDEFINED;
            const shouldOverrideCross = !crossIsAuto || (!parentCrossIsAuto && alignment === C.ALIGN_STRETCH) || (hasCrossMinMax && !Number.isNaN(childCrossSize));
            if (shouldOverrideCross) {
                if (isRow) {
                    child.layout.height = Math.round(childHeight);
                }
                else {
                    child.layout.width = Math.round(childWidth);
                }
            }
            // Store RELATIVE position (within parent's content area), not absolute
            // This matches Yoga's behavior where getComputedLeft/Top return relative positions
            // Position offsets are already included in childLeft/childTop via edge-based rounding
            child.layout.left = childLeft;
            child.layout.top = childTop;
            // Update childWidth/childHeight to match actual computed layout for mainPos calculation
            childWidth = child.layout.width;
            childHeight = child.layout.height;
            // Apply cross-axis alignment offset
            const finalCrossSize = isRow ? child.layout.height : child.layout.width;
            let crossOffset = 0;
            // Check for auto margins on cross axis - they override alignment
            const crossStartMargin = isRow ? cs.margin[1] : cs.margin[0]; // top for row, left for column
            const crossEndMargin = isRow ? cs.margin[3] : cs.margin[2]; // bottom for row, right for column
            const hasAutoStartMargin = crossStartMargin.unit === C.UNIT_AUTO;
            const hasAutoEndMargin = crossEndMargin.unit === C.UNIT_AUTO;
            const availableCrossSpace = crossAxisSize - finalCrossSize - crossMargin;
            if (hasAutoStartMargin && hasAutoEndMargin) {
                // Both auto: center the item
                crossOffset = availableCrossSpace / 2;
            }
            else if (hasAutoStartMargin) {
                // Auto start margin: push to end
                crossOffset = availableCrossSpace;
            }
            else if (hasAutoEndMargin) {
                // Auto end margin: stay at start (crossOffset = 0)
                crossOffset = 0;
            }
            else {
                // No auto margins: use alignment
                switch (alignment) {
                    case C.ALIGN_FLEX_END:
                        crossOffset = availableCrossSpace;
                        break;
                    case C.ALIGN_CENTER:
                        crossOffset = availableCrossSpace / 2;
                        break;
                    case C.ALIGN_BASELINE:
                        // Baseline alignment only applies to row direction
                        // For column direction, it falls through to flex-start (default)
                        if (isRow && childBaselines.length > 0) {
                            crossOffset = maxBaseline - childBaselines[i];
                        }
                        break;
                }
            }
            if (crossOffset > 0) {
                if (isRow) {
                    child.layout.top += Math.round(crossOffset);
                }
                else {
                    child.layout.left += Math.round(crossOffset);
                }
            }
            // Advance main position using CONSTRAINED size for proper positioning
            // Use constrainedMainSize (box model minimum applied) instead of c.mainSize
            const fractionalMainSize = constrainedMainSize;
            // Use computed margin values (including auto margins)
            const totalMainMargin = c.mainStartMarginValue + c.mainEndMarginValue;
            debug('  child %d: mainPos=%d → top=%d (fractionalMainSize=%d, totalMainMargin=%d)', i, mainPos, child.layout.top, fractionalMainSize, totalMainMargin);
            if (isReverse) {
                mainPos -= fractionalMainSize + totalMainMargin;
                if (i < children.length - 1) {
                    mainPos -= itemSpacing;
                }
            }
            else {
                mainPos += fractionalMainSize + totalMainMargin;
                if (i < children.length - 1) {
                    mainPos += itemSpacing;
                }
            }
        }
        // For auto-sized containers (including root), shrink-wrap to content
        // Compute actual used main space from child layouts (not pre-computed c.mainSize which may be 0)
        let actualUsedMain = 0;
        for (const c of children) {
            const childMainSize = isRow ? c.node.layout.width : c.node.layout.height;
            const totalMainMargin = c.mainStartMarginValue + c.mainEndMarginValue;
            actualUsedMain += childMainSize + totalMainMargin;
        }
        actualUsedMain += totalGaps;
        if (isRow && style.width.unit !== C.UNIT_POINT && style.width.unit !== C.UNIT_PERCENT) {
            // Auto-width row: shrink-wrap to content
            nodeWidth = actualUsedMain + innerLeft + innerRight;
        }
        if (!isRow && style.height.unit !== C.UNIT_POINT && style.height.unit !== C.UNIT_PERCENT) {
            // Auto-height column: shrink-wrap to content
            nodeHeight = actualUsedMain + innerTop + innerBottom;
        }
        // For cross axis, find the max child size
        // CSS spec: percentage margins resolve against containing block's WIDTH only
        // Use resolveEdgeValue to respect logical EDGE_START/END
        let maxCrossSize = 0;
        for (const c of children) {
            const childCross = isRow ? c.node.layout.height : c.node.layout.width;
            const childMargin = isRow
                ? resolveEdgeValue(c.node.style.margin, 1, style.flexDirection, contentWidth) +
                    resolveEdgeValue(c.node.style.margin, 3, style.flexDirection, contentWidth)
                : resolveEdgeValue(c.node.style.margin, 0, style.flexDirection, contentWidth) +
                    resolveEdgeValue(c.node.style.margin, 2, style.flexDirection, contentWidth);
            maxCrossSize = Math.max(maxCrossSize, childCross + childMargin);
        }
        // Cross-axis shrink-wrap for auto-sized dimension
        if (isRow && style.height.unit !== C.UNIT_POINT && style.height.unit !== C.UNIT_PERCENT) {
            // Auto-height row: shrink-wrap to max child height
            nodeHeight = maxCrossSize + innerTop + innerBottom;
        }
        if (!isRow && style.width.unit !== C.UNIT_POINT && style.width.unit !== C.UNIT_PERCENT) {
            // Auto-width column: shrink-wrap to max child width
            nodeWidth = maxCrossSize + innerLeft + innerRight;
        }
    }
    // Re-apply min/max constraints after any shrink-wrap adjustments
    // This ensures containers don't violate their constraints after auto-sizing
    nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
    nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
    // Re-enforce box model constraint: minimum size = padding + border
    // This must be applied AFTER applyMinMax since min/max can't reduce below padding+border
    if (!Number.isNaN(nodeWidth) && nodeWidth < minInnerWidth) {
        nodeWidth = minInnerWidth;
    }
    if (!Number.isNaN(nodeHeight) && nodeHeight < minInnerHeight) {
        nodeHeight = minInnerHeight;
    }
    // Set this node's layout using edge-based rounding (Yoga-compatible)
    // Use parentPosOffsetX/Y computed earlier (includes position offsets)
    // Compute absolute positions for edge-based rounding
    const absNodeLeft = absX + marginLeft + parentPosOffsetX;
    const absNodeTop = absY + marginTop + parentPosOffsetY;
    const absNodeRight = absNodeLeft + nodeWidth;
    const absNodeBottom = absNodeTop + nodeHeight;
    // Round edges and derive sizes (Yoga algorithm)
    const roundedAbsLeft = Math.round(absNodeLeft);
    const roundedAbsTop = Math.round(absNodeTop);
    const roundedAbsRight = Math.round(absNodeRight);
    const roundedAbsBottom = Math.round(absNodeBottom);
    layout.width = roundedAbsRight - roundedAbsLeft;
    layout.height = roundedAbsBottom - roundedAbsTop;
    // Position is relative to parent, derived from absolute rounding
    const roundedAbsParentLeft = Math.round(absX);
    const roundedAbsParentTop = Math.round(absY);
    layout.left = roundedAbsLeft - roundedAbsParentLeft;
    layout.top = roundedAbsTop - roundedAbsParentTop;
    // Layout absolute children - handle left/right/top/bottom offsets
    // Absolute positioning uses the PADDING BOX as the containing block
    // (inside border but INCLUDING padding, not the content box)
    const absInnerLeft = borderLeft;
    const absInnerTop = borderTop;
    const absInnerRight = borderRight;
    const absInnerBottom = borderBottom;
    const absPaddingBoxW = nodeWidth - absInnerLeft - absInnerRight;
    const absPaddingBoxH = nodeHeight - absInnerTop - absInnerBottom;
    // Content box dimensions for percentage resolution of absolute children
    const absContentBoxW = absPaddingBoxW - paddingLeft - paddingRight;
    const absContentBoxH = absPaddingBoxH - paddingTop - paddingBottom;
    for (const child of absoluteChildren) {
        const cs = child.style;
        // CSS spec: percentage margins resolve against containing block's WIDTH only
        // Use resolveEdgeValue to respect logical EDGE_START/END
        const childMarginLeft = resolveEdgeValue(cs.margin, 0, style.flexDirection, nodeWidth);
        const childMarginTop = resolveEdgeValue(cs.margin, 1, style.flexDirection, nodeWidth);
        const childMarginRight = resolveEdgeValue(cs.margin, 2, style.flexDirection, nodeWidth);
        const childMarginBottom = resolveEdgeValue(cs.margin, 3, style.flexDirection, nodeWidth);
        // Position offsets from setPosition(edge, value)
        const leftPos = cs.position[0];
        const topPos = cs.position[1];
        const rightPos = cs.position[2];
        const bottomPos = cs.position[3];
        const hasLeft = leftPos.unit !== C.UNIT_UNDEFINED;
        const hasRight = rightPos.unit !== C.UNIT_UNDEFINED;
        const hasTop = topPos.unit !== C.UNIT_UNDEFINED;
        const hasBottom = bottomPos.unit !== C.UNIT_UNDEFINED;
        const leftOffset = resolveValue(leftPos, nodeWidth);
        const topOffset = resolveValue(topPos, nodeHeight);
        const rightOffset = resolveValue(rightPos, nodeWidth);
        const bottomOffset = resolveValue(bottomPos, nodeHeight);
        // Calculate available size for absolute child using padding box
        const contentW = absPaddingBoxW;
        const contentH = absPaddingBoxH;
        // Determine child width
        // - If both left and right set with auto width: stretch to fill
        // - If auto width but NOT both left and right: shrink to intrinsic (NaN)
        // - For percentage width: resolve against content box
        // - Otherwise (explicit width): use available width as constraint
        let childAvailWidth;
        const widthIsAuto = cs.width.unit === C.UNIT_AUTO || cs.width.unit === C.UNIT_UNDEFINED;
        const widthIsPercent = cs.width.unit === C.UNIT_PERCENT;
        if (widthIsAuto && hasLeft && hasRight) {
            childAvailWidth = contentW - leftOffset - rightOffset - childMarginLeft - childMarginRight;
        }
        else if (widthIsAuto) {
            childAvailWidth = NaN; // Shrink to intrinsic size
        }
        else if (widthIsPercent) {
            // Percentage widths resolve against content box (inside padding)
            childAvailWidth = absContentBoxW;
        }
        else {
            childAvailWidth = contentW;
        }
        // Determine child height
        // - If both top and bottom set with auto height: stretch to fill
        // - If auto height but NOT both top and bottom: shrink to intrinsic (NaN)
        // - For percentage height: resolve against content box
        // - Otherwise (explicit height): use available height as constraint
        let childAvailHeight;
        const heightIsAuto = cs.height.unit === C.UNIT_AUTO || cs.height.unit === C.UNIT_UNDEFINED;
        const heightIsPercent = cs.height.unit === C.UNIT_PERCENT;
        if (heightIsAuto && hasTop && hasBottom) {
            childAvailHeight = contentH - topOffset - bottomOffset - childMarginTop - childMarginBottom;
        }
        else if (heightIsAuto) {
            childAvailHeight = NaN; // Shrink to intrinsic size
        }
        else if (heightIsPercent) {
            // Percentage heights resolve against content box (inside padding)
            childAvailHeight = absContentBoxH;
        }
        else {
            childAvailHeight = contentH;
        }
        // Compute child position
        let childX = childMarginLeft + leftOffset;
        let childY = childMarginTop + topOffset;
        // First, layout the child to get its dimensions
        // Use padding box origin (absInnerLeft/Top = border only)
        // Compute child's absolute position (margin box start, before child's own margin)
        // Parent's padding box = absX + marginLeft + borderLeft = absX + marginLeft + absInnerLeft
        // Child's margin box = parent's padding box + leftOffset
        const childAbsX = absX + marginLeft + absInnerLeft + leftOffset;
        const childAbsY = absY + marginTop + absInnerTop + topOffset;
        // Preserve NaN for shrink-wrap mode - only clamp real numbers to 0
        const clampIfNumber = (v) => (Number.isNaN(v) ? NaN : Math.max(0, v));
        layoutNode(child, clampIfNumber(childAvailWidth), clampIfNumber(childAvailHeight), layout.left + absInnerLeft + childX, layout.top + absInnerTop + childY, childAbsX, childAbsY);
        // Now compute final position based on right/bottom if left/top not set
        const childWidth = child.layout.width;
        const childHeight = child.layout.height;
        // Apply alignment when no explicit position set
        // For absolute children, align-items/justify-content apply when no position offsets
        if (!hasLeft && !hasRight) {
            // No horizontal position - use align-items (for row) or justify-content (for column)
            // Default column direction: cross-axis is horizontal, use alignItems
            let alignment = style.alignItems;
            if (cs.alignSelf !== C.ALIGN_AUTO) {
                alignment = cs.alignSelf;
            }
            const freeSpaceX = contentW - childWidth - childMarginLeft - childMarginRight;
            switch (alignment) {
                case C.ALIGN_CENTER:
                    childX = childMarginLeft + freeSpaceX / 2;
                    break;
                case C.ALIGN_FLEX_END:
                    childX = childMarginLeft + freeSpaceX;
                    break;
                case C.ALIGN_STRETCH:
                    // Stretch: already handled by setting width to fill
                    break;
                default: // FLEX_START
                    childX = childMarginLeft;
                    break;
            }
        }
        else if (!hasLeft && hasRight) {
            // Position from right edge
            childX = contentW - rightOffset - childMarginRight - childWidth;
        }
        else if (hasLeft && hasRight && widthIsAuto) {
            // Stretch width already handled above
            child.layout.width = Math.round(childAvailWidth);
        }
        if (!hasTop && !hasBottom) {
            // No vertical position - use justify-content (for row) or align-items (for column)
            // Default column direction: main-axis is vertical, use justifyContent
            const freeSpaceY = contentH - childHeight - childMarginTop - childMarginBottom;
            switch (style.justifyContent) {
                case C.JUSTIFY_CENTER:
                    childY = childMarginTop + freeSpaceY / 2;
                    break;
                case C.JUSTIFY_FLEX_END:
                    childY = childMarginTop + freeSpaceY;
                    break;
                default: // FLEX_START
                    childY = childMarginTop;
                    break;
            }
        }
        else if (!hasTop && hasBottom) {
            // Position from bottom edge
            childY = contentH - bottomOffset - childMarginBottom - childHeight;
        }
        else if (hasTop && hasBottom && heightIsAuto) {
            // Stretch height already handled above
            child.layout.height = Math.round(childAvailHeight);
        }
        // Set final position (relative to container padding box)
        child.layout.left = Math.round(absInnerLeft + childX);
        child.layout.top = Math.round(absInnerTop + childY);
    }
}
/**
 * Resolve a Value to a number given the available size.
 *
 * Per CSS spec, percentage values against auto-sized (NaN) containing blocks
 * resolve to 0 (treated as having no contribution to intrinsic size).
 */
function resolveValue(value, availableSize) {
    switch (value.unit) {
        case C.UNIT_POINT:
            return value.value;
        case C.UNIT_PERCENT:
            // Percentage against NaN (auto-sized parent) resolves to 0
            if (Number.isNaN(availableSize)) {
                return 0;
            }
            return availableSize * (value.value / 100);
        default:
            return 0;
    }
}
/**
 * Apply min/max constraints to a size.
 *
 * When size is NaN (auto-sized), min constraints establish a floor.
 * This handles the case where a parent has minWidth/maxWidth but no explicit width -
 * children need to resolve percentages against the constrained size.
 */
function applyMinMax(size, min, max, available) {
    let result = size;
    if (min.unit !== C.UNIT_UNDEFINED) {
        const minValue = resolveValue(min, available);
        // Only apply if minValue is valid (not NaN from percent with NaN available)
        if (!Number.isNaN(minValue)) {
            // When size is NaN (auto-sized), min establishes the floor
            if (Number.isNaN(result)) {
                result = minValue;
            }
            else {
                result = Math.max(result, minValue);
            }
        }
    }
    if (max.unit !== C.UNIT_UNDEFINED) {
        const maxValue = resolveValue(max, available);
        // Only apply if maxValue is valid (not NaN from percent with NaN available)
        if (!Number.isNaN(maxValue)) {
            // When size is NaN (auto-sized), max alone doesn't set the size
            // (the element should shrink-wrap to content, then be capped by max)
            // Only apply max if we have a concrete size to constrain
            if (!Number.isNaN(result)) {
                result = Math.min(result, maxValue);
            }
        }
    }
    return result;
}
//# sourceMappingURL=node.js.map