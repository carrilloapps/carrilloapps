# Copilot Instructions for carrillo.app

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

## Next.js App Router Structure

### Route Organization
- **App directory**: All routes in `app/` folder using file-based routing
- **Page files**: `page.tsx` creates routes (e.g., `app/blog/page.tsx` → `/blog`)
- **Layout files**: `layout.tsx` wraps child routes with shared UI
- **Loading states**: `loading.tsx` provides automatic loading UI during navigation
- **Not found**: `not-found.tsx` handles 404 errors at route level

### Dynamic Routes
```
app/blog/[slug]/page.tsx    → /blog/any-slug
app/api/[...path]/route.ts  → /api/catch-all-segments
```

### Route Groups (Organizational)
- Use `(folder)` syntax to organize without affecting URL
- Example: `app/(marketing)/about/page.tsx` → `/about` (not `/marketing/about`)

### Metadata Pattern
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - José Carrillo',
  description: 'Page description for SEO',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: [{ url: '/og-image.jpg' }],
  },
};
```

## API Integration Patterns

### GitHub/GitLab Repository Data
- **Endpoints**: `app/api/github-repositories/route.ts`, `app/api/gitlab-repositories/route.ts`
- **Caching**: Uses Next.js `revalidate` for automatic cache invalidation
- **Error handling**: Always return structured JSON responses with status codes

### RSS Feed Integration (Medium Blog)
- **Service**: `lib/rss-service.ts` - fetches and parses RSS feeds
- **Client**: `lib/rss-client.ts` - wrapper for fetch with error handling
- **Usage**: Import from service, not direct fetch
```tsx
import { getBlogPosts } from '@/lib/rss-service';
const posts = await getBlogPosts();
```

### Rate Limiting Pattern
```tsx
const useRateLimit = (limit: number = 3, windowMs: number = 60000) => {
  const [attempts, setAttempts] = useState<number[]>([]);
  
  const isLimited = useCallback(() => {
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < windowMs);
    return recentAttempts.length >= limit;
  }, [attempts, limit, windowMs]);
  
  return { isLimited: isLimited(), recordAttempt };
};
```

### Security Patterns
- **Email obfuscation**: Use `obfuscateEmail()` / `deobfuscateEmail()` for client-side protection
- **Honeypot fields**: Add hidden fields to forms to catch bots
- **Time-based validation**: Track form submission time to prevent instant bot submissions

## Testing & Quality Standards

### Pre-Deployment Checklist
1. **Build succeeds**: `npm run build` completes without errors
2. **Lint passes**: `npm run lint` has no errors (warnings acceptable)
3. **Accessibility audit**: Lighthouse score ≥95 for accessibility
4. **Performance**: Lighthouse performance score ≥90
5. **SEO**: All pages have proper metadata and structured data

### Lighthouse Testing (Required Before Merge)
```bash
# Run production build
npm run build
npm run start

# Open http://localhost:3000
# Run Lighthouse in Chrome DevTools (Ctrl+Shift+I → Lighthouse tab)
# Test both mobile and desktop
```

### Accessibility Testing Tools
- **Browser**: Chrome DevTools Accessibility panel
- **Extensions**: axe DevTools, WAVE
- **Screen reader**: NVDA (Windows) or VoiceOver (Mac)
- **Keyboard navigation**: Tab through entire page - all interactive elements must be reachable

### Manual Testing Scenarios
1. **Mobile devices**: Test on real devices when possible (iPhone, Android)
2. **Touch interactions**: All buttons/links respond to touch without delay
3. **Form validation**: Test all error states and edge cases
4. **Loading states**: Verify PageLoadingOverlay appears during navigation
5. **Error boundaries**: Test error pages and recovery flows

## Deployment Process (Vercel)

### Automatic Deployments
- **Production**: Push to `main` branch → auto-deploys to production
- **Preview**: Any PR or branch → creates preview deployment
- **Domain**: carrillo.app (configured in Vercel dashboard)

### Environment Variables (Vercel Dashboard)
1. Navigate to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development separately
3. Required variables listed in `.env.example`
4. Never commit `.env.local` or `.env` to repository

### Build Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]  // US East (fastest for target audience)
}
```

### Performance Optimization (Vercel)
- **Edge caching**: Automatic for static assets
- **Image optimization**: Next.js Image component uses Vercel's image CDN
- **Analytics**: Enable Vercel Analytics in dashboard for real-time metrics
- **Speed Insights**: Enable for Core Web Vitals monitoring

### Rollback Process
1. Go to Vercel dashboard → Deployments
2. Find working deployment
3. Click "..." → Promote to Production
4. Instant rollback (no build required)

### Post-Deployment Verification
1. Check production URL loads correctly
2. Test critical user flows (contact form, navigation, blog)
3. Verify analytics tracking is working
4. Check Vercel deployment logs for any warnings

## Documentation References

- **Component patterns**: `AGENTS.md` (724 lines of detailed component usage)
- **Page consistency**: `docs/PAGE_CONSISTENCY.md`
- **Project overview**: `docs/PROJECT.md`
- **Development setup**: `docs/DEVELOPMENT.md`

## Quick Troubleshooting

### Build Failures
- **TypeScript errors**: Run `npm run build` locally first
- **Missing dependencies**: Delete `node_modules` and `package-lock.json`, run `npm install`
- **Cache issues**: Delete `.next` folder and rebuild

### Runtime Errors
- **Hydration errors**: Check for client-only code in server components
- **Image optimization**: Verify images are in `public/` or use external URLs
- **API route errors**: Check Next.js API route conventions (must export named functions)

### Accessibility Issues
- **Low contrast**: Check all text colors against background (use Chrome DevTools)
- **Missing labels**: Every form input must have associated label with `htmlFor`
- **Focus indicators**: All interactive elements must have visible focus state

## Questions for Clarification

When implementing new features, verify:
1. Which hero component variant is appropriate?
2. Are all touch targets 48x48px minimum?
3. Do all colors meet WCAG 2.1 AA contrast requirements?
4. Are forms properly labeled with htmlFor/id pairs?
5. Is DynamicBackground included in the page structure?
6. Have you tested the page with Lighthouse before submitting?
7. Are all API responses properly typed with TypeScript?
