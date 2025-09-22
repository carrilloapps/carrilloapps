import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"

export function SiteFooter() {
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
              <Link href="/" className="text-zinc-400 hover:text-white">
                Inicio
              </Link>
              <Link href="/about" className="text-zinc-400 hover:text-white">
                Sobre mí
              </Link>
              <Link href="/sobre-mi" className="text-zinc-400 hover:text-white">
                Recursos
              </Link>
              <Link href="/contacto" className="text-zinc-400 hover:text-white">
                Contacto
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold" id="footer-services">
              Servicios
            </h3>
            <nav className="flex flex-col space-y-2" aria-labelledby="footer-services">
              <Link href="/servicios#technical-leadership" className="text-zinc-400 hover:text-white">
                Liderazgo técnico
              </Link>
              <Link href="/servicios#financial-systems" className="text-zinc-400 hover:text-white">
                Sistemas financieros
              </Link>
              <Link href="/servicios#backoffice-solutions" className="text-zinc-400 hover:text-white">
                Soluciones de backoffice
              </Link>
              <Link href="/servicios#architecture-design" className="text-zinc-400 hover:text-white">
                Diseño de arquitectura
              </Link>
            </nav>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold" id="footer-newsletter">
              Boletín Informativo
            </h3>
            <p className="text-zinc-400">Suscríbete para recibir actualizaciones sobre mis últimos proyectos y conocimientos tecnológicos.</p>
            <form className="flex flex-col sm:flex-row gap-2" aria-labelledby="footer-newsletter">
              <Input
                type="email"
                placeholder="Su correo electrónico"
                className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 flex-1"
                aria-label="Su correo electrónico"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} José Carrillo. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-zinc-400 hover:text-white text-sm">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-zinc-400 hover:text-white text-sm">
              Términos del Servicio
            </Link>
            <Link href="/cookies" className="text-zinc-400 hover:text-white text-sm">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
