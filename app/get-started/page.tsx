import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: 'Get Started - DevPlatform',
  description: 'Start your journey with DevPlatform.',
}

export default function GetStartedPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Get Started with DevPlatform</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Sign up for a free DevPlatform account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Sign Up</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Read the Docs</CardTitle>
            <CardDescription>Explore our comprehensive documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Docs</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Join the Community</CardTitle>
            <CardDescription>Connect with other developers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Join Forum</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

