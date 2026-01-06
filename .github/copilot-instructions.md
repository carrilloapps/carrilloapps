# Copilot Instructions for CarrilloApps

## Project Overview
Personal portfolio website built with Next.js 16.1.1, React 19, TypeScript 5.9.3, and Tailwind CSS 3.4.19. Dark-themed design with strict accessibility requirements (WCAG 2.1 AA/AAA compliance).

## Critical Architecture Patterns

### Hero Components (Required for All Pages)
- **Use `PageHero`** for standard centered layouts (`components/page-hero.tsx`)
- **Use `PageHeroSplit`** for profile/about pages with images (`components/page-hero-split.tsx`)
- **Never** create custom hero sections - these components enforce design consistency
- Default badge colors: emerald/teal gradient (NOT blue/purple - reserved for active menu items)

### Standard Page Structure (Required)
```tsx
"use client";

import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { DynamicBackground } from "@/components/dynamic-background";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

function PageContent() {
  const { isLoading } = usePageLoading();
  
  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground /> {/* ALWAYS include - provides modern animated background */}
        <SiteHeader />
        <main className="relative z-10 container py-12 space-y-24">
          <PageHero badge={{ text: "Page Name" }} title="Title" description="Description" />
          {/* Page content */}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  );
}
```

## Accessibility Requirements (Non-Negotiable)

### Touch Targets (WCAG 2.1 AAA)
- **Minimum size**: 48x48px for all interactive elements (44x44px acceptable for secondary actions)
- **Always add**: `min-h-[48px]` + `touch-manipulation` to buttons/links
- **Spacing**: Minimum 16px gap between touch targets (use `gap-4` in mobile)

### Color Contrast (WCAG 2.1 AA - 4.5:1 minimum)
- **Text colors**: Use `text-zinc-300` or lighter (NOT `text-zinc-400`/`text-zinc-500`)
- **Interactive elements**: Maintain visible focus rings (`focus:ring-4 focus:ring-blue-500/50`)
- **Badges/secondary text**: Use `text-zinc-200` minimum for small text

### Form Accessibility
- **Always pair**: `htmlFor` in `<label>` with `id` in input
- **Add aria-label**: To all form controls for screen readers
- **SelectTrigger**: Must have `id` and `aria-label` (e.g., `aria-label="Select an option"`)

### ARIA and Semantic HTML
- **Never use** `role="listitem"` on `<a>`, `<button>`, `<Card>`, or `<Badge>` elements
- **Use semantic HTML**: `<li>` elements don't need `role="listitem"` (redundant)
- **Descriptive labels**: All interactive elements need clear `aria-label` attributes

## Component & Styling Conventions

### Tailwind Utility Patterns
- **Responsive design**: Mobile-first with `md:` and `lg:` breakpoints
- **Spacing between sections**: `space-y-24` on main container, `space-y-8` within sections
- **Card hover effects**: `group-hover:shadow-purple-500/20 group-hover:border-purple-500/30`
- **Button padding**: `py-3 px-8` for primary, `py-2 px-6` for secondary

### Animation Variants (Use Consistently)
```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
```

### Background Component (Required)
- **Always use** `<DynamicBackground />` - provides animated gradient orbs and grid
- **Never use** `ParticleHeroBackground` (deprecated)
- Container must have: `relative overflow-hidden` classes

## Package Management

### Versioning Strategy (Critical)
- **All packages** use `~` (tilde) for patch-level updates only
- **Example**: `"next": "~16.1.1"` allows 16.1.x but NOT 16.2.0
- **Reason**: Prevents breaking changes from minor/major updates

### Development Commands
```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm run lint         # ESLint check
```

## Data Flow & Integration Points

### Static Data
- **Project data**: `data/projects.ts` and `data/featured-projects.ts`
- **Blog posts**: Fetched via RSS from Medium (`lib/rss-service.ts`)
- **External APIs**: GitHub/GitLab repository data (`app/api/github-repositories/`)

### Environment Variables
- **Required**: Check `.env.example` for all required vars
- **Obfuscation**: Use `obfuscateEmail()` and `deobfuscateEmail()` from page components for security
- **Rate limiting**: Contact forms implement rate limiting (3 attempts per 60s)

## SEO & Metadata Patterns

### JSON-LD Structured Data
- **Breadcrumbs**: Only in `layout.tsx` files (NOT visual breadcrumbs in pages)
- **Component**: Use `<BreadcrumbJsonLd />` from `components/json-ld.tsx`
- **Never render**: Breadcrumb UI components in page content

### Page Metadata
- **Export metadata**: From page files for Next.js App Router
- **Include**: title, description, openGraph, twitter cards
- **Reference**: See `app/page-metadata.tsx` for pattern

## Common Pitfalls to Avoid

1. **Don't create custom hero sections** - use existing hero components
2. **Don't use visual breadcrumbs** - JSON-LD only for SEO
3. **Don't forget DynamicBackground** - required on all pages
4. **Don't use low-contrast colors** - minimum zinc-300 for text
5. **Don't skip touch target sizing** - always add min-h-[48px]
6. **Don't nest role="listitem"** - causes accessibility errors
7. **Don't forget PageLoadingProvider** - required for smooth page transitions

## Testing & Quality Assurance

### Accessibility Testing
- **Run Lighthouse**: Must pass WCAG 2.1 AA (aim for AAA)
- **Check contrast**: All text must meet 4.5:1 ratio minimum
- **Touch targets**: All interactive elements must be 48x48px minimum
- **Screen readers**: Test with NVDA/JAWS - all controls must announce correctly

### Build Validation
```bash
npm run build && npm run start  # Test production build locally
```

## Documentation References

- **Component patterns**: `AGENTS.md` (724 lines of detailed component usage)
- **Page consistency**: `docs/PAGE_CONSISTENCY.md`
- **Project overview**: `docs/PROJECT.md`
- **Development setup**: `docs/DEVELOPMENT.md`

## Questions for Clarification

When implementing new features, verify:
1. Which hero component variant is appropriate?
2. Are all touch targets 48x48px minimum?
3. Do all colors meet WCAG 2.1 AA contrast requirements?
4. Are forms properly labeled with htmlFor/id pairs?
5. Is DynamicBackground included in the page structure?
