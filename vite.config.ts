import { defineConfig } from "vite-plus"

export default defineConfig({
  fmt: {
    semi: false,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    benchmark: {
      include: ["bench/**/*.bench.ts"],
    },
  },
  pack: {
    clean: true,
    dts: true,
    entry: ["src/index.ts", "src/index-classic.ts", "src/testing.ts"],
    format: "esm",
  },
})
