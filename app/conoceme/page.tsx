import { Button } from "@/components/ui/button"
import Image from "next/image"
import {SharedMetadata} from "@/app/shared-metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...SharedMetadata,
  title: 'Conóceme - José Carrillo',
  description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  keywords: ['José Carrillo', 'banking', 'fintech', 'ecommerce'],
  alternates: {
    ...SharedMetadata.alternates,
    canonical: "/conoceme",
    languages: {
      'es-CO': '/conoceme',
      'en-US': '/en/about',
    },
  },
  openGraph: {
    ...SharedMetadata.openGraph,
    type: 'profile',
    url: '/conoceme',
    title: 'Junior Carrillo, desarrollador fullstack senior',
    description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  },
  twitter: {
    ...SharedMetadata.twitter,
    title: 'Junior Carrillo, desarrollador fullstack senior',
    description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  }
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Conoce más de mí</h1>

        <div className="mb-12">
          <Image
            src="/placeholder.svg"
            alt="DevPlatform Team"
            width={800}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p>
            DevPlatform was founded in 2024 with a simple mission: to make software development more efficient, collaborative, and enjoyable for developers around the world.
          </p>
          <p>
            Our team of passionate developers and designers work tirelessly to create tools and services that streamline the development process, foster collaboration, and help teams deliver high-quality software faster.
          </p>
          <p>
            We believe in the power of open source and community-driven development. That's why we actively contribute to open source projects and provide resources for developers to learn and grow.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals to join our mission. Check out our open positions and become part of the DevPlatform family.
          </p>
          <Button asChild>
            <a href="/careers">View Open Positions</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

