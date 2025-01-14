import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const metadata = {
  title: 'Integrations - DevPlatform',
  description: 'Explore and connect with our growing list of integrations.',
}

const integrations = [
  {
    name: "GitHub",
    description: "Connect your repositories and automate your workflow",
    category: "Version Control"
  },
  {
    name: "Slack",
    description: "Get notifications and updates in your Slack channels",
    category: "Communication"
  },
  {
    name: "AWS",
    description: "Deploy and manage your applications on AWS",
    category: "Cloud"
  },
  {
    name: "Jira",
    description: "Sync issues and track progress in Jira",
    category: "Project Management"
  }
]

export default function IntegrationsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Integrations</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect your favorite tools and services with DevPlatform.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {integrations.map((integration) => (
            <Card key={integration.name}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={`/placeholder.svg`}
                      alt={integration.name}
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {integration.description}
                </p>
                <Button>Connect</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

