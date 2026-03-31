import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ShoppingCart, Loader } from 'lucide-react'
import { formatPrice } from '@/lib/stripe'

export function ProductsPage() {
  const products = useQuery(api.products.getProducts)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAddToCart = async (productId: string) => {
    setLoadingId(productId)
    try {
      // Implement your cart logic here
      console.log('Added to cart:', productId)
    } finally {
      setLoadingId(null)
    }
  }

  if (products === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">
            Choose from our collection of products
          </p>
        </div>

        {products.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">
                No products available yet
              </p>
              <Button variant="outline">Browse All</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product._id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                {product.imageUrl && (
                  <div className="aspect-video bg-muted overflow-hidden rounded-t-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="flex-1">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    disabled={loadingId === product._id}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    {loadingId === product._id ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
