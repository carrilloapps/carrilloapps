import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <h2 className="text-2xl mb-4">Access Denied</h2>
      <p className="text-muted-foreground mb-8">Sorry, you don't have permission to access this page.</p>
      <Button asChild>
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  )
}

