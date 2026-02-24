/**
 * Layout Statistics Counters
 *
 * Mutable counters for debugging and benchmarking.
 * Separated to avoid circular dependencies between layout modules.
 */
export declare let layoutNodeCalls: number;
export declare let measureNodeCalls: number;
export declare let resolveEdgeCalls: number;
export declare let layoutSizingCalls: number;
export declare let layoutPositioningCalls: number;
export declare let layoutCacheHits: number;
export declare function resetLayoutStats(): void;
export declare function incLayoutNodeCalls(): void;
export declare function incMeasureNodeCalls(): void;
export declare function incLayoutSizingCalls(): void;
export declare function incLayoutPositioningCalls(): void;
export declare function incLayoutCacheHits(): void;
//# sourceMappingURL=layout-stats.d.ts.map