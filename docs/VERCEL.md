# Vercel Deployment Guide

Deployment pipeline, build configuration and environment variables.

## Deployment pipeline

- **Production** — push to `main` auto-deploys. Domain: `carrillo.app`.
- **Preview** — every branch and PR gets its own URL.
- **Rollback** — Deployments → pick a known-good one → `…` → **Promote to
  Production**. Instant, no rebuild.

### Build configuration (`vercel.json`)

```jsonc
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"], // US East, closest to the audience
  "functions": {
    "src/app/api/**/*.ts": { "maxDuration": 10, "memory": 512 },
  },
  "headers": [/* security headers */],
}
```

### What is excluded from the build (`.vercelignore`)

Agent tooling directories — `.agents`, `.claude`, `.opencode`, `.codegraph`,
`.docgraph`, `.specify`, `.skill-rules`, `.impeccable` — plus `.github` and
`docs`. None of them are part of the app, and uploading them has crashed
`next build` tracing before. Do not remove those entries.

### After deploying

1. Load the production URL and confirm it renders.
2. Exercise the critical flows: navigation, contact form, latest posts.
3. Confirm analytics events fire (GA4 real-time).
4. Read the deployment log for warnings, not just for failures.

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

| Variable                       | Development             | Preview                                        | Production             |
| ------------------------------ | ----------------------- | ---------------------------------------------- | ---------------------- |
| `NEXT_PUBLIC_SITE_URL`         | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_BASE_URL`         | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | `carrilloapps`          | `carrilloapps`                                 | `carrilloapps`         |

## Automatic Vercel Variables

Vercel automatically provides these variables:

- `VERCEL=1`: Indicates the code is running on Vercel
- `VERCEL_URL`: Current deployment URL
- `VERCEL_ENV`: Current environment (development, preview, production)
- `VERCEL_REGION`: Region where the code is running

### Usage in Code

```typescript
// Detect if we're on Vercel
const isVercel = process.env.VERCEL === "1"

// Get the deployment URL
const deploymentUrl = process.env.VERCEL_URL

// Get the current environment
const environment = process.env.VERCEL_ENV

// Use the correct URL according to the environment
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
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

  return "http://localhost:3000"
}

// ❌ Bad practice: Hardcoded URL
const baseUrl = "https://carrillo.app"
```

### 4. Variable Validation

```typescript
// utils/env.ts
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || "carrilloapps",
  DISQUS_API_KEY: process.env.DISQUS_API_KEY,
} as const

// Validate required variables
if (!env.NEXT_PUBLIC_DISQUS_SHORTNAME) {
  throw new Error("NEXT_PUBLIC_DISQUS_SHORTNAME is required")
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

## Environment variable troubleshooting

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

## Build and runtime troubleshooting

| Symptom                            | First thing to check                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Build fails                        | Reproduce with `npm run build` locally; then delete `.next`; then `node_modules` + `package-lock.json` and reinstall           |
| `only supported with webpack`      | A `next.config.mjs` option that Turbopack rejects. `experimental.cssChunking` was removed for exactly this reason in Next 16.3 |
| Hydration error                    | Client-only code running in a server component                                                                                 |
| Image not optimizing               | Asset must be in `public/` or match a `remotePatterns` entry                                                                   |
| API route 404/500                  | Handler must export named `GET`/`POST` functions                                                                               |
| Function timeout                   | `vercel.json` caps `src/app/api/**` at 10s — redesign, do not raise blindly                                                    |
| Variables undefined in the browser | Missing `NEXT_PUBLIC_` prefix                                                                                                  |
| Low contrast flagged by Lighthouse | Text below `text-zinc-300`                                                                                                     |
| Missing form label                 | `htmlFor` on the label must match the input `id`                                                                               |

---

## Resources

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel CLI](https://vercel.com/docs/cli)
