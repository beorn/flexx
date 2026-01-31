# Yoga Compatibility Test Report

**Generated**: 2026-01-30
**Flexx Version**: 0.1.0
**Yoga Version**: 0.3.3 (yoga-wasm-web)

## Summary

| Metric | Value |
|--------|-------|
| Total Tests | 42 |
| Passed | 33 (79%) |
| Failed | 9 (21%) |

## Failing Tests by Category

### 1. AlignContent (5 failures) - **HIGH PRIORITY**

**Root Cause**: `alignContent` is not implemented in the layout algorithm.

The `alignContent` property controls how flex lines are distributed along the cross-axis when there's extra space. Flexx stores the value but does not apply it during layout.

| Test | Expected | Actual | Impact |
|------|----------|--------|--------|
| align-content-center | Lines centered at top=30,50 | Lines at top=0,20 | High - wrapped layouts broken |
| align-content-flex-end | Lines at bottom (top=60,80) | Lines at top=0,20 | High |
| align-content-space-between | Lines spread (top=0,80) | Lines at top=0,20 | High |
| align-content-space-around | Lines with space around (top=15,65) | Lines at top=0,20 | High |
| align-content-stretch | Lines stretch (top=0,50) | Lines at top=0,20 | Medium |

**Fix Complexity**: Medium
**Implementation Location**: `src/layout.ts` - after computing line cross sizes, apply `alignContent` to adjust `line.crossStart` values.

**Algorithm**:
```typescript
function applyAlignContent(lines: FlexLine[], crossAxisSize: number, alignContent: number) {
  const totalLineCrossSize = lines.reduce((sum, l) => sum + l.crossSize, 0);
  const freeSpace = crossAxisSize - totalLineCrossSize;

  switch (alignContent) {
    case ALIGN_CENTER:
      // Start at freeSpace/2, lines packed together
      break;
    case ALIGN_FLEX_END:
      // Start at freeSpace, lines packed together
      break;
    case ALIGN_SPACE_BETWEEN:
      // First at 0, last at end, even spacing between
      break;
    case ALIGN_SPACE_AROUND:
      // Even spacing around each line
      break;
    case ALIGN_STRETCH:
      // Expand line cross sizes to fill space
      break;
  }
}
```

---

### 2. FlexWrap (1 failure) - **HIGH PRIORITY**

**Test**: `wrap-reverse`

**Root Cause**: Line order is reversed, but cross-axis positioning is computed from top-down instead of bottom-up.

| Expected (Yoga) | Actual (Flexx) |
|-----------------|----------------|
| Line 1 (items 0,1): top=80 | Line 1 (items 0,1): top=20 |
| Line 2 (item 2): top=60 | Line 2 (item 2): top=0 |

When `wrap-reverse` is set:
- Lines should be laid out from bottom to top (cross-end to cross-start)
- The first line should be closest to cross-end
- Flexx reverses the line array but then lays out from top=0 downward

**Fix Complexity**: Low
**Implementation Location**: `src/layout.ts:breakIntoLines()` and cross-axis positioning logic

**Fix**:
After reversing lines, compute `lineCrossOffsets` starting from `crossAxisSize - lineCrossSize` and working backwards.

---

### 3. AbsolutePositioning (1 failure) - **MEDIUM PRIORITY**

**Test**: `absolute-centering` (auto margins on all sides)

**Root Cause**: Auto margins for absolute children are not distributing remaining space.

| Expected (Yoga) | Actual (Flexx) |
|-----------------|----------------|
| child at (25,25) centered | child at (0,0) top-left |

When an absolutely positioned child has:
- All position edges set to 0
- All margins set to auto
- Explicit width/height

The auto margins should consume the remaining space equally, centering the child.

**Fix Complexity**: Medium
**Implementation Location**: Absolute child positioning section of `calculateLayout`

**Algorithm**:
1. Compute available space: `containerSize - childSize - (position edges)`
2. Count auto margins per axis
3. Distribute available space equally among auto margins

---

### 4. PercentValues (1 failure) - **MEDIUM PRIORITY**

**Test**: `percent-nested`

**Root Cause**: Nested percentage resolution uses incorrect reference size.

| Expected (Yoga) | Actual (Flexx) |
|-----------------|----------------|
| Inner: 25x25 (50% of 50) | Inner: 13x13 (50% of 25?) |

In Yoga, percentage dimensions resolve against the parent's **content box** dimensions after layout.

