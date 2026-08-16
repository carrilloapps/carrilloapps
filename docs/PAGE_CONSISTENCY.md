# Page Consistency Guide

The shared page shell, the hero components, the design tokens and the
accessibility floor. Constitution Principle II — "the shared shell is the
product" — is enforced here.

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
import { PageHero } from "@/components/page-hero"

function PageContent() {
  const { isLoading } = usePageLoading()

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="relative min-h-screen overflow-hidden text-white">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container space-y-24 py-12" id="main-content">
          <PageHero
            badge={{ text: "Page Name" }}
            title="Main Title"
            description="Page description."
          />

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
- [ ] Container: `relative min-h-screen overflow-hidden text-white`
- [ ] `PageHero` or `PageHeroSplit` — never a hand-rolled hero
- [ ] `main` uses `container py-12 space-y-24` and keeps `id="main-content"`
- [ ] First section after hero uses `pt-6 pb-12`
- [ ] Sections animate with `whileInView` + the standard variants
- [ ] No visual breadcrumbs — JSON-LD only, in `layout.tsx`
- [ ] Analytics tracking on every interactive element
- [ ] Touch targets ≥ 48×48px

---

## 2. Hero components

### PageHero — centered, the default

`src/components/page-hero.tsx`

```tsx
<PageHero
  badge={{ text: "Available for new projects", icon: Mail }}
  title="Let's Talk"
  description="Do you have a project in mind?"
>
  {/* optional children, rendered after an h-6 spacer */}
</PageHero>
```

```typescript
interface PageHeroProps {
  badge: {
    text: string
    icon?: LucideIcon
    gradientFrom?: string // default "from-emerald-600/20"
    gradientTo?: string // default "to-teal-600/20"
    borderColor?: string // default "border-emerald-500/30"
    textColor?: string // default "text-emerald-400"
    shadowColor?: string // default "shadow-emerald-600/10"
  }
  title: string
  description: string
  children?: React.ReactNode
}
```

Spacing: section `py-8 md:py-16`, internal `space-y-6`, `h-6` spacer before
children.

### PageHeroSplit — content left, visual right

`src/components/page-hero-split.tsx`

```typescript
interface PageHeroSplitProps {
  badge: {/* same shape as PageHero */}
  title: string | ReactNode // ReactNode enables partial gradients
  subtitle?: string
  description: string | ReactNode
  image?: {
    src: string
    alt: string
    width?: number // default 600
    height?: number // default 600
    priority?: boolean // default true
  }
  rightContent?: ReactNode // alternative to `image` (icons, stats)
  actions?: ReactNode // buttons under the description
  additionalContent?: ReactNode
}
```

- Desktop: 2-column grid, `gap-12`, content left / visual right.
- Mobile: visual first, then content.
- Alignment is always `items-start`; badge margin `mt-4 md:mt-28`.
- Images get `absolute inset-0 object-cover w-full h-full`, `rounded-2xl`,
  `border border-zinc-800/50`, gradient overlays, glassmorphism.
- Section padding `py-12 md:py-0`.

A title built from `ReactNode` is how partial gradients are done:

```tsx
title={
  <>
    <span className="text-white">Soluciones tecnológicas </span>
    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
      de alto impacto
    </span>
  </>
}
```

---

## 3. DynamicBackground

`src/components/dynamic-background.tsx` — required on every page.

- Four animated gradient orbs — blue top-left, purple bottom-right, cyan-blue
  center at 2s delay, purple-pink bottom-center at 0.5s delay. Layer `-z-50`.
- Radial overlay `zinc-900/30 → zinc-950/60 → black`. Layer `-z-40`.
- Animated 50×50px grid, `rgba(59,130,246,0.1)`,
  `gridMove 20s linear infinite` (keyframes in `src/app/globals.css`). Layer `-z-30`.

Why it is built this way: CSS animations are GPU-accelerated, `fixed`
positioning avoids re-render on scroll, low opacity keeps content readable, and
`blur-3xl` is cheaper than a larger blur radius.

Do not stack extra gradient overlays on top — this component owns the
background. The old `ParticleHeroBackground` and its manual
`bg-gradient-to-br` overlay are gone; if you find that pattern in old code,
replace the whole block with `<DynamicBackground />`.

---

## 4. Design tokens

### Colors

| Element             | Value                                   |
| ------------------- | --------------------------------------- |
| Hero badge gradient | `from-emerald-600/20 to-teal-600/20`    |
| Hero badge border   | `border-emerald-500/30`                 |
| Hero badge text     | `text-emerald-400`                      |
| Hero badge shadow   | `shadow-emerald-600/10`                 |
| Main title          | `from-white via-blue-100 to-purple-200` |
| Section titles      | `from-white via-blue-100 to-blue-300`   |

**Why emerald badges?** Active nav items use blue/purple. A blue or purple badge
reads as navigation.

### Spacing

| Element                     | Value                     |
| --------------------------- | ------------------------- |
| Main container              | `py-12 space-y-24`        |
| Hero section                | `py-8 md:py-16 space-y-6` |
| Regular sections            | `py-12 space-y-8`         |
| First section after hero    | `pt-6 pb-12 space-y-8`    |
| Spacer before hero children | `h-6`                     |

### Typography

- Hero title: `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter`
- Hero description: `text-xl text-zinc-400 max-w-2xl mx-auto`
- Section titles: `text-2xl md:text-3xl font-bold`

### Motion

Copy these variants; do not invent new ones.

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
:focus-visible {
  outline: 1px solid var(--ledger-stamp-text);
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

## 5. Accessibility floor

Constitution Principle III. These are gates, not polish.

- Touch targets ≥ 48×48px — `min-h-[48px]` + `touch-manipulation`.
- Body text no lighter than `text-zinc-300`. Avoid `zinc-400`/`zinc-500` for
  primary text.
- Form inputs: `htmlFor` on `<label>` paired with `id` on the input;
  `aria-label` on every `SelectTrigger`.
- **Never** put `role="listitem"` on `<a>`, `<button>`, `<Card>` or `<Badge>` —
  it breaks assistive-tech semantics.
- Keep `src/components/skip-link.tsx` working: `main` must keep `id="main-content"`.
- Every interactive element reachable by keyboard with a visible focus state.
- Contrast 4.5:1 minimum.

Testing tools and the pre-merge bar are in [DEVELOPMENT.md](DEVELOPMENT.md).

---

## 6. Component inventory

Layout and chrome: `site-header`, `site-footer`, `skip-link`, `scroll-to-top`,
`section-divider`, `section-header`.

Page-level: `page-hero`, `page-hero-split`, `dynamic-background`,
`unified-loading`, `page-loading-context`, `global-page-loader`.

Content: `featured-projects`, `featured-repositories`, `repositories-list`,
`latest-posts-section`, `open-source-section`, `stats-section`,
`skills-horizontal-section`, `service-globe`, `project-dialog`.

Interaction: `newsletter-form`, `cv-download-modal`, `cookie-consent`,
`social-share-dialog`, `social-share-buttons`, `compact-contact-section`.

Infrastructure: `providers`, `theme-provider`, `motion-preferences-provider`,
`json-ld`, `dynamic-imports`, `src/components/analytics/` (GA4 + Clarity),
`src/components/ui/` (48 shadcn/Radix primitives).

Reference pages: `src/app/sobre-mi/page.tsx` uses `PageHeroSplit`;
`src/app/recursos/page.tsx` and `src/app/contacto/page.tsx` use `PageHero`.
