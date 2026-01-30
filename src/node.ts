/**
 * Flexx Node
 *
 * Yoga-compatible Node class for flexbox layout.
 */

import createDebug from "debug";
import * as C from "./constants.js";

const debug = createDebug("flexx:layout");
import {
  type Layout,
  type MeasureFunc,
  type Style,
  type Value,
  createDefaultStyle,
} from "./types.js";

/**
 * A layout node in the flexbox tree.
 */
export class Node {
  // Tree structure
  private _parent: Node | null = null;
  private _children: Node[] = [];

  // Style
  private _style: Style = createDefaultStyle();

  // Measure function for intrinsic sizing
  private _measureFunc: MeasureFunc | null = null;

  // Computed layout
  private _layout: Layout = { left: 0, top: 0, width: 0, height: 0 };

  // Dirty flags
  private _isDirty = true;
  private _hasNewLayout = false;

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
  static create(): Node {
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
  getChildCount(): number {
    return this._children.length;
  }

  /**
   * Get a child node by index.
   *
   * @param index - Zero-based child index
   * @returns The child node at the given index, or undefined if index is out of bounds
   */
  getChild(index: number): Node | undefined {
    return this._children[index];
  }

  /**
   * Get the parent node.
   *
   * @returns The parent node, or null if this is a root node
   */
  getParent(): Node | null {
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
  insertChild(child: Node, index: number): void {
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
  removeChild(child: Node): void {
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
  free(): void {
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
  [Symbol.dispose](): void {
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
  setMeasureFunc(measureFunc: MeasureFunc): void {
    this._measureFunc = measureFunc;
    this.markDirty();
  }

  /**
   * Remove the measure function from this node.
   * Marks the node as dirty to trigger layout recalculation.
   */
  unsetMeasureFunc(): void {
    this._measureFunc = null;
    this.markDirty();
  }

  /**
   * Check if this node has a measure function.
   *
   * @returns True if a measure function is set
   */
  hasMeasureFunc(): boolean {
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
  isDirty(): boolean {
    return this._isDirty;
  }

  /**
   * Mark this node and all ancestors as dirty.
   * A dirty node needs layout recalculation.
   * This is automatically called by all style setters and tree operations.
   */
  markDirty(): void {
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
  hasNewLayout(): boolean {
    return this._hasNewLayout;
  }

  /**
   * Mark that the current layout has been seen/processed.
   * Clears the hasNewLayout flag.
   */
  markLayoutSeen(): void {
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
  calculateLayout(
    width?: number,
    height?: number,
    _direction: number = C.DIRECTION_LTR,
  ): void {
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

    debug(
      "layout: %dx%d, %d nodes in %dms",
      width,
      height,
      nodeCount,
      Date.now() - start,
    );
  }

  // ============================================================================
  // Layout Results
  // ============================================================================

  /**
   * Get the computed left position after layout.
   *
   * @returns The left position in points
   */
  getComputedLeft(): number {
    return this._layout.left;
  }

  /**
   * Get the computed top position after layout.
   *
   * @returns The top position in points
   */
  getComputedTop(): number {
    return this._layout.top;
  }

  /**
   * Get the computed width after layout.
   *
   * @returns The width in points
   */
  getComputedWidth(): number {
    return this._layout.width;
  }

  /**
   * Get the computed height after layout.
   *
   * @returns The height in points
   */
  getComputedHeight(): number {
    return this._layout.height;
  }

  // ============================================================================
  // Internal Accessors (for layout algorithm)
  // ============================================================================

  get children(): readonly Node[] {
    return this._children;
  }

  get style(): Style {
    return this._style;
  }

  get layout(): Layout {
    return this._layout;
  }

  get measureFunc(): MeasureFunc | null {
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
  setWidth(value: number): void {
    // NaN means "auto" in Yoga API
    if (Number.isNaN(value)) {
      this._style.width = { value: 0, unit: C.UNIT_AUTO };
    } else {
      this._style.width = { value, unit: C.UNIT_POINT };
    }
    this.markDirty();
  }

  /**
   * Set the width as a percentage of the parent's width.
   *
   * @param value - Width as a percentage (0-100)
   */
  setWidthPercent(value: number): void {
    this._style.width = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the width to auto (determined by layout algorithm).
   */
  setWidthAuto(): void {
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
  setHeight(value: number): void {
    // NaN means "auto" in Yoga API
    if (Number.isNaN(value)) {
      this._style.height = { value: 0, unit: C.UNIT_AUTO };
    } else {
      this._style.height = { value, unit: C.UNIT_POINT };
    }
    this.markDirty();
  }

  /**
   * Set the height as a percentage of the parent's height.
   *
   * @param value - Height as a percentage (0-100)
   */
  setHeightPercent(value: number): void {
    this._style.height = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the height to auto (determined by layout algorithm).
   */
  setHeightAuto(): void {
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
  setMinWidth(value: number): void {
    this._style.minWidth = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  /**
   * Set the minimum width as a percentage of the parent's width.
   *
   * @param value - Minimum width as a percentage (0-100)
   */
  setMinWidthPercent(value: number): void {
    this._style.minWidth = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the minimum height in points.
   *
   * @param value - Minimum height in points
   */
  setMinHeight(value: number): void {
    this._style.minHeight = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  /**
   * Set the minimum height as a percentage of the parent's height.
   *
   * @param value - Minimum height as a percentage (0-100)
   */
  setMinHeightPercent(value: number): void {
    this._style.minHeight = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the maximum width in points.
   *
   * @param value - Maximum width in points
   */
  setMaxWidth(value: number): void {
    this._style.maxWidth = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  /**
   * Set the maximum width as a percentage of the parent's width.
   *
   * @param value - Maximum width as a percentage (0-100)
   */
  setMaxWidthPercent(value: number): void {
    this._style.maxWidth = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the maximum height in points.
   *
   * @param value - Maximum height in points
   */
  setMaxHeight(value: number): void {
    this._style.maxHeight = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  /**
   * Set the maximum height as a percentage of the parent's height.
   *
   * @param value - Maximum height as a percentage (0-100)
   */
  setMaxHeightPercent(value: number): void {
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
  setFlexGrow(value: number): void {
    this._style.flexGrow = value;
    this.markDirty();
  }

  /**
   * Set the flex shrink factor.
   * Determines how much the node will shrink relative to siblings when there is insufficient space.
   *
   * @param value - Flex shrink factor (default is 1)
   */
  setFlexShrink(value: number): void {
    this._style.flexShrink = value;
    this.markDirty();
  }

  /**
   * Set the flex basis to a fixed value in points.
   * The initial size of the node before flex grow/shrink is applied.
   *
   * @param value - Flex basis in points
   */
  setFlexBasis(value: number): void {
    this._style.flexBasis = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  /**
   * Set the flex basis as a percentage of the parent's size.
   *
   * @param value - Flex basis as a percentage (0-100)
   */
  setFlexBasisPercent(value: number): void {
    this._style.flexBasis = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  /**
   * Set the flex basis to auto (based on the node's width/height).
   */
  setFlexBasisAuto(): void {
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
  setFlexDirection(direction: number): void {
    this._style.flexDirection = direction;
    this.markDirty();
  }

  /**
   * Set the flex wrap behavior.
   *
   * @param wrap - WRAP_NO_WRAP, WRAP_WRAP, or WRAP_WRAP_REVERSE
   */
  setFlexWrap(wrap: number): void {
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
  setAlignItems(align: number): void {
    this._style.alignItems = align;
    this.markDirty();
  }

  /**
   * Set how this node is aligned along the parent's cross axis.
   * Overrides the parent's alignItems for this specific child.
   *
   * @param align - ALIGN_AUTO, ALIGN_FLEX_START, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_STRETCH, or ALIGN_BASELINE
   */
  setAlignSelf(align: number): void {
    this._style.alignSelf = align;
    this.markDirty();
  }

  /**
   * Set how lines are aligned in a multi-line flex container.
   * Only affects containers with wrap enabled and multiple lines.
   *
   * @param align - ALIGN_FLEX_START, ALIGN_CENTER, ALIGN_FLEX_END, ALIGN_STRETCH, ALIGN_SPACE_BETWEEN, or ALIGN_SPACE_AROUND
   */
  setAlignContent(align: number): void {
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
  setJustifyContent(justify: number): void {
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
  setPadding(edge: number, value: number): void {
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
  setMargin(edge: number, value: number): void {
    setEdgeValue(this._style.margin, edge, value, C.UNIT_POINT);
    this.markDirty();
  }

  /**
   * Set margin as a percentage of the parent's size.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
   * @param value - Margin as a percentage (0-100)
   */
  setMarginPercent(edge: number, value: number): void {
    setEdgeValue(this._style.margin, edge, value, C.UNIT_PERCENT);
    this.markDirty();
  }

  /**
   * Set margin to auto (for centering items with margin: auto).
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
   */
  setMarginAuto(edge: number): void {
    setEdgeValue(this._style.margin, edge, 0, C.UNIT_AUTO);
    this.markDirty();
  }

  /**
   * Set border width for one or more edges.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, EDGE_BOTTOM, EDGE_HORIZONTAL, EDGE_VERTICAL, or EDGE_ALL
   * @param value - Border width in points
   */
  setBorder(edge: number, value: number): void {
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
  setGap(gutter: number, value: number): void {
    if (gutter === C.GUTTER_COLUMN) {
      this._style.gap[0] = value;
    } else if (gutter === C.GUTTER_ROW) {
      this._style.gap[1] = value;
    } else if (gutter === C.GUTTER_ALL) {
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
  setPositionType(positionType: number): void {
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
  setPosition(edge: number, value: number): void {
    // NaN means "auto" (unset) in Yoga API
    if (Number.isNaN(value)) {
      setEdgeValue(this._style.position, edge, 0, C.UNIT_UNDEFINED);
    } else {
      setEdgeValue(this._style.position, edge, value, C.UNIT_POINT);
    }
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
  setDisplay(display: number): void {
    this._style.display = display;
    this.markDirty();
  }

  /**
   * Set the overflow behavior.
   *
   * @param overflow - OVERFLOW_VISIBLE, OVERFLOW_HIDDEN, or OVERFLOW_SCROLL
   */
  setOverflow(overflow: number): void {
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
  getWidth(): Value {
    return this._style.width;
  }

  /**
   * Get the height style value.
   *
   * @returns Height value with unit (points, percent, or auto)
   */
  getHeight(): Value {
    return this._style.height;
  }

  /**
   * Get the minimum width style value.
   *
   * @returns Minimum width value with unit
   */
  getMinWidth(): Value {
    return this._style.minWidth;
  }

  /**
   * Get the minimum height style value.
   *
   * @returns Minimum height value with unit
   */
  getMinHeight(): Value {
    return this._style.minHeight;
  }

  /**
   * Get the maximum width style value.
   *
   * @returns Maximum width value with unit
   */
  getMaxWidth(): Value {
    return this._style.maxWidth;
  }

  /**
   * Get the maximum height style value.
   *
   * @returns Maximum height value with unit
   */
  getMaxHeight(): Value {
    return this._style.maxHeight;
  }

  /**
   * Get the flex grow factor.
   *
   * @returns Flex grow value
   */
  getFlexGrow(): number {
    return this._style.flexGrow;
  }

  /**
   * Get the flex shrink factor.
   *
   * @returns Flex shrink value
   */
  getFlexShrink(): number {
    return this._style.flexShrink;
  }

  /**
   * Get the flex basis style value.
   *
   * @returns Flex basis value with unit
   */
  getFlexBasis(): Value {
    return this._style.flexBasis;
  }

  /**
   * Get the flex direction.
   *
   * @returns Flex direction constant
   */
  getFlexDirection(): number {
    return this._style.flexDirection;
  }

  /**
   * Get the flex wrap setting.
   *
   * @returns Flex wrap constant
   */
  getFlexWrap(): number {
    return this._style.flexWrap;
  }

  /**
   * Get the align items setting.
   *
   * @returns Align items constant
   */
  getAlignItems(): number {
    return this._style.alignItems;
  }

  /**
   * Get the align self setting.
   *
   * @returns Align self constant
   */
  getAlignSelf(): number {
    return this._style.alignSelf;
  }

  /**
   * Get the align content setting.
   *
   * @returns Align content constant
   */
  getAlignContent(): number {
    return this._style.alignContent;
  }

  /**
   * Get the justify content setting.
   *
   * @returns Justify content constant
   */
  getJustifyContent(): number {
    return this._style.justifyContent;
  }

  /**
   * Get the padding for a specific edge.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
   * @returns Padding value with unit
   */
  getPadding(edge: number): Value {
    return getEdgeValue(this._style.padding, edge);
  }

  /**
   * Get the margin for a specific edge.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
   * @returns Margin value with unit
   */
  getMargin(edge: number): Value {
    return getEdgeValue(this._style.margin, edge);
  }

  /**
   * Get the border width for a specific edge.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
   * @returns Border width in points
   */
  getBorder(edge: number): number {
    return getEdgeBorderValue(this._style.border, edge);
  }

  /**
   * Get the position offset for a specific edge.
   *
   * @param edge - EDGE_LEFT, EDGE_TOP, EDGE_RIGHT, or EDGE_BOTTOM
   * @returns Position value with unit
   */
  getPosition(edge: number): Value {
    return getEdgeValue(this._style.position, edge);
  }

  /**
   * Get the position type.
   *
   * @returns Position type constant
   */
  getPositionType(): number {
    return this._style.positionType;
  }

  /**
   * Get the display type.
   *
   * @returns Display constant
   */
  getDisplay(): number {
    return this._style.display;
  }

  /**
   * Get the overflow setting.
   *
   * @returns Overflow constant
   */
  getOverflow(): number {
    return this._style.overflow;
  }

  /**
   * Get the gap for column or row.
   *
   * @param gutter - GUTTER_COLUMN or GUTTER_ROW
   * @returns Gap size in points
   */
  getGap(gutter: number): number {
    if (gutter === C.GUTTER_COLUMN) {
      return this._style.gap[0];
    } else if (gutter === C.GUTTER_ROW) {
      return this._style.gap[1];
    }
    return this._style.gap[0]; // Default to column gap
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function setEdgeValue(
  arr: [Value, Value, Value, Value],
  edge: number,
  value: number,
  unit: number,
): void {
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

function setEdgeBorder(
  arr: [number, number, number, number],
  edge: number,
  value: number,
): void {
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

function getEdgeValue(arr: [Value, Value, Value, Value], edge: number): Value {
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

function getEdgeBorderValue(
  arr: [number, number, number, number],
  edge: number,
): number {
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

function markSubtreeLayoutSeen(node: Node): void {
  for (const child of node.children) {
    (child as Node)["_hasNewLayout"] = true;
    markSubtreeLayoutSeen(child);
  }
}

function countNodes(node: Node): number {
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
 * Child layout information for flex distribution.
 */
interface ChildLayout {
  node: Node;
  mainSize: number;
  baseSize: number; // Original base size before flex distribution (for weighted shrink)
  mainMargin: number;
  flexGrow: number;
  flexShrink: number;
  minMain: number;
  maxMain: number;
}

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
function distributeFlexSpace(
  children: ChildLayout[],
  freeSpace: number,
): void {
  const isGrowing = freeSpace > 0;
  const absoluteSpace = Math.abs(freeSpace);

  // Calculate total flex factor for children that can participate
  // For shrink: use baseSize * flexShrink (weighted by item size per spec)
  // For grow: use flexGrow directly
  let totalFlex = children.reduce((sum, c) => {
    if (isGrowing) {
      return c.mainSize < c.maxMain ? sum + c.flexGrow : sum;
    }
    // Shrink weighted by base size per CSS spec
    const scaledShrink = c.flexShrink * c.baseSize;
    return c.mainSize > c.minMain ? sum + scaledShrink : sum;
  }, 0);

  if (totalFlex === 0) return;

  let remaining = absoluteSpace;

  // Iterate until remaining space is negligible or no more flex items
  while (remaining > EPSILON_FLOAT && totalFlex > 0) {
    const amountPerFlex = remaining / totalFlex;
    let distributed = 0;

    for (const c of children) {
      // For shrink, use scaled factor (baseSize * flexShrink)
      const flexFactor = isGrowing ? c.flexGrow : c.flexShrink * c.baseSize;
      const limit = isGrowing ? c.maxMain : c.minMain;

      if (flexFactor > 0) {
        const canParticipate = isGrowing
          ? c.mainSize < c.maxMain
          : c.mainSize > c.minMain;

        if (canParticipate) {
          let delta = flexFactor * amountPerFlex;

          // Cap at limit
          if (isGrowing) {
            if (c.mainSize + delta > limit) {
              delta = limit - c.mainSize;
              totalFlex -= flexFactor; // Remove from next iteration
            }
            c.mainSize += delta;
          } else {
            if (c.mainSize - delta < limit) {
              delta = c.mainSize - limit;
              totalFlex -= flexFactor; // Remove from next iteration
            }
            c.mainSize -= delta;
          }

          distributed += delta;
        }
      }
    }

    remaining -= distributed;
    if (distributed < EPSILON_FLOAT) break;
  }
}

/**
 * Compute layout for a node tree.
 */
function computeLayout(
  root: Node,
  availableWidth: number,
  availableHeight: number,
): void {
  layoutNode(root, availableWidth, availableHeight, 0, 0);
}

/**
 * Layout a node and its children.
 */
function layoutNode(
  node: Node,
  availableWidth: number,
  availableHeight: number,
  offsetX: number,
  offsetY: number,
): void {
  debug('layoutNode called: availW=%d, availH=%d, offsetX=%d, offsetY=%d, children=%d', availableWidth, availableHeight, offsetX, offsetY, node.children.length);
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
  // When available dimension is NaN (unconstrained), auto-sized nodes use NaN
  // and will be sized by shrink-wrap logic based on children
  let nodeWidth: number;
  if (style.width.unit === C.UNIT_POINT) {
    nodeWidth = style.width.value;
  } else if (style.width.unit === C.UNIT_PERCENT) {
    nodeWidth = availableWidth * (style.width.value / 100);
  } else if (Number.isNaN(availableWidth)) {
    // Unconstrained: use NaN to signal shrink-wrap (will be computed from children)
    nodeWidth = NaN;
  } else {
    nodeWidth = availableWidth - marginLeft - marginRight;
  }
  if (!Number.isNaN(availableWidth)) {
    nodeWidth = applyMinMax(
      nodeWidth,
      style.minWidth,
      style.maxWidth,
      availableWidth,
    );
  }

  let nodeHeight: number;
  if (style.height.unit === C.UNIT_POINT) {
    nodeHeight = style.height.value;
  } else if (style.height.unit === C.UNIT_PERCENT) {
    nodeHeight = availableHeight * (style.height.value / 100);
  } else if (Number.isNaN(availableHeight)) {
    // Unconstrained: use NaN to signal shrink-wrap (will be computed from children)
    nodeHeight = NaN;
  } else {
    nodeHeight = availableHeight - marginTop - marginBottom;
  }
  if (!Number.isNaN(availableHeight)) {
    nodeHeight = applyMinMax(
      nodeHeight,
      style.minHeight,
      style.maxHeight,
      availableHeight,
    );
  }

  // Content area (inside border and padding)
  // When node dimensions are NaN (unconstrained), content dimensions are also NaN
  const innerLeft = borderLeft + paddingLeft;
  const innerTop = borderTop + paddingTop;
  const innerRight = borderRight + paddingRight;
  const innerBottom = borderBottom + paddingBottom;
  const contentWidth = Number.isNaN(nodeWidth) ? NaN : Math.max(0, nodeWidth - innerLeft - innerRight);
  const contentHeight = Number.isNaN(nodeHeight) ? NaN : Math.max(0, nodeHeight - innerTop - innerBottom);

  // Handle measure function (text nodes)
  if (node.hasMeasureFunc() && node.children.length === 0) {
    const measureFunc = node.measureFunc!;
    // For unconstrained dimensions (NaN), treat as auto-sizing
    const widthIsAuto = style.width.unit === C.UNIT_AUTO || style.width.unit === C.UNIT_UNDEFINED || Number.isNaN(nodeWidth);
    const heightIsAuto = style.height.unit === C.UNIT_AUTO || style.height.unit === C.UNIT_UNDEFINED || Number.isNaN(nodeHeight);
    const widthMode = widthIsAuto ? C.MEASURE_MODE_AT_MOST : C.MEASURE_MODE_EXACTLY;
    const heightMode = heightIsAuto ? C.MEASURE_MODE_UNDEFINED : C.MEASURE_MODE_EXACTLY;

    // For unconstrained width, use a large value; measureFunc should return intrinsic size
    const measureWidth = Number.isNaN(contentWidth) ? Infinity : contentWidth;
    const measureHeight = Number.isNaN(contentHeight) ? Infinity : contentHeight;

    const measured = measureFunc(
      measureWidth,
      widthMode,
      measureHeight,
      heightMode,
    );

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
  const relativeChildren = node.children.filter(
    (c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE,
  );
  const absoluteChildren = node.children.filter(
    (c) => c.style.positionType === C.POSITION_TYPE_ABSOLUTE,
  );

  // Flex layout for relative children
  debug('layoutNode: node.children=%d, relativeChildren=%d, absolute=%d', node.children.length, relativeChildren.length, absoluteChildren.length);
  if (relativeChildren.length > 0) {
    const isRow =
      style.flexDirection === C.FLEX_DIRECTION_ROW ||
      style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE;
    const isReverse =
      style.flexDirection === C.FLEX_DIRECTION_ROW_REVERSE ||
      style.flexDirection === C.FLEX_DIRECTION_COLUMN_REVERSE;

    const mainAxisSize = isRow ? contentWidth : contentHeight;
    const crossAxisSize = isRow ? contentHeight : contentWidth;
    const mainGap = isRow ? style.gap[0] : style.gap[1];

    // Prepare child layout info

    const children: ChildLayout[] = [];
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
      } else if (cs.flexBasis.unit === C.UNIT_PERCENT) {
        baseSize = mainAxisSize * (cs.flexBasis.value / 100);
      } else {
        const sizeVal = isRow ? cs.width : cs.height;
        if (sizeVal.unit === C.UNIT_POINT) {
          baseSize = sizeVal.value;
        } else if (sizeVal.unit === C.UNIT_PERCENT) {
          baseSize = mainAxisSize * (sizeVal.value / 100);
        } else if (child.hasMeasureFunc() && cs.flexGrow === 0) {
          // For auto-sized children with measureFunc but no flexGrow,
          // pre-measure to get intrinsic size for justify-content calculation
          const crossMargin = isRow
            ? resolveValue(cs.margin[1], crossAxisSize) +
              resolveValue(cs.margin[3], crossAxisSize)
            : resolveValue(cs.margin[0], crossAxisSize) +
              resolveValue(cs.margin[2], crossAxisSize);
          const availCross = crossAxisSize - crossMargin;
          const measured = child.measureFunc!(
            mainAxisSize,
            C.MEASURE_MODE_AT_MOST,
            availCross,
            C.MEASURE_MODE_UNDEFINED,
          );
          baseSize = isRow ? measured.width : measured.height;
        } else {
          // For auto-sized children without measureFunc, use padding + border as minimum
          // This ensures elements with only padding still have proper size
          const childPadding = isRow
            ? resolveValue(cs.padding[0], mainAxisSize) + resolveValue(cs.padding[2], mainAxisSize)
            : resolveValue(cs.padding[1], mainAxisSize) + resolveValue(cs.padding[3], mainAxisSize);
          const childBorder = isRow
            ? cs.border[0] + cs.border[2]
            : cs.border[1] + cs.border[3];
          baseSize = childPadding + childBorder;
        }
      }

      // Min/max on main axis
      const minVal = isRow ? cs.minWidth : cs.minHeight;
      const maxVal = isRow ? cs.maxWidth : cs.maxHeight;
      const minMain =
        minVal.unit !== C.UNIT_UNDEFINED
          ? resolveValue(minVal, mainAxisSize)
          : 0;
      const maxMain =
        maxVal.unit !== C.UNIT_UNDEFINED
          ? resolveValue(maxVal, mainAxisSize)
          : Infinity;

      children.push({
        node: child,
        mainSize: baseSize,
        baseSize, // Store original for weighted shrink calculation
        mainMargin,
        flexGrow: cs.flexGrow,
        flexShrink: cs.flexShrink,
        minMain,
        maxMain,
      });

      totalBaseMain += baseSize + mainMargin;
    }

    // Calculate gaps
    const totalGaps =
      relativeChildren.length > 1 ? mainGap * (relativeChildren.length - 1) : 0;
    const freeSpace = mainAxisSize - totalBaseMain - totalGaps;

    // Distribute free space using grow or shrink factors
    // BUT only if the main axis is constrained.
    // When unconstrained (NaN available size), children keep their base sizes
    // and the container will shrink-wrap to fit.
    const mainAxisUnconstrained = isRow ? Number.isNaN(availableWidth) : Number.isNaN(availableHeight);
    if (!mainAxisUnconstrained) {
      distributeFlexSpace(children, freeSpace);
    }

    // Apply min/max constraints to final sizes
    for (const c of children) {
      c.mainSize = Math.max(c.minMain, Math.min(c.maxMain, c.mainSize));
    }

    // Calculate final used space and justify-content
    const usedMain =
      children.reduce((sum, c) => sum + c.mainSize + c.mainMargin, 0) +
      totalGaps;
    // For auto-sized containers, there's no remaining space to justify
    // The container will shrink-wrap to content
    const mainDimStyle = isRow ? style.width : style.height;
    const mainIsAuto = mainDimStyle.unit === C.UNIT_AUTO || mainDimStyle.unit === C.UNIT_UNDEFINED;
    const remainingSpace = mainIsAuto ? 0 : Math.max(0, mainAxisSize - usedMain);

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

    // Round main sizes to get integer widths for gap calculation
    // This ensures consistent gaps by rounding sizes before positioning
    for (const c of children) {
      c.mainSize = Math.round(c.mainSize);
    }

    // Position and layout children
    // For reverse directions, start from the END of the container
    let mainPos = isReverse ? mainAxisSize - startOffset : startOffset;

    debug('positioning children: isRow=%s, startOffset=%d, relativeChildren=%d, isReverse=%s', isRow, startOffset, relativeChildren.length, isReverse);

    for (let i = 0; i < children.length; i++) {
      const c = children[i]!
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
      let childCrossSize: number;
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
      } else if (crossDim.unit === C.UNIT_PERCENT) {
        // Percent of PARENT's cross axis (not available size)
        childCrossSize = crossAxisSize * (crossDim.value / 100);
      } else if (parentHasDefiniteCross) {
        // We have a definite cross size - use it (stretch fills, auto uses available space)
        childCrossSize = crossAxisSize - crossMargin;
      } else {
        // No definite cross size - use NaN to signal shrink-wrap behavior
        childCrossSize = NaN;
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
      let effectiveMainSize: number;
      if (hasFlexGrow) {
        effectiveMainSize = childMainSize;
      } else if (mainIsAuto) {
        // Child is auto: use flex-computed size which includes padding/border minimum
        effectiveMainSize = childMainSize;
      } else {
        effectiveMainSize = childMainSize;
      }

      let childWidth = isRow ? effectiveMainSize : childCrossSize;
      let childHeight = isRow ? childCrossSize : effectiveMainSize;

      // Only use measure function for intrinsic sizing when flexGrow is NOT set
      // When flexGrow > 0, the flex algorithm determines size, not the content
      const shouldMeasure = child.hasMeasureFunc() && child.children.length === 0 && !hasFlexGrow;
      if (shouldMeasure) {
        const widthAuto =
          cs.width.unit === C.UNIT_AUTO || cs.width.unit === C.UNIT_UNDEFINED;
        const heightAuto =
          cs.height.unit === C.UNIT_AUTO || cs.height.unit === C.UNIT_UNDEFINED;

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

          const measured = child.measureFunc!(
            availW,
            widthMode,
            availH,
            heightMode,
          );

          // For measure function nodes without flexGrow, intrinsic size takes precedence
          if (widthAuto) {
            childWidth = measured.width;
          }
          if (heightAuto) {
            childHeight = measured.height;
          }
        }
      }

      // Child position within content area
      // For reverse directions, position from mainPos - childSize, otherwise from mainPos
      let childX: number;
      let childY: number;
      if (isReverse) {
        if (isRow) {
          childX = mainPos - childMainSize - childMarginRight;
          childY = childMarginTop;
        } else {
          childX = childMarginLeft;
          childY = mainPos - childMainSize - childMarginBottom;
        }
      } else {
        childX = isRow ? mainPos + childMarginLeft : childMarginLeft;
        childY = isRow ? childMarginTop : mainPos + childMarginTop;
      }

      // Calculate child's actual position
      const childLeft = Math.round(offsetX + marginLeft + innerLeft + childX);
      const childTop = Math.round(offsetY + marginTop + innerTop + childY);

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
      layoutNode(child, passWidthToChild, passHeightToChild, childLeft, childTop);

      // Set this child's layout - override what layoutNode computed
      // UNLESS the child has auto size AND no flexGrow (shrink-wrap behavior)
      // For auto-sized children without measureFunc, let layoutNode determine the size
      const hasMeasure = child.hasMeasureFunc() && child.children.length === 0;
      if (!mainIsAuto || hasFlexGrow || hasMeasure) {
        if (isRow) {
          child.layout.width = Math.round(childWidth);
        } else {
          child.layout.height = Math.round(childHeight);
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
      const shouldOverrideCross = !crossIsAuto || (!parentCrossIsAuto && alignment === C.ALIGN_STRETCH);
      if (shouldOverrideCross) {
        if (isRow) {
          child.layout.height = Math.round(childHeight);
        } else {
          child.layout.width = Math.round(childWidth);
        }
      }
      // Store RELATIVE position (within parent's content area), not absolute
      // This matches Yoga's behavior where getComputedLeft/Top return relative positions
      // Use floor for positions to match Yoga's rounding strategy for fractional spacing
      child.layout.left = Math.floor(innerLeft + childX);
      child.layout.top = Math.floor(innerTop + childY);

      // Apply position offsets for RELATIVE and STATIC positioned children
      // This shifts the visual position without affecting layout flow
      // In Yoga, both static and relative positions respect insets
      if (cs.positionType === C.POSITION_TYPE_RELATIVE || cs.positionType === C.POSITION_TYPE_STATIC) {
        const relLeftPos = cs.position[0];
        const relTopPos = cs.position[1];
        const relRightPos = cs.position[2];
        const relBottomPos = cs.position[3];

        // Left offset (takes precedence over right)
        if (relLeftPos.unit !== C.UNIT_UNDEFINED) {
          child.layout.left += Math.round(resolveValue(relLeftPos, contentWidth));
        } else if (relRightPos.unit !== C.UNIT_UNDEFINED) {
          child.layout.left -= Math.round(resolveValue(relRightPos, contentWidth));
        }

        // Top offset (takes precedence over bottom)
        if (relTopPos.unit !== C.UNIT_UNDEFINED) {
          child.layout.top += Math.round(resolveValue(relTopPos, contentHeight));
        } else if (relBottomPos.unit !== C.UNIT_UNDEFINED) {
          child.layout.top -= Math.round(resolveValue(relBottomPos, contentHeight));
        }
      }

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
      } else if (hasAutoStartMargin) {
        // Auto start margin: push to end
        crossOffset = availableCrossSpace;
      } else if (hasAutoEndMargin) {
        // Auto end margin: stay at start (crossOffset = 0)
        crossOffset = 0;
      } else {
        // No auto margins: use alignment
        switch (alignment) {
          case C.ALIGN_FLEX_END:
            crossOffset = availableCrossSpace;
            break;
          case C.ALIGN_CENTER:
            crossOffset = availableCrossSpace / 2;
            break;
        }
      }

      if (crossOffset > 0) {
        if (isRow) {
          child.layout.top += Math.round(crossOffset);
        } else {
          child.layout.left += Math.round(crossOffset);
        }
      }

      // Advance main position - add gap only between items, not after the last one
      // Use actual computed size, not the flex-computed mainSize (which may be 0 for measure nodes)
      const actualMainSize = isRow ? childWidth : childHeight;
      debug('  child %d: mainPos=%d → top=%d (actualMainSize=%d)', i, mainPos, child.layout.top, actualMainSize);
      if (isReverse) {
        mainPos -= actualMainSize + c.mainMargin;
        if (i < children.length - 1) {
          mainPos -= itemSpacing;
        }
      } else {
        mainPos += actualMainSize + c.mainMargin;
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
      actualUsedMain += childMainSize + c.mainMargin;
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
    let maxCrossSize = 0;
    for (const c of children) {
      const childCross = isRow ? c.node.layout.height : c.node.layout.width;
      const childMargin = isRow
        ? resolveValue(c.node.style.margin[1], contentHeight) +
          resolveValue(c.node.style.margin[3], contentHeight)
        : resolveValue(c.node.style.margin[0], contentWidth) +
          resolveValue(c.node.style.margin[2], contentWidth);
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

  // Set this node's layout
  layout.width = Math.round(nodeWidth);
  layout.height = Math.round(nodeHeight);
  layout.left = Math.round(offsetX + marginLeft);
  layout.top = Math.round(offsetY + marginTop);

  // Apply position offsets for STATIC positioned elements
  // In Yoga, static position still respects position insets (left/top/right/bottom)
  if (style.positionType === C.POSITION_TYPE_STATIC) {
    const leftPos = style.position[0];
    const topPos = style.position[1];
    const rightPos = style.position[2];
    const bottomPos = style.position[3];

    // Left takes precedence over right
    if (leftPos.unit !== C.UNIT_UNDEFINED) {
      layout.left += Math.round(resolveValue(leftPos, availableWidth));
    } else if (rightPos.unit !== C.UNIT_UNDEFINED) {
      layout.left -= Math.round(resolveValue(rightPos, availableWidth));
    }

    // Top takes precedence over bottom
    if (topPos.unit !== C.UNIT_UNDEFINED) {
      layout.top += Math.round(resolveValue(topPos, availableHeight));
    } else if (bottomPos.unit !== C.UNIT_UNDEFINED) {
      layout.top -= Math.round(resolveValue(bottomPos, availableHeight));
    }
  }

  // Layout absolute children - handle left/right/top/bottom offsets
  for (const child of absoluteChildren) {
    const cs = child.style;
    const childMarginLeft = resolveValue(cs.margin[0], nodeWidth);
    const childMarginTop = resolveValue(cs.margin[1], nodeHeight);
    const childMarginRight = resolveValue(cs.margin[2], nodeWidth);
    const childMarginBottom = resolveValue(cs.margin[3], nodeHeight);

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

    // Calculate available size for absolute child
    // Content area = nodeWidth/Height minus inner spacing (border + padding)
    const contentW = nodeWidth - innerLeft - innerRight;
    const contentH = nodeHeight - innerTop - innerBottom;

    // Determine child width - if both left and right set with auto width, stretch
    let childAvailWidth = contentW;
    const widthIsAuto = cs.width.unit === C.UNIT_AUTO || cs.width.unit === C.UNIT_UNDEFINED;
    if (widthIsAuto && hasLeft && hasRight) {
      childAvailWidth = contentW - leftOffset - rightOffset - childMarginLeft - childMarginRight;
    }

    // Determine child height - if both top and bottom set with auto height, stretch
    let childAvailHeight = contentH;
    const heightIsAuto = cs.height.unit === C.UNIT_AUTO || cs.height.unit === C.UNIT_UNDEFINED;
    if (heightIsAuto && hasTop && hasBottom) {
      childAvailHeight = contentH - topOffset - bottomOffset - childMarginTop - childMarginBottom;
    }

    // Compute child position
    let childX = childMarginLeft + leftOffset;
    let childY = childMarginTop + topOffset;

    // First, layout the child to get its dimensions
    layoutNode(
      child,
      Math.max(0, childAvailWidth),
      Math.max(0, childAvailHeight),
      layout.left + innerLeft + childX,
      layout.top + innerTop + childY,
    );

    // Now compute final position based on right/bottom if left/top not set
    const childWidth = child.layout.width;
    const childHeight = child.layout.height;

    if (!hasLeft && hasRight) {
      // Position from right edge
      childX = contentW - rightOffset - childMarginRight - childWidth;
    } else if (hasLeft && hasRight && widthIsAuto) {
      // Stretch width already handled above
      child.layout.width = Math.round(childAvailWidth);
    }

    if (!hasTop && hasBottom) {
      // Position from bottom edge
      childY = contentH - bottomOffset - childMarginBottom - childHeight;
    } else if (hasTop && hasBottom && heightIsAuto) {
      // Stretch height already handled above
      child.layout.height = Math.round(childAvailHeight);
    }

    // Set final position (relative to container content area)
    child.layout.left = Math.round(innerLeft + childX);
    child.layout.top = Math.round(innerTop + childY);
  }
}

/**
 * Resolve a Value to a number given the available size.
 */
function resolveValue(value: Value, availableSize: number): number {
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
function applyMinMax(
  size: number,
  min: Value,
  max: Value,
  available: number,
): number {
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
