# Design migration status — Graphite & Signal

Tracking for the move from the first ledger palette (near-neutral, square) to
**Graphite & Signal** (blue-cast grounds, Pantone signals, a radius scale and
an elevation scale).

The system itself is [`DESIGN.md`](../DESIGN.md). Page composition is
[`PAGE_CONSISTENCY.md`](PAGE_CONSISTENCY.md). This file is only the ledger of
what has moved and what has not — read it before starting design work so you
do not re-migrate something, or assume something is done that is not.

**Status**: complete. Colour, radius and elevation migrated; 57 unreachable
files deleted; `PageHero`/`PageHeroSplit` removed and Constitution Principle II
amended to v1.1.0 in the same change. Four items remain in §3, and none of them
is a defect: one deliberate keep, one sanctioned exception, one cleanup waiting
on call sites, and two Cloudflare settings outside this repository.

Last swept: 14 October 2026 · 9/9 gates in a clean container (lint 0/0,
strict TypeScript, prettier, markdownlint, 19 unit tests, build 42/42,
`npm audit` clean, MCP parity) · 5/5 e2e in a real browser

---

## 1. Done

### Tokens — `src/app/globals.css`

| Area                 | State | Note                                                         |
| -------------------- | :---: | ------------------------------------------------------------ |
| Ledger palette (hex) |  ✅   | 4 grounds, 3 papers, 2 rules, 3 signals + dim variants       |
| shadcn HSL contract  |  ✅   | `--primary`, `--card`, `--muted`… repointed at the ledger    |
| Radius scale         |  ✅   | 2 / 4 / 8 / 12 / 16 / 24px, `--radius` = 12px                |
| Elevation scale      |  ✅   | 5 steps + `shadow-raised/plate/floating/overlay/stamp`       |
| Surface classes      |  ✅   | `.surface-card`, `.surface-card-subtle`, `.surface-overlay`  |
| CTA classes          |  ✅   | `.cta-stamp` now prints `text-ink` (paper on stamp = 2.30:1) |
| Reduced motion       |  ✅   | Plate lift and stamp lift removed; colour/shadow still fire  |

### Components — 47 files migrated

- **Shell and chrome** — `site-header`, `skip-link`, `section-divider`,
  `stats-section`, `animated-section`
- **Heroes** — `page-hero`, `page-hero-split`; colour props replaced by a
  `tone` enum (read §3.1 before touching these)
- **Content** — `featured-projects`, `featured-repositories`,
  `skills-horizontal-section`, `service-globe`, `project-dialog`,
  `disqus-comments`, `legal/legal-document`, `dynamic-imports`
- **Contact and social** — `compact-contact-section`, `contact-social-section`,
  `social-link-card`, `social-share-buttons`, `social-share-dialog`
- **Primitives** (`src/components/ui/`) — `badge`, `card`, `input`, `textarea`,
  `select`, `pill`, `stat-tiles`, `media-card`, `skeleton`, `switch`, `tabs`,
  `country-select`, plus the floating overlays (`dialog`, `alert-dialog`,
  `drawer`, `sheet`, `popover`, `dropdown-menu`, `context-menu`, `menubar`,
  `tooltip`, `hover-card`, `navigation-menu`, `toast`, `command`) moved onto
  `shadow-overlay`
- **Data** — `src/lib/data/featured-projects.ts`; per-project accents mapped
  onto `support` / `settled` / `stamp`

### Sweeps that now come back clean

```bash
# No Tailwind palette colours outside the sanctioned exception
grep -rnE "\b(bg|text|border|from|via|to|shadow|ring)-(zinc|slate|blue|purple|emerald|teal|cyan|pink|indigo|amber|rose|green|orange)-[0-9]{2,3}" src --include="*.tsx" --include="*.ts"
#   → only getLanguageColor() maps + the GitHub/GitLab source badge

# No bare white/black surfaces
grep -rnE "\b(bg|border|text|from|via|to)-(white|black)(/\[?[0-9.]+\]?)?" src --include="*.tsx"
#   → only text-white on the two platform badges, which need it for contrast

# No rings, no hand-rolled focus shadows
grep -rE "\bring-|ring-offset" src --include="*.tsx"
grep -rnE "0 0 0 [0-9]+px" src --include="*.css"

# No ad-hoc shadows outside the elevation scale
grep -rhoE "shadow-(sm|md|lg|xl|2xl|\[[^]]*\])" src --include="*.tsx"
#   → only `drop-shadow-md` on the media-card title, which is a text shadow
```

