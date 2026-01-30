/**
 * Flexx vs Yoga Comparison Benchmarks
 *
 * Compares layout performance between:
 * - Flexx (pure JavaScript)
 * - Yoga (WebAssembly via yoga-wasm-web)
 *
 * Run: bun bench (from flexx or monorepo root)
 */

import { bench, describe, beforeAll } from "vitest"
import * as Flexx from "../src/index.js"
import initYoga, { type Yoga } from "yoga-wasm-web"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

// ============================================================================
// Yoga Setup
// ============================================================================

let yoga: Yoga

const __dirname = dirname(fileURLToPath(import.meta.url))
const wasmPath = join(__dirname, "../node_modules/yoga-wasm-web/dist/yoga.wasm")

beforeAll(async () => {
  const wasmBuffer = readFileSync(wasmPath)
  yoga = await initYoga(wasmBuffer)
})

// ============================================================================
// Tree Generators - Flexx
// ============================================================================

function flexxFlatTree(nodeCount: number): Flexx.Node {
  const root = Flexx.Node.create()
  root.setWidth(1000)
  root.setHeight(1000)
  root.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN)

  for (let i = 0; i < nodeCount; i++) {
    const child = Flexx.Node.create()
    child.setHeight(10)
    child.setFlexGrow(1)
    root.insertChild(child, i)
  }

  return root
}

function flexxDeepTree(depth: number): Flexx.Node {
  const root = Flexx.Node.create()
  root.setWidth(1000)
  root.setHeight(1000)

  let current = root
  for (let i = 0; i < depth; i++) {
    const child = Flexx.Node.create()
    child.setFlexGrow(1)
    child.setPadding(Flexx.EDGE_LEFT, 1)
    current.insertChild(child, 0)
    current = child
  }

  return root
}

function flexxKanbanTree(cardsPerColumn: number): Flexx.Node {
  const root = Flexx.Node.create()
  root.setWidth(120)
  root.setHeight(40)
  root.setFlexDirection(Flexx.FLEX_DIRECTION_ROW)
  root.setGap(Flexx.GUTTER_ALL, 1)

  for (let col = 0; col < 3; col++) {
    const column = Flexx.Node.create()
    column.setFlexGrow(1)
    column.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN)
    column.setGap(Flexx.GUTTER_ALL, 1)

    const header = Flexx.Node.create()
    header.setHeight(1)
    column.insertChild(header, 0)

    for (let card = 0; card < cardsPerColumn; card++) {
      const cardNode = Flexx.Node.create()
      cardNode.setHeight(3)
      cardNode.setPadding(Flexx.EDGE_LEFT, 1)
      column.insertChild(cardNode, card + 1)
    }

    root.insertChild(column, col)
  }

  return root
}

// ============================================================================
// Tree Generators - Yoga
// ============================================================================

function yogaFlatTree(nodeCount: number) {
  const root = yoga.Node.create()
  root.setWidth(1000)
  root.setHeight(1000)
  root.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)

  for (let i = 0; i < nodeCount; i++) {
    const child = yoga.Node.create()
    child.setHeight(10)
    child.setFlexGrow(1)
    root.insertChild(child, i)
  }

  return root
}

function yogaDeepTree(depth: number) {
  const root = yoga.Node.create()
  root.setWidth(1000)
  root.setHeight(1000)

  let current = root
  for (let i = 0; i < depth; i++) {
    const child = yoga.Node.create()
    child.setFlexGrow(1)
    child.setPadding(yoga.EDGE_LEFT, 1)
    current.insertChild(child, 0)
    current = child
  }

  return root
}

function yogaKanbanTree(cardsPerColumn: number) {
  const root = yoga.Node.create()
  root.setWidth(120)
  root.setHeight(40)
  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW)
  root.setGap(yoga.GUTTER_ALL, 1)

  for (let col = 0; col < 3; col++) {
    const column = yoga.Node.create()
    column.setFlexGrow(1)
    column.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)
    column.setGap(yoga.GUTTER_ALL, 1)

    const header = yoga.Node.create()
    header.setHeight(1)
    column.insertChild(header, 0)

    for (let card = 0; card < cardsPerColumn; card++) {
      const cardNode = yoga.Node.create()
      cardNode.setHeight(3)
      cardNode.setPadding(yoga.EDGE_LEFT, 1)
      column.insertChild(cardNode, card + 1)
    }

    root.insertChild(column, col)
  }

  return root
}

// ============================================================================
// Benchmarks - Create + Layout (fair comparison)
// ============================================================================

describe("Flexx vs Yoga - Flat Hierarchy", () => {
  for (const nodeCount of [100, 500, 1000]) {
    bench(`Flexx: ${nodeCount} nodes - create + layout`, () => {
      const tree = flexxFlatTree(nodeCount)
      tree.calculateLayout(1000, 1000, Flexx.DIRECTION_LTR)
    })

    bench(`Yoga: ${nodeCount} nodes - create + layout`, () => {
      const tree = yogaFlatTree(nodeCount)
      tree.calculateLayout(1000, 1000, yoga.DIRECTION_LTR)
      tree.freeRecursive()
    })
  }
})

describe("Flexx vs Yoga - Deep Hierarchy", () => {
  for (const depth of [20, 50, 100]) {
    bench(`Flexx: ${depth} levels deep - create + layout`, () => {
      const tree = flexxDeepTree(depth)
      tree.calculateLayout(1000, 1000, Flexx.DIRECTION_LTR)
    })

    bench(`Yoga: ${depth} levels deep - create + layout`, () => {
      const tree = yogaDeepTree(depth)
      tree.calculateLayout(1000, 1000, yoga.DIRECTION_LTR)
      tree.freeRecursive()
    })
  }
})

describe("Flexx vs Yoga - Kanban (TUI Pattern)", () => {
  for (const cardsPerCol of [10, 50, 100]) {
    const totalNodes = 3 + 3 * (1 + cardsPerCol)

    bench(`Flexx: Kanban 3×${cardsPerCol} (~${totalNodes} nodes)`, () => {
      const tree = flexxKanbanTree(cardsPerCol)
      tree.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
    })

    bench(`Yoga: Kanban 3×${cardsPerCol} (~${totalNodes} nodes)`, () => {
      const tree = yogaKanbanTree(cardsPerCol)
      tree.calculateLayout(120, 40, yoga.DIRECTION_LTR)
      tree.freeRecursive()
    })
  }
})

// ============================================================================
// Benchmarks - Layout Only (pre-created trees)
// ============================================================================

describe("Flexx vs Yoga - Layout Only (no allocation)", () => {
  let flexxTree: Flexx.Node
  let yogaTree: ReturnType<typeof yogaKanbanTree>

  beforeAll(() => {
    flexxTree = flexxKanbanTree(50)
    yogaTree = yogaKanbanTree(50)
  })

  bench("Flexx: Kanban 3×50 - layout only", () => {
    flexxTree.markDirty()
    flexxTree.calculateLayout(120, 40, Flexx.DIRECTION_LTR)
  })

  bench("Yoga: Kanban 3×50 - layout only", () => {
    yogaTree.markDirty()
    yogaTree.calculateLayout(120, 40, yoga.DIRECTION_LTR)
  })
})
