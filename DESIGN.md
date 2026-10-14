# DESIGN.md — the settlement ledger

The design system of carrillo.app. Tokens, geometry, elevation, motion and the
rules that decide which of them a given element is allowed to use.

This file is the **single source for the visual system**. Page composition —
the shell, the heroes, section spacing, the accessibility gate — lives in
[`docs/PAGE_CONSISTENCY.md`](docs/PAGE_CONSISTENCY.md), which points here for
anything about colour, corner or depth rather than restating it. Migration
progress lives in [`docs/DESIGN_STATUS.md`](docs/DESIGN_STATUS.md).

Everything here is implemented in `src/app/globals.css`. The CSS is the
artifact; this document is why it looks like that.

---

## 1. The idea

The site is a settlement ledger: an ink ground, inverted paper for type,
hairline rules for structure, and one validation stamp. It is a world borrowed
from the thing the work is actually about — payment systems, reconciliation,
money that has to arrive — rather than from the dark-tech template that every
other engineering portfolio is built from.

Three consequences, and they are the whole system:

1. **The text field stays achromatic.** Copy is paper on ink. Colour is
   reserved for state, never for emphasis and never for decoration.
2. **Structure is drawn with rules, not with boxes.** A 1px hairline separates
   things. Boxing every element turns a page into a field of buttons.
3. **One loud thing per view.** The stamp is the single filled, saturated
   element on screen. A second one and neither is primary.

### What changed in _Graphite & Signal_

The first version of the ledger was near-neutral (`#0b0c0e` ground) and
strictly square. Two problems, both of which this revision fixes:

- A flat near-black reads as absence rather than as a material, and it forced
  every hairline up into grey to stay visible. The grounds now carry a measured
  blue cast — every ink step sits around 213° hue at 29–33% saturation — so a
  rule at 20% lightness holds its own.
- Square everywhere was a deliberate stamp reading that also made every surface
  look like a spreadsheet cell. Objects now get a corner; rules stay straight.

---

## 2. Colour

Hex is the source of truth, in `:root` in `src/app/globals.css`. Pantone
references are the print anchors for the three signal colours.

### Grounds — four steps, and nothing skips one

| Token                  | Hex       | Pantone   | Use                               |
| ---------------------- | --------- | --------- | --------------------------------- |
| `--ledger-ink`         | `#101820` | Black 6 C | The page itself                   |
| `--ledger-ink-raised`  | `#17202b` | —         | Plates: `.surface-card`, `<Card>` |
| `--ledger-ink-overlay` | `#1b2534` | —         | Dialogs, popovers, menus          |
| `--ledger-field`       | `#1c2633` | —         | Inputs, chips inside a plate      |
| `--ledger-field-focus` | `#233040` | —         | A field while it is being edited  |

Tailwind: `bg-ink`, `bg-ink-raised`, `bg-ink-overlay`, `bg-field`,
`bg-field-focus`.

The step **is** the elevation. A thing one level up from its parent moves one
token up. A chip inside a plate is `field`, not another `ink-raised` — at the
same value it disappears into its own parent.

### Paper — type, three weights

| Token                  | Hex       | On ink  | Use                              |
| ---------------------- | --------- | ------- | -------------------------------- |
| `--ledger-paper`       | `#d9d9d6` | 12.65:1 | Headings, primary copy, figures  |
| `--ledger-paper-dim`   | `#a7adb5` | 7.91:1  | Body copy, descriptions          |
| `--ledger-paper-faint` | `#8d959f` | 5.91:1  | Labels, metadata, column headers |

Tailwind: `text-paper`, `text-paper-dim`, `text-paper-faint`.

All three clear 4.5:1 on every ground in the table above, so there is no
combination of surface and weight that fails. `paper-faint` is the floor —
nothing lighter exists, which is what keeps Principle III from being a thing
anyone has to remember.

### Rules — structure, never type

