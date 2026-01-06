# App Directory - Agent Guidelines

This directory contains all pages, layouts, and API routes for the CarrilloApps project using Next.js 16 App Router.

## Directory Structure

```
app/
├── page.tsx                  # Home page (root /)
├── layout.tsx                # Root layout (wraps all pages)
├── loading.tsx               # Global loading UI
├── not-found.tsx             # 404 page
├── manifest.ts               # PWA manifest generator
├── robots.ts                 # robots.txt generator
├── sitemap.ts                # sitemap.xml generator
├── viewport.ts               # Viewport configuration
├── globals.css               # Global styles
├── page-metadata.tsx         # Metadata utilities
├── agendamiento/             # Scheduling page
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── gracias/              # Thank you page after scheduling
├── api/                      # API routes
│   ├── github-repositories/
│   ├── gitlab-repositories/
│   └── repository-details/
├── blog/                     # Blog section
│   ├── page.tsx             # Blog listing
│   ├── layout.tsx
│   ├── loading.tsx
│   └── [slug]/              # Dynamic blog post routes
│       └── page.tsx
├── contacto/                 # Contact page
├── cookies/                  # Cookie policy
├── privacidad/               # Privacy policy
├── recursos/                 # Resources page
├── servicios/                # Services page
├── sobre-mi/                 # About page
└── terminos/                 # Terms of service
```

## Page Structure Standard

All pages in this directory MUST follow this structure:

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

## Required Elements

### 1. Client Component Directive
```tsx
"use client";
```
Most pages are client components due to:
- Framer Motion animations
- State management (loading, forms, etc.)
- Client-side interactivity

### 2. Page Loading System
```tsx
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";

// Use in component
const { isLoading } = usePageLoading();
<PageLoadingOverlay isVisible={isLoading} />

// Wrap page
export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  );
}
```

### 3. Background Component
```tsx
<DynamicBackground />
```
**REQUIRED** on all pages. Provides:
- Animated gradient orbs
- Radial gradient overlay
- Animated grid pattern

### 4. Layout Components
```tsx
<SiteHeader />  // Navigation and logo
<SiteFooter />  // Footer with links and info
```

### 5. Main Container Classes
```tsx
<div className="min-h-screen text-white relative overflow-hidden">
  {/* Container for full-page content with proper stacking */}
</div>

<main className="relative z-10 container py-12 space-y-24" id="main-content">
  {/* Main content area with consistent spacing */}
</main>
```

## Hero Component Selection

### Use PageHero (Standard Centered)
For most pages: blog, recursos, contacto, servicios

```tsx
<PageHero
  badge={{ text: "Blog" }}
  title="Insights & Experiences"
  description="Articles about software development..."
/>
```

### Use PageHeroSplit (Split Layout)
For pages with profile images: sobre-mi (about)

```tsx
<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  description="Extended description..."
  image={{
    src: "/profile.jpg",
    alt: "José Carrillo",
    width: 600,
    height: 600,
    priority: true,
  }}
/>
```

## Section Spacing

### Between Sections
Use `space-y-24` on main container for consistent spacing:
```tsx
<main className="relative z-10 container py-12 space-y-24">
```

### First Section After Hero
Reduce top padding to `pt-6` instead of `py-12`:
```tsx
<motion.section className="pt-6 pb-12 space-y-8">
```

### Regular Sections
Use `py-12 space-y-8`:
```tsx
<motion.section className="py-12 space-y-8">
```

## Animation Patterns

### Container Variants
```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
```

### Item Variants
```tsx
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
```

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

## Metadata Configuration

### Page Metadata
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: [{ url: "/og-image.jpg" }],
  },
};
```

### Layout Metadata
Defined in `layout.tsx` files for section-specific SEO:
```tsx
export const metadata: Metadata = {
  title: {
    default: "Default Title",
    template: "%s | José Carrillo",
  },
  // ... other metadata
};
```

## API Routes

Located in `app/api/` directory following Next.js 16 Route Handlers pattern.

### Structure
```tsx
// app/api/endpoint/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ data: "response" });
}

export async function POST(request: Request) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ data: "response" });
}
```

### Caching with unstable_cache
```tsx
import { unstable_cache } from "next/cache";

const getCachedData = unstable_cache(
  async () => {
    // Fetch data
    return data;
  },
  ['cache-key'],
  {
    revalidate: 3600, // 1 hour
    tags: ['data-tag']
  }
);
```

## Dynamic Routes

### Blog Posts
```
app/blog/[slug]/page.tsx
```

Dynamic segment `[slug]` creates routes like `/blog/my-post`.

### Generate Static Params
```tsx
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## Loading States

### Page-level Loading
```tsx
// loading.tsx
export default function Loading() {
  return <SpinnerLoading />;
}
```

### Suspense Boundaries
```tsx
<Suspense fallback={<BlogFeaturedLoading />}>
  <BlogFeatured />
</Suspense>
```

## Error Handling

### Not Found Page
```tsx
// not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
    </div>
  );
}
```

## Important Rules

### ❌ DO NOT
- Create custom hero sections (use `PageHero` or `PageHeroSplit`)
- Use `ParticleHeroBackground` (deprecated, use `DynamicBackground`)
- Include visual breadcrumbs in UI (only JSON-LD in layouts)
- Forget `PageLoadingProvider` wrapper
- Skip `DynamicBackground` component

### ✅ DO
- Follow standard page structure
- Use consistent spacing (`space-y-24` between sections)
- Implement scroll animations with standard variants
- Include proper metadata for SEO
- Use `Suspense` for data fetching components
- Add proper TypeScript types for props

## Examples

### Blog Page
Reference: `app/blog/page.tsx`
- Uses `PageHero`
- Includes `Suspense` for featured posts
- Implements pagination
- Handles search and filtering

### About Page
Reference: `app/sobre-mi/page.tsx`
- Uses `PageHeroSplit` with profile image
- Multiple sections with animations
- Skills and experience sections

### Resources Page
Reference: `app/recursos/page.tsx`
- Uses `PageHero`
- Tabs for GitHub/GitLab repositories
- Suspense for async data

## Testing Checklist

When creating/modifying pages:

- [ ] Page uses `PageLoadingProvider`
- [ ] `DynamicBackground` is included
- [ ] Container has correct classes: `min-h-screen text-white relative overflow-hidden`
- [ ] Hero component is used (`PageHero` or `PageHeroSplit`)
- [ ] Main has `space-y-24` between sections
- [ ] Animations use standard variants
- [ ] No visual breadcrumbs (only JSON-LD)
- [ ] Metadata is properly configured
- [ ] Build completes without errors
- [ ] Lint passes with 0 errors/warnings

---

**See Also**:
- [components/AGENTS.md](../components/AGENTS.md) - Component usage
- [Main AGENTS.md](../AGENTS.md) - Project overview
- [docs/PAGE_CONSISTENCY.md](../docs/PAGE_CONSISTENCY.md) - Page consistency guide
