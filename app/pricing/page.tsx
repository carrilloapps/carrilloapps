import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

export const metadata = {
  title: 'Pricing - DevPlatform',
  description: 'Simple, transparent pricing for teams of all sizes.',
}

const plans = [
  {
    name: "Hobby",
    price: "Free",
    description: "For individual developers and small projects",
    features: [
      "Up to 3 projects",
      "Basic CI/CD",
      "Community support",
      "1 team member"
    ]
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professional developers and teams",
    features: [
      "Unlimited projects",
      "Advanced CI/CD",
      "Priority support",
      "Up to 5 team members",
      "Custom domains"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Everything in Pro",
      "24/7 dedicated support",
      "Unlimited team members",
      "Custom integrations",
      "SLA guarantee"
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you or your team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

