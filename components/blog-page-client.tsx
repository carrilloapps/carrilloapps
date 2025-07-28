"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ParticleHeroBackground } from "@/components/particle-hero-background";
import { ReactElement } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface BlogPageClientProps {
  featuredSection: ReactElement;
  articlesSection: ReactElement;
  search?: string;
  category?: string;
}

export function BlogPageClient({ featuredSection, articlesSection, search, category }: BlogPageClientProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleHeroBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
      
      <main className="relative z-10 container py-12 space-y-24" id="main-content">
        {/* Hero Section */}
        <motion.section 
          className="py-12 md:py-24 space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="space-y-4 text-center" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Badge 
                variant="outline" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
              >
                Blog
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg"
              variants={itemVariants}
            >
              Insights & Experiencias
            </motion.h1>
            <motion.p 
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Artículos sobre desarrollo de software, sistemas financieros y de pago, liderazgo técnico y recursos para desarrolladores.
            </motion.p>
          </motion.div>

          <motion.div className="h-8" variants={itemVariants} />

          <motion.div variants={itemVariants}>
            {featuredSection}
          </motion.div>
        </motion.section>

        {/* Articles Section */}
        <motion.section 
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              {search ? `Resultados para "${search}"` : category ? `Categoría: ${category}` : "Artículos Recientes"}
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            {articlesSection}
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}