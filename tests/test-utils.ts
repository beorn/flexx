/**
 * Test utilities for Flexily layout tests
 */
import { expect } from "vitest"
import { DIRECTION_LTR, Node } from "../src/index.js"

/**
 * Creates a root node, configures it, and calculates layout
 */
export function createAndLayoutRoot(width: number, height: number, direction: number = DIRECTION_LTR): Node {
  const root = Node.create()
  root.setWidth(width)
  root.setHeight(height)
  root.calculateLayout(width, height, direction)
  return root
}

/**
 * Layout bounds for assertions
 */
export interface LayoutBounds {
  left?: number
  top?: number
  width?: number
  height?: number
}

/**
 * Asserts computed layout bounds on a node
 */
export function expectLayout(node: Node | undefined, bounds: LayoutBounds): void {
  expect(node).toBeDefined()
  if (!node) return // unreachable after assertion, satisfies TypeScript
  if (bounds.left !== undefined) {
    expect(node.getComputedLeft()).toBe(bounds.left)
  }
  if (bounds.top !== undefined) {
    expect(node.getComputedTop()).toBe(bounds.top)
  }
  if (bounds.width !== undefined) {
    expect(node.getComputedWidth()).toBe(bounds.width)
  }
  if (bounds.height !== undefined) {
    expect(node.getComputedHeight()).toBe(bounds.height)
  }
}

/**
 * Asserts computed width on a node
 */
export function expectWidth(node: Node, width: number): void {
  expect(node.getComputedWidth()).toBe(width)
}

/**
 * Asserts computed height on a node
 */
export function expectHeight(node: Node, height: number): void {
  expect(node.getComputedHeight()).toBe(height)
}

/**
 * Creates a child node with fixed dimensions and inserts it at given index.
 *
 * Defaults `flexShrink: 0` (rigid sibling) so tests survive the Phase 6
 * `DEFAULT_PRESET` flip from `"yoga"` → `"css"`. Most layout tests want
 * children to keep their explicit width/height under flex distribution;
 * pass `flexShrink: 1` explicitly when shrinkable behavior is wanted.
 */
export function createChild(
  parent: Node,
  index: number,
  options: { width?: number; height?: number; flexGrow?: number; flexShrink?: number } = {},
): Node {
  const child = Node.create()
  if (options.width !== undefined) child.setWidth(options.width)
  if (options.height !== undefined) child.setHeight(options.height)
  if (options.flexGrow !== undefined) child.setFlexGrow(options.flexGrow)
  child.setFlexShrink(options.flexShrink ?? 0)
  parent.insertChild(child, index)
  return child
}
