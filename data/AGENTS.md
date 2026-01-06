# Data Directory - Agent Guidelines

This directory contains static data, configuration, and content for the CarrilloApps project.

## Directory Structure

```
data/
├── featured-projects.ts   # Featured projects configuration
└── projects.ts            # Complete projects portfolio
```

## Projects Data

### projects.ts

**Location**: `data/projects.ts`

Complete portfolio of projects with detailed information.

#### Data Structure

```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  gitlab?: string;
  demo?: string;
  featured: boolean;
  highlights?: string[];
  details?: {
    challenge?: string;
    solution?: string;
    results?: string;
    role?: string;
    duration?: string;
    teamSize?: number;
  };
}

export const projects: Project[] = [
  // Array of project objects
];
```

#### Usage

```tsx
import { projects } from "@/data/projects";

// Get all projects
const allProjects = projects;

// Filter by category
const webProjects = projects.filter(p => p.category === "Web Development");

// Get featured projects
const featuredProjects = projects.filter(p => p.featured);

// Find by ID
const project = projects.find(p => p.id === "project-id");
```

#### Project Fields

##### Required Fields
- **id**: Unique identifier (string, kebab-case)
- **title**: Project name (string)
- **category**: Project category (string)
- **description**: Brief description (string, 2-3 sentences)
- **technologies**: Array of technology names
- **image**: Path to project image (string)
- **featured**: Whether to show in featured section (boolean)

##### Optional Fields
- **github**: GitHub repository URL (string)
- **gitlab**: GitLab repository URL (string)
- **demo**: Live demo URL (string)
- **highlights**: Key achievements array (string[])
- **details**: Extended project information (object)
  - **challenge**: Problem description
  - **solution**: Solution approach
  - **results**: Outcomes and metrics
  - **role**: Your role in the project
  - **duration**: Project timeline
  - **teamSize**: Number of team members

#### Example Project

```typescript
{
  id: "ecommerce-platform",
  title: "E-Commerce Platform",
  category: "Web Development",
  description: "Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
  technologies: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Stripe",
    "Tailwind CSS"
  ],
  image: "/projects/ecommerce.jpg",
  github: "https://github.com/username/ecommerce",
  demo: "https://demo.example.com",
  featured: true,
  highlights: [
    "Processed 10,000+ transactions",
    "99.9% uptime",
    "Sub-second page loads"
  ],
  details: {
    challenge: "Building scalable platform for high-traffic scenarios",
    solution: "Implemented caching, CDN, and database optimization",
    results: "Handled 50,000+ daily users with consistent performance",
    role: "Lead Developer",
    duration: "6 months",
    teamSize: 4
  }
}
```

## Featured Projects

### featured-projects.ts

**Location**: `data/featured-projects.ts`

Configuration for featured projects displayed on the homepage.

#### Data Structure

```typescript
export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  gitlab?: string;
  demo?: string;
  link: string;
}

export const featuredProjects: FeaturedProject[] = [
  // Array of featured project objects
];
```

#### Usage

```tsx
import { featuredProjects } from "@/data/featured-projects";

// Get all featured projects
const featured = featuredProjects;

// Get first N projects
const topThree = featuredProjects.slice(0, 3);
```

#### Featured Project Fields

- **id**: Unique identifier (must match project in projects.ts)
- **title**: Project name
- **description**: Brief description (1-2 sentences)
- **image**: Path to project image
- **technologies**: Array of main technologies (limit to 5)
- **github**: GitHub repository URL (optional)
- **gitlab**: GitLab repository URL (optional)
- **demo**: Live demo URL (optional)
- **link**: Link to project detail page

#### Example Featured Project

```typescript
{
  id: "ai-chatbot",
  title: "AI-Powered Chatbot",
  description: "Intelligent chatbot with natural language processing and context awareness.",
  image: "/projects/chatbot.jpg",
  technologies: ["Python", "TensorFlow", "FastAPI", "React"],
  github: "https://github.com/username/chatbot",
  demo: "https://chatbot.example.com",
  link: "/projects/ai-chatbot"
}
```

## Data Management Best Practices

### 1. Consistent Naming

Use consistent naming conventions:
```typescript
// ✅ Good
id: "my-project-name"
title: "My Project Name"

// ❌ Bad
id: "MyProjectName"
title: "my project name"
```

### 2. Image Paths

Store images in `/public/projects/` directory:
```typescript
// ✅ Good
image: "/projects/my-project.jpg"

// ❌ Bad
image: "../public/projects/my-project.jpg"
```

### 3. Technology Names

Use official technology names:
```typescript
// ✅ Good
technologies: ["Next.js", "TypeScript", "PostgreSQL"]

// ❌ Bad
technologies: ["nextjs", "TS", "postgres"]
```

### 4. URLs

Always use full URLs for external links:
```typescript
// ✅ Good
github: "https://github.com/username/repo"
demo: "https://demo.example.com"

// ❌ Bad
github: "github.com/username/repo"
demo: "demo.example.com"
```

### 5. Featured Projects

Keep featured projects count manageable:
```typescript
// ✅ Good - 3 to 6 projects
featuredProjects.length // 3-6

// ❌ Bad - too many
featuredProjects.length // 20
```

## Adding New Projects

### Step-by-Step Process

1. **Prepare Images**
   - Size: 1200x800px minimum
   - Format: JPG or WebP
   - Save to: `/public/projects/`
   - Optimize: Use image compression

2. **Add to projects.ts**
   ```typescript
   {
     id: "new-project",
     title: "New Project",
     category: "Web Development",
     description: "Brief description here.",
     technologies: ["Tech1", "Tech2"],
     image: "/projects/new-project.jpg",
     featured: false // or true
   }
   ```

