# Page Consistency Guide

This guide documents the design and structure standards that should be followed when creating new pages in the project to maintain visual and functional consistency with the blog and other main pages.

## PageHero Component

**IMPORTANT**: Use the `PageHero` component for the hero section of all pages. This component abstracts all animation and structure logic, maintaining consistency automatically.

### Basic Usage

```tsx
import { PageHero } from "@/components/page-hero";

<PageHero
  badge={{ text: "Nombre de la Página" }}
  title="Título Principal"
  description="Descripción breve de la página."
/>
```

### With Icon and Custom Colors

```tsx
import { PageHero } from "@/components/page-hero";
import { Mail } from "lucide-react";

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
  description="Do you have a project in mind? I'd love to learn more about your vision."
/>
```

### With Additional Content

```tsx
<PageHero
  badge={{ text: "Blog" }}
  title="Insights & Experiences"
  description="Articles about software development..."
>
  <Suspense fallback={<Loading />}>
    <FeaturedContent />
  </Suspense>
</PageHero>
```

## Base Structure

All pages must follow this base structure:

```tsx
"use client";

import { Suspense } from "react";
import { motion, Variants } from "framer-motion";
// ... otros imports

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ParticleHeroBackground } from "@/components/particle-hero-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { PageHero } from "@/components/page-hero";

function PageContent() {
  const { isLoading } = usePageLoading();

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleHeroBackground />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
        
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{ text: "Nombre de la Página" }}
            title="Título Principal"
            description="Descripción breve de la página."
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

### 1. PageLoadingProvider y PageLoadingOverlay

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

### 2. ParticleHeroBackground

All pages must include the animated particle background:

```tsx
import { ParticleHeroBackground } from "@/components/particle-hero-background";

<div className="min-h-screen bg-black text-white relative overflow-hidden">
  <ParticleHeroBackground />
  {/* resto del contenido */}
</div>
```

### 3. Gradient Overlay

The gradient overlay must be consistent across all pages:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
```

## Hero Section Structure

**Always use the `PageHero` component**. Do not create hero sections manually. The component automatically handles:
- Consistent animations
- Structure and spacing
- Responsive design
- Animation variants

### PageHero Props

- `badge`: Object with badge configuration
  - `text` (required): Badge text
  - `icon` (optional): Lucide React icon
  - `gradientFrom` (optional): Initial gradient class (default: `"from-emerald-600/20"`)
  - `gradientTo` (optional): Final gradient class (default: `"to-teal-600/20"`)
  - `borderColor` (optional): Border color class (default: `"border-emerald-500/30"`)
  - `textColor` (optional): Text color class (default: `"text-emerald-400"`)
  - `shadowColor` (optional): Shadow color class (default: `"shadow-emerald-600/10"`)

**Note on default colors**: Badges use green (emerald/teal) colors by default to differentiate from active menu items that use blue/purple. If you need a different color, you can customize it using the optional props.
- `title` (required): Main title
- `description` (required): Page description
- `children` (optional): Additional content after the hero (e.g., featured content)

## Main Structure

The `<main>` element must have these classes and structure:

```tsx
<main className="relative z-10 container py-12 space-y-24" id="main-content">
  {/* Sections with space-y-24 between them */}
</main>
```

## Additional Sections

For sections that appear after the hero, use `whileInView`:

```tsx
<motion.section 
  className="py-12 space-y-8"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  {/* Content */}
</motion.section>
```

## Animation Variants

**The `PageHero` component automatically handles animations**. For additional sections, use these variants:

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

## Breadcrumbs

**IMPORTANT**: Do not include visual breadcrumbs in the UI. Breadcrumbs should only be in the layout's JSON-LD for SEO:

```tsx
// ❌ DO NOT do this in page.tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// ✅ Do this in layout.tsx
<BreadcrumbJsonLd
  items={[
    { name: "Home", url: "https://carrillo.app" },
    { name: "Page", url: "https://carrillo.app/page" },
  ]}
/>
```

## Colors and Gradients

### Hero Badge (Default)
Badges use green colors by default to differentiate from active menu items:
- Gradient: `bg-gradient-to-r from-emerald-600/20 to-teal-600/20`
- Border: `border-emerald-500/30`
- Text: `text-emerald-400`
- Shadow: `shadow-lg shadow-emerald-600/10`

**Reason for green color**: Active menu items use blue/purple, so green badges provide better visual contrast and avoid confusion with navigation.

### Main Title
- Class: `bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent`

### Section Titles
- Class: `bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent`

## Spacing

- Between main sections: `space-y-24`
- Main padding: `py-12`
- Hero padding: `py-12 md:py-24`
- Section padding: `py-12`

## Reference Examples

Pages that correctly follow these standards:
- `app/blog/page.tsx` - Blog page
- `app/recursos/page.tsx` - Resources page
- `app/contacto/page.tsx` - Contact page

## Checklist for New Pages

When creating a new page, verify:

- [ ] Uses `PageLoadingProvider` and `PageLoadingOverlay`
- [ ] Includes `ParticleHeroBackground`
- [ ] Has the correct gradient overlay
- [ ] **Uses the `PageHero` component for the hero section**
- [ ] Main has `space-y-24` between sections
- [ ] Additional sections use `whileInView`
- [ ] No visual breadcrumbs (only JSON-LD in layout)
- [ ] Badge, titles and colors are consistent (handled by `PageHero`)
- [ ] Spacing is consistent with other pages

## Important Notes

1. **Do not use visual breadcrumbs**: The project does not use breadcrumbs in the UI, only in JSON-LD for SEO.

2. **Animation consistency**: All pages should use the same animation variants for a uniform experience.

3. **Particle background**: Always include `ParticleHeroBackground` to maintain visual identity.

4. **Loading system**: Always use `PageLoadingProvider` for smooth transitions between pages.

5. **Spacing**: Maintain `space-y-24` in main for visual consistency between sections.

