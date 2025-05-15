# Development Guide

This guide provides an overview of development practices and standards for the CarrilloApps project.

## Development Environment Setup

### Prerequisites

- Node.js 20.x or later
- pnpm 8.x or later
- Git
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
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required variables

4. Start the development server:
   ```bash
   pnpm dev
   ```

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
"use client"; // If component uses client-side features

import { useState, useEffect } from "react";
import type { FC } from "react";

// Define prop types
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const Component: FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // State and hooks
  const [state, setState] = useState<string>("");

  // Side effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    setState("New state");
  };

  // Helper functions
  const formatData = (data: string) => {
    return data.toUpperCase();
  };

  // Render
  return (
    <div>
      <h1>{formatData(prop1)}</h1>
      <p>{prop2}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
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

```
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
```
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
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm start
```

### Deployment

The project is automatically deployed using GitHub Actions when changes are merged to the `main` branch. The workflow is defined in `.github/workflows/deploy.yml`.

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Place test files adjacent to the component or function they're testing
- Name test files with `.test.ts` or `.test.tsx` extension
- Use Jest and React Testing Library for component tests
- Write tests that focus on user behavior, not implementation details
- Test accessibility features

## Project Structure

```
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
