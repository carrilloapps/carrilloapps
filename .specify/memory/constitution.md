# carrillo.app Constitution

The non-negotiable rules of this repository. Every spec, plan, task and
implementation produced by the `speckit-*` workflow is checked against this
document. When any other guidance — `AGENTS.md`, a `docs/` page, a skill, a
model's prior assumption — disagrees with this file, this file wins.

## Core Principles

### I. Context comes from the index, not from guessing (NON-NEGOTIABLE)

Before reading, editing, or reasoning about code, query `codegraph`. Before
answering a question about how the project works, query `docgraph`. Grep-and-
open loops are the fallback for what the indexes cannot answer, never the
opening move.

An edit proposed without having looked at the symbol's blast radius is
incomplete work. `codegraph_explore` returns callers and call paths in one
round-trip; there is no excuse for changing a function and missing its 28
call sites.

Both indexes are local and regenerable: `npx -y @colbymchenry/codegraph@latest init`
and the `docgraph` `index_project` tool. A stale index is a bug — reindex after
large refactors.

### II. The shared shell is the product

Every page is the same composition: `PageLoadingProvider` → `DynamicBackground`
→ `SiteHeader` → `main.container.py-12.space-y-24` → `PageHero`/`PageHeroSplit`
→ sections → `SiteFooter`. A page that rolls its own hero, background, or
loading state is a defect regardless of how it looks in isolation.

Consistency beats local cleverness. Reuse the component; if it cannot express
what you need, extend the component — do not fork it inline.

### III. Accessibility is a gate, not a polish pass

Touch targets ≥ 48×48px. Body text no lighter than `text-zinc-300`. Every input
label bound with `htmlFor`/`id`. No `role="listitem"` on `<a>`, `<button>`,
`<Card>` or `<Badge>`. Keyboard reachable with visible focus. Lighthouse
accessibility ≥ 95.

Work that regresses any of these is rejected even if the feature works.

### IV. Zero-warning quality gate

`npm run lint` ends with 0 errors **and** 0 warnings. `npm run build` succeeds
under strict TypeScript. `npm test` and `npm run test:e2e` pass. No `any`, no
unused imports, no unused variables.

These are binary. "Only warnings" is a failing state.

### V. Reproducible tooling, zero loose scripts

There is no `scripts/` directory. Every tool is configured in its own file:
MCP servers in `.mcp.json` (mirrored into `opencode.json`, guarded by
`npm run mcp:check`), skills in `skills-lock.json` + `skills.rules`, commands
inline in `package.json`.

A contributor with a fresh clone reaches a working agent environment with
`npm install && npm run skills:all`. Anything that requires a machine-specific
path, a manual copy, or knowledge that lives only in someone's head is broken
by definition.

Dependencies use `~` so only patch updates flow in. Never `^`, never exact pins.

## Technology Constraints

- **Next.js App Router + Turbopack.** Webpack-only options (for example
  `experimental.cssChunking`) hard-fail the build.
- **Tailwind CSS v4, CSS-first.** Configuration lives in `src/app/globals.css`.
  Reintroducing `tailwind.config.*` is a regression.
- **React Server / Client split.** Pages are `"use client"`, so metadata and
  JSON-LD live in `layout.tsx`.
- **No backend database.** Data comes from `src/lib/data/*.ts`, from route handlers that
  proxy GitHub/GitLab/Substack, or from Mailchimp. A feature that needs
  persistent storage needs an architecture decision first, not an ad-hoc client.
- **Never call third-party APIs from a client component.** Route handlers own
  every upstream call, its cache window, and its error shape.

## Development Workflow

Specs live in `specs/`, produced by the `speckit-*` skills in this order:
`constitution` → `specify` → `clarify` (optional) → `plan` → `tasks` →
`analyze`/`checklist` (optional) → `implement` → `converge`.

The quality gate runs before every commit, not at the end of a branch. Commits
carry no `Co-authored-by` trailer.

Documentation is updated in place. Creating a second file about a topic that
already has one is a violation; extend the existing page and keep
`docs/README.md` accurate.

## Governance

This constitution supersedes all other practices in this repository.

Amendments require an explicit edit to this file with the version bumped below
and a one-line rationale in the commit message. Agents may not relax a principle
to make a task easier — if a principle blocks the work, surface the conflict and
stop.

Runtime guidance for day-to-day work lives in `AGENTS.md`, which routes to
`docs/`. Those documents explain _how_; this one defines _what is not
negotiable_.

**Version**: 1.0.0 | **Ratified**: 2026-08-15 | **Last Amended**: 2026-08-15
