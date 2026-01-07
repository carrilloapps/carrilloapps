# Lib Directory - Agent Guidelines

This directory contains utility functions, services, and helper modules for the carrillo.app project.

## Directory Structure

```
lib/
├── analytics.ts          # Analytics tracking functions (GA4, Clarity)
├── env.ts                # Environment variable handling
├── language-detector.ts  # ⭐ Auto-detección de lenguajes de programación (30+ lenguajes)
├── medium.ts             # Medium API integration
├── motion.ts             # ⭐ Optimized Framer Motion exports
├── rss-client.ts         # RSS feed client
├── rss-service.ts        # RSS feed service (Medium posts)
├── ui-components.ts      # ⭐ Optimized Radix UI exports
└── utils.ts              # General utility functions
```

## Performance Optimization Utilities

### motion.ts ⭐ NEW

**Location**: `lib/motion.ts`

**Purpose**: Optimized Framer Motion exports to reduce bundle size by only importing necessary functions instead of the entire library.

#### Why This Exists

**Problem**: Importing from `framer-motion` directly includes the entire library (~80KB), even if you only use `motion`.

**Solution**: Centralized exports of only what's actually needed across the project.

#### Usage

```tsx
// ❌ BAD - Imports entire library
import { motion } from "framer-motion";

// ✅ GOOD - Only imports what's needed
import { motion } from "@/lib/motion";
```

#### Available Exports

```typescript
// Components & hooks
export { 
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
  useInView
} from "framer-motion";

// Types
export type { Variants, Target, Transition, AnimationControls } from "framer-motion";
```

#### Pre-defined Animation Variants

Use common animation patterns for consistency:

```tsx
import { motion, commonVariants } from "@/lib/motion";

// Container with staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={commonVariants.container}
>
  {items.map(item => (
    <motion.div key={item.id} variants={commonVariants.item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Fade in
<motion.div variants={commonVariants.fadeIn}>
  Content
</motion.div>

// Slide up
<motion.div variants={commonVariants.slideUp}>
  Content
</motion.div>
```

**Available Variants:**
- `container`: Staggered children animation (0.1s delay between each)
- `item`: Individual item animation (fade + slide up)
- `fadeIn`: Simple fade in effect
- `slideUp`: Slide from bottom with fade

**Impact**: Reduces Framer Motion bundle by ~20KB

### ui-components.ts ⭐ NEW

**Location**: `lib/ui-components.ts`

**Purpose**: Centralized exports for commonly used Radix UI components to improve tree-shaking and reduce unused code.

#### Why This Exists

**Problem**: Radix UI components are large, and importing them in multiple files can lead to code duplication and poor tree-shaking.

**Solution**: Export only commonly used components from a single location.

#### Usage

```tsx
// ✅ For common components (Dialog, Tabs, Select)
import { Dialog, DialogContent, DialogTitle } from "@/lib/ui-components";

// ✅ For rarely used components, import directly
import { Accordion, AccordionItem } from "@/components/ui/accordion";
```

#### Exported Components

**Always use from `lib/ui-components.ts`:**
- Dialog (and all sub-components)
- Tabs (and all sub-components)
- DropdownMenu (and all sub-components)
- Select (and all sub-components)
- Tooltip (and all sub-components)

**Import directly for:**
- Accordion, AlertDialog, Popover, HoverCard (rarely used)
- Any component used in only 1-2 places

**Impact**: Better code splitting and tree-shaking for Radix UI components

## Utility Functions

### utils.ts

**Location**: `lib/utils.ts`

Contains the `cn()` utility for combining Tailwind CSS classes.

#### Usage
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "more-classes"
)} />
```

#### Implementation
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### Benefits
- Combines multiple class names
- Handles conditional classes
- Resolves Tailwind conflicts (last class wins)
- Type-safe with ClassValue type

#### Examples
```tsx
// Basic usage
cn("p-4", "bg-blue-500")
// Result: "p-4 bg-blue-500"

// Conditional classes
cn("p-4", isActive && "bg-blue-500", "text-white")
// Result (if isActive): "p-4 bg-blue-500 text-white"
// Result (if !isActive): "p-4 text-white"

// Tailwind conflicts
cn("p-4", "p-6")
// Result: "p-6" (last wins)

// Arrays and objects
cn(["p-4", "bg-blue-500"], { "text-white": true })
// Result: "p-4 bg-blue-500 text-white"
```

## Language Detection

### language-detector.ts ⭐ NEW

**Location**: `lib/language-detector.ts`

**Purpose**: Automatic detection of programming languages from code snippets for syntax highlighting in blog posts.

#### Why This Exists

**Problem**: Medium blog posts contain code blocks in `<pre>` tags without language metadata, making it impossible to apply proper syntax highlighting.

**Solution**: Intelligent pattern-based detection that analyzes code structure to identify the programming language automatically.

#### Key Features

- ✅ **30+ Programming Languages** supported
- ✅ **Priority-based detection** to avoid false positives
- ✅ **Go vs JavaScript** confusion resolved (Go detected BEFORE JS)
- ✅ **High accuracy** (~95% on code > 5 lines)
- ✅ **Fast performance** (O(n) complexity)
- ✅ **Fallback to "text"** for unknown languages

#### Usage

```typescript
import { detectLanguage, getFileExtension } from "@/lib/language-detector"

