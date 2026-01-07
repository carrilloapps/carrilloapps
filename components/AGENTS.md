# Components Directory - Agent Guidelines

This directory contains all React components used throughout the CarrilloApps project. Components follow a consistent pattern and utilize shadcn/ui + Radix UI primitives.

## Directory Structure

```
components/
├── animated-section.tsx          # Animated section wrapper
├── blog-article.tsx              # Blog post article display
├── blog-categories.tsx           # Blog category filter
├── blog-featured.tsx             # Featured blog post card
├── blog-loading.tsx              # Blog loading skeleton
├── blog-page-client.tsx          # Blog page client component
├── blog-posts.tsx                # Blog posts grid
├── blog-related.tsx              # Related posts section
├── blog-search.tsx               # Blog search component
├── compact-contact-section.tsx   # Compact contact form
├── contact-info-card.tsx         # Contact information card
├── contact-social-section.tsx    # Social links section
├── cookie-consent.tsx            # GDPR cookie consent banner
├── disqus-comments.tsx           # Disqus comments integration
├── dynamic-background.tsx        # ⭐ Animated background (required on all pages)
├── dynamic-imports.tsx           # ⭐ Dynamic import wrappers for performance
├── featured-projects.tsx         # Featured projects showcase
├── featured-repositories.tsx     # Featured GitHub/GitLab repos
├── global-page-loader.tsx        # Global loading indicator
├── interactive-background.tsx    # Interactive background effects
├── json-ld.tsx                   # Structured data components
├── logo.tsx                      # Site logo component
├── newsletter-form.tsx           # Newsletter subscription form
├── page-hero-split.tsx           # ⭐ Split layout hero component
├── page-hero.tsx                 # ⭐ Standard centered hero component
├── page-loader.tsx               # Page loading spinner
├── page-loading-context.tsx      # Page loading state provider
├── page-loading-overlay.tsx      # Loading overlay component
├── particle-hero-background.tsx  # ❌ DEPRECATED - Use DynamicBackground
├── project-dialog.tsx            # Project details dialog
├── repositories-list.tsx         # Repository list component
├── repositories-loading.tsx      # Repository loading skeleton
├── scroll-to-top.tsx             # Scroll to top button
├── services-seo.tsx              # Services SEO components
├── site-footer.tsx               # Site footer
├── site-header.tsx               # Site header/navigation
├── skip-link.tsx                 # Accessibility skip link
├── social-link-card.tsx          # Social media link card
├── theme-provider.tsx            # Theme context provider
├── unified-loading.tsx           # Unified loading components
└── ui/                           # shadcn/ui components
    ├── accordion.tsx
    ├── alert-dialog.tsx
    ├── aspect-ratio.tsx
    ├── avatar.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── checkbox.tsx
    ├── command.tsx
    ├── dialog.tsx
    ├── dropdown-menu.tsx
    ├── form.tsx
    ├── input.tsx
    ├── label.tsx
    ├── popover.tsx
    ├── select.tsx
    ├── separator.tsx
    ├── sidebar.tsx
    ├── skeleton.tsx
    ├── switch.tsx
    ├── tabs.tsx
    ├── textarea.tsx
    └── toast.tsx
```

## Performance Optimization: Dynamic Imports

### dynamic-imports.tsx ⭐ CRITICAL FOR PERFORMANCE

**Location**: `components/dynamic-imports.tsx`

**Purpose**: Centralized file for all lazy-loaded components to reduce JavaScript bundle size and defer loading of heavy components until needed.

#### Why Dynamic Imports?

**Problem**: Loading all components upfront increases initial JavaScript bundle and slows page load.

**Solution**: Use Next.js `dynamic()` to lazy-load heavy components only when they're needed (when user scrolls to them).

**Impact**: 
- Reduces initial JS from 114.3 KiB to ~70 KiB (38% reduction)
- Unused JavaScript reduced from 41.5 KiB to <10 KiB

#### Available Dynamic Components

