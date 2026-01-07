# Agent Guidelines for carrillo.app Project

This is the main agent configuration file for the CarrilloApps portfolio project. This document provides high-level guidelines and references to detailed documentation in subdirectories.

## Project Overview

**carrillo.app** is a personal portfolio and professional website built with Next.js 16, React 19, and TypeScript. The project follows a modern, dark-themed design with consistent UI patterns across all pages.

### Technology Stack

- **Framework**: Next.js 16.1.1 (Turbopack)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion 12.24.7
- **Component Library**: Radix UI primitives with custom shadcn/ui components
- **Deployment**: Vercel

### Package Versioning

**IMPORTANT**: All packages use `~` (tilde) versioning for patch-level updates only. This ensures stability and prevents breaking changes from minor/major version updates.

## Documentation Best Practices

### ⚠️ CRITICAL: Avoid Documentation Redundancy

**Before creating ANY new documentation file:**

1. **Check if documentation already exists:**
   - Search `docs/` directory for existing files
   - Check if the topic is already covered in `AGENTS.md` or subdirectory `AGENTS.md` files
   - Review `docs/README.md` for documentation index

2. **Update existing documentation instead of creating new files:**
   - ✅ Add new sections to existing relevant files
   - ✅ Consolidate related information in one place
   - ❌ DO NOT create separate "optimization" or "guide" files for topics already documented
   - ❌ DO NOT create summary files that duplicate existing content

3. **Documentation hierarchy:**
   - `docs/ANALYTICS.md` → ALL analytics (GA4, Clarity, tracking) + performance optimizations (cache, JS, LCP)
   - `docs/PERFORMANCE.md` → Performance benchmarks and detailed optimization strategies
   - `docs/DISQUS.md` → ALL blog comments integration
   - `docs/API.md` → ALL API documentation
   - `docs/DEVELOPMENT.md` → Development setup and workflow
   - `AGENTS.md` (root) → High-level project guidelines
   - `*/AGENTS.md` (subdirectories) → Specific directory patterns

4. **When to create a NEW file:**
   - ONLY when topic is completely new and doesn't fit existing files
   - ONLY when existing file would become too large (>1000 lines)
   - MUST update `docs/README.md` index

**Example of redundancy to AVOID:**
```
❌ BAD: Creating CACHE_OPTIMIZATION.md when docs/PERFORMANCE.md already has "Cache Strategy" section
✅ GOOD: Add cache optimization details to docs/PERFORMANCE.md
```

## Directory Structure

```
├── app/                    # Next.js App Router pages and layouts
│   └── AGENTS.md          # Page structure and routing guidelines
├── components/            # React components
│   ├── analytics/         # Analytics integrations (GA4, Clarity)
│   ├── ui/                # shadcn/ui components
│   └── AGENTS.md          # Component usage and patterns
├── lib/                   # Utility functions and services
│   ├── analytics.ts       # Analytics tracking library (25+ functions)
│   ├── rss-service.ts     # Medium RSS integration
│   └── AGENTS.md          # Library utilities and services
├── data/                  # Static data and configuration
│   ├── projects.ts        # Project data
│   ├── featured-projects.ts # Featured projects
│   └── AGENTS.md          # Data structure and management
├── hooks/                 # Custom React hooks
│   ├── use-disqus-comments.tsx # Disqus integration hook
│   └── AGENTS.md          # Hook usage patterns
├── types/                 # TypeScript type definitions
│   └── AGENTS.md          # Type conventions
└── docs/                  # Project documentation (11 consolidated files)
    ├── README.md          # Documentation index
    ├── ANALYTICS.md       # GA4 + Clarity integration guide
    ├── DISQUS.md          # Blog comments integration
    ├── PERFORMANCE.md     # Performance optimizations
    └── ...                # API, GitHub, Vercel, etc.

```

## Quick Start Guide

### Creating New Pages

All pages must follow the standard structure defined in [app/AGENTS.md](app/AGENTS.md):

1. Use `PageLoadingProvider` and `PageLoadingOverlay`
2. Include `DynamicBackground` component
3. Use `PageHero` or `PageHeroSplit` for hero sections
4. Follow consistent spacing: `space-y-24` between sections
5. Implement scroll animations with standard variants

