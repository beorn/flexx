#!/usr/bin/env bun
/**
 * Test dirty flag incremental layout
 */

import { Node, FLEX_DIRECTION_COLUMN, DIRECTION_LTR } from "../src/index.js"

function createDeepTree(depth: number): Node {
  const root = Node.create()
  root.setWidth(1000)
  root.setHeight(1000)

  let current = root
  for (let i = 0; i < depth; i++) {
    const child = Node.create()
    child.setFlexGrow(1)
    current.insertChild(child, 0)
    current = child
  }

  return root
}

console.log("=== Dirty Flag Test ===\n")

const tree = createDeepTree(10)

// First layout
console.log("First layout (dirty)...")
let start = performance.now()
tree.calculateLayout(1000, 1000, DIRECTION_LTR)
let elapsed = performance.now() - start
console.log(`  Took ${elapsed.toFixed(2)}ms`)
console.log(`  isDirty after: ${tree.isDirty()}`)

// Second layout (should skip)
console.log("\nSecond layout (should skip - not dirty)...")
start = performance.now()
tree.calculateLayout(1000, 1000, DIRECTION_LTR)
elapsed = performance.now() - start
console.log(`  Took ${elapsed.toFixed(2)}ms`)
console.log(`  isDirty after: ${tree.isDirty()}`)

// Mark dirty and re-layout
console.log("\nMark dirty and re-layout...")
tree.markDirty()
console.log(`  isDirty after markDirty: ${tree.isDirty()}`)
start = performance.now()
tree.calculateLayout(1000, 1000, DIRECTION_LTR)
elapsed = performance.now() - start
console.log(`  Took ${elapsed.toFixed(2)}ms`)

// Change a property and re-layout
const leaf = tree.getChild(0)!.getChild(0)!
console.log("\nChange leaf property (should mark dirty)...")
leaf.setWidth(50)
console.log(`  root isDirty after setWidth: ${tree.isDirty()}`)
start = performance.now()
tree.calculateLayout(1000, 1000, DIRECTION_LTR)
elapsed = performance.now() - start
console.log(`  Took ${elapsed.toFixed(2)}ms`)
