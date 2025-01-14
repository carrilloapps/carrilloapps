import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '../blogData'
import BlogPostContent from './BlogPostContent'
import {SharedMetadata} from "@/app/shared-metadata";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug)
  if (!post) {
    return {
      title: 'Artículo no disponible'
    }
  }

  return {
    ...SharedMetadata,
    title: `${post.title} - José Carrillo`,
    description: post.excerpt,
    keywords: ['José Carrillo', 'blog', `${post.category}`, ...post.tags],
    alternates: {
      ...SharedMetadata.alternates,
      canonical: `/blog/${post.slug}`,
      languages: {
        'es-CO': `/blog/${post.slug}`,
        'en-US': `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      ...SharedMetadata.openGraph,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
      images: [{ url: post.image }],
      authors: [post.author],
      title: post.title,
      description: post.excerpt,
    },
    twitter: {
      ...SharedMetadata.twitter,
      title: post.title,
      description: post.excerpt,
    }
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}

