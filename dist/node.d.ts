/**
 * Flexx Node
 *
 * Yoga-compatible Node class for flexbox layout.
 */
import { type Layout, type MeasureFunc, type Style, type Value } from "./types.js";
/**
 * A layout node in the flexbox tree.
 */
export declare class Node {
    private _parent;
    private _children;
    private _style;
    private _measureFunc;
    private _layout;
    private _isDirty;
    private _hasNewLayout;
    static create(): Node;
    getChildCount(): number;
    getChild(index: number): Node | undefined;
    getParent(): Node | null;
    insertChild(child: Node, index: number): void;
    removeChild(child: Node): void;
    free(): void;
    setMeasureFunc(measureFunc: MeasureFunc): void;
    unsetMeasureFunc(): void;
    hasMeasureFunc(): boolean;
    isDirty(): boolean;
    markDirty(): void;
    hasNewLayout(): boolean;
    markLayoutSeen(): void;
    calculateLayout(width: number, height: number, _direction?: number): void;
    getComputedLeft(): number;
    getComputedTop(): number;
    getComputedWidth(): number;
    getComputedHeight(): number;
    get children(): readonly Node[];
    get style(): Style;
    get layout(): Layout;
    get measureFunc(): MeasureFunc | null;
    setWidth(value: number): void;
    setWidthPercent(value: number): void;
    setWidthAuto(): void;
    setHeight(value: number): void;
    setHeightPercent(value: number): void;
    setHeightAuto(): void;
    setMinWidth(value: number): void;
    setMinWidthPercent(value: number): void;
    setMinHeight(value: number): void;
    setMinHeightPercent(value: number): void;
    setMaxWidth(value: number): void;
    setMaxWidthPercent(value: number): void;
    setMaxHeight(value: number): void;
    setMaxHeightPercent(value: number): void;
    setFlexGrow(value: number): void;
    setFlexShrink(value: number): void;
    setFlexBasis(value: number): void;
    setFlexBasisPercent(value: number): void;
    setFlexBasisAuto(): void;
    setFlexDirection(direction: number): void;
    setFlexWrap(wrap: number): void;
    setAlignItems(align: number): void;
    setAlignSelf(align: number): void;
    setAlignContent(align: number): void;
    setJustifyContent(justify: number): void;
    setPadding(edge: number, value: number): void;
    setMargin(edge: number, value: number): void;
    setBorder(edge: number, value: number): void;
    setGap(gutter: number, value: number): void;
    setPositionType(positionType: number): void;
    setPosition(edge: number, value: number): void;
    setDisplay(display: number): void;
    setOverflow(overflow: number): void;
    getWidth(): Value;
    getHeight(): Value;
    getMinWidth(): Value;
    getMinHeight(): Value;
    getMaxWidth(): Value;
    getMaxHeight(): Value;
    getFlexGrow(): number;
    getFlexShrink(): number;
    getFlexBasis(): Value;
    getFlexDirection(): number;
    getFlexWrap(): number;
    getAlignItems(): number;
    getAlignSelf(): number;
    getAlignContent(): number;
    getJustifyContent(): number;
    getPadding(edge: number): Value;
    getMargin(edge: number): Value;
    getBorder(edge: number): number;
    getPosition(edge: number): Value;
    getPositionType(): number;
    getDisplay(): number;
    getOverflow(): number;
    getGap(gutter: number): number;
}
//# sourceMappingURL=node.d.ts.map