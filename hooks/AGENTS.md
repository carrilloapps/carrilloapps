# Hooks Directory - Agent Guidelines

This directory contains custom React hooks for the carrillo.app project.

## Directory Structure

```
hooks/
├── use-disqus-comments.tsx   # Disqus comments integration
├── use-media-query.tsx        # Media query hook
├── use-mobile.tsx             # Mobile detection hook
└── use-toast.ts               # Toast notifications
```

## Custom Hooks Overview

### use-disqus-comments.tsx

**Location**: `hooks/use-disqus-comments.tsx`

Hook for integrating Disqus comments in blog posts.

#### Usage

```tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments";

function BlogPost({ slug, title }: { slug: string; title: string }) {
  const { disqusConfig, isLoading, error } = useDisqusComments({
    slug,
    title,
  });

  if (isLoading) return <CommentsLoading />;
  if (error) return <CommentsError error={error} />;

  return <DiscussionEmbed {...disqusConfig} />;
}
```

#### Parameters

```typescript
interface UseDisqusCommentsProps {
  slug: string;       // Post slug (unique identifier)
  title: string;      // Post title
}
```

#### Return Value

```typescript
interface UseDisqusCommentsReturn {
  disqusConfig: {
    shortname: string;
    config: {
      url: string;
      identifier: string;
      title: string;
    };
  };
  isLoading: boolean;
  error: string | null;
}
```

#### Features

- Automatic URL generation
- Environment validation
- Loading states
- Error handling
- Client-side only execution

#### Configuration

Requires environment variable:
```env
NEXT_PUBLIC_DISQUS_SHORTNAME=your-shortname
```

#### Example

```tsx
function BlogPostComments({ post }: { post: MediumPost }) {
  const { disqusConfig, isLoading, error } = useDisqusComments({
    slug: post.slug,
    title: post.title,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="comments-section">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <DiscussionEmbed {...disqusConfig} />
    </div>
  );
}
```

### use-media-query.tsx

**Location**: `hooks/use-media-query.tsx`

Hook for responsive design with media queries.

#### Usage

```tsx
import { useMediaQuery } from "@/hooks/use-media-query";

function ResponsiveComponent() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div>
      {isDesktop && <DesktopView />}
      {isMobile && <MobileView />}
    </div>
  );
}
```

#### Parameters

```typescript
function useMediaQuery(query: string): boolean
```

#### Common Queries

```tsx
// Breakpoints
const isMobile = useMediaQuery("(max-width: 640px)");
const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
const isDesktop = useMediaQuery("(min-width: 1025px)");

// Tailwind breakpoints
const isSm = useMediaQuery("(min-width: 640px)");
const isMd = useMediaQuery("(min-width: 768px)");
const isLg = useMediaQuery("(min-width: 1024px)");
const isXl = useMediaQuery("(min-width: 1280px)");
const is2Xl = useMediaQuery("(min-width: 1536px)");

// User preferences
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
const prefersHighContrast = useMediaQuery("(prefers-contrast: high)");

// Orientation
const isPortrait = useMediaQuery("(orientation: portrait)");
const isLandscape = useMediaQuery("(orientation: landscape)");

// Device capabilities
const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)");
const hasFinePointer = useMediaQuery("(pointer: fine)");
```

#### Server-Side Rendering

Hook returns `false` during SSR:
```tsx
const isDesktop = useMediaQuery("(min-width: 768px)");
// isDesktop = false on server
// isDesktop = true/false on client (based on actual viewport)
```

#### Performance

Uses `window.matchMedia` for efficient media query matching:
- No re-renders on viewport changes unless match changes
- Native browser API (fast)
- Cleanup on unmount

### use-mobile.tsx

**Location**: `hooks/use-mobile.tsx`

Simplified hook for mobile detection.

#### Usage

```tsx
import { useMobile } from "@/hooks/use-mobile";

function Component() {
  const isMobile = useMobile();

  return (
    <div>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </div>
  );
}
```

#### Definition

```typescript
function useMobile(): boolean
```

#### Implementation

```typescript
export function useMobile() {
  return useMediaQuery("(max-width: 768px)");
}
```

