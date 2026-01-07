/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization for Next.js 16 + Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year in seconds
    qualities: [75, 90], // Support both default and high quality
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'media.fashionnetwork.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bancolombia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.metropolitan-touring.com',
      },
      {
        protocol: 'https',
        hostname: 'almipro.com',
      },
    ],
  },
  
  // Performance optimizations for Next.js 16
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'recharts',
    ],
    // Web Vitals attribution for debugging (Vercel Analytics compatible)
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    // Aggressive CSS optimization - inline critical CSS
    optimizeCss: true, // Enable automatic CSS optimization
    cssChunking: 'strict', // Strict CSS chunking for optimal loading
    // Optimize server actions
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  
  // Cache components - Disabled due to strict prerendering requirements
  // Causes errors with Date.now(), fetch() timing, and RSS client
  // cacheComponents: true,
  
  // React Compiler optimization (Next.js 16+)
  // Disabled - requires babel-plugin-react-compiler
  reactCompiler: false,
  
  // Transpile packages for better compatibility
  transpilePackages: ['framer-motion'],
  
  // Module optimization - use native ESM when possible
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // Remove React props in production for smaller bundle
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy - Comprehensive security configuration
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-scripts.com https://*.vercel-insights.com https://va.vercel-scripts.com https://js.hs-scripts.com https://js.hsforms.net https://js.hscollectedforms.net https://js.hs-analytics.net https://js.usemessages.com https://cdnjs.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http: https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.vercel.app https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.medium.com https://api.github.com https://gitlab.com https://www.googleapis.com https://forms.hsforms.com https://*.cloudflareinsights.com https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms",
              "frame-src 'self' https://forms.hsforms.com https://www.youtube.com https://www.youtube-nocookie.com",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://forms.hsforms.com",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=(), serial=(), bluetooth=(), document-domain=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // CSS files - specific pattern for app router
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
      },
      // CSS files - general pattern
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
      },
      // All other static files
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js optimized images
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Static images from public folder
      {
        source: '/profile.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,avif,ico,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // SEO redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
