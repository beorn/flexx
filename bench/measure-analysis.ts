/**
 * Analyze measure function call patterns.
 * Run: bun bench/measure-analysis.ts
 */

import { Node } from "../src/index.js";
import * as layout from "../src/layout-zero.js";

// Track unique measure call parameters
const measureParams = new Map<string, number>();
let totalCalls = 0;

function createTree(n: number): Node {
  const root = Node.create();
  root.setWidth(250);
  root.setHeight(120);
  root.setFlexDirection(1); // Column

  const cols = 5;
  const itemsPerCol = Math.floor(n / cols / 2);

  for (let col = 0; col < cols; col++) {
    const column = Node.create();
    column.setFlexGrow(1);
    column.setFlexDirection(1); // Column

    for (let item = 0; item < itemsPerCol; item++) {
      const itemNode = Node.create();
      itemNode.setFlexDirection(0); // Row
      itemNode.setPadding(0, 1); // EDGE_LEFT

      const textNode = Node.create();
      const text = `Item ${col}-${item} with some text content`;
      textNode.setMeasureFunc((width, wm, height, hm) => {
        totalCalls++;
        const key = `${width.toFixed(1)}|${wm}|${height.toFixed(1)}|${hm}`;
        measureParams.set(key, (measureParams.get(key) || 0) + 1);

        const tw = text.length;
        const maxW = Number.isNaN(width) ? Infinity : width;
        return { width: Math.min(tw, maxW), height: Math.ceil(tw / Math.max(1, maxW)) };
      });
      itemNode.insertChild(textNode, 0);
      column.insertChild(itemNode, item);
    }
    root.insertChild(column, col);
  }
  return root;
}

console.log("=== Measure Call Analysis ===\n");

const root = createTree(1000);
layout.resetLayoutStats();
Node.resetMeasureStats();

root.calculateLayout(250, 120, 0);

// Count text nodes
let textNodeCount = 0;
function countTextNodes(n: Node): void {
  if (n.hasMeasureFunc()) textNodeCount++;
  for (let i = 0; i < n.getChildCount(); i++) {
    countTextNodes(n.getChild(i)!);
  }
}
countTextNodes(root);

console.log(`Text nodes: ${textNodeCount}`);
console.log(`Total measure calls: ${totalCalls} (${(totalCalls/textNodeCount).toFixed(1)} per text node)`);
console.log(`Unique parameter combinations: ${measureParams.size}`);
console.log(`Cache entries: 4 (current)`);
console.log();

// Show top 10 most common parameters
const sorted = [...measureParams.entries()].sort((a, b) => b[1] - a[1]);
console.log("Top 10 most common parameters (width|wm|height|hm => count):");
for (const [key, count] of sorted.slice(0, 10)) {
  console.log(`  ${key} => ${count} calls`);
}

console.log();
console.log("If unique combinations > 4, the 4-entry cache is insufficient.");
console.log("Consider increasing cache size or using LRU eviction.");
