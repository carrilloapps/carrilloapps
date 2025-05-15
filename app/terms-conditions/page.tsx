import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>

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
                Bienvenido al sitio web profesional de José Carrillo. Estos
                términos y condiciones establecen las reglas y normativas para
                el uso de mi sitio web, ubicado en carrillo.app, y aplican a
                todos los usuarios y visitantes.
              </p>
              <p className="text-zinc-400">
                El presente documento constituye un acuerdo legalmente
                vinculante entre el usuario y José Carrillo. Al acceder a este
                sitio web, se asume que aceptas estos términos y condiciones en
                su totalidad. Si no estás de acuerdo con alguna parte de estos
                términos y condiciones, no debes utilizar este sitio web.
              </p>
              <p className="text-zinc-400">
                Este sitio web se rige por las leyes de la República de
                Colombia. Cualquier disputa relacionada con este sitio web
                estará sujeta a la jurisdicción de los tribunales colombianos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Derechos de Propiedad Intelectual
              </h2>
              <p className="text-zinc-400">
                Salvo que se indique lo contrario, José Carrillo posee los
                derechos de propiedad intelectual de todo el material en
                carrillo.app, protegido bajo las leyes colombianas de derechos
                de autor (Ley 23 de 1982, Ley 44 de 1993, Decisión Andina 351 de
                1993, y demás normas complementarias). Todos los derechos de
                propiedad intelectual están reservados. Puedes acceder a este
                sitio web para tu uso personal, sujeto a las restricciones
                establecidas en estos términos y condiciones.
              </p>
              <p className="text-zinc-400">
                No debes, sin mi autorización expresa por escrito:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>Republicar material de carrillo.app</li>
                <li>
                  Vender, alquilar o sublicenciar material de carrillo.app
                </li>
                <li>Reproducir, duplicar o copiar material de carrillo.app</li>
                <li>Redistribuir contenido de carrillo.app</li>
                <li>
                  Utilizar el contenido para fines comerciales sin autorización
                  previa
                </li>
              </ul>
              <p className="text-zinc-400">
                Algunas secciones de este sitio web ofrecen la oportunidad a los
                usuarios de compartir comentarios sobre artículos técnicos o
                proyectos de código. No filtro, edito, publico ni reviso
                comentarios antes de su aparición en el sitio web. Los
                comentarios no reflejan mis puntos de vista u opiniones. Me
                reservo el derecho de eliminar comentarios que considere
                inapropiados, ofensivos o que violen estos términos y
                condiciones.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Responsabilidad del Contenido
              </h2>
              <p className="text-zinc-400">
                No seré responsable por ningún contenido que aparezca en tu
                sitio web como resultado de enlazar el mío. Aceptas protegerme y
                defenderme contra todas las reclamaciones que surjan en tu sitio
                web. No debe(n) aparecer ningún enlace en cualquier sitio web
                que pueda ser interpretado como difamatorio, obsceno o
                delictivo, o que infrinja, viole o promueva la infracción o
                cualquier otra violación de los derechos de terceros.
              </p>
              <p className="text-zinc-400">
                Todo el contenido publicado en este sitio web, incluyendo pero
                no limitado a artículos técnicos, código fuente de ejemplos, y
                material educativo, se proporciona únicamente con fines
                informativos y educativos. No garantizo la exactitud, integridad
                o actualidad del contenido. El uso de cualquier información o
                código proporcionado es bajo tu propia responsabilidad y riesgo.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Reserva de Derechos</h2>
              <p className="text-zinc-400">
                Me reservo el derecho de solicitar que elimines todos los
                enlaces o cualquier enlace particular a mi sitio web. Aceptas
                eliminar inmediatamente todos los enlaces a mi sitio web cuando
                te lo solicite. También me reservo el derecho de modificar estos
                términos y condiciones y su política de enlaces en cualquier
                momento, de acuerdo con las disposiciones establecidas en el
                Código Civil colombiano y la legislación aplicable. Al continuar
                enlazando a mi sitio web, aceptas estar vinculado y seguir estos
                términos y condiciones de enlace.
              </p>
              <p className="text-zinc-400">
                Me reservo el derecho de modificar o discontinuar, temporal o
                permanentemente, el sitio web o cualquier parte del mismo con o
                sin previo aviso. No seré responsable ante ti ni ante terceros
                por cualquier modificación, suspensión o interrupción del sitio
                web.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Eliminación de Enlaces de Mi Sitio Web
              </h2>
              <p className="text-zinc-400">
                Si encuentras algún enlace en mi sitio web que sea ofensivo por
                cualquier motivo, tienes libertad para contactarme e informarme
                en cualquier momento. Consideraré las solicitudes para eliminar
                enlaces, pero no estoy obligado a hacerlo ni a responderte
                directamente. Sin embargo, me esforzaré por atender todas las
                comunicaciones en un plazo razonable.
              </p>
              <p className="text-zinc-400">
                No garantizo que la información en este sitio web sea correcta,
                no garantizo su integridad o exactitud; ni prometo asegurar que
                el sitio web permanezca disponible o que el material en el sitio
                web se mantenga actualizado. El contenido técnico puede quedar
                obsoleto con el tiempo debido a los rápidos cambios en las
                tecnologías de desarrollo de software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Exención de Responsabilidad
              </h2>
              <p className="text-zinc-400">
                En la máxima medida permitida por la ley aplicable colombiana,
                excluyo todas las representaciones, garantías y condiciones
                relacionadas con mi sitio web y el uso de este sitio web, en
                conformidad con los artículos 1604 a 1615 del Código Civil
                colombiano y demás normas aplicables. Nada en esta exención de
                responsabilidad:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                <li>
                  Limitará o excluirá mi responsabilidad o la tuya por muerte o
                  lesiones personales;
                </li>
                <li>
                  Limitará o excluirá mi responsabilidad o la tuya por fraude o
                  tergiversación fraudulenta;
                </li>
                <li>
                  Limitará cualquiera de mis responsabilidades o las tuyas de
                  manera no permitida por la legislación aplicable; o
                </li>
                <li>
                  Excluirá cualquiera de mis responsabilidades o las tuyas que
                  no puedan ser excluidas según la legislación aplicable.
                </li>
              </ul>
              <p className="text-zinc-400">
                Las limitaciones y prohibiciones de responsabilidad establecidas
                en esta sección y en otras partes de esta exención de
                responsabilidad: (a) están sujetas al párrafo anterior; y (b)
                rigen todas las responsabilidades que surjan en virtud de la
                exención de responsabilidad, incluidas las responsabilidades que
                surjan por contrato, por acto ilícito y por incumplimiento del
                deber legal.
              </p>
              <p className="text-zinc-400">
                En la medida en que el sitio web y la información y los
                servicios en el sitio web se proporcionen de forma gratuita, no
                seré responsable de ninguna pérdida o daño de ninguna
                naturaleza, excepto en los casos previstos por la legislación
                colombiana sobre protección al consumidor (Ley 1480 de 2011).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Solución de Disputas</h2>
              <p className="text-zinc-400">
                Cualquier disputa que surja de o en conexión con estos Términos
                y Condiciones, incluyendo cualquier cuestión relacionada con su
                existencia, validez o terminación, será resuelta a través de un
                proceso de conciliación de acuerdo con la legislación
                colombiana. Si no se llegara a un acuerdo mediante conciliación,
                la disputa será sometida a la jurisdicción de los tribunales
                colombianos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Protección de Datos</h2>
              <p className="text-zinc-400">
                El tratamiento de datos personales relacionados con este sitio
                web se rige por nuestra
                <a
                  href="/privacy-policy"
                  className="text-blue-500 hover:text-blue-400"
                >
                  {" "}
                  Política de Privacidad
                </a>
                , que cumple con la Ley Estatutaria 1581 de 2012 y el Decreto
                1377 de 2013 sobre la protección de datos personales en
                Colombia.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Información de Contacto</h2>
              <p className="text-zinc-400">
                Si tienes alguna pregunta sobre estos Términos y Condiciones o
                necesitas aclaraciones adicionales, por favor contáctame en:
              </p>
              <p className="text-zinc-400">Correo electrónico: legal@carrillo.app</p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
