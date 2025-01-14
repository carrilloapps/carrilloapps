import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Installation Guide | Developer Platform',
  description: 'Learn how to install and set up our developer platform',
}

export default function InstallationGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Installation Guide</h1>
      <p className="mb-4">Follow these steps to install our developer platform:</p>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">Ensure you have Node.js version 14 or higher installed</li>
        <li className="mb-2">Run <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">npm install @our-platform/cli -g</code></li>
        <li className="mb-2">Verify the installation by running <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">our-platform --version</code></li>
      </ol>
      <Link href="/docs/quick-start" className="text-blue-600 hover:underline">
        Next: Quick Start Tutorial
      </Link>
    </div>
  )
}

