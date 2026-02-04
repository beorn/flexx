/**
 * Deep Nesting Diagnostic
 *
 * Measures layout timing at different nesting depths (fresh tree each time).
 */

import { Node, DIRECTION_LTR, FLEX_DIRECTION_COLUMN } from "../src/index.js"
import { layoutNodeCalls, resetLayoutStats } from "../src/layout-zero.js"

function createDeepTree(depth: number): Node {
  const root = Node.create()
  root.setWidth(100)
  root.setHeight(100)
  root.setFlexDirection(FLEX_DIRECTION_COLUMN)

  let current = root
  for (let i = 0; i < depth; i++) {
    const child = Node.create()
    child.setFlexGrow(1)
    current.insertChild(child, 0)
    current = child
  }

  return root
}

function benchmarkFresh(depth: number, iterations: number): number {
  // Warmup with fresh trees
  for (let i = 0; i < 10; i++) {
    const root = createDeepTree(depth)
    root.calculateLayout(100, 100, DIRECTION_LTR)
  }

  const start = performance.now()
  for (let i = 0; i < iterations; i++) {
    const root = createDeepTree(depth)
    root.calculateLayout(100, 100, DIRECTION_LTR)
  }
  const end = performance.now()
  return (end - start) / iterations
}

console.log("Deep Nesting Diagnostic (fresh tree each iteration)")
console.log("====================================================\n")
console.log("Depth | Nodes | Calls | ms/layout | µs/node | Scaling")
console.log("------|-------|-------|-----------|---------|--------")

let baseTimePerNode = 0

for (const depth of [5, 10, 20, 50, 100, 200]) {
  const nodeCount = depth + 1

  // Measure timing with fresh trees
  const msPerLayout = benchmarkFresh(depth, 1000)

  // Get call count from a single run
  resetLayoutStats()
  const root = createDeepTree(depth)
  root.calculateLayout(100, 100, DIRECTION_LTR)

  const usPerNode = (msPerLayout * 1000) / nodeCount

  if (depth === 5) baseTimePerNode = usPerNode
  const scaling =
    baseTimePerNode > 0 ? (usPerNode / baseTimePerNode).toFixed(1) : "N/A"

  console.log(
    `${depth.toString().padStart(5)} | ${nodeCount.toString().padStart(5)} | ${layoutNodeCalls.toString().padStart(5)} | ${msPerLayout.toFixed(4).padStart(9)} | ${usPerNode.toFixed(2).padStart(7)} | ${String(scaling).padStart(6)}x`,
  )
}

console.log("\nIf Scaling grows with depth, we have O(n²) per-node cost.")
console.log("If Scaling is ~1x, we have O(n) total behavior.")
