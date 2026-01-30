import { describe, expect, it } from "bun:test";
import {
  DIRECTION_LTR,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_COLUMN_REVERSE,
  FLEX_DIRECTION_ROW,
  FLEX_DIRECTION_ROW_REVERSE,
  WRAP_NO_WRAP,
  WRAP_WRAP,
  WRAP_WRAP_REVERSE,
  ALIGN_AUTO,
  ALIGN_FLEX_START,
  ALIGN_CENTER,
  ALIGN_FLEX_END,
  ALIGN_STRETCH,
  ALIGN_BASELINE,
  ALIGN_SPACE_BETWEEN,
  ALIGN_SPACE_AROUND,
  JUSTIFY_FLEX_START,
  JUSTIFY_CENTER,
  JUSTIFY_FLEX_END,
  JUSTIFY_SPACE_BETWEEN,
  JUSTIFY_SPACE_AROUND,
  JUSTIFY_SPACE_EVENLY,
  EDGE_LEFT,
  EDGE_TOP,
  EDGE_RIGHT,
  EDGE_BOTTOM,
  EDGE_START,
  EDGE_END,
  EDGE_ALL,
  GUTTER_COLUMN,
  GUTTER_ROW,
  GUTTER_ALL,
  DISPLAY_FLEX,
  DISPLAY_NONE,
  POSITION_TYPE_STATIC,
  POSITION_TYPE_RELATIVE,
  POSITION_TYPE_ABSOLUTE,
  OVERFLOW_VISIBLE,
  OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL,
  Node,
} from "../../src/index.js";

/**
 * Generated from Yoga test fixtures: AlignSelfTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga AlignSelfTest", () => {
  it("align_self_center", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
    root_child0.setAlignSelf(ALIGN_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(45);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("align_self_flex_end", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("align_self_flex_start", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
    root_child0.setAlignSelf(ALIGN_FLEX_START);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("align_self_flex_end_override_flex_start", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("align_self_baseline", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setAlignSelf(ALIGN_BASELINE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root_child1.setAlignSelf(ALIGN_BASELINE);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });
});
