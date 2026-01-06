# Changelog

All notable changes to CarrilloApps will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Performance Optimizations - 2026-01-06

#### Added
- **CSS Optimization**: Implemented strict CSS chunking for better loading performance
- **Font Optimization**: Added adjustFontFallback and preload headers for Inter font
- **Forced Reflow Fix**: Implemented requestAnimationFrame for all scroll operations
- **CSS Documentation**: Created comprehensive CSS_OPTIMIZATION.md guide
- **Polyfill Elimination**: Upgraded to ES2022 target, saving ~13.9 KiB

#### Changed
- **Site Header**: Optimized scroll handler with RAF batching (~57ms improvement)
- **Scroll Actions**: All scrollTo/scrollIntoView now use requestAnimationFrame
- **DNS Prefetch**: Moved Medium preconnects to blog page only (reduced global preconnects)
- **Cache Headers**: Optimized for Cloudflare CDN with CDN-Cache-Control
- **Vercel Config**: Reduced memory to 512MB for free tier optimization
- **Image Optimization**: Hero image without motion wrapper, reduced blur effects
- **Browserslist**: Targets modern browsers only (Chrome 90+, Safari 14+)

#### Fixed
- Forced reflow causing 57ms blocking in site-header scroll handler
- CSS blocking render (23.2 KiB → optimized with strict chunking)
- Font loading causing FOUT (added adjustFontFallback)
- Unused variable warning in repositories-list component

#### Documentation
- docs/CSS_OPTIMIZATION.md: Complete guide for CSS optimizations and Cloudflare config
- docs/PERFORMANCE_OPTIMIZATIONS.md: Updated with forced reflow fixes

### Enhanced Documentation
- Enhanced project documentation
- Added comprehensive GitHub workflow documentation

## [0.1.0] - 2025-05-15
### Added
- Initial project setup with Next.js 15.2.4
- Complete portfolio website structure
- Blog functionality
- Services section
- Contact form
- Appointment scheduling system
- Mobile-responsive design
- Dark/Light theme support
- Animated sections using Framer Motion
- SEO optimizations
- Cookie consent implementation
- GitHub and GitLab repositories integration
- Newsletter subscription form

### Technologies
- Next.js 15.2.4
- React 19
- TypeScript
- TailwindCSS
- Radix UI components
- Framer Motion for animations
- React Hook Form with Zod validation
- Recharts for data visualization

### Security
- Implemented best practices for form validation
- Added privacy policy and terms & conditions pages
- Cookie policy implementation
