# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint check (must be 0 errors / 0 warnings before commit)
npm run lint:fix     # Auto-fix ESLint issues
```

There is **no test runner configured** — `package.json` exposes no `test` script and no test framework is installed. `docs/DEVELOPMENT.md` references Jest / `pnpm test`, but that is aspirational. Don't try to run tests; quality gating is via `npm run lint` + `npm run build`.

The project uses **npm** (`package-lock.json` is the lockfile), even though `docs/DEVELOPMENT.md` mentions pnpm. Use `npm`.

## Stack & Conventions

- **Next.js 16.1.7 App Router** + **React 19.2** + **TypeScript 5.9** (strict)
- **Tailwind 3.4** + **shadcn/ui** (Radix primitives in `components/ui/`) + **Framer Motion**
- Path alias: `@/*` → repo root (e.g., `@/components/page-hero`)
- **Tilde versioning (`~`) is intentional and load-bearing** — every dependency in `package.json` uses `~` to allow only patch updates. Do not change to `^` or pin exact. This is enforced by `AGENTS.md` to prevent breaking minor/major bumps.
- Routes use **Spanish slugs**: `agendamiento`, `contacto`, `cookies`, `privacidad`, `recursos` (resources), `servicios` (services), `sobre-mi` (about), `terminos`. The `blog/` route is bilingual content.

## Architecture

This is a single-site personal portfolio (carrillo.app) with no backend database. Data flows from three places:

1. **Static data** in `data/` — hand-maintained TypeScript arrays (`projects.ts`, `featured-projects.ts`).
2. **External APIs proxied through `app/api/*/route.ts`** — `github-repositories`, `gitlab-repositories`, `repository-details`. These are server route handlers that fetch + cache upstream data; never call GitHub/GitLab directly from client components, go through these routes.
3. **Blog content from WordPress + WooCommerce** — `lib/wordpress-service.ts` and `lib/woocommerce-service.ts`. The blog (`app/blog/`) and resources (`app/recursos/`) pages consume these services. Note: copilot-instructions.md references a Medium RSS service (`lib/rss-service.ts`); that file no longer exists — the WordPress service is the current source.

### Mandatory page shell

Every page under `app/*/page.tsx` must follow this composition (enforced by `AGENTS.md` and `.github/copilot-instructions.md`):

```tsx
"use client";
// PageLoadingProvider wraps PageContent
// PageContent renders:
//   <PageLoadingOverlay isVisible={isLoading} />   // from components/unified-loading
//   <div className="min-h-screen text-white relative overflow-hidden">
//     <DynamicBackground />                        // REQUIRED — provides animated gradient/grid bg
//     <SiteHeader />
//     <main className="relative z-10 container py-12 space-y-24">
//       <PageHero ... /> or <PageHeroSplit ... />  // never roll your own hero
//       {/* sections with `space-y-24` between, `pt-6 pb-12` for the first one after hero */}
//     </main>
//     <SiteFooter />
//   </div>
```

- `DynamicBackground` (`components/dynamic-background.tsx`) replaced the deprecated `ParticleHeroBackground` — do not use the old one.
- Hero badges default to **emerald/teal**, not blue/purple. Blue/purple is reserved for active nav items, so badges using those colors get visually confused with navigation.
- **No visual breadcrumbs.** Breadcrumbs exist only as JSON-LD in `layout.tsx` files via `<BreadcrumbJsonLd>` from `components/json-ld.tsx`.

### Loading & motion

- Page-level loading state lives in `components/page-loading-context.tsx` (`PageLoadingProvider` / `usePageLoading`). The overlay component is `OverlayLoading` re-exported as `PageLoadingOverlay` from `components/unified-loading.tsx`.
- Standard Framer Motion variants (`containerVariants` with `staggerChildren: 0.1`, `itemVariants` with `y: 20` → `0`, `duration: 0.6`, `ease: "easeOut"`) are repeated across pages — copy them rather than inventing new ones, so animations stay uniform.

### Analytics

`lib/analytics.ts` exposes ~25 named tracking helpers (`trackButtonClick`, `trackNavigation`, `trackCTAClick`, `trackFormStart`, `trackFormSubmit`, `trackBlogPostView`, etc.) wired to GA4 + Microsoft Clarity. Use these helpers for any new interactive element rather than calling `gtag` directly. Analytics components live under `components/analytics/`.

### Environment

Read env vars through `lib/env.ts` (`publicEnv`, `privateEnv`, `vercelEnv`, `getSiteUrl()`, `isProduction()`, etc.) rather than `process.env` directly — `getSiteUrl()` handles the localhost / Vercel preview / production fallback chain. Required: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DISQUS_SHORTNAME`. See `.env.example`.

## Code Quality (non-negotiable per AGENTS.md)

- `npm run lint` must end with **0 errors and 0 warnings** before any commit.
- No `any` — use specific types or `unknown`.
- No unused imports / variables.
- `npm run build` must succeed (TypeScript is `strict`).

## Accessibility (from `.github/copilot-instructions.md`)

- Touch targets ≥ 48×48px on all interactive elements (`min-h-[48px]` + `touch-manipulation`).
- Body text minimum `text-zinc-300` for contrast (avoid `zinc-400`/`zinc-500` for primary text).
- Form inputs: pair `htmlFor` on `<label>` with `id` on the input; add `aria-label` on `SelectTrigger`.
- Do **not** put `role="listitem"` on `<a>`, `<button>`, `<Card>`, or `<Badge>` — it breaks AT semantics.

## Documentation

Detailed guidance lives in `AGENTS.md` (root and per-directory: `app/`, `components/`, `lib/`, `data/`, `hooks/`, `types/`) and `docs/` (`PROJECT.md`, `DEVELOPMENT.md`, `ANALYTICS.md`, `DISQUS.md`, `PERFORMANCE.md`, `API.md`, `VERCEL.md`, `PAGE_CONSISTENCY.md`, etc.). When adding documentation, **update the relevant existing file** rather than creating a new one — `AGENTS.md` explicitly forbids creating duplicate "optimization" / "summary" files for topics already covered.

## Git commit policy (project override)

`AGENTS.md` instructs that commits must **not** include `Co-authored-by:` trailers. This overrides the default Claude Code commit template — when committing in this repo, omit the `Co-Authored-By` line.
