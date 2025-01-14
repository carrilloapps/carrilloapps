import { Metadata } from 'next'
import RadioPageContent from './RadioPageContent'

export const metadata: Metadata = {
  title: 'Radio - DevPlatform',
  description: 'Listen to our DevPlatform radio stations.',
}

export default function RadioPage() {
  return <RadioPageContent />
}

