import { unstable_cache } from 'next/cache'
import type { WCProduct, WCCategory, WCOrder, WCCoupon, Product } from '@/types/woocommerce'

const CACHE_TIME = 3600 // 1 hour in seconds

// WooCommerce REST API configuration (reads from env on every call)
function getWCConfig() {
  const apiUrl = process.env.WORDPRESS_API_URL
  if (!apiUrl) {
    throw new Error('WORDPRESS_API_URL environment variable is required')
  }

  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET

  if (!consumerKey || !consumerSecret) {
    throw new Error('WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET environment variables are required')
  }

  return {
    baseUrl: `${apiUrl}/wc/v3`,
    consumerKey,
    consumerSecret,
  }
}

// Build Basic Auth header for WooCommerce requests
function getWCAuthHeaders(): Record<string, string> {
  const { consumerKey, consumerSecret } = getWCConfig()
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

  return {
    'Authorization': `Basic ${credentials}`,
    'Accept': 'application/json',
    'User-Agent': 'CarrilloApps/1.0',
  }
}

// Transform WCProduct to simplified Product
function transformWCProductToProduct(product: WCProduct): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.short_description,
    price: product.price,
    regularPrice: product.regular_price,
    salePrice: product.sale_price,
    onSale: product.on_sale,
    featured: product.featured,
    images: product.images.map(img => ({ src: img.src, alt: img.alt })),
    categories: product.categories.map(cat => ({ name: cat.name, slug: cat.slug })),
    tags: product.tags.map(tag => ({ name: tag.name, slug: tag.slug })),
    averageRating: product.average_rating,
    ratingCount: product.rating_count,
    stockStatus: product.stock_status,
    sku: product.sku,
    permalink: product.permalink,
    type: product.type,
    virtual: product.virtual,
    downloadable: product.downloadable,
    dateCreated: product.date_created,
    dateModified: product.date_modified,
    totalSales: product.total_sales,
    attributes: product.attributes.map(attr => ({ name: attr.name, options: attr.options })),
  }
}