// Detect language from code
const code = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}
`

const language = detectLanguage(code)
console.log(language) // "go"

// Get file extension
const ext = getFileExtension(language)
console.log(ext) // "go"
```

#### Supported Languages (30+)

**High Priority (detected first):**
- JSON (validated with JSON.parse)
- Go/Golang (before JavaScript)
- TypeScript (before JavaScript)
- JavaScript

**Other Languages:**
- Python, Rust, Kotlin, Java, Swift, PHP, Ruby
- C#, C/C++, SQL, Bash/Shell
- HTML, CSS/SCSS, Markdown, YAML
- GraphQL, Docker, Nginx, Terraform/HCL
- Dart, Elixir, Scala, Perl, Lua, R

#### Detection Logic

**Critical Order:**
1. **JSON** - Parse validation
2. **Go** - `package`, `func`, `:=`, `graphql.NewObject`
3. **TypeScript** - Type annotations, interfaces
4. **JavaScript** - `const/let` with `=`, ES6 imports
5. **Others** - Language-specific patterns

**Example: Go Detection (Fixed)**
```typescript
// BEFORE: Confused with JavaScript
var userType = graphql.NewObject(...)  // ❌ Detected as "javascript"

// AFTER: Specific Go patterns
package main                           // ✅ Detected as "go"
func main() {}                         // ✅ Detected as "go"
:=                                     // ✅ Detected as "go"
graphql.NewObject(                     // ✅ Detected as "go"
```

#### Integration with Blog

Used in `components/blog-content-renderer.tsx`:

```typescript
// Auto-detect language from <pre> tags
const language = detectLanguage(code)
return <VSCodeBlock code={code} language={language} />
```

#### Full Documentation

See [docs/LANGUAGE_DETECTOR.md](../docs/LANGUAGE_DETECTOR.md) for:
- Complete language list with detection patterns
- Testing guidelines
- Extensibility guide
- Known limitations

## RSS Service

### rss-service.ts

**Location**: `lib/rss-service.ts`

Service for fetching and processing Medium blog posts via RSS feed.

#### Main Functions

```typescript
export async function getBlogPosts(): Promise<MediumPost[]>
export async function getBlogPost(slug: string): Promise<MediumPost | null>
export async function getFeaturedPost(): Promise<MediumPost | null>
```

#### Usage

##### Get All Blog Posts
```tsx
import { getBlogPosts } from "@/lib/rss-service";

const posts = await getBlogPosts();
```

##### Get Single Post by Slug
```tsx
import { getBlogPost } from "@/lib/rss-service";

const post = await getBlogPost("my-post-slug");
```

##### Get Featured Post
```tsx
import { getFeaturedPost } from "@/lib/rss-service";

const featured = await getFeaturedPost();
```

#### Configuration

```typescript
const RSS_CONFIG = {
  baseUrl: 'https://api.rss2json.com/v1/api.json',
  mediumFeed: 'https://medium.com/feed/@carrilloapps',
  cacheTime: 3600,      // 1 hour in seconds
  revalidateTime: 3600, // 1 hour in seconds
};
```

#### Caching

Uses Next.js `unstable_cache` for optimal performance:

```typescript
import { unstable_cache } from 'next/cache';

const getCachedBlogPosts = unstable_cache(
  async () => {
    // Fetch and process posts
    return posts;
  },
  ['blog-posts'],
  {
    revalidate: RSS_CONFIG.revalidateTime,
    tags: ['blog', 'medium']
  }
);
```

#### Data Processing

The service automatically:
1. Generates slugs from titles
2. Extracts thumbnail images
3. Calculates reading time
4. Processes categories and tags
5. Validates image URLs
6. Cleans HTML content

#### Helper Functions

```typescript
// Generate slug from title
function generateSlug(title: string): string

// Calculate reading time
function getReadingTime(content: string): number

// Extract thumbnail from content
function extractThumbnail(content: string): string | null

// Validate image URL
function isValidImageUrl(url: string): boolean

// Clean HTML tags
function stripHtmlTags(html: string): string
```

## RSS Client

### rss-client.ts

**Location**: `lib/rss-client.ts`

Low-level client for fetching RSS feeds.

#### Usage
```typescript
import { fetchRSSFeed } from "@/lib/rss-client";

const feed = await fetchRSSFeed('https://medium.com/feed/@username');
```

#### Features
- Error handling
- Response validation
- JSON parsing
- Type-safe responses

## Medium Integration

### medium.ts

