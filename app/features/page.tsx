import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Features - DevPlatform',
  description: 'Explore the powerful features of DevPlatform that help developers build better software.',
}

const features = [
  {
    title: "Collaborative Coding",
    description: "Real-time code collaboration with your team members."
  },
  {
    title: "Integrated CI/CD",
    description: "Seamless integration with popular CI/CD tools for automated deployments."
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your development process with detailed analytics."
  },
  {
    title: "Customizable Workflows",
    description: "Create and customize workflows to match your team's needs."
  },
  {
    title: "Robust API",
    description: "Integrate DevPlatform with your existing tools using our powerful API."
  },
  {
    title: "Security First",
    description: "Enterprise-grade security features to keep your code and data safe."
  }
]

export default function FeaturesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Features</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

