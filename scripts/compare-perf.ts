#!/usr/bin/env bun
/**
 * Classic vs Zero-alloc performance comparison
 */

import * as Classic from "../src/index.js"
import * as Zero from "../src/index.js"

function bench(fn: () => void, iterations = 1000): number {
  for (let i = 0; i < 50; i++) fn() // warmup
  const start = performance.now()
  for (let i = 0; i < iterations; i++) fn()
  const elapsed = performance.now() - start
  return (iterations / elapsed) * 1000
}

function createKanban(engine: "classic" | "zero", cards: number) {
  const Node = engine === "classic" ? Classic.Node : Zero.Node
  const DIR_ROW =
    engine === "classic" ? Classic.FLEX_DIRECTION_ROW : Zero.FLEX_DIRECTION_ROW
  const DIR_COL =
    engine === "classic"
      ? Classic.FLEX_DIRECTION_COLUMN
      : Zero.FLEX_DIRECTION_COLUMN
  const GAP = engine === "classic" ? Classic.GUTTER_ALL : Zero.GUTTER_ALL

  const root = Node.create()
  root.setWidth(120)
  root.setHeight(40)
  root.setFlexDirection(DIR_ROW)
  root.setGap(GAP, 1)

  for (let col = 0; col < 3; col++) {
    const column = Node.create()
    column.setFlexGrow(1)
    column.setFlexDirection(DIR_COL)
    column.setGap(GAP, 1)
    for (let i = 0; i < cards; i++) {
      const card = Node.create()
      card.setHeight(3)
      column.insertChild(card, i)
    }
    root.insertChild(column, col)
  }
  return root
}

console.log("\n=== Classic vs Zero Performance ===\n")

console.log("Create + Layout:")
for (const cards of [10, 30, 50, 100]) {
  const totalNodes = 1 + 3 + 3 * cards
  const classic = bench(() => {
    const tree = createKanban("classic", cards)
    tree.calculateLayout(120, 40, Classic.DIRECTION_LTR)
  }, 500)
  const zero = bench(() => {
    const tree = createKanban("zero", cards)
    tree.calculateLayout(120, 40, Zero.DIRECTION_LTR)
  }, 500)
  const pct = ((zero / classic - 1) * 100).toFixed(1)
  const winner = zero > classic ? "Zero" : "Classic"
  console.log(
    `  ${cards} cards (${totalNodes} nodes): ${winner} ${Math.abs(Number(pct))}% faster`,
  )
}

console.log("\nLayout Only (pre-created tree):")
const classicTree = createKanban("classic", 50) as Classic.Node
const zeroTree = createKanban("zero", 50) as Zero.Node

const classicLayout = bench(() => {
  classicTree.markDirty()
  classicTree.calculateLayout(120, 40, Classic.DIRECTION_LTR)
}, 2000)
const zeroLayout = bench(() => {
  zeroTree.markDirty()
  zeroTree.calculateLayout(120, 40, Zero.DIRECTION_LTR)
}, 2000)
const layoutPct = ((zeroLayout / classicLayout - 1) * 100).toFixed(1)
const layoutWinner = zeroLayout > classicLayout ? "Zero" : "Classic"
console.log(
  `  50 cards: ${layoutWinner} ${Math.abs(Number(layoutPct))}% faster`,
)

console.log("\nRaw numbers (ops/sec):")
console.log(
  `  Create+Layout 50 cards: Classic=${bench(() => {
    createKanban("classic", 50).calculateLayout(120, 40, Classic.DIRECTION_LTR)
  }, 500).toFixed(0)}, Zero=${bench(() => {
    createKanban("zero", 50).calculateLayout(120, 40, Zero.DIRECTION_LTR)
  }, 500).toFixed(0)}`,
)
console.log(
  `  Layout-only 50 cards: Classic=${classicLayout.toFixed(0)}, Zero=${zeroLayout.toFixed(0)}`,
)
