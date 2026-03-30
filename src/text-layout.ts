/**
 * Text Layout Service — pluggable text measurement for Flexily.
 *
 * The TextLayoutService interface decouples text measurement from the layout engine.
 * Different backends handle different environments:
 * - MonospaceMeasurer: terminal (1 char = 1 cell)
 * - DeterministicTestMeasurer: tests/CI (fixed grapheme widths)
 * - PretextMeasurer: proportional fonts (Canvas measureText)
 *
 * See silvery-internal/design/v05-layout/pretext-integration.md for design rationale.
 */

/** Resolved text style — consumed by both measurement and painting. */
export interface ResolvedTextStyle {
  fontShorthand: string // e.g. "14px 'Inter', sans-serif"
  fontFamily: string
  fontSize: number
  fontWeight: number
  fontStyle: string
  lineHeight: number
}

/** Input for text preparation. */
export interface TextPrepareInput {
  text: string
  style: ResolvedTextStyle
  direction?: "auto" | "ltr" | "rtl"
  locale?: string
}

/** Intrinsic text sizes for flexbox min/max-content. */
export interface IntrinsicSizes {
  minContentWidth: number // longest unbreakable segment
  maxContentWidth: number // unwrapped total width
}

/** Constraints for text layout. */
export interface TextConstraints {
  maxWidth?: number
  maxHeight?: number
  maxLines?: number
  wrap?: "normal" | "anywhere" | "none"
  overflow?: "clip" | "ellipsis"
  shrinkWrap?: boolean
}

/** A single laid-out line of text. */
export interface TextLine {
  text: string
  width: number
  startIndex: number
  endIndex: number
}

/** Result of laying out prepared text at a specific width. */
export interface TextLayout {
  width: number
  height: number
  lineCount: number
  firstBaseline: number
  lastBaseline: number
  truncated: boolean
  lines?: readonly TextLine[]
}

/** Prepared text — measured and segmented, ready for layout at any width. */
export interface PreparedText {
  intrinsicSizes(): IntrinsicSizes
  layout(constraints: TextConstraints, options?: { includeLines?: boolean }): TextLayout
}

/** Pluggable text measurement backend. */
export interface TextLayoutService {
  prepare(input: TextPrepareInput): PreparedText
}
