/**
 * Logger with auto-detection
 *
 * Uses @beorn/logger if available (when used in km), falls back to debug library.
 * Supports the conditional `?.` pattern for zero-cost when disabled.
 */
type DebugFn = (msg: string, ...args: unknown[]) => void;
interface ConditionalLogger {
    debug?: DebugFn;
}
/** Logger instance - use with optional chaining: `log.debug?.('message')` */
export declare const log: ConditionalLogger;
export {};
//# sourceMappingURL=logger.d.ts.map