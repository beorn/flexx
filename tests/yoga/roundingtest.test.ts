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
 * Generated from Yoga test fixtures: RoundingTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga RoundingTest", () => {
  it("rounding_flex_basis_flex_grow_row_width_of_100", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(33);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(33);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(34);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(67);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(33);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("rounding_flex_basis_flex_grow_row_prime_number_width", () => {
    const root = Node.create();
    root.setWidth(113);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setFlexGrow(1);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setFlexGrow(1);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(113);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(23);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(23);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(22);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(45);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(23);
    expect(root_child2.getComputedHeight()).toBe(100);

    expect(root_child3.getComputedLeft()).toBe(68);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(22);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(90);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(23);
    expect(root_child4.getComputedHeight()).toBe(100);
  });

  it("rounding_flex_basis_flex_shrink_row", () => {
    const root = Node.create();
    root.setWidth(101);
    root.setHeight(100);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setFlexBasis(100);
    root_child0.setFlexShrink(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexBasis(25);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setFlexBasis(25);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(101);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(51);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(51);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(25);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(76);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(25);
    expect(root_child2.getComputedHeight()).toBe(100);
  });

  it("rounding_flex_basis_overrides_main_size", () => {
    const root = Node.create();
    root.setHeight(113);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(64);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(64);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(24);
  });

  it("rounding_total_fractial", () => {
    const root = Node.create();
    root.setHeight(113.4);
    root.setWidth(87.4);

    const root_child0 = Node.create();
    root_child0.setHeight(20.3);
    root_child0.setFlexGrow(0.7);
    root_child0.setFlexBasis(50.3);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1.6);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10.7);
    root_child2.setFlexGrow(1.1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(87);
    expect(root_child0.getComputedHeight()).toBe(59);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(59);
    expect(root_child1.getComputedWidth()).toBe(87);
    expect(root_child1.getComputedHeight()).toBe(30);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(87);
    expect(root_child2.getComputedHeight()).toBe(24);
  });

  it("rounding_total_fractial_nested", () => {
    const root = Node.create();
    root.setHeight(113.4);
    root.setWidth(87.4);

    const root_child0 = Node.create();
    root_child0.setHeight(20.3);
    root_child0.setFlexGrow(0.7);
    root_child0.setFlexBasis(50.3);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setPosition(EDGE_TOP, 13.3);
    root_child1.setHeight(1.1);
    root_child1.setFlexGrow(4);
    root_child1.setFlexBasis(0.3);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1.6);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(10.7);
    root_child3.setFlexGrow(1.1);
    root.insertChild(root_child3, 3);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(87);
    expect(root_child0.getComputedHeight()).toBe(54);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(68);
    expect(root_child1.getComputedWidth()).toBe(87);
    expect(root_child1.getComputedHeight()).toBe(23);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(77);
    expect(root_child2.getComputedWidth()).toBe(87);
    expect(root_child2.getComputedHeight()).toBe(19);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(96);
    expect(root_child3.getComputedWidth()).toBe(87);
    expect(root_child3.getComputedHeight()).toBe(17);
  });

  it("rounding_fractial_input_1", () => {
    const root = Node.create();
    root.setHeight(113.4);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(64);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(64);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(24);
  });

  it("rounding_fractial_input_2", () => {
    const root = Node.create();
    root.setHeight(113.6);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(65);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(65);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(24);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(25);
  });

  it("rounding_fractial_input_3", () => {
    const root = Node.create();
    root.setPosition(EDGE_TOP, 0.3);
    root.setHeight(113.4);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(65);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(64);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(24);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(25);
  });

  it("rounding_fractial_input_4", () => {
    const root = Node.create();
    root.setPosition(EDGE_TOP, 0.7);
    root.setHeight(113.4);
    root.setWidth(100);

    const root_child0 = Node.create();
    root_child0.setHeight(20);
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(1);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(64);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(64);
    expect(root_child1.getComputedWidth()).toBe(100);
    expect(root_child1.getComputedHeight()).toBe(25);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(89);
    expect(root_child2.getComputedWidth()).toBe(100);
    expect(root_child2.getComputedHeight()).toBe(24);
  });

  it("rounding_inner_node_controversy_horizontal", () => {
    const root = Node.create();
    root.setWidth(320);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(10);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(107);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(107);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(106);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(213);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(107);
    expect(root_child2.getComputedHeight()).toBe(10);
  });

  it("rounding_inner_node_controversy_vertical", () => {
    const root = Node.create();
    root.setHeight(320);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(10);
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(10);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(10);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(107);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(107);
    expect(root_child1.getComputedWidth()).toBe(10);
    expect(root_child1.getComputedHeight()).toBe(106);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(213);
    expect(root_child2.getComputedWidth()).toBe(10);
    expect(root_child2.getComputedHeight()).toBe(107);
  });

  it("rounding_inner_node_controversy_combined", () => {
    const root = Node.create();
    root.setWidth(640);
    root.setHeight(320);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setHeightPercent(100);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeightPercent(100);
    root_child1.setFlexGrow(1);
    root_child1.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(100);
    root_child2.setFlexGrow(1);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidthPercent(100);
    root_child3.setFlexGrow(1);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeightPercent(100);
    root_child4.setFlexGrow(1);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(640);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(0);
    expect(root_child0.getComputedHeight()).toBe(320);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(320);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(640);
    expect(root_child2.getComputedHeight()).toBe(320);

    expect(root_child3.getComputedLeft()).toBe(640);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(640);
    expect(root_child3.getComputedHeight()).toBe(320);

    expect(root_child4.getComputedLeft()).toBe(1280);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(0);
    expect(root_child4.getComputedHeight()).toBe(320);
  });
});
