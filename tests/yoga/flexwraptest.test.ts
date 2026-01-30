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
 * Generated from Yoga test fixtures: FlexWrapTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga FlexWrapTest", () => {
  it("wrap_column", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setHeight(30);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(30);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(30);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(30);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(60);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(30);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);
  });

  it("wrap_row", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setHeight(30);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(30);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(60);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(30);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(30);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(30);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);
  });

  it("wrap_row_align_items_flex_end", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(60);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(30);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);
  });

  it("wrap_row_align_items_center", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(60);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(5);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(30);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);
  });

  it("flex_wrap_children_with_min_main_overriding_flex_basis", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexBasis(50);
    root_child0.setHeight(50);
    root_child0.setMinWidth(55);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexBasis(50);
    root_child1.setHeight(50);
    root_child1.setMinWidth(55);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(55);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(55);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("flex_wrap_wrap_to_child_height", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_FLEX_START);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setAlignItems(ALIGN_FLEX_START);
    root_child0.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(100);
    root_child1.setHeight(100);
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

  it("flex_wrap_align_stretch_fits_one_row", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("wrap_reverse_row_align_content_flex_start", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(70);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(60);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrap_reverse_row_align_content_center", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignContent(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(70);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(60);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrap_reverse_row_single_line_different_size", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(40);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(30);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(90);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(120);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrap_reverse_row_align_content_stretch", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(70);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(60);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrap_reverse_row_align_content_space_around", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignContent(ALIGN_SPACE_AROUND);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(80);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(70);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(30);
    expect(root_child1.getComputedTop()).toBe(60);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(50);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(30);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrap_reverse_column_fixed_size", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setFlexWrap(WRAP_WRAP_REVERSE);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(30);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(20);
    root_child1.setWidth(30);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(40);
    root_child3.setWidth(30);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root_child4.setWidth(30);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(170);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(170);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(30);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(170);
    expect(root_child2.getComputedTop()).toBe(30);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(170);
    expect(root_child3.getComputedTop()).toBe(60);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(40);

    expect(root_child4.getComputedLeft()).toBe(140);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("wrapped_row_within_align_items_center", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(80);
    root_child1.setHeight(80);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(100);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(80);
    expect(root_child1.getComputedHeight()).toBe(80);
  });

  it("wrapped_row_within_align_items_flex_start", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(80);
    root_child1.setHeight(80);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(80);
    expect(root_child1.getComputedHeight()).toBe(80);
  });

  it("wrapped_row_within_align_items_flex_end", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(80);
    root_child1.setHeight(80);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(200);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(80);
    expect(root_child1.getComputedHeight()).toBe(80);
  });

  it("wrapped_column_max_height", () => {
    const root = Node.create();
    root.setHeight(500);
    root.setWidth(700);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setAlignContent(ALIGN_CENTER);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(500);
    root_child0.setMaxHeight(200);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(200);
    root_child1.setHeight(200);
    root_child1.setMargin(EDGE_ALL, 20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(700);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(250);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(200);
    expect(root_child1.getComputedTop()).toBe(250);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(200);

    expect(root_child2.getComputedLeft()).toBe(420);
    expect(root_child2.getComputedTop()).toBe(200);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("wrapped_column_max_height_flex", () => {
    const root = Node.create();
    root.setHeight(500);
    root.setWidth(700);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setAlignContent(ALIGN_CENTER);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(500);
    root_child0.setMaxHeight(200);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(200);
    root_child1.setHeight(200);
    root_child1.setMargin(EDGE_ALL, 20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root_child2.setHeight(100);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(700);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(250);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(200);
    expect(root_child1.getComputedTop()).toBe(220);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(260);

    expect(root_child2.getComputedLeft()).toBe(420);
    expect(root_child2.getComputedTop()).toBe(200);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("wrap_nodes_with_content_sizing_overflowing_margin", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setHeight(500);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setWidth(85);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setMargin(EDGE_RIGHT, 10);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(85);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(490);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("wrap_nodes_with_content_sizing_margin_cross", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setHeight(500);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setWidth(70);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setMargin(EDGE_TOP, 10);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(70);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(500);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("wrap_with_min_cross_axis", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMinHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(400);
    root_child0.setHeight(200);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(400);
    root_child1.setHeight(200);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(1000);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(200);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("wrap_with_max_cross_axis", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMaxHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root_child0.setWidth(400);
    root_child0.setHeight(200);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(400);
    root_child1.setHeight(200);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(400);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(200);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("nowrap_expands_flexline_box_to_min_cross", () => {
    const root = Node.create();
    root.setMinHeight(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_STRETCH);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(0);
    expect(root.getComputedHeight()).toBe(400);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(400);
  });

  it("wrap_does_not_impose_min_cross_onto_single_flexline", () => {
    const root = Node.create();
    root.setMinHeight(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignItems(ALIGN_STRETCH);
    root.setAlignContent(ALIGN_FLEX_START);
    root.setFlexWrap(WRAP_WRAP);

    const root_child0 = Node.create();
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(0);
    expect(root.getComputedHeight()).toBe(400);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });
});