### Using Components

Component guidelines are detailed in [components/AGENTS.md](components/AGENTS.md):

- **Hero Components**: `PageHero` (centered) and `PageHeroSplit` (split layout)
- **Background**: `DynamicBackground` (used in ALL pages)
- **Loading States**: Unified loading components
- **UI Components**: shadcn/ui + Radix UI primitives

### Working with Data

Data management patterns are in [data/AGENTS.md](data/AGENTS.md):

- Project data structure
- Featured projects configuration
- Static data management

### Utility Functions

Library utilities are documented in [lib/AGENTS.md](lib/AGENTS.md):

- RSS feed services (Medium integration)
- Environment variable handling
- Utility functions

### Analytics Tracking

Comprehensive analytics integration detailed in [docs/ANALYTICS.md](docs/ANALYTICS.md):

- **Google Analytics 4**: Page views, events, conversions
- **Microsoft Clarity**: Session recordings, heatmaps
- **Tracking Library**: 25+ pre-built tracking functions (`lib/analytics.ts`)
- **Full Coverage**: Header, footer, forms, blog, all interactions tracked

### Performance Optimization

Performance guidelines documented in [docs/PERFORMANCE.md](docs/PERFORMANCE.md):

- **LCP Optimization**: Font preloading, CSS MIME type fixes
- **Forced Reflow Elimination**: requestAnimationFrame patterns
- **CSS Optimization**: Critical CSS preloading, deferred loading
- **Cache Headers**: Vercel + CDN configuration
- **Target**: Lighthouse score 95+/100, LCP < 2.5s

## Mandatory Code Quality Standards

### ESLint Compliance (Required Before Commit)

**⚠️ CRITICAL: All code changes MUST pass lint with 0 errors and 0 warnings**

Before committing any changes, ALWAYS run:

```bash
npm run lint
```

The command must complete clean: **0 errors, 0 warnings**

#### Verification Process

1. **Run lint**: `npm run lint`
2. **Review errors**: Read each message carefully
3. **Fix systematically**: Solve issues one by one
4. **Verify again**: Re-run until clean
5. **Local build**: `npm run build` must complete without errors

#### Non-Negotiable Rules

- ✅ **0 ESLint errors** (no exceptions)
- ✅ **0 ESLint warnings** (no exceptions)
- ✅ **Successful build** without compilation errors
- ✅ **TypeScript without errors**
- ✅ **No unused imports**
- ✅ **No unused variables**
- ✅ **No `any` types** (use specific types or `unknown`)

**Commits that don't meet these requirements will be rejected.**

### Performance Standards

#### Largest Contentful Paint (LCP)

**Target**: < 2.5 seconds (Good), < 4.0 seconds (Needs Improvement)

All elements contributing to LCP must be optimized:

1. **Above-the-Fold Images**:
   - Use `priority={true}` on Next.js Image for critical images
   - Use `fetchPriority="high"` on hero images
   - Avoid heavy CSS filters (`contrast`, `brightness`) on LCP images
   - Consider local images in `/public` instead of external URLs

2. **Eliminate Rendering Delays**:
   - Minimize blocking JavaScript before first render
   - Use `loading="eager"` for critical content
   - Avoid animations on LCP elements during initial load
   - Reduce `transition` and `animation` delays in hero

3. **Resource Optimization**:
   - Preload critical resources with `<link rel="preload">`
   - Use Next.js Image for automatic optimization
   - Compress images (WebP/AVIF when possible)

**Note**: If Lighthouse shows "Element rendering delay" > 1000ms, investigate:
- Framer Motion animations delaying visibility
- CSS effects blocking render (blur, backdrop-filter)
- JavaScript blocking component mounting

## Design Conventions

### Colors and Gradients

#### Hero Badge (Default)
- Gradient: `from-emerald-600/20 to-teal-600/20`
- Border: `border-emerald-500/30`
- Text: `text-emerald-400`
- Shadow: `shadow-emerald-600/10`

**Why green?** Active menu items use blue/purple, so green badges provide better visual contrast.

