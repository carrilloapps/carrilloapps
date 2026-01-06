# Disqus Configuration

This document explains how to configure Disqus to enable comments on the blog.

## Required Environment Variables

### Public Variables (Required)

```env
# Your site's shortname in Disqus
NEXT_PUBLIC_DISQUS_SHORTNAME=your-shortname-here

# Base URL of your site
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Optional Variables (For advanced features)

```env
# Disqus API Key (to get comment statistics)
DISQUS_API_KEY=your-api-key-here

# Disqus API Secret
DISQUS_API_SECRET=your-api-secret-here

# Disqus Access Token
DISQUS_ACCESS_TOKEN=your-access-token-here
```

## Step-by-Step Configuration

### 1. Create a Disqus account

1. Go to [https://disqus.com/](https://disqus.com/)
2. Create an account or sign in
3. Click "Get Started"
4. Select "I want to install Disqus on my site"

### 2. Configure your site

1. Enter your website name
2. Choose a category
3. Select a plan (you can start with the free plan)
4. **Important**: Write down the "shortname" that is automatically generated

### 3. Configure environment variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and update the variables:
   ```env
   NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

### 4. Advanced configuration (Optional)

To get comment statistics and advanced features:

1. Go to [https://disqus.com/api/applications/](https://disqus.com/api/applications/)
2. Create a new application
3. Get your API Key, API Secret and Access Token
4. Add these variables to your `.env.local`

### 5. Domain configuration in Disqus

1. Go to your Disqus admin panel
2. Navigate to Settings > General
3. In "Website URL", enter your domain: `https://your-domain.com`
4. In "Trusted Domains", add:
   - `your-domain.com`
   - `localhost` (for development)

## Component Features

The `DisqusComments` component includes:

- ✅ **Automatic loading**: Loads automatically when needed
- ✅ **Loading states**: Shows a skeleton while loading
- ✅ **Error handling**: Shows error messages if something fails
- ✅ **Comment counter**: Shows the number of comments
- ✅ **Environment variable configuration**: Easy configuration
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Animations**: Includes smooth animations with Framer Motion
- ✅ **Dark theme**: Designed for the site's dark theme

## Troubleshooting

### Comments don't appear

1. Verify that `NEXT_PUBLIC_DISQUS_SHORTNAME` is configured correctly
2. Make sure the domain is configured in Disqus
3. Check the browser console for errors

### Untrusted domain error

1. Go to your Disqus panel
2. Add your domain to "Trusted Domains"
3. Include both `your-domain.com` and `localhost`

### Comments don't sync between pages

This is normal. Each page has its own comment thread based on the unique `identifier`.

## Local Development

For local development, make sure to:

1. Have `localhost` in Disqus trusted domains
2. Use `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in development
3. Restart the development server after changing environment variables

## Production

For production:

1. Update `NEXT_PUBLIC_SITE_URL` with your real domain
2. Configure environment variables in your hosting platform
3. Verify that the domain is correctly configured in Disqus

## Support

If you have problems with the configuration:

1. Check the [official Disqus documentation](https://help.disqus.com/)
2. Verify the configuration in the Disqus admin panel
3. Check browser logs for specific errors