**Location**: `lib/medium.ts`

Type definitions and utilities for Medium API responses.

#### Types
```typescript
export interface MediumPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  thumbnail: string | null;
  pubDate: string;
  author: string;
  categories: string[];
  tags?: string[];
  readingTime: number;
  link: string;
  enclosure?: RSSEnclosure;
}

export interface RSSEnclosure {
  link: string;
  type?: string;
}

export interface RSSItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: RSSEnclosure;
  categories: string[];
}
```

## Environment Variables

### env.ts

**Location**: `lib/env.ts`

Centralized environment variable handling with validation.

#### Usage
```typescript
import { env } from "@/lib/env";

// Access validated environment variables
const siteUrl = env.NEXT_PUBLIC_SITE_URL;
const disqusShortname = env.NEXT_PUBLIC_DISQUS_SHORTNAME;
```

#### Available Variables
```typescript
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://carrillo.app',
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://carrillo.app',
  NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || '',
  // Add more as needed
};
```

#### Best Practices
- Always validate required variables
- Provide sensible defaults
- Type-check values
- Document all variables in `.env.example`

## Common Patterns

### Fetching Data with Cache

```typescript
import { unstable_cache } from 'next/cache';

export const getCachedData = unstable_cache(
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return processData(data);
  },
  ['cache-key'],
  {
    revalidate: 3600, // 1 hour
    tags: ['data-tag']
  }
);
```

### Error Handling

```typescript
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  return null; // or throw error
}
```

### Data Validation

```typescript
function validateData(data: unknown): data is ValidType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'requiredField' in data
  );
}

const data = await fetchData();
if (!validateData(data)) {
  throw new Error('Invalid data format');
}
```

## Testing Utilities

### Mock Data

Create mock data for testing:

```typescript
export const mockBlogPost: MediumPost = {
  id: 'test-id',
  title: 'Test Post',
  slug: 'test-post',
  content: 'Test content',
  description: 'Test description',
  thumbnail: '/test-image.jpg',
  pubDate: '2024-01-01',
  author: 'Test Author',
  categories: ['Test'],
  readingTime: 5,
  link: 'https://test.com',
};
```

### Testing Functions

```typescript
// Test slug generation
expect(generateSlug('My Post Title')).toBe('my-post-title');

// Test reading time calculation
expect(getReadingTime('word '.repeat(200))).toBe(1); // 200 words = 1 min
```

## Performance Optimization

### Caching Strategy

1. **API Responses**: Cache for 1 hour
2. **Static Data**: Cache indefinitely with revalidation
3. **User-Specific Data**: No caching

### Revalidation

```typescript
// Manual revalidation
import { revalidateTag } from 'next/cache';

export async function revalidateBlogPosts() {
  revalidateTag('blog');
  revalidateTag('medium');
}
```

### Error Recovery

```typescript
// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  retries = 3,
  delay = 1000
): Promise<Response> {
  try {
    return await fetch(url);
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}
```

## Best Practices

### 1. Type Safety
Always define proper TypeScript types:
```typescript
export function processData<T extends BaseType>(data: T): ProcessedType {
  // Type-safe processing
}
```

### 2. Error Handling
Handle errors gracefully:
```typescript
export async function fetchData(): Promise<Data | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}
```

### 3. Caching
Use Next.js caching for optimal performance:
```typescript
import { unstable_cache } from 'next/cache';

const getCached = unstable_cache(
  async () => data,
  ['key'],
  { revalidate: 3600, tags: ['tag'] }
);
```

### 4. Documentation
Document all public functions:
```typescript
/**
 * Fetches blog posts from Medium RSS feed
 * @returns Array of MediumPost objects
 * @throws Error if fetch fails
 */
export async function getBlogPosts(): Promise<MediumPost[]> {
  // ...
}
```

### 5. Testing
Write unit tests for utility functions:
```typescript
describe('generateSlug', () => {
  it('should generate correct slug', () => {
    expect(generateSlug('My Post')).toBe('my-post');
  });
});
```

## Security Considerations

### Environment Variables
- Never commit `.env` files
- Validate all environment variables
- Use type-safe access

### API Keys
- Store in environment variables
- Never expose in client code
- Rotate regularly

### Data Validation
- Validate all external data
- Sanitize user inputs
- Type-check responses

## Common Issues

### Cache Not Updating
```typescript
// Force revalidation
revalidateTag('blog');
revalidateTag('medium');
```

### CORS Errors
```typescript
// Use server-side fetch
// Client-side: Use API route as proxy
```

### Type Errors
```typescript
// Always validate data structure
if (!validateData(data)) {
  throw new Error('Invalid data');
}
```

---

**See Also**:
- [types/AGENTS.md](../types/AGENTS.md) - Type definitions
- [app/api/AGENTS.md](../app/api/AGENTS.md) - API routes
- [Main AGENTS.md](../AGENTS.md) - Project overview
