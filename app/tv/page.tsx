import { Metadata } from 'next'
import { TVPageContent } from './TVPageContent'

export const metadata: Metadata = {
  title: 'TV - DevPlatform',
  description: 'Watch DevPlatform TV channels.',
}

export default function TVPage() {
  return <TVPageContent />
}