**Heavy Components (Below the Fold):**
```tsx
import {
  DynamicFeaturedProjects,       // Heavy: API calls + animations
  DynamicFeaturedRepositories,   // Heavy: API calls
  DynamicCompactContactSection,  // Heavy: Form validation
} from "@/components/dynamic-imports";
```

**Heavy UI Components:**
```tsx
import {
  DynamicTabs as Tabs,
  DynamicTabsContent as TabsContent,
  DynamicTabsList as TabsList,
  DynamicTabsTrigger as TabsTrigger,
  DynamicDialog as Dialog,
  DynamicDialogContent as DialogContent,
  // ... other Dialog components
} from "@/components/dynamic-imports";
```

**Third-Party Components:**
```tsx
import {
  DynamicDisqusComments,         // Third-party script
  DynamicNewsletterForm,         // Form with validation
  DynamicCookieConsent,          // Conditional banner
  DynamicProjectDialog,          // Modal
} from "@/components/dynamic-imports";
```

#### Usage Example

**Before (Static Import):**
```tsx
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FeaturedProjects } from "@/components/featured-projects";
import { Dialog } from "@/components/ui/dialog";

// All loaded immediately, even if not visible
```

**After (Dynamic Import):**
```tsx
import {
  DynamicTabs as Tabs,
  DynamicTabsContent as TabsContent,
  DynamicFeaturedProjects as FeaturedProjects,
  DynamicDialog as Dialog,
} from "@/components/dynamic-imports";

// Only loaded when component scrolls into view or user interacts
```

#### When to Use Dynamic Imports

**✅ Use for:**
- Components below the fold (not immediately visible)
- Heavy components with API calls (FeaturedProjects, FeaturedRepositories)
- Forms with complex validation
- Third-party scripts (Disqus, analytics)
- Large UI libraries (Tabs, Dialog, complex modals)
- Components that may not be used in every page visit

**❌ Don't use for:**
- Above-the-fold content (hero, header, footer)
- Small, lightweight components
- Components critical for First Contentful Paint (FCP)
- Components needed for SEO (use SSR instead)

#### Configuration

Each dynamic import has specific configuration:

```tsx
export const DynamicFeaturedProjects = dynamic(
  () => import('./featured-projects').then(mod => ({ default: mod.FeaturedProjects })),
  {
    loading: () => <SpinnerLoading />,  // Show during load
    ssr: false                          // Client-side only
  }
);
```

**Options:**
- `loading`: Component to show while loading
- `ssr`: Whether to render on server (false = client-only)

#### Adding New Dynamic Components

To add a new heavy component:

1. **Add to `dynamic-imports.tsx`:**
```tsx
export const DynamicMyHeavyComponent = dynamic(
  () => import('./my-heavy-component').then(mod => ({ default: mod.MyHeavyComponent })),
  {
    loading: () => <div className="h-48 animate-pulse bg-zinc-900/50 rounded-lg"></div>,
    ssr: false
  }
);
```

2. **Import as alias in your page:**
```tsx
import { DynamicMyHeavyComponent as MyHeavyComponent } from "@/components/dynamic-imports";
```

3. **Use normally:**
```tsx
<MyHeavyComponent {...props} />
```

## Core Components

### PageHero (Standard Centered Hero)

**Location**: `components/page-hero.tsx`

Standard hero component for most pages. Provides consistent structure, animations, and styling.

#### Usage
```tsx
import { PageHero } from "@/components/page-hero";

<PageHero
  badge={{ text: "Page Name" }}
  title="Main Title"
  description="Brief description of the page."
/>
```

#### With Custom Badge Colors
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

#### With Children
```tsx
<PageHero
  badge={{ text: "Blog" }}
  title="Insights & Experiences"
  description="Articles about software development..."
>
  <Suspense fallback={<BlogFeaturedLoading />}>
    <BlogFeatured />
  </Suspense>
</PageHero>
```

#### Props
```typescript
interface PageHeroProps {
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
  description: string;               // Required
  children?: React.ReactNode;        // Optional
}
```

