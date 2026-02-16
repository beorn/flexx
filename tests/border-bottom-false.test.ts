import { test, expect } from "vitest"
import { Node, FLEX_DIRECTION_COLUMN, DIRECTION_LTR, EDGE_LEFT, EDGE_RIGHT, EDGE_TOP } from "../src/index.ts"

test("child with asymmetric border stretches to full parent width", () => {
  // Reproduce the overflow card layout:
  // Outer: width=49, column, no border
  // Inner: column, border left=1, right=1, top=1, bottom=0 (borderBottom=false)
  // BottomText: should stretch to fill parent width (49)

  const root = Node.create()
  root.setWidth(49)
  root.setFlexDirection(FLEX_DIRECTION_COLUMN)

  const inner = Node.create()
  inner.setFlexDirection(FLEX_DIRECTION_COLUMN)
  inner.setBorder(EDGE_LEFT, 1)
  inner.setBorder(EDGE_RIGHT, 1)
  inner.setBorder(EDGE_TOP, 1)
  // borderBottom = false -> no EDGE_BOTTOM border

  const textA = Node.create()
  textA.setHeight(1)
  const textB = Node.create()
  textB.setHeight(1)

  inner.insertChild(textA, 0)
  inner.insertChild(textB, 1)

  const bottomText = Node.create()
  bottomText.setHeight(1)

  root.insertChild(inner, 0)
  root.insertChild(bottomText, 1)

  root.calculateLayout(49, 30, DIRECTION_LTR)

  // Inner box should stretch to full parent width
  expect(inner.getComputedWidth()).toBe(49)
  expect(inner.getComputedLeft()).toBe(0)

  // Inner box height: 2 text lines + 1 top border = 3
  expect(inner.getComputedHeight()).toBe(3)

  // Bottom text should stretch to full parent width
  expect(bottomText.getComputedWidth()).toBe(49)
  expect(bottomText.getComputedLeft()).toBe(0)

  // TextA should be in content area: left=1 (border), width=47 (49-2 borders)
  expect(textA.getComputedLeft()).toBe(1) // inside left border
  expect(textA.getComputedWidth()).toBe(47) // content width
})