// Generic fetch helper for WooCommerce API
async function fetchWC<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const { baseUrl } = getWCConfig()
  const headers = getWCAuthHeaders()

  const queryString = new URLSearchParams(params).toString()
  const url = queryString ? `${baseUrl}${endpoint}?${queryString}` : `${baseUrl}${endpoint}`

  const response = await fetch(url, {
    next: { revalidate: CACHE_TIME, tags: ['woocommerce'] },
    headers,
  })

  if (!response.ok) {
    throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`)
  }

  return await response.json() as T
}

// === Products ===

export const getCachedProducts = unstable_cache(
  async (params: { per_page?: string; page?: string; category?: string; featured?: string; on_sale?: string; orderby?: string; order?: string } = {}): Promise<Product[]> => {
    try {
      const queryParams: Record<string, string> = {
        per_page: params.per_page || '100',
        orderby: params.orderby || 'date',
        order: params.order || 'desc',
        status: 'publish',
      }

      if (params.page) queryParams.page = params.page
      if (params.category) queryParams.category = params.category
      if (params.featured) queryParams.featured = params.featured
      if (params.on_sale) queryParams.on_sale = params.on_sale

      const products = await fetchWC<WCProduct[]>('/products', queryParams)
      if (!Array.isArray(products)) return []
      return products.map(transformWCProductToProduct)
    } catch (error) {
      console.error('Error fetching WooCommerce products:', error)
      return []
    }
  },
  ['wc-products'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

export const getCachedProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    try {
      const products = await fetchWC<WCProduct[]>('/products', { slug })
      if (!Array.isArray(products) || products.length === 0) return null
      return transformWCProductToProduct(products[0])
    } catch (error) {
      console.error('Error fetching WooCommerce product by slug:', error)
      return null
    }
  },
  ['wc-product-by-slug'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

export const getCachedFeaturedProducts = unstable_cache(
  async (limit = 4): Promise<Product[]> => {
    try {
      const products = await fetchWC<WCProduct[]>('/products', {
        featured: 'true',
        per_page: limit.toString(),
        status: 'publish',
      })
      if (!Array.isArray(products)) return []
      return products.map(transformWCProductToProduct)
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  },
  ['wc-featured-products'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

export const getCachedOnSaleProducts = unstable_cache(
  async (limit = 8): Promise<Product[]> => {
    try {
      const products = await fetchWC<WCProduct[]>('/products', {
        on_sale: 'true',
        per_page: limit.toString(),
        status: 'publish',
      })
      if (!Array.isArray(products)) return []
      return products.map(transformWCProductToProduct)
    } catch (error) {
      console.error('Error fetching on-sale products:', error)
      return []
    }
  },
  ['wc-on-sale-products'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

export const getCachedRelatedProducts = unstable_cache(
  async (productId: number, limit = 4): Promise<Product[]> => {
    try {
      const product = await fetchWC<WCProduct>(`/products/${productId}`)
      if (!product?.related_ids?.length) return []

      const relatedIds = product.related_ids.slice(0, limit)
      const products = await fetchWC<WCProduct[]>('/products', {
        include: relatedIds.join(','),
        per_page: limit.toString(),
      })
      if (!Array.isArray(products)) return []
      return products.map(transformWCProductToProduct)
    } catch (error) {
      console.error('Error fetching related products:', error)
      return []
    }
  },
  ['wc-related-products'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

// === Categories ===

export const getCachedProductCategories = unstable_cache(
  async (): Promise<WCCategory[]> => {
    try {
      const categories = await fetchWC<WCCategory[]>('/products/categories', {
        per_page: '100',
        orderby: 'name',
        order: 'asc',
        hide_empty: 'true',
      })
      if (!Array.isArray(categories)) return []
      return categories
    } catch (error) {
      console.error('Error fetching product categories:', error)
      return []
    }
  },
  ['wc-product-categories'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

// === Orders ===

export const getCachedOrders = unstable_cache(
  async (params: { per_page?: string; page?: string; status?: string } = {}): Promise<WCOrder[]> => {
    try {
      const queryParams: Record<string, string> = {
        per_page: params.per_page || '20',
        orderby: 'date',
        order: 'desc',
      }

      if (params.page) queryParams.page = params.page
      if (params.status) queryParams.status = params.status

      const orders = await fetchWC<WCOrder[]>('/orders', queryParams)
      if (!Array.isArray(orders)) return []
      return orders
    } catch (error) {
      console.error('Error fetching WooCommerce orders:', error)
      return []
    }
  },
  ['wc-orders'],
  { revalidate: 300, tags: ['woocommerce-orders'] }
)

export const getCachedOrderById = unstable_cache(
  async (orderId: number): Promise<WCOrder | null> => {
    try {
      return await fetchWC<WCOrder>(`/orders/${orderId}`)
    } catch (error) {
      console.error('Error fetching WooCommerce order:', error)
      return null
    }
  },
  ['wc-order-by-id'],
  { revalidate: 300, tags: ['woocommerce-orders'] }
)

// === Coupons ===

export const getCachedCoupons = unstable_cache(
  async (): Promise<WCCoupon[]> => {
    try {
      const coupons = await fetchWC<WCCoupon[]>('/coupons', {
        per_page: '100',
      })
      if (!Array.isArray(coupons)) return []
      return coupons
    } catch (error) {
      console.error('Error fetching WooCommerce coupons:', error)
      return []
    }
  },
  ['wc-coupons'],
  { revalidate: CACHE_TIME, tags: ['woocommerce'] }
)

// Revalidate WooCommerce cache (for webhooks)
export async function revalidateWooCommerceCache() {
  console.log('WooCommerce cache revalidation requested')
}

export { getWCConfig }
