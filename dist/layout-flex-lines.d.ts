/**
 * Flex Line Breaking and Space Distribution
 *
 * Pre-allocated arrays for zero-allocation flex-wrap layout,
 * plus the line-breaking and flex-distribution algorithms.
 *
 * IMPORTANT: Module-level pre-allocated arrays are NOT reentrant.
 * Layout is single-threaded; concurrent calculateLayout() calls corrupt shared state.
 */
import type { Node } from "./node-zero.js";
/**
 * Maximum number of flex lines supported without dynamic allocation.
 * If a layout exceeds this, arrays grow automatically (rare edge case).
 * 32 lines covers virtually all real-world layouts while using minimal memory.
 */
export declare let MAX_FLEX_LINES: number;
/**
 * Pre-allocated array for line cross sizes (reused across layout passes).
 * Stores the computed cross-axis size of each flex line.
 */
export declare let _lineCrossSizes: Float64Array<ArrayBuffer>;
/**
 * Pre-allocated array for line cross offsets (reused across layout passes).
 * Stores the cross-axis position offset for each flex line.
 */
export declare let _lineCrossOffsets: Float64Array<ArrayBuffer>;
/**
 * Pre-allocated array for line lengths (number of children per line).
 * Uint16 supports up to 65535 children per line (more than sufficient).
 */
export declare let _lineLengths: Uint16Array<ArrayBuffer>;
/**
 * Pre-allocated 2D array for children per line.
 * Avoids O(n*m) iteration when processing multi-line flex layouts.
 * Each slot holds array of Node references for that line.
 */
export declare let _lineChildren: Node[][];
/**
 * Pre-allocated array for per-line justify-content start offsets.
 * Stores the main-axis starting position for each flex line.
 */
export declare let _lineJustifyStarts: Float64Array<ArrayBuffer>;
/**
 * Pre-allocated array for per-line item spacing (justify-content gaps).
 * Stores the spacing between items for each flex line.
 */
export declare let _lineItemSpacings: Float64Array<ArrayBuffer>;
/**
 * Grow pre-allocated line arrays if needed.
 * Called when a layout has more lines than current capacity.
 * This is rare (>32 lines) and acceptable as a one-time allocation.
 */
export declare function growLineArrays(needed: number): void;
/**
 * Break children into flex lines based on available main-axis space.
 * Zero-allocation: Sets child.flex.lineIndex directly, uses pre-allocated _lineStarts/_lineLengths.
 *
 * @param parent - Parent node whose children to wrap
 * @param relativeCount - Number of relative children (those with flex.relativeIndex >= 0)
 * @param mainAxisSize - Available main-axis space (NaN for unconstrained)
 * @param mainGap - Gap between items on main axis
 * @param wrap - Wrap mode (WRAP_NO_WRAP, WRAP_WRAP, WRAP_WRAP_REVERSE)
 * @returns Number of lines created
 */
export declare function breakIntoLines(parent: Node, relativeCount: number, mainAxisSize: number, mainGap: number, wrap: number): number;
/**
 * Distribute flex space for a single line of children.
 * Implements CSS Flexbox section 9.7: Resolving Flexible Lengths.
 *
 * Takes pre-collected children array to avoid O(n*m) iteration pattern.
 * Previously iterated through ALL parent.children 8 times per line.
 *
 * @param lineChildren - Pre-collected children for this line (from _lineChildren)
 * @param initialFreeSpace - Free space to distribute (positive=grow, negative=shrink)
 */
export declare function distributeFlexSpaceForLine(lineChildren: Node[], initialFreeSpace: number): void;
//# sourceMappingURL=layout-flex-lines.d.ts.map