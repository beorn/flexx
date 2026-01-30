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
 * Generated from Yoga test fixtures: AlignContentTest
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */

describe("Yoga AlignContentTest", () => {
  it("align_content_flex_start_nowrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);
  });

  it("align_content_flex_start_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_FLEX_START);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(30);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(150);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_flex_start_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_FLEX_START);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_flex_start_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_FLEX_START);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_flex_start_without_height_on_children", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(0);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(0);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(0);
  });

  it("align_content_flex_start_with_flex", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignContent(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setFlexShrink(0);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_FLEX_END);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(37);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(37);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(46);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(83);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(0);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(83);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(37);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(120);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(0);

    expect(root_child5.getComputedLeft()).toBe(50);
    expect(root_child5.getComputedTop()).toBe(0);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(190);
    expect(root_child6.getComputedTop()).toBe(0);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_flex_end_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_FLEX_END);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-40);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(-40);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(-30);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(-30);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(-20);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(-10);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(110);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_flex_end_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_FLEX_END);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_flex_end_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_FLEX_END);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(140);
    root_child3.setHeight(120);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child3.setAlignContent(ALIGN_CENTER);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(140);
    expect(root_child3.getComputedHeight()).toBe(120);

    expect(root_child4.getComputedLeft()).toBe(60);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_content_center_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_CENTER);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-20);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(-20);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(-10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(-10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(10);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(130);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_center_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_CENTER);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_center_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_CENTER);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(140);
    root_child3.setHeight(120);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child3.setAlignContent(ALIGN_SPACE_BETWEEN);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(140);
    expect(root_child3.getComputedHeight()).toBe(120);

    expect(root_child4.getComputedLeft()).toBe(60);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_content_space_between_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_SPACE_BETWEEN);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_SPACE_BETWEEN);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(30);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(150);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_space_between_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_BETWEEN);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_space_between_wrapped_negative_space_row_reverse", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_BETWEEN);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_space_between_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_BETWEEN);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(140);
    root_child3.setHeight(120);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child3.setAlignContent(ALIGN_SPACE_AROUND);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(140);
    expect(root_child3.getComputedHeight()).toBe(120);

    expect(root_child4.getComputedLeft()).toBe(60);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_content_space_around_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_SPACE_AROUND);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child5.setAlignContent(ALIGN_SPACE_AROUND);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(-20);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(-20);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(-10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(-10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(0);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(10);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(130);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_space_around_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_AROUND);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_space_around_wrapped_negative_space_row_reverse", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW_REVERSE);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_AROUND);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_space_around_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setAlignContent(ALIGN_SPACE_AROUND);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(140);
    root_child3.setHeight(120);
    root_child3.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(140);
    expect(root_child3.getComputedHeight()).toBe(120);

    expect(root_child4.getComputedLeft()).toBe(60);
    expect(root_child4.getComputedTop()).toBe(230);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_content_space_evenly_wrap", () => {
    const root = Node.create();
    root.setWidth(140);
    root.setHeight(120);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(10);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setHeight(10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root_child4.setHeight(10);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(140);
    root_child5.setHeight(120);
    root_child5.setFlexWrap(WRAP_WRAP);
    root_child5.setFlexDirection(FLEX_DIRECTION_ROW);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root_child6.setHeight(10);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(140);
    expect(root.getComputedHeight()).toBe(120);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(10);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(10);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(10);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(10);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);

    expect(root_child5.getComputedLeft()).toBe(0);
    expect(root_child5.getComputedTop()).toBe(30);
    expect(root_child5.getComputedWidth()).toBe(140);
    expect(root_child5.getComputedHeight()).toBe(120);

    expect(root_child6.getComputedLeft()).toBe(0);
    expect(root_child6.getComputedTop()).toBe(150);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(10);
  });

  it("align_content_space_evenly_wrapped_negative_space", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);
  });

  it("align_content_space_evenly_wrapped_negative_space_gap", () => {
    const root = Node.create();
    root.setDisplay(DISPLAY_FLEX);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setWidth(320);
    root.setHeight(320);
    root.setBorder(EDGE_ALL, 60);

    const root_child0 = Node.create();
    root_child0.setDisplay(DISPLAY_FLEX);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setFlexWrap(WRAP_WRAP);
    root_child0.setJustifyContent(JUSTIFY_CENTER);
    root_child0.setHeight(10);
    root_child0.setGap(GUTTER_ALL, 10);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidthPercent(80);
    root_child1.setHeight(20);
    root_child1.setFlexShrink(0);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidthPercent(80);
    root_child2.setHeight(20);
    root_child2.setFlexShrink(0);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(150);
    root_child3.setHeight(100);
    root_child3.setFlexWrap(WRAP_WRAP);
    root_child3.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root_child3.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setWidth(50);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setWidth(50);
    root.insertChild(root_child6, 6);

    const root_child7 = Node.create();
    root_child7.setWidth(50);
    root.insertChild(root_child7, 7);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(320);

    expect(root_child0.getComputedLeft()).toBe(60);
    expect(root_child0.getComputedTop()).toBe(60);
    expect(root_child0.getComputedWidth()).toBe(200);
    expect(root_child0.getComputedHeight()).toBe(10);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(70);
    expect(root_child1.getComputedWidth()).toBe(160);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(60);
    expect(root_child2.getComputedTop()).toBe(90);
    expect(root_child2.getComputedWidth()).toBe(160);
    expect(root_child2.getComputedHeight()).toBe(20);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(110);
    expect(root_child3.getComputedWidth()).toBe(150);
    expect(root_child3.getComputedHeight()).toBe(100);

    expect(root_child4.getComputedLeft()).toBe(60);
    expect(root_child4.getComputedTop()).toBe(210);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(0);

    expect(root_child5.getComputedLeft()).toBe(60);
    expect(root_child5.getComputedTop()).toBe(210);
    expect(root_child5.getComputedWidth()).toBe(50);
    expect(root_child5.getComputedHeight()).toBe(0);

    expect(root_child6.getComputedLeft()).toBe(60);
    expect(root_child6.getComputedTop()).toBe(210);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(0);

    expect(root_child7.getComputedLeft()).toBe(60);
    expect(root_child7.getComputedTop()).toBe(210);
    expect(root_child7.getComputedWidth()).toBe(50);
    expect(root_child7.getComputedHeight()).toBe(0);
  });

  it("align_content_stretch_row", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_children", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_flex", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(100);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_flex_no_shrink", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setFlexShrink(0);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(100);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(100);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_margin", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setMargin(EDGE_ALL, 10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(40);

    expect(root_child1.getComputedLeft()).toBe(60);
    expect(root_child1.getComputedTop()).toBe(10);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(40);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(40);

    expect(root_child3.getComputedLeft()).toBe(60);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(0);
    expect(root_child4.getComputedTop()).toBe(80);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(20);
  });

  it("align_content_stretch_row_with_padding", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root_child3.setPadding(EDGE_ALL, 10);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_single_row", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

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
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(100);
  });

  it("align_content_stretch_row_with_fixed_height", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(60);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(80);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(60);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(80);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(80);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(20);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(80);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(20);
  });

  it("align_content_stretch_row_with_max_height", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setMaxHeight(20);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(20);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(50);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_row_with_min_height", () => {
    const root = Node.create();
    root.setWidth(150);
    root.setHeight(100);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setWidth(50);
    root_child1.setMinHeight(80);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setWidth(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setWidth(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setWidth(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(150);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(90);

    expect(root_child1.getComputedLeft()).toBe(50);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(90);

    expect(root_child2.getComputedLeft()).toBe(100);
    expect(root_child2.getComputedTop()).toBe(0);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(90);

    expect(root_child3.getComputedLeft()).toBe(0);
    expect(root_child3.getComputedTop()).toBe(90);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(10);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(90);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(10);
  });

  it("align_content_stretch_column", () => {
    const root = Node.create();
    root.setWidth(100);
    root.setHeight(150);
    root.setFlexWrap(WRAP_WRAP);
    root.setFlexDirection(FLEX_DIRECTION_COLUMN);
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(50);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(50);
    root.insertChild(root_child4, 4);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(150);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(50);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(50);
    expect(root_child1.getComputedWidth()).toBe(50);
    expect(root_child1.getComputedHeight()).toBe(50);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(100);
    expect(root_child2.getComputedWidth()).toBe(50);
    expect(root_child2.getComputedHeight()).toBe(50);

    expect(root_child3.getComputedLeft()).toBe(50);
    expect(root_child3.getComputedTop()).toBe(0);
    expect(root_child3.getComputedWidth()).toBe(50);
    expect(root_child3.getComputedHeight()).toBe(50);

    expect(root_child4.getComputedLeft()).toBe(50);
    expect(root_child4.getComputedTop()).toBe(50);
    expect(root_child4.getComputedWidth()).toBe(50);
    expect(root_child4.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_is_not_overriding_align_items", () => {
    const root = Node.create();
    root.setAlignContent(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root_child0.setAlignItems(ALIGN_CENTER);
    root_child0.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child0.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);
  });

  it("align_content_stretch_with_min_cross_axis", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMinHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);

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

  it("align_content_stretch_with_max_cross_axis", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMaxHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);

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
    expect(root_child1.getComputedTop()).toBe(250);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("align_content_stretch_with_max_cross_axis_and_border_padding", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMaxHeight(500);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);
    root.setBorder(EDGE_ALL, NaN);
    root.setPadding(EDGE_ALL, 2);

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
    expect(root.getComputedHeight()).toBe(404);

    expect(root_child0.getComputedLeft()).toBe(2);
    expect(root_child0.getComputedTop()).toBe(2);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(2);
    expect(root_child1.getComputedTop()).toBe(250);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("align_content_space_evenly_with_min_cross_axis", () => {
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

  it("align_content_space_evenly_with_max_cross_axis", () => {
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

  it("align_content_space_evenly_with_max_cross_axis_violated", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMaxHeight(300);
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
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(0);
    expect(root_child1.getComputedTop()).toBe(200);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("align_content_space_evenly_with_max_cross_axis_violated_padding_and_border", () => {
    const root = Node.create();
    root.setWidth(500);
    root.setMaxHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setBorder(EDGE_ALL, NaN);
    root.setPadding(EDGE_ALL, 2);

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
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(2);
    expect(root_child0.getComputedTop()).toBe(2);
    expect(root_child0.getComputedWidth()).toBe(400);
    expect(root_child0.getComputedHeight()).toBe(200);

    expect(root_child1.getComputedLeft()).toBe(2);
    expect(root_child1.getComputedTop()).toBe(202);
    expect(root_child1.getComputedWidth()).toBe(400);
    expect(root_child1.getComputedHeight()).toBe(200);
  });

  it("align_content_space_around_and_align_items_flex_end_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_SPACE_AROUND);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(163);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(113);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(288);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_space_around_and_align_items_center_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_SPACE_AROUND);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(100);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(250);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_space_around_and_align_items_flex_start_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_SPACE_AROUND);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(38);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(38);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(213);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_flex_start_stretch_doesnt_influence_line_box_dim", () => {
    const root = Node.create();
    root.setWidth(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setPadding(EDGE_TOP, 20);
    root.setPadding(EDGE_BOTTOM, 20);
    root.setPadding(EDGE_LEFT, 20);
    root.setPadding(EDGE_RIGHT, 20);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexShrink(1);
    root_child1.setFlexGrow(1);
    root_child1.setAlignContent(ALIGN_FLEX_START);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root_child2.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root_child3.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(30);
    root_child4.setWidth(30);
    root_child4.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setHeight(30);
    root_child5.setWidth(30);
    root_child5.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setHeight(50);
    root_child6.setWidth(50);
    root_child6.setMargin(EDGE_LEFT, 20);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(400);
    expect(root.getComputedHeight()).toBe(140);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(140);
    expect(root_child1.getComputedTop()).toBe(20);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(140);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(190);
    expect(root_child3.getComputedTop()).toBe(20);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);

    expect(root_child4.getComputedLeft()).toBe(240);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(30);

    expect(root_child5.getComputedLeft()).toBe(290);
    expect(root_child5.getComputedTop()).toBe(20);
    expect(root_child5.getComputedWidth()).toBe(30);
    expect(root_child5.getComputedHeight()).toBe(30);

    expect(root_child6.getComputedLeft()).toBe(360);
    expect(root_child6.getComputedTop()).toBe(20);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_stretch_does_influence_line_box_dim", () => {
    const root = Node.create();
    root.setWidth(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setPadding(EDGE_TOP, 20);
    root.setPadding(EDGE_BOTTOM, 20);
    root.setPadding(EDGE_LEFT, 20);
    root.setPadding(EDGE_RIGHT, 20);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexShrink(1);
    root_child1.setFlexGrow(1);
    root_child1.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root_child2.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root_child3.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(30);
    root_child4.setWidth(30);
    root_child4.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setHeight(30);
    root_child5.setWidth(30);
    root_child5.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setHeight(50);
    root_child6.setWidth(50);
    root_child6.setMargin(EDGE_LEFT, 20);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(400);
    expect(root.getComputedHeight()).toBe(140);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(140);
    expect(root_child1.getComputedTop()).toBe(20);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(140);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(190);
    expect(root_child3.getComputedTop()).toBe(20);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);

    expect(root_child4.getComputedLeft()).toBe(240);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(30);

    expect(root_child5.getComputedLeft()).toBe(290);
    expect(root_child5.getComputedTop()).toBe(20);
    expect(root_child5.getComputedWidth()).toBe(30);
    expect(root_child5.getComputedHeight()).toBe(30);

    expect(root_child6.getComputedLeft()).toBe(360);
    expect(root_child6.getComputedTop()).toBe(20);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(50);
  });

  it("align_content_space_evenly_stretch_does_influence_line_box_dim", () => {
    const root = Node.create();
    root.setWidth(400);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setPadding(EDGE_TOP, 20);
    root.setPadding(EDGE_BOTTOM, 20);
    root.setPadding(EDGE_LEFT, 20);
    root.setPadding(EDGE_RIGHT, 20);

    const root_child0 = Node.create();
    root_child0.setHeight(100);
    root_child0.setWidth(100);
    root_child0.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setFlexDirection(FLEX_DIRECTION_ROW);
    root_child1.setFlexWrap(WRAP_WRAP);
    root_child1.setFlexShrink(1);
    root_child1.setFlexGrow(1);
    root_child1.setAlignContent(ALIGN_STRETCH);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(30);
    root_child2.setWidth(30);
    root_child2.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child2, 2);

    const root_child3 = Node.create();
    root_child3.setHeight(30);
    root_child3.setWidth(30);
    root_child3.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child3, 3);

    const root_child4 = Node.create();
    root_child4.setHeight(30);
    root_child4.setWidth(30);
    root_child4.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child4, 4);

    const root_child5 = Node.create();
    root_child5.setHeight(30);
    root_child5.setWidth(30);
    root_child5.setMargin(EDGE_RIGHT, 20);
    root.insertChild(root_child5, 5);

    const root_child6 = Node.create();
    root_child6.setHeight(50);
    root_child6.setWidth(50);
    root_child6.setMargin(EDGE_LEFT, 20);
    root.insertChild(root_child6, 6);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(400);
    expect(root.getComputedHeight()).toBe(140);

    expect(root_child0.getComputedLeft()).toBe(20);
    expect(root_child0.getComputedTop()).toBe(20);
    expect(root_child0.getComputedWidth()).toBe(100);
    expect(root_child0.getComputedHeight()).toBe(100);

    expect(root_child1.getComputedLeft()).toBe(140);
    expect(root_child1.getComputedTop()).toBe(20);
    expect(root_child1.getComputedWidth()).toBe(0);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(140);
    expect(root_child2.getComputedTop()).toBe(20);
    expect(root_child2.getComputedWidth()).toBe(30);
    expect(root_child2.getComputedHeight()).toBe(30);

    expect(root_child3.getComputedLeft()).toBe(190);
    expect(root_child3.getComputedTop()).toBe(20);
    expect(root_child3.getComputedWidth()).toBe(30);
    expect(root_child3.getComputedHeight()).toBe(30);

    expect(root_child4.getComputedLeft()).toBe(240);
    expect(root_child4.getComputedTop()).toBe(20);
    expect(root_child4.getComputedWidth()).toBe(30);
    expect(root_child4.getComputedHeight()).toBe(30);

    expect(root_child5.getComputedLeft()).toBe(290);
    expect(root_child5.getComputedTop()).toBe(20);
    expect(root_child5.getComputedWidth()).toBe(30);
    expect(root_child5.getComputedHeight()).toBe(30);

    expect(root_child6.getComputedLeft()).toBe(360);
    expect(root_child6.getComputedTop()).toBe(20);
    expect(root_child6.getComputedWidth()).toBe(50);
    expect(root_child6.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_and_align_items_flex_end_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);
    root.setAlignItems(ALIGN_FLEX_END);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root_child0.setAlignSelf(ALIGN_FLEX_START);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(0);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(75);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(250);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_and_align_items_flex_start_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);
    root.setAlignItems(ALIGN_FLEX_START);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(125);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(175);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_and_align_items_center_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);
    root.setAlignItems(ALIGN_CENTER);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(125);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(38);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(213);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });

  it("align_content_stretch_and_align_items_stretch_with_flex_wrap", () => {
    const root = Node.create();
    root.setWidth(300);
    root.setHeight(300);
    root.setFlexDirection(FLEX_DIRECTION_ROW);
    root.setFlexWrap(WRAP_WRAP);
    root.setAlignContent(ALIGN_STRETCH);
    root.setAlignItems(ALIGN_STRETCH);

    const root_child0 = Node.create();
    root_child0.setHeight(50);
    root_child0.setWidth(150);
    root_child0.setAlignSelf(ALIGN_FLEX_END);
    root.insertChild(root_child0, 0);

    const root_child1 = Node.create();
    root_child1.setHeight(100);
    root_child1.setWidth(120);
    root.insertChild(root_child1, 1);

    const root_child2 = Node.create();
    root_child2.setHeight(50);
    root_child2.setWidth(120);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(300);
    expect(root.getComputedHeight()).toBe(300);

    expect(root_child0.getComputedLeft()).toBe(0);
    expect(root_child0.getComputedTop()).toBe(125);
    expect(root_child0.getComputedWidth()).toBe(150);
    expect(root_child0.getComputedHeight()).toBe(50);

    expect(root_child1.getComputedLeft()).toBe(150);
    expect(root_child1.getComputedTop()).toBe(0);
    expect(root_child1.getComputedWidth()).toBe(120);
    expect(root_child1.getComputedHeight()).toBe(100);

    expect(root_child2.getComputedLeft()).toBe(0);
    expect(root_child2.getComputedTop()).toBe(175);
    expect(root_child2.getComputedWidth()).toBe(120);
    expect(root_child2.getComputedHeight()).toBe(50);
  });
});
