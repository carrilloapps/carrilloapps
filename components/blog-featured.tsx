"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCachedFeaturedPost } from "@/lib/rss-client";
import type { MediumPost } from "@/types/medium";
import { usePageLoading } from "@/components/page-loading-context";
import { SpinnerLoading } from "@/components/unified-loading";

export default function BlogFeatured() {
  const { setLoading } = usePageLoading();
  const [featuredPost, setFeaturedPost] = useState<MediumPost | null>(null);
  const [loading, setLocalLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLinkClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    async function loadFeaturedPost() {
      try {
        setLocalLoading(true);
        const post = await getCachedFeaturedPost();
        setFeaturedPost(post);
      } catch (err) {
        console.error("Error fetching featured Medium post:", err);
        setError(
          "No pudimos cargar el artículo destacado. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLocalLoading(false);
      }
    }

    loadFeaturedPost();
  }, []);

  if (loading) {
    return (
      <Card className="relative bg-gradient-to-br from-zinc-900/80 via-zinc-800/50 to-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative z-10 flex items-center justify-center py-24">
          <SpinnerLoading />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="relative bg-gradient-to-br from-zinc-900/80 via-zinc-800/50 to-zinc-900/80 border border-red-500/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5" />
        <CardContent className="relative z-10 p-6 text-center">
          <p className="text-red-400">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg shadow-red-500/25"
          >
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!featuredPost) {
    return (
      <Card className="relative bg-gradient-to-br from-zinc-900/80 via-zinc-800/50 to-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <CardContent className="relative z-10 p-6 text-center">
          <p className="text-zinc-300">
            No hay artículos destacados disponibles.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/60 to-zinc-900/90 border border-zinc-700/50 backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 group">
        {/* Enhanced glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 gap-6 p-2">
          <div className="p-6 flex flex-col justify-between order-2 md:order-1">
            <div>
              <div className="mb-4 capitalize gap-2 flex items-center">
                <Badge className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 text-blue-100 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-md shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-300">
                  ✨ Destacado
                </Badge>
                {featuredPost.categories.slice(0, 2).map((category, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-blue-200 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-md shadow-lg shadow-blue-600/10 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <Link href={`/blog/${featuredPost.slug}`} onClick={handleLinkClick}>
                <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-blue-200 transition-all duration-500">
                  {featuredPost.title}
                </h2>
              </Link>
              <div className="mb-4 flex gap-6 text-sm text-zinc-400 pt-2 group-hover:text-zinc-300 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredPost.pubDate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readingTime} min
                </div>
              </div>
              <div className="space-y-4">
                <div className="font-medium line-clamp-25 text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300">
                  {featuredPost.content
                    .replace(/<[^>]*>/g, " ")
                    .substring(0, 580)
                    .trim()}
                  ...
                </div>
              </div>
              <div className="mt-auto pt-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105" asChild>
                  <Link href={`/blog/${featuredPost.slug}`} onClick={handleLinkClick}>
                    Leer artículo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col order-1 md:order-2">
            <Link href={`/blog/${featuredPost.slug}`} onClick={handleLinkClick}>
              <div className="relative overflow-hidden rounded-lg group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <Image
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-[30rem] transition-all duration-700 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={featuredPost.thumbnail || "/placeholder.svg"}
                  src={featuredPost.thumbnail || "/placeholder.svg"}
                  alt={featuredPost.title || "Thumbnail"}
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
