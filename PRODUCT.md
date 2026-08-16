# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: the technical community.** Developers who arrive from a Substack post,
a GitHub repo, or a link shared in a dev community. They are reading — evaluating
whether this person writes things worth their attention and ships code worth
using. Their job on this site is to read something good, look at the source, and
decide whether to follow.

Secondary audiences exist and must keep a dignified path, but they do not shape
the home page hierarchy:

- **Prospective clients** (CTOs, founders) evaluating engagement — served by
  `/servicios`, `/agendamiento`, `/contacto`.
- **Recruiters** evaluating a senior profile — served by `/sobre-mi` and the CV
  download.

## Product Purpose

Personal site of José "Junior" Carrillo, Tech Leader and senior software
developer. It exists to publish his writing and open source work, and to make
the depth behind them verifiable. Success is a reader who stays, reads, and
subscribes.

## Positioning

Ten-plus years building payment systems and high-transaction financial
infrastructure in LATAM, with production numbers a generalist portfolio cannot
claim. The writing and the open source come from someone who has run these
systems at scale, not from someone summarizing them.

## Operating Context

- Content is published on Substack (`carrilloapps.substack.com`) and surfaced
  here through `/api/latest-posts` and `app/rss.xml`. There is no blog route on
  this site; the posts live upstream.
- Open source lives on GitHub (`carrilloapps`) and GitLab, surfaced through
  route handlers that proxy both APIs.
- Newsletter subscription runs through Mailchimp (`/api/newsletter`), and the
  form self-disables when credentials are absent.
- Readers arrive predominantly on mobile from social links.

## Capabilities and Constraints

- Spanish-first. Route slugs are Spanish and must not change: `servicios`,
  `sobre-mi`, `recursos`, `contacto`, `agendamiento`, `cookies`, `privacidad`,
  `terminos`. **All eight routes stay** — none may be removed or merged.
- Next.js App Router with Turbopack, React 19, Tailwind v4 CSS-first, deployed
  on Vercel. No backend database.
- Pages are `"use client"`; metadata and JSON-LD live in `layout.tsx`.
- Third-party APIs are never called from client components.
- The shared page shell (loading provider, background, header, hero, footer) is
  mandatory across routes.
- Featured open source, confirmed and real: `hfo` (TUI/CLI for GGUF models on
  Ollama), `zefer` (zero-knowledge browser encryption, PWA + CLI),
  `bcv-exchange-rate` (BCV/TRM/PTAX rates library and MCP server, ~700 npm
  downloads/month).

## Brand Commitments

- Name and identity: Junior Carrillo / carrillo.app. Contact `m@carrillo.app`.
- Social presence: GitHub, LinkedIn, X, Substack, all `carrilloapps`.
- **Binding visual constraint volunteered by the owner: dark, minimalist,
  highly professional.** Recorded as given; the visual world itself is decided
  in new-work, not here.

## Evidence on Hand

Real, publishable, attributable to the named companies:

- **Yummy (YC S21)** — Tech Leader, Financial Backoffice. Billing cycle cut from
  4 days to 15 minutes; 12M invoices per quarter. CQRS over 150M+ records with
  reports under 3s. AI agents. PCI-DSS.
- **Wompi (Bancolombia)** — Senior Full Stack. First Open Banking implementation
  in Colombia (Bre-B). 13M payers, 40K merchants, $50B COP/year processed.
- 10+ years of trajectory; 40% reliability improvement (currently on the home).
- Profile photograph at `public/profile.jpg` — available, **not** mandatory to
  keep in the redesign.
- Live post feed and live repository data, both fetched at runtime.

Absences that must not be fabricated: there are no testimonials, no client
logos beyond the employers named above, no pricing, and no case-study pages.

## Product Principles

1. **The writing and the code are the product.** Anything that delays a reader
   from reaching either is overhead.
2. **Proof over adjectives.** Named companies and real numbers instead of
   claims of seniority.
3. **Every audience keeps a path, only one gets the hierarchy.** Clients and
   recruiters must always find their route; they never outrank the reader.
4. **Real data or nothing.** Posts and repositories render from live sources;
   an empty state is honest, a placeholder is not.
5. **Spanish-first, permanently.** Slugs and copy are Spanish by default.

## Accessibility & Inclusion

Touch targets ≥ 48×48px, body text no lighter than `text-zinc-300`, labels bound
with `htmlFor`/`id`, visible keyboard focus, Lighthouse accessibility ≥ 95.
These are enforced as gates by the project constitution, not aspirations.
