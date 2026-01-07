# Types Directory - Agent Guidelines

This directory contains TypeScript type definitions for the carrillo.app project.

## Directory Structure

```
types/
├── medium.ts     # Medium/RSS feed types
└── project.ts    # Project-related types
```

## Type Definitions

### medium.ts

**Location**: `types/medium.ts`

Type definitions for Medium blog posts and RSS feed data.

#### Core Types

##### MediumPost

```typescript
export interface MediumPost {
  id: string;                    // Unique post identifier
  title: string;                 // Post title
  slug: string;                  // URL-friendly slug
  content: string;               // Full HTML content
  description: string;           // Post excerpt/summary
  thumbnail: string | null;      // Featured image URL
  pubDate: string;              // Publication date (ISO string)
  author: string;                // Author name
  categories: string[];          // Post categories
  tags?: string[];              // Optional tags
  readingTime: number;           // Estimated reading time (minutes)
  link: string;                  // Full URL to post
  enclosure?: RSSEnclosure;      // Optional media enclosure
}
```

##### RSSEnclosure

```typescript
export interface RSSEnclosure {
  link: string;        // Media URL
  type?: string;       // MIME type (e.g., "image/jpeg")
}
```

##### RSSItem

```typescript
export interface RSSItem {
  title: string;              // Post title
  pubDate: string;            // Publication date
  link: string;               // Full URL
  guid: string;               // Unique identifier
  author: string;             // Author name
  thumbnail: string;          // Featured image URL
  description: string;        // Post excerpt
  content: string;            // Full HTML content
  enclosure: RSSEnclosure;    // Media enclosure
  categories: string[];       // Post categories
}
```

##### RSSFeedResponse

```typescript
export interface RSSFeedResponse {
  status: string;         // Response status
  feed: {
    url: string;         // Feed URL
    title: string;       // Feed title
    link: string;        // Feed website URL
    author: string;      // Feed author
    description: string; // Feed description
    image: string;       // Feed image URL
  };
  items: RSSItem[];      // Array of RSS items
}
```

#### Usage Examples

##### Fetching Posts

```tsx
import type { MediumPost } from "@/types/medium";

async function getBlogPosts(): Promise<MediumPost[]> {
  // Fetch and process RSS feed
  const posts: MediumPost[] = await fetchPosts();
  return posts;
}
```

##### Displaying Post

```tsx
import type { MediumPost } from "@/types/medium";

interface BlogPostProps {
  post: MediumPost;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <time>{new Date(post.pubDate).toLocaleDateString()}</time>
      <span>{post.readingTime} min read</span>
      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

##### Processing RSS Data

```tsx
import type { RSSItem, MediumPost } from "@/types/medium";

function transformRSSItem(item: RSSItem): MediumPost {
  return {
    id: item.guid,
    title: item.title,
    slug: generateSlug(item.title),
    content: item.content,
    description: item.description,
    thumbnail: item.thumbnail || item.enclosure?.link || null,
    pubDate: item.pubDate,
    author: item.author,
    categories: item.categories,
    readingTime: calculateReadingTime(item.content),
    link: item.link,
    enclosure: item.enclosure,
  };
}
```

### project.ts

**Location**: `types/project.ts`

Type definitions for project portfolio data.

#### Core Types

##### Project

```typescript
export interface Project {
  id: string;                    // Unique project identifier
  title: string;                 // Project name
  category: string;              // Project category
  description: string;           // Brief description
  technologies: string[];        // Technology stack
  image: string;                 // Project image path
  github?: string;               // GitHub repository URL
  gitlab?: string;               // GitLab repository URL
  demo?: string;                 // Live demo URL
  featured: boolean;             // Featured on homepage
  highlights?: string[];         // Key achievements
  details?: ProjectDetails;      // Extended information
}
```

##### ProjectDetails

```typescript
export interface ProjectDetails {
  challenge?: string;       // Problem description
  solution?: string;        // Solution approach
  results?: string;         // Outcomes and metrics
  role?: string;           // Your role in project
  duration?: string;       // Project timeline
  teamSize?: number;       // Team member count
}
```

##### FeaturedProject

```typescript
export interface FeaturedProject {
  id: string;              // Project identifier
  title: string;           // Project name
  description: string;     // Brief description
  image: string;           // Project image path
  technologies: string[];  // Main technologies (limit 5)
  github?: string;         // GitHub repository URL
  gitlab?: string;         // GitLab repository URL
  demo?: string;           // Live demo URL
  link: string;            // Link to project detail
}
```

#### Usage Examples

##### Project List Component

```tsx
import type { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
  category?: string;
}

