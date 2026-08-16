# carrillo.app Project Documentation

## Project Overview

carrillo.app is a personal portfolio and professional website for José Porfirio Carrillo Echenique, who operates publicly as Junior Carrillo, Tech Lead of the Financial Backoffice team at Yummy Inc. The site showcases skills, projects, blog content, professional services, and provides contact and appointment scheduling functionality.

## Technology Stack

- **Frontend Framework**: Next.js 16.3.1 (App Router + Turbopack)
- **UI Library**: React 19.2.8
- **Language**: TypeScript 6.0.3 (strict)
- **Styling**: Tailwind CSS 4.3.3 — v4, CSS-first, no `tailwind.config.*`
- **Component Library**: Radix UI primitives + shadcn/ui
- **Animations**: Framer Motion 13.1.0
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Form Handling**: React Hook Form with Zod validation
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Comments**: Disqus integration
- **Package Manager**: npm — all deps pinned with `~` (patch updates only)
- **Deployment**: Vercel

## Project Structure

Application code lives under `src/` (the Next.js `src` folder convention);
configuration, assets and project material stay in the root.

```text
src/
  app/          route segments, layouts, route handlers, globals.css
  components/   reusable UI (components/ui/ = shadcn + Radix primitives)
  hooks/        custom React hooks
  lib/          utilities, services, and static data in lib/data/
  types/        shared TypeScript types
public/         static assets — must stay in the root (Next requirement)
docs/           documentation
specs/          spec-kit feature specs
tests/          unit (Vitest) and e2e (Playwright)
```

The `@/*` path alias resolves to `src/*`, so imports read `@/components/...`,
`@/lib/env`, `@/types/project`.

## Key Features

### Core Features

1. **Portfolio Showcase**: Professional skills and experience display with project galleries
2. **Blog**: Articles on technology and development (Medium RSS integration)
3. **Services**: Professional services offered with detailed descriptions
4. **Contact Form**: Direct communication with rate limiting and spam protection
5. **Appointment Scheduling**: Calendar-based appointment booking system
6. **Project Gallery**: Interactive display of past and current projects with GitHub/GitLab integration
7. **Repository Integration**: Display of repositories and contributions from GitHub and GitLab

### Technical Features

1. **SEO Optimization**: Complete metadata, structured data (JSON-LD), sitemap, robots.txt
2. **Analytics Tracking**: Comprehensive GA4 and Clarity integration (25+ event types)
3. **Performance Optimized**: LCP < 2.5s, lighthouse score 95+/100
4. **Responsive Design**: Mobile-first approach with breakpoints for all devices
5. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
6. **Dark Theme**: Glassmorphism effects with animated backgrounds
7. **Cookie Consent**: GDPR-compliant consent management
8. **Progressive Enhancement**: Works without JavaScript for core content

## Build and Development

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later (this project uses package-lock.json)

### Installation

```bash
# Clone the repository
git clone https://github.com/carrilloapps/carrilloapps.git
cd carrilloapps

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The site will be available at <http://localhost:3000>.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## Testing

```bash
# Run linting
npm run lint
```

## Deployment

The project is set up for automatic deployment via GitHub Actions to Vercel when changes are pushed to the main branch.

## Environment Variables

The following environment variables are required for full functionality:

- `NEXT_PUBLIC_BASE_URL`: Base URL for the application
- `GITHUB_TOKEN`: GitHub API token for repository integration
- `GITLAB_TOKEN`: GitLab API token for repository integration
- `MEDIUM_USER_ID`: Medium user ID for blog integration
- `SMTP_HOST`: SMTP host for contact form
- `SMTP_PORT`: SMTP port
- `SMTP_USER`: SMTP username
- `SMTP_PASSWORD`: SMTP password
- `CONTACT_EMAIL`: Email to receive contact form submissions

## Architecture Decisions

### Why Next.js?

Next.js was chosen for its excellent SEO capabilities, server-side rendering, file-based routing, and integration with React. It provides a great developer experience and optimal performance for users.

### Why Radix UI?

Radix UI provides unstyled, accessible components that can be customized with TailwindCSS. This allows for a unique design while ensuring accessibility standards are met.

### Why TypeScript?

TypeScript adds type safety, better IDE integration, and helps catch errors early in development. It improves code quality and maintainability.

### Why TailwindCSS?

TailwindCSS allows for rapid UI development with utility classes, consistent design system implementation, and optimal production builds with minimal CSS.

## Best Practices

The project follows several best practices:

1. **Component-Based Architecture**: Reusable components for consistency
2. **Responsive Design**: Mobile-first approach
3. **Accessibility**: ARIA attributes, semantic HTML, keyboard navigation
4. **Performance Optimization**: Image optimization, code splitting, lazy loading
5. **SEO Best Practices**: Proper metadata, structured data
6. **Type Safety**: TypeScript for catching errors early
7. **State Management**: Appropriate use of React hooks and context
8. **Code Quality**: ESLint and Prettier configuration

## Common Tasks

### Adding a New Page

1. Create a new directory in the `/app` folder with the route name
2. Add a `page.tsx` file with the page component
3. Add metadata in the page component
4. Update navigation if necessary

### Creating a New Component

1. Add component file in `/components`
2. Use TypeScript interfaces for props
3. Implement responsive design
4. Consider accessibility requirements

### Adding Blog Content

Blog content is fetched from Medium using the Medium API. New articles published on Medium will automatically appear in the blog section.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## Contact and Support

For questions or support regarding this project, please contact José Porfirio Carrillo Echenique (Junior Carrillo) at <junior@carrillo.app>.
