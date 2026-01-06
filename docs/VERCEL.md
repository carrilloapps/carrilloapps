# Vercel Deployment Guide

This document explains how to correctly configure environment variables for deployment on Vercel.

## Environment Variables in Vercel

### Configuration in Vercel Dashboard

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** > **Environment Variables**
3. Configure the following variables:

#### Public Variables (NEXT_PUBLIC_*)

These variables are exposed to the browser and included in the JavaScript bundle:

```
NEXT_PUBLIC_SITE_URL=https://carrillo.app
NEXT_PUBLIC_BASE_URL=https://carrillo.app
NEXT_PUBLIC_DISQUS_SHORTNAME=carrilloapps
```

#### Private Variables (Server-only)

These variables are only available on the server:

```
DISQUS_API_KEY=your_disqus_api_key_here
DISQUS_API_SECRET=your_disqus_api_secret_here
DISQUS_ACCESS_TOKEN=your_disqus_access_token_here
```

### Configuration by Environment

Vercel allows you to configure environment-specific variables:

- **Development**: For `vercel dev` and local development
- **Preview**: For preview deployments (branches)
- **Production**: For production deployment

#### Recommended Configuration:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | `carrilloapps` | `carrilloapps` | `carrilloapps` |

## Automatic Vercel Variables

Vercel automatically provides these variables:

- `VERCEL=1`: Indicates the code is running on Vercel
- `VERCEL_URL`: Current deployment URL
- `VERCEL_ENV`: Current environment (development, preview, production)
- `VERCEL_REGION`: Region where the code is running

### Usage in Code

```typescript
// Detect if we're on Vercel
const isVercel = process.env.VERCEL === '1'

// Get the deployment URL
const deploymentUrl = process.env.VERCEL_URL

// Get the current environment
const environment = process.env.VERCEL_ENV

// Use the correct URL according to the environment
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
```

## Best Practices

### 1. Correct Prefixes

- ✅ `NEXT_PUBLIC_*`: Variables exposed to the browser
- ✅ Without prefix: Server-only variables
- ❌ Do not use `REACT_APP_*` (that's for Create React App)

### 2. Security

- ✅ Never put secrets in `NEXT_PUBLIC_*` variables
- ✅ Use private variables for API keys and tokens
- ✅ Configure variables in Vercel Dashboard, not in `.env` files

### 3. Dynamic URLs

```typescript
// ✅ Good practice: Dynamic URL according to environment
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  return 'http://localhost:3000'
}

// ❌ Bad practice: Hardcoded URL
const baseUrl = 'https://carrillo.app'
```

### 4. Variable Validation

```typescript
// utils/env.ts
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || 'carrilloapps',
  DISQUS_API_KEY: process.env.DISQUS_API_KEY,
} as const

// Validate required variables
if (!env.NEXT_PUBLIC_DISQUS_SHORTNAME) {
  throw new Error('NEXT_PUBLIC_DISQUS_SHORTNAME is required')
}
```

## Vercel CLI Commands

### Sync Local Variables

```bash
# Download environment variables from Vercel
vercel env pull .env.local

# List environment variables
vercel env ls

# Add a new variable
vercel env add VARIABLE_NAME

# Remove a variable
vercel env rm VARIABLE_NAME
```

### Local Development

```bash
# Use Vercel variables in local development
vercel dev

# Or use Next.js with local variables
npm run dev
```

## Troubleshooting

### Variables not updating

1. Verify the variable is configured in the correct environment
2. Redeploy the project after changing variables
3. For `NEXT_PUBLIC_*` variables, you need to rebuild

### Variables undefined in client

1. Verify they have the `NEXT_PUBLIC_` prefix
2. Restart the development server
3. Check for typos in the variable name

### Variables not available in Edge Runtime

- Variables in `.env*` files are not available in Edge Runtime
- Configure all variables in Vercel Dashboard
- Use variables with `NEXT_PUBLIC_` prefix for the client

## Resources

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel CLI](https://vercel.com/docs/cli)