export function ProjectList({ projects, category }: ProjectListProps) {
  const filtered = category
    ? projects.filter(p => p.category === category)
    : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

##### Project Card Component

```tsx
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {project.github && (
        <a href={project.github}>GitHub</a>
      )}
      {project.demo && (
        <a href={project.demo}>Live Demo</a>
      )}
    </div>
  );
}
```

##### Project Details Page

```tsx
import type { Project } from "@/types/project";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      
      {project.details && (
        <div className="details">
          {project.details.challenge && (
            <section>
              <h2>Challenge</h2>
              <p>{project.details.challenge}</p>
            </section>
          )}
          
          {project.details.solution && (
            <section>
              <h2>Solution</h2>
              <p>{project.details.solution}</p>
            </section>
          )}
          
          {project.details.results && (
            <section>
              <h2>Results</h2>
              <p>{project.details.results}</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
```

## Type Utilities

### Type Guards

```typescript
// Check if object is MediumPost
export function isMediumPost(obj: unknown): obj is MediumPost {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'slug' in obj &&
    'content' in obj &&
    'pubDate' in obj
  );
}

// Check if object is Project
export function isProject(obj: unknown): obj is Project {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'category' in obj &&
    'technologies' in obj &&
    'featured' in obj
  );
}
```

### Partial Types

```typescript
// For form inputs
export type ProjectFormData = Omit<Project, 'id' | 'featured'>;

// For updates
export type ProjectUpdate = Partial<Project> & { id: string };

// For creation
export type CreateProject = Omit<Project, 'id'>;
```

### Pick Types

```typescript
// Project preview (minimal data)
export type ProjectPreview = Pick<
  Project,
  'id' | 'title' | 'description' | 'image' | 'technologies'
>;

// Post metadata
export type PostMetadata = Pick<
  MediumPost,
  'id' | 'title' | 'slug' | 'pubDate' | 'readingTime'
>;
```

## Type Composition

### Extending Types

```typescript
// Enhanced project with computed fields
export interface EnhancedProject extends Project {
  slug: string;
  lastUpdated: string;
  viewCount: number;
}

// Blog post with comments
export interface BlogPostWithComments extends MediumPost {
  comments: Comment[];
  commentCount: number;
}
```

### Union Types

```typescript
// Project status
export type ProjectStatus = 'active' | 'completed' | 'archived' | 'on-hold';

// Post visibility
export type PostVisibility = 'public' | 'private' | 'draft';

// Repository provider
export type RepoProvider = 'github' | 'gitlab' | 'bitbucket';
```

### Discriminated Unions

```typescript
// API response
export type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

// Usage
function handleResponse(response: ApiResponse<Project[]>) {
  switch (response.status) {
    case 'success':
      return response.data; // Type: Project[]
    case 'error':
      throw new Error(response.error); // Type: string
    case 'loading':
      return null;
  }
}
```

## Generic Types

### Data Fetching

```typescript
export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Usage
const postState: DataState<MediumPost> = {
  data: null,
  loading: true,
  error: null,
};
```

### Pagination

```typescript
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Usage
const paginatedPosts: Paginated<MediumPost> = {
  items: posts,
  page: 1,
  pageSize: 10,
  totalItems: 100,
  totalPages: 10,
};
```

### API Response

```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

// Usage
async function fetchProjects(): Promise<ApiResponse<Project[]>> {
  const response = await fetch('/api/projects');
  return response.json();
}
```

## Type Best Practices

### 1. Always Define Types

```typescript
// ✅ Good - typed
interface Props {
  title: string;
  count: number;
}

// ❌ Bad - untyped
interface Props {
  [key: string]: any;
}
```

### 2. Use Readonly When Appropriate

```typescript
// ✅ Good - immutable
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// Prevents accidental modification
config.apiUrl = 'new-url'; // Error
```

### 3. Avoid Type Assertions

```typescript
// ✅ Good - type guard
if (isMediumPost(data)) {
  console.log(data.title); // Type-safe
}

// ❌ Bad - type assertion
const post = data as MediumPost; // Unsafe
```

### 4. Use Strict Null Checks

```typescript
// ✅ Good - explicit null handling
thumbnail: string | null;

// ❌ Bad - implicit null
thumbnail: string; // Might be null at runtime
```

### 5. Document Complex Types

```typescript
/**
 * Represents a blog post from Medium RSS feed
 * @property id - Unique identifier (GUID from RSS)
 * @property readingTime - Estimated minutes to read
 * @property thumbnail - Featured image URL or null
 */
export interface MediumPost {
  // ...
}
```

## Type Testing

### Type Checking in Tests

```typescript
import type { MediumPost } from "@/types/medium";

describe('MediumPost type', () => {
  it('should match expected structure', () => {
    const post: MediumPost = {
      id: '123',
      title: 'Test',
      slug: 'test',
      content: 'Content',
      description: 'Description',
      thumbnail: null,
      pubDate: '2024-01-01',
      author: 'Author',
      categories: [],
      readingTime: 5,
      link: 'https://test.com',
    };

    expect(post).toBeDefined();
    expect(typeof post.id).toBe('string');
    expect(Array.isArray(post.categories)).toBe(true);
  });
});
```

### Runtime Validation

```typescript
import { z } from 'zod';

// Zod schema for runtime validation
export const MediumPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  description: z.string(),
  thumbnail: z.string().nullable(),
  pubDate: z.string(),
  author: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  readingTime: z.number(),
  link: z.string().url(),
  enclosure: z.object({
    link: z.string().url(),
    type: z.string().optional(),
  }).optional(),
});

// Validate data
export function validateMediumPost(data: unknown): MediumPost {
  return MediumPostSchema.parse(data);
}
```

## Common Type Patterns

### Optional Chaining Types

```typescript
// Access nested optional properties safely
const imageUrl = post.enclosure?.link ?? post.thumbnail ?? '/default.jpg';
```

### Nullish Coalescing

```typescript
// Provide defaults for null/undefined
const title = post.title ?? 'Untitled';
const readTime = post.readingTime ?? 0;
```

### Type Narrowing

```typescript
// Narrow types with conditions
function getProjectUrl(project: Project): string {
  if (project.demo) {
    return project.demo; // Type: string
  } else if (project.github) {
    return project.github; // Type: string
  }
  return '#';
}
```

---

**See Also**:
- [data/AGENTS.md](../data/AGENTS.md) - Data structures using these types
- [lib/AGENTS.md](../lib/AGENTS.md) - Functions working with these types
- [components/AGENTS.md](../components/AGENTS.md) - Components using these types
- [Main AGENTS.md](../AGENTS.md) - Project overview