#### Title Gradients
- Main title: `from-white via-blue-100 to-purple-200`
- Section titles: `from-white via-blue-100 to-blue-300`

### Spacing Standards

- Between main sections: `space-y-24`
- Hero section padding: `py-8 md:py-16`
- Regular sections: `py-12 space-y-8`
- First section after hero: `pt-6 pb-12` (reduced top padding)

### Typography

- Hero title: `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter`
- Hero description: `text-xl text-zinc-400 max-w-2xl mx-auto`
- Section titles: `text-2xl md:text-3xl font-bold`

## Animation Patterns

Standard animation variants used throughout the project:

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
```

## Important Rules

### 1. No Visual Breadcrumbs
**DO NOT** include visual breadcrumbs in UI. Only use JSON-LD in layout files for SEO.

### 2. Always Use Standard Components
- Use `PageHero` or `PageHeroSplit` for hero sections
- Use `DynamicBackground` for page backgrounds (NOT `ParticleHeroBackground`)
- Use unified loading components

### 3. Consistent Animations
All pages must use standard animation variants for uniform experience.

### 4. Loading System
Always use `PageLoadingProvider` for smooth page transitions.

## Detailed Documentation

### Code Organization (AGENTS.md files)
- **Pages**: [app/AGENTS.md](app/AGENTS.md) - Page structure, routing, and patterns
- **Components**: [components/AGENTS.md](components/AGENTS.md) - Component usage and props
- **Library**: [lib/AGENTS.md](lib/AGENTS.md) - Utilities and services
- **Data**: [data/AGENTS.md](data/AGENTS.md) - Data structures
- **Hooks**: [hooks/AGENTS.md](hooks/AGENTS.md) - Custom hooks
- **Types**: [types/AGENTS.md](types/AGENTS.md) - TypeScript types

### Project Documentation (docs/)
- **[README.md](docs/README.md)** - Documentation index and quick start
- **[PROJECT.md](docs/PROJECT.md)** - Technology stack and features
- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Development setup and workflow
- **[ANALYTICS.md](docs/ANALYTICS.md)** - GA4 + Clarity integration (consolidated)
- **[DISQUS.md](docs/DISQUS.md)** - Blog comments integration (consolidated)
- **[PERFORMANCE.md](docs/PERFORMANCE.md)** - Performance optimizations (consolidated)
- **[API.md](docs/API.md)** - API endpoints documentation
- **[GITHUB.md](docs/GITHUB.md)** - Repository workflows
- **[VERCEL.md](docs/VERCEL.md)** - Deployment configuration
- **[TRANSLATION.md](docs/TRANSLATION.md)** - Localization guidelines
- **[PAGE_CONSISTENCY.md](docs/PAGE_CONSISTENCY.md)** - UI/UX standards

## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

### File Naming Conventions

- **Pages**: `page.tsx` (Next.js App Router convention)
- **Layouts**: `layout.tsx`
- **Components**: `kebab-case.tsx` (e.g., `page-hero.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `rss-service.ts`)
- **Types**: `kebab-case.ts` (e.g., `medium.ts`)

---

**Last Updated**: January 2026 - Based on Next.js 16.1.1, React 19, and current project standards

## Core Hero Components

The project has two hero component variants:

1. **`PageHero`** - Standard centered hero (default for most pages)
2. **`PageHeroSplit`** - Split layout hero with image on the right (for profile/about pages)

### PageHero - Standard Centered Hero

The `PageHero` component is the **standard hero section** for most pages. It provides consistent structure, animations, and styling.

#### Location
`components/page-hero.tsx`

### Default Badge Colors

**Badges use green (emerald/teal) by default** to differentiate from active menu items which use blue/purple:

- Gradient: `from-emerald-600/20 to-teal-600/20`
- Border: `border-emerald-500/30`
- Text: `text-emerald-400`
- Shadow: `shadow-emerald-600/10`

### Basic Usage

```tsx
import { PageHero } from "@/components/page-hero";

<PageHero
  badge={{ text: "Page Name" }}
  title="Main Title"
  description="Brief description of the page."
/>
```

### With Custom Colors

