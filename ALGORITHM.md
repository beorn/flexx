# Flexx Layout Algorithm

Reference: [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js)

## Overview

The algorithm works in multiple passes:

1. **Setup**: Initialize axis sizes, reset shrunk flag
2. **Layout Main Axis**: Distribute items, apply grow/shrink
3. **Layout Cross Axis**: Apply alignment

## Grow Algorithm (from SizeGrower.ts)

```
Input: amount (extra space to distribute)

1. Calculate totalGrowAmount = sum of all flex-grow values for items not at max size
2. If no grow items, exit
3. Loop while amount remaining:
   a. amountPerGrow = remaining / totalGrowAmount
   b. For each item:
      - If item.grow > 0:
        - grow = item.grow * amountPerGrow
        - If item has maxSize and size >= maxSize: skip (fully grown)
        - If item has maxSize and size + grow > maxSize:
          - grow = maxSize - size (cap at max)
          - totalGrowAmount -= item.grow (remove from next iteration)
        - finalSize = size + grow
        - Resize item to finalSize
        - remaining -= grow
        - If remaining ~= 0: done
```

**Key insight**: The algorithm iterates multiple times to handle items that hit their max size.

## Shrink Algorithm (from SizeShrinker.ts)

```
Input: amount (space to remove)

1. Calculate totalShrinkAmount = sum of flex-shrink values for items above min size
2. If no shrinkable items, exit
3. Loop while amount remaining:
   a. amountPerShrink = remaining / totalShrinkAmount
   b. For each item:
      - If item.shrink > 0 and size > minSize:
        - shrink = item.shrink * amountPerShrink
        - maxShrink = size - minSize
        - If shrink >= maxShrink:
          - shrink = maxShrink (cap at min)
          - totalShrinkAmount -= item.shrink (remove from next iteration)
        - finalSize = size - shrink
        - Resize item to finalSize
        - remaining -= shrink
        - If remaining ~= 0: done
```

**Key insight**: Shrink is proportional to flex-shrink value only (NOT scaled by flex-basis like CSS spec).
This is a simplification from the full CSS spec but works for most cases.

## Line Layout Flow (from LineLayout.ts)

```
1. _setItemSizes():
   - If availableSpace > 0: grow items
   - If availableSpace < 0: shrink items

2. setItemPositions():
   - Apply justifyContent alignment

3. _calcLayoutInfo():
   - Calculate cross axis max size for line
```

## ItemPositioner (justify-content)

The ItemPositioner handles:

- flex-start (default): items at start
- flex-end: items at end
- center: items centered
- space-between: first/last at edges, rest evenly spaced
- space-around: equal space around each item
- space-evenly: equal space between and around items

## Key Differences from CSS Spec

1. **Shrink calculation**: Uses simple proportional shrink, not scaled by flex-basis
2. **Baseline alignment**: Implemented via `baselineFunc` callback (classic algorithm only)
3. **No wrap-reverse**: Not implemented
4. **No order property**: Items laid out in DOM order

## Implementation Notes for Flexx

To port this to Flexx's Yoga-compatible API:

1. Node.calculateLayout(width, height):
   - Set up container size
   - Call layout algorithm
   - Store results in computed layout

2. Grow/shrink iterate until space is distributed (handles max/min constraints)

3. Keep it simple - terminal UIs don't need full CSS spec compliance
