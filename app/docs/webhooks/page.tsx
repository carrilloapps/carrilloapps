import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Webhooks | Developer Platform',
  description: 'Learn how to use webhooks in our developer platform',
}

export default function Webhooks() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Webhooks</h1>
      <p className="mb-4">Webhooks allow your application to receive real-time updates from our platform. Here's how to use them:</p>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">Set up an endpoint in your application to receive webhook events</li>
        <li className="mb-2">Register your webhook URL in our platform's dashboard</li>
        <li className="mb-2">Choose the events you want to subscribe to</li>
        <li className="mb-2">Implement logic to handle incoming webhook payloads</li>
      </ol>
      <p className="mb-4">For security, always verify the webhook signature included in the request headers.</p>
      <Link href="/docs" className="text-blue-600 hover:underline">
        Back to Documentation Home
      </Link>
    </div>
  )
}

