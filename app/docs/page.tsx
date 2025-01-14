import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { ArrowRight, Book, Code, Zap } from 'lucide-react'

export default function DocsHome() {
  const sections = [
    {
      title: "Getting Started",
      description: "Set up your development environment and start building",
      icon: Zap,
      links: [
        { href: "/docs/installation-guide", label: "Installation Guide" },
        { href: "/docs/quick-start", label: "Quick Start Tutorial" },
      ]
    },
    {
      title: "Core Documentation",
      description: "Dive deep into the platform's core concepts and features",
      icon: Book,
      links: [
        { href: "/docs/core-concepts", label: "Core Concepts" },
        { href: "/docs/authentication", label: "Authentication" },
      ]
    },
    {
      title: "API Reference",
      description: "Explore our API endpoints and learn how to integrate",
      icon: Code,
      links: [
        { href: "/docs/endpoints", label: "Endpoints" },
        { href: "/docs/webhooks", label: "Webhooks" },
      ]
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Documentation</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explore our guides and examples to integrate the Developer Platform.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center text-blue-600 hover:underline">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
        <div className="space-y-4">
          {[
            { version: "v2.1.0", description: "Added support for WebSocket connections" },
            { version: "v2.0.1", description: "Fixed bug in authentication flow" },
            { version: "v2.0.0", description: "Major release with breaking changes" },
          ].map((update) => (
            <div key={update.version} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div>
                <Badge variant="secondary">{update.version}</Badge>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{update.description}</p>
              </div>
              <Link href={`/changelog#${update.version}`} className="text-blue-600 hover:underline">
                View changes
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

