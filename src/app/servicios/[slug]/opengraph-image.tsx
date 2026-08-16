import { renderPageOg, ogSize, ogContentType } from "@/lib/og"
import { SERVICES, getService } from "@/lib/data/services"

export const alt = "Servicio — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

/** One card per service, prerendered alongside its page. */
export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)

  return renderPageOg({
    eyebrow: `Servicios · ${service?.title ?? ""}`.trim(),
    title: service?.heading ?? "Servicios",
    subtitle: service?.summary,
    particulars: service?.particulars,
  })
}
