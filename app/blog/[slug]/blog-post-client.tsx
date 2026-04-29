"use client"

interface BlogPost {
  title: string;
  content: string;
  author: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
}

interface BlogPostClientProps {
  post: BlogPost
  slug: string
}

export function BlogPostClient({ post, slug }: BlogPostClientProps) {
  // Verificación de seguridad
  if (!post || !slug) {
    return null
  }

  // Componente vacío - el botón "Volver al Blog" se eliminó
  return null
}