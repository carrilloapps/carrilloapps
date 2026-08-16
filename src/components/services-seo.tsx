"use client"

import { useEffect, useState } from "react"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"

const SITE_URL = getSiteUrl()

export function ServicesSeo() {
  const [activeService, setActiveService] = useState("technical-leadership")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveService(hash)
      }
    }

    // Inicializar con el hash actual
    handleHashChange()

    // Escuchar cambios en el hash
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <>
      <ServiceJsonLd service={activeService} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Servicios", url: `${SITE_URL}/services` },
          {
            name: activeService
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            url: `${SITE_URL}/services#${activeService}`,
          },
        ]}
      />
    </>
  )
}
