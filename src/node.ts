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

  static create(): Node {
    return new Node();
  }

  // ============================================================================
  // Tree Operations
  // ============================================================================

  getChildCount(): number {
    return this._children.length;
  }

  getChild(index: number): Node | undefined {
    return this._children[index];
  }

  getParent(): Node | null {
    return this._parent;
  }

  insertChild(child: Node, index: number): void {
    if (child._parent !== null) {
      child._parent.removeChild(child);
    }
    child._parent = this;
    this._children.splice(index, 0, child);
    this.markDirty();
  }

  removeChild(child: Node): void {
    const index = this._children.indexOf(child);
    if (index !== -1) {
      this._children.splice(index, 1);
      child._parent = null;
      this.markDirty();
    }
  }

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

  // ============================================================================
  // Measure Function
  // ============================================================================

  setMeasureFunc(measureFunc: MeasureFunc): void {
    this._measureFunc = measureFunc;
    this.markDirty();
  }

  unsetMeasureFunc(): void {
    this._measureFunc = null;
    this.markDirty();
  }

  hasMeasureFunc(): boolean {
    return this._measureFunc !== null;
  }

  // ============================================================================
  // Dirty Tracking
  // ============================================================================

  isDirty(): boolean {
    return this._isDirty;
  }

  markDirty(): void {
    this._isDirty = true;
    if (this._parent !== null) {
      this._parent.markDirty();
    }
  }

  hasNewLayout(): boolean {
    return this._hasNewLayout;
  }

  markLayoutSeen(): void {
    this._hasNewLayout = false;
  }

  // ============================================================================
  // Layout Calculation
  // ============================================================================

  calculateLayout(
    width: number,
    height: number,
    _direction: number = C.DIRECTION_LTR,
  ): void {
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

  getComputedLeft(): number {
    return this._layout.left;
  }

  getComputedTop(): number {
    return this._layout.top;
  }

  getComputedWidth(): number {
    return this._layout.width;
  }

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

  setWidth(value: number): void {
    this._style.width = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setWidthPercent(value: number): void {
    this._style.width = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setWidthAuto(): void {
    this._style.width = { value: 0, unit: C.UNIT_AUTO };
    this.markDirty();
  }

  // ============================================================================
  // Height Setters
  // ============================================================================

  setHeight(value: number): void {
    this._style.height = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setHeightPercent(value: number): void {
    this._style.height = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setHeightAuto(): void {
    this._style.height = { value: 0, unit: C.UNIT_AUTO };
    this.markDirty();
  }

  // ============================================================================
  // Min/Max Size Setters
  // ============================================================================

  setMinWidth(value: number): void {
    this._style.minWidth = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setMinWidthPercent(value: number): void {
    this._style.minWidth = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setMinHeight(value: number): void {
    this._style.minHeight = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setMinHeightPercent(value: number): void {
    this._style.minHeight = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setMaxWidth(value: number): void {
    this._style.maxWidth = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setMaxWidthPercent(value: number): void {
    this._style.maxWidth = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setMaxHeight(value: number): void {
    this._style.maxHeight = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setMaxHeightPercent(value: number): void {
    this._style.maxHeight = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  // ============================================================================
  // Flex Setters
  // ============================================================================

  setFlexGrow(value: number): void {
    this._style.flexGrow = value;
    this.markDirty();
  }

  setFlexShrink(value: number): void {
    this._style.flexShrink = value;
    this.markDirty();
  }

  setFlexBasis(value: number): void {
    this._style.flexBasis = { value, unit: C.UNIT_POINT };
    this.markDirty();
  }

  setFlexBasisPercent(value: number): void {
    this._style.flexBasis = { value, unit: C.UNIT_PERCENT };
    this.markDirty();
  }

  setFlexBasisAuto(): void {
    this._style.flexBasis = { value: 0, unit: C.UNIT_AUTO };
    this.markDirty();
  }

  setFlexDirection(direction: number): void {
    this._style.flexDirection = direction;
    this.markDirty();
  }

  setFlexWrap(wrap: number): void {
    this._style.flexWrap = wrap;
    this.markDirty();
  }

  // ============================================================================
  // Alignment Setters
  // ============================================================================

  setAlignItems(align: number): void {
    this._style.alignItems = align;
    this.markDirty();
  }

  setAlignSelf(align: number): void {
    this._style.alignSelf = align;
    this.markDirty();
  }

  setAlignContent(align: number): void {
    this._style.alignContent = align;
    this.markDirty();
  }

  setJustifyContent(justify: number): void {
    this._style.justifyContent = justify;
    this.markDirty();
  }

  // ============================================================================
  // Spacing Setters
  // ============================================================================

  setPadding(edge: number, value: number): void {
    setEdgeValue(this._style.padding, edge, value, C.UNIT_POINT);
    this.markDirty();
  }

  setMargin(edge: number, value: number): void {
    setEdgeValue(this._style.margin, edge, value, C.UNIT_POINT);
    this.markDirty();
  }

  setBorder(edge: number, value: number): void {
    setEdgeBorder(this._style.border, edge, value);
    this.markDirty();
  }

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

  setPositionType(positionType: number): void {
    this._style.positionType = positionType;
    this.markDirty();
  }

  setPosition(edge: number, value: number): void {
    setEdgeValue(this._style.position, edge, value, C.UNIT_POINT);
    this.markDirty();
  }

  // ============================================================================
  // Other Setters
  // ============================================================================

  setDisplay(display: number): void {
    this._style.display = display;
    this.markDirty();
  }

  setOverflow(overflow: number): void {
    this._style.overflow = overflow;
    this.markDirty();
  }

  // ============================================================================
  // Style Getters
  // ============================================================================

  getWidth(): Value {
    return this._style.width;
  }

  getHeight(): Value {
    return this._style.height;
  }

  getMinWidth(): Value {
    return this._style.minWidth;
  }

  getMinHeight(): Value {
    return this._style.minHeight;
  }

  getMaxWidth(): Value {
    return this._style.maxWidth;
  }

  getMaxHeight(): Value {
    return this._style.maxHeight;
  }

  getFlexGrow(): number {
    return this._style.flexGrow;
  }

  getFlexShrink(): number {
    return this._style.flexShrink;
  }

  getFlexBasis(): Value {
    return this._style.flexBasis;
  }

  getFlexDirection(): number {
    return this._style.flexDirection;
  }

  getFlexWrap(): number {
    return this._style.flexWrap;
  }

  getAlignItems(): number {
    return this._style.alignItems;
  }

  getAlignSelf(): number {
    return this._style.alignSelf;
  }

  getAlignContent(): number {
    return this._style.alignContent;
  }

  getJustifyContent(): number {
    return this._style.justifyContent;
  }

  getPadding(edge: number): Value {
    return getEdgeValue(this._style.padding, edge);
  }

  getMargin(edge: number): Value {
    return getEdgeValue(this._style.margin, edge);
  }

  getBorder(edge: number): number {
    return getEdgeBorderValue(this._style.border, edge);
  }

  getPosition(edge: number): Value {
    return getEdgeValue(this._style.position, edge);
  }

  getPositionType(): number {
    return this._style.positionType;
  }

  getDisplay(): number {
    return this._style.display;
  }

  getOverflow(): number {
    return this._style.overflow;
  }

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
  let nodeWidth: number;
  if (style.width.unit === C.UNIT_POINT) {
    nodeWidth = style.width.value;
  } else if (style.width.unit === C.UNIT_PERCENT) {
    nodeWidth = availableWidth * (style.width.value / 100);
  } else {
    nodeWidth = availableWidth - marginLeft - marginRight;
  }
  nodeWidth = applyMinMax(
    nodeWidth,
    style.minWidth,
    style.maxWidth,
    availableWidth,
  );

  let nodeHeight: number;
  if (style.height.unit === C.UNIT_POINT) {
    nodeHeight = style.height.value;
  } else if (style.height.unit === C.UNIT_PERCENT) {
    nodeHeight = availableHeight * (style.height.value / 100);
  } else {
    nodeHeight = availableHeight - marginTop - marginBottom;
  }
  nodeHeight = applyMinMax(
    nodeHeight,
    style.minHeight,
    style.maxHeight,
    availableHeight,
  );

  // Content area (inside border and padding)
  const innerLeft = borderLeft + paddingLeft;
  const innerTop = borderTop + paddingTop;
  const innerRight = borderRight + paddingRight;
  const innerBottom = borderBottom + paddingBottom;
  const contentWidth = Math.max(0, nodeWidth - innerLeft - innerRight);
  const contentHeight = Math.max(0, nodeHeight - innerTop - innerBottom);

  // Handle measure function (text nodes)
  if (node.hasMeasureFunc() && node.children.length === 0) {
    const measureFunc = node.measureFunc!;
    const widthMode =
      style.width.unit === C.UNIT_AUTO
        ? C.MEASURE_MODE_AT_MOST
        : C.MEASURE_MODE_EXACTLY;
    const heightMode =
      style.height.unit === C.UNIT_AUTO
        ? C.MEASURE_MODE_UNDEFINED
        : C.MEASURE_MODE_EXACTLY;

    const measured = measureFunc(
      contentWidth,
      widthMode,
      contentHeight,
      heightMode,
    );

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
  const relativeChildren = node.children.filter(
    (c) => c.style.positionType !== C.POSITION_TYPE_ABSOLUTE,
  );
  const absoluteChildren = node.children.filter(
    (c) => c.style.positionType === C.POSITION_TYPE_ABSOLUTE,
  );

  // Flex layout for relative children
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
    interface ChildLayout {
      node: Node;
      mainSize: number;
      mainMargin: number;
      flexGrow: number;
      flexShrink: number;
      minMain: number;
      maxMain: number;
    }

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

    // Grow algorithm (based on flexbox.js SizeGrower)
    if (freeSpace > 0) {
      let totalGrow = children.reduce(
        (sum, c) => (c.mainSize < c.maxMain ? sum + c.flexGrow : sum),
        0,
      );
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
          if (distributed < 0.001) break;
        }
      }
    }
    // Shrink algorithm (based on flexbox.js SizeShrinker)
    else if (freeSpace < 0) {
      let totalShrink = children.reduce(
        (sum, c) => (c.mainSize > c.minMain ? sum + c.flexShrink : sum),
        0,
      );
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
          if (shrunk < 0.001) break;
        }
      }
    }

    // Apply min/max constraints to final sizes
    for (const c of children) {
      c.mainSize = Math.max(c.minMain, Math.min(c.maxMain, c.mainSize));
    }

    // Calculate final used space and justify-content
    const usedMain =
      children.reduce((sum, c) => sum + c.mainSize + c.mainMargin, 0) +
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
      const c = ordered[i]!;
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

      if (crossDim.unit === C.UNIT_POINT) {
        // Explicit cross size
        childCrossSize = crossDim.value;
      } else if (crossDim.unit === C.UNIT_PERCENT) {
        // Percent of PARENT's cross axis (not available size)
        childCrossSize = crossAxisSize * (crossDim.value / 100);
      } else if (alignment === C.ALIGN_STRETCH) {
        // Stretch to fill (minus margins)
        childCrossSize = crossAxisSize - crossMargin;
      } else {
        // Auto size - let child determine via layoutNode
        childCrossSize = crossAxisSize - crossMargin;
      }

      // Handle measure function for intrinsic sizing
      // Measure functions provide intrinsic sizes for text/content nodes
      let childWidth = isRow ? childMainSize : childCrossSize;
      let childHeight = isRow ? childCrossSize : childMainSize;

      if (child.hasMeasureFunc() && child.children.length === 0) {
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

          const measured = child.measureFunc!(
            availW,
            widthMode,
            availH,
            heightMode,
          );

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
        } else {
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

    layoutNode(
      child,
      nodeWidth,
      nodeHeight,
      layout.left + childMarginLeft,
      layout.top + childMarginTop,
    );

    // For absolute children, position is relative to container + margin
    child.layout.left = layout.left + childMarginLeft;
    child.layout.top = layout.top + childMarginTop;
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
