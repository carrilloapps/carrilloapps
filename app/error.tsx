'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8">We're sorry, but there was an error processing your request.</p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