#### Default Badge Colors
- Gradient: `from-emerald-600/20 to-teal-600/20`
- Border: `border-emerald-500/30`
- Text: `text-emerald-400`
- Shadow: `shadow-emerald-600/10`

**Why green?** Active menu items use blue/purple, so green badges provide better visual contrast.

### PageHeroSplit (Split Layout Hero)

**Location**: `components/page-hero-split.tsx`

Hero component with split layout: content on left, image/custom content on right. Ideal for profile pages.

#### Usage
```tsx
import { PageHeroSplit } from "@/components/page-hero-split";

<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  subtitle="My professional journey"
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

#### With Multiple Description Paragraphs
```tsx
<PageHeroSplit
  badge={{ text: "About Me" }}
  title="Hello, I'm José Carrillo"
  description={
    <>
      <p className="text-zinc-400 leading-relaxed">First paragraph...</p>
      <p className="text-zinc-400 leading-relaxed">Second paragraph...</p>
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
  description="Description..."
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

#### With Custom Right Content
```tsx
<PageHeroSplit
  badge={{ text: "Services" }}
  title="My Services"
  description="What I offer..."
  rightContent={
    <div className="text-center">
      <Icon className="w-20 h-20" />
      <h3>15+ Years</h3>
      <p>of Experience</p>
    </div>
  }
/>
```

#### Props
```typescript
interface PageHeroSplitProps {
  badge: {
    text: string;
    icon?: LucideIcon;
    gradientFrom?: string;
    gradientTo?: string;
    borderColor?: string;
    textColor?: string;
    shadowColor?: string;
  };
  title: string | ReactNode;         // Can include custom JSX
  subtitle?: string;                 // Optional subtitle
  description: string | ReactNode;   // String or JSX
  image?: {
    src: string;
    alt: string;
    width?: number;                  // Default: 600
    height?: number;                 // Default: 600
    priority?: boolean;              // Default: true
  };
  rightContent?: ReactNode;          // Alternative to image
  actions?: ReactNode;               // Action buttons
  additionalContent?: ReactNode;     // Additional content after description
}
```

#### Layout Behavior
- **Desktop**: Content left, image/custom content right (2 columns)
- **Mobile**: Image first, then content (order changes)
- **Image**: Square aspect ratio with glassmorphism effects

### DynamicBackground

**Location**: `components/dynamic-background.tsx`

**REQUIRED** on all pages. Provides modern, animated background with gradient orbs and grid pattern.

#### Usage
```tsx
import { DynamicBackground } from "@/components/dynamic-background";

<div className="min-h-screen text-white relative overflow-hidden">
  <DynamicBackground />
  {/* page content */}
</div>
```

#### Features
- Animated gradient orbs (4 layers)
- Radial gradient overlay
- Animated grid pattern (50px x 50px)
- GPU-accelerated CSS animations
- Fixed positioning (z-index: -50 to -30)

#### Important Notes
- **DO NOT** use `ParticleHeroBackground` (deprecated)
- Container MUST have `relative overflow-hidden` classes
- No custom gradient overlays needed

## Loading Components

### Unified Loading System

**Location**: `components/unified-loading.tsx`

Provides consistent loading states throughout the app.

#### Available Components
```tsx
import {
  SpinnerLoading,
  OverlayLoading,
  CardSkeleton,
  GridSkeleton,
  HeroSkeleton,
  FormSkeleton,
  BlogFeaturedLoading,
  BlogGridLoading
} from "@/components/unified-loading";
```

#### Usage Examples
```tsx
// Page overlay loading
<OverlayLoading isVisible={isLoading} />

// Spinner
<SpinnerLoading />

// Skeletons
<BlogFeaturedLoading />
<BlogGridLoading />
<CardSkeleton />
```

### Page Loading Context

**Location**: `components/page-loading-context.tsx`

Global loading state management.

#### Usage
```tsx
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";

// In page component
function PageContent() {
  const { isLoading } = usePageLoading();
  return <PageLoadingOverlay isVisible={isLoading} />;
}

// Wrap page
export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  );
}
```

## Layout Components

### SiteHeader

**Location**: `components/site-header.tsx`

Main navigation component with mega menu.

#### Features
- Responsive navigation
- Mega menu dropdown
- Mobile hamburger menu
- Active route highlighting
- Smooth animations

#### Usage
```tsx
import { SiteHeader } from "@/components/site-header";

<SiteHeader />
```

### SiteFooter

**Location**: `components/site-footer.tsx`

Site footer with links and information.

#### Features
- Links to all pages
- Social media links
- Copyright information
- Newsletter subscription

#### Usage
```tsx
import { SiteFooter } from "@/components/site-footer";

<SiteFooter />
```

## Dynamic Imports

**Location**: `components/dynamic-imports.tsx`

Lazy-loaded components for code splitting.

#### Available Exports
```tsx
export const DynamicDisqusComments = dynamic(...)  // Comments
export const DynamicProjectDialog = dynamic(...)   // Project dialog
export const DynamicCookieConsent = dynamic(...)   // Cookie banner
export const DynamicNewsletterForm = dynamic(...) // Newsletter form
```

#### Usage
```tsx
import { DynamicCookieConsent } from "@/components/dynamic-imports";

<DynamicCookieConsent />
```

#### Benefits
- Reduces initial JavaScript bundle
- Improves Time to Interactive (TTI)
- Better performance on slow connections

## Structured Data (JSON-LD)

**Location**: `components/json-ld.tsx`

SEO structured data components.

#### Available Components
```tsx
import {
  JsonLd,
  OrganizationJsonLd,
  PersonJsonLd,
  ServiceJsonLd,
  WebsiteJsonLd,
  BreadcrumbJsonLd
} from "@/components/json-ld";
```

#### Usage
```tsx
// In layout.tsx
<OrganizationJsonLd />
<PersonJsonLd />
<WebsiteJsonLd />

// In page layout
<BreadcrumbJsonLd
  items={[
    { name: "Home", url: "https://carrillo.app" },
    { name: "Blog", url: "https://carrillo.app/blog" },
  ]}
/>
```

## UI Components (shadcn/ui)

Located in `components/ui/` directory. Built on Radix UI primitives.

### Common Usage Patterns

#### Button
```tsx
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="lg">Large</Button>
```

#### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>
```

#### Dialog
```tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

#### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Component Best Practices

### 1. TypeScript Props
Always define proper interfaces:
```tsx
interface MyComponentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function MyComponent({ title, description, children }: MyComponentProps) {
  // ...
}
```

### 2. Framer Motion Animations
Use consistent variants:
```tsx
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

<motion.div variants={itemVariants}>
  {/* content */}
</motion.div>
```

### 3. Conditional Rendering
Use TypeScript type guards:
```tsx
{image && (
  <Image src={image.src} alt={image.alt} />
)}
```

### 4. Accessibility
- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Maintain focus indicators

### 5. Performance
- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize images with Next.js Image component
- Avoid unnecessary re-renders

## Common Patterns

### Section Container
```tsx
<motion.section 
  className="py-12 space-y-8"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  {/* content */}
</motion.section>
```

### Card with Hover Effect
```tsx
<Card className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30 transition-all duration-300 group">
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

### Badge
```tsx
<Badge className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 text-emerald-400">
  New
</Badge>
```

## Testing Checklist

When creating/modifying components:

- [ ] Proper TypeScript types defined
- [ ] Accessibility attributes added
- [ ] Responsive design implemented
- [ ] Animations use standard variants
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Build completes without errors
- [ ] Lint passes (0 errors/warnings)

---

**See Also**:
- [app/AGENTS.md](../app/AGENTS.md) - Page structure
- [Main AGENTS.md](../AGENTS.md) - Project overview
- [hooks/AGENTS.md](../hooks/AGENTS.md) - Custom hooks
