import { Metadata } from 'next'
import BlogPageContent from './BlogPageContent'
import {SharedMetadata} from "@/app/shared-metadata";

export const metadata: Metadata = {
  ...SharedMetadata,
  title: 'Artículos del Blog - José Carrillo',
  description: 'El Blog de José Carrillo, donde encontrarás artículos sobre banking, fintech y ecommerce.',
  keywords: ['José Carrillo', 'blog', 'banking', 'fintech', 'ecommerce'],
  alternates: {
    ...SharedMetadata.alternates,
    canonical: "/blog",
    languages: {
      'es-CO': '/blog',
      'en-US': '/en/blog',
    },
  },
  openGraph: {
    ...SharedMetadata.openGraph,
    type: 'website',
    url: '/blog',
    title: 'Tu Blog de banking, fintech y ecommerce',
    description: 'Donde encontrarás artículos y recursos sobre banking, fintech y ecommerce.',
  },
  twitter: {
    ...SharedMetadata.twitter,
    title: 'Tu Blog de banking, fintech y ecommerce',
    description: 'Donde encontrarás artículos y recursos sobre banking, fintech y ecommerce.',
  }
}

export default function BlogPage() {
  return <BlogPageContent />
}

