# Analytics Integration

Complete guide for Google Analytics 4 and Microsoft Clarity integration in carrillo.app.

## Overview

CarrilloApps integrates two analytics platforms:
- **Google Analytics 4 (GA4)** - Web analytics and conversion tracking
- **Microsoft Clarity** - User behavior analytics with session recordings

## Quick Setup

### 1. Google Analytics 4

**Create GA4 Property:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Admin → Create Property → Copy Measurement ID (format: `G-XXXXXXXXXX`)

**Configure Environment:**
```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Vercel Deployment:**
- Project Settings → Environment Variables
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Production, Preview, Development

### 2. Microsoft Clarity

1. **Create Clarity Project**:
   - Go to [Microsoft Clarity](https://clarity.microsoft.com/)
   - Click "Add new project"
   - Enter website details
   - Copy your **Project ID** (format: `abc123def`)

2. **Configure Environment Variable**:
   ```bash
   # In .env.local (local development)
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def
   ```

3. **Vercel Deployment**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLARITY_PROJECT_ID` with your Project ID
   - Available in: Production, Preview, Development

## Cookie Consent Integration

Both analytics platforms respect user cookie preferences through the existing cookie consent banner.

### How It Works

1. **User visits site** → Cookie consent banner appears
2. **User accepts analytics** → Analytics scripts load
3. **User rejects analytics** → Analytics scripts don't load
4. **User changes consent** → Scripts load/unload dynamically

### Consent Storage

Consent is stored in `localStorage` with this structure:

```json
{
  "necessary": true,
  "analytics": true,  // Controls GA4 + Clarity
  "marketing": false,
  "preferences": false
}
```

### Consent Events

Components listen to the `cookieConsentChange` event:

```typescript
window.addEventListener("cookieConsentChange", () => {
  // Re-check consent and load/unload scripts
});
```

## Tracking Library

**Location:** `lib/analytics.ts` - Centralized tracking utilities with 25+ functions

### Core Functions

**Generic Events:**
```typescript
trackEvent(action: string, category: string, label?: string, value?: number)
```

**Button Interactions:**
```typescript
trackButtonClick(label: string, location: string)
trackCTAClick(label: string, variant: 'primary' | 'secondary', location: string)
```

**Navigation:**
```typescript
trackNavigation(label: string, href: string, location: string)
```

**Forms:**
```typescript
trackFormStart(formName: string)
trackFormSubmit(formName: string, success: boolean)
```

**Content:**
```typescript
trackSearch(query: string, category?: string)
trackProjectView(projectName: string, category?: string)
trackBlogPostView(title: string, slug: string, category?: string)
trackScrollDepth(percentage: number)
```

**Social & External:**
```typescript
trackSocialClick(platform: string, location: string)
trackNewsletterSignup(location: string)
```

**Microsoft Clarity:**
```typescript
clarityTag(key: string, value: string)
clarityIdentify(userId: string, sessionId?: string, pageId?: string)
```

## Implementation Coverage

### Header (`components/site-header.tsx`)
- ✅ Desktop/mobile navigation links → `trackNavigation()`
- ✅ Mega menu sub-items → `trackNavigation()`
- ✅ Logo clicks → `trackNavigation()`
- ✅ "Agéndame" CTA buttons (3 variants) → `trackCTAClick()`

### Footer (`components/site-footer.tsx`)
- ✅ Social media links → `trackSocialClick()`
- ✅ Footer navigation → `trackNavigation()`
- ✅ Newsletter form → `trackNewsletterSignup()`
- ✅ Legal links → `trackNavigation()`

### Contact Page (`app/contacto/page.tsx`)
- ✅ Form lifecycle → `trackFormStart()` / `trackFormSubmit()`
- ✅ Social media CTAs → `trackSocialClick()`
- ✅ Contact reveals (phone, email) → `trackEvent()`

### Blog (`app/blog/page.tsx`, `components/blog-posts.tsx`)
- ✅ Search queries → `trackSearch()`
- ✅ Category filtering → `trackEvent()`
- ✅ Blog post views → `trackBlogPostView()`

### Repositories (`components/repositories-list.tsx`)
- ✅ Repository clicks → `trackEvent()`
- ✅ Search filters → `trackSearch()`

### Resources (`app/recursos/page.tsx`)
- ✅ Resource CTAs → `trackCTAClick()`

### Services (`app/servicios/page.tsx`)
- ✅ Service selection → `trackEvent()`
- ✅ CTA buttons → `trackCTAClick()`

### Home (`app/page.tsx`)
- ✅ Hero CTAs → `trackCTAClick()`
- ✅ Scroll depth (25%, 50%, 75%, 100%) → `trackScrollDepth()`
- ✅ Project views → `trackProjectView()`

## Usage Examples

### Track Button Click
```typescript
import { trackButtonClick } from '@/lib/analytics'

<button onClick={() => trackButtonClick('Download CV', 'hero')}>
  Download CV
</button>
```

