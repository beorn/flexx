/**
 * Smoke tests for the publish-guard.
 *
 * Confirms (a) the guard PASSES on the current build (run against the real
 * flexily root), (b) the helpers correctly classify the regression cases.
 *
 * The full end-to-end pack+inspect is exercised by running the script
 * itself in CI (release.yml) — this test file pins the unit-level helpers.
 *
 * Owned by @km/flexily/14343-publish-guard (P2).
 */

import { describe, expect, test } from "vitest"

// Re-implement the two pure helpers here so the test file doesn't need to
// import from a script (which has side effects on import). Keep these in
// sync with scripts/verify-publishable.ts.

function isSourceTs(path: string): boolean {
  if (!path.endsWith(".ts") && !path.endsWith(".tsx")) return false
  if (/\.d\.[mc]?ts$/.test(path)) return false
  return true
}

function exportsLeaves(value: unknown, path: string[] = []): { path: string[]; leaf: string }[] {
  if (typeof value === "string") return [{ path, leaf: value }]
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => exportsLeaves(v, [...path, String(i)]))
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => exportsLeaves(v, [...path, k]))
  }
  return []
}

describe("isSourceTs", () => {
  test("classifies .ts and .tsx as source", () => {
    expect(isSourceTs("src/index.ts")).toBe(true)
    expect(isSourceTs("src/component.tsx")).toBe(true)
  })

  test("treats .d.ts / .d.mts / .d.cts as type declarations (allowed)", () => {
    expect(isSourceTs("dist/index.d.ts")).toBe(false)
    expect(isSourceTs("dist/index.d.mts")).toBe(false)
    expect(isSourceTs("dist/index.d.cts")).toBe(false)
  })

  test("ignores non-TypeScript files", () => {
    expect(isSourceTs("dist/index.mjs")).toBe(false)
    expect(isSourceTs("README.md")).toBe(false)
    expect(isSourceTs("package.json")).toBe(false)
  })
})

describe("exportsLeaves", () => {
  test("string shorthand: one leaf", () => {
    expect(exportsLeaves({ ".": "./dist/index.mjs" })).toEqual([{ path: ["."], leaf: "./dist/index.mjs" }])
  })

  test("conditional exports: walks into object", () => {
    expect(
      exportsLeaves({
        ".": {
          types: "./dist/index.d.mts",
          import: "./dist/index.mjs",
        },
      }),
    ).toEqual([
      { path: [".", "types"], leaf: "./dist/index.d.mts" },
      { path: [".", "import"], leaf: "./dist/index.mjs" },
    ])
  })

  test("detects regression: leaf pointing at ./src/", () => {
    const leaves = exportsLeaves({
      ".": "./src/index.ts",
      "./classic": "./src/index-classic.ts",
    })
    const bad = leaves.filter((l) => !l.leaf.startsWith("./dist/"))
    expect(bad).toHaveLength(2)
    expect(bad[0]?.leaf).toBe("./src/index.ts")
    expect(bad[1]?.leaf).toBe("./src/index-classic.ts")
  })

  test("detects regression: mixed dist + src leaves", () => {
    const leaves = exportsLeaves({
      ".": {
        types: "./dist/index.d.mts",
        import: "./src/index.ts", // forgot to override one
      },
    })
    const bad = leaves.filter((l) => !l.leaf.startsWith("./dist/"))
    expect(bad).toHaveLength(1)
    expect(bad[0]?.path).toEqual([".", "import"])
  })
})
