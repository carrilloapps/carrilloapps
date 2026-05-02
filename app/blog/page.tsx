import { Suspense } from "react";
import { Metadata } from "next";
import { BlogPosts } from "@/components/blog-posts";
import BlogFeatured from "@/components/blog-featured";
import { BlogFeaturedLoading, BlogGridLoading } from "@/components/unified-loading";
import { getCachedBlogPosts, getCachedFeaturedPost } from "@/lib/wordpress-service";
import { BlogPageContent } from "./blog-page-content";
import { buildPageMetadata } from "@/lib/seo";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { category, search } = await searchParams;
  const isFiltered = !!category || !!search;

  // We build metadata using the shared helper.
  // The path always resolves to '/blog' so the canonical is clean.
  // If we are filtering, we could optionally add robots: noindex or canonical pointing to clean /blog
  // Here we let buildPageMetadata set the canonical to '/blog' to avoid parameter duplicate content issues.

  return buildPageMetadata({
    title: "Blog",
    description: "Insights, artículos y reflexiones de un Tech Leader sobre desarrollo de software, sistemas financieros, pagos y liderazgo técnico.",
    path: "/blog",
    robots: isFiltered ? { index: false, follow: true } : undefined, // Optional: prevent indexing of filtered pages to save crawl budget
    keywords: [
      "blog tecnología",
      "josé carrillo blog",
      "tech leader",
      "yummy inc",
      "desarrollo software",
      "sistemas financieros",
      "open banking",
      "pagos digitales",
      "liderazgo técnico",
      "backoffice financiero",
      "arquitectura microservicios",
      "tutoriales programación",
      "fintech",
      "sistemas de pago",
      "mentoría técnica",
    ],
  });
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
