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
 * Generated from Yoga test fixtures: PercentageTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga PercentageTest", () => {
  it("percentage_width_height", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(30);
    root_child0.setHeightPercent(30);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(60);
  });

  it("percentage_position_left_top", () => {
    const root = Node.create();
    root.setWidth(400);
    root.setHeight(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(45);
    root_child0.setHeightPercent(55);
    root_child0.setPositionPercent(EDGE_LEFT, 10);
    root_child0.setPositionPercent(EDGE_TOP, 20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(400);
    expect(root.getComputedHeight()).toBe(400);

    expect(root_child0.getComputedLeft()).toBe(40);
    expect(root_child0.getComputedTop()).toBe(80);
    expect(root_child0.getComputedWidth()).toBe(180);
    expect(root_child0.getComputedHeight()).toBe(220);
  });

  it("percentage_position_bottom_right", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(55);
    root_child0.setHeightPercent(15);
    root_child0.setPositionPercent(EDGE_BOTTOM, 10);
    root_child0.setPositionPercent(EDGE_RIGHT, 20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(500);
    expect(root.getComputedHeight()).toBe(500);

    expect(root_child0.getComputedLeft()).toBe(-100);
    expect(root_child0.getComputedTop()).toBe(-50);
    expect(root_child0.getComputedWidth()).toBe(275);
    expect(root_child0.getComputedHeight()).toBe(75);
  });

  it("percentage_flex_basis", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root_child1.setFlexBasisPercent(25);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(125);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(125);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(75);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it.skip("percentage_flex_basis_cross", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root_child1.setFlexBasisPercent(25);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(200);
    root_child2.setHeight(200);
    root_child2.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setFlexGrow(2);
    root_child3.setMinHeightPercent(10);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(100);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(150);
    expect(root_child2.getComputedWidth()).toBe(200);
    expect(root_child2.getComputedHeight()).toBe(200);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(350);
    expect(root_child3.getComputedWidth()).toBe(200);
    expect(root_child3.getComputedHeight()).toBe(20);
  });

  it("percentage_flex_basis_main_max_height", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(10);
    root_child0.setMaxHeightPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(10);
    root_child1.setMaxHeightPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(52);
    expect(root_child0.getComputedHeight()).toBe(120);

    expect(root_child1.getComputedLeft()).toBe(52);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(148);
    expect(root_child1.getComputedHeight()).toBe(40);
  });

  it("percentage_flex_basis_cross_max_height", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(10);
    root_child0.setMaxHeightPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(10);
    root_child1.setMaxHeightPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(120);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(120);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(40);
  });

  it("percentage_flex_basis_main_max_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(15);
    root_child0.setMaxWidthPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(10);
    root_child1.setMaxWidthPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(120);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("percentage_flex_basis_cross_max_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(10);
    root_child0.setMaxWidthPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(15);
    root_child1.setMaxWidthPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(120);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(40);
    expect(root_child1.getComputedHeight()).toBe(150);
  });

  it("percentage_flex_basis_main_min_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(15);
    root_child0.setMinWidthPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(10);
    root_child1.setMinWidthPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(120);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(120);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(80);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("percentage_flex_basis_cross_min_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(10);
    root_child0.setMinWidthPercent(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(15);
    root_child1.setMinWidthPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(150);
  });

  it("percentage_multiple_nested_with_padding_margin_and_percentage_values", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasisPercent(10);
    root_child0.setMinWidthPercent(60);
    root_child0.setMargin(EDGE_ALL, 5);
    root_child0.setPadding(EDGE_ALL, 3);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasisPercent(15);
    root_child1.setMinWidthPercent(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(5);
    expect(root_child0.getComputedTop()).toBe(5);
    expect(root_child0.getComputedWidth()).toBe(190);
    expect(root_child0.getComputedHeight()).toBe(48);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(58);
    expect(root_child1.getComputedWidth()).toBe(200);
    expect(root_child1.getComputedHeight()).toBe(142);
  });

  it("percentage_margin_should_calculate_based_only_on_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setMarginPercent(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(160);
    expect(root_child0.getComputedHeight()).toBe(60);
  });

  it("percentage_padding_should_calculate_based_only_on_width", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setPaddingPercent(EDGE_ALL, 10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("percentage_absolute_position", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const root_child0 = Node.create();
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setPositionPercent(EDGE_TOP, 10);
    root_child0.setPositionPercent(EDGE_LEFT, 30);
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("percentage_width_height_undefined_parent_size", () => {
    const root = Node.create();
    root.setWidthPercent(50);
    root.setHeightPercent(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeightPercent(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(0);
    expect(root.getComputedHeight()).toBe(0);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(0);
  });

  it("percent_within_flex_grow", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setWidth(350);
    root.setHeight(100);
    root.setAlignItems(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(100);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(350);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(100);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(150);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(250);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("percentage_container_in_wrapping_container", () => {
    const root = Node.create();
    root.setAlignItems(ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setWidthPercent(100);
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
    expect(root_child0.getComputedTop()).toBe(75);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(75);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);
  });

  it("percent_absolute_position", () => {
    const root = Node.create();
    root.setWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidthPercent(100);
    root_child0.setPositionPercent(EDGE_LEFT, 50);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(100);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(30);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(60);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(60);
    expect(root_child1.getComputedHeight()).toBe(0);
  });

  it("percent_of_minmax_main", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setMinWidth(60);
    root.setMaxWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it.skip("percent_of_min_main", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setMinWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it.skip("percent_of_min_main_multiple", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setMinWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(50);
    root_child1.setHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(50);
    root_child2.setHeight(20);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(20);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(0);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it.skip("percent_of_max_main", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setMaxWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(30);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("percent_of_minmax_cross_stretched", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setMinWidth(60);
    root.setMaxWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("percent_absolute_of_minmax_cross_stretched", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setMinWidth(60);
    root.setMaxWidth(60);
    root.setHeight(50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root_child0.setPositionType(POSITION_TYPE_ABSOLUTE);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("percent_of_minmax_cross_unstretched", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setMinWidth(60);
    root.setMaxWidth(60);
    root.setHeight(50);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(30);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it.skip("percent_of_min_cross_unstretched", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setMinWidth(60);
    root.setHeight(50);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(60);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(20);
  });

  it("percent_of_max_cross_unstretched", () => {
    const root = Node.create();
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setMaxWidth(60);
    root.setHeight(50);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(50);
    root_child0.setHeight(20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(0);
    expect(root.getComputedHeight()).toBe(50);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(20);
  });
});
