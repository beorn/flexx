// Optional dependency - resolved via km monorepo workspace, falls back at runtime
declare module "@beorn/logger" {
  export function createlogger(namespace: string): {
    debug?: (msg: string) => void
    info?: (msg: string) => void
    warn?: (msg: string) => void
    error?: (msg: string | Error) => void
    trace?: (msg: string) => void
  }
}
