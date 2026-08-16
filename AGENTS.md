# AGENTS.md — carrillo.app

Entry point for every AI agent in this repository. Short on purpose: it holds
identity, the context protocol, the hard rules, and where to find the rest.
Depth lives in [`docs/`](docs/README.md) and is loaded per task.

`CLAUDE.md` and `.github/copilot-instructions.md` are one-line pointers here.
Update this file, never fork it.

---

## 0. Before you touch anything

### Use the context MCPs. This is mandatory

Constitution Principle I. Grep-and-open is the fallback, never the opening move.

| Need                                                  | Call                                                    |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Where is X, what calls it, what breaks if I change it | **codegraph** → `codegraph_explore(query, projectPath)` |
| How does this project do X, is it already documented  | **docgraph** → `search`, `explore`, `get_related`       |

`codegraph_explore` returns verbatim line-numbered source **plus** the blast
radius in one round-trip — treat what it returns as already read, and check the
callers before editing. `getSiteUrl` has 28 of them and no test coverage.

Reindex when they go stale: `npx -y @colbymchenry/codegraph@latest init`, and
docgraph's `index_project`.

### Read the constitution

[`.specify/memory/constitution.md`](.specify/memory/constitution.md) — five
binding principles. It supersedes this file and everything in `docs/`.
`/speckit-analyze` and `/speckit-implement` check work against it.

### Then load only the doc your task needs

[`docs/README.md`](docs/README.md) maps task → document.

---

## 1. What this is

Personal portfolio and professional site for José (Junior) Carrillo. One
Next.js app, no backend database, deployed on Vercel from `main`.

| Layer                           | Version                                   |
| ------------------------------- | ----------------------------------------- |
| Next.js (App Router, Turbopack) | `~16.3.1`                                 |
| React                           | `~19.2.8`                                 |
| TypeScript (strict)             | `~6.0.3`                                  |
| Tailwind CSS (v4, CSS-first)    | `~4.3.3`                                  |
| Framer Motion                   | `~13.1.0`                                 |
| UI                              | Radix + shadcn/ui in `src/components/ui/` |
| Tests                           | Vitest (unit) + Playwright (e2e)          |

Spanish route slugs: `servicios`, `sobre-mi`, `recursos`, `contacto`,
`agendamiento`, `cookies`, `privacidad`, `terminos`. **There is no `src/app/blog/`
route** — Substack posts surface on the home page and in `src/app/rss.xml`.

Data comes from three places: static arrays in `src/lib/data/`, route handlers in
`src/app/api/` that proxy GitHub/GitLab/Substack/Mailchimp, and nothing else.
`src/lib/wordpress-service.ts`, `src/lib/woocommerce-service.ts` and the Medium
`src/lib/rss-service.ts` no longer exist — do not reference them.

Read env vars through `src/lib/env.ts`, never `process.env` directly.

**Application code lives in `src/`** — `src/app`, `src/components`, `src/hooks`,
`src/lib` (with `src/lib/data`), `src/types`. `public/`, `docs/`, `specs/`,
`tests/` and every config file stay in the root, as Next requires.
Path alias `@/*` → `src/*`, so imports read `@/components/site-header`.

Details: [docs/PROJECT.md](docs/PROJECT.md).

---

## 2. Commands

```bash
npm run dev            # dev server
npm run build          # production build
npm run lint           # 0 errors / 0 warnings required
npm test               # Vitest
npm run test:e2e       # Playwright
npm run skills:all     # bootstrap every agent skill
npm run mcp:check      # .mcp.json vs opencode.json
```

Full list: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) and
[docs/AGENT_TOOLING.md](docs/AGENT_TOOLING.md).

---

## 3. Hard rules

1. **Query codegraph/docgraph before reading or editing.** Ship an edit without
   checking the blast radius and the work is incomplete.
2. **The shared page shell is mandatory** — `PageLoadingProvider`,
   `DynamicBackground`, `SiteHeader`, `PageHero`/`PageHeroSplit`, `SiteFooter`.
   No hand-rolled heroes, no custom backgrounds.
3. **No visual breadcrumbs.** JSON-LD only, via `<BreadcrumbJsonLd>` in
   `layout.tsx`.
4. **Metadata and JSON-LD live in `layout.tsx`**, never in `page.tsx` — pages
   are `"use client"`.
5. **Never call a third-party API from a client component.** Route handlers own
   every upstream call, its cache window and its error shape.
