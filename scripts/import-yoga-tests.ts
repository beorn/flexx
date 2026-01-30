#!/usr/bin/env bun
/**
 * Import Yoga test fixtures and generate Flexx compatibility tests.
 *
 * Approach:
 * 1. Download/parse Yoga's HTML fixtures from gentest/fixtures/
 * 2. Convert CSS styles to Flexx API calls
 * 3. Use yoga-wasm-web as reference to compute expected values
 * 4. Generate test files comparing Flexx against Yoga output
 *
 * Usage:
 *   bun scripts/import-yoga-tests.ts [--fixture <name>] [--dry-run]
 *
 * Options:
 *   --fixture <name>   Only process specific fixture (e.g., YGFlexDirectionTest)
 *   --dry-run          Parse and show what would be generated, don't write files
 *
 * Attribution:
 *   Test fixtures are derived from Facebook's Yoga project (MIT License)
 *   https://github.com/facebook/yoga
 */

import type { Yoga } from "yoga-wasm-web";

// Initialize Yoga (async WASM load via auto-loader)
const { default: yoga } = (await import("yoga-wasm-web/auto")) as { default: Yoga };

//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------

interface ParsedTest {
  id: string;
  disabled: boolean;
  root: ParsedNode;
}

interface ParsedNode {
  styles: Record<string, string>;
  children: ParsedNode[];
}

interface ComputedLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  children: ComputedLayout[];
}

//------------------------------------------------------------------------------
// CSS to Yoga/Flexx mapping
//------------------------------------------------------------------------------

const FLEX_DIRECTION_MAP: Record<string, number> = {
  column: yoga.FLEX_DIRECTION_COLUMN,
  "column-reverse": yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  row: yoga.FLEX_DIRECTION_ROW,
  "row-reverse": yoga.FLEX_DIRECTION_ROW_REVERSE,
};

const JUSTIFY_MAP: Record<string, number> = {
  "flex-start": yoga.JUSTIFY_FLEX_START,
  center: yoga.JUSTIFY_CENTER,
  "flex-end": yoga.JUSTIFY_FLEX_END,
  "space-between": yoga.JUSTIFY_SPACE_BETWEEN,
  "space-around": yoga.JUSTIFY_SPACE_AROUND,
  "space-evenly": yoga.JUSTIFY_SPACE_EVENLY,
};

const ALIGN_MAP: Record<string, number> = {
  auto: yoga.ALIGN_AUTO,
  "flex-start": yoga.ALIGN_FLEX_START,
  center: yoga.ALIGN_CENTER,
  "flex-end": yoga.ALIGN_FLEX_END,
  stretch: yoga.ALIGN_STRETCH,
  baseline: yoga.ALIGN_BASELINE,
  "space-between": yoga.ALIGN_SPACE_BETWEEN,
  "space-around": yoga.ALIGN_SPACE_AROUND,
};

const WRAP_MAP: Record<string, number> = {
  nowrap: yoga.WRAP_NO_WRAP,
  wrap: yoga.WRAP_WRAP,
  "wrap-reverse": yoga.WRAP_WRAP_REVERSE,
};

const POSITION_MAP: Record<string, number> = {
  static: yoga.POSITION_TYPE_STATIC,
  relative: yoga.POSITION_TYPE_RELATIVE,
  absolute: yoga.POSITION_TYPE_ABSOLUTE,
};

const DISPLAY_MAP: Record<string, number> = {
  flex: yoga.DISPLAY_FLEX,
  none: yoga.DISPLAY_NONE,
};

//------------------------------------------------------------------------------
// HTML Parsing (simple regex-based, no DOM needed)
//------------------------------------------------------------------------------

function parseHtmlFixture(html: string): ParsedTest[] {
  const tests: ParsedTest[] = [];

  // Match top-level divs with id attribute
  const divRegex =
    /<div\s+([^>]*id="[^"]+")[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<div\s+[^>]*id="|$))/gi;

  let match;
  while ((match = divRegex.exec(html)) !== null) {
    const [fullMatch, attrs, innerContent] = match;
    const test = parseTestDiv(fullMatch, attrs, innerContent);
    if (test) tests.push(test);
  }

  return tests;
}

