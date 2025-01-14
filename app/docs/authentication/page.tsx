import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Authentication | Developer Platform',
  description: 'Learn about authentication in our developer platform',
}

export default function Authentication() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>
      <p className="mb-4">Our platform uses JWT (JSON Web Tokens) for authentication. Here's how to implement it:</p>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">Register your application to get API keys</li>
        <li className="mb-2">Implement the login flow in your frontend</li>
        <li className="mb-2">Send the JWT with each request in the Authorization header</li>
      </ol>
      <Link href="/docs/endpoints" className="text-blue-600 hover:underline">
        Next: Endpoints
      </Link>
    </div>
  )
}

