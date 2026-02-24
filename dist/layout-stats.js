/**
 * Layout Statistics Counters
 *
 * Mutable counters for debugging and benchmarking.
 * Separated to avoid circular dependencies between layout modules.
 */
// Layout statistics for debugging
export let layoutNodeCalls = 0;
export let measureNodeCalls = 0;
export let resolveEdgeCalls = 0;
export let layoutSizingCalls = 0; // Calls for intrinsic sizing (offset=0,0)
export let layoutPositioningCalls = 0; // Calls for final positioning
export let layoutCacheHits = 0;
export function resetLayoutStats() {
    layoutNodeCalls = 0;
    measureNodeCalls = 0;
    resolveEdgeCalls = 0;
    layoutSizingCalls = 0;
    layoutPositioningCalls = 0;
    layoutCacheHits = 0;
}
export function incLayoutNodeCalls() {
    layoutNodeCalls++;
}
export function incMeasureNodeCalls() {
    measureNodeCalls++;
}
export function incLayoutSizingCalls() {
    layoutSizingCalls++;
}
export function incLayoutPositioningCalls() {
    layoutPositioningCalls++;
}
export function incLayoutCacheHits() {
    layoutCacheHits++;
}
//# sourceMappingURL=layout-stats.js.map