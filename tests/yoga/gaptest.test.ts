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
 * Generated from Yoga test fixtures: GapTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga GapTest", () => {
  it("column_gap_flexible", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(80);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_inflexible", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(80);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_mixed_flexible", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(80);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_child_margins", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(80);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_row_gap_wrapping", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(80);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(20);
    root_child6.setHeight(20);
    root.insertChild(root_child6, 6);

    const root_child7 = Node.create();
    root_child7.setWidth(20);
    root_child7.setHeight(20);
    root.insertChild(root_child7, 7);

    const root_child8 = Node.create();
    root_child8.setWidth(20);
    root_child8.setHeight(20);
    root.insertChild(root_child8, 8);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(40);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(40);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(80);
    expect(root_child6.getComputedWidth()).toBe(20);
    expect(root_child6.getComputedHeight()).toBe(20);

    expect(root_child7.getComputedLeft()).toBe(30);
    expect(root_child7.getComputedTop()).toBe(80);
    expect(root_child7.getComputedWidth()).toBe(20);
    expect(root_child7.getComputedHeight()).toBe(20);

    expect(root_child8.getComputedLeft()).toBe(60);
    expect(root_child8.getComputedTop()).toBe(80);
    expect(root_child8.getComputedWidth()).toBe(20);
    expect(root_child8.getComputedHeight()).toBe(20);
  });

  it("column_gap_start_index", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(80);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(60);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(30);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);
  });

  it("column_gap_justify_flex_start", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_justify_center", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(70);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_justify_flex_end", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_END);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(80);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_justify_space_between", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_BETWEEN);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(80);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_justify_space_around", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_AROUND);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(3);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(77);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_justify_space_evenly", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_EVENLY);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(5);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(75);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("column_gap_wrap_align_flex_start", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(40);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(40);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);
  });

  it("column_gap_wrap_align_center", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_CENTER);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(20);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(60);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(60);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(60);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);
  });

  it("column_gap_wrap_align_flex_end", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_FLEX_END);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(40);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(40);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(40);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(80);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(80);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(80);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);
  });

  it("column_gap_wrap_align_space_between", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_SPACE_BETWEEN);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(80);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(80);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(80);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);
  });

  it("column_gap_wrap_align_space_around", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_SPACE_AROUND);
    root.setWidth(100);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root_child4.setHeight(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root_child5.setHeight(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(10);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(70);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(70);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(20);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(70);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(20);
  });

  it("column_gap_wrap_align_stretch", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(300);
    root.setHeight(300);
    root.setGap(GUTTER_COLUMN, 5);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setMinWidth(60);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setMinWidth(60);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setMinWidth(60);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setMinWidth(60);
    root_child3.setFlexGrow(1);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setMinWidth(60);
    root_child4.setFlexGrow(1);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(71);
    expect(root_child0.getComputedHeight()).toBe(150);

    expect(root_child1.getComputedLeft()).toBe(76);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(72);
    expect(root_child1.getComputedHeight()).toBe(150);

    expect(root_child2.getComputedLeft()).toBe(153);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(71);
    expect(root_child2.getComputedHeight()).toBe(150);

    expect(root_child3.getComputedLeft()).toBe(229);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(71);
    expect(root_child3.getComputedHeight()).toBe(150);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(150);
    expect(root_child4.getComputedWidth()).toBe(300);
    expect(root_child4.getComputedHeight()).toBe(150);
  });

  it("column_gap_determines_parent_width", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setHeight(100);
    root.setGap(GUTTER_COLUMN, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(50);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("row_gap_align_items_stretch", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(200);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);
    root.setAlignItems(ALIGN_STRETCH);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(90);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(90);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(90);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(90);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(110);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(90);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(110);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(90);
  });

  it("row_gap_align_items_end", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(200);
    root.setGap(GUTTER_COLUMN, 10);
    root.setGap(GUTTER_ROW, 20);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(20);
    root.insertChild(root_child5, 5);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(0);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(20);
    expect(root_child3.getComputedWidth()).toBe(20);
    expect(root_child3.getComputedHeight()).toBe(0);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(20);
    expect(root_child4.getComputedHeight()).toBe(0);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(20);
    expect(root_child5.getComputedWidth()).toBe(20);
    expect(root_child5.getComputedHeight()).toBe(0);
  });

  it("row_gap_column_child_margins", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(100);
    root.setHeight(200);
    root.setGap(GUTTER_ROW, 10);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(60);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(60);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(140);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(60);
  });

  it("row_gap_row_wrap_child_margins", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(200);
    root.setGap(GUTTER_ROW, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(60);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(60);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(60);
    expect(root_child1.getComputedHeight()).toBe(0);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(60);
    expect(root_child2.getComputedHeight()).toBe(0);
  });

  it("row_gap_determines_parent_height", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(100);
    root.setGap(GUTTER_ROW, 10);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(20);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(30);
  });

  it("row_gap_percent_wrapping", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(700);
    root.setPadding(EDGE_ALL, 10);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(700);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(10);
    expect(root_child2.getComputedTop()).toBe(120);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(120);
    expect(root_child3.getComputedTop()).toBe(120);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(10);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_determines_parent_height", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(110);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(110);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(110);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(220);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_wrapping_with_both_content_padding_and_item_padding", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(700);
    root.setPadding(EDGE_ALL, 10);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root_child0.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root_child1.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root_child2.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root_child3.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root_child4.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(700);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(10);
    expect(root_child2.getComputedTop()).toBe(120);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(120);
    expect(root_child3.getComputedTop()).toBe(120);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(10);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_wrapping_with_both_content_padding", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(700);
    root.setPadding(EDGE_ALL, 10);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(700);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(10);
    expect(root_child2.getComputedTop()).toBe(120);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(120);
    expect(root_child3.getComputedTop()).toBe(120);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(10);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_wrapping_with_content_margin", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(700);
    root.setMargin(EDGE_ALL, 10);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(10);
    expect(root.getComputedTop()).toBe(10);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(700);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(110);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(110);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(110);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(220);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_wrapping_with_content_margin_and_padding", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(700);
    root.setMargin(EDGE_ALL, 10);
    root.setPadding(EDGE_ALL, 10);
    root.setGap(GUTTER_ALL, 10);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(100);
    root_child3.setHeight(100);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(10);
    expect(root.getComputedTop()).toBe(10);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(700);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(10);
    expect(root_child2.getComputedTop()).toBe(120);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(120);
    expect(root_child3.getComputedTop()).toBe(120);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(10);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("row_gap_percent_wrapping_with_flexible_content", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(300);
    root.setGap(GUTTER_ALL, 10);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(93);
    expect(root_child0.getComputedHeight()).toBe(300);

    expect(root_child1.getComputedLeft()).toBe(103);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(94);
    expect(root_child1.getComputedHeight()).toBe(300);

    expect(root_child2.getComputedLeft()).toBe(207);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(93);
    expect(root_child2.getComputedHeight()).toBe(300);
  });

  it.skip("row_gap_percent_wrapping_with_mixed_flexible_content", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(300);
    root.setHeight(300);
    root.setGap(GUTTER_ALL, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child3.setMinWidth(300);
    root_child3.setGap(GUTTER_ALL, 10);
    root_child3.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(100);
    root_child5.setHeight(100);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(100);
    root_child6.setHeight(100);
    root.insertChild(root_child6, 6);

    const root_child7 = Node.create();
    root_child7.setWidth(100);
    root_child7.setHeight(100);
    root.insertChild(root_child7, 7);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(300);

    expect(root_child1.getComputedLeft()).toBe(20);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(300);

    expect(root_child2.getComputedLeft()).toBe(30);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(300);

    expect(root_child3.getComputedLeft()).toBe(70);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(300);
    expect(root_child3.getComputedHeight()).toBe(300);

    expect(root_child4.getComputedLeft()).toBe(380);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);

    expect(root_child5.getComputedLeft()).toBe(490);
    expect(root_child5.getComputedTop()).toBe(0);
    expect(root_child5.getComputedWidth()).toBe(100);
    expect(root_child5.getComputedHeight()).toBe(100);

    expect(root_child6.getComputedLeft()).toBe(600);
    expect(root_child6.getComputedTop()).toBe(0);
    expect(root_child6.getComputedWidth()).toBe(100);
    expect(root_child6.getComputedHeight()).toBe(100);

    expect(root_child7.getComputedLeft()).toBe(710);
    expect(root_child7.getComputedTop()).toBe(0);
    expect(root_child7.getComputedWidth()).toBe(100);
    expect(root_child7.getComputedHeight()).toBe(100);
  });
});
