# Development Guide

Setup, commands, the quality gate and the testing workflow.

## Quick start

```bash
npm install          # dependencies
npm run skills:all   # agent skills (see AGENT_TOOLING.md)
npm run dev          # http://localhost:3000
```

## Commands

```bash
npm run dev            # dev server
npm run build          # production build — must succeed before commit
npm run start          # serve the production build
npm run lint           # ESLint — must be 0 errors / 0 warnings
npm run lint:fix       # auto-fix
npm run format         # Prettier write
npm run format:check   # Prettier check
npm test               # Vitest, single run
npm run test:watch     # Vitest watch
npm run test:e2e       # Playwright
npm run analyze        # bundle analyzer (ANALYZE=true next build)
npm run mcp:check      # verify .mcp.json and opencode.json agree
```

Agent tooling commands (`skills:*`) are documented in
[AGENT_TOOLING.md](AGENT_TOOLING.md).

## The quality gate (non-negotiable)

Constitution Principle IV. Run before every commit:

```bash
npm run lint     # 0 errors AND 0 warnings
npm run build    # must succeed, TypeScript is strict
npm test         # when touching covered code
```

- ✅ 0 ESLint errors, 0 ESLint warnings — "only warnings" is a failing state
- ✅ Build succeeds, TypeScript clean
- ✅ No unused imports, no unused variables
- ✅ No `any` — use a specific type or `unknown`

Husky + lint-staged run `eslint --fix` and `prettier --write` on staged files,
but they are a convenience, not the gate. Commits that do not meet the bar are
rejected.

### Pre-merge checklist

1. `npm run build` succeeds
2. `npm run lint` reports 0 / 0
3. `npm test` and `npm run test:e2e` pass
4. Lighthouse accessibility ≥ 95 and performance ≥ 90, mobile **and** desktop
5. Every page has metadata and structured data ([SEO.md](SEO.md))

Lighthouse can be driven headlessly through the `chrome-devtools` MCP
(`lighthouse_audit`) instead of opening DevTools by hand.

### Running the whole gate in Docker

`Dockerfile.validate` runs every check on a clean machine, installed from the
lockfile — which is what makes "it passes here" mean something. Two targets:
`validate` (Node 24: lint, format, markdown, typecheck, unit tests, build,
audit, MCP parity) and `e2e` (the Playwright image, pinned to the same version
as `package.json`, with the browsers already in it).

On WSL with Docker Desktop, the Linux socket is usually not exposed to the
distro, so the Windows CLI talks to the engine and the build context goes in
over **stdin** as a tar — no `\\wsl.localhost` path ever reaches the daemon:

```bash
DK="/mnt/c/Program Files/Docker/Docker/resources/bin/docker.exe"

tar --exclude=./node_modules --exclude=./.next --exclude=./.git \
    --exclude=./.env --exclude='./.env.*' --exclude=./.vercel \
    --exclude=./.insforge --exclude=./.memory -czf - . \
  | "$DK" build --target validate -f Dockerfile.validate -t carrilloapps-validate:local -

"$DK" run --rm carrilloapps-validate:local sh -lc "npm run lint && npx tsc --noEmit && npm test"
```

On a machine with a working Linux socket the plain `docker build .` form works
and this is unnecessary.

`.dockerignore` keeps `.env*`, `.vercel` and `.insforge` out of the context: a
build context is not a mount, so anything in it is baked into a layer and
survives there even if a later step deletes it. It deliberately **keeps**
`docs/` and the Markdown, because `prettier --check` and `markdownlint-cli2`
lint them — excluding them would make two gates pass by having nothing to look
at.

All ten gates pass as of 14 October 2026, `npm audit` included.

Clearing audit took a tool swap rather than a version bump: `markdownlint-cli2`
depends on `globby → fast-glob → micromatch → braces`, and `braces` carries
GHSA-vfj7-8cjw-p6xm in **every** published version, so no upgrade could ever fix
it. The classic `markdownlint-cli` runs the same `markdownlint@0.41` engine over
`tinyglobby`, so the rules are unchanged and the chain is gone; its own
`markdown-it` and `minimatch` are pinned forward through `overrides`. The rule
config moved from `.markdownlint-cli2.jsonc` to `.markdownlint.jsonc`, and the
globs and ignores moved to the `lint:md` script and `.markdownlintignore`,
because this CLI takes them as arguments rather than from the config file.

