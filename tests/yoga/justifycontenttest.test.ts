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
 * Generated from Yoga test fixtures: JustifyContentTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga JustifyContentTest", () => {
  it("justify_content_row_flex_start", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_START);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(10);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(20);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_row_flex_end", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_END);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(72);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(82);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(92);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_row_center", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_CENTER);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(36);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(46);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(56);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_row_space_between", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_BETWEEN);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(46);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(92);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_row_space_around", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_AROUND);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(12);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(46);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(80);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_column_flex_start", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_FLEX_START);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_column_flex_end", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_FLEX_END);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(72);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(82);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(92);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_column_center", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_CENTER);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(36);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(46);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(56);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_column_space_between", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_SPACE_BETWEEN);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(46);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(92);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_column_space_around", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_SPACE_AROUND);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(12);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(46);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(80);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_row_min_width_and_margin", () => {
    const root = Node.create();
    root.setMinWidth(50);
    root.setMargin(EDGE_LEFT, 100);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(100);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(50);
    expect(root.getComputedHeight()).toBe(20);

    expect(root_child0.getComputedLeft()).toBe(15);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("justify_content_row_max_width_and_margin", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setMaxWidth(80);
    root.setMargin(EDGE_LEFT, 100);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(100);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(80);
    expect(root.getComputedHeight()).toBe(20);

    expect(root_child0.getComputedLeft()).toBe(30);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("justify_content_column_min_height_and_margin", () => {
    const root = Node.create();
    root.setMinHeight(50);
    root.setMargin(EDGE_TOP, 100);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(100);
    expect(root.getComputedWidth()).toBe(20);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(15);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("justify_content_column_max_height_and_margin", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setMaxHeight(80);
    root.setMargin(EDGE_TOP, 100);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setWidth(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(100);
    expect(root.getComputedWidth()).toBe(20);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("justify_content_column_space_evenly", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_SPACE_EVENLY);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(18);
    expect(root_child0.getComputedWidth()).toBe(102);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(46);
    expect(root_child1.getComputedWidth()).toBe(102);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(74);
    expect(root_child2.getComputedWidth()).toBe(102);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_row_space_evenly", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setJustifyContent(JUSTIFY_SPACE_EVENLY);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

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
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(26);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(51);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(77);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(0);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("justify_content_min_width_with_padding_child_width_greater_than_parent", () => {
    const root = Node.create();
    root.setWidth(1000);
    root.setHeight(1584);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(1000);
    expect(root.getComputedHeight()).toBe(1584);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(1000);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("justify_content_min_width_with_padding_child_width_lower_than_parent", () => {
    const root = Node.create();
    root.setWidth(1080);
    root.setHeight(1584);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(1080);
    expect(root.getComputedHeight()).toBe(1584);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(1080);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("justify_content_space_between_indefinite_container_dim_with_free_space", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setMinWidth(200);
    root_child0.setJustifyContent(JUSTIFY_SPACE_BETWEEN);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(125);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("justify_content_flex_start_row_reverse", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setJustifyContent(JUSTIFY_FLEX_START);

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

    expect(root_child0.getComputedLeft()).toBe(80);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(40);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("justify_content_flex_end_row_reverse", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root.setJustifyContent(JUSTIFY_FLEX_START);

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

    expect(root_child0.getComputedLeft()).toBe(80);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(20);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(40);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(20);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("justify_content_overflow_row_flex_start", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(80);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_overflow_row_flex_end", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(-18);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(22);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(62);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_overflow_row_center", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(-9);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(31);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(71);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_overflow_row_space_between", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_BETWEEN);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(80);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it("justify_content_overflow_row_space_around", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_AROUND);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(-3);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(31);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(65);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });

  it.skip("justify_content_overflow_row_space_evenly", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_EVENLY);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(102);
    root_child3.setHeight(102);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child3.setJustifyContent(JUSTIFY_SPACE_AROUND);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(40);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(40);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(102);
    root_child6.setHeight(102);
    root_child6.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child6.setJustifyContent(JUSTIFY_SPACE_EVENLY);
    root.insertChild(root_child6, 6);

    const root_child7 = Node.create();
    root_child7.setWidth(40);
    root.insertChild(root_child7, 7);

    const root_child8 = Node.create();
    root_child8.setWidth(40);
    root.insertChild(root_child8, 8);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(-38);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(-36);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(-35);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);

    expect(root_child3.getComputedLeft()).toBe(-33);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(102);
    expect(root_child3.getComputedHeight()).toBe(102);

    expect(root_child4.getComputedLeft()).toBe(31);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(40);
    expect(root_child4.getComputedHeight()).toBe(102);

    expect(root_child5.getComputedLeft()).toBe(33);
    expect(root_child5.getComputedTop()).toBe(0);
    expect(root_child5.getComputedWidth()).toBe(40);
    expect(root_child5.getComputedHeight()).toBe(102);

    expect(root_child6.getComputedLeft()).toBe(35);
    expect(root_child6.getComputedTop()).toBe(0);
    expect(root_child6.getComputedWidth()).toBe(102);
    expect(root_child6.getComputedHeight()).toBe(102);

    expect(root_child7.getComputedLeft()).toBe(98);
    expect(root_child7.getComputedTop()).toBe(0);
    expect(root_child7.getComputedWidth()).toBe(40);
    expect(root_child7.getComputedHeight()).toBe(102);

    expect(root_child8.getComputedLeft()).toBe(100);
    expect(root_child8.getComputedTop()).toBe(0);
    expect(root_child8.getComputedWidth()).toBe(40);
    expect(root_child8.getComputedHeight()).toBe(102);
  });

  it("justify_content_overflow_row_space_evenly_auto_margin", () => {
    const root = Node.create();
    root.setWidth(102);
    root.setHeight(102);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setJustifyContent(JUSTIFY_SPACE_EVENLY);

    const root_child0 = Node.create();
    root_child0.setWidth(40);
    root_child0.setMarginAuto(EDGE_RIGHT);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(40);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(40);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(102);
    expect(root.getComputedHeight()).toBe(102);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(40);
    expect(root_child0.getComputedHeight()).toBe(102);

    expect(root_child1.getComputedLeft()).toBe(22);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(102);

    expect(root_child2.getComputedLeft()).toBe(62);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(40);
    expect(root_child2.getComputedHeight()).toBe(102);
  });
});
