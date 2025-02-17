'use client'

import { useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { WithContext, Article } from 'schema-dts'
import { Post } from '@/types/post'

interface Comment {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  date: string;
}

export default function BlogPostContent({ post }: { post: Post }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  })

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: post.title.rendered,
    image: post.yoast_head_json.og_image[0].url,
    description: post.yoast_head_json.description,
  }

  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
      <div className="mb-8">
        <Image
          src={post.yoast_head_json.og_image[0].url}
          alt={post.title.rendered}
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
        />
      </div>
      <div className="mb-8 text-gray-600">
        <p>Publicado el {format(new Date(post.date), 'EEEE, MMMM do yyyy, h:mm:ss a', {locale: es})}, por {post.author_meta.display_name}</p>
        <p>Categoría: {post.categories[0]}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </article>
  )
}

