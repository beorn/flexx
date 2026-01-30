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
  unit: number; // UNIT_UNDEFINED | UNIT_POINT | UNIT_PERCENT | UNIT_AUTO
}

/**
 * Measure function signature for intrinsic sizing.
 * Called by the layout algorithm to determine a node's natural size.
 */
export type MeasureFunc = (
  width: number,
  widthMode: number,
  height: number,
  heightMode: number,
) => { width: number; height: number };

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
  // Display
  display: number;

  // Position
  positionType: number;
  position: [Value, Value, Value, Value, Value, Value]; // [left, top, right, bottom, start, end]

  // Flex
  flexDirection: number;
  flexWrap: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: Value;

  // Alignment
  alignItems: number;
  alignSelf: number;
  alignContent: number;
  justifyContent: number;

  // Size
  width: Value;
  height: Value;
  minWidth: Value;
  minHeight: Value;
  maxWidth: Value;
  maxHeight: Value;

  // Spacing (per-edge: left, top, right, bottom, start, end)
  // Physical edges: [0]=left, [1]=top, [2]=right, [3]=bottom
  // Logical edges: [4]=start, [5]=end (resolved based on flex direction)
  margin: [Value, Value, Value, Value, Value, Value];
  padding: [Value, Value, Value, Value, Value, Value];
  border: [number, number, number, number]; // Border widths (always points)

  // Gap
  gap: [number, number]; // [column, row]

  // Overflow
  overflow: number;
}

/**
 * Create a default Value (undefined).
 */
export function createValue(value = 0, unit = 0): Value {
  return { value, unit };
}

/**
 * Create default style.
 */
export function createDefaultStyle(): Style {
  return {
    display: 0, // DISPLAY_FLEX
    positionType: 1, // POSITION_TYPE_RELATIVE
    position: [createValue(), createValue(), createValue(), createValue(), createValue(), createValue()],
    flexDirection: 0, // FLEX_DIRECTION_COLUMN (Yoga default, not CSS!)
    flexWrap: 0, // WRAP_NO_WRAP
    flexGrow: 0,
    flexShrink: 0, // Yoga native default (CSS uses 1)
    flexBasis: createValue(0, 3), // AUTO
    alignItems: 4, // ALIGN_STRETCH
    alignSelf: 0, // ALIGN_AUTO
    alignContent: 1, // ALIGN_FLEX_START
    justifyContent: 0, // JUSTIFY_FLEX_START
    width: createValue(0, 3), // AUTO
    height: createValue(0, 3), // AUTO
    minWidth: createValue(),
    minHeight: createValue(),
    maxWidth: createValue(),
    maxHeight: createValue(),
    margin: [createValue(), createValue(), createValue(), createValue(), createValue(), createValue()],
    padding: [createValue(), createValue(), createValue(), createValue(), createValue(), createValue()],
    border: [0, 0, 0, 0],
    gap: [0, 0],
    overflow: 0, // OVERFLOW_VISIBLE
  };
}
