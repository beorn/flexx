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
 * Generated from Yoga test fixtures: MarginTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga MarginTest", () => {
  it("margin_start", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setMargin(EDGE_START, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_top", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setMargin(EDGE_TOP, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("margin_end", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setMargin(EDGE_END, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(80);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_bottom", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setJustifyContent(JUSTIFY_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setMargin(EDGE_BOTTOM, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(80);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("margin_and_flex_row", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_START, 10);
    root_child0.setMargin(EDGE_END, 10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(80);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_and_flex_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_TOP, 10);
    root_child0.setMargin(EDGE_BOTTOM, 10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(80);
  });

  it("margin_and_stretch_row", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_TOP, 10);
    root_child0.setMargin(EDGE_BOTTOM, 10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(80);
  });

  it("margin_and_stretch_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_START, 10);
    root_child0.setMargin(EDGE_END, 10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(80);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_with_sibling_row", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_END, 10);
    root_child0.setFlexGrow(1);
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
    expect(root_child0.getComputedWidth()).toBe(45);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(55);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(45);
    expect(root_child1.getComputedHeight()).toBe(100);
  });

  it("margin_with_sibling_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setMargin(EDGE_BOTTOM, 10);
    root_child0.setFlexGrow(1);
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
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(45);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(55);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(45);
  });

  it("margin_auto_bottom", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_BOTTOM);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_top", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_TOP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_bottom_and_top", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_TOP);
    root_child0.setMarginAuto(EDGE_BOTTOM);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(50);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_bottom_and_top_justify_center", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_TOP);
    root_child0.setMarginAuto(EDGE_BOTTOM);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(50);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_multiple_children_column", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_TOP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root_child1.setMarginAuto(EDGE_TOP);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(50);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(25);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(75);
    expect(root_child2.getComputedTop()).toBe(150);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("margin_auto_multiple_children_row", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root_child1.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(50);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(75);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(150);
    expect(root_child2.getComputedTop()).toBe(75);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left_and_right_column", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(75);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left_and_right", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_start_and_end_column", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_START);
    root_child0.setMarginAuto(EDGE_END);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(75);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_start_and_end", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_START);
    root_child0.setMarginAuto(EDGE_END);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left_and_right_column_and_center", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_LEFT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(150);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_right", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left_and_right_stretch", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_top_and_bottom_stretch", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMarginAuto(EDGE_TOP);
    root_child0.setMarginAuto(EDGE_BOTTOM);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(50);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_should_not_be_part_of_max_height", () => {
    const root = Node.create();
    root.setWidth(250);
    root.setHeight(250);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root_child0.setMaxHeight(100);
    root_child0.setMargin(EDGE_TOP, 20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(250);
    expect(root.getComputedHeight()).toBe(250);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_should_not_be_part_of_max_width", () => {
    const root = Node.create();
    root.setWidth(250);
    root.setHeight(250);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root_child0.setMaxWidth(100);
    root_child0.setMargin(EDGE_LEFT, 20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(250);
    expect(root.getComputedHeight()).toBe(250);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("margin_auto_left_right_child_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(72);
    root_child0.setHeight(72);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-10);
    expect(root_child0.getComputedWidth()).toBe(72);
    expect(root_child0.getComputedHeight()).toBe(72);
  });

  it("margin_auto_left_child_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(72);
    root_child0.setHeight(72);
    root_child0.setMarginAuto(EDGE_LEFT);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-10);
    expect(root_child0.getComputedWidth()).toBe(72);
    expect(root_child0.getComputedHeight()).toBe(72);
  });

  it("margin_fix_left_auto_right_child_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(72);
    root_child0.setHeight(72);
    root_child0.setMargin(EDGE_LEFT, 10);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(-10);
    expect(root_child0.getComputedWidth()).toBe(72);
    expect(root_child0.getComputedHeight()).toBe(72);
  });

  it("margin_auto_left_fix_right_child_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(72);
    root_child0.setHeight(72);
    root_child0.setMarginAuto(EDGE_LEFT);
    root_child0.setMargin(EDGE_RIGHT, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-10);
    expect(root_child0.getComputedWidth()).toBe(72);
    expect(root_child0.getComputedHeight()).toBe(72);
  });

  it("margin_auto_top_stretching_child", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setMarginAuto(EDGE_TOP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(100);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(150);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_left_stretching_child", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setMarginAuto(EDGE_LEFT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(200);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(150);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(150);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("margin_auto_overflowing_container", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(150);
    root_child0.setMarginAuto(EDGE_BOTTOM);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(150);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(75);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(150);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(150);
  });
});
