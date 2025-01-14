import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Endpoints | Developer Platform',
  description: 'Explore the available endpoints in our developer platform',
}

export default function Endpoints() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Endpoints</h1>
      <p className="mb-4">Here are the main endpoints available in our API:</p>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">/api/users - User management</li>
        <li className="mb-2">/api/projects - Project management</li>
        <li className="mb-2">/api/deployments - Deployment management</li>
        <li className="mb-2">/api/analytics - Analytics data</li>
      </ul>
      <p className="mb-4">For detailed documentation on each endpoint, please refer to our API reference.</p>
      <Link href="/docs/webhooks" className="text-blue-600 hover:underline">
        Next: Webhooks
      </Link>
    </div>
  )
}