```tsx
<PageHero
  badge={{
    text: "Available for new projects",
    icon: Mail,
    gradientFrom: "from-emerald-600/20",
    gradientTo: "to-teal-600/20",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    shadowColor: "shadow-emerald-600/10",
  }}
  title="Let's Talk"
  description="Do you have a project in mind?"
/>
```

### With Additional Content

```tsx
<PageHero
  badge={{ text: "Blog" }}
  title="Insights & experiences"
  description="Articles about software development..."
>
  <Suspense fallback={<Loading />}>
    <FeaturedContent />
  </Suspense>
</PageHero>
```

### Props Interface

```typescript
interface PageHeroProps {
  badge: {
    text: string;                    // Required
    icon?: LucideIcon;               // Optional
    gradientFrom?: string;           // Default: "from-emerald-600/20"
    gradientTo?: string;             // Default: "to-teal-600/20"
    borderColor?: string;            // Default: "border-emerald-500/30"
    textColor?: string;               // Default: "text-emerald-400"
    shadowColor?: string;            // Default: "shadow-emerald-600/10"
  };
  title: string;                     // Required
  description: string;               // Required
  children?: React.ReactNode;        // Optional
}
```

### Spacing

- Section padding: `py-8 md:py-16`
- Internal spacing: `space-y-6`
- Spacer before children: `h-6` (only when children exist)

### PageHeroSplit - Split Layout Hero

The `PageHeroSplit` component is used for hero sections with a **split layout**: content on the left, image on the right. This is ideal for profile pages, about pages, or any page that needs to showcase an image alongside text content.

#### Location
`components/page-hero-split.tsx`

#### Default Badge Colors

Same as `PageHero` - green (emerald/teal) by default.

#### Basic Usage

```tsx
import { PageHeroSplit } from "@/components/page-hero-split";

<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  subtitle="My professional journey in development"
  description="Extended description text here..."
  image={{
    src: "/path/to/image.jpg",
    alt: "José Carrillo",
    width: 600,
    height: 600,
    priority: true,
  }}
/>
```

#### With Multiple Description Paragraphs

```tsx
<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  subtitle="My professional journey"
  description={
    <>
      <p className="text-zinc-400 leading-relaxed">
        First paragraph of description...
      </p>
      <p className="text-zinc-400 leading-relaxed">
        Second paragraph of description...
      </p>
    </>
  }
  image={{ src: "/image.jpg", alt: "Profile" }}
/>
```

#### With Action Buttons

```tsx
<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  description="Description text..."
  image={{ src: "/image.jpg", alt: "Profile" }}
  actions={
    <>
      <Button asChild>
        <Link href="/contact">Contact Me</Link>
      </Button>
      <Button variant="outline">Download CV</Button>
    </>
  }
/>
```

#### With Additional Content

```tsx
<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  description="Main description..."
  image={{ src: "/image.jpg", alt: "Profile" }}
  additionalContent={
    <div className="space-y-4">
      {/* Additional content like stats, links, etc. */}
    </div>
  }
/>
```

#### Props Interface

```typescript
interface PageHeroSplitProps {
  badge: {
    text: string;                    // Required
    icon?: LucideIcon;               // Optional
    gradientFrom?: string;           // Default: "from-emerald-600/20"
    gradientTo?: string;             // Default: "to-teal-600/20"
    borderColor?: string;            // Default: "border-emerald-500/30"
    textColor?: string;              // Default: "text-emerald-400"
    shadowColor?: string;            // Default: "shadow-emerald-600/10"
  };
  title: string;                     // Required
  subtitle?: string;                 // Optional subtitle below title
  description: string | ReactNode;   // Required - can be string or JSX
  image: {
    src: string;                     // Required
    alt: string;                     // Required
    width?: number;                  // Default: 600
    height?: number;                 // Default: 600
    priority?: boolean;              // Default: true
  };
  actions?: ReactNode;                // Optional - action buttons
  additionalContent?: ReactNode;      // Optional - additional content after description
}
```

#### Layout Behavior

- **Desktop**: Content on left, image on right (grid 2 columns)
- **Mobile**: Image appears first, then content (order changes)
- **Image**: Square aspect ratio with glassmorphism effects and hover scale

