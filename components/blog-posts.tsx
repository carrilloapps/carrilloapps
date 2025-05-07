"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { fetchMediumPosts } from "@/lib/medium";
import type { MediumPost } from "@/types/medium";

export function BlogPosts({
  category = "",
  search = "",
}: {
  category?: string;
  search?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filterPosts = (posts: MediumPost[]) => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        post.categories.some((cat) =>
          cat.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      return matchesSearch && matchesCategory;
    });
  };

  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const allPosts = await fetchMediumPosts("@carrilloapps");

        // Filtrar por categoría y búsqueda si es necesario
        let filteredPosts = allPosts;

        if (category) {
          filteredPosts = filteredPosts.filter((post) =>
            post.categories.some((cat) =>
              cat.toLowerCase().includes(category.toLowerCase())
            )
          );
        }

        if (search) {
          filteredPosts = filteredPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.content.toLowerCase().includes(search.toLowerCase()) ||
              post.description.toLowerCase().includes(search.toLowerCase())
          );
        }

        setPosts(filteredPosts);
        setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError(
          "No pudimos cargar los artículos. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [category, search]);

  useEffect(() => {
    const filteredPosts = filterPosts(posts);
    setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, posts]);

  // Obtener los posts para la página actual
  const getCurrentPagePosts = () => {
    const filteredPosts = filterPosts(posts);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <div className="aspect-video bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-zinc-800 rounded animate-pulse w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
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

  if (posts.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <p className="text-zinc-400">
            No hay artículos disponibles en esta categoría.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Buscar artículos..."
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select
            className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {Array.from(new Set(posts.flatMap((post) => post.categories))).map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>
        {filterPosts(posts).length === 0 && (
          <p className="text-center text-zinc-400">
            No se encontraron artículos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getCurrentPagePosts().map((post, index) => (
          <motion.div
            key={post.guid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full flex flex-col hover:border-blue-800 transition-all hover:shadow-md hover:shadow-blue-900/20">
                <Image
                  width={300}
                  height={300}
                  className="rounded-t-lg object-cover w-full max-h-[100px] transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL={post.thumbnail || "/placeholder.svg"}
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title || "Thumbnail"}
                />
                <CardContent className="p-6 space-y-4 flex-grow">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold line-clamp-2">
                      {post.title}
                    </h3>
                  </div>

                  <div className="text-sm line-clamp-3 text-zinc-300 mb-3">
                    {post.content
                      .replace(/<[^>]*>/g, " ")
                      .substring(0, 220)
                      .trim()}
                    ...
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.slice(0, 2).map((category, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-zinc-700 text-zinc-400"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-4 flex justify-between border-t border-zinc-800 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.pubDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Anterior
                  </PaginationLink>
                </PaginationItem>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber =
                  currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                if (pageNumber <= 0 || pageNumber > totalPages) return null;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Siguiente
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