Flexx appears to be:
- Either double-applying percentages
- Or resolving against a different reference size

**Fix Complexity**: Medium
**Implementation Location**: `resolveValue()` and the measure phase for percentage dimensions

---

## Passing Tests (28)

These categories have full compatibility:

1. **FlexWrap** (4/5)
   - wrap-basic
   - wrap-with-gap
   - wrap-with-flexgrow
   - wrap-column

2. **Gap** (4/4)
   - row-gap-only
   - column-gap-only
   - gap-with-flexgrow
   - gap-all

3. **AbsolutePositioning** (4/5)
   - absolute-with-padding
   - absolute-all-edges
   - absolute-percent-position
   - absolute-with-margin

4. **MinMaxDimensions** (5/5)
   - min-width-overrides-shrink
   - max-width-overrides-grow
   - min-max-percent
   - min-max-interaction
   - nested-min-max

5. **FlexShrink** (3/3)
   - shrink-with-basis
   - shrink-different-factors
   - shrink-zero-no-shrink

6. **FlexGrow** (3/3)
   - grow-with-fixed-sibling
   - grow-unequal
   - grow-with-basis

7. **NestedLayouts** (2/2)
   - nested-flex
   - mixed-constraints

8. **PercentValues** (2/3)
   - percent-margin
   - percent-padding

---

## Top 10 Highest-Impact Fixes

Ranked by frequency of use and impact on real-world layouts:

| Rank | Category | Issue | Effort | Impact |
|------|----------|-------|--------|--------|
| 1 | AlignContent | Not implemented at all | Medium | Critical for wrapped layouts |
| 2 | FlexWrap | wrap-reverse positioning | Low | Medium - less common feature |
| 3 | AbsolutePositioning | Auto margin centering | Medium | Common pattern for modals/dialogs |
| 4 | PercentValues | Nested percent resolution | Medium | Common in responsive layouts |
| 5 | EdgeCases | Overflow container height | Low | Low - rare edge case |

(5 distinct issues identified covering 9 failing tests)

---

## Recommended Fix Order

1. **AlignContent** - Highest impact, affects all wrapped multi-line layouts
2. **wrap-reverse** - Related to AlignContent, can be fixed together
3. **Absolute auto margins** - Common centering pattern
4. **Nested percents** - Edge case, less critical for TUI use cases

---

### 5. EdgeCases (1 failure) - **LOW PRIORITY**

**Test**: `overflow-no-shrink`

**Root Cause**: Container height auto-sizing differs when children overflow.

| Expected (Yoga) | Actual (Flexx) |
|-----------------|----------------|
| root height: 100 | root height: 50 |

When children have `flexShrink: 0` and overflow the container:
- Both engines position children correctly (at left 0, 50, 100)
- Yoga keeps container at specified height (100)
- Flexx shrinks container height to content height (50)

This may be related to how undefined/auto height is resolved when content overflows.

**Fix Complexity**: Low
**Impact**: Low - edge case with explicit shrink:0

---

## Known Intentional Differences

These are documented and acceptable:

1. **Shrink algorithm**: Flexx uses proportional shrink (by `flexShrink` only), not CSS spec's basis-weighted shrink (`flexShrink * flexBasis`). Testing showed this often produces identical results due to min-size constraints.

2. **RTL**: Not supported, documented limitation.

3. **Baseline alignment**: Not implemented, documented limitation.

---

## Test Coverage Summary

### Passing Tests (33/42)

| Category | Pass/Total | Notes |
|----------|------------|-------|
| FlexWrap | 4/5 | Only wrap-reverse fails |
| AlignContent | 1/6 | Only flex-start passes |
| AbsolutePositioning | 4/5 | Only auto-margin centering fails |
| MinMaxDimensions | 5/5 | Full compatibility |
| Gap | 4/4 | Full compatibility |
| FlexShrink | 3/3 | Full compatibility |
| FlexGrow | 3/3 | Full compatibility |
| NestedLayouts | 2/2 | Full compatibility |
| PercentValues | 2/3 | Nested percent fails |
| EdgeCases | 4/5 | Overflow container height differs |
| IntentionalDifferences | 1/1 | Documents known difference |

---

## Test Coverage Gaps

Additional scenarios to consider:

1. **Measure functions with wrapped content** - Text nodes in wrapped layouts
2. **Deeply nested percentages** (3+ levels)
3. **Absolute positioning within wrapped containers**
4. **Gap + alignContent interaction**
5. **Aspect ratio with constraints**
