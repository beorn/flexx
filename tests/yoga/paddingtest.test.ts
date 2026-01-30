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
 * Generated from Yoga test fixtures: PaddingTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga PaddingTest", () => {
  it("padding_no_size", () => {
    const root = Node.create();
    root.setPadding(EDGE_ALL, 10);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(20);
    expect(root.getComputedHeight()).toBe(20);
  });

  it("padding_container_match_child", () => {
    const root = Node.create();
    root.setPadding(EDGE_ALL, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(30);
    expect(root.getComputedHeight()).toBe(30);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("padding_flex_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_ALL, 10);

    const root_child0 = Node.create();
    root_child0.setWidth(10);
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(80);
  });

  it("padding_stretch_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_ALL, 10);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(10);
    expect(root_child0.getComputedTop()).toBe(10);
    expect(root_child0.getComputedWidth()).toBe(80);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("padding_center_child", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPadding(EDGE_START, 10);
    root.setPadding(EDGE_TOP, 10);
    root.setPadding(EDGE_END, 20);
    root.setPadding(EDGE_BOTTOM, 20);
    root.setAlignItems(ALIGN_CENTER);
    root.setJustifyContent(JUSTIFY_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(10);
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(40);
    expect(root_child0.getComputedTop()).toBe(40);
    expect(root_child0.getComputedWidth()).toBe(10);
    expect(root_child0.getComputedHeight()).toBe(10);
  });

  it("child_with_padding_align_end", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setJustifyContent(JUSTIFY_FLEX_END);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root_child0.setPadding(EDGE_ALL, 20);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(100);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("physical_and_relative_edge_defined", () => {
    const root = Node.create();
    root.setWidth(200);
    root.setHeight(200);
    root.setPadding(EDGE_LEFT, 20);
    root.setPadding(EDGE_END, 50);

    const root_child0 = Node.create();
    root_child0.setWidthPercent(100);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(200);
    expect(root.getComputedHeight()).toBe(200);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(130);
    expect(root_child0.getComputedHeight()).toBe(50);
  });
});
