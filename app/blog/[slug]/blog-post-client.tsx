"use client"

import type { BlogPost } from "@/types/blog"

interface BlogPostClientProps {
  post: BlogPost
  slug: string
}

export function BlogPostClient({ post, slug }: BlogPostClientProps) {
  if (!post || !slug) {
    return null
  }
  return null
}
