# CSS MIME Type Fix - Definitive Solution

## Problem

Browser console error:
```
Refused to apply style from 'https://carrillo.app/_next/static/css/app/layout.css' 
because its MIME type ('text/plain') is not a supported stylesheet MIME type, 
and strict MIME checking is enabled.
```

## Root Cause

Next.js 16 with App Router generates CSS files in paths like:
- `/_next/static/css/app/layout.css`
- `/_next/static/css/app/page.css`
- `/_next/static/css/[route]/page.css`

The server was serving these files with `Content-Type: text/plain` instead of `text/css`, which causes modern browsers to reject applying the styles for security reasons (MIME type sniffing protection).

## Implemented Solution

Two header rules were added in `next.config.mjs` to cover all CSS patterns:

### 1. Specific Rule for App Router CSS

```javascript
{
  source: '/_next/static/css/app/:path*.css',
  headers: [
    {
      key: 'Content-Type',
      value: 'text/css; charset=utf-8',
    },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
    {
      key: 'CDN-Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

### 2. General Rule for All CSS

```javascript
{
  source: '/_next/static/css/:path*.css',
  headers: [
    {
      key: 'Content-Type',
      value: 'text/css; charset=utf-8',
    },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
    {
      key: 'CDN-Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

### 3. Rule Order (Critical)

CSS rules **must be before** the generic `/_next/static/:path*` rule to take priority:

```javascript
async headers() {
  return [
    // ... other rules ...
    
    // ✅ Specific CSS first
    { source: '/_next/static/css/app/:path*.css', ... },
    
    // ✅ General CSS second
    { source: '/_next/static/css/:path*.css', ... },
    
    // ✅ Generic at the end
    { source: '/_next/static/:path*', ... },
  ]
}
```

## Applied Headers

Each CSS file now receives:

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Type` | `text/css; charset=utf-8` | Correctly identify as CSS |
| `Cache-Control` | `public, max-age=31536000, immutable` | 1-year cache (immutable) |
| `CDN-Cache-Control` | `public, max-age=31536000, immutable` | 1-year CDN cache |

## Additional Benefits

1. **Performance**: 1-year cache with `immutable` reduces network requests
2. **CDN Optimization**: `CDN-Cache-Control` optimizes cache on Vercel Edge Network
3. **Charset**: `charset=utf-8` ensures correct character encoding in CSS

## Verification

### Local (Development)

```bash
npm run dev
```

Headers are applied only in **production**, not in development.

### Production Build

```bash
npm run build
npm run start
```

Verify in DevTools:
1. Network tab → Filter by CSS
2. Click on CSS file
3. Headers tab → Response Headers
4. Verify: `Content-Type: text/css; charset=utf-8`

### On Vercel

After deployment:
1. Open DevTools in production
2. Network → CSS files
3. Verify Response Headers

## Compatibility

- ✅ **Next.js 16+**: App Router and Pages Router
- ✅ **Vercel**: Optimized configuration for Vercel Edge Network
- ✅ **All browsers**: Complies with MIME type standards
- ✅ **Lighthouse**: Passes performance and best practices audits

## Troubleshooting

### If the error persists:

1. **Clear browser cache** (Hard Refresh: Ctrl+Shift+R)
2. **Clear Next.js build**:
   ```bash
   rm -rf .next
   npm run build
   ```
3. **Verify rule order** in `next.config.mjs`
4. **Verify no Content-Type overrides** in middleware
5. **On Vercel**: Redeploy to apply new headers

### Verify headers locally:

```bash
npm run build
npm run start
curl -I http://localhost:3000/_next/static/css/app/layout.css
```

Should display:
```
Content-Type: text/css; charset=utf-8
Cache-Control: public, max-age=31536000, immutable
```

## References

- [MDN: MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Next.js: Custom Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Vercel: Headers Configuration](https://vercel.com/docs/projects/project-configuration#headers)

---

**Implementation Date**: 2026-01-07  
**Status**: ✅ Definitively Resolved  
**Next.js Version**: 16.1.1  
**Maintained by**: José Carrillo (m@carrillo.app)