function parseTestDiv(
  fullHtml: string,
  attrs: string,
  innerContent: string
): ParsedTest | null {
  // Extract id
  const idMatch = attrs.match(/id="([^"]+)"/);
  if (!idMatch) return null;

  // Check for disabled
  const disabled = fullHtml.includes('data-disabled="true"');

  // Extract style from opening tag
  const styleMatch = fullHtml.match(/style="([^"]+)"/);
  const styles = styleMatch ? parseStyleAttr(styleMatch[1]) : {};

  // Parse children
  const children = parseChildDivs(innerContent);

  return {
    id: idMatch[1],
    disabled,
    root: { styles, children },
  };
}

function parseChildDivs(html: string): ParsedNode[] {
  const children: ParsedNode[] = [];
  // Match child divs (non-greedy, handles nested or self-closing)
  const childRegex = /<div\s+([^>]*)(?:\/>|>([\s\S]*?)<\/div>)/gi;

  let match;
  while ((match = childRegex.exec(html)) !== null) {
    const [, attrs, innerContent] = match;
    const styleMatch = attrs.match(/style="([^"]+)"/);
    const styles = styleMatch ? parseStyleAttr(styleMatch[1]) : {};
    const nestedChildren = innerContent ? parseChildDivs(innerContent) : [];
    children.push({ styles, children: nestedChildren });
  }

  return children;
}

function parseStyleAttr(style: string): Record<string, string> {
  const result: Record<string, string> = {};
  const parts = style.split(";").filter(Boolean);

  for (const part of parts) {
    const colonIdx = part.indexOf(":");
    if (colonIdx === -1) continue;
    const prop = part.slice(0, colonIdx).trim();
    const val = part.slice(colonIdx + 1).trim();
    result[prop] = val;
  }

  return result;
}

//------------------------------------------------------------------------------
// Apply styles to Yoga node
//------------------------------------------------------------------------------

function applyStylesToYogaNode(
  node: Yoga.Node,
  styles: Record<string, string>
): void {
  for (const [prop, value] of Object.entries(styles)) {
    applyStyleProperty(node, prop, value);
  }
}

