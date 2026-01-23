import { describe, expect, it } from "vitest";
import {
  ALIGN_CENTER,
  ALIGN_FLEX_END,
  ALIGN_FLEX_START,
  ALIGN_STRETCH,
  createDefaultStyle,
  createValue,
  DIRECTION_LTR,
  DISPLAY_FLEX,
  EDGE_ALL,
  EDGE_BOTTOM,
  EDGE_LEFT,
  EDGE_RIGHT,
  EDGE_TOP,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_ROW,
  GUTTER_ALL,
  JUSTIFY_CENTER,
  JUSTIFY_FLEX_END,
  JUSTIFY_FLEX_START,
  JUSTIFY_SPACE_BETWEEN,
  MEASURE_MODE_AT_MOST,
  MEASURE_MODE_EXACTLY,
  MEASURE_MODE_UNDEFINED,
  Node,
  POSITION_TYPE_ABSOLUTE,
  POSITION_TYPE_RELATIVE,
  UNIT_AUTO,
  UNIT_PERCENT,
  UNIT_POINT,
  UNIT_UNDEFINED,
  WRAP_NO_WRAP,
} from "../src/index.js";

describe("Flexx Layout Engine", () => {
  describe("Basic Layout", () => {
    it("should layout a single node with explicit dimensions", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(root.getComputedWidth()).toBe(80);
      expect(root.getComputedHeight()).toBe(24);
      expect(root.getComputedLeft()).toBe(0);
      expect(root.getComputedTop()).toBe(0);
    });

    it("should layout a column with fixed-height children", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_COLUMN);

      const header = Node.create();
      header.setHeight(1);
      root.insertChild(header, 0);

      const content = Node.create();
      content.setFlexGrow(1);
      root.insertChild(content, 1);

      const footer = Node.create();
      footer.setHeight(1);
      root.insertChild(footer, 2);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Header: top of container
      expect(header.getComputedLeft()).toBe(0);
      expect(header.getComputedTop()).toBe(0);
      expect(header.getComputedWidth()).toBe(80);
      expect(header.getComputedHeight()).toBe(1);

      // Content: fills remaining space (24 - 1 - 1 = 22)
      expect(content.getComputedLeft()).toBe(0);
      expect(content.getComputedTop()).toBe(1);
      expect(content.getComputedWidth()).toBe(80);
      expect(content.getComputedHeight()).toBe(22);

      // Footer: bottom of container
      expect(footer.getComputedLeft()).toBe(0);
      expect(footer.getComputedTop()).toBe(23);
      expect(footer.getComputedWidth()).toBe(80);
      expect(footer.getComputedHeight()).toBe(1);
    });

    it("should layout a row with equal flex grow", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);

      const col1 = Node.create();
      col1.setFlexGrow(1);
      root.insertChild(col1, 0);

      const col2 = Node.create();
      col2.setFlexGrow(1);
      root.insertChild(col2, 1);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Each column gets half the width
      expect(col1.getComputedWidth()).toBe(40);
      expect(col1.getComputedHeight()).toBe(24);
      expect(col1.getComputedLeft()).toBe(0);

      expect(col2.getComputedWidth()).toBe(40);
      expect(col2.getComputedHeight()).toBe(24);
      expect(col2.getComputedLeft()).toBe(40);
    });
  });

  describe("Gap", () => {
    it("should apply gap between row children", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setGap(GUTTER_ALL, 2);

      const col1 = Node.create();
      col1.setFlexGrow(1);
      root.insertChild(col1, 0);

      const col2 = Node.create();
      col2.setFlexGrow(1);
      root.insertChild(col2, 1);

      const col3 = Node.create();
      col3.setFlexGrow(1);
      root.insertChild(col3, 2);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Available: 80 - 4 (2 gaps * 2) = 76
      // Each column: ~25.33, rounded
      expect(col1.getComputedLeft()).toBe(0);
      expect(col2.getComputedLeft()).toBeGreaterThan(
        col1.getComputedLeft() + col1.getComputedWidth(),
      );
      expect(col3.getComputedLeft()).toBeGreaterThan(
        col2.getComputedLeft() + col2.getComputedWidth(),
      );

      // Verify gap is applied
      const gap1 =
        col2.getComputedLeft() -
        (col1.getComputedLeft() + col1.getComputedWidth());
      const gap2 =
        col3.getComputedLeft() -
        (col2.getComputedLeft() + col2.getComputedWidth());
      expect(gap1).toBe(2);
      expect(gap2).toBe(2);
    });
  });

  describe("Absolute Positioning", () => {
    it("should position absolute children using margin", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);

      const modal = Node.create();
      modal.setPositionType(POSITION_TYPE_ABSOLUTE);
      modal.setWidth(40);
      modal.setHeight(10);
      modal.setMargin(EDGE_LEFT, 20);
      modal.setMargin(EDGE_TOP, 7);
      root.insertChild(modal, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(modal.getComputedLeft()).toBe(20);
      expect(modal.getComputedTop()).toBe(7);
      expect(modal.getComputedWidth()).toBe(40);
      expect(modal.getComputedHeight()).toBe(10);
    });
  });

  describe("Padding and Border", () => {
    it("should account for padding in child layout", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setPadding(EDGE_ALL, 2);

      const child = Node.create();
      child.setFlexGrow(1);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Child should be inset by padding
      expect(child.getComputedLeft()).toBe(2);
      expect(child.getComputedTop()).toBe(2);
      expect(child.getComputedWidth()).toBe(76); // 80 - 2 - 2
      expect(child.getComputedHeight()).toBe(20); // 24 - 2 - 2
    });

    it("should account for border in child layout", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setBorder(EDGE_ALL, 1);

      const child = Node.create();
      child.setFlexGrow(1);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Child should be inset by border
      expect(child.getComputedLeft()).toBe(1);
      expect(child.getComputedTop()).toBe(1);
      expect(child.getComputedWidth()).toBe(78); // 80 - 1 - 1
      expect(child.getComputedHeight()).toBe(22); // 24 - 1 - 1
    });
  });

  describe("Justify Content", () => {
    it("should justify content flex-end", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setJustifyContent(JUSTIFY_FLEX_END);

      const child = Node.create();
      child.setWidth(20);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedLeft()).toBe(60); // 80 - 20
    });

    it("should justify content center", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setJustifyContent(JUSTIFY_CENTER);

      const child = Node.create();
      child.setWidth(20);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedLeft()).toBe(30); // (80 - 20) / 2
    });

    it("should justify content space-between", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setJustifyContent(JUSTIFY_SPACE_BETWEEN);

      const child1 = Node.create();
      child1.setWidth(20);
      root.insertChild(child1, 0);

      const child2 = Node.create();
      child2.setWidth(20);
      root.insertChild(child2, 1);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child1.getComputedLeft()).toBe(0);
      expect(child2.getComputedLeft()).toBe(60); // 80 - 20
    });
  });

  describe("Align Items", () => {
    it("should align items center", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setAlignItems(ALIGN_CENTER);

      const child = Node.create();
      child.setWidth(20);
      child.setHeight(10);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedTop()).toBe(7); // (24 - 10) / 2
    });

    it("should align items flex-end", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.setFlexDirection(FLEX_DIRECTION_ROW);
      root.setAlignItems(ALIGN_FLEX_END);

      const child = Node.create();
      child.setWidth(20);
      child.setHeight(10);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedTop()).toBe(14); // 24 - 10
    });
  });

  describe("Measure Function", () => {
    it("should use measure function for intrinsic sizing", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);

      const text = Node.create();
      text.setMeasureFunc((width, widthMode, _height, _heightMode) => {
        // Simulate text that is 10 chars wide and 1 line tall
        const textWidth = 10;
        const textHeight = 1;

        if (widthMode === MEASURE_MODE_EXACTLY) {
          return { width, height: textHeight };
        } else if (widthMode === MEASURE_MODE_AT_MOST) {
          return { width: Math.min(textWidth, width), height: textHeight };
        }
        return { width: textWidth, height: textHeight };
      });
      root.insertChild(text, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(text.getComputedWidth()).toBe(10);
      expect(text.getComputedHeight()).toBe(1);
    });
  });

  describe("Flex Shrink", () => {
    it("should shrink children when they exceed available space", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setFlexDirection(FLEX_DIRECTION_ROW);

      const child1 = Node.create();
      child1.setWidth(50);
      child1.setFlexShrink(1);
      root.insertChild(child1, 0);

      const child2 = Node.create();
      child2.setWidth(50);
      child2.setFlexShrink(1);
      root.insertChild(child2, 1);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      // Both should shrink to fit: 80 / 2 = 40 each
      expect(child1.getComputedWidth()).toBe(40);
      expect(child2.getComputedWidth()).toBe(40);
    });
  });

  describe("Dirty Tracking", () => {
    it("should mark node dirty when properties change", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);
      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(root.isDirty()).toBe(false);

      root.setWidth(100);
      expect(root.isDirty()).toBe(true);
    });

    it("should propagate dirty flag to parent", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setHeight(24);

      const child = Node.create();
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);
      expect(root.isDirty()).toBe(false);

      child.setWidth(50);
      expect(root.isDirty()).toBe(true);
    });
  });

  describe("Percent Values", () => {
    it("should handle percent width", () => {
      const root = Node.create();
      root.setWidth(100);
      root.setHeight(50);

      const child = Node.create();
      child.setWidthPercent(50);
      child.setHeightPercent(50);
      root.insertChild(child, 0);

      root.calculateLayout(100, 50, DIRECTION_LTR);

      expect(child.getComputedWidth()).toBe(50);
      expect(child.getComputedHeight()).toBe(25);
    });
  });

  describe("Min/Max Constraints", () => {
    it("should respect minWidth", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setFlexDirection(FLEX_DIRECTION_ROW);

      const child = Node.create();
      child.setFlexGrow(1);
      child.setMinWidth(50);
      root.insertChild(child, 0);

      const child2 = Node.create();
      child2.setFlexGrow(1);
      root.insertChild(child2, 1);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedWidth()).toBeGreaterThanOrEqual(50);
    });

    it("should respect maxWidth", () => {
      const root = Node.create();
      root.setWidth(80);
      root.setFlexDirection(FLEX_DIRECTION_ROW);

      const child = Node.create();
      child.setFlexGrow(1);
      child.setMaxWidth(30);
      root.insertChild(child, 0);

      root.calculateLayout(80, 24, DIRECTION_LTR);

      expect(child.getComputedWidth()).toBeLessThanOrEqual(30);
    });
  });

  describe("Node Lifecycle", () => {
    it("should properly free nodes", () => {
      const root = Node.create();
      const child = Node.create();
      root.insertChild(child, 0);

      expect(root.getChildCount()).toBe(1);

      child.free();
      expect(root.getChildCount()).toBe(0);
      expect(child.getParent()).toBe(null);
    });

    it("should handle removeChild", () => {
      const root = Node.create();
      const child1 = Node.create();
      const child2 = Node.create();

      root.insertChild(child1, 0);
      root.insertChild(child2, 1);

      expect(root.getChildCount()).toBe(2);

      root.removeChild(child1);
      expect(root.getChildCount()).toBe(1);
      expect(root.getChild(0)).toBe(child2);
    });
  });

  describe("Style Getters", () => {
    it("should get width value after setting", () => {
      const node = Node.create();
      node.setWidth(100);
      expect(node.getWidth()).toEqual({ value: 100, unit: UNIT_POINT });
    });

    it("should get width percent after setting", () => {
      const node = Node.create();
      node.setWidthPercent(50);
      expect(node.getWidth()).toEqual({ value: 50, unit: UNIT_PERCENT });
    });

    it("should get width auto after setting", () => {
      const node = Node.create();
      node.setWidthAuto();
      expect(node.getWidth()).toEqual({ value: 0, unit: UNIT_AUTO });
    });

    it("should get height value after setting", () => {
      const node = Node.create();
      node.setHeight(200);
      expect(node.getHeight()).toEqual({ value: 200, unit: UNIT_POINT });
    });

    it("should get flex grow after setting", () => {
      const node = Node.create();
      node.setFlexGrow(2);
      expect(node.getFlexGrow()).toBe(2);
    });

    it("should get flex shrink after setting", () => {
      const node = Node.create();
      node.setFlexShrink(0.5);
      expect(node.getFlexShrink()).toBe(0.5);
    });

    it("should get flex direction after setting", () => {
      const node = Node.create();
      node.setFlexDirection(FLEX_DIRECTION_ROW);
      expect(node.getFlexDirection()).toBe(FLEX_DIRECTION_ROW);
    });

    it("should get flex wrap after setting", () => {
      const node = Node.create();
      node.setFlexWrap(WRAP_NO_WRAP);
      expect(node.getFlexWrap()).toBe(WRAP_NO_WRAP);
    });

    it("should get align items after setting", () => {
      const node = Node.create();
      node.setAlignItems(ALIGN_CENTER);
      expect(node.getAlignItems()).toBe(ALIGN_CENTER);
    });

    it("should get align self after setting", () => {
      const node = Node.create();
      node.setAlignSelf(ALIGN_FLEX_END);
      expect(node.getAlignSelf()).toBe(ALIGN_FLEX_END);
    });

    it("should get justify content after setting", () => {
      const node = Node.create();
      node.setJustifyContent(JUSTIFY_SPACE_BETWEEN);
      expect(node.getJustifyContent()).toBe(JUSTIFY_SPACE_BETWEEN);
    });

    it("should get padding after setting", () => {
      const node = Node.create();
      node.setPadding(EDGE_LEFT, 10);
      expect(node.getPadding(EDGE_LEFT)).toEqual({
        value: 10,
        unit: UNIT_POINT,
      });
    });

    it("should get margin after setting", () => {
      const node = Node.create();
      node.setMargin(EDGE_TOP, 5);
      expect(node.getMargin(EDGE_TOP)).toEqual({ value: 5, unit: UNIT_POINT });
    });

    it("should get border after setting", () => {
      const node = Node.create();
      node.setBorder(EDGE_ALL, 1);
      expect(node.getBorder(EDGE_LEFT)).toBe(1);
      expect(node.getBorder(EDGE_RIGHT)).toBe(1);
    });

    it("should get position type after setting", () => {
      const node = Node.create();
      node.setPositionType(POSITION_TYPE_ABSOLUTE);
      expect(node.getPositionType()).toBe(POSITION_TYPE_ABSOLUTE);
    });

    it("should have correct default values", () => {
      const node = Node.create();
      // Default flex shrink is 1 (Yoga default)
      expect(node.getFlexShrink()).toBe(1);
      // Default flex grow is 0
      expect(node.getFlexGrow()).toBe(0);
      // Default flex direction is column
      expect(node.getFlexDirection()).toBe(FLEX_DIRECTION_COLUMN);
      // Default align items is stretch
      expect(node.getAlignItems()).toBe(ALIGN_STRETCH);
      // Default justify content is flex start
      expect(node.getJustifyContent()).toBe(JUSTIFY_FLEX_START);
      // Default position type is relative
      expect(node.getPositionType()).toBe(POSITION_TYPE_RELATIVE);
    });
  });

  describe("Utility Functions", () => {
    describe("createValue", () => {
      it("should create a value with default parameters", () => {
        const value = createValue();
        expect(value).toEqual({ value: 0, unit: UNIT_UNDEFINED });
      });

      it("should create a value with specified value", () => {
        const value = createValue(100);
        expect(value).toEqual({ value: 100, unit: UNIT_UNDEFINED });
      });

      it("should create a value with specified value and unit", () => {
        const value = createValue(50, UNIT_PERCENT);
        expect(value).toEqual({ value: 50, unit: UNIT_PERCENT });
      });

      it("should create a point value", () => {
        const value = createValue(200, UNIT_POINT);
        expect(value).toEqual({ value: 200, unit: UNIT_POINT });
      });

      it("should create an auto value", () => {
        const value = createValue(0, UNIT_AUTO);
        expect(value).toEqual({ value: 0, unit: UNIT_AUTO });
      });
    });

    describe("createDefaultStyle", () => {
      it("should create a style object with correct defaults", () => {
        const style = createDefaultStyle();

        // Display and position
        expect(style.display).toBe(DISPLAY_FLEX);
        expect(style.positionType).toBe(POSITION_TYPE_RELATIVE);

        // Flex properties
        expect(style.flexDirection).toBe(FLEX_DIRECTION_COLUMN);
        expect(style.flexGrow).toBe(0);
        expect(style.flexShrink).toBe(1); // Yoga default
        expect(style.flexBasis).toEqual({ value: 0, unit: UNIT_AUTO });

        // Alignment
        expect(style.alignItems).toBe(ALIGN_STRETCH);
        expect(style.justifyContent).toBe(JUSTIFY_FLEX_START);

        // Dimensions default to auto
        expect(style.width).toEqual({ value: 0, unit: UNIT_AUTO });
        expect(style.height).toEqual({ value: 0, unit: UNIT_AUTO });

        // Min/max dimensions default to undefined
        expect(style.minWidth).toEqual({ value: 0, unit: UNIT_UNDEFINED });
        expect(style.maxWidth).toEqual({ value: 0, unit: UNIT_UNDEFINED });

        // Spacing defaults to zero/undefined
        expect(style.padding).toHaveLength(4);
        expect(style.margin).toHaveLength(4);
        expect(style.border).toEqual([0, 0, 0, 0]);
        expect(style.gap).toEqual([0, 0]);
      });

      it("should create independent style objects", () => {
        const style1 = createDefaultStyle();
        const style2 = createDefaultStyle();

        // Modifying one shouldn't affect the other
        style1.flexGrow = 5;
        expect(style2.flexGrow).toBe(0);

        style1.padding[0] = { value: 10, unit: UNIT_POINT };
        expect(style2.padding[0]).toEqual({ value: 0, unit: UNIT_UNDEFINED });
      });
    });
  });
});
