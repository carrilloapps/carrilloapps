import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * Vitest config, kept with the tests rather than at the repo root.
 *
 * The root holds the configs whose tools can only find them there —
 * `package.json`, `tsconfig.json`, `next.config.mjs`, `.prettierrc.json` and
 * the rest resolve from the working directory and break if moved. Vitest and
 * Playwright do not: they take `--config`, so they live next to what they run.
 *
 * Paths below are resolved from this file's own location, not from the
 * process's working directory. A relative `"../.."` would mean something
 * different depending on where `npm test` was invoked from.
 */
const repoRoot = fileURLToPath(new URL("../..", import.meta.url))

export default defineConfig({
  root: repoRoot,
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [fileURLToPath(new URL("./vitest.setup.ts", import.meta.url))],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "tests/e2e/**"],
  },
})