function applyStyleProperty(
  node: Yoga.Node,
  prop: string,
  value: string
): void {
  const numValue = parseFloat(value);
  const isPercent = value.endsWith("%");

  switch (prop) {
    // Dimensions
    case "width":
      isPercent
        ? node.setWidthPercent(numValue)
        : node.setWidth(numValue);
      break;
    case "height":
      isPercent
        ? node.setHeightPercent(numValue)
        : node.setHeight(numValue);
      break;
    case "min-width":
      isPercent
        ? node.setMinWidthPercent(numValue)
        : node.setMinWidth(numValue);
      break;
    case "min-height":
      isPercent
        ? node.setMinHeightPercent(numValue)
        : node.setMinHeight(numValue);
      break;
    case "max-width":
      isPercent
        ? node.setMaxWidthPercent(numValue)
        : node.setMaxWidth(numValue);
      break;
    case "max-height":
      isPercent
        ? node.setMaxHeightPercent(numValue)
        : node.setMaxHeight(numValue);
      break;

    // Flex properties
    case "flex-direction":
      if (value in FLEX_DIRECTION_MAP) {
        node.setFlexDirection(FLEX_DIRECTION_MAP[value]);
      }
      break;
    case "flex-wrap":
      if (value in WRAP_MAP) {
        node.setFlexWrap(WRAP_MAP[value]);
      }
      break;
    case "flex-grow":
      node.setFlexGrow(numValue);
      break;
    case "flex-shrink":
      node.setFlexShrink(numValue);
      break;
    case "flex-basis":
      if (value === "auto") {
        node.setFlexBasisAuto();
      } else if (isPercent) {
        node.setFlexBasisPercent(numValue);
      } else {
        node.setFlexBasis(numValue);
      }
      break;
    case "flex":
      // Shorthand: flex: <grow> [<shrink>] [<basis>]
      const flexParts = value.split(/\s+/);
      if (flexParts.length >= 1) node.setFlexGrow(parseFloat(flexParts[0]));
      if (flexParts.length >= 2) node.setFlexShrink(parseFloat(flexParts[1]));
      if (flexParts.length >= 3) {
        const basis = flexParts[2];
        if (basis === "auto") node.setFlexBasisAuto();
        else if (basis.endsWith("%"))
          node.setFlexBasisPercent(parseFloat(basis));
        else node.setFlexBasis(parseFloat(basis));
      }
      break;

    // Alignment
    case "justify-content":
      if (value in JUSTIFY_MAP) {
        node.setJustifyContent(JUSTIFY_MAP[value]);
      }
      break;
    case "align-items":
      if (value in ALIGN_MAP) {
        node.setAlignItems(ALIGN_MAP[value]);
      }
      break;
    case "align-self":
      if (value in ALIGN_MAP) {
        node.setAlignSelf(ALIGN_MAP[value]);
      }
      break;
    case "align-content":
      if (value in ALIGN_MAP) {
        node.setAlignContent(ALIGN_MAP[value]);
      }
      break;

    // Position
    case "position":
      if (value in POSITION_MAP) {
        node.setPositionType(POSITION_MAP[value]);
      }
      break;
    case "left":
      isPercent
        ? node.setPositionPercent(yoga.EDGE_LEFT, numValue)
        : node.setPosition(yoga.EDGE_LEFT, numValue);
      break;
    case "right":
      isPercent
        ? node.setPositionPercent(yoga.EDGE_RIGHT, numValue)
        : node.setPosition(yoga.EDGE_RIGHT, numValue);
      break;
    case "top":
      isPercent
        ? node.setPositionPercent(yoga.EDGE_TOP, numValue)
        : node.setPosition(yoga.EDGE_TOP, numValue);
      break;
    case "bottom":
      isPercent
        ? node.setPositionPercent(yoga.EDGE_BOTTOM, numValue)
        : node.setPosition(yoga.EDGE_BOTTOM, numValue);
      break;

    // Margins
    case "margin":
      applyEdgeValue(node, "margin", yoga.EDGE_ALL, value);
      break;
    case "margin-left":
      applyEdgeValue(node, "margin", yoga.EDGE_LEFT, value);
      break;
    case "margin-right":
      applyEdgeValue(node, "margin", yoga.EDGE_RIGHT, value);
      break;
    case "margin-top":
      applyEdgeValue(node, "margin", yoga.EDGE_TOP, value);
      break;
    case "margin-bottom":
      applyEdgeValue(node, "margin", yoga.EDGE_BOTTOM, value);
      break;
    case "margin-start":
      applyEdgeValue(node, "margin", yoga.EDGE_START, value);
      break;
    case "margin-end":
      applyEdgeValue(node, "margin", yoga.EDGE_END, value);
      break;

    // Padding
    case "padding":
      applyEdgeValue(node, "padding", yoga.EDGE_ALL, value);
      break;
    case "padding-left":
      applyEdgeValue(node, "padding", yoga.EDGE_LEFT, value);
      break;
    case "padding-right":
      applyEdgeValue(node, "padding", yoga.EDGE_RIGHT, value);
      break;
    case "padding-top":
      applyEdgeValue(node, "padding", yoga.EDGE_TOP, value);
      break;
    case "padding-bottom":
      applyEdgeValue(node, "padding", yoga.EDGE_BOTTOM, value);
      break;
    case "padding-start":
      applyEdgeValue(node, "padding", yoga.EDGE_START, value);
      break;
    case "padding-end":
      applyEdgeValue(node, "padding", yoga.EDGE_END, value);
      break;

    // Border
    case "border-width":
    case "border":
      node.setBorder(yoga.EDGE_ALL, numValue);
      break;
    case "border-left-width":
      node.setBorder(yoga.EDGE_LEFT, numValue);
      break;
    case "border-right-width":
      node.setBorder(yoga.EDGE_RIGHT, numValue);
      break;
    case "border-top-width":
      node.setBorder(yoga.EDGE_TOP, numValue);
      break;
    case "border-bottom-width":
      node.setBorder(yoga.EDGE_BOTTOM, numValue);
      break;

    // Gap
    case "gap":
      node.setGap(yoga.GUTTER_ALL, numValue);
      break;
    case "row-gap":
      node.setGap(yoga.GUTTER_ROW, numValue);
      break;
    case "column-gap":
      node.setGap(yoga.GUTTER_COLUMN, numValue);
      break;

    // Display
    case "display":
      if (value in DISPLAY_MAP) {
        node.setDisplay(DISPLAY_MAP[value]);
      }
      break;

    // Overflow
    case "overflow":
      if (value === "hidden") node.setOverflow(yoga.OVERFLOW_HIDDEN);
      else if (value === "scroll") node.setOverflow(yoga.OVERFLOW_SCROLL);
      else if (value === "visible") node.setOverflow(yoga.OVERFLOW_VISIBLE);
      break;

    // Skip unsupported/logical properties (RTL, aspect-ratio, etc.)
    case "aspect-ratio":
    case "start":
    case "end":
    case "inset-start":
    case "inset-end":
    case "direction":
      // Skip - not supported or RTL-specific
      break;

    default:
      // Unknown property - skip silently
      break;
  }
}

