import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'System Status - DevPlatform',
  description: 'Check the current status of DevPlatform services.',
}

const services = [
  {
    name: "API",
    status: "Operational",
    uptime: "99.99%"
  },
  {
    name: "Dashboard",
    status: "Operational",
    uptime: "99.95%"
  },
  {
    name: "Authentication",
    status: "Operational",
    uptime: "100%"
  },
  {
    name: "Database",
    status: "Operational",
    uptime: "99.99%"
  },
  {
    name: "Storage",
    status: "Operational",
    uptime: "99.98%"
  }
]

export default function StatusPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold">All Systems Operational</h1>
        </div>

        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.name}>
              <CardHeader className="py-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Uptime: {service.uptime}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-500/20 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-500">
                      {service.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