### Static analysis: SonarQube CE and the scanners

Four tools cover what `lint` and `tsc` cannot. All of them run in containers, so
nothing is installed on the machine. The scan results live in
`.memory/local/devsecops/results/<YYYY-MM-DD>/`, which is **not versioned** —
this repository is public.

| Tool              | Finds                                       | Last run (14 Oct 2026)                           |
| ----------------- | ------------------------------------------- | ------------------------------------------------ |
| SonarQube CE 26.9 | Bugs, smells, complexity, duplication       | Gate **OK** — 0 bugs, 0 vulns, 0 hotspots, A/A/A |
| Gitleaks          | Secrets in the working tree and git history | 0 leaks across 47 commits                        |
| OSV-Scanner       | Known advisories in the lockfile            | 0 issues across 678 packages                     |
| jscpd             | Copy-paste between files                    | 0.17% duplicated lines                           |

```bash
DK="/mnt/c/Program Files/Docker/Docker/resources/bin/docker.exe"   # WSL; plain `docker` elsewhere

# SonarQube CE. Elasticsearch needs vm.max_map_count >= 524288 on the host.
# That is a host change, so it is the maintainer's command, never an agent's:
#
#   sudo sysctl -w vm.max_map_count=524288           # until the next WSL restart
#   echo 'vm.max_map_count=524288' | sudo tee -a /etc/sysctl.conf   # persistent
#
# It was raised on this machine on 14 October 2026 and SonarQube now starts
# clean. Without it, add -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true: the analysis
# is identical, the check is just skipped.
"$DK" run -d --name sar-sonarqube -p 9000:9000 \
  sonarqube:26.9.0.129388-community

# The scanner needs the source. With Docker Desktop's WSL integration off there
# are no bind mounts, so the code goes into a throwaway image instead:
#   FROM sonarsource/sonar-scanner-cli:12.2.0.4256_8.1.0
#   COPY . /usr/src
# then run it with SONAR_HOST_URL=http://host.docker.internal:9000 and a token
# from /api/user_tokens/generate.

"$DK" stop sar-sonarqube    # one dashboard at a time; it wants several GB
```

`sonar-project.properties` at the root is the scanner's config and is
versioned: `sonar.sources=src`, `sonar.tests=tests`, and exclusions for
`.memory`, `node_modules`, `.next` and `public`.

Two findings worth recording, because both were real and neither was caught by
ESLint or the type checker:

- `src/lib/language-detector.ts` had `/|>/` — an alternation with an empty left
  branch, so it matched **every** string. Any Python or Ruby function was
  reported as Elixir. Fixed, with regression tests.
- `src/lib/queries.ts` sorted a cache key with `sort()` and no comparator.

One SonarQube bug is marked **Accepted** rather than fixed: `typescript:S1082`
on `country-select.tsx`. It asks for a keyboard listener on each `<li
role="option">`, which would be wrong for the ARIA combobox pattern — the input
owns the keyboard through `aria-activedescendant`, and giving every option its
own handler would put the list in the tab order. The reasoning is at the call
site and in the issue's comment.

### Accessibility testing

