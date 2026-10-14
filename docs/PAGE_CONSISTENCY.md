# Page Consistency Guide

The shared page shell, the hero components, page-level spacing and the
accessibility floor. Constitution Principle II — "the shared shell is the
product" — is enforced here.

The **visual system** — colour, geometry, elevation, type, motion — lives in
[`DESIGN.md`](../DESIGN.md) at the repo root. This page covers composition and
points there rather than repeating it.

Read this before creating or restructuring any page.

---

## 1. Mandatory page shell

Every `src/app/*/page.tsx` follows this composition. No exceptions.

```tsx
"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context"
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading"

function PageContent() {
  const { isLoading } = usePageLoading()

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="relative min-h-screen overflow-hidden text-white">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container space-y-24 py-12" id="main-content">
          {/* Hero: composed inline from the shared heading pattern — see §2 */}
          <section aria-labelledby="page-heading">
            <h1 id="page-heading" className="…">
              Main Title
            </h1>
          </section>

          <motion.section
            className="space-y-8 pt-6 pb-12" // first section after hero: pt-6, not py-12
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* content */}
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  )
}
```

Metadata and JSON-LD do **not** go here — pages are `"use client"`. See
[SEO.md](SEO.md).

### Checklist

- [ ] `PageLoadingProvider` + `PageLoadingOverlay`
- [ ] `DynamicBackground` (never `ParticleHeroBackground` — removed)
- [ ] Container: `relative min-h-screen overflow-hidden text-paper`
- [ ] Hero follows the shared heading pattern ([DESIGN.md §7](../DESIGN.md#7-type))
- [ ] `main` uses `container py-12 space-y-24` and keeps `id="main-content"`
- [ ] First section after hero uses `pt-6 pb-12`
- [ ] Sections animate with `whileInView` + the standard variants
- [ ] No visual breadcrumbs — JSON-LD only, in `layout.tsx`
- [ ] Analytics tracking on every interactive element
- [ ] Touch targets ≥ 48×48px

---

## 2. The hero

There is no `PageHero` component. There were two — `PageHero` and
`PageHeroSplit` — and they were deleted on 14 October 2026 with zero importers:
every page had been building its hero inline for a long time, so the components
documented here were describing a shell nothing used. Constitution Principle II
was amended to v1.1.0 in the same change.

What a hero must share is the **type**, not a component:

```tsx
<section className="relative w-full pt-6 md:pt-10" aria-labelledby="page-heading">
  <div className="container mx-auto px-4">
    <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">Eyebrow</p>
    <h1
      id="page-heading"
      className="mt-3 max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
    >
      The heading
    </h1>
    <p className="mt-8 max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
      One paragraph that says what the page is for.
    </p>
  </div>
</section>
```

`src/app/blog/page.tsx` is the reference implementation. The rules behind those
values are in [DESIGN.md §7](../DESIGN.md#7-type); the one that is not
negotiable is that a heading is solid `text-paper` — no `bg-clip-text`
gradients.

A page that needs a two-column hero puts the visual in a sibling column of the
same grid, with `rounded-xl border border-rule shadow-plate` on the figure.

---

## 3. DynamicBackground

`src/components/dynamic-background.tsx` — required on every page.

Ledger paper, inverted. Accounting paper is ruled, never lit:

- Ink ground, `bg-ink`. Layer `-z-50`.
- Column rules — a repeating 1px `--ledger-rule` gradient every 12.5%, at 0.28
  opacity. Layer `-z-40`.
- Row rules — the same hairline every 8rem, at 0.16, so the grid reads as a
  ledger rather than as graph paper. Layer `-z-40`.
- The margin rule — one stamp-red 1px line just inside the container gutter,
  `xl:` and up, at 0.3. The only colour in the ground. Layer `-z-30`.
- A radial vignette so a long page does not read as an infinite grid.

Everything is a flat CSS gradient: no blur, no animation, no paint cost on
scroll. The four animated gradient orbs this replaced belonged to a different
visual world and put colour into the text field, which this design keeps
achromatic.

Do not stack extra overlays on top — this component owns the background. The
old `ParticleHeroBackground` and its manual `bg-gradient-to-br` overlay are
gone; if you find that pattern in old code, replace the whole block with
`<DynamicBackground />`.

---

## 4. Design tokens

**The visual system lives in [`DESIGN.md`](../DESIGN.md)** — colour, geometry,
elevation, surfaces, actions, type and motion, with the measured contrast
ratios. It is the single source; this section covers only what is specific to
laying out a page and points there for the rest.

This used to hold a colour table of its own (emerald badge gradients, a
white→blue→purple title gradient). It had been wrong for a while: the code had
moved to the ledger and the table still described the palette before it. Two
documents on one topic is how that happens, which is why there is now one.

### Colors

See [DESIGN.md §2](../DESIGN.md#2-colour). The short version, for page work:

| Need                   | Use                                 |
| ---------------------- | ----------------------------------- |
| Page ground            | `bg-ink` (via `DynamicBackground`)  |
| A plate                | `.surface-card` / `<SurfaceCard>`   |
| Headings, figures      | `text-paper`                        |
| Body copy              | `text-paper-dim`                    |
| Labels, metadata       | `text-paper-faint` — the floor      |
| Any border             | `border-rule`, `border-rule-strong` |
| The one action         | `.cta-stamp` (prints `text-ink`)    |
| Information / outbound | `text-support`                      |
| Shipped, reconciled    | `text-settled`                      |

Never introduce a Tailwind palette colour (`blue-500`, `emerald-400`, …). The
one sanctioned exception is documented in [DESIGN.md §2](../DESIGN.md#2-colour).

### Spacing

| Element                     | Value                     |
| --------------------------- | ------------------------- |
| Main container              | `py-12 space-y-24`        |
| Hero section                | `py-8 md:py-16 space-y-6` |
| Regular sections            | `py-12 space-y-8`         |
| First section after hero    | `pt-6 pb-12 space-y-8`    |
| Spacer before hero children | `h-6`                     |

### Typography

Full rules in [DESIGN.md §7](../DESIGN.md#7-type). For a page:

- Hero title, the shared clamp:
  `font-sans text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance text-paper`
- Hero description: `text-lg text-paper-dim max-w-[62ch]`
- Section titles: `text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-paper`
- Column labels: `font-mono text-[11px] tracking-[0.14em] uppercase text-paper-faint`

No gradient-clipped headings.

### Motion

Copy these variants; do not invent new ones. Durations, easing and the
reduced-motion contract are in [DESIGN.md §8](../DESIGN.md#8-motion).

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
```

Shared helpers live in `src/lib/motion.ts`. Respect
`src/components/motion-preferences-provider.tsx` for reduced-motion.

### Calls to action: two levels, never bare text

An action that looks like a sentence does not get clicked. Two classes carry
every CTA on the site, both defined in `src/app/globals.css`:

| Class        | Use                                        | Looks like                                 |
| ------------ | ------------------------------------------ | ------------------------------------------ |
| `.cta`       | The one action a section exists to produce | Sans at reading size over a 2px stamp rule |
| `.cta-quiet` | Every secondary path                       | Mono uppercase inside a 1px ruled plate    |

Both are 48px tall, both carry `touch-action: manipulation`, and both state
their hover and focus. Never ship an action as plain mono text with only a
colour change — that was how "Descargar CV", "Escribirme" and "Ver servicios"
shipped, and they read as captions.

**Neither level is boxed.** Enclosing every secondary link turned the page into
a field of buttons and fought a world built from rules. What marks a quiet CTA
as actionable is the register plus the icon: `ArrowUpRight` for navigation,
`Download` for a file, `CalendarDays` for booking. An icon is not decoration
here, it is the affordance — a `.cta-quiet` without one is incomplete.

Cursor: **Tailwind v4 removed `cursor: pointer` from its button reset.** The
base layer restores it for `button`, `[role="button"]`, `summary` and
`label[for]`, and sets `not-allowed` on disabled controls. If you add a new
kind of clickable element, confirm it points.

### Focus: outline, never ring

**No component may use Tailwind's `ring-*` utilities.** Not `focus:ring-2`, not
`focus-visible:ring-ring`, not `ring-offset-*`. This is a system rule, and it is
enforced per component rather than by a global override — the utilities stay
available in Tailwind, we simply never reach for them.

A `ring` is a `box-shadow`. It paints a soft, offset, coloured glow that belongs
to the elevated-card language this site replaced, it stacks badly against a 1px
hairline, and it needs a `ring-offset-color` matching the local background,
which silently breaks the moment a component moves onto a different surface.

The ledger focuses with the browser's own outline, themed once in
`src/app/globals.css`:

```css
html :focus-visible {
  outline: 2px solid var(--ledger-stamp-text);
  outline-offset: 3px;
}
```

Anything needing a local focus treatment writes it explicitly:

```tsx
// ✅ the stamp outline, offset from the hairline
className =
  "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp focus:outline-none"

// ✅ a control whose own border carries the state
className = "focus-visible:border-stamp"

// ❌ never
className = "focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black"
```

**A hand-written ring counts too.** The utility is only one way to spell it; a
`box-shadow` with no offset and no blur is the same device:

```css
/* ❌ this is a ring, and it fired on every mouse click because :focus — not
   :focus-visible — matches pointer interaction */
a:focus,
button:focus {
  box-shadow:
    0 0 0 2px rgb(0 0 0),
    0 0 0 4px var(--ledger-stamp-text);
}
```

Use `:focus-visible`, never bare `:focus`, for any focus affordance: `:focus`
matches mouse clicks, so a styled `:focus` leaves a mark behind every time the
user clicks a button.

Check before shipping:

```bash
grep -rE "\bring-|ring-offset" src --include="*.tsx"   # no matches
grep -rnE "0 0 0 [0-9]+px" src --include="*.css"        # no focus rings
grep -rnE ":focus[^-]" src --include="*.css"            # prefer :focus-visible
```

---

## 5. Form fields

One surface, one rule, one focus treatment. `Input` and `Textarea` default to
the `ledger` variant: 48px minimum, an 8px corner, `border-rule` on `bg-field`.
The older `default` (shadcn's 40px field) and `glass` variants are deprecated
and only still exist so old call sites compile.

The corner is new with Graphite & Signal. A square field on a ruled ground read
as a spreadsheet cell, which is also how people treated it — a thing to tab
past rather than a thing to type in.

**Focus is not a ring.** The site-wide `:focus-visible` outline is deliberately
turned off for fields, because an offset outline around a field reads as a
second border floating off the one already drawn. A focused field instead
raises its surface to `--ledger-field-focus` and stamps its rule — both change
together, so the indicator survives a forced-colors mode that drops
backgrounds. A composed control (the phone field) carries `data-field-group`
and gets the same states through `:focus-within`.

**Any picker with more than ten options must offer a filter.** Below ten a list
is scanned; above it, it is searched. `CountrySelect` enforces this itself: the
search box appears past `SEARCH_THRESHOLD` and the keyboard handler lives on the
popup, not on the filter, so the arrows still work when it is hidden.

**Consent uses `ConsentCheck`, never a bare checkbox.** The native control with
`accent-color` was a 16px rounded browser box that matched nothing and missed
the touch target. `ConsentCheck` keeps the real `<input>` for semantics and
keyboard, visually hides it, and paints a square mark; the whole row is the
label, so the hit area is the sentence.

## 6. Accessibility floor

Constitution Principle III. These are gates, not polish.

- Touch targets ≥ 48×48px — `min-h-[48px]` + `touch-manipulation`.
- Body copy is `text-paper-dim` (7.91:1) or heavier. `text-paper-faint`
  (5.91:1) is the floor and belongs to labels, not paragraphs. The ledger has
  no lighter token, which is what keeps this from being a thing to remember.
- A filled signal colour carries `text-ink`, never `text-paper` — paper on the
  stamp is 2.30:1.
- Form inputs: `htmlFor` on `<label>` paired with `id` on the input;
  `aria-label` on every `SelectTrigger`.
- **Never** put `role="listitem"` on `<a>`, `<button>`, `<Card>` or `<Badge>` —
  it breaks assistive-tech semantics.
- Keep `src/components/skip-link.tsx` working: `main` must keep `id="main-content"`.
- Every interactive element reachable by keyboard with a visible focus state.
- Contrast 4.5:1 minimum.

Testing tools and the pre-merge bar are in [DEVELOPMENT.md](DEVELOPMENT.md).

---

## 7. Component inventory

Rebuilt on 14 October 2026, when 57 unreachable files were deleted. Everything
listed here is reached from a route; if you add a component, add it here.

Layout and chrome: `site-header`, `site-footer`, `skip-link`, `scroll-to-top`,
`section-header`.

Page-level: `dynamic-background`, `unified-loading`, `page-loading-context`,
`global-page-loader`, `animated-section`.

Content: `featured-projects`, `featured-repositories`, `repositories-list`,
`latest-posts-section`, `open-source-section`, `project-dialog`,
`legal/legal-document`, `about/experience-timeline`.

Interaction: `newsletter-form`, `cv-download-button`, `cv-download-modal`,
`cookie-consent`, `compact-contact-section`, `turnstile`, `cal-booking`.

Infrastructure: `providers`, `theme-provider`, `motion-preferences-provider`,
`json-ld`, `dynamic-imports`, `src/components/analytics/` (GA4 + Clarity),
`src/components/ui/` (16 remaining primitives: `badge`, `button`, `card`,
`consent-check`, `country-select`, `dialog`, `input`, `label`, `phone-field`,
`section`, `select`, `sonner`, `stat-tiles`, `surface-card`, `tabs`,
`textarea`).

Reference pages: `src/app/blog/page.tsx` is the clearest hero (eyebrow,
`clamp()` heading, lead paragraph); `src/app/sobre-mi/page.tsx` shows the
two-column variant.
