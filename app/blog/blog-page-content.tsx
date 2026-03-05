"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DynamicBackground } from "@/components/dynamic-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { PageHero } from "@/components/page-hero";
import { trackSearch, trackSectionView } from "@/lib/analytics";

interface BlogPageContentProps {
  category?: string;
  search?: string;
  children: ReactNode;
}

function BlogPageInner({ category, search, children }: BlogPageContentProps) {
  const { isLoading } = usePageLoading();
  const childArray = Array.isArray(children) ? children : [children];
  const featuredChild = childArray[0];
  const postsChild = childArray[1];

  useEffect(() => {
    if (search) {
      trackSearch(search);
    }
    if (category) {
      trackSectionView(`Blog - ${category}`, `category-${category}`);
    }
  }, [search, category]);

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
            {featuredChild}
          </PageHero>

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
              {postsChild}
            </motion.div>
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

export function BlogPageContent({ category, search, children }: BlogPageContentProps) {
  return (
    <PageLoadingProvider>
      <BlogPageInner category={category} search={search}>
        {children}
      </BlogPageInner>
    </PageLoadingProvider>
  );
}
