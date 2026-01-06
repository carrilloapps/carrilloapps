import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

          <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introducción</h2>
              <p className="text-zinc-400">
                Última actualización:{" "}
                {new Date(1747346137458).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-zinc-400">
                Gracias por visitar mi sitio web profesional. Yo, José Carrillo,
                valoro y respeto tu privacidad y me comprometo a proteger tus
                datos personales en conformidad con la Ley Estatutaria 1581 de
                2012 y el Decreto 1377 de 2013 de la República de Colombia. Esta
                política de privacidad te informará sobre cómo protejo tus datos
                personales, tus derechos de privacidad y cómo la ley te protege.
              </p>
              <p className="text-zinc-400">
                Esta política se aplica a la información que recopilo a través
                de mi sitio web en carrillo.app, por correo electrónico,
                mensajes de texto u otras comunicaciones electrónicas entre tú y
                este sitio web.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Información que Recopilo</h2>
              <p className="text-zinc-400">
                Como responsable del tratamiento de datos, puedo recopilar
                varios tipos de información de los usuarios de mi sitio web,
                incluyendo:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  Información personal que proporcionas directamente cuando
                  completas formularios en mi sitio web, incluyendo tu nombre,
                  dirección de correo electrónico, y cualquier mensaje que me
                  envíes a través del formulario de contacto.
                </li>
                <li>
                  Información sobre tu conexión a Internet, el equipo que
                  utilizas para acceder a mi sitio web y detalles de uso, que se
                  recopila automáticamente como parte de la navegación.
                </li>
                <li>
                  Información de identificación no personal, incluyendo el
                  nombre del navegador, tipo de computadora e información
                  técnica sobre tu medio de conexión a mi sitio web, sistema
                  operativo y proveedor de servicios de Internet.
                </li>
                <li>
                  Datos sobre tu perfil profesional si decides compartirlos para
                  consultas relacionadas con servicios de desarrollo de
                  software, arquitectura técnica o mentoría.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Cómo Utilizo Tu Información
              </h2>
              <p className="text-zinc-400">
                Utilizo la información que recopilo sobre ti o que me
                proporcionas, incluida cualquier información personal, para los
                siguientes fines:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  Presentarte mi sitio web y sus contenidos de manera adecuada.
                </li>
                <li>
                  Responder a tus consultas y proporcionarte la información que
                  solicites.
                </li>
                <li>
                  Enviarte comunicaciones relacionadas con servicios
                  profesionales, si así lo solicitas.
                </li>
                <li>
                  Cumplir con cualquier otro propósito para el que la
                  proporcionas.
                </li>
                <li>
                  Cumplir mis obligaciones y hacer valer mis derechos derivados
                  de cualquier contrato entre tú y yo.
                </li>
                <li>
                  Mejorar mi sitio web y ofrecer una mejor experiencia al
                  analizar cómo los usuarios navegan e interactúan con el sitio.
                </li>
                <li>
                  De cualquier otra manera que describa cuando proporcionas la
                  información.
                </li>
                <li>
                  Para cualquier otro propósito con tu consentimiento expreso.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Cookies y Tecnologías de Seguimiento
              </h2>
              <p className="text-zinc-400">
                Mi sitio web utiliza cookies y tecnologías de seguimiento
                similares para rastrear la actividad en mi sitio web y almacenar
                cierta información. Las cookies son archivos con una pequeña
                cantidad de datos que pueden incluir un identificador único
                anónimo.
              </p>
              <p className="text-zinc-400">
                Utilizamos cookies para mejorar la experiencia del usuario,
                analizar el tráfico y personalizar el contenido. Para
                información más detallada sobre las cookies específicas que
                utilizo, consulta mi
                <a
                  href="/cookies"
                  className="text-blue-500 hover:text-blue-400"
                >
                  {" "}
                  Política de Cookies
                </a>
                .
              </p>
              <p className="text-zinc-400">
                Puedes configurar tu navegador para que rechace todas o algunas
                cookies, o para que te avise cuando se envíen cookies. Sin
                embargo, si no aceptas cookies, es posible que no puedas
                utilizar algunas partes de mi sitio web.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Seguridad de Datos</h2>
              <p className="text-zinc-400">
                He implementado medidas técnicas y organizativas apropiadas para
                proteger tus datos personales contra pérdidas accidentales y
                contra el acceso, uso, alteración y divulgación no autorizados,
                conforme a lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377
                de 2013. No obstante, la transmisión de información a través de
                Internet no es completamente segura, y aunque me esfuerzo por
                proteger tu información personal, no puedo garantizar la
                seguridad absoluta de los datos transmitidos a mi sitio web.
              </p>
              <p className="text-zinc-400">
                En particular, para proyectos relacionados con sistemas
                financieros y aplicaciones críticas, implemento protocolos
                adicionales de seguridad para los datos compartidos mediante
                formularios de contacto.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Enlaces a Terceros</h2>
              <p className="text-zinc-400">
                Mi sitio web puede contener enlaces a sitios web, plugins y
                aplicaciones de terceros, como GitHub, Medium, o plataformas de
                redes sociales donde comparto mi trabajo profesional. Hacer clic
                en esos enlaces o habilitar esas conexiones puede permitir que
                terceros recopilen o compartan datos sobre ti. No controlo estos
                sitios web de terceros y no soy responsable de sus declaraciones
                de privacidad. Te recomiendo leer la política de privacidad de
                cada sitio que visites, incluidos aquellos a los que accedas a
                través de enlaces en mi sitio web.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Derechos de los Titulares de Datos
              </h2>
              <p className="text-zinc-400">
                De acuerdo con la ley colombiana de protección de datos (Ley
                1581 de 2012), tienes los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Conocer, actualizar y rectificar tus datos personales.</li>
                <li>
                  Solicitar la prueba de la autorización otorgada para el
                  tratamiento de tus datos.
                </li>
                <li>
                  Ser informado sobre el uso que se ha dado a tus datos
                  personales.
                </li>
                <li>
                  Presentar quejas ante la Superintendencia de Industria y
                  Comercio por infracciones a la ley.
                </li>
                <li>
                  Revocar la autorización y/o solicitar la supresión de tus
                  datos cuando no se respeten los principios, derechos y
                  garantías constitucionales y legales.
                </li>
                <li>
                  Acceder de forma gratuita a tus datos personales que hayan
                  sido objeto de tratamiento.
                </li>
              </ul>
              <p className="text-zinc-400">
                Para ejercer estos derechos, puedes contactarme directamente a
                través del formulario de contacto en mi sitio web o enviando un
                correo electrónico a la dirección que se indica en la sección
                "Información de Contacto".
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Transferencia Internacional de Datos
              </h2>
              <p className="text-zinc-400">
                Como desarrollador especializado en sistemas financieros y
                tecnológicos que trabaja con clientes internacionales, en
                ocasiones puede ser necesario transferir datos a países fuera de
                Colombia. En tales casos, me aseguro de que existan garantías
                adecuadas para proteger tu información, cumpliendo con los
                principios establecidos en la Ley 1581 de 2012 y garantizando un
                nivel adecuado de protección de datos comparable al requerido
                por la legislación colombiana.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Cambios en esta Política de Privacidad
              </h2>
              <p className="text-zinc-400">
                Puedo actualizar esta política de privacidad periódicamente para
                reflejar cambios en mis prácticas de información o por otros
                motivos operativos, legales o regulatorios. Te notificaré sobre
                cualquier cambio publicando la nueva política de privacidad en
                esta página y actualizando la fecha de "Última actualización".
              </p>
              <p className="text-zinc-400">
                Se recomienda revisar esta política de privacidad periódicamente
                para cualquier cambio. Los cambios en esta política de
                privacidad entran en vigor cuando se publican en esta página.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Información de Contacto</h2>
              <p className="text-zinc-400">
                Si tienes alguna pregunta sobre esta política de privacidad o
                mis prácticas de datos, o si deseas ejercer cualquiera de tus
                derechos como titular de datos, por favor contáctame en:
              </p>
              <p className="text-zinc-400">Correo electrónico: legal@carrillo.app</p>
              <p className="text-zinc-400">
                Como responsable del tratamiento de datos personales, me
                comprometo a responder a tu solicitud dentro de los plazos
                establecidos por la legislación colombiana aplicable.
              </p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
