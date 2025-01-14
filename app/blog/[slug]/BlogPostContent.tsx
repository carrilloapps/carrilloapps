'use client'

import { useState } from 'react'
import { BlogPost } from '../blogData'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { WithContext, Article } from 'schema-dts'
import remarkGfm from 'remark-gfm'

interface Comment {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  date: string;
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
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
    name: post.title,
    image: post.image,
    description: post.excerpt,
  }

  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
        />
      </div>
      <div className="mb-8 text-gray-600">
        <p>Publicado el {format(new Date(post.date), 'EEEE, MMMM do yyyy, h:mm:ss a', {locale: es})}, por {post.author}</p>
        <p>Categoría: {post.category}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
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