#### Spacing

- Section padding: `py-12 md:py-0`
- Grid gap: `gap-12`
- Internal spacing: `space-y-6`

## Standard Page Structure

All pages must follow this structure:

```tsx
"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DynamicBackground } from "@/components/dynamic-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { PageHero } from "@/components/page-hero";

function PageContent() {
  const { isLoading } = usePageLoading();

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground />
        
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{ text: "Page Name" }}
            title="Main Title"
            description="Page description."
          />

          {/* Additional sections */}
          <motion.section 
            className="py-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Section content */}
          </motion.section>
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

## Required Components

### 1. PageLoadingProvider and PageLoadingOverlay

All pages must use the consistent loading system:

```tsx
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";

function PageContent() {
  const { isLoading } = usePageLoading();
  
  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      {/* rest of content */}
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

### 2. DynamicBackground

**ALL pages MUST use the `DynamicBackground` component** to maintain visual consistency across the entire project. This component provides a modern, dynamic background with animated gradient orbs, radial overlays, and an animated grid pattern.

#### Location
`components/dynamic-background.tsx`

#### Usage

```tsx
import { DynamicBackground } from "@/components/dynamic-background";

<div className="min-h-screen text-white relative overflow-hidden">
  <DynamicBackground />
  {/* rest of content */}
</div>
```

#### Features

The `DynamicBackground` component includes:

1. **Animated Gradient Orbs**: Four gradient orbs with different colors and animation delays:
   - Blue orb (top-left): `bg-blue-500/20` with `animate-pulse`
   - Purple orb (bottom-right): `bg-purple-500/20` with 1s delay
   - Cyan-Blue gradient orb (center): `from-cyan-500/10 to-blue-500/10` with 2s delay
   - Purple-Pink gradient orb (bottom-center): `from-purple-500/15 to-pink-500/15` with 0.5s delay

2. **Radial Gradient Overlay**: Creates depth with a radial gradient from `zinc-900/30` via `zinc-950/60` to `black`

3. **Animated Grid Pattern**: A subtle animated grid pattern that moves continuously:
   - Grid size: `50px x 50px`
   - Color: `rgba(59, 130, 246, 0.1)` (blue with low opacity)
   - Animation: `gridMove 20s linear infinite` (defined in `globals.css`)

#### Important Notes

- **DO NOT** use `ParticleHeroBackground` - it has been replaced by `DynamicBackground`
- **DO NOT** add custom gradient overlays - `DynamicBackground` handles all background effects
- The component uses `fixed` positioning with negative z-index (`-z-50`, `-z-40`, `-z-30`) to stay behind all content
- Container must have `relative overflow-hidden` classes for proper positioning

## Animation Variants

For sections after the hero, use these consistent variants:

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
```

## Design Conventions

### Colors and Gradients

#### Hero Badge (Default)
- Gradient: `bg-gradient-to-r from-emerald-600/20 to-teal-600/20`
- Border: `border-emerald-500/30`
- Text: `text-emerald-400`
- Shadow: `shadow-lg shadow-emerald-600/10`

**Why green?** Active menu items use blue/purple, so green badges provide better visual contrast and avoid confusion with navigation.

#### Main Title
- Gradient: `bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent`

#### Section Titles
- Gradient: `bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent`

### Spacing

- Between main sections: `space-y-24`
- Main padding: `py-12`
- Hero section padding: `py-8 md:py-16`
- Section padding: `py-12`
- First section after hero: `pt-6 pb-12` (reduced top padding)

### Typography

- Hero title: `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter`
- Hero description: `text-xl text-zinc-400 max-w-2xl mx-auto`
- Section titles: `text-2xl md:text-3xl font-bold`

## Important Rules

### 1. No Visual Breadcrumbs

**DO NOT** include visual breadcrumbs in the UI. Breadcrumbs should only exist in JSON-LD structured data in layout files for SEO purposes.

```tsx
// ❌ DON'T do this in page.tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// ✅ DO this in layout.tsx
<BreadcrumbJsonLd
  items={[
    { name: "Home", url: "https://carrillo.app" },
    { name: "Page", url: "https://carrillo.app/page" },
  ]}
/>
```

### 2. Always Use PageHero

**DO NOT** create custom hero sections. Always use the `PageHero` component for consistency.

### 3. Consistent Animations

All pages must use the same animation variants for a uniform experience.

### 4. Dynamic Background

**ALWAYS** include `DynamicBackground` in all pages to maintain visual consistency. This component provides the modern, dynamic background with animated effects that is standard across the entire project.

### 5. Loading System

Always use `PageLoadingProvider` for smooth page transitions.

## Important Tools and Integrations

### Analytics Tracking (`lib/analytics.ts`)

**Core Functions** - Always use these for consistent tracking:
```typescript
import { 
  trackButtonClick,      // Button interactions
  trackNavigation,       // Navigation clicks  
  trackCTAClick,        // Call-to-action buttons
  trackFormStart,       // Form interaction start
  trackFormSubmit,      // Form submission
  trackSearch,          // Search queries
  trackBlogPostView,    // Blog post views
  trackProjectView,     // Project views
  trackScrollDepth,     // Scroll tracking
  trackSocialClick      // Social media clicks
} from '@/lib/analytics'
```

**Example Usage**:
```tsx
// Track button click
<button onClick={() => trackButtonClick('Download CV', 'hero')}>
  Download CV
</button>

// Track navigation
<Link href="/blog" onClick={() => trackNavigation('Blog', '/blog', 'header')}>
  Blog
</Link>

// Track form submission
const handleSubmit = async (data) => {
  trackFormStart('contact-form')
  try {
    await submitForm(data)
    trackFormSubmit('contact-form', true)
  } catch (error) {
    trackFormSubmit('contact-form', false)
  }
}
```

### Disqus Comments (`hooks/use-disqus-comments.tsx`)

**For Blog Posts**:
```tsx
import { useDisqusComments } from '@/hooks/use-disqus-comments'

const { count, isLoading, error } = useDisqusComments(articleSlug)
```

See [docs/DISQUS.md](docs/DISQUS.md) for complete setup guide.

### RSS Integration (`lib/rss-service.ts`)

**Fetch Medium Blog Posts**:
```tsx
import { getBlogPosts } from '@/lib/rss-service'

const posts = await getBlogPosts()
```

## Page Creation Checklist

When creating a new page, verify:

- [ ] Uses `PageLoadingProvider` and `PageLoadingOverlay`
- [ ] **Includes `DynamicBackground`** (NOT `ParticleHeroBackground`)
- [ ] Container has `min-h-screen text-white relative overflow-hidden` classes
- [ ] **Uses `PageHero` or `PageHeroSplit` component for hero section**
- [ ] Main has `space-y-24` between sections
- [ ] Additional sections use `whileInView`
- [ ] No visual breadcrumbs (only JSON-LD in layout)
- [ ] Badge, titles, and colors are consistent (handled by hero components)
- [ ] Spacing is consistent with other pages
- [ ] First section after hero uses `pt-6` instead of `py-12`
- [ ] **Analytics tracking added** for interactive elements
- [ ] **Performance optimized** (fonts preloaded, images optimized)

## File Structure

```
app/
  ├── page.tsx              # Home page
  ├── blog/
  │   ├── page.tsx          # Blog listing (uses PageHero)
  │   └── [slug]/
  │       └── page.tsx      # Blog post detail
  ├── recursos/
  │   └── page.tsx          # Resources page (uses PageHero)
  ├── contacto/
  │   └── page.tsx          # Contact page (uses PageHero)
  └── ...

components/
  ├── page-hero.tsx         # ⭐ Core hero component (centered)
  ├── page-hero-split.tsx   # ⭐ Split layout hero component
  ├── dynamic-background.tsx # ⭐ Modern dynamic background (used in ALL pages)
  ├── site-header.tsx
  ├── site-footer.tsx
  ├── page-loading-context.tsx
  └── ...

docs/
  └── PAGE_CONSISTENCY.md   # Detailed consistency guide
```

## Common Patterns

### Section with Scroll Animation

```tsx
<motion.section 
  className="py-12 space-y-8"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  <motion.div variants={itemVariants}>
    {/* Content */}
  </motion.div>
</motion.section>
```

### First Section After Hero

```tsx
<motion.section 
  className="pt-6 pb-12 space-y-8"  // Note: pt-6 instead of py-12
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  {/* Content */}
</motion.section>
```

## Reference Pages

Pages that correctly follow these standards:

### Using PageHero (Centered)
- `app/blog/page.tsx` - Blog page
- `app/recursos/page.tsx` - Resources page
- `app/contacto/page.tsx` - Contact page

### Using PageHeroSplit (Split Layout)
- `app/sobre-mi/page.tsx` - About page (profile with image)

## Dynamic Background System

### Overview

The `DynamicBackground` component is the **standard background system** for all pages in the project. It replaces the previous `ParticleHeroBackground` and provides a more modern, performant, and visually consistent experience.

### Technical Details

#### Z-Index Layers

The component uses three z-index layers to create depth:

1. **Layer -z-50**: Animated gradient orbs (base layer)
2. **Layer -z-40**: Radial gradient overlay (middle layer)
3. **Layer -z-30**: Animated grid pattern (top background layer)

#### CSS Animation

The grid pattern uses a custom animation defined in `globals.css`:

```css
@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}
```

#### Performance Considerations

- Uses CSS animations (GPU-accelerated) instead of JavaScript
- Fixed positioning prevents re-renders on scroll
- Low opacity values ensure minimal visual impact on content readability
- Blur effects are optimized with `blur-3xl` for performance

### Migration from ParticleHeroBackground

If you encounter old code using `ParticleHeroBackground`, replace it with:

```tsx
// ❌ OLD (deprecated)
import { ParticleHeroBackground } from "@/components/particle-hero-background";
<div className="min-h-screen bg-black text-white relative overflow-hidden">
  <ParticleHeroBackground />
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
  {/* content */}