The rules themselves are in [PAGE_CONSISTENCY.md](PAGE_CONSISTENCY.md#5-accessibility-floor).
To verify:

- Chrome DevTools Accessibility panel; axe DevTools or WAVE extensions
- Screen reader: NVDA (Windows) / VoiceOver (macOS) — every control must announce
- Keyboard: tab through the whole page; everything reachable, focus always visible
- Contrast: 4.5:1 minimum

### Manual scenarios worth running

Real mobile devices when possible, touch response without delay, every form
error state, `PageLoadingOverlay` appearing during navigation, and error
boundary recovery.

## Development Environment Setup

### Prerequisites

- Node.js 22.x or later (24.x in use locally; `skills:sync` needs ≥ 22)
- npm — this project uses `package-lock.json`, not pnpm
- Git
- `uv` / `uvx` — no longer needed; it was only used by the removed `skills:speckit`
- Visual Studio Code (recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Next.js snippets
- Git Lens

### Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/carrilloapps/carrilloapps.git
   cd carrilloapps
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required variables
   - For Vercel deployment, configure variables in Project Settings
   - Use the environment utility (`@/lib/env`) for type-safe access

4. Start the development server:

   ```bash
   npm run dev
   ```

## Environment Variables

### Configuration

The project uses a centralized environment configuration in `@/lib/env.ts` that provides:

- Type-safe access to environment variables
- Automatic fallbacks for development
- Environment detection utilities
- Validation of required variables

### Usage

```typescript
import { env, getSiteUrl, isProduction } from "@/lib/env"

// Get site URL (handles different environments)
const siteUrl = getSiteUrl()

// Check environment
if (isProduction()) {
  // Production-specific logic
}

// Access variables with type safety
const disqusShortname = env.DISQUS_SHORTNAME
```

### Required Variables

- `NEXT_PUBLIC_SITE_URL`: Base URL of the site
- `NEXT_PUBLIC_DISQUS_SHORTNAME`: Disqus shortname for comments

### Optional Variables

- `DISQUS_API_KEY`: For advanced Disqus features
- `DISQUS_API_SECRET`: For Disqus API authentication
- `DISQUS_ACCESS_TOKEN`: For authenticated Disqus requests

### Vercel Deployment

For Vercel deployment:

1. Configure variables in Project Settings
2. Use different values for Development/Preview/Production
3. Leverage automatic Vercel variables (`VERCEL_URL`, `VERCEL_ENV`)

See `docs/VERCEL.md` for detailed deployment instructions.

## Coding Standards

### General Guidelines

1. **Use TypeScript**: All new code should be written in TypeScript.
2. **Follow ESLint rules**: The project has ESLint configured. Follow the rules.
3. **Format with Prettier**: Code should be formatted using Prettier.
4. **Write tests**: New features should include appropriate tests.
5. **Document your code**: Add comments to complex logic and JSDoc to exported functions.

### Component Structure

React components should follow this structure:

```tsx
"use client" // If component uses client-side features

import { useState, useEffect } from "react"
import type { FC } from "react"

// Define prop types
interface ComponentProps {
  prop1: string
  prop2?: number
}

export const Component: FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // State and hooks
  const [state, setState] = useState<string>("")

  // Side effects
  useEffect(() => {
    // Effect logic
  }, [])

  // Event handlers
  const handleClick = () => {
    setState("New state")
  }

  // Helper functions
  const formatData = (data: string) => {
    return data.toUpperCase()
  }

  // Render
  return (
    <div>
      <h1>{formatData(prop1)}</h1>
      <p>{prop2}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

### CSS/Styling

- Use TailwindCSS utility classes
- For complex components, use composition of utility classes with `className` prop
- Follow mobile-first approach (start with mobile styles, then add responsive variants)
- Use CSS variables for theme colors and values that need to be shared

### State Management

- Use React hooks for local component state
- Use React Context API for shared state when needed
- Keep state close to where it's used

## Git Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `hotfix/*`: Emergency fixes for production

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Test additions or corrections
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration files
- `chore`: Other changes that don't modify src or test files

Example:

```text
feat(blog): add pagination to blog list

- Added pagination component
- Fetch blog posts by page
- Add next/prev buttons

Closes #123
```

### Pull Request Process

1. Create a branch from `develop` or `main` (for hotfixes)
2. Make your changes
3. Write tests for your changes
4. Update documentation
5. Ensure all tests pass
6. Submit a pull request
7. Address review comments

## Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Deployment

The project is automatically deployed using GitHub Actions when changes are merged to the `main` branch. The workflow is defined in `.github/workflows/deploy.yml`.

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Place test files adjacent to the component or function they're testing
- Name test files with `.test.ts` or `.test.tsx` extension
- Use Jest and React Testing Library for component tests
- Write tests that focus on user behavior, not implementation details
- Test accessibility features

## Project Structure

```text
/app                    # Next.js pages and routes
/components             # React components
  /ui                   # UI components
/data                   # Static data files
/docs                   # Documentation
/hooks                  # Custom React hooks
/lib                    # Utility functions and libraries
/public                 # Static assets
/styles                 # Global styles
/types                  # TypeScript type definitions
```

## Performance Considerations

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Use dynamic imports for heavy components
3. **Lazy Loading**: Load components only when needed
4. **Memoization**: Use `useMemo` and `useCallback` for expensive operations
5. **Bundle Size**: Monitor bundle size and optimize imports
6. **Server Components**: Use React Server Components where appropriate

## Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA attributes**: Add ARIA roles and attributes when needed
3. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
4. **Color contrast**: Maintain sufficient color contrast
5. **Screen reader support**: Test with screen readers

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
