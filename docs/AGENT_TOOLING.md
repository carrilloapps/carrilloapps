# Agent Tooling

Everything an AI agent needs to work in this repository: MCP servers, skills,
spec-kit, and the local state each of them generates.

> Governing rules live in [`.specify/memory/constitution.md`](../.specify/memory/constitution.md).
> Principle I makes `codegraph` and `docgraph` mandatory, not optional.

---

## 1. Context MCPs — use these first

These two are not "nice to have". They are the entry point for every task.

### codegraph — the code index

A SQLite graph of symbols, edges and files. One call returns the verbatim
line-numbered source of the relevant symbols, the call paths between them, and
a blast-radius summary. It replaces a grep + read loop with a single
round-trip and far fewer tokens.

```
codegraph_explore(query: "getSiteUrl publicEnv env configuration",
                  projectPath: "/abs/path/to/carrilloapps")
```

- Query with symbol names, file names, or a plain question.
- The source it returns **is** a read — do not re-open those files.
- Read the blast radius before editing. `getSiteUrl` has 28 callers and no test
  coverage; changing it blind breaks pages you never opened.

Initialize (writes `.codegraph/`, gitignored):

```bash
npx -y @colbymchenry/codegraph@latest init
```

Reindex after a large refactor — a stale index is a bug, not a quirk.

### docgraph — the documentation index

Semantic index over the repo's markdown: `AGENTS.md`, everything in `docs/`,
the constitution, skills. Use it to answer "how does this project do X?"
before reading files or assuming.

| Tool                           | Use for                                      |
| ------------------------------ | -------------------------------------------- |
| `search`                       | Semantic search across all indexed documents |
| `explore`                      | Follow relationships between documents       |
| `get_document` / `get_related` | Pull one page and its neighbours             |
| `index_project`                | (Re)build the index — writes `.docgraph/`    |
| `get_stats`                    | Confirm the index is current                 |

Reindex whenever documentation changes substantially.

### Why this order matters

Asking codegraph and docgraph first is cheaper _and_ more accurate than
grepping. A grep finds strings; the graph finds the callers, the call path, and
the document that already answered the question. Skipping them is how an agent
"fixes" a function and misses every consumer of it.

---

## 2. All MCP servers

Configured **only** in `.mcp.json`. Eleven servers, no absolute paths, no
platform-specific launchers, env vars via `${VAR:-default}`.

