// WooCommerce REST API v3 response types

export interface WCProductImage {
  id: number
  date_created: string
  date_modified: string
  src: string
  name: string
  alt: string
}

export interface WCProductCategory {
  id: number
  name: string
  slug: string
}

export interface WCProductTag {
  id: number
  name: string
  slug: string
}

export interface WCProductAttribute {
  id: number
  name: string
  slug: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export interface WCProductDimensions {
  length: string
  width: string
  height: string
}

export interface WCProductDownload {
  id: string
  name: string
  file: string
}

export interface WCProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: 'simple' | 'grouped' | 'external' | 'variable'
  status: 'draft' | 'pending' | 'private' | 'publish'
  featured: boolean
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden'
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: WCProductDownload[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: 'taxable' | 'shipping' | 'none'
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  backorders: 'no' | 'notify' | 'yes'
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: WCProductDimensions
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  parent_id: number
  categories: WCProductCategory[]
  tags: WCProductTag[]
  images: WCProductImage[]
  attributes: WCProductAttribute[]
  menu_order: number
}

export interface WCCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: WCProductImage | null
  menu_order: number
  count: number
}

export interface WCOrder {
  id: number
  status: string
  currency: string
  date_created: string
  date_modified: string
  total: string
  customer_id: number
  billing: WCBillingAddress
  shipping: WCShippingAddress
  line_items: WCLineItem[]
  payment_method: string
  payment_method_title: string
}

export interface WCBillingAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string
}

export interface WCShippingAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
}

export interface WCLineItem {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  total: string
  sku: string
  price: number
  image: WCProductImage
}

export interface WCCoupon {
  id: number
  code: string
  amount: string
  status: string
  discount_type: 'percent' | 'fixed_cart' | 'fixed_product'
  description: string
  date_created: string
  date_expires: string | null
  usage_count: number
  usage_limit: number | null
  free_shipping: boolean
  product_ids: number[]
  excluded_product_ids: number[]
  minimum_amount: string
  maximum_amount: string
}

// Simplified product type for frontend display
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  shortDescription: string
  price: string
  regularPrice: string
  salePrice: string
  onSale: boolean
  featured: boolean
  images: Array<{ src: string; alt: string }>
  categories: Array<{ name: string; slug: string }>
  tags: Array<{ name: string; slug: string }>
  averageRating: string
  ratingCount: number
  stockStatus: string
  sku: string
  permalink: string
  type: string
  virtual: boolean
  downloadable: boolean
  dateCreated: string
  dateModified: string
  totalSales: number
  attributes: Array<{ name: string; options: string[] }>
}
