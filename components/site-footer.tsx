"use client"

import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { trackSocialClick, trackNavigation, trackNewsletterSignup } from "@/lib/analytics"
import { useState, FormEvent } from "react"

// Get current year - safe for client component after hydration
const currentYear = typeof window !== 'undefined' ? new Date().getFullYear() : 2026

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      // Track newsletter signup attempt
      trackNewsletterSignup(email, 'footer', true)
      
      // Here you would normally send to your newsletter service
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear form on success
      setEmail('')
      alert('¡Gracias por suscribirte!')
    } catch {
      trackNewsletterSignup(email, 'footer', false)
      alert('Error al suscribirse. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-t border-zinc-800 bg-black" role="contentinfo">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400">
              Desarrollador de Software Senior y Líder Técnico especializado en soluciones de pago y financieras.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/carrilloapps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
                aria-label="GitHub de José Carrillo"
                onClick={() => trackSocialClick('GitHub', 'profile_visit', 'https://github.com/carrilloapps')}
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
                aria-label="LinkedIn de José Carrillo"
                onClick={() => trackSocialClick('LinkedIn', 'profile_visit', 'https://linkedin.com')}
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
                aria-label="X (Twitter) de José Carrillo"
                onClick={() => trackSocialClick('Twitter/X', 'profile_visit', 'https://twitter.com')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold" id="footer-quick-links">
              Enlaces rápidos
            </h3>
            <nav className="flex flex-col space-y-2" aria-labelledby="footer-quick-links">
              <Link 
                href="/" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Inicio', '/', 'footer')}
              >
                Inicio
              </Link>
              <Link 
                href="/about" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Sobre mí', '/about', 'footer')}
              >
                Sobre mí
              </Link>
              <Link 
                href="/sobre-mi" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Recursos', '/sobre-mi', 'footer')}
              >
                Recursos
              </Link>
              <Link 
                href="/contacto" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Contacto', '/contacto', 'footer')}
              >
                Contacto
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold" id="footer-services">
              Servicios
            </h3>
            <nav className="flex flex-col space-y-2" aria-labelledby="footer-services">
              <Link 
                href="/servicios#technical-leadership" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Liderazgo técnico', '/servicios#technical-leadership', 'footer')}
              >
                Liderazgo técnico
              </Link>
              <Link 
                href="/servicios#financial-systems" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Sistemas financieros', '/servicios#financial-systems', 'footer')}
              >
                Sistemas financieros
              </Link>
              <Link 
                href="/servicios#backoffice-solutions" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Soluciones de backoffice', '/servicios#backoffice-solutions', 'footer')}
              >
                Soluciones de backoffice
              </Link>
              <Link 
                href="/servicios#architecture-design" 
                className="text-zinc-400 hover:text-white"
                onClick={() => trackNavigation('Diseño de arquitectura', '/servicios#architecture-design', 'footer')}
              >
                Diseño de arquitectura
              </Link>
            </nav>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold" id="footer-newsletter">
              Boletín Informativo
            </h3>
            <p className="text-zinc-400">Suscríbete para recibir actualizaciones sobre mis últimos proyectos y conocimientos tecnológicos.</p>
            <form className="flex flex-col sm:flex-row gap-2" aria-labelledby="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Su correo electrónico"
                className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 flex-1"
                aria-label="Su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 text-sm text-center md:text-left">
            &copy; {currentYear} José Carrillo. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link 
              href="/privacidad" 
              className="text-zinc-400 hover:text-white text-sm"
              onClick={() => trackNavigation('Política de Privacidad', '/privacidad', 'footer')}
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/terminos" 
              className="text-zinc-400 hover:text-white text-sm"
              onClick={() => trackNavigation('Términos del Servicio', '/terminos', 'footer')}
            >
              Términos del Servicio
            </Link>
            <Link 
              href="/cookies" 
              className="text-zinc-400 hover:text-white text-sm"
              onClick={() => trackNavigation('Política de Cookies', '/cookies', 'footer')}
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
