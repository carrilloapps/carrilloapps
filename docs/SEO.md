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

### Budget titles and descriptions in pixels, never in characters

Google truncates a snippet by **rendered width**, not by length:

| Field       | Font            | Desktop | Mobile |
| ----------- | --------------- | ------- | ------ |
| Title       | Arial bold 20px | 580px   | 545px  |
| Description | Arial 13px      | 920px   | 680px  |

Spanish runs wide — accents, long compounds, no short Anglo-Saxon words — so a
character count lies here. Every description on this site once sat at 138–160
characters, comfortably inside the "160 character" rule of thumb, and **all
seven measured 943–1053px**: every one truncated with an ellipsis.

Measure before shipping copy. In a browser console:

```js
const ctx = document.createElement("canvas").getContext("2d")
ctx.font = "13px Arial" // "bold 20px Arial" for titles
ctx.measureText("your description here").width
```

Two things this catches that counting does not: the `%s | Junior Carrillo`
template adds ~185px to every page title, and a title that already names the
site (`… — carrillo.app`) then gets the name appended twice.

Target the desktop budget and front-load, so the mobile cut lands after a
complete first clause rather than mid-thought. Fitting 680px would mean ~100
characters, which is not enough to say anything.

## 2. OG images are generated, not stored

Each route that needs a social preview has an `opengraph-image` route segment
rendering an image at build time:

```text
src/app/opengraph-image.tsx
src/app/servicios/opengraph-image.tsx
src/app/sobre-mi/opengraph-image.tsx
src/app/recursos/opengraph-image.tsx
src/app/contacto/opengraph-image.tsx
src/app/agendamiento/opengraph-image.tsx
src/app/herramientas/opengraph-image.tsx
```

Every one of them is four lines: it calls `renderPageOg()` from `src/lib/og.tsx`
with `eyebrow`, `title`, `subtitle` and `particulars`. Do not hand-place static
OG files in `public/` — a file-convention `opengraph-image` route beats the
`openGraph.images` entry `buildPageMetadata` declares, so the per-route card
always wins and a static file would rot unnoticed.

### The card is the home page's document header

Nothing on the card is invented for the card. Each element has a counterpart in
the running site, so someone who saw the preview recognises the page:

| On the card                       | In the app                                                     |
| --------------------------------- | -------------------------------------------------------------- |
| Prompt mark                       | `BrandMark` in `src/components/brand-mark.tsx`                 |
| `carrillo` + faint `.app`         | `BrandWordmark`, TLD in `text-paper-faint`                     |
| Column rules + stamp margin rule  | The ledger sheet behind every page                             |
| Section head, mono 0.14em         | `HomeHero`'s `Herramientas publicadas` head                    |
| Title at -0.045em / 0.88 leading  | `h1#hero-heading`                                              |
| Particulars, ruled top and bottom | The `<dl>` under the name (Rol · Base · Trayectoria · Enfoque) |

`particulars` takes up to four `{ term, value }` pairs and carries real facts —
`$50B COP/año`, `13M`, `MIT`, `America/Bogotá` — never a keyword list dressed up
as data. **Keep every `value` to one line:** the cells are equal-width flex
columns, so a value that wraps drops its own cell's baseline out of line with
the other three.

### Two constraints the renderer will not forgive

Satori is not a browser:

- **No variable fonts, no woff2.** `Archivo[wdth,wght].ttf` throws
  `Cannot read properties of undefined (reading '256')` and takes the build
  down. Only a _static_ TTF instance works, which is why two of them are
  committed under `src/lib/fonts/` — see the README there.
- **Fonts are read from disk, never fetched.** They used to come from the
  Google Fonts API at build time, until a build lost the network and shipped
  every card in a system fallback stack: no error, no failed deploy, just the
  wrong typeface everywhere. If a card ever renders in the wrong face, that is
  the failure mode to suspect.
- **No `inset` shorthand.** A container styled `position: absolute; inset: 0`
  collapses to zero and silently swallows its children. Spell out
  `top`/`left`/`width`/`height`.

### Icons and PWA assets

The mark is a **prompt**: a chevron, a block cursor, and the validation stamp as
the rule beneath them. It replaced boxed `JC` initials, which mushed into their
own frame at 16px and named the person without naming the trade. The identity
still lands — in the wordmark beside it, and in the page title.

The same 64-unit geometry is written out in three places, and changing one means
changing all three:

1. `src/components/brand-mark.tsx` — the header and footer
2. `src/app/icon.svg` — the SVG favicon
3. the generator behind `public/icons` — every raster
4. `BrandCell` in `src/lib/og.tsx` — the social card

Nothing uses `<text>`: a browser rendering an SVG favicon has no access to
Archivo and would substitute Helvetica, breaking the family.

**Every default coordinate is a multiple of 4.** A tab renders the mark at 16px
and a retina tab at 32 — both exact divisions of the 64-unit canvas — so
whole-unit geometry lands on whole pixels. The first version used 7-unit strokes:
the chevron hid the half-pixel in its diagonal antialiasing, but the axis-aligned
cursor and rule could not, and came out grey and misshapen beside it. If a shape
ever looks deformed next to the chevron, check that its coordinates still divide
by 4.

Two variants:

| Variant  | Sizes                        | Why                                                                                                                                                                                                     |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default  | 16, 32, `.ico`, 48–144       | The stamp rule bleeds off the bottom edge, the way a ruled sheet ends                                                                                                                                   |
| `padded` | 192+, `apple-touch-icon.png` | Everything inside the maskable safe circle (radius 25.6 from centre), **rule included** — a bar low in the frame pokes out of a circular mask at both ends, so it is cut back to the mark's own measure |

`manifest.ts` declares 192 and 512 twice, `purpose: "any"` and
`purpose: "maskable"`, which is why the padded variant exists. Its
`screenshots` are real captures of the home at 1280×720 and 750×1334 in
`public/screenshots/` — never `placeholder.jpg`. When recapturing, remove the
`nextjs-portal` node and dismiss the cookie banner first, or both ship inside
the PWA install prompt.

Verify the result with the `opengraph` MCP:

```text
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