| Server                     | Transport | What it gives you                                                                                                                                                      |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codegraph`                | stdio     | Symbol graph, blast radius, verbatim source. See above.                                                                                                                |
| `docgraph`                 | stdio     | Semantic documentation index. See above.                                                                                                                               |
| `ai-sync`                  | stdio     | Syncs agent config/conversations across Claude Code, Copilot, Cursor, WindSurf, OpenCode, JetBrains.                                                                   |
| `skill-rules`              | stdio     | Stage-based skill activation; reads `skills.rules` + `skills-lock.json`.                                                                                               |
| `chrome-devtools`          | stdio     | Headless Chrome: navigate, snapshot, screenshot, Lighthouse audits, network/console inspection, performance traces. Reads `CHROME_PATH`, defaults to `chrome` on PATH. |
| `opengraph`                | stdio     | Inspects and suggests OG/Twitter tags for any URL.                                                                                                                     |
| `openseo`                  | http      | SEO audits, keyword research, SERP, rank tracking, Search Console. **Credit-metered** — check `whoami` before running paid tools.                                      |
| `stitch`                   | http      | Google Stitch UI generation. Requires `STITCH_API_KEY`.                                                                                                                |
| `cloudflare-api`           | http      | Searches the Cloudflare OpenAPI spec, executes API calls.                                                                                                              |
| `cloudflare-docs`          | http      | Semantic search over Cloudflare documentation.                                                                                                                         |
| `cloudflare-dns-analytics` | http      | Zone listing, DNS settings, DNS analytics.                                                                                                                             |

### Rules

- **`.mcp.json` is the only place a server is configured.** No wrapper scripts,
  no helper files. If a package is broken, inline the fix as a `node -e`
  command in the args array.
- **Every stdio server is pinned to `@latest`.** Without it `npx` serves its
  cache and the server silently runs an old build — this repo shipped
  codegraph 1.4.1 for weeks while 1.5.0 was published.
- **`opengraph` runs through an inline `createRequire` shim.**
  `opengraph-mcp@1.0.0` ships an esbuild `__require` polyfill that throws
  `Dynamic require of "buffer" is not supported` on Node ≥ 22. The documented
  `npx -y opengraph-mcp` form does not work here. Collapse the shim back when
  upstream fixes the bundle.
- **`opencode.json` mirrors `.mcp.json`** because OpenCode cannot read
  `.mcp.json`. `npm run mcp:check` fails the moment they drift — run it after
  touching either file. The one tolerated difference is
  `--executablePath ${CHROME_PATH:-chrome}`: OpenCode has no `:-` default
  syntax, so its chrome-devtools entry omits the flag and lets the MCP
  autodetect the browser.
- **Enable servers per machine** in `.claude/settings.local.json`
  (`enabledMcpjsonServers`) — gitignored.

### Credentials

| Server                    | Needs                                                                          |
| ------------------------- | ------------------------------------------------------------------------------ |
| `cloudflare-*`, `openseo` | OAuth through Claude Code's `/mcp` flow — nothing in `.env`                    |
| `stitch`                  | `STITCH_API_KEY`. Without it the server still handshakes, but every call fails |
| `chrome-devtools`         | `CHROME_PATH` (optional)                                                       |

Both variables are documented in `.env.example`.

### Verifying a server

Send an `initialize` handshake over stdio and look for `serverInfo`. All six
stdio servers answer in under a second when healthy. The HTTP ones return 401
until OAuth completes — that is expected, not a failure.

---

## 3. Skills

42 skills declared in `skills-lock.json`, installed into both `.claude/skills/`
and `.agents/skills/`. Both directories are gitignored: the lock is the source
of truth, the payload is regenerated.

- **31 come from GitHub** — fully reproducible with `npm run skills:sync`.
- **11 are `sourceType: "local"`** — `impeccable` plus the ten `speckit-*`
  skills. They have their own installers.

```bash
npm run skills:all         # full bootstrap: sync + impeccable + speckit + ide
npm run skills:sync        # the 31 GitHub skills
npm run skills:update      # same, refreshing every recorded hash
npm run skills:verify      # check installed skills against the lock, writes nothing
npm run skills:impeccable  # install/update impeccable
npm run skills:speckit     # regenerate the speckit-* skills
npm run skills:ide         # propagate skills between .claude/skills and .agents/skills
```

`skills:ide` exists because installers are inconsistent: spec-kit writes only
into `.claude/skills/`, so without it `.agents/skills/` silently falls behind.

Prerequisites: `git` and Node ≥ 22 for `skills:sync`; `uv`/`uvx` for
`skills:speckit`. Everything else is fetched on demand through `npx`.

### Stages

Declared in `skills.rules`, activated through the `skill-rules` MCP
(`use <stage>` stashes everything outside that stage).

| Stage       | Skills                                                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `design`    | apple-design, design-taste-frontend, emil-design-eng, high-end-visual-design, minimalist-ui, industrial-brutalist-ui, stitch-design-taste, gpt-taste, pick-ui-library, interface-design, impeccable |
| `motion`    | animate, motion-framer, animation-vocabulary, find-animation-opportunities, improve-animations, review-animations, impeccable                                                                       |
| `build`     | image-to-code, prototype, ask-sonner, full-output-enforcement, redesign-existing-projects, vercel-react-best-practices, impeccable                                                                  |
| `brand`     | brandkit, imagegen-frontend-web, imagegen-frontend-mobile, impeccable                                                                                                                               |
| `marketing` | seo-audit, competitor-alternatives, changelog-generator                                                                                                                                             |
| `review`    | devils-advocate, sar-cybersecurity, brainstorming                                                                                                                                                   |
| `spec`      | the ten `speckit-*` skills, impeccable                                                                                                                                                              |

### Adding a skill

1. Add an entry to `skills-lock.json`: `source`, `sourceType: "github"`,
   `path` = the **directory** inside that repo (not the `SKILL.md` file).
2. `npm run skills:update` — fetches it and records its hash.
3. Assign it to a stage in `skills.rules`.

### impeccable

Design/UI skill with `PostToolUse` + `Stop` hooks in
`.claude/settings.local.json`. The hooks are guarded, so a clone without the
skill installed is unaffected.

Its installer also writes hooks for other harnesses it detects. This project
does **not** support Codex, so `npm run skills:impeccable` deletes the `.codex/`
directory the installer creates. Keep that cleanup step if you edit the script.

---

## 4. spec-kit

`.specify/` holds the spec-kit 0.16.3 toolchain that drives the `speckit-*`
skills: bash scripts, templates, integration manifests, workflow registry.

```
.specify/
  memory/constitution.md   ← VERSIONED. The project's binding rules.
  templates/               spec, plan, tasks, checklist, constitution
  scripts/bash/            create-new-feature, setup-plan, setup-tasks,
                           check-prerequisites, resolve-template, common
  integrations/            claude + speckit manifests
  workflows/               workflow registry
specs/                     ← VERSIONED. One directory per feature.
```

Everything under `.specify/` is gitignored **except
`.specify/memory/constitution.md`**. The toolchain reinstalls itself with
`npm run skills:speckit`; the constitution is ours.

### The constitution is mandatory reading

`.specify/memory/constitution.md` is checked by `/speckit-analyze` and
`/speckit-implement` against every artifact they produce. Read it before
planning work, not after being told a plan violates it. It supersedes
`AGENTS.md` and everything in `docs/` on any conflict.

### Workflow

```
/speckit-constitution   create or amend the constitution
/speckit-specify        spec.md — what and why, no implementation detail
/speckit-clarify        (optional) resolve ambiguity before planning
/speckit-plan           plan.md — technical approach
/speckit-tasks          tasks.md — dependency-ordered work items
/speckit-analyze        (optional) cross-artifact consistency report
/speckit-checklist      (optional) quality checklists
/speckit-implement      execute tasks.md
/speckit-converge       assess the codebase, append remaining work
```

Artifacts land in `specs/NNN-feature-slug/`. See [`specs/README.md`](../specs/README.md).

---

## 5. Generated local state

All gitignored. Never commit these; never assume another contributor has them.

| Path                                 | Produced by             | Rebuild with                                 |
| ------------------------------------ | ----------------------- | -------------------------------------------- |
| `.codegraph/`                        | codegraph MCP           | `npx -y @colbymchenry/codegraph@latest init` |
| `.docgraph/`                         | docgraph MCP            | `index_project` tool                         |
| `.claude/skills/`, `.agents/skills/` | skills installers       | `npm run skills:all`                         |
| `.claude/settings.local.json`        | per-machine config      | hand-written                                 |
| `.skill-rules/`                      | skill-rules stage stash | regenerated on `use`                         |
| `.impeccable/`                       | impeccable skill        | regenerated on first run                     |
| `.specify/` (minus the constitution) | spec-kit CLI            | `npm run skills:speckit`                     |
| `.opencode/`                         | OpenCode                | regenerated                                  |

`.vercelignore` excludes every one of them: agent tooling has crashed
`next build` tracing before and is not part of the app.
