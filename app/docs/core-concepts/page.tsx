import { Metadata } from 'next'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Box, Cloud, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Core Concepts | Developer Platform',
  description: 'Understand the fundamental concepts and architecture of our developer platform',
}

export default function CoreConcepts() {
  const concepts = [
    {
      title: "Projects",
      description: "The basic unit of organization in our platform",
      content: "A project is a container for all your application's resources. It includes your code, databases, and configuration settings. Projects help you organize and manage different applications or environments (like development, staging, and production) separately.",
      icon: Box,
    },
    {
      title: "Components",
      description: "Reusable building blocks for your application",
      content: "Components are pre-built, customizable elements that you can use to quickly construct your application's UI. They range from simple buttons and forms to complex data visualizations and interactive elements.",
      icon: Code,
    },
    {
      title: "Services",
      description: "Backend functionalities that power your application",
      content: "Services are modular backend functionalities that you can easily integrate into your application. These include authentication, database management, file storage, and more. By using our services, you can focus on building your unique features without worrying about the underlying infrastructure.",
      icon: Cloud,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Core Concepts</h1>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Understanding these core concepts will help you make the most of our platform. Take your time to explore each one.
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="projects">
        <TabsList>
          {concepts.map((concept) => (
            <TabsTrigger key={concept.title} value={concept.title.toLowerCase()}>
              {concept.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {concepts.map((concept) => (
          <TabsContent key={concept.title} value={concept.title.toLowerCase()}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <concept.icon className="h-5 w-5" />
                  {concept.title}
                </CardTitle>
                <CardDescription>{concept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{concept.content}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <h2 className="text-2xl font-semibold mt-8">How These Concepts Work Together</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Our platform's architecture is designed to seamlessly integrate these core concepts:
      </p>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        <li>You create a <strong>Project</strong> to house your application</li>
        <li>Within your project, you build your UI using our <strong>Components</strong></li>
        <li>You leverage our <strong>Services</strong> to add powerful backend capabilities</li>
        <li>Finally, you deploy your application, making it accessible to users</li>
      </ol>
      <div className="flex justify-between items-center mt-8">
        <Link href="/docs/quick-start" className="text-blue-600 hover:underline">
          ← Quick Start Tutorial
        </Link>
        <Link href="/docs/authentication" className="text-blue-600 hover:underline">
          Authentication →
        </Link>
      </div>
    </div>
  )
}

