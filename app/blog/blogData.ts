export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 13",
    slug: "getting-started-with-nextjs-13",
    author: "John Doe",
    date: "2023-06-01",
    category: "Frontend",
    tags: ["Next.js", "React", "Web Development"],
    excerpt: "Learn how to set up your first Next.js 13 project and explore its new features.",
    content: `
      Next.js 13 introduces several groundbreaking features that revolutionize the way we build React applications.
      In this post, we'll dive deep into:

      1. The new App Router
      2. Server Components
      3. Improved Data Fetching
      4. Streaming and Suspense

      Let's start by setting up a new Next.js 13 project...

      [Rest of the article content]
    `,
    image: "https://placehold.co/600x400"
  },
  {
    id: 2,
    title: "Advanced React Patterns for Scalable Applications",
    slug: "advanced-react-patterns-for-scalable-applications",
    author: "Jane Smith",
    date: "2023-06-05",
    category: "Frontend",
    tags: ["React", "Design Patterns", "Architecture"],
    excerpt: "Explore advanced React patterns to build more maintainable and scalable applications.",
    content: `
      As your React applications grow in size and complexity, it becomes crucial to adopt advanced patterns and techniques. In this article, we'll explore:

      1. Compound Components
      2. Render Props
      3. Higher-Order Components (HOCs)
      4. Hooks and Custom Hooks
      5. State Management Patterns

      Let's dive into each of these patterns and see how they can improve your React applications...

      [Rest of the article content]
    `,
    image: "https://placehold.co/600x400"
  },
  {
    id: 3,
    title: "Building Scalable Backend Systems with Node.js",
    slug: "building-scalable-backend-systems-with-nodejs",
    author: "Bob Johnson",
    date: "2023-06-10",
    category: "Backend",
    tags: ["Node.js", "Scalability", "Architecture"],
    excerpt: "Learn how to design and implement scalable backend systems using Node.js.",
    content: `
      Node.js has become a popular choice for building backend systems due to its efficiency and scalability. In this comprehensive guide, we'll cover:

      1. Asynchronous Programming in Node.js
      2. Microservices Architecture
      3. Load Balancing and Clustering
      4. Caching Strategies
      5. Database Optimization

      Let's start by understanding the fundamentals of scalable architecture in Node.js...

      [Rest of the article content]
    `,
    image: "https://placehold.co/600x400"
  },
  {
    id: 4,
    title: "Mastering GraphQL: From Basics to Advanced Concepts",
    slug: "mastering-graphql-from-basics-to-advanced-concepts",
    author: "Alice Brown",
    date: "2023-06-15",
    category: "API",
    tags: ["GraphQL", "API Design", "Web Development"],
    excerpt: "A comprehensive guide to GraphQL, covering everything from basic queries to advanced concepts.",
    content: `
      GraphQL has revolutionized the way we think about API design and data fetching. In this in-depth tutorial, we'll cover:

      1. GraphQL Basics: Queries and Mutations
      2. Schema Design Best Practices
      3. Resolvers and Data Sources
      4. Authentication and Authorization in GraphQL
      5. Performance Optimization and Caching
      6. Real-time Updates with Subscriptions

      Let's start by understanding what GraphQL is and how it differs from REST...

      [Rest of the article content]
    `,
    image: "https://placehold.co/600x400"
  },
  {
    id: 5,
    title: "The Power of TypeScript: Enhancing Your JavaScript Development",
    slug: "the-power-of-typescript-enhancing-your-javascript-development",
    author: "Charlie Wilson",
    date: "2023-06-20",
    category: "Language",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    excerpt: "Discover how TypeScript can improve your JavaScript development workflow and catch errors before runtime.",
    content: `
      TypeScript has gained immense popularity in recent years, and for good reason. In this comprehensive guide, we'll explore:

      1. TypeScript Basics: Types, Interfaces, and Classes
      2. Advanced Types and Type Manipulation
      3. Generics and Decorators
      4. TypeScript with React and Node.js
      5. Migration Strategies for Existing JavaScript Projects
      6. TypeScript Compiler Configuration and Best Practices

      Let's begin by understanding what TypeScript is and how it relates to JavaScript...

      [Rest of the article content]
    `,
    image: "https://placehold.co/600x400"
  }
];

