/**
 * Flexx Types
 *
 * TypeScript interfaces for the flexbox layout engine.
 */
/**
 * A value with a unit (point, percent, or auto).
 */
export interface Value {
    value: number;
    unit: number;
}
/**
 * Measure function signature for intrinsic sizing.
 * Called by the layout algorithm to determine a node's natural size.
 */
export type MeasureFunc = (width: number, widthMode: number, height: number, heightMode: number) => {
    width: number;
    height: number;
};
/**
 * Computed layout result for a node.
 */
export interface Layout {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * Internal style properties for a node.
 */
export interface Style {
    display: number;
    positionType: number;
    position: [Value, Value, Value, Value, Value, Value];
    flexDirection: number;
    flexWrap: number;
    flexGrow: number;
    flexShrink: number;
    flexBasis: Value;
    alignItems: number;
    alignSelf: number;
    alignContent: number;
    justifyContent: number;
    width: Value;
    height: Value;
    minWidth: Value;
    minHeight: Value;
    maxWidth: Value;
    maxHeight: Value;
    aspectRatio: number;
    margin: [Value, Value, Value, Value, Value, Value];
    padding: [Value, Value, Value, Value, Value, Value];
    border: [number, number, number, number];
    gap: [number, number];
    overflow: number;
}
/**
 * Create a default Value (undefined).
 */
export declare function createValue(value?: number, unit?: number): Value;
/**
 * Create default style.
 */
export declare function createDefaultStyle(): Style;
//# sourceMappingURL=types.d.ts.map