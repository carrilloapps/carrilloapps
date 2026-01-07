# CSS Optimization Strategy - Version 2

This document explains the CSS optimization strategies implemented in the project to improve Largest Contentful Paint (LCP) and reduce render-blocking resources.

## Problem Statement

CSS files were blocking initial page rendering, causing:
- **High LCP** (Largest Contentful Paint > 2.5s)
- **Delayed FCP** (First Contentful Paint)
- **Poor user experience** on slower connections

### Render-Blocking Resources Identified:
1. `carrillo.app` - 25.0 KiB - 770 ms
2. `_next/static/chunks/523...aa56.css` - 21.9 KiB - 310 ms
3. `_next/static/chunks/4960027c48b76ce8.css` - 3.1 KiB - 460 ms

## Solution: Multi-Layer CSS Optimization

### 1. Critical CSS Preloading (`app/layout.tsx`)

**Added `fetchPriority="high"` hint for critical CSS:**

```tsx
<link 
  rel="preload" 
  href="/_next/static/css/app/layout.css" 
  as="style" 
  fetchPriority="high"
/>
```

**Why?**
- Tells browser to prioritize critical layout CSS
- Reduces time to first render
- Improves LCP by ensuring critical styles load first

### 2. Deferred Non-Critical CSS (`app/defer-css.tsx`)

**Smart CSS deferral strategy:**
- **Keeps critical CSS blocking** (layout.css, globals.css) for proper initial render
- **Defers non-critical CSS** using `media="print"` trick
- **Restores media after load** to apply styles without blocking

```tsx
// Skip critical layout CSS (keep it blocking)
if (href.includes('app/layout.css') || href.includes('globals.css')) {
  return;
}

// Defer other CSS
link.media = 'print'; // Doesn't block render
link.onload = () => {
  link.media = originalMedia; // Restore after load
};
```

**Benefits:**
- Non-critical CSS loads asynchronously
- LCP happens faster (critical path optimized)
- No FOUC (Flash of Unstyled Content) because critical CSS still blocks

### 3. CSS Chunking Strategy (`next.config.mjs`)

**Using `strict` CSS chunking with defer strategy:**

```js
experimental: {
  optimizeCss: true, // Enable automatic CSS optimization
  cssChunking: 'strict', // Strict chunking + defer for optimal performance
}
```

**Why `strict` chunking with `DeferCSS`?**
- **`strict`**: Creates precise CSS chunks per route/component
- **`DeferCSS` component**: Handles non-critical chunk loading asynchronously
- **Combined strategy**: Critical CSS loads synchronously, non-critical defers
- **Result**: Best of both worlds - precise chunking + async loading

**How it works:**
1. Next.js splits CSS strictly by route/component
2. Critical layout CSS loads blocking (initial render)
3. Non-critical chunks defer using `media="print"` trick
4. After page interactive, deferred CSS restores to `media="all"`

### 4. Aggressive Caching Headers

**CSS files cached aggressively:**

```js
{
  source: '/_next/static/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

**Benefits:**
- CSS cached for 1 year (31536000 seconds)
- Marked as `immutable` (never revalidates)
- Repeat visits load instantly from cache

## Implementation Order

**Critical for avoiding FOUC:**

1. ✅ Critical CSS loads **synchronously** (blocks render)
2. ✅ Page renders with critical styles
3. ✅ Non-critical CSS defers using `requestIdleCallback`
4. ✅ Non-critical styles apply without layout shift

## Performance Impact

### Before Optimization:
- LCP: **3.8s** (Needs Improvement)
- CSS blocking: **770ms + 310ms + 460ms = 1,540ms**
- FCP: **2.1s**

### After Optimization (Expected):
- LCP: **< 2.5s** (Good)
- CSS blocking: **~400ms** (critical only)
- FCP: **< 1.8s**
- Non-critical CSS: **Loads during idle time**

## Testing & Validation

### Lighthouse Audit:
```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse
# Run Performance audit
```

**Check these metrics:**
- LCP should be < 2.5s (green)
- Render-blocking resources reduced
- Total Blocking Time (TBT) improved

### Visual Regression:
1. Check critical pages load with correct styles immediately
2. Verify no FOUC (Flash of Unstyled Content)
3. Test on slow 3G connection (Chrome DevTools)

## Browser Compatibility

### `requestIdleCallback` Support:
- ✅ Chrome 47+
- ✅ Firefox 55+
- ✅ Edge 79+
- ✅ Safari 15+ (partial)

**Fallback:**
```tsx
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(deferCSS, { timeout: 1000 });
} else {
  window.requestAnimationFrame(() => {
    window.setTimeout(deferCSS, 1);
  });
}
```

## Monitoring

### Vercel Analytics:
- Track LCP improvements in production
- Monitor P75 (75th percentile) metrics
- Set alerts for LCP regressions

### Core Web Vitals:
```js
experimental: {
  webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
}
```

## Troubleshooting

### FOUC (Flash of Unstyled Content):
**Symptom:** Page briefly shows unstyled content
**Solution:** Ensure critical CSS is NOT deferred:
```tsx
if (href.includes('app/layout.css') || href.includes('globals.css')) {
  return; // Keep blocking
}
```

### CSS Not Loading:
**Symptom:** Styles missing after page load
**Solution:** Check browser console for errors:
```tsx
link.addEventListener('error', onLoad, { once: true });
```

### Slow LCP Despite Optimizations:
**Check:**
1. Hero images have `priority={true}`
2. No heavy animations blocking initial render
3. CSS chunks aren't too fragmented (use `loose` chunking)

## Related Documentation

- [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md) - Overall performance strategy
- [CSS_OPTIMIZATION.md](./CSS_OPTIMIZATION.md) - Previous CSS optimization guide
- [Next.js CSS Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/css)
- [Web.dev: Optimize CSS](https://web.dev/articles/optimize-css)

## Changelog

### 2026-01-07: Version 2 - Advanced CSS Optimization
- Added critical CSS preloading with `fetchPriority="high"`
- Implemented smart CSS deferral in `DeferCSS` component
- Changed CSS chunking from `strict` to `loose`
- Integrated `DeferCSS` in root layout
- Documented optimization strategy

---

**Author:** José Carrillo (m@carrillo.app)  
**Last Updated:** January 7, 2026  
**Project:** carrillo.app
