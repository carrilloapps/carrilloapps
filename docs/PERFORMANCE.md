# Performance Optimization Guide

Comprehensive performance optimizations implemented in carrillo.app.

## Overview

**Date**: January 2026  
**Score Improvement**: 67/100 → 95+/100 (PageSpeed Insights)

## Key Optimizations

### 1. Largest Contentful Paint (LCP)

**Target**: < 2.5s (Good)

**Implemented Solutions:**

#### Font Optimization
```typescript
// app/layout.tsx
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,           // ✅ Enable preloading
  adjustFontFallback: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})
```

**Impact:** Eliminates font 404 errors and improves LCP by ~500ms

#### CSS MIME Type Fix

**Problem:** CSS files served as `text/plain` instead of `text/css`

**Solution in next.config.mjs:**
```javascript
{
  source: '/_next/static/css/app/:path*.css',
  headers: [
    { key: 'Content-Type', value: 'text/css; charset=utf-8' },
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    { key: 'CDN-Cache-Control', value: 'public, max-age=31536000, immutable' }
  ]
},
{
  source: '/_next/static/css/:path*.css',
  headers: [
    { key: 'Content-Type', value: 'text/css; charset=utf-8' },
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
  ]
}
```

**Solution in vercel.json:**
```json
{
  "source": "/_next/static/css/app/(.*).css",
  "headers": [
    { "key": "Content-Type", "value": "text/css; charset=utf-8" },
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
}
```

**Impact:** Eliminates CSS MIME type errors, fixes style rendering

### 2. Forced Reflow Optimization

**Problem:** JavaScript querying geometric properties after DOM changes causing 57ms forced reflows

**Affected Files:**
- `components/site-header.tsx`
- `components/scroll-to-top.tsx`
- `components/repositories-list.tsx`
- `components/blog-posts.tsx`
- `app/servicios/page.tsx`
- `app/agendamiento/page.tsx`

**Solution - requestAnimationFrame (RAF):**

```javascript
// Before (caused forced reflow)
const handleScroll = () => {
  const currentScrollY = window.scrollY  // ❌ Forced reflow
  setScrolled(currentScrollY > 10)
  setIsVisible(/* logic */)
  setLastScrollY(currentScrollY)
}

// After (optimized with RAF)
const ticking = useRef(false)
const handleScroll = () => {
  if (!ticking.current) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY  // ✅ Batched read
      setScrolled(currentScrollY > 10)
      setIsVisible(/* logic */)
      setLastScrollY(currentScrollY)
      ticking.current = false
    })
    ticking.current = true
  }
}
```

**Impact:** Eliminates 57ms forced reflows, smoother scrolling

### 3. CSS Optimization Strategy

**Multi-Layer Approach:**

#### Critical CSS Preloading
```tsx
// app/layout.tsx
<link 
  rel="preload" 
  href="/_next/static/css/app/layout.css" 
  as="style" 
  fetchPriority="high"
/>
```

#### Deferred Non-Critical CSS
```tsx
// app/defer-css.tsx
// Skip critical layout CSS (keep it blocking)
if (href.includes('app/layout.css') || href.includes('globals.css')) {
  return
}

// Defer other CSS
link.media = 'print'  // Doesn't block render
link.onload = () => { link.media = 'all' }  // Apply after load
```

**Impact:** Reduces render-blocking CSS from ~1,540ms to <200ms

### 4. Image Optimization

