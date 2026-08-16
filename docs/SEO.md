# SEO, Metadata and Structured Data

How this project produces titles, descriptions, OG images and JSON-LD. Read
before touching any `layout.tsx` or adding a route.

---

## 1. Metadata lives in `layout.tsx`, never in `page.tsx`

Every page component is `"use client"`, so it cannot export `metadata`. Each
route has a `layout.tsx` that does. Nine of them exist today: `src/app/layout.tsx`
plus one per route.

Build metadata with the shared helper rather than by hand:

```tsx
// app/<route>/layout.tsx
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Page Title",
  description: "Page description for SEO",
  path: "/route",
})
```

`buildPageMetadata` (`src/lib/seo.ts`) resolves the canonical URL through
`getSiteUrl()` from `src/lib/env.ts`, so it stays correct on localhost, Vercel
previews and production without per-environment branching.

Never hardcode `https://carrillo.app` in a metadata object.

## 2. OG images are generated, not stored

Each route that needs a social preview has an `opengraph-image` route segment
rendering an image at build time:

```
app/opengraph-image.tsx
app/servicios/opengraph-image.tsx
app/sobre-mi/opengraph-image.tsx
app/recursos/opengraph-image.tsx
app/contacto/opengraph-image.tsx
app/agendamiento/opengraph-image.tsx
```

Shared rendering helpers live in `src/lib/og.tsx`. Do not hand-place static OG
files in `public/` — the generated route wins and the static file rots.

Verify the result with the `opengraph` MCP:

```
inspect_og(url: "https://carrillo.app")
```

It returns the parsed tags, the resolved image, a score and a list of issues.
The site currently scores 100/100 — keep it there.

## 3. Structured data (JSON-LD)

`src/components/json-ld.tsx` exports:

| Component            | Use                            |
| -------------------- | ------------------------------ |
| `JsonLd`             | Generic wrapper, escape hatch  |
| `OrganizationJsonLd` | Organization schema            |
| `PersonJsonLd`       | Person schema (the site owner) |
| `WebsiteJsonLd`      | WebSite schema, root layout    |
| `ServiceJsonLd`      | Service offerings              |
| `BreadcrumbJsonLd`   | Breadcrumb trail               |

All of them belong in `layout.tsx`.

```tsx
<BreadcrumbJsonLd
  items={[
    { name: "Inicio", url: "https://carrillo.app" },
    { name: "Servicios", url: "https://carrillo.app/servicios" },
  ]}
/>
```

**`BreadcrumbJsonLd` is the only breadcrumb allowed in this project.** Visual
breadcrumb UI is banned — it duplicates the header navigation and adds no
value on a site this shallow. If you find a `<Breadcrumb>` component rendered
inside a page, delete it and check the layout has the JSON-LD equivalent.

`src/components/home-jsonld.tsx` and `src/components/services-seo.tsx` carry the
page-specific payloads for the home and services routes.

## 4. Sitemap, robots and feeds

| Route                   | File                                        |
| ----------------------- | ------------------------------------------- |
| `/sitemap.xml`          | `src/app/sitemap.xml/route.ts`              |
| `/robots.txt`           | `src/app/robots.txt/route.ts`               |
| `/rss.xml`              | `src/app/rss.xml/route.ts` — Substack posts |
| `/manifest.webmanifest` | PWA manifest                                |

A new public route needs a sitemap entry. Adding one without it means it will
not be discovered.

## 5. Auditing

- **`opengraph` MCP** — per-URL OG/Twitter tag inspection, free.
- **`openseo` MCP** — site audits, keyword research, SERP position, backlinks,
  Search Console. Credit-metered: call `whoami` first to check the balance, and
  ask before running batches over ~2,000 credits.
- **`chrome-devtools` MCP** — `lighthouse_audit` gives the SEO score alongside
  performance and accessibility, headlessly.
- **`seo-audit` skill** (stage `marketing`) — structured audit workflow.

## 6. Language

The site is Spanish-first with Spanish route slugs (`servicios`, `sobre-mi`,
`recursos`, `contacto`, `agendamiento`, `cookies`, `privacidad`, `terminos`).
Metadata copy follows the page language. See
[TRANSLATION.md](TRANSLATION.md) and [LANGUAGE_DETECTOR.md](LANGUAGE_DETECTOR.md).