| Token                  | Hex       | Use                                    |
| ---------------------- | --------- | -------------------------------------- |
| `--ledger-rule`        | `#29323d` | The default hairline, every border     |
| `--ledger-rule-strong` | `#3b4654` | A hairline under the pointer, dividers |

Tailwind: `border-rule`, `border-rule-strong`, `bg-rule`.

These are 1.38:1 and 1.87:1 against ink. They are decorative by definition:
**never put type in a rule colour.**

### Signal — three, and three is the ceiling

| Token                 | Hex       | Pantone | On ink | Means                           |
| --------------------- | --------- | ------- | ------ | ------------------------------- |
| `--ledger-stamp`      | `#ff4f42` | 2035 C  | 5.50:1 | The one action; validation      |
| `--ledger-stamp-text` | `#ff7a6e` | —       | 7.04:1 | That action, hovered or focused |
| `--ledger-stamp-dim`  | `#8c2a22` | —       | —      | A stamp already used            |
| `--ledger-support`    | `#3bc9db` | 3252 C  | 9.00:1 | Information, a link that leaves |
| `--ledger-settled`    | `#00b188` | 2255 C  | 6.51:1 | Reconciled, shipped, done       |

Tailwind: `text-stamp`, `text-stamp-text`, `bg-stamp`, `text-support`,
`text-settled`, and the `/NN` alpha forms (`bg-support/10`,
`border-stamp/35`).

**A filled stamp prints ink, not paper.** Paper on `#ff4f42` is 2.30:1 —
Pantone 2035 is too luminous to carry light type. `.cta-stamp`,
`<Badge variant="default">` and the skip link all set `text-ink`. This is the
single rule most likely to be got wrong by habit.

A fourth signal colour is not an extension of this system, it is the end of it.

### The one sanctioned exception

`getLanguageColor()` in `featured-projects.tsx` and `featured-repositories.tsx`
keeps GitHub's language hues, and the GitHub/GitLab source badge keeps purple
and orange. Those are **data**: the dot is how a reader identifies a language,
and collapsing six languages onto three signals would delete the information
rather than unify it. They are quarantined to 8px dots and one badge — never a
surface, never type, never a border. Both call sites carry a comment saying so.

---

## 3. Geometry

```text
--radius-xs    2px   hairline chips
--radius-sm    4px   badges, marks, tags
--radius-md    8px   buttons, inputs, icon tiles
--radius-lg   12px   plates — surface-card, Card   (= --radius)
--radius-xl   16px   overlays, figures
--radius-2xl  24px   full-bleed imagery
```

Tailwind: `rounded-sm` … `rounded-2xl`, resolved from these.

**Rules never get a corner.** A hairline is a straight line across a column; a
radius on it is a box, and boxes are what this design avoids. `rounded-full`
stays legitimate for dots, avatars and pills — things that are round because of
what they are.

---

## 4. Elevation

Depth on an ink ground cannot come from a black shadow alone: black on
near-black is invisible. Each step pairs a cast shadow with a 1px inset
highlight on the top edge — the object occludes light below and catches it
above. That pair is what reads as a plate rather than as a lighter rectangle.

| Token                 | Utility           | Use                                     |
| --------------------- | ----------------- | --------------------------------------- |
| `--elevation-1`       | `shadow-raised`   | Chips, `<Card>`, resting controls       |
| `--elevation-2`       | `shadow-plate`    | `.surface-card` at rest                 |
| `--elevation-3`       | `shadow-floating` | A plate under the pointer; active tiles |
| `--elevation-overlay` | `shadow-overlay`  | Dialogs, popovers, menus                |
| `--elevation-stamp`   | `shadow-stamp`    | The stamp lifting on hover              |

A plate answers the pointer with three things at once: the rule strengthens,
the shadow promotes one step, the plate rises 2px. **Nothing changes hue** —
colour means state, and "the pointer is here" is not a state.

### Elevation is not a ring

Every layer above carries blur and offset. None uses the `0 0 0 Npx` spread
form, which is a focus ring regardless of what it is called, and focus on this
site is an outline. The check still holds:

```bash
grep -rE "\bring-|ring-offset" src --include="*.tsx"   # no matches
grep -rnE "0 0 0 [0-9]+px" src --include="*.css"        # no focus rings
```

---

## 5. Surfaces

| Class                  | Ground        | Corner | Shadow    | Lifts |
| ---------------------- | ------------- | ------ | --------- | ----- |
| `.surface-card`        | `ink-raised`  | 12px   | `plate`   | yes   |
| `.surface-card-subtle` | `field`       | 8px    | `raised`  | no    |
| `.surface-overlay`     | `ink-overlay` | 16px   | `overlay` | no    |

`.surface-card-subtle` never lifts: two things rising under one pointer is one
thing too many. Use it for chips and rows _inside_ a plate.

---

## 6. Actions

| Class        | Shape                                     | Use                             |
| ------------ | ----------------------------------------- | ------------------------------- |
| `.cta-stamp` | Filled stamp, ink label, 8px corner, 44px | The one action per view         |
| `.cta`       | Sans label over a 2px stamp rule, 48px    | The action a section exists for |
| `.cta-quiet` | Mono uppercase over a 1px rule, 48px      | Every secondary path            |

`.cta-quiet` requires an icon — `ArrowUpRight` to navigate, `Download` for a
file, `CalendarDays` to book. The icon is the affordance, not decoration; a
`.cta-quiet` without one is incomplete.

Never ship an action as plain text with only a colour change. All three states
state their hover, focus and disabled.

---

## 7. Type

One sans (Archivo) and one mono, both wired in `@theme`. Figures are always
tabular — `font-variant-numeric: tabular-nums` is applied in the base layer to
`.font-mono`, anything matching `[class*="tabular"]`, and every `table`, so
columns align down the page regardless of which digits land in them.

The page-level heading pattern, shared by the writing index and both heroes:

```text
font-sans text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.96]
font-semibold tracking-[-0.04em] text-balance text-paper
```

Solid paper, one weight, negative tracking that tightens as the size grows.
**No gradient-clipped headings.** A `bg-clip-text` title is the loudest thing a
page can do and it put three hues into a field this design keeps achromatic.

Column labels and metadata take the mono register: `font-mono text-[11px]
tracking-[0.14em] uppercase text-paper-faint`.

---

## 8. Motion

Variants live in `src/lib/motion.ts`; copy them, do not invent new ones.

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

State transitions are 150ms (controls) or 200ms (surfaces), `ease`. Anything
that moves a reader — the plate lift, the stamp lift, smooth scrolling — is
removed under `prefers-reduced-motion: reduce`; the colour and shadow halves of
the same hover still fire, so the affordance survives.

---

## 9. Focus

One treatment, themed once, and it is an outline:

```css
html :focus-visible {
  outline: 2px solid var(--ledger-stamp-text);
  outline-offset: 3px;
}
```

Fields are the exception: an offset outline around a field reads as a second
border floating off the one already drawn. A focused field raises its surface
to `--ledger-field-focus` and stamps its rule — both change together, so the
indicator survives a forced-colors mode that drops backgrounds.

Always `:focus-visible`, never bare `:focus`: `:focus` matches mouse clicks and
leaves a mark behind every button press.

---

## 10. The accessibility floor

Constitution Principle III, in the terms of this system:

- Body copy is `paper-dim` or heavier. `paper-faint` is the floor and it is for
  labels, not paragraphs.
- Touch targets ≥ 48×48px, plus `touch-manipulation`.
- A filled signal colour carries `text-ink`, never `text-paper`.
- Rules are decorative; type never takes a rule colour.
- `htmlFor`/`id` on every field; no `role="listitem"` on `<a>`, `<button>`,
  `<Card>` or `<Badge>`.

The contrast numbers quoted throughout this file are measured, not estimated,
and the measurement is reproducible — the ratios sit in a comment block at the
top of the palette in `src/app/globals.css`.

---

**Version**: 1.0.0 · **Palette**: Graphite & Signal · **Last updated**: 14 October 2026