Token coverage: **69 of 150** `.tsx` files reference a ledger token directly.
The remainder are logic, layout or icon components with no colour of their own —
that number is not meant to reach 150.

---

## 1b. Componentisation — 14 October 2026

The palette migration exposed how much markup was being written by hand. Three
components were extracted **from the pages that existed**, not designed ahead of
them, and the variants are the combinations that were already in use:

| Component    | Where                             | Replaced                     | Variants                                                                     |
| ------------ | --------------------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `<PageHero>` | `components/layout/page-hero.tsx` | 9 hand-written heroes        | `titleScale`, `titleWidth`, `asideWidth`, `eyebrowTone`, `topBar`, `actions` |
| `<Eyebrow>`  | `components/ui/eyebrow.tsx`       | 47 copies across 15 files    | `size`, `tracking`, `tone`, `numeric`                                        |
| `<SpecList>` | `components/ui/spec-list.tsx`     | 6 hand-written `<dl>` blocks | `variant`, `layout`, `numeric`                                               |

Seven pages now compose their hero; `/sobre-mi` deliberately does not, because
its two-row portrait grid shares no structure with the other nine. Forcing it
would mean props only one caller passes — which is exactly how the previous
`PageHero` ended up with zero importers.

32 components also moved out of a flat `src/components/` root into folders named
for what they do (`layout/`, `content/`, `forms/`, `feedback/`, `seo/`,
`brand/`, `providers/`), and the shared repository types moved to
`src/types/repository.ts` — `RepositoryDetails` had been declared twice, 25
identical lines, with a route handler importing its type from a `"use client"`
module. The inventory lives in
[`src/components/AGENTS.md`](../src/components/AGENTS.md), which was rewritten
in the same change: it had been listing thirty files that no longer existed.

---

## 2. The one sanctioned exception

`getLanguageColor()` in `featured-projects.tsx` and `featured-repositories.tsx`,
plus the GitHub/GitLab source badge. Those hues are data, not decoration;
collapsing them onto three signals would delete information. Both call sites
carry a comment saying so. **Do not migrate them**, and do not file them as
debt — they are a decision, not a leftover.

---

## 3. Open

### 3.1 One module left unreachable, on purpose

`src/lib/language-detector.ts` is not reached from any route, and it was the
only one of the 58 unreachable files kept on 14 October 2026. Two reasons to
leave it rather than delete it:

- It has real coverage — `tests/unit/language-detector.test.ts`, 10 assertions.
- It has its own page, [LANGUAGE_DETECTOR.md](LANGUAGE_DETECTOR.md).

Code someone wrote tests and documentation for is staged work, not a leftover.
Deleting it is the maintainer's call; if it goes, the test and the doc page go
with it in the same commit.

### 3.2 `text-white` on platform badges

Two occurrences, `featured-repositories.tsx`. White is correct there — it is the
readable value on GitHub purple and GitLab orange. Listed so the next sweep does
not treat it as a miss.

### 3.3 Legacy `Input` / `Textarea` variants

`default` (shadcn's 40px field) and `glass` are deprecated and only exist so old
call sites compile. Both were repointed at ledger tokens, so they are no longer
_wrong_ — merely redundant. Delete once no call site names them:

```bash
grep -rn 'variant="glass"\|variant="default"' src --include="*.tsx"
```

### 3.4 Two security items that live outside this repository

From the security assessment, both in Cloudflare rather than the code:

- HSTS is `max-age=15552000` (180 days) with a `preload` directive; the browser
  preload list requires a full year, so the domain does not qualify today.
- Cloudflare rewrites `X-Frame-Options` to `SAMEORIGIN` and `Referrer-Policy`
  to `same-origin`, overriding what the repository declares. The CSP's
  `frame-ancestors 'none'` still arrives and wins in current browsers, so
  framing stays blocked either way.

## 4. How to keep this file true

Update it in the same commit that changes the design, not afterwards. A status
file that lags the code is worse than no status file: it is the thing that made
`PAGE_CONSISTENCY.md` §4 describe an emerald palette months after the emerald
was gone.

Re-run the sweeps in §1 before marking anything done.
