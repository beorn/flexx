/**
 * Node Measurement (Intrinsic Sizing)
 *
 * measureNode() computes a node's width and height without calculating positions.
 * It's a lightweight alternative to layoutNode() used during Phase 5 for
 * intrinsic sizing of auto-sized container children.
 *
 * IMPORTANT: measureNode() overwrites layout.width/layout.height as a side effect.
 * Callers MUST save/restore these fields around calls to avoid corrupting
 * the fingerprint cache (see "Bug 1: measureNode corruption" in CLAUDE.md).
 */
import type { Node } from "./node-zero.js";
/**
 * Measure a node to get its intrinsic size without computing positions.
 * This is a lightweight alternative to layoutNode for sizing-only passes.
 *
 * Sets layout.width and layout.height but NOT layout.left/top.
 *
 * @param node - The node to measure
 * @param availableWidth - Available width (NaN for unconstrained)
 * @param availableHeight - Available height (NaN for unconstrained)
 * @param direction - Layout direction (LTR or RTL)
 */
export declare function measureNode(node: Node, availableWidth: number, availableHeight: number, direction?: number): void;
//# sourceMappingURL=layout-measure.d.ts.map