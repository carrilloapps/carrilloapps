#!/usr/bin/env node
/**
 * Inline wrapper for opengraph-mcp v1.0.0
 *
 * The upstream package is published as ESM but contains a built-in
 * `__require` polyfill that throws on Node.js 22+:
 *
 *   Error: Dynamic require of "buffer" is not supported
 *
 * This wrapper never touches node_modules. On each run it:
 *   1. Reads the original `dist/server.mjs` from node_modules.
 *   2. Replaces the broken polyfill with a real `createRequire` shim.
 *   3. Writes the patched copy to `.opencode/cache/opengraph-mcp/server.mjs`
 *      (deterministic, regenerable, outside any npm-managed tree).
 *   4. Dynamic-imports the cached file so the MCP stdio server starts.
 *
 * Idempotent, safe to run repeatedly, and the cache directory is gitignored.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..", "..")

const SOURCE_PATH = path.join(projectRoot, "node_modules", "opengraph-mcp", "dist", "server.mjs")
const CACHE_DIR = path.join(projectRoot, ".opencode", "cache", "opengraph-mcp")
const CACHED_PATH = path.join(CACHE_DIR, "server.mjs")

const PATCH_MARKER = "// OPENCODE_INLINE_PATCH: createRequire shim"
const ORIGINAL_POLYFILL = [
  'var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {',
  '  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]',
  "}) : x)(function(x) {",
  '  if (typeof require !== "undefined") return require.apply(this, arguments);',
  "  throw Error('Dynamic require of \"' + x + '\" is not supported');",
  "});",
].join("\n")

const PATCHED_POLYFILL = [
  PATCH_MARKER,
  'import { createRequire } from "node:module";',
  "const require = createRequire(import.meta.url);",
  "const __require = require;",
].join("\n")

async function main() {
  await mkdir(CACHE_DIR, { recursive: true })

  const original = await readFile(SOURCE_PATH, "utf8")

  let patched
  if (original.includes(ORIGINAL_POLYFILL)) {
    patched = original.replace(ORIGINAL_POLYFILL, PATCHED_POLYFILL)
  } else if (original.includes(PATCH_MARKER)) {
    patched = original
  } else {
    throw new Error(
      "[opengraph-mcp wrapper] Upstream source pattern not found. " +
        "opengraph-mcp may have shipped a new version; update this wrapper.",
    )
  }

  await writeFile(CACHED_PATH, patched, "utf8")
  await import(pathToFileURL(CACHED_PATH).href)
}

main().catch((err) => {
  console.error("[opengraph-mcp wrapper]", err)
  process.exit(1)
})
