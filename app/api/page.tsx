import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: 'API Reference - DevPlatform',
  description: 'Complete API reference and documentation for DevPlatform.',
}

export default function ApiPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Complete API reference documentation for DevPlatform.
        </p>

        <Tabs defaultValue="rest" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rest">REST API</TabsTrigger>
            <TabsTrigger value="graphql">GraphQL</TabsTrigger>
            <TabsTrigger value="sdk">SDK</TabsTrigger>
          </TabsList>
          <TabsContent value="rest" className="prose dark:prose-invert max-w-none">
            <h2>REST API</h2>
            <p>Our REST API provides a simple and powerful way to interact with DevPlatform.</p>
            
            <h3>Authentication</h3>
            <pre className="bg-muted p-4 rounded-lg">
              <code>
                curl -H "Authorization: Bearer YOUR_API_KEY" \
                https://api.devplatform.com/v1/projects
              </code>
            </pre>

            <h3>Rate Limits</h3>
            <p>The API is limited to 1000 requests per minute per API key.</p>
          </TabsContent>
          
          <TabsContent value="graphql" className="prose dark:prose-invert max-w-none">
            <h2>GraphQL API</h2>
            <p>Our GraphQL API provides a flexible way to query exactly the data you need.</p>
            
            <h3>Example Query</h3>
            <pre className="bg-muted p-4 rounded-lg">
              <code>
                {`query {
  project(id: "123") {
    name
    description
    collaborators {
      name
      email
    }
  }
}`}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="sdk" className="prose dark:prose-invert max-w-none">
            <h2>SDK Documentation</h2>
            <p>Our official SDKs make it easy to integrate with DevPlatform in your preferred language.</p>
            
            <h3>JavaScript SDK</h3>
            <pre className="bg-muted p-4 rounded-lg">
              <code>
                {`import { DevPlatform } from '@devplatform/sdk';

const client = new DevPlatform('YOUR_API_KEY');
const project = await client.projects.create({
  name: 'My Project',
  description: 'A new project'
});`}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

