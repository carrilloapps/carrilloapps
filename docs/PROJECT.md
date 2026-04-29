# carrillo.app Project Documentation

## Project Overview

carrillo.app is a personal portfolio and professional website for José Carrillo, Tech Lead of the Financial Backoffice team at Yummy Inc. The site showcases skills, projects, blog content, professional services, and provides contact and appointment scheduling functionality.

## Technology Stack

- **Frontend Framework**: Next.js 16.1.1 (App Router + Turbopack)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.19
- **Component Library**: Radix UI primitives + shadcn/ui
- **Animations**: Framer Motion 12.24.7
- **Form Handling**: React Hook Form with Zod validation
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Comments**: Disqus integration
- **Package Manager**: npm
- **Deployment**: Vercel

## Project Structure

The project follows a standard Next.js application structure:

- `/app`: Contains all page components organized by route
- `/components`: Reusable UI components
- `/components/ui`: Shadcn UI component library implementations
- `/data`: Static data files
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and libraries
- `/public`: Static assets
- `/styles`: Global styles
- `/types`: TypeScript type definitions

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
8. **SEO Optimization**: Complete metadata, structured data (JSON-LD), sitemap, robots.txt
9. **Analytics Tracking**: Comprehensive GA4 and Clarity integration (25+ event types)
10. **Performance Optimized**: LCP < 2.5s, lighthouse score 95+/100
11. **Responsive Design**: Mobile-first approach with breakpoints for all devices
12. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
13. **Dark Theme**: Glassmorphism effects with animated backgrounds
14. **Cookie Consent**: GDPR-compliant consent management
15. **Progressive Enhancement**: Works without JavaScript for core content

## Build and Development

### Prerequisites

- Node.js 20.x or later
- pnpm 8.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/carrilloapps/carrilloapps.git
cd carrilloapps

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The site will be available at http://localhost:3000.

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## Testing

```bash
# Run linting
pnpm lint
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

For questions or support regarding this project, please contact José Carrillo at junior@carrillo.app.
