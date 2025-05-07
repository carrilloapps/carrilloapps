"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchMediumPosts } from "@/lib/medium";
import type { MediumPost } from "@/types/medium";

export function BlogFeatured() {
  const [featuredPost, setFeaturedPost] = useState<MediumPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedPost() {
      try {
        setLoading(true);
        const posts = await fetchMediumPosts("@carrilloapps");

        // Seleccionar el post más reciente como destacado
        if (posts.length > 0) {
          setFeaturedPost(posts[0]);
        }
      } catch (err) {
        console.error("Error fetching featured Medium post:", err);
        setError(
          "No pudimos cargar el artículo destacado. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPost();
  }, []);

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-video bg-zinc-800 animate-pulse"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
            </div>
            <div className="h-10 bg-zinc-800 rounded animate-pulse w-40 mt-4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!featuredPost) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-400">
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
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden transition-all hover:shadow-md hover:shadow-blue-900/20">
        <div className="grid md:grid-cols-2 gap-6 p-2">
          <div className="bg-zinc-800 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-4 capitalize gap-2 flex items-center">
                <Badge className="bg-blue-600">Destacado</Badge>
                {featuredPost.categories.slice(0, 2).map((category, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl font-bold text-zinc-200 mb-1">
                  {featuredPost.title}
                </h2>
              </Link>
              <div className="mb-4 flex justify-between items-center text-sm text-zinc-500 pt-2">
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
                <div className="text-lg font-medium line-clamp-25 text-zinc-300">
                  {featuredPost.content
                    .replace(/<[^>]*>/g, " ")
                    .substring(0, 580)
                    .trim()}
                  ...
                </div>
              </div>
              <div className="mt-auto pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Leer Artículo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col">
            <Link href={`/blog/${featuredPost.slug}`}>
              <Image
                width={500}
                height={500}
                className="rounded-lg object-cover w-full h-[30rem] transition-transform duration-300 hover:scale-105"
                placeholder="blur"
                blurDataURL={featuredPost.thumbnail || "/placeholder.svg"}
                src={featuredPost.thumbnail || "/placeholder.svg"}
                alt={featuredPost.title || "Thumbnail"}
              />
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
