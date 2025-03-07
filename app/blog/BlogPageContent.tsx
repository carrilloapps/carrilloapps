'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { SidebarFilters } from "@/components/sidebar-filters"
import { format } from 'date-fns'
import { es } from "date-fns/locale"
import { getBlogPosts } from './blogData'
import { Posts } from '@/types/post'

export default function BlogPageContent() {
  const [filteredPosts, setFilteredPosts] = useState<Posts>([])

  useEffect(() => {
    getBlogPosts().then((posts) => {
      setFilteredPosts(posts)
    })
  }, []);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Artículos del Blog</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">

        </div>
        <div className="md:w-3/4">
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={post.yoast_head_json.og_image[0].url}
                      alt={post.title.rendered}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle>
                        <Link href={`/blog/${post.slug}`} className="hover:underline text-2xl">
                          {post.title.rendered}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">
                        Categoría: {post.categories[0]} | Publicado en {format(new Date(post.date), 'MMMM d, yyyy', {locale: es})}, por {post.author_meta.display_name}
                      </p>
                      <p className="mb-4">{post.yoast_head_json.description}</p>
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

