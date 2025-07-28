"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Search, Filter, Sparkles, ArrowRight } from "lucide-react";
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
import { getCachedMediumPosts } from "@/lib/rss-client";
import type { MediumPost } from "@/types/medium";
import { usePageLoading } from "@/components/page-loading-context";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function BlogPosts({
  category = "",
  search = "",
}: {
  category?: string;
  search?: string;
}) {
  const { setLoading } = usePageLoading();
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

  const handleLinkClick = () => {
    setLoading(true);
  };

  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLocalLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    async function loadPosts() {
      try {
        setLocalLoading(true);
        const allPosts = await getCachedMediumPosts();

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
        setLocalLoading(false);
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
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array(6).fill(0).map((_, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 animate-pulse"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-5/6"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-16"></div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex justify-between border-t border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-20"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 rounded animate-pulse w-12"></div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-red-500/30">
          <CardContent className="p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-600/20 to-red-700/20 flex items-center justify-center border border-red-600/30">
              <Sparkles className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-300">Error al cargar artículos</h3>
            <p className="text-red-400 max-w-md mx-auto">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg shadow-red-500/25"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Intentar de nuevo
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30">
          <CardContent className="p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30">
              <Sparkles className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-300">No hay artículos disponibles</h3>
            <p className="text-zinc-400 max-w-md mx-auto">
              No hay artículos disponibles en esta categoría, pero pronto habrá más contenido interesante.
            </p>
            <Button variant="outline" className="mt-4 border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/10" asChild>
              <Link href="/blog">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ver todos los artículos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <>
      {/* Filtros mejorados */}
      <motion.div 
        className="mb-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {/* Búsqueda */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-400 transition-colors duration-300" />
            </div>
            <input
              type="search"
              placeholder="Buscar artículos..."
              className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-zinc-400 transition-all duration-300"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Filtro de categorías */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-400 transition-colors duration-300" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white transition-all duration-300 appearance-none cursor-pointer"
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
        </div>

        {filterPosts(posts).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-zinc-700/30">
              <CardContent className="p-6">
                <p className="text-zinc-400">
                  No se encontraron artículos que coincidan con tu búsqueda.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Grid de artículos */}
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {getCurrentPagePosts().map((post, index) => (
          <motion.div
            key={post.guid}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full group" onClick={handleLinkClick}>
              <Card className="h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group-hover:scale-[1.02]">
                <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                  <Image
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4 flex-grow">
                  <h3 className="text-lg font-bold line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-sm line-clamp-3 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                    {post.content
                      .replace(/<[^>]*>/g, " ")
                      .substring(0, 150)
                      .trim()}
                    ...
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map((category, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="capitalize border-zinc-700/50 text-zinc-400 bg-zinc-800/30 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-3 flex justify-between border-t border-zinc-800/50 mt-auto">
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-600/30">
                      <Calendar className="h-3 w-3 text-purple-400" />
                    </div>
                    {new Date(post.pubDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center border border-green-600/30">
                      <Clock className="h-3 w-3 text-green-400" />
                    </div>
                    {post.readingTime} min
                  </motion.div>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Paginación mejorada */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-lg p-2">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
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
                        className={`transition-all duration-300 ${
                          currentPage === pageNumber
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500"
                            : "hover:bg-blue-500/10 hover:border-blue-500/30"
                        }`}
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
                      className="hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                    >
                      Siguiente
                    </PaginationLink>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </motion.div>
      )}
    </>
  );
}