function applyEdgeValue(
  node: Yoga.Node,
  type: "margin" | "padding",
  edge: number,
  value: string
): void {
  const numValue = parseFloat(value);
  const isPercent = value.endsWith("%");

  if (type === "margin") {
    if (value === "auto") {
      node.setMarginAuto(edge);
    } else if (isPercent) {
      node.setMarginPercent(edge, numValue);
    } else {
      node.setMargin(edge, numValue);
    }
  } else {
    if (isPercent) {
      node.setPaddingPercent(edge, numValue);
    } else {
      node.setPadding(edge, numValue);
    }
  }
}

//------------------------------------------------------------------------------
// Compute expected layout using Yoga
//------------------------------------------------------------------------------

function computeYogaLayout(parsed: ParsedNode): ComputedLayout {
  const root = yoga.Node.create();
  buildYogaTree(root, parsed);

  // Calculate with undefined dimensions (let content determine size)
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  const layout = extractLayout(root);
  root.freeRecursive();
  return layout;
}

function buildYogaTree(yogaNode: Yoga.Node, parsed: ParsedNode): void {
  applyStylesToYogaNode(yogaNode, parsed.styles);

  for (let i = 0; i < parsed.children.length; i++) {
    const child = yoga.Node.create();
    buildYogaTree(child, parsed.children[i]);
    yogaNode.insertChild(child, i);
  }
}

function extractLayout(node: Yoga.Node): ComputedLayout {
  const layout: ComputedLayout = {
    left: node.getComputedLeft(),
    top: node.getComputedTop(),
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
    children: [],
  };

  for (let i = 0; i < node.getChildCount(); i++) {
    const child = node.getChild(i);
    layout.children.push(extractLayout(child));
  }

  return layout;
}

//------------------------------------------------------------------------------
// Generate test code
//------------------------------------------------------------------------------

function generateTestFile(
  fixtureName: string,
  tests: Array<{ test: ParsedTest; expected: ComputedLayout }>
): string {
  const imports = `import { describe, expect, it } from "bun:test";
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
 * Generated from Yoga test fixtures: ${fixtureName}
 * Source: https://github.com/facebook/yoga (MIT License)
 *
 * DO NOT EDIT - regenerate with: bun scripts/import-yoga-tests.ts
 */
`;

  const testCases = tests.map(({ test, expected }) => {
    const setup = generateNodeSetup(test.root, "root");
    const assertions = generateAssertions(expected, "root");
    const skipPrefix = test.disabled ? "it.skip" : "it";

    return `  ${skipPrefix}("${test.id}", () => {
${setup}
    root.calculateLayout(undefined, undefined, DIRECTION_LTR);

${assertions}
  });`;
  });

  return `${imports}
describe("Yoga ${fixtureName}", () => {
${testCases.join("\n\n")}
});
`;
}

function generateNodeSetup(
  node: ParsedNode,
  varName: string,
  indent = "    "
): string {
  const lines: string[] = [];
  lines.push(`${indent}const ${varName} = Node.create();`);

  // Generate style setters
  for (const [prop, value] of Object.entries(node.styles)) {
    const setter = generateStyleSetter(varName, prop, value, indent);
    if (setter) lines.push(setter);
  }

  // Generate children
  for (let i = 0; i < node.children.length; i++) {
    const childVar = `${varName}_child${i}`;
    lines.push("");
    lines.push(...generateNodeSetup(node.children[i], childVar, indent).split("\n"));
    lines.push(`${indent}${varName}.insertChild(${childVar}, ${i});`);
  }

  return lines.join("\n");
}

