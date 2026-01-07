# Analytics Integration Documentation

## Overview

CarrilloApps integrates two complementary analytics platforms:

1. **Google Analytics 4 (GA4)** - Comprehensive web analytics
2. **Microsoft Clarity** - User behavior analytics with session recordings

## Features

### Google Analytics 4
- ✅ Page view tracking
- ✅ Event tracking
- ✅ User engagement metrics
- ✅ Traffic source analysis
- ✅ Conversion tracking
- ✅ Real-time analytics
- ✅ GDPR compliant (respects cookie consent)

### Microsoft Clarity
- ✅ Session recordings
- ✅ Heatmaps (click, scroll, attention)
- ✅ Rage clicks detection
- ✅ Dead clicks detection
- ✅ Excessive scrolling detection
- ✅ JavaScript errors tracking
- ✅ GDPR compliant (respects cookie consent)

## Setup Instructions

### 1. Google Analytics 4

1. **Create GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" → "Create Property"
   - Follow the setup wizard
   - Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

2. **Configure Environment Variable**:
   ```bash
   # In .env.local (local development)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Vercel Deployment**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your Measurement ID
   - Available in: Production, Preview, Development

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

## Custom Event Tracking (GA4)

### Track Button Clicks

```typescript
// In any client component
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", "button_click", {
    event_category: "engagement",
    event_label: "Contact Button",
    value: 1,
  });
}
```

### Track Form Submissions

```typescript
window.gtag("event", "form_submit", {
  event_category: "engagement",
  event_label: "Contact Form",
  form_name: "contact",
});
```

### Track Downloads

```typescript
window.gtag("event", "file_download", {
  event_category: "engagement",
  event_label: "Resume PDF",
  file_name: "jose-carrillo-cv.pdf",
  file_extension: "pdf",
});
```

### Track Outbound Links

```typescript
window.gtag("event", "click", {
  event_category: "outbound",
  event_label: "GitHub Profile",
  transport_type: "beacon",
  link_url: "https://github.com/username",
});
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

## Testing

### Local Testing

1. **Enable analytics in development**:
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def
   ```

2. **Accept cookie consent** in the banner

3. **Open browser DevTools** → Network tab

4. **Look for requests to**:
   - `www.google-analytics.com`
   - `www.clarity.ms`

### Production Testing

1. **Deploy to Vercel** with environment variables

2. **Visit production site**

3. **Open GA4 Real-Time Report**:
   - Go to Analytics → Reports → Realtime
   - Should see your visit

4. **Open Clarity Dashboard**:
   - Go to Clarity → Dashboard
   - Should see session recording (after ~1 minute)

## Troubleshooting

### Analytics Not Loading

**Problem**: Scripts don't load after accepting consent

**Solutions**:
1. Check environment variables are set
2. Check browser console for CSP errors
3. Verify consent is saved in localStorage
4. Hard refresh (Ctrl+Shift+R)

### GA4 Not Showing Data

**Problem**: No data in GA4 dashboard

**Solutions**:
1. Wait 24-48 hours (initial setup delay)
2. Check Measurement ID format (`G-XXXXXXXXXX`)
3. Verify Real-Time report shows activity
4. Check Data Filters in GA4 settings

### Clarity Not Recording

**Problem**: No session recordings in Clarity

**Solutions**:
1. Wait ~5 minutes (processing delay)
2. Check Project ID format (no special characters)
3. Verify cookies are enabled
4. Check for ad blockers (disable temporarily)

### CSP Violations

**Problem**: Console shows "Refused to load script"

**Solutions**:
1. Verify `next.config.mjs` CSP includes analytics domains
2. Rebuild project: `npm run build`
3. Clear browser cache
4. Check Vercel deployment logs for CSP headers

## File Structure

```
components/
  analytics/
    ├── google-analytics.tsx      # GA4 component
    ├── microsoft-clarity.tsx     # Clarity component
    └── index.ts                  # Barrel export

app/
  └── layout.tsx                  # Analytics integration

next.config.mjs                   # CSP configuration
.env.example                      # Environment variables template
docs/
  └── ANALYTICS.md                # This file
```

## Additional Resources

### Google Analytics 4
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

### Microsoft Clarity
- [Clarity Setup Guide](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)
- [Clarity Masking Settings](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Clarity API Documentation](https://docs.microsoft.com/en-us/clarity/api-reference/)

### Privacy & Compliance
- [GDPR Compliance Guide](https://gdpr.eu/compliance/)
- [Google Analytics GDPR](https://support.google.com/analytics/answer/9019185)
- [Clarity Privacy](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-security)

---

**Last Updated**: 2026-01-07
**Version**: 1.0.0
**Maintained by**: José Carrillo (m@carrillo.app)
