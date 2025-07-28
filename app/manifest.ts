import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'José Carrillo - Tech Lead & Software Architect',
    short_name: 'José Carrillo',
    description: 'Senior Software Developer & Tech Leader especializado en sistemas financieros y liderazgo técnico',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    scope: '/',
    lang: 'es-ES',
    categories: ['business', 'technology', 'finance', 'education'],
    icons: [
      {
        src: '/placeholder-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
      {
        src: '/placeholder-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/placeholder-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/placeholder.jpg',
        sizes: '1280x720',
        type: 'image/jpeg',
        form_factor: 'wide',
        label: 'José Carrillo - Página Principal',
      },
      {
        src: '/placeholder.jpg',
        sizes: '750x1334',
        type: 'image/jpeg',
        form_factor: 'narrow',
        label: 'José Carrillo - Vista Móvil',
      },
    ],
    shortcuts: [
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Artículos sobre tecnología y desarrollo',
        url: '/blog',
        icons: [
          {
            src: '/placeholder-logo.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Servicios',
        short_name: 'Servicios',
        description: 'Servicios de consultoría tecnológica',
        url: '/servicios',
        icons: [
          {
            src: '/placeholder-logo.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Contacto',
        short_name: 'Contacto',
        description: 'Ponte en contacto conmigo',
        url: '/contacto',
        icons: [
          {
            src: '/placeholder-logo.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    ],
  }
}