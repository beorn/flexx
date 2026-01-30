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
 * Generated from Yoga test fixtures: AbsolutePositionTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga AbsolutePositionTest", () => {
  it("absolute_layout_width_height_start_top", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_TOP, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("absolute_layout_width_height_left_auto_right", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_LEFT, NaN);
    root_child0.setPosition(EDGE_RIGHT, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(80);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("absolute_layout_width_height_left_right_auto", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_LEFT, 10);
    root_child0.setPosition(EDGE_RIGHT, NaN);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("absolute_layout_width_height_left_auto_right_auto", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_LEFT, NaN);
    root_child0.setPosition(EDGE_RIGHT, NaN);
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

  it("absolute_layout_width_height_end_bottom", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_BOTTOM, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(80);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("absolute_layout_start_top_end_bottom", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_TOP, 10);
    root_child0.setPosition(EDGE_BOTTOM, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(80);
  });

  it("absolute_layout_width_height_start_top_end_bottom", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_TOP, 10);
    root_child0.setPosition(EDGE_BOTTOM, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("do_not_clamp_height_of_absolute_node_to_height_of_its_overflow_hidden_parent", () => {
    const root = Node.create();
    root.setHeight(50);
    root.setWidth(50);
    root.setOverflow(OVERFLOW_HIDDEN);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPosition(EDGE_TOP, 0);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(50);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("absolute_layout_within_border", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(100);
    root.setBorder(EDGE_ALL, 10);
    root.setMargin(EDGE_ALL, 10);
    root.setPadding(EDGE_ALL, 10);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setPosition(EDGE_LEFT, 0);
    root_child0.setPosition(EDGE_TOP, 0);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root_child1.setPosition(EDGE_RIGHT, 0);
    root_child1.setPosition(EDGE_BOTTOM, 0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child2.setWidth(50);
    root_child2.setHeight(50);
    root_child2.setPosition(EDGE_LEFT, 0);
    root_child2.setPosition(EDGE_TOP, 0);
    root_child2.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child3.setWidth(50);
    root_child3.setHeight(50);
    root_child3.setPosition(EDGE_RIGHT, 0);
    root_child3.setPosition(EDGE_BOTTOM, 0);
    root_child3.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(10);
    expect(root.getComputedTop()).toBe(10);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(40);
    expect(root_child1.getComputedTop()).toBe(40);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(20);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(30);
    expect(root_child3.getComputedTop()).toBe(30);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);
  });

  it("absolute_layout_align_items_and_justify_content_center", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(25);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_and_justify_content_flex_end", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_FLEX_END);
    root.setJustifyContent(JUSTIFY_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(50);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_justify_content_center", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_center", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(25);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_center_on_child_only", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root_child0.setAlignSelf(ALIGN_CENTER);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(25);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_and_justify_content_center_and_top_position", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root_child0.setPosition(EDGE_TOP, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(25);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_and_justify_content_center_and_bottom_position", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root_child0.setPosition(EDGE_BOTTOM, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(25);
    expect(root_child0.getComputedTop()).toBe(50);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_and_justify_content_center_and_left_position", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root_child0.setPosition(EDGE_LEFT, 5);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(5);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("absolute_layout_align_items_and_justify_content_center_and_right_position", () => {
    const root = Node.create();
    root.setHeight(100);
    root.setWidth(110);
    root.setFlexGrow(1);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(60);
    root_child0.setHeight(40);
    root_child0.setPosition(EDGE_RIGHT, 5);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(110);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(45);
    expect(root_child0.getComputedTop()).toBe(30);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(40);
  });

  it("position_root_with_rtl_should_position_withoutdirection", () => {
    const root = Node.create();
    root.setHeight(52);
    root.setWidth(52);
    root.setPosition(EDGE_LEFT, 72);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(72);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(52);
    expect(root.getComputedHeight()).toBe(52);
  });

  it("absolute_layout_percentage_bottom_based_on_parent_height", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(200);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPositionPercent(EDGE_TOP, 50);
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child1.setPositionPercent(EDGE_BOTTOM, 50);
    root_child1.setWidth(10);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child2.setPositionPercent(EDGE_TOP, 10);
    root_child2.setWidth(10);
    root_child2.setPositionPercent(EDGE_BOTTOM, 10);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(90);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(160);
  });

  it("absolute_layout_in_wrap_reverse_column_container", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(80);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("absolute_layout_in_wrap_reverse_row_container", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(80);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("absolute_layout_in_wrap_reverse_column_container_flex_end", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("absolute_layout_in_wrap_reverse_row_container_flex_end", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP_REVERSE);

    const root_child0 = Node.create();
    root_child0.setWidth(20);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(20);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("percent_absolute_position_infinite_height", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(300);

    const root_child0 = Node.create();
    root_child0.setWidth(300);
    root_child0.setHeight(300);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(20);
    root_child1.setHeightPercent(20);
    root_child1.setPositionPercent(EDGE_LEFT, 20);
    root_child1.setPositionPercent(EDGE_TOP, 20);
    root_child1.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(300);
    expect(root_child0.getComputedHeight()).toBe(300);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(60);
    expect(root_child1.getComputedWidth()).toBe(60);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("absolute_layout_percentage_height_based_on_padded_parent", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_TOP, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeightPercent(50);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(45);
  });

  it("absolute_layout_percentage_height_based_on_padded_parent_and_align_items_center", () => {
    const root = Node.create();
    root.setPositionType(POSITION_TYPE_RELATIVE);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_TOP, 20);
    root.setPadding(EDGE_BOTTOM, 20);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(100);
    root_child0.setHeightPercent(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(35);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(30);
  });

  it("absolute_layout_padding_left", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setPadding(EDGE_LEFT, 100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);
  });

  it("absolute_layout_padding_right", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setPadding(EDGE_RIGHT, 100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);
  });

  it("absolute_layout_padding_top", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setPadding(EDGE_TOP, 100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);
  });

  it("absolute_layout_padding_bottom", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setPadding(EDGE_BOTTOM, 100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);
  });

  it("absolute_layout_padding", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setMargin(EDGE_ALL, 10);
    root.setPositionType(POSITION_TYPE_RELATIVE);

    const root_child0 = Node.create();
    root_child0.setWidth(200);
    root_child0.setHeight(200);
    root_child0.setMargin(EDGE_ALL, 10);
    root_child0.setPositionType(POSITION_TYPE_RELATIVE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(10);
    expect(root.getComputedTop()).toBe(10);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(200);
  });

  it("absolute_layout_border", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setMargin(EDGE_ALL, 10);
    root.setPositionType(POSITION_TYPE_RELATIVE);

    const root_child0 = Node.create();
    root_child0.setWidth(200);
    root_child0.setHeight(200);
    root_child0.setMargin(EDGE_ALL, 10);
    root_child0.setPositionType(POSITION_TYPE_RELATIVE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(10);
    expect(root.getComputedTop()).toBe(10);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(200);
  });

  it("absolute_layout_column_reverse_margin_border", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN_REVERSE);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root_child0.setPosition(EDGE_LEFT, 5);
    root_child0.setPosition(EDGE_RIGHT, 3);
    root_child0.setMargin(EDGE_RIGHT, 4);
    root_child0.setMargin(EDGE_LEFT, 3);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(8);
    expect(root_child0.getComputedTop()).toBe(150);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);
  });
});
