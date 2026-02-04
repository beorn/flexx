#!/usr/bin/env bun
import * as Flexx from "../src/index.js"
import initYoga from "yoga-wasm-web"
import { readFileSync } from "node:fs"

const wasmPath = "./node_modules/yoga-wasm-web/dist/yoga.wasm"
const wasmBuffer = readFileSync(wasmPath)
const yoga = await initYoga(wasmBuffer)

function bench(name: string, fn: () => void, iterations = 500): number {
  for (let i = 0; i < 50; i++) fn()
  const start = performance.now()
  for (let i = 0; i < iterations; i++) fn()
  const ms = performance.now() - start
  const ops = (iterations / ms) * 1000
  console.log(name + ": " + ops.toFixed(0) + " ops/sec")
  return ops
}

function flexxTree(cards: number) {
  const root = Flexx.Node.create()
  root.setWidth(120)
  root.setHeight(40)
  root.setFlexDirection(Flexx.FLEX_DIRECTION_ROW)
  for (let col = 0; col < 3; col++) {
    const column = Flexx.Node.create()
    column.setFlexGrow(1)
    column.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN)
    for (let i = 0; i < cards; i++) {
      const card = Flexx.Node.create()
      card.setHeight(3)
      column.insertChild(card, i)
    }
    root.insertChild(column, col)
  }
  return root
}

function yogaTree(cards: number) {
  const root = yoga.Node.create()
  root.setWidth(120)
  root.setHeight(40)
  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW)
  for (let col = 0; col < 3; col++) {
    const column = yoga.Node.create()
    column.setFlexGrow(1)
    column.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)
    for (let i = 0; i < cards; i++) {
      const card = yoga.Node.create()
      card.setHeight(3)
      column.insertChild(card, i)
    }
    root.insertChild(column, col)
  }
  return root
}

console.log("\n=== Flexx Zero vs Yoga (WASM) ===\n")

console.log("Create + Layout 50 cards:")
const flexxOps = bench("  Flexx", () => {
  const tree = flexxTree(50)
  tree.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
})
const yogaOps = bench("  Yoga", () => {
  const tree = yogaTree(50)
  tree.calculateLayout(120, 40, yoga.DIRECTION_LTR)
})
const ratio = yogaOps / flexxOps
if (ratio > 1) {
  console.log("  → Yoga is " + ratio.toFixed(1) + "x faster\n")
} else {
  console.log("  → Flexx is " + (1 / ratio).toFixed(1) + "x faster\n")
}

console.log("Layout Only (with markDirty):")
const flexxPre = flexxTree(50)
const yogaPre = yogaTree(50)
// First layout to initialize
flexxPre.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
yogaPre.calculateLayout(120, 40, yoga.DIRECTION_LTR)
const flexxDirty = bench("  Flexx (markDirty)", () => {
  flexxPre.markDirty()
  flexxPre.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
})
console.log("")

console.log("Layout Only (unchanged - fingerprint test):")
const flexxLayout = bench("  Flexx (cached)", () => {
  flexxPre.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
})
const yogaLayout = bench("  Yoga (cached)", () => {
  yogaPre.calculateLayout(120, 40, yoga.DIRECTION_LTR)
})
const layoutRatio = yogaLayout / flexxLayout
if (layoutRatio > 1) {
  console.log("  → Yoga is " + layoutRatio.toFixed(1) + "x faster\n")
} else {
  console.log("  → Flexx is " + (1 / layoutRatio).toFixed(1) + "x faster\n")
}