6. **Accessibility is a gate**: touch targets ≥ 48×48px, text no lighter than
   `text-zinc-300`, labels bound with `htmlFor`/`id`, no `role="listitem"` on
   `<a>`/`<button>`/`<Card>`/`<Badge>`.
7. **`npm run lint` ends 0/0 and `npm run build` succeeds** before any commit.
   No `any`, no unused imports or variables.
8. **Tilde versioning stays.** Never `^`, never exact pins.
9. **No `scripts/` directory.** Tool config lives in the tool's own file —
   MCP servers only in `.mcp.json`, mirrored to `opencode.json` and guarded by
   `npm run mcp:check`.
10. **Tailwind is v4, CSS-first.** No `tailwind.config.*`. Turbopack rejects
    webpack-only Next options.
11. **Update docs in place.** A second file on an existing topic is a violation.
12. **Commits carry no `Co-authored-by` trailer.**

### File naming

Pages `page.tsx`, layouts `layout.tsx`, handlers `route.ts`, components and
utilities `kebab-case`, unit tests `tests/unit/*.test.ts(x)`, e2e
`tests/e2e/*.spec.ts`.

---

## 4. Where things are

| Looking for                              | Go to                                                              |
| ---------------------------------------- | ------------------------------------------------------------------ |
| Page shell, heroes, design tokens, a11y  | [docs/PAGE_CONSISTENCY.md](docs/PAGE_CONSISTENCY.md)               |
| Metadata, OG, JSON-LD, sitemap           | [docs/SEO.md](docs/SEO.md)                                         |
| Route handlers, caching, form security   | [docs/API.md](docs/API.md)                                         |
| Analytics helpers                        | [docs/ANALYTICS.md](docs/ANALYTICS.md)                             |
| Performance and LCP                      | [docs/PERFORMANCE.md](docs/PERFORMANCE.md)                         |
| Commands, quality gate, testing          | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)                         |
| Deploy, env vars, rollback, build errors | [docs/VERCEL.md](docs/VERCEL.md)                                   |
| MCP servers, skills, spec-kit            | [docs/AGENT_TOOLING.md](docs/AGENT_TOOLING.md)                     |
| Binding principles                       | [.specify/memory/constitution.md](.specify/memory/constitution.md) |
| Feature specs                            | [specs/README.md](specs/README.md)                                 |
| Everything else                          | [docs/README.md](docs/README.md)                                   |

Directory-scoped rules: `src/app/AGENTS.md`, `src/components/AGENTS.md`,
`src/lib/AGENTS.md`, `src/lib/data/AGENTS.md`, `src/hooks/AGENTS.md`, `src/types/AGENTS.md`.

---

**Version**: 4.0.0 · **Last updated**: 16 August 2026 · **Maintained by**: José Carrillo (<junior@carrillo.app>)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- INSFORGE:START -->

## InsForge backend

This project uses [InsForge](https://insforge.dev): an all-in-one, open-source Postgres-based backend (BaaS) that gives this app a database, authentication, file storage, edge functions, realtime, an AI model gateway, and payments through one platform.

- **Project:** **carrilloapps** (API base `https://vrdbj9c4.us-east.insforge.app`)
- **Skills:** these InsForge skills are installed for supported coding agents. Reach for them before implementing any InsForge feature instead of guessing the API:
  - `insforge`: app code with the `@insforge/sdk` client (database CRUD, auth, storage, edge functions, realtime, AI, email, and Stripe payments).
  - `insforge-cli`: backend and infrastructure via the `insforge` CLI (projects, SQL, migrations, RLS policies, storage buckets, functions, secrets, payment setup, schedules, deploys).
  - `insforge-debug`: diagnosing failures (SDK/HTTP errors, RLS denials, auth and OAuth issues) and running security or performance audits.
  - `insforge-integrations`: wiring external auth providers (Clerk, Auth0, WorkOS, Better Auth, etc.) for JWT-based RLS, or the OKX x402 payment facilitator.
  - `find-skills`: discovering additional skills on demand.
- **Credentials:** app code reads keys from `.env.local`; the CLI reads `.insforge/project.json`. Never hardcode or commit keys.

Key patterns:

- Database inserts take an array: `insert([{ ... }])`.
- Reference users with `auth.users(id)`; use `auth.uid()` in RLS policies.
- For storage uploads, persist both the returned `url` and `key`.

<!-- INSFORGE:END -->