function generateStyleSetter(
  varName: string,
  prop: string,
  value: string,
  indent: string
): string | null {
  const numValue = parseFloat(value);
  const isPercent = value.endsWith("%");

  switch (prop) {
    case "width":
      return isPercent
        ? `${indent}${varName}.setWidthPercent(${numValue});`
        : `${indent}${varName}.setWidth(${numValue});`;
    case "height":
      return isPercent
        ? `${indent}${varName}.setHeightPercent(${numValue});`
        : `${indent}${varName}.setHeight(${numValue});`;
    case "min-width":
      return isPercent
        ? `${indent}${varName}.setMinWidthPercent(${numValue});`
        : `${indent}${varName}.setMinWidth(${numValue});`;
    case "min-height":
      return isPercent
        ? `${indent}${varName}.setMinHeightPercent(${numValue});`
        : `${indent}${varName}.setMinHeight(${numValue});`;
    case "max-width":
      return isPercent
        ? `${indent}${varName}.setMaxWidthPercent(${numValue});`
        : `${indent}${varName}.setMaxWidth(${numValue});`;
    case "max-height":
      return isPercent
        ? `${indent}${varName}.setMaxHeightPercent(${numValue});`
        : `${indent}${varName}.setMaxHeight(${numValue});`;

    case "flex-direction": {
      const constName = {
        column: "FLEX_DIRECTION_COLUMN",
        "column-reverse": "FLEX_DIRECTION_COLUMN_REVERSE",
        row: "FLEX_DIRECTION_ROW",
        "row-reverse": "FLEX_DIRECTION_ROW_REVERSE",
      }[value];
      return constName ? `${indent}${varName}.setFlexDirection(${constName});` : null;
    }

    case "flex-wrap": {
      const constName = {
        nowrap: "WRAP_NO_WRAP",
        wrap: "WRAP_WRAP",
        "wrap-reverse": "WRAP_WRAP_REVERSE",
      }[value];
      return constName ? `${indent}${varName}.setFlexWrap(${constName});` : null;
    }

    case "flex-grow":
      return `${indent}${varName}.setFlexGrow(${numValue});`;
    case "flex-shrink":
      return `${indent}${varName}.setFlexShrink(${numValue});`;
    case "flex-basis":
      if (value === "auto") return `${indent}${varName}.setFlexBasisAuto();`;
      return isPercent
        ? `${indent}${varName}.setFlexBasisPercent(${numValue});`
        : `${indent}${varName}.setFlexBasis(${numValue});`;

    case "justify-content": {
      const constName = {
        "flex-start": "JUSTIFY_FLEX_START",
        center: "JUSTIFY_CENTER",
        "flex-end": "JUSTIFY_FLEX_END",
        "space-between": "JUSTIFY_SPACE_BETWEEN",
        "space-around": "JUSTIFY_SPACE_AROUND",
        "space-evenly": "JUSTIFY_SPACE_EVENLY",
      }[value];
      return constName ? `${indent}${varName}.setJustifyContent(${constName});` : null;
    }

    case "align-items": {
      const constName = {
        auto: "ALIGN_AUTO",
        "flex-start": "ALIGN_FLEX_START",
        center: "ALIGN_CENTER",
        "flex-end": "ALIGN_FLEX_END",
        stretch: "ALIGN_STRETCH",
        baseline: "ALIGN_BASELINE",
        "space-between": "ALIGN_SPACE_BETWEEN",
        "space-around": "ALIGN_SPACE_AROUND",
      }[value];
      return constName ? `${indent}${varName}.setAlignItems(${constName});` : null;
    }

    case "align-self": {
      const constName = {
        auto: "ALIGN_AUTO",
        "flex-start": "ALIGN_FLEX_START",
        center: "ALIGN_CENTER",
        "flex-end": "ALIGN_FLEX_END",
        stretch: "ALIGN_STRETCH",
        baseline: "ALIGN_BASELINE",
      }[value];
      return constName ? `${indent}${varName}.setAlignSelf(${constName});` : null;
    }

    case "align-content": {
      const constName = {
        auto: "ALIGN_AUTO",
        "flex-start": "ALIGN_FLEX_START",
        center: "ALIGN_CENTER",
        "flex-end": "ALIGN_FLEX_END",
        stretch: "ALIGN_STRETCH",
        "space-between": "ALIGN_SPACE_BETWEEN",
        "space-around": "ALIGN_SPACE_AROUND",
      }[value];
      return constName ? `${indent}${varName}.setAlignContent(${constName});` : null;
    }

    case "position": {
      const constName = {
        static: "POSITION_TYPE_STATIC",
        relative: "POSITION_TYPE_RELATIVE",
        absolute: "POSITION_TYPE_ABSOLUTE",
      }[value];
      return constName ? `${indent}${varName}.setPositionType(${constName});` : null;
    }

    case "left":
      return isPercent
        ? `${indent}${varName}.setPositionPercent(EDGE_LEFT, ${numValue});`
        : `${indent}${varName}.setPosition(EDGE_LEFT, ${numValue});`;
    case "right":
      return isPercent
        ? `${indent}${varName}.setPositionPercent(EDGE_RIGHT, ${numValue});`
        : `${indent}${varName}.setPosition(EDGE_RIGHT, ${numValue});`;
    case "top":
      return isPercent
        ? `${indent}${varName}.setPositionPercent(EDGE_TOP, ${numValue});`
        : `${indent}${varName}.setPosition(EDGE_TOP, ${numValue});`;
    case "bottom":
      return isPercent
        ? `${indent}${varName}.setPositionPercent(EDGE_BOTTOM, ${numValue});`
        : `${indent}${varName}.setPosition(EDGE_BOTTOM, ${numValue});`;

    case "margin":
      return isPercent
        ? `${indent}${varName}.setMarginPercent(EDGE_ALL, ${numValue});`
        : value === "auto"
          ? `${indent}${varName}.setMarginAuto(EDGE_ALL);`
          : `${indent}${varName}.setMargin(EDGE_ALL, ${numValue});`;
    case "margin-left":
      return generateMarginSetter(varName, "EDGE_LEFT", value, indent);
    case "margin-right":
      return generateMarginSetter(varName, "EDGE_RIGHT", value, indent);
    case "margin-top":
      return generateMarginSetter(varName, "EDGE_TOP", value, indent);
    case "margin-bottom":
      return generateMarginSetter(varName, "EDGE_BOTTOM", value, indent);
    case "margin-start":
      return generateMarginSetter(varName, "EDGE_START", value, indent);
    case "margin-end":
      return generateMarginSetter(varName, "EDGE_END", value, indent);

    case "padding":
      return isPercent
        ? `${indent}${varName}.setPaddingPercent(EDGE_ALL, ${numValue});`
        : `${indent}${varName}.setPadding(EDGE_ALL, ${numValue});`;
    case "padding-left":
      return generatePaddingSetter(varName, "EDGE_LEFT", value, indent);
    case "padding-right":
      return generatePaddingSetter(varName, "EDGE_RIGHT", value, indent);
    case "padding-top":
      return generatePaddingSetter(varName, "EDGE_TOP", value, indent);
    case "padding-bottom":
      return generatePaddingSetter(varName, "EDGE_BOTTOM", value, indent);
    case "padding-start":
      return generatePaddingSetter(varName, "EDGE_START", value, indent);
    case "padding-end":
      return generatePaddingSetter(varName, "EDGE_END", value, indent);

    case "border-width":
    case "border":
      return `${indent}${varName}.setBorder(EDGE_ALL, ${numValue});`;
    case "border-left-width":
      return `${indent}${varName}.setBorder(EDGE_LEFT, ${numValue});`;
    case "border-right-width":
      return `${indent}${varName}.setBorder(EDGE_RIGHT, ${numValue});`;
    case "border-top-width":
      return `${indent}${varName}.setBorder(EDGE_TOP, ${numValue});`;
    case "border-bottom-width":
      return `${indent}${varName}.setBorder(EDGE_BOTTOM, ${numValue});`;

    case "gap":
      return `${indent}${varName}.setGap(GUTTER_ALL, ${numValue});`;
    case "row-gap":
      return `${indent}${varName}.setGap(GUTTER_ROW, ${numValue});`;
    case "column-gap":
      return `${indent}${varName}.setGap(GUTTER_COLUMN, ${numValue});`;

    case "display": {
      const constName = {
        flex: "DISPLAY_FLEX",
        none: "DISPLAY_NONE",
      }[value];
      return constName ? `${indent}${varName}.setDisplay(${constName});` : null;
    }

    case "overflow": {
      const constName = {
        visible: "OVERFLOW_VISIBLE",
        hidden: "OVERFLOW_HIDDEN",
        scroll: "OVERFLOW_SCROLL",
      }[value];
      return constName ? `${indent}${varName}.setOverflow(${constName});` : null;
    }

    default:
      // Skip unsupported properties
      return null;
  }
}

