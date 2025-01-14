'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { SidebarFilters } from "@/components/sidebar-filters"
import { format } from 'date-fns'
import { es } from "date-fns/locale"
import { blogPosts, BlogPost } from './blogData'

export default function BlogPageContent() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts)

  const categories = Array.from(new Set(blogPosts.map(post => post.category)))
  const tags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setFilteredPosts(blogPosts)
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === category))
    }
  }

  const handleTagChange = (tag: string) => {
    setFilteredPosts(blogPosts.filter(post => post.tags.includes(tag)))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFilteredPosts(blogPosts.filter(post => new Date(post.date).toDateString() === date.toDateString()))
    } else {
      setFilteredPosts(blogPosts)
    }
  }

  const handleSearch = (term: string) => {
    setFilteredPosts(blogPosts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.author.toLowerCase().includes(term.toLowerCase()) ||
      post.content.toLowerCase().includes(term.toLowerCase())
    ))
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Artículos del Blog</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <SidebarFilters
            categories={categories}
            tags={tags}
            onCategoryChange={handleCategoryChange}
            onTagChange={handleTagChange}
            onDateChange={handleDateChange}
            onSearch={handleSearch}
          />
        </div>
        <div className="md:w-3/4">
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle>
                        <Link href={`/blog/${post.slug}`} className="hover:underline text-2xl">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">
                        Categoría: {post.category} | Publicado en {format(new Date(post.date), 'MMMM d, yyyy', {locale: es})}, por {post.author}
                      </p>
                      <p className="mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

