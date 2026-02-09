/**
 * Compare Yoga vs Flexx behavior for overflow + flexGrow.
 * Bug: km-inkx.scroll-flexgrow
 *
 * Flexx intentionally diverges from Yoga for overflow:hidden/scroll containers:
 * - Yoga: overflow containers expand to full content size (flexShrink=0 default)
 * - Flexx: overflow containers shrink to fit parent (CSS spec §4.5 behavior)
 * - CSS spec: overflow != visible → automatic min-size = 0 → item can shrink
 */
import { describe, test, expect, beforeAll } from "vitest"
import * as Flexx from "../src/index.js"
import initYoga, { type Yoga } from "yoga-wasm-web"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

let yoga: Yoga
const __dirname = dirname(fileURLToPath(import.meta.url))
const wasmPath = join(__dirname, "../node_modules/yoga-wasm-web/dist/yoga.wasm")

beforeAll(async () => {
  const wasmBuffer = readFileSync(wasmPath)
  yoga = await initYoga(wasmBuffer)
})

describe("Yoga vs Flexx: overflow + flexGrow", () => {
  test("overflow:hidden — Flexx constrains, Yoga does not (intentional divergence)", () => {
    // Yoga
    const yRoot = yoga.Node.create()
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)
    yRoot.setHeight(10)
    yRoot.setWidth(80)

    const yContainer = yoga.Node.create()
    yContainer.setFlexGrow(1)
    yContainer.setOverflow(yoga.OVERFLOW_HIDDEN)

    for (let i = 0; i < 30; i++) {
      const yLine = yoga.Node.create()
      yLine.setHeight(1)
      yContainer.insertChild(yLine, i)
    }
    yRoot.insertChild(yContainer, 0)
    yRoot.calculateLayout(80, 10, yoga.DIRECTION_LTR)

    // Yoga does NOT constrain the overflow container (flexShrink=0 default)
    expect(yRoot.getComputedHeight()).toBe(10)
    expect(yContainer.getComputedHeight()).toBe(30)

    // Flexx
    const fRoot = Flexx.Node.create()
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN)
    fRoot.setHeight(10)
    fRoot.setWidth(80)

    const fContainer = Flexx.Node.create()
    fContainer.setFlexGrow(1)
    fContainer.setOverflow(Flexx.OVERFLOW_HIDDEN)

    for (let i = 0; i < 30; i++) {
      const fLine = Flexx.Node.create()
      fLine.setHeight(1)
      fContainer.insertChild(fLine, i)
    }
    fRoot.insertChild(fContainer, 0)
    fRoot.calculateLayout(80, 10, Flexx.DIRECTION_LTR)

    // Flexx DOES constrain (CSS spec §4.5: overflow → min-size:auto=0 → can shrink)
    expect(fRoot.getComputedHeight()).toBe(10)
    expect(fContainer.getComputedHeight()).toBe(10)
  })

  test("overflow:visible — both expand to content (same behavior)", () => {
    // Yoga
    const yRoot = yoga.Node.create()
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)
    yRoot.setHeight(10)
    yRoot.setWidth(80)

    const yContainer = yoga.Node.create()
    yContainer.setFlexGrow(1)

    for (let i = 0; i < 30; i++) {
      const yLine = yoga.Node.create()
      yLine.setHeight(1)
      yContainer.insertChild(yLine, i)
    }
    yRoot.insertChild(yContainer, 0)
    yRoot.calculateLayout(80, 10, yoga.DIRECTION_LTR)

    // Flexx
    const fRoot = Flexx.Node.create()
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN)
    fRoot.setHeight(10)
    fRoot.setWidth(80)

    const fContainer = Flexx.Node.create()
    fContainer.setFlexGrow(1)

    for (let i = 0; i < 30; i++) {
      const fLine = Flexx.Node.create()
      fLine.setHeight(1)
      fContainer.insertChild(fLine, i)
    }
    fRoot.insertChild(fContainer, 0)
    fRoot.calculateLayout(80, 10, Flexx.DIRECTION_LTR)

    // Both: overflow:visible + flexShrink:0 → container stays at content size
    expect(yRoot.getComputedHeight()).toBe(10)
    expect(yContainer.getComputedHeight()).toBe(30)
    expect(fRoot.getComputedHeight()).toBe(10)
    expect(fContainer.getComputedHeight()).toBe(30)
  })
})
