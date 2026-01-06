# Agent Guidelines for CarrilloApps Project

This document provides comprehensive guidelines for AI agents working on the CarrilloApps project. It includes project structure, component usage, design conventions, and best practices.

## Project Overview

**CarrilloApps** is a personal portfolio and professional website built with Next.js 16, React 19, and TypeScript. The project follows a modern, dark-themed design with consistent UI patterns across all pages.

### Technology Stack

- **Framework**: Next.js 16.1.1 (Turbopack)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion
- **Component Library**: Radix UI primitives with custom shadcn/ui components
- **Deployment**: Vercel

### Package Versioning

**IMPORTANT**: All packages use `~` (tilde) versioning for patch-level updates only. This ensures stability and prevents breaking changes from minor/major version updates.

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

- **Detailed Consistency Guide**: `docs/PAGE_CONSISTENCY.md`
- **PageHero Component**: `components/page-hero.tsx`
- **PageHeroSplit Component**: `components/page-hero-split.tsx`
- **DynamicBackground Component**: `components/dynamic-background.tsx`
- **Project Documentation**: `docs/PROJECT.md`

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

**Last Updated**: Based on project state as of DynamicBackground implementation, PageHeroSplit enhancements, and green badge default colors.

