"use client";

import { Suspense, use } from "react";
import { motion, Variants } from "framer-motion";
import { BlogPosts } from "@/components/blog-posts";
import BlogFeatured from "@/components/blog-featured";
import { BlogFeaturedLoading, BlogGridLoading, OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DynamicBackground } from "@/components/dynamic-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { PageHero } from "@/components/page-hero";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

function BlogPageContent({ searchParams }: BlogPageProps) {
  const { isLoading } = usePageLoading();
  const { category, search } = use(searchParams)

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{ text: "Blog" }}
            title="Insights & experiencias"
            description="Artículos sobre desarrollo de software, sistemas financieros y de pago, liderazgo técnico y recursos para desarrolladores."
          >
            <Suspense fallback={<BlogFeaturedLoading />}>
              <BlogFeatured />
            </Suspense>
          </PageHero>

          {/* Articles Section */}
          <motion.section 
            className="py-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent capitalize">
                {search ? `Resultados: "${search}"` : category ? `Categoría: ${category}` : "Publicaciones"}
              </h2>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <Suspense fallback={<BlogGridLoading />}>
                <BlogPosts category={category} search={search} />
              </Suspense>
            </motion.div>
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <PageLoadingProvider>
      <BlogPageContent searchParams={searchParams} />
    </PageLoadingProvider>
  );
}