### Track Form Submission
```typescript
import { trackFormStart, trackFormSubmit } from '@/lib/analytics'

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

### Track Search
```typescript
import { trackSearch } from '@/lib/analytics'

const handleSearch = (query: string) => {
  trackSearch(query, 'blog')
}
```

### Track Scroll Depth
```typescript
import { trackScrollDepth } from '@/lib/analytics'

useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100
    
    if (scrollPercentage >= 25 && !tracked25) {
      trackScrollDepth(25)
      setTracked25(true)
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

## Performance Impact

### Load Strategy

Both analytics use `strategy="afterInteractive"` which:
- ✅ Loads after page is interactive
- ✅ Doesn't block initial render
- ✅ Doesn't affect LCP or FCP
- ✅ Minimal impact on performance scores

### Bundle Size

- **Google Analytics**: ~17 KB (gzipped)
- **Microsoft Clarity**: ~6 KB (gzipped)
- **Total**: ~23 KB (acceptable for analytics)

### Best Practices

1. **Don't track in development**:
   ```typescript
   if (process.env.NODE_ENV === "production" && gaId) {
     // Track event
   }
   ```

2. **Batch events** when possible to reduce requests

3. **Use `beacon` transport** for critical events (form submissions, link clicks)

## Security & Privacy

### CSP Configuration

Content Security Policy has been updated to allow:

**script-src**:
- `https://www.googletagmanager.com`
- `https://www.google-analytics.com`
- `https://www.clarity.ms`

**connect-src**:
- `https://www.google-analytics.com`
- `https://analytics.google.com`
- `https://*.clarity.ms`

**img-src**:
- `https://www.google-analytics.com`
- `https://www.googletagmanager.com`

### Data Protection

Both platforms comply with:
- ✅ GDPR (General Data Protection Regulation)
- ✅ CCPA (California Consumer Privacy Act)
- ✅ PECR (Privacy and Electronic Communications Regulations)

### Anonymization

**Google Analytics**:
- IP anonymization: Enabled by default in GA4
- User ID: Not collected
- Demographics: Optional

**Microsoft Clarity**:
- Personal data masking: Enabled by default
- Input fields: Masked automatically
- Payment info: Never recorded

## Verification

### Local Testing
1. Open browser DevTools → Console
2. Navigate through the site
3. Check for analytics events (development mode shows console logs)

### GA4 Dashboard
1. Go to [Google Analytics](https://analytics.google.com/)
2. Reports → Realtime to see live events
3. Reports → Events to see all tracked events

### Clarity Dashboard
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Select your project
3. View recordings, heatmaps, and insights

## Features

### Google Analytics 4
- ✅ Page view tracking
- ✅ Custom event tracking (25+ functions)
- ✅ User engagement metrics
- ✅ Traffic source analysis
- ✅ Conversion tracking
- ✅ Real-time analytics
- ✅ GDPR compliant (cookie consent)

### Microsoft Clarity
- ✅ Session recordings
- ✅ Heatmaps (click, scroll, attention)
- ✅ Rage clicks detection
- ✅ Dead clicks detection
- ✅ Excessive scrolling detection
- ✅ JavaScript errors tracking
- ✅ GDPR compliant (cookie consent)

## Privacy & Compliance

Both platforms respect the cookie consent system in `components/cookie-consent.tsx`.

**Cookie Consent Integration:**
```typescript
// Only loads when user accepts analytics cookies
const cookieConsent = localStorage.getItem('cookieConsent')
if (cookieConsent === 'accepted') {
  // Load analytics scripts
}
```

## File Structure

```
lib/
  └── analytics.ts                # Tracking library (25+ functions)

components/
  analytics/
    ├── google-analytics.tsx      # GA4 component
    ├── microsoft-clarity.tsx     # Clarity component
    └── index.ts                  # Barrel export

app/
  └── layout.tsx                  # Analytics integration

next.config.mjs                   # CSP configuration
```

## Best Practices

1. **Event Naming**: Use consistent naming conventions
2. **Categories**: Group related events for better analysis
3. **Privacy**: Always respect user privacy and cookie consent
4. **Performance**: Track critical interactions, avoid over-tracking
5. **Testing**: Test analytics in staging before production

## Troubleshooting

### Analytics Not Loading
- Verify environment variables are set correctly
- Check cookie consent is accepted
- Clear browser cache and cookies
- Verify scripts load in Network tab

### Events Not Appearing in GA4
- Wait 24-48 hours for full data processing
- Check Realtime reports for immediate feedback
- Verify Measurement ID is correct

### Clarity Not Recording
- Verify Project ID is correct
- Check browser console for errors
- Ensure cookie consent is accepted
- Clarity requires 100+ sessions for heatmaps

---

**Version**: 2.0.0 (Jan 2026) - Complete site coverage with 25+ tracking functions  
**Maintained by**: José Carrillo (junior@carrillo.app)
