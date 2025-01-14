export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
        <div>
          <h4 className="text-sm font-semibold mb-4">José Carrillo</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/conoceme" className="hover:underline">Conóceme</a></li>
            <li><a href="/careers" className="hover:underline">Empleos</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/docs" className="hover:underline">Documentación</a></li>
            <li><a href="/api" className="hover:underline">API Rest Full</a></li>
            <li><a href="/soporte" className="hover:underline">Soporte</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:underline">Términos de servicio</a></li>
            <li><a href="/privacy" className="hover:underline">Política de privacidad</a></li>
            <li><a href="/cookies" className="hover:underline">Política de cookies</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Soporte</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:underline">Preguntas frecuentes</a></li>
            <li><a href="/contact" className="hover:underline">Contácto</a></li>
            <li><a href="/status" className="hover:underline">Estado</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Plataformas</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/features" className="hover:underline">Aplicaciones</a></li>
            <li><a href="/integrations" className="hover:underline">Integración</a></li>
            <li><a href="/pricing" className="hover:underline">Precios</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col sm:flex-row justify-between items-center py-6 text-sm">
          <p>José Carrillo &copy; {new Date().getFullYear()}</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="/terms" className="hover:underline">Términos de servicio</a>
            <a href="/privacy" className="hover:underline">Política de privacidad</a>
            <a href="/cookies" className="hover:underline">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

