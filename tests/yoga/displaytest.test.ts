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
 * Generated from Yoga test fixtures: DisplayTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga DisplayTest", () => {
  it("display_none", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root_child1.setDisplay(DISPLAY_NONE);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("display_none_fixed_size", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root_child1.setDisplay(DISPLAY_NONE);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("display_none_with_margin", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setDisplay(DISPLAY_NONE);
    root_child0.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);
  });

  it("display_none_with_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setDisplay(DISPLAY_NONE);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(50);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("display_none_with_position", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root_child1.setDisplay(DISPLAY_NONE);
    root_child1.setPosition(EDGE_TOP, 10);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("display_none_with_position_absolute", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_NONE);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("display_contents", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_fixed_size", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
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
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_with_margin", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(60);
    expect(root_child1.getComputedHeight()).toBe(100);
  });

  it("display_contents_with_padding", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(80);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_with_position", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setPosition(EDGE_TOP, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_with_position_absolute", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
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

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_nested", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("display_contents_with_siblings", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setHeight(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(33);
    expect(root_child0.getComputedHeight()).toBe(30);

    expect(root_child1.getComputedLeft()).toBe(33);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(33);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(34);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(67);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(33);
    expect(root_child3.getComputedHeight()).toBe(30);
  });
});
