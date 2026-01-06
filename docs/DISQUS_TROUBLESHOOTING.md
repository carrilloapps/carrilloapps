# Troubleshooting: Disqus on Vercel

## Problem Identified

Disqus works in local development but not on Vercel. This is a common problem with several possible causes.

## Most Common Causes

### 1. Environment Variables Not Configured in Vercel

**Symptom**: Comments do not appear in production
**Solution**:
1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add the following variables:

```env
# For all environments (Development, Preview, Production)
NEXT_PUBLIC_DISQUS_SHORTNAME=carrilloapps

# Different values according to environment:
# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Preview
NEXT_PUBLIC_SITE_URL=https://carrilloapps-git-[branch].vercel.app

# Production
NEXT_PUBLIC_SITE_URL=https://carrillo.app
```

### 2. Domain Not Configured in Disqus

**Symptom**: Error "We were unable to load Disqus"
**Solution**:
1. Go to [Disqus Admin](https://disqus.com/admin/)
2. Select your site
3. Settings → General
4. In "Website URL": `https://carrillo.app`
5. In "Trusted Domains", add:
   - `carrillo.app`
   - `carrilloapps.vercel.app`
   - `*.vercel.app` (for previews)
   - `localhost` (for development)

### 3. Incorrect URL Passed to Disqus

**Symptom**: Comments don't load or appear on wrong site
**Solution**: Verify that the generated URL is correct

```typescript
// In the DisqusComments component
const siteUrl = getSiteUrl() // Should return the correct URL
const fullUrl = `${siteUrl}/blog/${slug}` // Full article URL
```

### 4. CSP (Content Security Policy) Configuration

**Symptom**: Disqus scripts blocked
**Solution**: Add to `next.config.mjs`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.disqus.com *.disquscdn.com; frame-src 'self' disqus.com *.disqus.com;"
          }
        ]
      }
    ]
  }
}
```

### 5. Problems with Edge Runtime

**Symptom**: Environment variables not available in Edge
**Solution**: Ensure public variables are correctly prefixed:

```typescript
// ✅ Correct - available in Edge Runtime
process.env.NEXT_PUBLIC_DISQUS_SHORTNAME

// ❌ Incorrect - not available in Edge Runtime
process.env.DISQUS_SHORTNAME
```

## Diagnostic Steps

### 1. Verify Environment Variables

```bash
# Locally
vercel env pull .env.local

# Verify variables are available
vercel env ls
```

### 2. Verify Disqus Configuration

1. Go to your Disqus panel
2. Verify the shortname is correct
3. Confirm domains are configured
4. Check for country/region restrictions

### 3. Check Browser Console

Open developer tools and look for:
- CORS errors
- Blocked scripts
- Disqus configuration errors

### 4. Test in Different Environments

- ✅ Local: `http://localhost:3000`
- ✅ Preview: `https://carrilloapps-git-[branch].vercel.app`
- ❌ Production: `https://carrillo.app`

## Recommended Configuration for Vercel

### Environment Variables by Environment

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | `carrilloapps` | `carrilloapps` | `carrilloapps` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://carrilloapps-git-main.vercel.app` | `https://carrillo.app` |

### Configuration in Disqus

**Website URL**: `https://carrillo.app`

**Trusted Domains**:
```
carrillo.app
carrilloapps.vercel.app
*.vercel.app
localhost
```

## Useful Commands

```bash
# Sync Vercel variables
vercel env pull .env.local

# Run in Vercel mode locally
vercel dev

# View deployment logs
vercel logs [deployment-url]

# Verify variables at runtime
vercel env ls --environment=production
```

## Final Verification

1. **Variables configured in Vercel** ✅
2. **Domains configured in Disqus** ✅
3. **Correct URLs generated** ✅
4. **No errors in console** ✅
5. **Works in preview** ✅
6. **Works in production** ✅

## Support Contact

If the problem persists after following these steps:
1. Check Vercel logs
2. Verify configuration in Disqus Admin
3. Contact Disqus support if necessary

---

**Note**: This document will be updated as new problems or solutions are identified.