#### Use Cases

```tsx
// Conditional rendering
{isMobile && <MobileComponent />}
{!isMobile && <DesktopComponent />}

// Conditional props
<Component variant={isMobile ? "mobile" : "desktop"} />

// Conditional styles
<div className={isMobile ? "p-2" : "p-4"} />

// Conditional behavior
useEffect(() => {
  if (isMobile) {
    // Mobile-specific logic
  }
}, [isMobile]);
```

### use-toast.ts

**Location**: `hooks/use-toast.ts`

Hook for toast notifications (from shadcn/ui).

#### Usage

```tsx
import { useToast } from "@/hooks/use-toast";

function FormComponent() {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

#### Toast Options

```typescript
interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;       // milliseconds
  action?: ReactNode;      // action button
}
```

#### Examples

##### Success Toast
```tsx
toast({
  title: "Success!",
  description: "Your changes have been saved.",
  duration: 3000,
});
```

##### Error Toast
```tsx
toast({
  title: "Error",
  description: "Failed to save changes.",
  variant: "destructive",
});
```

##### Toast with Action
```tsx
toast({
  title: "Undo available",
  description: "Item deleted successfully.",
  action: (
    <Button variant="outline" size="sm" onClick={handleUndo}>
      Undo
    </Button>
  ),
});
```

##### Long Duration Toast
```tsx
toast({
  title: "Important message",
  description: "This toast stays longer.",
  duration: 10000, // 10 seconds
});
```

## Creating Custom Hooks

### Hook Naming Convention

```typescript
// ✅ Good - starts with "use"
function useCustomHook() {}
function useDataFetcher() {}
function useFormValidation() {}

// ❌ Bad - doesn't start with "use"
function customHook() {}
function getHookData() {}
```

### Hook Template

```typescript
import { useState, useEffect } from 'react';

export function useCustomHook<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [/* dependencies */]);

  return { state, setState, isLoading, error };
}
```

### Best Practices

#### 1. Type Safety
```typescript
// ✅ Good - fully typed
export function useData<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ❌ Bad - untyped
export function useData(url) {
  return { data, loading, error };
}
```

#### 2. Cleanup
```typescript
// ✅ Good - cleanup effect
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// ❌ Bad - no cleanup
useEffect(() => {
  subscribe();
}, []);
```

#### 3. Dependencies
```typescript
// ✅ Good - correct dependencies
useEffect(() => {
  fetchData(id);
}, [id]);

// ❌ Bad - missing dependencies
useEffect(() => {
  fetchData(id);
}, []);
```

#### 4. SSR Compatibility
```typescript
// ✅ Good - checks for window
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) return null;

// ❌ Bad - assumes window exists
const width = window.innerWidth; // Error on server
```

## Common Hook Patterns

### Data Fetching Hook

```typescript
export function useData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch failed');
        const json = await response.json();
        
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
```

### Local Storage Hook

```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setStoredValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(value) : value;
      setValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue] as const;
}
```

### Debounce Hook

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### Previous Value Hook

```typescript
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

### Window Size Hook

```typescript
export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

## Testing Hooks

### Testing with React Testing Library

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './use-custom-hook';

describe('useCustomHook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCustomHook('initial'));
    expect(result.current.value).toBe('initial');
  });

  it('should update value', () => {
    const { result } = renderHook(() => useCustomHook('initial'));
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(result.current.value).toBe('updated');
  });
});
```

## Performance Optimization

### Memoization

```typescript
// Use useMemo for expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Use useCallback for functions
const memoizedCallback = useCallback(() => {
  doSomething(data);
}, [data]);
```

### Avoid Unnecessary Re-renders

```typescript
// ✅ Good - stable reference
const stableCallback = useCallback(() => {
  // logic
}, []);

// ❌ Bad - new reference every render
const unstableCallback = () => {
  // logic
};
```

---

**See Also**:
- [components/AGENTS.md](../components/AGENTS.md) - Component usage
- [types/AGENTS.md](../types/AGENTS.md) - Type definitions
- [Main AGENTS.md](../AGENTS.md) - Project overview
