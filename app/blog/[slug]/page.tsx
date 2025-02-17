import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost } from '../blogData'
import BlogPostContent from './BlogPostContent'
import {SharedMetadata} from "@/app/shared-metadata";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) {
    return {
      title: 'Artículo no disponible'
    }
  }

  return {
    ...SharedMetadata,
    title: `${post.title.rendered} - José Carrillo`,
    description: post.yoast_head_json.description,
    keywords: ['José Carrillo', 'blog', `${post.categories}`],
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
      images: [{ url: post.yoast_head_json.og_image[0].url }],
      authors: [post.author_meta.display_name],
      title: post.title.rendered,
      description: post.yoast_head_json.description,
    },
    twitter: {
      ...SharedMetadata.twitter,
      title: post.title.rendered,
      description: post.yoast_head_json.description,
    }
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}