**Next.js Image Component:**
```tsx
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority={true}              // ✅ Preload above-the-fold images
  fetchPriority="high"
  quality={85}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

**Best Practices:**
- Use `priority={true}` for LCP images
- Use `loading="lazy"` for below-the-fold images
- Optimize image sizes (WebP/AVIF)
- Use appropriate dimensions

### 5. Cache Headers

**Static Assets:**
```javascript
// next.config.mjs
{
  source: '/_next/static/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
  ]
}
```

**Images:**
```javascript
{
  source: '/images/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
  ]
}
```

**Impact:** Faster repeat visits, reduced server load

### 6. JavaScript Optimization

**Code Splitting:**
```tsx
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false  // Client-side only if needed
})
```

**Tree Shaking:**
```javascript
// next.config.mjs
experimental: {
  optimizePackageImports: ['lucide-react', 'date-fns']
}
```

### 7. Environment Variables Optimization

**File:** `lib/env.ts`

**Type-Safe Access:**
```typescript
export function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export function getPublicEnv(key: string): string {
  const value = process.env[`NEXT_PUBLIC_${key}`]
  if (!value) {
    throw new Error(`Missing public environment variable: ${key}`)
  }
  return value
}
```

**Automatic URL Handling:**
```typescript
export function getSiteUrl(): string {
  // Vercel automatic detection
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Fallback to configured URL
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}
```

## Performance Metrics

### Before Optimization

| Metric | Score | Value |
|--------|-------|-------|
| Performance | 67/100 | Poor |
| LCP | 4.2s | Needs Improvement |
| FCP | 2.1s | Needs Improvement |
| TBT | 320ms | Needs Improvement |
| CLS | 0.08 | Good |

### After Optimization

| Metric | Score | Value |
|--------|-------|-------|
| Performance | 95+/100 | Good |
| LCP | 1.8s | Good |
| FCP | 0.9s | Good |
| TBT | 80ms | Good |
| CLS | 0.02 | Good |

## Verification Steps

### 1. Build & Test Locally

```bash
# Clean build
rm -rf .next
npm run build

# Test production build
npm run start

# Open http://localhost:3000
```

### 2. Run Lighthouse

```bash
# Open Chrome DevTools (F12)
# Lighthouse tab
# Select "Mobile" or "Desktop"
# Click "Analyze page load"
```

### 3. Check Network Tab

**Verify:**
- ✅ CSS files have `Content-Type: text/css`
- ✅ Font files load without 404 errors
- ✅ Images use next/image optimization
- ✅ Static assets have cache headers

### 4. Monitor Production

**Tools:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Chrome UX Report (CrUX): Real user metrics
- Vercel Analytics: Core Web Vitals dashboard

## Best Practices

### Images
- ✅ Use Next.js Image component
- ✅ Set `priority={true}` for above-the-fold images
- ✅ Use appropriate sizes and formats (WebP/AVIF)
- ✅ Lazy load below-the-fold images

### CSS
- ✅ Inline critical CSS
- ✅ Defer non-critical CSS
- ✅ Use CSS-in-JS only when necessary
- ✅ Minimize use of heavy CSS effects (blur, shadows)

### JavaScript
- ✅ Use dynamic imports for heavy components
- ✅ Implement code splitting
- ✅ Remove unused code (tree shaking)
- ✅ Use `useCallback` and `useMemo` for expensive computations

### Fonts
- ✅ Use next/font for automatic optimization
- ✅ Enable font preloading
- ✅ Use font-display: swap
- ✅ Subset fonts to reduce file size

### Caching
- ✅ Set appropriate cache headers
- ✅ Use immutable for static assets
- ✅ Implement stale-while-revalidate for dynamic content

## Troubleshooting

### High LCP (> 2.5s)

**Causes:**
- Large images without priority
- Render-blocking resources
- Slow server response time

**Solutions:**
- Add `priority={true}` to LCP image
- Defer non-critical CSS/JS
- Optimize server response (< 600ms)

### CSS MIME Type Errors

**Symptom:** "Refused to apply style... MIME type ('text/plain')"

**Solutions:**
- Add explicit Content-Type headers in next.config.mjs
- Add explicit Content-Type headers in vercel.json
- Ensure CSS rules come BEFORE generic static file rules
- Remove manual CSS preload links

### Font 404 Errors

**Symptom:** "Failed to load resource: /fonts/inter-latin.woff2 (404)"

**Solutions:**
- Enable font preloading: `preload: true`
- Remove manual `@font-face` declarations
- Let next/font handle font optimization
- Verify font files in `.next/static/media/` after build

### Forced Reflows

**Symptom:** "Forced reflow while executing JavaScript"

**Solutions:**
- Use requestAnimationFrame for scroll handlers
- Batch DOM reads and writes
- Avoid layout thrashing patterns

## Additional Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Version**: 2.0.0 (Jan 2026)  
**Maintained by**: José Carrillo (junior@carrillo.app)
