import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "carrillo.app — Junior Carrillo, Tech Leader en pagos",
    short_name: "carrillo.app",
    description:
      "Herramientas de código abierto y escritura técnica de Junior Carrillo, Tech Leader en pagos e infraestructura financiera en LATAM.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#0b0c0e",
    orientation: "portrait",
    scope: "/",
    lang: "es-CO",
    categories: ["business", "technology", "finance", "education", "payments"],
    icons: [
      {
        src: "/icons/1024.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // 192 and 512 are generated inside the 80% safe zone, so Android can
      // crop them to any mask shape without cutting into the stamp frame.
      {
        src: "/icons/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Portada de carrillo.app: el encabezado del documento y las herramientas publicadas",
      },
      {
        src: "/screenshots/narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "carrillo.app en móvil: identificación, rol, base y trayectoria",
      },
    ],
    shortcuts: [
      {
        name: "Servicios",
        short_name: "Servicios",
        description: "Servicios de consultoría tecnológica",
        url: "/servicios",
        icons: [
          {
            src: "/icons/96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Contacto",
        short_name: "Contacto",
        description: "Ponte en contacto conmigo",
        url: "/contacto",
        icons: [
          {
            src: "/icons/96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],
  }
}
