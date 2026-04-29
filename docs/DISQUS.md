# Disqus Integration

Complete guide for Disqus comments integration in carrillo.app blog.

## Quick Setup

### 1. Create Disqus Account

1. Go to [https://disqus.com/](https://disqus.com/)
2. Create account or sign in
3. Click "Get Started" → "I want to install Disqus on my site"
4. Enter website name and choose category
5. **Copy the "shortname"** (automatically generated)

### 2. Configure Environment

```bash
# .env.local
NEXT_PUBLIC_DISQUS_SHORTNAME=your-shortname-here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Configure Trusted Domains

**Disqus Admin Panel:**
1. Go to [Disqus Admin](https://disqus.com/admin/)
2. Select your site → Settings → General
3. In "Website URL": `https://carrillo.app`
4. In "Trusted Domains", add:
   - `carrillo.app`
   - `carrilloapps.vercel.app`
   - `*.vercel.app` (for previews)
   - `localhost` (for development)

### 4. Vercel Configuration

**Environment Variables:**
- Project Settings → Environment Variables
- Add for Production, Preview, Development:

```env
# Production
NEXT_PUBLIC_DISQUS_SHORTNAME=carrilloapps
NEXT_PUBLIC_SITE_URL=https://carrillo.app

# Preview
NEXT_PUBLIC_SITE_URL=https://carrilloapps-git-[branch].vercel.app

# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Implementation

### Disqus Component

**Location:** `components/disqus-comments.tsx`

**Props:**
```typescript
interface DisqusCommentsProps {
  postId: string        // Unique post identifier
  postTitle: string     // Post title
  postSlug: string      // Post URL slug
}
```

**Usage:**
```tsx
import { DisqusComments } from '@/components/disqus-comments'

<DisqusComments
  postId="blog-post-123"
  postTitle="My Blog Post Title"
  postSlug="my-blog-post-slug"
/>
```

### useDisqusComments Hook

**Location:** `hooks/use-disqus-comments.tsx`

**Features:**
- ✅ Multiple retrieval methods for comment count
- ✅ Loading state
- ✅ Error handling
- ✅ Automatic fallbacks
- ✅ TypeScript support

**Complete Hook:**
```tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const { count, isLoading, error } = useDisqusComments(articleSlug)

  if (isLoading) {
    return <span>Loading comments...</span>
  }

  if (error) {
    return <span>Comments unavailable</span>
  }

  return (
    <span>
      {count} {count === 1 ? 'comment' : 'comments'}
    </span>
  )
}
```

**Simplified Hook:**
```tsx
import { useCommentCount } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const commentCount = useCommentCount(articleSlug)

  return <span>{commentCount} comments</span>
}
```

## Hook Behavior

### Retrieval Strategy

The hook uses a multi-method approach:

1. **Disqus API** - Direct API call to get accurate count
2. **Thread Count API** - Alternative API endpoint
3. **DOM Scraping** - Fallback by reading Disqus-injected elements

### Optimization

- **Script loading**: Prevents duplicate Disqus script injections
- **Caching**: Stores counts to reduce API calls
- **Debouncing**: Prevents excessive API requests

## Troubleshooting

### Comments Don't Appear

**Symptom:** Disqus widget doesn't load on production

**Solutions:**

1. **Check environment variables** in Vercel:
   ```bash
   # Verify these are set
   NEXT_PUBLIC_DISQUS_SHORTNAME
   NEXT_PUBLIC_SITE_URL
   ```

2. **Verify trusted domains** in Disqus Admin:
   - Must include production domain
   - Must include Vercel preview domains
   - Must include localhost for development

3. **Clear cache:**
   - Browser cache (Ctrl+Shift+R)
   - Vercel deployment cache
   - Disqus cache (wait 5-10 minutes)

### Error: "We were unable to load Disqus"

**Causes:**
- Domain not in Disqus trusted domains list
- Incorrect NEXT_PUBLIC_SITE_URL value
- CORS issues

**Solutions:**
1. Add domain to Disqus trusted domains
2. Verify URL matches exactly (https vs http)
3. Check browser console for specific errors

### Comments Appear on Wrong Site

**Cause:** Incorrect URL passed to Disqus causing identifier mismatch

**Solution:**
```tsx
// Ensure correct URL format
const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${postSlug}`

// Disqus config
config={{
  url: url,
  identifier: postId,
  title: postTitle
}}
```

### Comment Count Shows 0

**Causes:**
- Disqus hasn't indexed the page yet
- Incorrect identifier
- Comments exist but aren't approved

**Solutions:**
1. Wait 24-48 hours for Disqus to index new pages
2. Verify identifier matches between widget and hook
3. Check Disqus Admin → Comments → Pending for unapproved comments

### Development vs Production Issues

**Symptom:** Works locally but not on Vercel

**Solutions:**

1. **Check environment-specific URLs:**
   ```typescript
   // Use environment detection
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
   ```

2. **Verify Vercel environment variables:**
   - Go to Vercel Dashboard
   - Check each environment (Development, Preview, Production)
   - Ensure variables are set for all environments

3. **Test with Vercel Preview:**
   - Create a preview deployment
   - Add preview URL to Disqus trusted domains
   - Test before pushing to production

### CORS Errors

**Symptom:** Console shows "blocked by CORS policy"

**Solutions:**
1. Ensure domain is in Disqus trusted domains
2. Use correct URL format (no trailing slashes)
3. Match protocol (http vs https)

## Advanced Configuration

### Custom Styles

Disqus supports custom CSS through their admin panel:

1. Disqus Admin → Settings → Appearance
2. Add custom CSS rules
3. Match your site's design system

### Moderation

**Auto-moderation rules:**
- Disqus Admin → Settings → Community
- Configure spam filters
- Set comment approval workflows

### Analytics

**Track comment engagement:**
```typescript
// Track when comments are viewed
if (window.gtag) {
  window.gtag('event', 'comments_viewed', {
    event_category: 'engagement',
    event_label: postTitle
  })
}
```

## Best Practices

1. **Use unique identifiers:** Ensure each post has unique `postId`
2. **Consistent URLs:** Always use absolute URLs with protocol
3. **Test environments:** Test in development, preview, and production
4. **Monitor spam:** Regularly check Disqus moderation panel
5. **Backup comments:** Export comments regularly from Disqus Admin

## File Structure

```
hooks/
  └── use-disqus-comments.tsx     # Comment count hook

components/
  └── disqus-comments.tsx         # Disqus widget component

app/
  blog/
    └── [slug]/
        └── page.tsx              # Blog post with comments

.env.local                        # Environment variables
docs/
  └── DISQUS.md                   # This file
```

## API Reference

### useDisqusComments

```typescript
interface UseDisqusCommentsReturn {
  count: number          // Comment count
  isLoading: boolean     // Loading state
  error: string | null   // Error message if any
}

function useDisqusComments(articleSlug: string): UseDisqusCommentsReturn
```

### useCommentCount

```typescript
function useCommentCount(articleSlug: string): number
```

Returns comment count directly (0 if loading/error).

---

**Version**: 1.0.0 (Jan 2026)  
**Maintained by**: José Carrillo (junior@carrillo.app)