function generateMarginSetter(
  varName: string,
  edge: string,
  value: string,
  indent: string
): string {
  const numValue = parseFloat(value);
  const isPercent = value.endsWith("%");
  if (value === "auto") {
    return `${indent}${varName}.setMarginAuto(${edge});`;
  }
  return isPercent
    ? `${indent}${varName}.setMarginPercent(${edge}, ${numValue});`
    : `${indent}${varName}.setMargin(${edge}, ${numValue});`;
}

function generatePaddingSetter(
  varName: string,
  edge: string,
  value: string,
  indent: string
): string {
  const numValue = parseFloat(value);
  const isPercent = value.endsWith("%");
  return isPercent
    ? `${indent}${varName}.setPaddingPercent(${edge}, ${numValue});`
    : `${indent}${varName}.setPadding(${edge}, ${numValue});`;
}

function generateAssertions(
  layout: ComputedLayout,
  varName: string,
  indent = "    "
): string {
  const lines: string[] = [];

  lines.push(`${indent}expect(${varName}.getComputedLeft()).toBe(${layout.left});`);
  lines.push(`${indent}expect(${varName}.getComputedTop()).toBe(${layout.top});`);
  lines.push(`${indent}expect(${varName}.getComputedWidth()).toBe(${layout.width});`);
  lines.push(`${indent}expect(${varName}.getComputedHeight()).toBe(${layout.height});`);

  for (let i = 0; i < layout.children.length; i++) {
    lines.push("");
    const childVar = `${varName}_child${i}`;
    lines.push(...generateAssertions(layout.children[i], childVar, indent).split("\n"));
  }

  return lines.join("\n");
}

