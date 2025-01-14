import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quick Start Tutorial | Developer Platform',
  description: 'Get started quickly with our developer platform',
}

export default function QuickStart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quick Start Tutorial</h1>
      <p className="mb-4">Follow these steps to get started with our platform:</p>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">Create a new project: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">our-platform init my-project</code></li>
        <li className="mb-2">Navigate to your project: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">cd my-project</code></li>
        <li className="mb-2">Start the development server: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">our-platform dev</code></li>
      </ol>
      <Link href="/docs/core-concepts" className="text-blue-600 hover:underline">
        Next: Core Concepts
      </Link>
    </div>
  )
}

