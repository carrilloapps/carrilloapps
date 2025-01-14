import { Metadata } from 'next'
import ResourcesPageContent from './ResourcesPageContent'
import {SharedMetadata} from "@/app/shared-metadata";

export const metadata: Metadata = {
  ...SharedMetadata,
  title: 'Recursos - José Carrillo',
  description: 'Explora los recursos gratuitos de José Carrillo para convertirte en un experto del banking, fintech y ecommerce.',
  keywords: ['José Carrillo', 'banking', 'fintech', 'ecommerce', 'github', 'gitlab'],
  alternates: {
    ...SharedMetadata.alternates,
    canonical: "/recursos",
    languages: {
      'es-CO': '/recursos',
      'en-US': '/en/resources',
    },
  },
  openGraph: {
    ...SharedMetadata.openGraph,
    type: 'website',
    url: '/recursos',
    title: 'Recursos gratuitos de banking, fintech y ecommerce',
    description: 'Hazte todo un experto en banking, fintech y ecommerce con los recursos gratuitos de José Carrillo.',
  },
  twitter: {
    ...SharedMetadata.twitter,
    title: 'Recursos gratuitos de banking, fintech y ecommerce',
    description: 'Hazte todo un experto en banking, fintech y ecommerce con los recursos gratuitos de José Carrillo.',
  }
}

export default function ResourcesPage() {
  return <ResourcesPageContent />
}

