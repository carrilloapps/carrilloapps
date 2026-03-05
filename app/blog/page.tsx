import { Suspense } from "react";
import { BlogPosts } from "@/components/blog-posts";
import BlogFeatured from "@/components/blog-featured";
import { BlogFeaturedLoading, BlogGridLoading } from "@/components/unified-loading";
import { getCachedBlogPosts, getCachedFeaturedPost } from "@/lib/wordpress-service";
import { BlogPageContent } from "./blog-page-content";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, search } = await searchParams;
  const [posts, featuredPost] = await Promise.all([
    getCachedBlogPosts(),
    getCachedFeaturedPost(),
  ]);

  return (
    <BlogPageContent category={category} search={search}>
      <Suspense fallback={<BlogFeaturedLoading />}>
        <BlogFeatured post={featuredPost} />
      </Suspense>
      <Suspense fallback={<BlogGridLoading />}>
        <BlogPosts initialPosts={posts} category={category} search={search} />
      </Suspense>
    </BlogPageContent>
  );
}