//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------

const YOGA_FIXTURES_BASE =
  "https://raw.githubusercontent.com/facebook/yoga/main/gentest/fixtures";

// Fixture files to process
const FIXTURE_FILES = [
  "YGFlexDirectionTest.html",
  "YGFlexTest.html",
  "YGAlignItemsTest.html",
  "YGAlignContentTest.html",
  "YGAlignSelfTest.html",
  "YGJustifyContentTest.html",
  "YGFlexWrapTest.html",
  "YGPaddingTest.html",
  "YGMarginTest.html",
  "YGBorderTest.html",
  "YGGapTest.html",
  "YGDimensionTest.html",
  "YGMinMaxDimensionTest.html",
  "YGPercentageTest.html",
  "YGAbsolutePositionTest.html",
  "YGDisplayTest.html",
  "YGRoundingTest.html",
];

async function fetchFixture(filename: string): Promise<string> {
  const url = `${YOGA_FIXTURES_BASE}/${filename}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const fixtureArg = args.indexOf("--fixture");
  const specificFixture =
    fixtureArg !== -1 ? args[fixtureArg + 1] : null;

  const fixturesToProcess = specificFixture
    ? FIXTURE_FILES.filter((f) => f.includes(specificFixture))
    : FIXTURE_FILES;

  console.log(`Processing ${fixturesToProcess.length} fixture(s)...`);

  for (const filename of fixturesToProcess) {
    console.log(`\n📥 Fetching ${filename}...`);
    const html = await fetchFixture(filename);

    console.log(`📝 Parsing...`);
    const tests = parseHtmlFixture(html);
    console.log(`   Found ${tests.length} test cases`);

    const enabledTests = tests.filter((t) => !t.disabled);
    const disabledTests = tests.filter((t) => t.disabled);
    console.log(
      `   ${enabledTests.length} enabled, ${disabledTests.length} skipped (disabled/unsupported)`
    );

    // Compute expected layouts for enabled tests
    const testsWithExpected: Array<{
      test: ParsedTest;
      expected: ComputedLayout;
    }> = [];

    for (const test of tests) {
      try {
        const expected = computeYogaLayout(test.root);
        testsWithExpected.push({ test, expected });
      } catch (err) {
        console.warn(`   ⚠️  Skipping ${test.id}: ${err}`);
      }
    }

    // Generate test file
    const fixtureName = filename.replace(".html", "").replace("YG", "");
    const testCode = generateTestFile(fixtureName, testsWithExpected);

    const outputPath = `tests/yoga/${fixtureName.toLowerCase()}.test.ts`;
    if (dryRun) {
      console.log(`\n--- ${outputPath} (dry run) ---`);
      console.log(testCode.slice(0, 2000) + (testCode.length > 2000 ? "\n..." : ""));
    } else {
      const fullPath = new URL(`../${outputPath}`, import.meta.url).pathname;
      await Bun.write(fullPath, testCode);
      console.log(`   ✅ Generated ${outputPath}`);
    }
  }

  console.log("\n✨ Done!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
