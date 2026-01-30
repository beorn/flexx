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
 * Generated from Yoga test fixtures: FlexDirectionTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga FlexDirectionTest", () => {
  it("flex_direction_column_no_height", () => {
    const root = Node.create();
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(30);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("flex_direction_row_no_width", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(30);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(10);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(20);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_column", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("flex_direction_row", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(10);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(20);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_column_reverse", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(90);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(80);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(70);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("flex_direction_row_reverse", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_margin_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setMargin(EDGE_LEFT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(100);
    root_child3.setWidth(100);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child3.setMargin(EDGE_START, 100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(10);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(100);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(-130);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(-140);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(10);
    expect(root_child4.getComputedHeight()).toBe(100);

    expect(root_child5.getComputedLeft()).toBe(-150);
    expect(root_child5.getComputedTop()).toBe(0);
    expect(root_child5.getComputedWidth()).toBe(10);
    expect(root_child5.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_margin_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setMargin(EDGE_RIGHT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_margin_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setMargin(EDGE_END, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(100);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_column_reverse_margin_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setMargin(EDGE_TOP, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(100);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_column_reverse_margin_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setMargin(EDGE_BOTTOM, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_padding_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setPadding(EDGE_LEFT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_padding_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setPadding(EDGE_START, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(-10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(-20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(-30);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_padding_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setPadding(EDGE_RIGHT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(-10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(-20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(-30);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_padding_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setPadding(EDGE_END, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_column_reverse_padding_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setPadding(EDGE_TOP, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_column_reverse_padding_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setPadding(EDGE_BOTTOM, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_border_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setBorder(EDGE_LEFT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_border_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_border_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setBorder(EDGE_RIGHT, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(-10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(-20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(-30);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_row_reverse_border_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(90);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(80);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("flex_direction_column_reverse_border_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setBorder(EDGE_TOP, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_column_reverse_border_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.setBorder(EDGE_BOTTOM, 100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_pos_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child0.setPosition(EDGE_LEFT, 100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(-100);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_pos_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_pos_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child0.setPosition(EDGE_RIGHT, 100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(100);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_pos_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_column_reverse_pos_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root_child0.setPosition(EDGE_TOP, 100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-100);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_column_reverse_pos_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root_child0.setPosition(EDGE_BOTTOM, 100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_pos_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_pos_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_pos_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_pos_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it.skip("flex_direction_row_reverse_inner_pos_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it.skip("flex_direction_row_reverse_inner_pos_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_margin_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_margin_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_margin_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_margin_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_marign_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_margin_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_border_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_border_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_border_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_border_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_border_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_border_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_padding_left", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_padding_right", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_padding_top", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_col_reverse_inner_padding_bottom", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_padding_start", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_row_reverse_inner_padding_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root.insertChild(root_child2, 2);
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
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("flex_direction_alternating_with_percent", () => {
    const root = Node.create();
    root.setHeight(300);
    root.setWidth(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setHeightPercent(50);
    root_child0.setWidthPercent(50);
    root_child0.setPositionPercent(EDGE_LEFT, 10);
    root_child0.setPositionPercent(EDGE_TOP, 10);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(30);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(150);
  });
});
