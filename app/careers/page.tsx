import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: 'Careers - DevPlatform',
  description: 'Join our team and help build the future of development.',
}

const positions = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Technical Writer",
    department: "Documentation",
    location: "Remote",
    type: "Contract"
  }
]

export default function CareersPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Help us build the future of development. We're always looking for talented
          individuals to join our team.
        </p>

        <div className="grid gap-6">
          {positions.map((position) => (
            <Card key={position.title}>
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
                <CardDescription>
                  {position.department} · {position.location} · {position.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/careers/${position.title.toLowerCase().replace(/ /g, '-')}`}>
                    View Position
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

