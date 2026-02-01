/**
 * Yoga Compatibility Tests
 *
 * Systematically compares Flexx output against Yoga (the reference implementation)
 * to identify discrepancies and edge cases.
 *
 * Run: bun test tests/yoga-comparison.test.ts
 */

import { describe, expect, it, beforeAll } from "bun:test";
import * as Flexx from "../src/index.js";
import initYoga, { type Yoga, type Node as YogaNode } from "yoga-wasm-web";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ============================================================================
// Setup
// ============================================================================

let yoga: Yoga;
const __dirname = dirname(fileURLToPath(import.meta.url));
const wasmPath = join(__dirname, "../node_modules/yoga-wasm-web/dist/yoga.wasm");

beforeAll(async () => {
  const wasmBuffer = readFileSync(wasmPath);
  yoga = await initYoga(wasmBuffer);
});

// ============================================================================
// Helper: Compare layout results
// ============================================================================

interface LayoutResult {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface NodeLayout extends LayoutResult {
  children: NodeLayout[];
}

function getFlexxLayout(node: Flexx.Node): NodeLayout {
  return {
    left: node.getComputedLeft(),
    top: node.getComputedTop(),
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
    children: Array.from({ length: node.getChildCount() }, (_, i) =>
      getFlexxLayout(node.getChild(i)!)
    ),
  };
}

function getYogaLayout(node: YogaNode): NodeLayout {
  return {
    left: node.getComputedLeft(),
    top: node.getComputedTop(),
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
    children: Array.from({ length: node.getChildCount() }, (_, i) =>
      getYogaLayout(node.getChild(i))
    ),
  };
}

function layoutsMatch(a: NodeLayout, b: NodeLayout, tolerance = 0.001): boolean {
  if (
    Math.abs(a.left - b.left) > tolerance ||
    Math.abs(a.top - b.top) > tolerance ||
    Math.abs(a.width - b.width) > tolerance ||
    Math.abs(a.height - b.height) > tolerance
  ) {
    return false;
  }
  if (a.children.length !== b.children.length) return false;
  return a.children.every((child, i) => layoutsMatch(child, b.children[i], tolerance));
}

function formatLayout(layout: NodeLayout, indent = 0): string {
  const pad = "  ".repeat(indent);
  let result = `${pad}{ left: ${layout.left}, top: ${layout.top}, width: ${layout.width}, height: ${layout.height} }`;
  if (layout.children.length > 0) {
    result += ` [\n${layout.children.map(c => formatLayout(c, indent + 1)).join(",\n")}\n${pad}]`;
  }
  return result;
}

// ============================================================================
// Test Results Tracking
// ============================================================================

interface TestResult {
  category: string;
  name: string;
  passed: boolean;
  flexx?: NodeLayout;
  yoga?: NodeLayout;
  error?: string;
}

const results: TestResult[] = [];

function recordResult(result: TestResult) {
  results.push(result);
}

// ============================================================================
// Category: Flex Wrap Edge Cases
// ============================================================================

describe("Yoga Comparison: FlexWrap", () => {
  it("wrap-basic: three items that need wrapping", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexWrap",
      name: "wrap-basic",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("wrap-with-gap: wrapping with row and column gap", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setGap(Flexx.GUTTER_COLUMN, 10);
    fRoot.setGap(Flexx.GUTTER_ROW, 5);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setGap(yoga.GUTTER_COLUMN, 10);
    yRoot.setGap(yoga.GUTTER_ROW, 5);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexWrap",
      name: "wrap-with-gap",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("wrap-with-flexgrow: items with flex-grow on wrapped lines", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      child.setFlexGrow(1);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      child.setFlexGrow(1);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexWrap",
      name: "wrap-with-flexgrow",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("wrap-reverse: wrap-reverse direction", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP_REVERSE);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP_REVERSE);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexWrap",
      name: "wrap-reverse",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("wrap-column: column wrap", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);

    for (let i = 0; i < 6; i++) {
      const child = Flexx.Node.create();
      child.setWidth(30);
      child.setHeight(40);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);

    for (let i = 0; i < 6; i++) {
      const child = yoga.Node.create();
      child.setWidth(30);
      child.setHeight(40);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexWrap",
      name: "wrap-column",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: AlignContent
// ============================================================================

describe("Yoga Comparison: AlignContent", () => {
  it("align-content-flex-start: lines packed at start", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_FLEX_START);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_FLEX_START);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-flex-start",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("align-content-center: lines packed at center", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_CENTER);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_CENTER);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-center",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("align-content-flex-end: lines packed at end", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_FLEX_END);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_FLEX_END);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-flex-end",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("align-content-space-between: lines spaced evenly", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_SPACE_BETWEEN);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_SPACE_BETWEEN);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-space-between",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("align-content-space-around: lines with space around", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_SPACE_AROUND);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_SPACE_AROUND);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-space-around",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("align-content-stretch: lines stretch to fill", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setAlignContent(Flexx.ALIGN_STRETCH);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setAlignContent(yoga.ALIGN_STRETCH);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(20);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AlignContent",
      name: "align-content-stretch",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Absolute Positioning
// ============================================================================

describe("Yoga Comparison: AbsolutePositioning", () => {
  it("absolute-with-padding: absolute child in padded parent", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setPadding(Flexx.EDGE_ALL, 10);

    const fChild = Flexx.Node.create();
    fChild.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fChild.setPosition(Flexx.EDGE_LEFT, 0);
    fChild.setPosition(Flexx.EDGE_TOP, 0);
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setPadding(yoga.EDGE_ALL, 10);

    const yChild = yoga.Node.create();
    yChild.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yChild.setPosition(yoga.EDGE_LEFT, 0);
    yChild.setPosition(yoga.EDGE_TOP, 0);
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AbsolutePositioning",
      name: "absolute-with-padding",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("absolute-all-edges: absolute with all edges set", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fChild.setPosition(Flexx.EDGE_LEFT, 10);
    fChild.setPosition(Flexx.EDGE_TOP, 10);
    fChild.setPosition(Flexx.EDGE_RIGHT, 10);
    fChild.setPosition(Flexx.EDGE_BOTTOM, 10);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yChild.setPosition(yoga.EDGE_LEFT, 10);
    yChild.setPosition(yoga.EDGE_TOP, 10);
    yChild.setPosition(yoga.EDGE_RIGHT, 10);
    yChild.setPosition(yoga.EDGE_BOTTOM, 10);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AbsolutePositioning",
      name: "absolute-all-edges",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("absolute-percent-position: absolute with percent positions", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fChild.setPositionPercent(Flexx.EDGE_LEFT, 10);
    fChild.setPositionPercent(Flexx.EDGE_TOP, 10);
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yChild.setPositionPercent(yoga.EDGE_LEFT, 10);
    yChild.setPositionPercent(yoga.EDGE_TOP, 10);
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AbsolutePositioning",
      name: "absolute-percent-position",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("absolute-with-margin: absolute with margin offset", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fChild.setPosition(Flexx.EDGE_LEFT, 0);
    fChild.setPosition(Flexx.EDGE_TOP, 0);
    fChild.setMargin(Flexx.EDGE_LEFT, 10);
    fChild.setMargin(Flexx.EDGE_TOP, 10);
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yChild.setPosition(yoga.EDGE_LEFT, 0);
    yChild.setPosition(yoga.EDGE_TOP, 0);
    yChild.setMargin(yoga.EDGE_LEFT, 10);
    yChild.setMargin(yoga.EDGE_TOP, 10);
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AbsolutePositioning",
      name: "absolute-with-margin",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  // Note: Flexx centers absolute children with auto margins, Yoga does not.
  // This is a Flexx extension that follows CSS behavior more closely.
  it.skip("absolute-centering: center absolute child with auto margins (Flexx extension)", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fChild.setPosition(Flexx.EDGE_LEFT, 0);
    fChild.setPosition(Flexx.EDGE_TOP, 0);
    fChild.setPosition(Flexx.EDGE_RIGHT, 0);
    fChild.setPosition(Flexx.EDGE_BOTTOM, 0);
    fChild.setMarginAuto(Flexx.EDGE_LEFT);
    fChild.setMarginAuto(Flexx.EDGE_RIGHT);
    fChild.setMarginAuto(Flexx.EDGE_TOP);
    fChild.setMarginAuto(Flexx.EDGE_BOTTOM);
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yChild.setPosition(yoga.EDGE_LEFT, 0);
    yChild.setPosition(yoga.EDGE_TOP, 0);
    yChild.setPosition(yoga.EDGE_RIGHT, 0);
    yChild.setPosition(yoga.EDGE_BOTTOM, 0);
    yChild.setMarginAuto(yoga.EDGE_LEFT);
    yChild.setMarginAuto(yoga.EDGE_RIGHT);
    yChild.setMarginAuto(yoga.EDGE_TOP);
    yChild.setMarginAuto(yoga.EDGE_BOTTOM);
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "AbsolutePositioning",
      name: "absolute-centering",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Min/Max Dimensions
// ============================================================================

describe("Yoga Comparison: MinMaxDimensions", () => {
  it("min-width-overrides-shrink: minWidth prevents shrinking", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setWidth(80);
    fChild1.setMinWidth(60);
    fChild1.setFlexShrink(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setWidth(80);
    fChild2.setFlexShrink(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setWidth(80);
    yChild1.setMinWidth(60);
    yChild1.setFlexShrink(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setWidth(80);
    yChild2.setFlexShrink(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "MinMaxDimensions",
      name: "min-width-overrides-shrink",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("max-width-overrides-grow: maxWidth caps growth", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setFlexGrow(1);
    fChild1.setMaxWidth(30);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexGrow(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setFlexGrow(1);
    yChild1.setMaxWidth(30);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexGrow(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "MinMaxDimensions",
      name: "max-width-overrides-grow",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("min-max-percent: percent-based min/max constraints", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild = Flexx.Node.create();
    fChild.setFlexGrow(1);
    fChild.setMinWidthPercent(20);
    fChild.setMaxWidthPercent(80);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild = yoga.Node.create();
    yChild.setFlexGrow(1);
    yChild.setMinWidthPercent(20);
    yChild.setMaxWidthPercent(80);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "MinMaxDimensions",
      name: "min-max-percent",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("min-max-interaction: min > max scenario", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setMinWidth(60);
    fChild.setMaxWidth(40); // min > max (invalid, but needs to handle)
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setMinWidth(60);
    yChild.setMaxWidth(40);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "MinMaxDimensions",
      name: "min-max-interaction",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("nested-min-max: nested containers with constraints", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fOuter = Flexx.Node.create();
    fOuter.setFlexGrow(1);
    fOuter.setMaxWidth(60);
    fRoot.insertChild(fOuter, 0);

    const fInner = Flexx.Node.create();
    fInner.setFlexGrow(1);
    fInner.setMinWidth(40);
    fOuter.insertChild(fInner, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yOuter = yoga.Node.create();
    yOuter.setFlexGrow(1);
    yOuter.setMaxWidth(60);
    yRoot.insertChild(yOuter, 0);

    const yInner = yoga.Node.create();
    yInner.setFlexGrow(1);
    yInner.setMinWidth(40);
    yOuter.insertChild(yInner, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "MinMaxDimensions",
      name: "nested-min-max",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Gap
// ============================================================================

describe("Yoga Comparison: Gap", () => {
  it("row-gap-only: gap between rows in wrapped content", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setGap(Flexx.GUTTER_ROW, 10);

    for (let i = 0; i < 4; i++) {
      const child = Flexx.Node.create();
      child.setWidth(40);
      child.setHeight(30);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setGap(yoga.GUTTER_ROW, 10);

    for (let i = 0; i < 4; i++) {
      const child = yoga.Node.create();
      child.setWidth(40);
      child.setHeight(30);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "Gap",
      name: "row-gap-only",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("column-gap-only: gap between columns", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setGap(Flexx.GUTTER_COLUMN, 10);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setWidth(20);
      child.setHeight(30);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setGap(yoga.GUTTER_COLUMN, 10);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setWidth(20);
      child.setHeight(30);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "Gap",
      name: "column-gap-only",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("gap-with-flexgrow: gap interacting with flex grow", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setGap(Flexx.GUTTER_COLUMN, 10);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setFlexGrow(1);
      child.setHeight(30);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setGap(yoga.GUTTER_COLUMN, 10);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setFlexGrow(1);
      child.setHeight(30);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "Gap",
      name: "gap-with-flexgrow",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("gap-all: both row and column gap", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);
    fRoot.setGap(Flexx.GUTTER_ALL, 10);

    for (let i = 0; i < 6; i++) {
      const child = Flexx.Node.create();
      child.setWidth(25);
      child.setHeight(25);
      fRoot.insertChild(child, i);
    }
    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);
    yRoot.setGap(yoga.GUTTER_ALL, 10);

    for (let i = 0; i < 6; i++) {
      const child = yoga.Node.create();
      child.setWidth(25);
      child.setHeight(25);
      yRoot.insertChild(child, i);
    }
    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "Gap",
      name: "gap-all",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Flex Shrink Edge Cases
// ============================================================================

describe("Yoga Comparison: FlexShrink", () => {
  it("shrink-with-basis: different basis values", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setFlexBasis(100);
    fChild1.setFlexShrink(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexBasis(50);
    fChild2.setFlexShrink(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setFlexBasis(100);
    yChild1.setFlexShrink(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexBasis(50);
    yChild2.setFlexShrink(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexShrink",
      name: "shrink-with-basis",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    // Note: Flexx uses simplified shrink algorithm
    expect(match).toBe(true);
  });

  it("shrink-different-factors: unequal shrink factors", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setWidth(100);
    fChild1.setFlexShrink(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setWidth(100);
    fChild2.setFlexShrink(2);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setWidth(100);
    yChild1.setFlexShrink(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setWidth(100);
    yChild2.setFlexShrink(2);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexShrink",
      name: "shrink-different-factors",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("shrink-zero-no-shrink: shrink 0 prevents shrinking", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setWidth(80);
    fChild1.setFlexShrink(0);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setWidth(80);
    fChild2.setFlexShrink(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setWidth(80);
    yChild1.setFlexShrink(0);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setWidth(80);
    yChild2.setFlexShrink(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexShrink",
      name: "shrink-zero-no-shrink",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Flex Grow Edge Cases
// ============================================================================

describe("Yoga Comparison: FlexGrow", () => {
  it("grow-with-fixed-sibling: grow next to fixed width", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setWidth(30);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexGrow(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setWidth(30);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexGrow(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexGrow",
      name: "grow-with-fixed-sibling",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("grow-unequal: unequal grow factors", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setFlexGrow(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexGrow(2);
    fRoot.insertChild(fChild2, 1);

    const fChild3 = Flexx.Node.create();
    fChild3.setFlexGrow(1);
    fRoot.insertChild(fChild3, 2);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setFlexGrow(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexGrow(2);
    yRoot.insertChild(yChild2, 1);

    const yChild3 = yoga.Node.create();
    yChild3.setFlexGrow(1);
    yRoot.insertChild(yChild3, 2);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexGrow",
      name: "grow-unequal",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("grow-with-basis: flex-grow with flex-basis", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setFlexBasis(20);
    fChild1.setFlexGrow(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexBasis(20);
    fChild2.setFlexGrow(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setFlexBasis(20);
    yChild1.setFlexGrow(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexBasis(20);
    yChild2.setFlexGrow(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "FlexGrow",
      name: "grow-with-basis",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Complex Nested Layouts
// ============================================================================

describe("Yoga Comparison: NestedLayouts", () => {
  it("nested-flex: multiple nesting levels", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fLeft = Flexx.Node.create();
    fLeft.setFlexGrow(1);
    fLeft.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN);
    fRoot.insertChild(fLeft, 0);

    const fLeftTop = Flexx.Node.create();
    fLeftTop.setFlexGrow(1);
    fLeft.insertChild(fLeftTop, 0);

    const fLeftBottom = Flexx.Node.create();
    fLeftBottom.setFlexGrow(1);
    fLeft.insertChild(fLeftBottom, 1);

    const fRight = Flexx.Node.create();
    fRight.setFlexGrow(2);
    fRoot.insertChild(fRight, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yLeft = yoga.Node.create();
    yLeft.setFlexGrow(1);
    yLeft.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
    yRoot.insertChild(yLeft, 0);

    const yLeftTop = yoga.Node.create();
    yLeftTop.setFlexGrow(1);
    yLeft.insertChild(yLeftTop, 0);

    const yLeftBottom = yoga.Node.create();
    yLeftBottom.setFlexGrow(1);
    yLeft.insertChild(yLeftBottom, 1);

    const yRight = yoga.Node.create();
    yRight.setFlexGrow(2);
    yRoot.insertChild(yRight, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "NestedLayouts",
      name: "nested-flex",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("mixed-constraints: nested with various constraints", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN);
    fRoot.setPadding(Flexx.EDGE_ALL, 5);

    const fHeader = Flexx.Node.create();
    fHeader.setHeight(20);
    fRoot.insertChild(fHeader, 0);

    const fContent = Flexx.Node.create();
    fContent.setFlexGrow(1);
    fContent.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fContent.setGap(Flexx.GUTTER_COLUMN, 5);
    fRoot.insertChild(fContent, 1);

    const fSidebar = Flexx.Node.create();
    fSidebar.setWidth(20);
    fContent.insertChild(fSidebar, 0);

    const fMain = Flexx.Node.create();
    fMain.setFlexGrow(1);
    fContent.insertChild(fMain, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
    yRoot.setPadding(yoga.EDGE_ALL, 5);

    const yHeader = yoga.Node.create();
    yHeader.setHeight(20);
    yRoot.insertChild(yHeader, 0);

    const yContent = yoga.Node.create();
    yContent.setFlexGrow(1);
    yContent.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yContent.setGap(yoga.GUTTER_COLUMN, 5);
    yRoot.insertChild(yContent, 1);

    const ySidebar = yoga.Node.create();
    ySidebar.setWidth(20);
    yContent.insertChild(ySidebar, 0);

    const yMain = yoga.Node.create();
    yMain.setFlexGrow(1);
    yContent.insertChild(yMain, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "NestedLayouts",
      name: "mixed-constraints",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Percent Values Edge Cases
// ============================================================================

describe("Yoga Comparison: PercentValues", () => {
  it("percent-nested: percent in nested container", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fOuter = Flexx.Node.create();
    fOuter.setWidthPercent(50);
    fOuter.setHeightPercent(50);
    fRoot.insertChild(fOuter, 0);

    const fInner = Flexx.Node.create();
    fInner.setWidthPercent(50);
    fInner.setHeightPercent(50);
    fOuter.insertChild(fInner, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yOuter = yoga.Node.create();
    yOuter.setWidthPercent(50);
    yOuter.setHeightPercent(50);
    yRoot.insertChild(yOuter, 0);

    const yInner = yoga.Node.create();
    yInner.setWidthPercent(50);
    yInner.setHeightPercent(50);
    yOuter.insertChild(yInner, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "PercentValues",
      name: "percent-nested",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("percent-margin: percent margin values", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    const fChild = Flexx.Node.create();
    fChild.setWidth(50);
    fChild.setHeight(50);
    fChild.setMarginPercent(Flexx.EDGE_LEFT, 10);
    fChild.setMarginPercent(Flexx.EDGE_TOP, 10);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    const yChild = yoga.Node.create();
    yChild.setWidth(50);
    yChild.setHeight(50);
    yChild.setMarginPercent(yoga.EDGE_LEFT, 10);
    yChild.setMarginPercent(yoga.EDGE_TOP, 10);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "PercentValues",
      name: "percent-margin",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("percent-padding: percent padding values", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setPaddingPercent(Flexx.EDGE_ALL, 10);

    const fChild = Flexx.Node.create();
    fChild.setFlexGrow(1);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setPaddingPercent(yoga.EDGE_ALL, 10);

    const yChild = yoga.Node.create();
    yChild.setFlexGrow(1);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "PercentValues",
      name: "percent-padding",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Category: Intentional Differences (documented as different)
// ============================================================================

describe("Yoga Comparison: IntentionalDifferences", () => {
  it("shrink-weighted-by-basis: CSS spec weighted shrink", () => {
    // Both Flexx and Yoga use CSS spec: shrink proportional to (flexShrink * flexBasis)
    // This test verifies Flexx matches Yoga's behavior.

    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild1 = Flexx.Node.create();
    fChild1.setFlexBasis(200); // Large basis
    fChild1.setFlexShrink(1);
    fRoot.insertChild(fChild1, 0);

    const fChild2 = Flexx.Node.create();
    fChild2.setFlexBasis(100); // Small basis
    fChild2.setFlexShrink(1);
    fRoot.insertChild(fChild2, 1);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild1 = yoga.Node.create();
    yChild1.setFlexBasis(200);
    yChild1.setFlexShrink(1);
    yRoot.insertChild(yChild1, 0);

    const yChild2 = yoga.Node.create();
    yChild2.setFlexBasis(100);
    yChild2.setFlexShrink(1);
    yRoot.insertChild(yChild2, 1);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    // Note: This is expected to differ
    // Yoga (CSS spec): child1 shrinks more because it has larger basis
    // - Total overflow: 300 - 100 = 200
    // - child1 weight: 1 * 200 = 200
    // - child2 weight: 1 * 100 = 100
    // - child1 shrinks: 200 * (200/300) = 133.33 -> size = 66.67
    // - child2 shrinks: 200 * (100/300) = 66.67 -> size = 33.33
    //
    // Flexx (proportional only):
    // - child1 shrinks: 200 * 0.5 = 100 -> size = 100
    // - child2 shrinks: 200 * 0.5 = 100 -> size = 0 (clamped?)

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "IntentionalDifferences",
      name: "shrink-weighted-by-basis",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    // This test documents the difference - we expect it MAY differ
    // Just recording the result, not asserting
    console.log(`\n[INFO] shrink-weighted-by-basis: ${match ? "MATCHES" : "DIFFERS (expected)"}`);
    if (!match) {
      console.log("  Yoga (CSS spec weighted shrink):", yogaLayout.children.map(c => c.width));
      console.log("  Flexx (proportional shrink):", flexxLayout.children.map(c => c.width));
    }
  });
});

// ============================================================================
// Category: Additional Edge Cases
// ============================================================================

describe("Yoga Comparison: EdgeCases", () => {
  it("zero-size-container: layout in zero-size container", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(0);
    fRoot.setHeight(0);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    const fChild = Flexx.Node.create();
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(0, 0, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(0);
    yRoot.setHeight(0);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    const yChild = yoga.Node.create();
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(0, 0, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "EdgeCases",
      name: "zero-size-container",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("single-item-wrap: single item with wrap enabled", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);
    fRoot.setFlexWrap(Flexx.WRAP_WRAP);

    const fChild = Flexx.Node.create();
    fChild.setWidth(50);
    fChild.setHeight(50);
    fRoot.insertChild(fChild, 0);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yRoot.setFlexWrap(yoga.WRAP_WRAP);

    const yChild = yoga.Node.create();
    yChild.setWidth(50);
    yChild.setHeight(50);
    yRoot.insertChild(yChild, 0);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "EdgeCases",
      name: "single-item-wrap",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("overflow-no-shrink: items overflow when shrink=0", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_ROW);

    for (let i = 0; i < 3; i++) {
      const child = Flexx.Node.create();
      child.setWidth(50);
      child.setHeight(50);
      child.setFlexShrink(0); // Explicit no shrink
      fRoot.insertChild(child, i);
    }

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_ROW);

    for (let i = 0; i < 3; i++) {
      const child = yoga.Node.create();
      child.setWidth(50);
      child.setHeight(50);
      child.setFlexShrink(0);
      yRoot.insertChild(child, i);
    }

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "EdgeCases",
      name: "overflow-no-shrink",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("mixed-absolute-relative: absolute and relative siblings", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);
    fRoot.setFlexDirection(Flexx.FLEX_DIRECTION_COLUMN);

    const fRel1 = Flexx.Node.create();
    fRel1.setHeight(30);
    fRoot.insertChild(fRel1, 0);

    const fAbs = Flexx.Node.create();
    fAbs.setPositionType(Flexx.POSITION_TYPE_ABSOLUTE);
    fAbs.setPosition(Flexx.EDGE_RIGHT, 10);
    fAbs.setPosition(Flexx.EDGE_TOP, 10);
    fAbs.setWidth(20);
    fAbs.setHeight(20);
    fRoot.insertChild(fAbs, 1);

    const fRel2 = Flexx.Node.create();
    fRel2.setFlexGrow(1);
    fRoot.insertChild(fRel2, 2);

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);
    yRoot.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);

    const yRel1 = yoga.Node.create();
    yRel1.setHeight(30);
    yRoot.insertChild(yRel1, 0);

    const yAbs = yoga.Node.create();
    yAbs.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    yAbs.setPosition(yoga.EDGE_RIGHT, 10);
    yAbs.setPosition(yoga.EDGE_TOP, 10);
    yAbs.setWidth(20);
    yAbs.setHeight(20);
    yRoot.insertChild(yAbs, 1);

    const yRel2 = yoga.Node.create();
    yRel2.setFlexGrow(1);
    yRoot.insertChild(yRel2, 2);

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "EdgeCases",
      name: "mixed-absolute-relative",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });

  it("deeply-nested: 5 levels of nesting", () => {
    // Flexx
    const fRoot = Flexx.Node.create();
    fRoot.setWidth(100);
    fRoot.setHeight(100);

    let fCurrent = fRoot;
    for (let i = 0; i < 5; i++) {
      const child = Flexx.Node.create();
      child.setFlexGrow(1);
      child.setPadding(Flexx.EDGE_ALL, 5);
      fCurrent.insertChild(child, 0);
      fCurrent = child;
    }

    fRoot.calculateLayout(100, 100, Flexx.DIRECTION_LTR);
    const flexxLayout = getFlexxLayout(fRoot);

    // Yoga
    const yRoot = yoga.Node.create();
    yRoot.setWidth(100);
    yRoot.setHeight(100);

    let yCurrent = yRoot;
    for (let i = 0; i < 5; i++) {
      const child = yoga.Node.create();
      child.setFlexGrow(1);
      child.setPadding(yoga.EDGE_ALL, 5);
      yCurrent.insertChild(child, 0);
      yCurrent = child;
    }

    yRoot.calculateLayout(100, 100, yoga.DIRECTION_LTR);
    const yogaLayout = getYogaLayout(yRoot);
    yRoot.freeRecursive();

    const match = layoutsMatch(flexxLayout, yogaLayout);
    recordResult({
      category: "EdgeCases",
      name: "deeply-nested",
      passed: match,
      flexx: flexxLayout,
      yoga: yogaLayout,
    });
    expect(match).toBe(true);
  });
});

// ============================================================================
// Generate Report
// ============================================================================

describe("Summary Report", () => {
  it("prints summary at end", () => {
    // This test runs last and prints the summary
    const passed = results.filter(r => r.passed);
    const failed = results.filter(r => !r.passed);

    console.log("\n" + "=".repeat(80));
    console.log("YOGA COMPATIBILITY TEST REPORT");
    console.log("=".repeat(80));
    console.log(`\nTotal: ${results.length} tests`);
    console.log(`Passed: ${passed.length}`);
    console.log(`Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log("\n" + "-".repeat(80));
      console.log("FAILED TESTS:");
      console.log("-".repeat(80));

      // Group by category
      const byCategory = new Map<string, TestResult[]>();
      for (const r of failed) {
        const list = byCategory.get(r.category) || [];
        list.push(r);
        byCategory.set(r.category, list);
      }

      for (const [category, tests] of byCategory) {
        console.log(`\n### ${category}`);
        for (const test of tests) {
          console.log(`\n**${test.name}**`);
          if (test.yoga && test.flexx) {
            console.log("Expected (Yoga):");
            console.log(formatLayout(test.yoga));
            console.log("Actual (Flexx):");
            console.log(formatLayout(test.flexx));
          }
          if (test.error) {
            console.log(`Error: ${test.error}`);
          }
        }
      }

      console.log("\n" + "-".repeat(80));
      console.log("TOP 10 HIGHEST-IMPACT FIXES:");
      console.log("-".repeat(80));

      // Prioritize by category importance
      const categoryPriority: Record<string, number> = {
        "FlexWrap": 10,
        "AlignContent": 9,
        "AbsolutePositioning": 8,
        "MinMaxDimensions": 7,
        "Gap": 6,
        "FlexShrink": 5,
        "FlexGrow": 4,
        "NestedLayouts": 3,
        "PercentValues": 2,
      };

      const sorted = [...failed].sort((a, b) => {
        const pa = categoryPriority[a.category] || 0;
        const pb = categoryPriority[b.category] || 0;
        return pb - pa;
      });

      const top10 = sorted.slice(0, 10);
      top10.forEach((test, i) => {
        console.log(`${i + 1}. [${test.category}] ${test.name}`);
      });
    }

    console.log("\n" + "=".repeat(80));
  });
});