3. **Add to featured-projects.ts** (if featured)
   ```typescript
   {
     id: "new-project", // Same ID as projects.ts
     title: "New Project",
     description: "Even briefer description.",
     image: "/projects/new-project.jpg",
     technologies: ["Tech1", "Tech2"], // Limit to 5
     link: "/projects/new-project"
   }
   ```

4. **Verify Data**
   - Check image loads correctly
   - Verify all URLs work
   - Test on mobile and desktop
   - Run `npm run build` to catch errors

## Project Categories

Standard categories to use:

- **Web Development**: Full-stack web applications
- **Mobile Development**: iOS/Android applications
- **Desktop Applications**: Cross-platform desktop apps
- **API Development**: RESTful/GraphQL APIs
- **DevOps**: Infrastructure and automation
- **Open Source**: Community projects
- **Personal**: Side projects and experiments
- **Client Work**: Freelance/agency projects

## Technology Tags

Use consistent technology names:

### Frontend
- Next.js, React, Vue.js, Angular
- TypeScript, JavaScript
- Tailwind CSS, CSS Modules, Styled Components

### Backend
- Node.js, Express, NestJS
- Python, Django, FastAPI
- Go, Rust, Java

### Databases
- PostgreSQL, MySQL, MongoDB
- Redis, Elasticsearch
- Supabase, Firebase

### Cloud & DevOps
- AWS, Azure, GCP
- Docker, Kubernetes
- Vercel, Netlify

### Tools & Libraries
- Framer Motion, GSAP
- Prisma, TypeORM
- GraphQL, Apollo

## Data Validation

### Type Checking

Always validate data structure:
```typescript
function isValidProject(project: unknown): project is Project {
  return (
    typeof project === 'object' &&
    project !== null &&
    'id' in project &&
    'title' in project &&
    'category' in project &&
    'description' in project &&
    'technologies' in project &&
    'image' in project &&
    'featured' in project
  );
}
```

### Required Fields Check

```typescript
function validateProject(project: Project): boolean {
  if (!project.id || !project.title) return false;
  if (!project.category || !project.description) return false;
  if (!project.technologies.length) return false;
  if (!project.image) return false;
  if (typeof project.featured !== 'boolean') return false;
  return true;
}
```

## Querying Data

### Common Queries

```typescript
// Get projects by category
const getProjectsByCategory = (category: string) => {
  return projects.filter(p => p.category === category);
};

// Get projects by technology
const getProjectsByTech = (tech: string) => {
  return projects.filter(p => 
    p.technologies.includes(tech)
  );
};

// Get featured projects
const getFeaturedProjects = () => {
  return projects.filter(p => p.featured);
};

// Search projects
const searchProjects = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return projects.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.technologies.some(t => 
      t.toLowerCase().includes(lowerQuery)
    )
  );
};

// Get project by ID
const getProjectById = (id: string) => {
  return projects.find(p => p.id === id);
};

// Get related projects
const getRelatedProjects = (project: Project, limit = 3) => {
  return projects
    .filter(p => 
      p.id !== project.id &&
      (p.category === project.category ||
       p.technologies.some(t => project.technologies.includes(t)))
    )
    .slice(0, limit);
};
```

### Sorting

```typescript
// Sort by date (assuming id contains date info)
const sortByNewest = (projects: Project[]) => {
  return [...projects].sort((a, b) => b.id.localeCompare(a.id));
};

// Sort by title
const sortByTitle = (projects: Project[]) => {
  return [...projects].sort((a, b) => a.title.localeCompare(b.title));
};

// Sort featured first
const sortFeaturedFirst = (projects: Project[]) => {
  return [...projects].sort((a, b) => 
    Number(b.featured) - Number(a.featured)
  );
};
```

## Performance Considerations

### Static Data

Data is imported at build time, so it's:
- ✅ Type-checked during compilation
- ✅ No runtime fetching required
- ✅ Bundled with application
- ✅ Zero latency access

### Bundle Size

Keep data files reasonable:
```typescript
// ✅ Good - essential data only
description: "Brief 2-3 sentence description"

// ❌ Bad - excessive content
description: "Very long paragraph with multiple sentences..."
```

### Image Optimization

Use Next.js Image component:
```tsx
import Image from "next/image";

<Image
  src={project.image}
  alt={project.title}
  width={1200}
  height={800}
  priority={project.featured}
/>
```

## Testing Data

### Validation Tests

```typescript
describe('Project Data', () => {
  it('should have unique IDs', () => {
    const ids = projects.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have all required fields', () => {
    projects.forEach(project => {
      expect(validateProject(project)).toBe(true);
    });
  });

  it('should have valid image paths', () => {
    projects.forEach(project => {
      expect(project.image).toMatch(/^\/projects\/.+\.(jpg|png|webp)$/);
    });
  });
});
```

## Migration Guide

### From API to Static Data

If migrating from API to static data:

```typescript
// ❌ Old - API fetch
const response = await fetch('/api/projects');
const projects = await response.json();

// ✅ New - Static import
import { projects } from "@/data/projects";
```

### From JSON to TypeScript

```typescript
// ❌ Old - projects.json
import projects from './projects.json';

// ✅ New - projects.ts
import { projects } from './projects';
```

## Future Enhancements

Consider adding:
- Project tags/labels
- Project status (active, completed, archived)
- Project dates (start, end)
- Client/company information
- Project metrics (users, revenue, etc.)
- Multi-language support
- Project gallery (multiple images)

---

**See Also**:
- [types/AGENTS.md](../types/AGENTS.md) - Type definitions for Project
- [components/AGENTS.md](../components/AGENTS.md) - ProjectDialog and FeaturedProjects components
- [Main AGENTS.md](../AGENTS.md) - Project overview