</div>

// ✅ NEW (current standard)
import { DynamicBackground } from "@/components/dynamic-background";
<div className="min-h-screen text-white relative overflow-hidden">
  <DynamicBackground />
  {/* content */}
</div>
```

## Additional Resources

### Component Documentation
- **PageHero Component**: `components/page-hero.tsx`
- **PageHeroSplit Component**: `components/page-hero-split.tsx`
- **DynamicBackground Component**: `components/dynamic-background.tsx`
- **Analytics Components**: `components/analytics/`

### Project Documentation
- **UI/UX Standards**: [docs/PAGE_CONSISTENCY.md](docs/PAGE_CONSISTENCY.md)
- **Project Overview**: [docs/PROJECT.md](docs/PROJECT.md)
- **Performance Guide**: [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
- **Analytics Setup**: [docs/ANALYTICS.md](docs/ANALYTICS.md)
- **API Reference**: [docs/API.md](docs/API.md)

## Quick Reference

### PageHero Defaults Summary

| Property | Default Value |
|----------|---------------|
| `gradientFrom` | `"from-emerald-600/20"` |
| `gradientTo` | `"to-teal-600/20"` |
| `borderColor` | `"border-emerald-500/30"` |
| `textColor` | `"text-emerald-400"` |
| `shadowColor` | `"shadow-emerald-600/10"` |

### Spacing Summary

| Element | Spacing |
|---------|---------|
| Main container | `py-12 space-y-24` |
| Hero section | `py-8 md:py-16 space-y-6` |
| Regular sections | `py-12 space-y-8` |
| First section after hero | `pt-6 pb-12 space-y-8` |
| Spacer before children | `h-6` (only when children exist) |

## PageHeroSplit Advanced Features

### Title with Partial Gradients

The `title` prop can accept ReactNode to create titles with partial gradients:

```tsx
<PageHeroSplit
  badge={{ text: "Services" }}
  title={
    <>
      <span className="text-white">Soluciones</span>
      <br />
      <span className="text-white">tecnológicas </span>
      <span className="text-blue-400">de</span>
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
        alto impacto
      </span>
    </>
  }
  description="..."
