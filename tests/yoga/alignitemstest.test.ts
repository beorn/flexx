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
 * Generated from Yoga test fixtures: AlignItemsTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga AlignItemsTest", () => {
  it("align_items_stretch", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("align_items_center", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
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

  it("align_items_flex_start", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
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

  it("align_items_flex_end", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
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

  it("align_baseline", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
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
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
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
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_child_multiline", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(25);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(25);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(25);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(25);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(60);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(25);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(125);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(25);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(150);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(25);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_baseline_child_multiline_override", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(25);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(25);
    root_child2.setHeight(10);
    root_child2.setAlignSelf(ALIGN_BASELINE);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(25);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(25);
    root_child4.setHeight(10);
    root_child4.setAlignSelf(ALIGN_BASELINE);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(60);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(25);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(125);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(25);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(150);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(25);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_baseline_child_multiline_no_override_on_secondline", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(25);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(25);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(25);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(25);
    root_child4.setHeight(10);
    root_child4.setAlignSelf(ALIGN_BASELINE);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(60);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(25);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(125);
    expect(root_child3.getComputedTop()).toBe(40);
    expect(root_child3.getComputedWidth()).toBe(25);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(150);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(25);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_baseline_child_top", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setPosition(EDGE_TOP, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_child_top2", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root_child1.setPosition(EDGE_TOP, 5);
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
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_double_nested_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
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
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
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
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_child_margin", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMargin(EDGE_ALL, 5);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(5);
    expect(root_child0.getComputedTop()).toBe(5);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it("align_baseline_child_padding", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_ALL, 5);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root_child1.setPadding(EDGE_ALL, 5);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(5);
    expect(root_child0.getComputedTop()).toBe(5);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(55);
    expect(root_child1.getComputedTop()).toBe(35);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);
  });

  it.skip("align_baseline_multiline", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(100);
    root_child4.setHeight(100);
    root_child4.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root_child4.setAlignItems(ALIGN_BASELINE);
    root_child4.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(30);
    root_child5.setHeight(50);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(40);
    root_child6.setHeight(70);
    root.insertChild(root_child6, 6);

    const root_child7 = Node.create();
    root_child7.setWidth(50);
    root_child7.setHeight(20);
    root.insertChild(root_child7, 7);

    const root_child8 = Node.create();
    root_child8.setWidth(100);
    root_child8.setHeight(100);
    root_child8.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root_child8.setAlignItems(ALIGN_BASELINE);
    root_child8.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child8, 8);

    const root_child9 = Node.create();
    root_child9.setWidth(30);
    root_child9.setHeight(50);
    root_child9.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child9, 9);

    const root_child10 = Node.create();
    root_child10.setWidth(40);
    root_child10.setHeight(70);
    root_child10.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child10, 10);

    const root_child11 = Node.create();
    root_child11.setWidth(50);
    root_child11.setHeight(20);
    root_child11.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child11, 11);
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

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(80);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(100);
    expect(root_child4.getComputedWidth()).toBe(100);
    expect(root_child4.getComputedHeight()).toBe(100);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(220);
    expect(root_child5.getComputedWidth()).toBe(30);
    expect(root_child5.getComputedHeight()).toBe(50);

    expect(root_child6.getComputedLeft()).toBe(30);
    expect(root_child6.getComputedTop()).toBe(200);
    expect(root_child6.getComputedWidth()).toBe(40);
    expect(root_child6.getComputedHeight()).toBe(70);

    expect(root_child7.getComputedLeft()).toBe(0);
    expect(root_child7.getComputedTop()).toBe(270);
    expect(root_child7.getComputedWidth()).toBe(50);
    expect(root_child7.getComputedHeight()).toBe(20);

    expect(root_child8.getComputedLeft()).toBe(0);
    expect(root_child8.getComputedTop()).toBe(290);
    expect(root_child8.getComputedWidth()).toBe(100);
    expect(root_child8.getComputedHeight()).toBe(100);

    expect(root_child9.getComputedLeft()).toBe(0);
    expect(root_child9.getComputedTop()).toBe(410);
    expect(root_child9.getComputedWidth()).toBe(30);
    expect(root_child9.getComputedHeight()).toBe(50);

    expect(root_child10.getComputedLeft()).toBe(30);
    expect(root_child10.getComputedTop()).toBe(390);
    expect(root_child10.getComputedWidth()).toBe(40);
    expect(root_child10.getComputedHeight()).toBe(70);

    expect(root_child11.getComputedLeft()).toBe(0);
    expect(root_child11.getComputedTop()).toBe(460);
    expect(root_child11.getComputedWidth()).toBe(50);
    expect(root_child11.getComputedHeight()).toBe(20);
  });

  it("align_baseline_multiline_row_and_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_BASELINE);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root_child1.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(20);
    root_child2.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(20);
    root.insertChild(root_child3, 3);
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
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(20);
  });

  it("align_items_center_child_with_margin_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(26);
    expect(root_child0.getComputedTop()).toBe(26);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_items_flex_end_child_with_margin_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(26);
    expect(root_child0.getComputedTop()).toBe(26);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_items_center_child_without_margin_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(26);
    expect(root_child0.getComputedTop()).toBe(26);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_items_flex_end_child_without_margin_bigger_than_parent", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);

    expect(root_child0.getComputedLeft()).toBe(26);
    expect(root_child0.getComputedTop()).toBe(26);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_center_should_size_based_on_content", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_CENTER);
    root.setMargin(EDGE_TOP, 20);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(0);
    root_child0.setFlexShrink(1);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(20);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_stretch_should_size_based_on_parent", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setAlignItems(ALIGN_STRETCH);
    root.setMargin(EDGE_TOP, 20);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(0);
    root_child0.setFlexShrink(1);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(20);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_flex_start_with_shrinking_children", () => {
    const root = Node.create();
    root.setHeight(500);
    root.setWidth(500);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_FLEX_START);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(500);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_flex_start_with_stretching_children", () => {
    const root = Node.create();
    root.setHeight(500);
    root.setWidth(500);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_STRETCH);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(500);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_flex_start_with_shrinking_children_with_stretch", () => {
    const root = Node.create();
    root.setHeight(500);
    root.setWidth(500);

    const root_child0 = Node.create();
    root_child0.setAlignItems(ALIGN_FLEX_START);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(500);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("align_flex_end_with_row_reverse", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(75);
    root.setAlignItems(ALIGN_FLEX_END);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_RELATIVE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMargin(EDGE_RIGHT, 5);
    root_child0.setMargin(EDGE_LEFT, 3);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setPositionType(POSITION_TYPE_RELATIVE);
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(75);

    expect(root_child0.getComputedLeft()).toBe(3);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(58);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("align_stretch_with_row_reverse", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(75);
    root.setAlignItems(ALIGN_STRETCH);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_RELATIVE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setMargin(EDGE_RIGHT, 5);
    root_child0.setMargin(EDGE_LEFT, 3);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setPositionType(POSITION_TYPE_RELATIVE);
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(75);

    expect(root_child0.getComputedLeft()).toBe(3);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(58);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("align_items_non_stretch_s526008", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(400);
    root.setHeight(400);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(400);
    expect(root.getComputedHeight()).toBe(400);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(0);
  });
});
