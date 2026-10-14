# `src/components/` — agent guidelines

Every React component on the site. The visual rules they implement are in
[DESIGN.md](../../DESIGN.md); page composition is in
[docs/PAGE_CONSISTENCY.md](../../docs/PAGE_CONSISTENCY.md). This page is about
**where a component goes and when to make a new one**.

This file was rewritten on 14 October 2026. The version before it listed
`blog-article.tsx`, `blog-categories.tsx`, `interactive-background.tsx`,
`contact-info-card.tsx` and thirty more files that had been deleted — a
directory map that described a codebase from a year earlier. If you add or move
a component, update the tree below in the same commit; a map that lies is worse
than no map, because an agent trusts it.

---

## Where things live

Components are grouped by **what they do for the page**, not by what they are
made of. The question to answer is "what is this component's job on screen",
and the first folder that matches wins.

```text
src/components/
├── ui/           Primitives with no domain knowledge. A button does not know
│                 what it submits. Variants via `cva`.
├── layout/       The frame every route renders inside: header, footer, hero,
│                 background, section header, skip link, scroll-to-top.
├── content/      Blocks that render domain content — repositories, posts,
│                 projects, comments.
├── forms/        Anything the reader types into or submits, plus the controls
│                 that open those flows (CV modal, booking popup, captcha).
├── feedback/     Loading, consent, and anything that tells the reader the app
│                 is busy or waiting on them.
├── seo/          Structured data. Renders nothing visible.
├── brand/        Identity marks: logo, wordmark, social row.
├── providers/    Context providers and third-party bootstrapping.
├── analytics/    GA4 and Clarity wiring.
├── icons/        SVG icon sets.
├── home/         Blocks used only by `/`.
├── about/        Blocks used only by `/sobre-mi`.
├── legal/        The shared renderer for the four legal pages.
└── dynamic-imports.tsx   The one root file: the lazy-loading barrel.
```

A folder for a single route (`home/`, `about/`) is for a block that genuinely
cannot be reused. The moment a second page wants it, it moves to `content/`.

### The current inventory

| Folder       | Components                                                                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/`        | `badge`, `button`, `card`, `consent-check`, `country-select`, `dialog`, `eyebrow`, `input`, `label`, `phone-field`, `section`, `select`, `sonner`, `spec-list`, `stat-tiles`, `surface-card`, `tabs`, `textarea` |
| `layout/`    | `dynamic-background`, `page-hero`, `scroll-to-top`, `section-header`, `site-footer`, `site-header`, `skip-link`                                                                                                  |
| `content/`   | `animated-section`, `disqus-comments`, `featured-projects`, `featured-repositories`, `latest-posts-section`, `open-source-section`, `project-dialog`, `repositories-list`                                        |
| `forms/`     | `cal-booking`, `compact-contact-section`, `cv-download-button`, `cv-download-modal`, `newsletter-form`, `turnstile`                                                                                              |
| `feedback/`  | `cookie-consent`, `global-page-loader`, `page-loading-context`, `unified-loading`                                                                                                                                |
| `seo/`       | `home-jsonld`, `json-ld`                                                                                                                                                                                         |
| `brand/`     | `brand-mark`, `logo`, `social-row`                                                                                                                                                                               |
| `providers/` | `motion-preferences-provider`, `providers`, `theme-provider`                                                                                                                                                     |
| `analytics/` | `google-analytics`, `microsoft-clarity`                                                                                                                                                                          |
| `icons/`     | `social-icons`                                                                                                                                                                                                   |
| `home/`      | `home-hero`, `home-stats`                                                                                                                                                                                        |
| `about/`     | `experience-timeline`, `portrait-plate`                                                                                                                                                                          |
| `legal/`     | `legal-document`                                                                                                                                                                                                 |

---

## Reuse before you write

57 unreachable files were deleted on 14 October 2026 — components written
alongside ones that already did the job. Check these four before adding
anything.

| You are about to write              | Use instead                           |
| ----------------------------------- | ------------------------------------- |
| A page's opening block              | `<PageHero>` — `layout/page-hero`     |
| A small mono uppercase label        | `<Eyebrow>` — `ui/eyebrow`            |
| A term/value list of facts          | `<SpecList>` — `ui/spec-list`         |
| A section with a heading and rhythm | `<Section header={…}>` — `ui/section` |
| A card surface                      | `<SurfaceCard>` — `ui/surface-card`   |

### `<PageHero>` — `layout/page-hero`

Nine pages were hand-writing the same `<section>`, `clamp()` heading and
two-column grid. It takes composition, never colour:

```tsx
<PageHero
  eyebrow="Escritura"              // optional column label
  eyebrowTone="faint"              // faint · stamp
  title="Qué se rompió y cómo se arregló"
  headingId="blog-heading"         // the id aria-labelledby points at
  titleScale="display"             // display · page (a page inside a section)
  titleWidth="default"             // tight · snug · default · roomy · wide
  topBar={<>…</>}                  // optional ruled row above the heading
  aside={<SpecList items={…} />}   // optional particulars column
  asideWidth="md"                  // sm · md · lg · xl
  actions={<>…</>}                 // optional ruled CTA row
>
  <p>Opening paragraph.</p>
</PageHero>
```

There was an earlier `PageHero`, deleted because it had **zero importers** and
took five colour strings. If you extend this one, extend it from a page that
exists — a prop only one caller passes is how the first one died.

`/sobre-mi` deliberately does not use it: its hero is a two-row grid with a
portrait, which shares no structure with the other nine.

### `<Eyebrow>` — `ui/eyebrow`

47 hand-written copies across 15 files, already drifted into four size/tracking
pairs. Orthogonal variants, because the real combinations crossed:

```tsx
<Eyebrow>Publicado en</Eyebrow>                           // 10px / 0.16em / faint
<Eyebrow as="p" size="md" tracking="wide">Escritura</Eyebrow>
<Eyebrow tone="stamp" numeric>02 / 07</Eyebrow>
```

`as`: `span` (default) · `p` · `dt` · `div`. An eyebrow is **type, never a
pill** — a bordered mark with a background is `Badge`.

### `<SpecList>` — `ui/spec-list`

A real `<dl>`, so a screen reader announces each value as the answer to its
term. A pair of `<span>`s in a flex row looks the same and says nothing.

```tsx
<SpecList items={[{ term: "Respuesta", value: "< 24 h hábiles" }]} />
<SpecList layout="grid" variant="open" numeric items={…} />
```

---

## Conventions

- **File names** are `kebab-case.tsx`; the exported component is `PascalCase`.
- **`"use client"`** only when the component needs state, effects, or browser
  APIs. Server by default.
- **Variants come from `cva`**, never from a `className` string passed down by
  the caller. A component that takes colour as a prop cannot stay consistent —
  that is why the old `PageHero` and `SocialLinkCard` were rewritten.
- **No Tailwind palette colours.** Ledger tokens only — `AGENTS.md` rule 11.
- **Heavy components load through `dynamic-imports.tsx`**, the lazy barrel.
- **Touch targets ≥ 48×48px**, and focus is an outline, never a ring.

## Before adding a component

1. Check the table above — it probably exists.
2. Check it is reachable. Run the reachability walk in
   [docs/DESIGN_STATUS.md](../../docs/DESIGN_STATUS.md) §3 before assuming a
   component is in use; 57 were not.
3. Put it in the folder that matches its job, and add it to the inventory here.
