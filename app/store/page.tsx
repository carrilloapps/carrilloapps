import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: 'Store - DevPlatform',
  description: 'Browse and purchase development tools and resources.',
}

const products = [
  {
    name: "Developer Toolkit Pro",
    description: "A comprehensive suite of development tools",
    price: 99,
    image: "/placeholder.svg"
  },
  {
    name: "UI Component Library",
    description: "Premium React components for modern applications",
    price: 49,
    image: "/placeholder.svg"
  },
  {
    name: "Performance Monitor",
    description: "Advanced monitoring and analytics tools",
    price: 79,
    image: "/placeholder.svg"
  },
  {
    name: "Security Scanner",
    description: "Automated security testing and vulnerability detection",
    price: 129,
    image: "/placeholder.svg"
  }
]

export default function StorePage() {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Store</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Browse our collection of developer tools and resources.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.name} className="flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-2xl font-bold">${product.price}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

