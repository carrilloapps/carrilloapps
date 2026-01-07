# carrillo.app Documentation

Personal portfolio and professional website for José Carrillo, Tech Lead at Yummy Inc.

## ⚠️ Documentation Guidelines

**Before creating any new documentation:**

1. **Check if the topic already exists** in any of the files listed below
2. **Update existing files** instead of creating new ones
3. **Consolidate related information** in a single file
4. Only create new files for completely new topics that don't fit existing structure

See `../AGENTS.md` → "Documentation Best Practices" section for detailed guidelines.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Documentation Index

### Core Documentation
- **[Project Overview](./PROJECT.md)** - Technology stack, features, and architecture
- **[Development Guide](./DEVELOPMENT.md)** - Setup, contributing, and development workflow

### Integration Guides
- **[Analytics](./ANALYTICS.md)** - Google Analytics 4 & Microsoft Clarity setup and tracking
- **[Disqus](./DISQUS.md)** - Blog comments integration and troubleshooting
- **[GitHub](./GITHUB.md)** - Repository integration and workflows
- **[Vercel](./VERCEL.md)** - Deployment configuration and best practices

### Technical Guides
- **[API Documentation](./API.md)** - API endpoints and usage
- **[Performance](./PERFORMANCE.md)** - Optimization strategies and metrics
- **[Translation](./TRANSLATION.md)** - Localization and i18n guidelines
- **[Page Consistency](./PAGE_CONSISTENCY.md)** - UI/UX standards and patterns

### Project Resources
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Changelog](../CHANGELOG.md)
- [Security Policy](../SECURITY.md)

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router + Turbopack)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.19
- **Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion 12.24.7
- **Deployment**: Vercel

## Key Features

- ✅ Portfolio showcase with project galleries
- ✅ Blog with Medium RSS integration
- ✅ Professional services section
- ✅ Contact form with rate limiting
- ✅ Appointment scheduling
- ✅ GitHub/GitLab repository integration
- ✅ Analytics tracking (GA4 + Clarity)
- ✅ SEO optimized with structured data
- ✅ Responsive design (mobile-first)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Dark theme with glassmorphism effects

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── analytics/         # Analytics integrations
│   └── ui/                # shadcn/ui components
├── data/                  # Static data (projects, config)
├── docs/                  # Documentation (you are here)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript definitions
```

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def

# Disqus
NEXT_PUBLIC_DISQUS_SHORTNAME=your-shortname
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact Form
CONTACT_EMAIL_TO=your@email.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues

# Deployment
git push                 # Auto-deploys to Vercel
```

## Getting Help

- **Discussions**: [GitHub Discussions](https://github.com/carrilloapps/carrilloapps/discussions)
- **Issues**: [GitHub Issues](https://github.com/carrilloapps/carrilloapps/issues)
- **Email**: junior@carrillo.app

## Contributing

Contributions are welcome! See [Contributing Guidelines](../CONTRIBUTING.md) for details.

## License

**PRIVATE** - Proprietary software. See [LICENSE.md](../LICENSE.md) for details.

---

**Version**: 2.0.0 (Jan 2026)  
**Maintained by**: José Carrillo (junior@carrillo.app)  
**Last Updated**: January 7, 2026

