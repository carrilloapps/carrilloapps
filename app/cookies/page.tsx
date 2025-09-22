import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>

          <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introducción</h2>
              <p className="text-zinc-400">
                Última actualización:{" "}
                {new Date(1747346137458).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-zinc-400">
                Esta Política de Cookies explica cómo José Carrillo ("yo", "mi", o "mío") utiliza cookies y tecnologías similares 
                para reconocerte cuando visitas mi sitio web en carrillo.app. En ella se explica qué son estas tecnologías, 
                por qué las utilizo, así como tus derechos para controlar mi uso de ellas en conformidad con la legislación 
                colombiana y las mejores prácticas internacionales de privacidad digital.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">¿Qué Son las Cookies?</h2>
              <p className="text-zinc-400">
                Las cookies son pequeños archivos de datos que se colocan en tu computadora o dispositivo móvil cuando visitas un sitio web.
                Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios funcionen, o funcionen
                de manera más eficiente, así como para proporcionar información de reportes.
              </p>
              <p className="text-zinc-400">
                Las cookies establecidas por el propietario del sitio web (en este caso, José Carrillo) se denominan "cookies de primera parte".
                Las cookies establecidas por terceros se denominan "cookies de terceros". Las cookies de terceros permiten que funciones
                o características de terceros se proporcionen en o a través del sitio web (por ejemplo, análisis de uso, contenido interactivo
                y referencias a redes sociales). Las partes que establecen estas cookies de terceros pueden reconocer tu dispositivo
                tanto cuando visita nuestro sitio web como cuando visita ciertos otros sitios web.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">¿Por Qué Utilizo Cookies?</h2>
              <p className="text-zinc-400">
                Utilizo cookies propias y de terceros por varias razones. Algunas cookies son necesarias por razones técnicas
                para que mi sitio web funcione correctamente, y las denomino cookies "esenciales" o "estrictamente necesarias".
                Otras cookies me permiten rastrear y segmentar los intereses de los usuarios para mejorar la experiencia
                en mi propiedad online. Terceros proporcionan cookies a través de mi sitio web para análisis y otros fines.
              </p>
              <p className="text-zinc-400">
                Los tipos específicos de cookies propias y de terceros que se utilizan en mi sitio web y los fines que
                cumplen se describen a continuación:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  <strong>Cookies esenciales del sitio web:</strong> Estas cookies son estrictamente necesarias para proporcionarte
                  los servicios disponibles a través de mi sitio web y para utilizar algunas de sus características, como el acceso
                  a áreas seguras o la funcionalidad del formulario de contacto.
                </li>
                <li>
                  <strong>Cookies de rendimiento y funcionalidad:</strong> Estas cookies se utilizan para mejorar el rendimiento
                  y la funcionalidad de mi sitio web, pero no son esenciales para su uso. Sin embargo, sin estas cookies,
                  ciertas funcionalidades pueden no estar disponibles.
                </li>
                <li>
                  <strong>Cookies de análisis y personalización:</strong> Estas cookies recopilan información que se utiliza
                  en forma agregada para ayudarme a entender cómo se utiliza mi sitio web o qué tan efectivas son mis
                  publicaciones en blogs técnicos y repositorios de código, o para ayudarme a personalizar mi sitio web para ti.
                </li>
              </ul>
              <p className="text-zinc-400">
                Conforme a las disposiciones de la Ley 1581 de 2012 y demás normativa colombiana aplicable, solicito tu
                consentimiento expreso antes de utilizar cookies no esenciales. Puedes modificar o retirar este consentimiento
                en cualquier momento utilizando nuestro gestor de consentimiento de cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">¿Cómo Puedes Controlar las Cookies?</h2>
              <p className="text-zinc-400">
                Tienes derecho a decidir si aceptas o rechazas las cookies. Puedes ejercer tus derechos relacionados con las cookies
                configurando tus preferencias en el Gestor de Consentimiento de Cookies que aparece cuando visitas mi sitio por primera vez.
                El Gestor de Consentimiento de Cookies te permite seleccionar qué categorías de cookies aceptas o rechazas.
                Las cookies esenciales no pueden ser rechazadas, ya que son estrictamente necesarias para proporcionarte los servicios básicos.
              </p>
              <p className="text-zinc-400">
                Si eliges rechazar las cookies, aún podrás usar mi sitio web, aunque tu acceso a algunas funcionalidades
                y áreas puede estar restringido. También puedes configurar o modificar los controles de tu navegador web
                para aceptar o rechazar cookies. La forma de hacerlo depende de tu navegador:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios</li>
                <li>Firefox: Menú > Opciones > Privacidad y Seguridad > Cookies y datos del sitio</li>
                <li>Safari: Preferencias > Privacidad > Cookies y datos del sitio web</li>
                <li>Edge: Configuración > Cookies y permisos del sitio > Cookies</li>
              </ul>
              <p className="text-zinc-400">
                Los tipos específicos de cookies propias y de terceros que se utilizan en mi sitio web y los fines
                que cumplen se describen en la tabla siguiente:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-zinc-800">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-4 py-2 text-left">Nombre de Cookie</th>
                      <th className="px-4 py-2 text-left">Propósito</th>
                      <th className="px-4 py-2 text-left">Caducidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_ga</td>
                      <td className="px-4 py-2 text-zinc-400">Cookie de Google Analytics utilizada para distinguir usuarios</td>
                      <td className="px-4 py-2 text-zinc-400">2 años</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_gid</td>
                      <td className="px-4 py-2 text-zinc-400">Cookie de Google Analytics utilizada para distinguir usuarios</td>
                      <td className="px-4 py-2 text-zinc-400">24 horas</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">_gat</td>
                      <td className="px-4 py-2 text-zinc-400">Cookie de Google Analytics utilizada para limitar la frecuencia de solicitudes</td>
                      <td className="px-4 py-2 text-zinc-400">1 minuto</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-zinc-400">cookie_consent</td>
                      <td className="px-4 py-2 text-zinc-400">Almacena tus preferencias de consentimiento de cookies</td>
                      <td className="px-4 py-2 text-zinc-400">6 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Cambios en esta Política de Cookies</h2>
              <p className="text-zinc-400">
                Puedo actualizar esta Política de Cookies periódicamente para reflejar, por ejemplo, cambios en las
                cookies que utilizo o por otras razones operativas, legales o regulatorias. Te recomiendo visitar
                regularmente esta Política de Cookies para mantenerte informado sobre mi uso de cookies y tecnologías relacionadas.
              </p>
              <p className="text-zinc-400">
                La fecha en la parte superior de esta Política de Cookies indica cuándo fue actualizada por última vez.
                Cualquier cambio en la forma en que utilizo las cookies será reflejado en este documento y comunicado mediante
                el gestor de consentimiento.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Marco Legal</h2>
              <p className="text-zinc-400">
                Esta Política de Cookies ha sido elaborada en cumplimiento de la normativa colombiana aplicable, 
                incluida la Ley 1581 de 2012 (Ley de Protección de Datos Personales), el Decreto 1377 de 2013, 
                y las directrices proporcionadas por la Superintendencia de Industria y Comercio de Colombia 
                en materia de protección de datos personales y privacidad en línea.
              </p>
              <p className="text-zinc-400">
                Para los visitantes de países de la Unión Europea, esta política también se alinea con los requisitos 
                del Reglamento General de Protección de Datos (GDPR) en lo que respecta al uso de cookies e información 
                de rastreo similar.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Información de Contacto</h2>
              <p className="text-zinc-400">
                Si tienes alguna pregunta sobre mi uso de cookies u otras tecnologías, o sobre cómo ejercer tus derechos 
                relacionados con la privacidad de tus datos, por favor contáctame en:
              </p>
              <p className="text-zinc-400">Correo electrónico: legal@carrillo.app</p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