/>
```

### Image vs RightContent

`PageHeroSplit` supports two modes:

1. **With Image**: Use the `image` prop for profile photos or images
2. **With Custom Content**: Use `rightContent` prop for icons, stats, or custom layouts

```tsx
// With image
<PageHeroSplit
  image={{
    src: "/profile.jpg",
    alt: "Profile",
    width: 600,
    height: 600,
    priority: true,
  }}
/>

// With custom content (icons, stats, etc.)
<PageHeroSplit
  rightContent={
    <div className="text-center">
      <Icon className="w-20 h-20" />
      <h3>15+ Años</h3>
      <p>de Experiencia</p>
    </div>
  }
/>
```

### Image Styling

When using the `image` prop, the image automatically receives:
- Full coverage: `absolute inset-0 object-cover w-full h-full`
- Rounded corners: `rounded-2xl`
- Border: `border border-zinc-800/50`
- Gradient overlays for depth
- Glassmorphism effects

### Alignment

- **Content alignment**: Always `items-start` (top-aligned) to ensure badges align consistently across pages
- **Badge margin**: Responsive top margin `mt-4 md:mt-28` for proper vertical positioning

---

## Mandatory Code Quality Standards

### ESLint Compliance (Required Before Commit)

**⚠️ CRÍTICO: Todo cambio de código DEBE pasar el lint sin errores ni warnings**

Antes de hacer commit de cualquier cambio, SIEMPRE ejecuta:

```bash
npm run lint
```

El comando debe completarse limpio: **0 errors, 0 warnings**

#### Proceso de Verificación

1. **Ejecuta el lint**: `npm run lint`
2. **Revisa errores**: Lee cuidadosamente cada mensaje
3. **Corrige sistemáticamente**: Soluciona uno por uno
4. **Verifica de nuevo**: Re-ejecuta hasta estar limpio
5. **Build local**: `npm run build` debe completarse sin errores

#### Reglas No Negociables

- ✅ **0 errores de ESLint** (ninguna excepción)
- ✅ **0 warnings de ESLint** (ninguna excepción)
- ✅ **Build exitoso** sin errores de compilación
- ✅ **TypeScript sin errores** de tipos
- ✅ **Sin importaciones no utilizadas** (unused imports)
- ✅ **Sin variables no utilizadas** (unused vars)
- ✅ **Sin tipos `any`** (usar tipos específicos o `unknown`)

**Commits que no cumplan estos requisitos serán rechazados.**

### Performance Standards

#### Largest Contentful Paint (LCP)

**Target**: < 2.5 segundos (Good), < 4.0 segundos (Needs Improvement)

Todos los elementos que contribuyen al LCP deben optimizarse:

1. **Imágenes Above-the-Fold**:
   - Usar `priority={true}` en Next.js Image para imágenes críticas
   - Usar `fetchPriority="high"` en imágenes del hero
   - Evitar filtros CSS pesados (`contrast`, `brightness`) en imágenes LCP
   - Considerar imágenes locales en `/public` en lugar de URLs externas

2. **Eliminar Retrasos de Renderización**:
   - Minimizar JavaScript bloqueante antes del primer render
   - Usar `loading="eager"` para contenido crítico
   - Evitar animaciones en elementos LCP durante la carga inicial
   - Reducir `transition` y `animation` delays en el hero

3. **Optimización de Recursos**:
   - Precargar recursos críticos con `<link rel="preload">`
   - Usar Next.js Image para optimización automática
   - Comprimir imágenes (WebP/AVIF cuando sea posible)

**Nota**: Si Lighthouse muestra "Retraso en la renderización del elemento" > 1000ms, investiga:
- Animaciones de Framer Motion que retrasan la visibilidad
- Efectos CSS que bloquean el render (blur, backdrop-filter)
- JavaScript que bloquea el montaje del componente

---

**Version**: 2.0.0  
**Last Updated**: January 7, 2026  
**Maintained by**: José Carrillo (junior@carrillo.app)

**Major Updates**:
- Documentation consolidated (17 → 11 files, 51KB reduction)
- Analytics integration complete (25+ tracking functions)
- Performance optimizations (LCP < 2.5s, score 95+/100)
- Updated references to consolidated docs (ANALYTICS.md, DISQUS.md, PERFORMANCE.md)

