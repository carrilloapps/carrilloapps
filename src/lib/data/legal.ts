import type { LegalDocumentProps } from "@/components/legal/legal-document"

/**
 * The three legal documents, as data.
 *
 * They lived as three near-identical 230-line JSX files, which meant the prose
 * could not be diffed, the numbering did not exist, and a change to the shell
 * had to be made three times. The text below is the same text those pages
 * carried, with one correction: the third-party examples in the privacy policy
 * named Medium, which this site stopped publishing to — the current
 * destinations are GitHub, GitLab and Substack.
 *
 * `updated` is the real date of the last substantive edit. Do not bump it for
 * layout work: a legal document's date is a claim about the text.
 *
 * The 2026-09-15 revision is substantive. It was written against what the site
 * actually loads, verified in the code and against live response headers, not
 * against what the previous text assumed:
 *
 *  - Analytics is Google Analytics 4 *and* Microsoft Clarity. Clarity records
 *    sessions and draws heatmaps, which is a materially different thing from
 *    counting page views and was documented nowhere.
 *  - The cookie table listed `_gid` and `_gat`, which belong to Universal
 *    Analytics and have not been set since GA4 replaced it, and a
 *    `cookie_consent` cookie that does not exist — the decision is kept in
 *    `localStorage` under `cookieConsent`.
 *  - Cal.com is embedded behind every "Agendar" button, which is in the site
 *    header, so it is reachable from every page. It was named nowhere.
 *  - The newsletter form hands the reader's address to Substack; the previous
 *    text still described a Mailchimp path that no longer exists.
 *  - blog.carrillo.app is a domain of mine served entirely by Substack behind
 *    Cloudflare. It sets `ab_testing_id`, `ab_experiment_sampled` and `__cf_bm`
 *    on the first request, before any consent, and none of that was disclosed.
 *
 * Disqus is deliberately absent. The component and its environment variables
 * still exist in the repository but nothing renders it, and a policy that
 * declares a tracker the site does not run is as wrong as one that hides a
 * tracker it does.
 */

const UPDATED = "2026-09-15"
const CONTACT_EMAIL = "legal@carrillo.app"

export const PRIVACY_POLICY: LegalDocumentProps = {
  title: "Política de Privacidad",
  path: "/privacidad",
  updated: UPDATED,
  summary:
    "Qué datos recojo cuando visitas carrillo.app, para qué los uso y cómo ejerces tus derechos como titular. Redactada bajo la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.",
  particulars: [
    { term: "Responsable", value: "José P. Carrillo E." },
    { term: "Marco legal", value: "Ley 1581 de 2012" },
    { term: "Contacto", value: CONTACT_EMAIL },
  ],
  sections: [
    {
      id: "introduccion",
      heading: "Introducción",
      blocks: [
        {
          type: "p",
          text: "Gracias por visitar mi sitio web profesional. Yo, José Porfirio Carrillo Echenique, quien opera públicamente bajo el nombre de Junior Carrillo, valoro y respeto tu privacidad y me comprometo a proteger tus datos personales en conformidad con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia. Esta política de privacidad te informará sobre cómo protejo tus datos personales, tus derechos de privacidad y cómo la ley te protege.",
        },
        {
          type: "p",
          text: "Esta política se aplica a la información que recopilo a través de mi sitio web en carrillo.app, por correo electrónico, mensajes de texto u otras comunicaciones electrónicas entre tú y este sitio web.",
        },
      ],
    },
    {
      id: "informacion-que-recopilo",
      heading: "Información que recopilo",
      blocks: [
        {
          type: "p",
          text: "Como responsable del tratamiento de datos, puedo recopilar varios tipos de información de los usuarios de mi sitio web, incluyendo:",
        },
        {
          type: "list",
          items: [
            {
              text: "Información personal que proporcionas directamente cuando completas formularios en mi sitio web, incluyendo tu nombre, dirección de correo electrónico, y cualquier mensaje que me envíes a través del formulario de contacto.",
            },
            {
              text: "Información sobre tu conexión a Internet, el equipo que utilizas para acceder a mi sitio web y detalles de uso, que se recopila automáticamente como parte de la navegación.",
            },
            {
              text: "Información de identificación no personal, incluyendo el nombre del navegador, tipo de computadora e información técnica sobre tu medio de conexión a mi sitio web, sistema operativo y proveedor de servicios de Internet.",
            },
            {
              text: "Datos sobre tu perfil profesional si decides compartirlos para consultas relacionadas con servicios de desarrollo de software, arquitectura técnica o mentoría.",
            },
            {
              text: "La dirección de correo que escribes en el formulario del boletín. No la almaceno: se usa únicamente para abrir la página de suscripción de Substack con el campo ya diligenciado, y es Substack quien recibe el alta y envía el correo de confirmación.",
            },
            {
              text: "Los datos que introduces al reservar una asesoría —nombre, correo, zona horaria y lo que escribas en el campo de notas—, que se procesan en Cal.com y llegan a mí desde allí.",
            },
          ],
        },
      ],
    },
    {
      id: "uso-de-la-informacion",
      heading: "Cómo utilizo tu información",
      blocks: [
        {
          type: "p",
          text: "Utilizo la información que recopilo sobre ti o que me proporcionas, incluida cualquier información personal, para los siguientes fines:",
        },
        {
          type: "list",
          items: [
            { text: "Presentarte mi sitio web y sus contenidos de manera adecuada." },
            { text: "Responder a tus consultas y proporcionarte la información que solicites." },
            {
              text: "Enviarte comunicaciones relacionadas con servicios profesionales, si así lo solicitas.",
            },
            { text: "Cumplir con cualquier otro propósito para el que la proporcionas." },
            {
              text: "Cumplir mis obligaciones y hacer valer mis derechos derivados de cualquier contrato entre tú y yo.",
            },
            {
              text: "Mejorar mi sitio web y ofrecer una mejor experiencia al analizar cómo los usuarios navegan e interactúan con el sitio.",
            },
            { text: "De cualquier otra manera que describa cuando proporcionas la información." },
            { text: "Para cualquier otro propósito con tu consentimiento expreso." },
          ],
        },
      ],
    },
    {
      id: "cookies",
      heading: "Cookies y tecnologías de seguimiento",
      blocks: [
        {
          type: "p",
          text: "Mi sitio web utiliza cookies y tecnologías de seguimiento similares para rastrear la actividad en mi sitio web y almacenar cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo.",
        },
        {
          type: "p",
          text: "Utilizo cookies para mejorar la experiencia del usuario, analizar el tráfico y personalizar el contenido. Para información más detallada sobre las cookies específicas que utilizo, consulta mi",
          link: { href: "/cookies", label: "Política de Cookies", tail: "." },
        },
        {
          type: "p",
          text: "Puedes configurar tu navegador para que rechace todas o algunas cookies, o para que te avise cuando se envíen cookies. Sin embargo, si no aceptas cookies, es posible que no puedas utilizar algunas partes de mi sitio web.",
        },
      ],
    },
    {
      id: "seguridad",
      heading: "Seguridad de datos",
      blocks: [
        {
          type: "p",
          text: "He implementado medidas técnicas y organizativas apropiadas para proteger tus datos personales contra pérdidas accidentales y contra el acceso, uso, alteración y divulgación no autorizados, conforme a lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377 de 2013. No obstante, la transmisión de información a través de Internet no es completamente segura, y aunque me esfuerzo por proteger tu información personal, no puedo garantizar la seguridad absoluta de los datos transmitidos a mi sitio web.",
        },
        {
          type: "p",
          text: "En particular, para proyectos relacionados con sistemas financieros y aplicaciones críticas, implemento protocolos adicionales de seguridad para los datos compartidos mediante formularios de contacto.",
        },
      ],
    },
    {
      id: "terceros",
      heading: "Terceros que intervienen",
      blocks: [
        {
          type: "p",
          text: "No vendo ni cedo tus datos. Sí uso proveedores que los procesan por cuenta mía para que el sitio funcione y para entender cómo se usa. Estos son todos, sin excepción, con lo que hace cada uno:",
        },
        {
          type: "table",
          head: ["Proveedor", "Para qué", "Qué recibe", "Dónde"],
          rows: [
            [
              "Vercel Inc.",
              "Alojamiento y entrega del sitio",
              "Dirección IP, cabeceras de la petición y registros técnicos de acceso",
              "Estados Unidos y red global",
            ],
            [
              "Google (Analytics 4)",
              "Medición de audiencia",
              "Identificador de cookie, páginas vistas, eventos de interacción, IP truncada",
              "Estados Unidos",
            ],
            [
              "Microsoft (Clarity)",
              "Mapas de calor y grabación de sesión",
              "Identificador de cookie y una reconstrucción de tu recorrido: clics, desplazamiento y movimiento del cursor",
              "Estados Unidos",
            ],
            [
              "Cal.com, Inc.",
              "Agendamiento de asesorías",
              "Nombre, correo, zona horaria y las notas que escribas al reservar",
              "Estados Unidos",
            ],
            [
              "Substack Inc.",
              "Publicación del blog y gestión del boletín",
              "Tu correo al suscribirte, y los datos de navegación propios de blog.carrillo.app",
              "Estados Unidos",
            ],
          ],
        },
        {
          type: "p",
          text: "Google Analytics y Microsoft Clarity solo se cargan si aceptas las cookies; hasta entonces no se descarga ninguno de sus scripts. Cal.com se carga cuando abres el agendador, y Substack cuando pulsas suscribirte o visitas el blog. El detalle de cada cookie está en la",
          link: { href: "/cookies", label: "Política de Cookies", tail: "." },
        },
        {
          type: "p",
          text: "Ten presente qué implica la grabación de sesión de Clarity: reconstruye el recorrido de tu visita, no solo la cuenta. Clarity enmascara por defecto el texto que escribes en los campos de formulario, pero si aceptas las cookies y prefieres no ser grabado, puedes borrar la decisión desde tu navegador y rechazar el aviso, o activar la opción de exclusión global de Clarity.",
        },
        {
          type: "p",
          text: "Mi sitio también enlaza a GitHub, GitLab, npm, Substack y redes sociales donde publico. Esos son destinos, no proveedores: al seguir un enlace sales de carrillo.app y pasas a regirte por la política de quien opere el sitio de destino. No los controlo ni respondo por ellos.",
        },
      ],
    },
    {
      id: "blog-y-substack",
      heading: "El blog y Substack",
      blocks: [
        {
          type: "p",
          text: "Escribo en Substack, y esa publicación se sirve bajo un dominio mío: blog.carrillo.app. Que el dominio sea mío no cambia quién opera la plataforma. Todo lo que ocurre en ese subdominio —páginas, suscripciones, comentarios, correos— sucede en la infraestructura de Substack Inc., detrás de Cloudflare, y no en la mía. Ningún artículo se renderiza en carrillo.app: esta página es un índice que enlaza hacia allá.",
        },
        {
          type: "p",
          text: "El índice se construye leyendo el feed RSS público de la publicación desde mi servidor. Esa lectura no involucra dato alguno tuyo: ocurre en el servidor, cada media hora, y tu navegador no contacta a Substack por el hecho de mirar la lista.",
        },
        {
          type: "p",
          text: "Al suscribirte cambia la cosa. El formulario valida tu correo y abre la página de suscripción de Substack con el campo ya diligenciado; el alta la toma Substack, no yo. A partir de ahí eres un suscriptor de esa plataforma: Substack me entrega tu nombre y tu correo como responsable de la publicación, y es quien conserva el registro, envía los correos y procesa cualquier pago si alguna vez existiera contenido de pago.",
        },
        {
          type: "p",
          text: "Puedes darte de baja desde el pie de cualquier correo o desde tu cuenta de Substack, sin pasar por mí. Para ejercer tus derechos sobre los datos que Substack trata como responsable —y no por cuenta mía— su política de privacidad indica el canal privacy@substackinc.com; Substack declara adherirse al EU-U.S. Data Privacy Framework y sus extensiones de Reino Unido y Suiza.",
        },
        {
          type: "p",
          text: "Las cookies que Substack y Cloudflare colocan al visitar blog.carrillo.app están descritas, con nombre y caducidad, en la",
          link: { href: "/cookies", label: "Política de Cookies", tail: "." },
        },
      ],
    },
    {
      id: "derechos",
      heading: "Derechos de los titulares de datos",
      blocks: [
        {
          type: "p",
          text: "De acuerdo con la ley colombiana de protección de datos (Ley 1581 de 2012), tienes los siguientes derechos:",
        },
        {
          type: "list",
          items: [
            { text: "Conocer, actualizar y rectificar tus datos personales." },
            {
              text: "Solicitar la prueba de la autorización otorgada para el tratamiento de tus datos.",
            },
            { text: "Ser informado sobre el uso que se ha dado a tus datos personales." },
            {
              text: "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
            },
            {
              text: "Revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.",
            },
            {
              text: "Acceder de forma gratuita a tus datos personales que hayan sido objeto de tratamiento.",
            },
          ],
        },
        {
          type: "p",
          text: 'Para ejercer estos derechos, puedes contactarme directamente a través del formulario de contacto en mi sitio web o enviando un correo electrónico a la dirección que se indica en la sección "Información de contacto".',
        },
      ],
    },
    {
      id: "transferencia-internacional",
      heading: "Transferencia internacional de datos",
      blocks: [
        {
          type: "p",
          text: "Tus datos salen de Colombia. Todos los proveedores enumerados arriba —Vercel, Google, Microsoft, Cal.com y Substack— están constituidos en Estados Unidos y procesan la información allí o en su red global. No hay forma de usar este sitio sin esa transferencia, y decirlo de otro modo sería inexacto.",
        },
        {
          type: "p",
          text: "Para esas transferencias me apoyo en las garantías que cada proveedor ofrece: cláusulas contractuales tipo y, en el caso de Substack, adhesión declarada al EU-U.S. Data Privacy Framework. Ello cumple los principios de la Ley 1581 de 2012, que admite la transferencia a países sin nivel adecuado cuando media el consentimiento del titular o garantías contractuales suficientes, y mantiene un nivel de protección comparable al exigido por la legislación colombiana.",
        },
      ],
    },
    {
      id: "cambios",
      heading: "Cambios en esta política",
      blocks: [
        {
          type: "p",
          text: 'Puedo actualizar esta política de privacidad periódicamente para reflejar cambios en mis prácticas de información o por otros motivos operativos, legales o regulatorios. Te notificaré sobre cualquier cambio publicando la nueva política de privacidad en esta página y actualizando la fecha de "Última actualización".',
        },
        {
          type: "p",
          text: "Se recomienda revisar esta política de privacidad periódicamente para cualquier cambio. Los cambios en esta política de privacidad entran en vigor cuando se publican en esta página.",
        },
      ],
    },
    {
      id: "contacto",
      heading: "Información de contacto",
      blocks: [
        {
          type: "p",
          text: `Si tienes alguna pregunta sobre esta política de privacidad o mis prácticas de datos, o si deseas ejercer cualquiera de tus derechos como titular de datos, escríbeme a ${CONTACT_EMAIL}.`,
        },
        {
          type: "p",
          text: "Como responsable del tratamiento de datos personales, me comprometo a responder a tu solicitud dentro de los plazos establecidos por la legislación colombiana aplicable.",
        },
      ],
    },
  ],
}

export const TERMS: LegalDocumentProps = {
  title: "Términos y Condiciones",
  path: "/terminos",
  updated: UPDATED,
  summary:
    "Las reglas de uso de carrillo.app: qué puedes hacer con el contenido, qué ocurre cuando el enlace te lleva al blog en Substack, qué no garantizo y bajo qué jurisdicción se resuelve cualquier disputa.",
  particulars: [
    { term: "Titular", value: "José P. Carrillo E." },
    { term: "Jurisdicción", value: "Colombia" },
    { term: "Contacto", value: CONTACT_EMAIL },
  ],
  sections: [
    {
      id: "introduccion",
      heading: "Introducción",
      blocks: [
        {
          type: "p",
          text: "Bienvenido al sitio web profesional de José Porfirio Carrillo Echenique, quien opera públicamente bajo el nombre de Junior Carrillo. Estos términos y condiciones establecen las reglas y normativas para el uso de mi sitio web, ubicado en carrillo.app, y aplican a todos los usuarios y visitantes.",
        },
        {
          type: "p",
          text: "El presente documento constituye un acuerdo legalmente vinculante entre el usuario y José Porfirio Carrillo Echenique, quien opera públicamente como Junior Carrillo. Al acceder a este sitio web, se asume que aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos y condiciones, no debes utilizar este sitio web.",
        },
        {
          type: "p",
          text: "Este sitio web se rige por las leyes de la República de Colombia. Cualquier disputa relacionada con este sitio web estará sujeta a la jurisdicción de los tribunales colombianos.",
        },
      ],
    },
    {
      id: "propiedad-intelectual",
      heading: "Derechos de propiedad intelectual",
      blocks: [
        {
          type: "p",
          text: "Salvo que se indique lo contrario, José Porfirio Carrillo Echenique, quien opera públicamente como Junior Carrillo, posee los derechos de propiedad intelectual de todo el material en carrillo.app, protegido bajo las leyes colombianas de derechos de autor (Ley 23 de 1982, Ley 44 de 1993, Decisión Andina 351 de 1993, y demás normas complementarias). Todos los derechos de propiedad intelectual están reservados. Puedes acceder a este sitio web para tu uso personal, sujeto a las restricciones establecidas en estos términos y condiciones.",
        },
        { type: "p", text: "No debes, sin mi autorización expresa por escrito:" },
        {
          type: "list",
          items: [
            { text: "Republicar material de carrillo.app." },
            { text: "Vender, alquilar o sublicenciar material de carrillo.app." },
            { text: "Reproducir, duplicar o copiar material de carrillo.app." },
            { text: "Redistribuir contenido de carrillo.app." },
            { text: "Utilizar el contenido para fines comerciales sin autorización previa." },
          ],
        },
        {
          type: "p",
          text: "Algunas secciones de este sitio web ofrecen la oportunidad a los usuarios de compartir comentarios sobre artículos técnicos o proyectos de código. No filtro, edito, publico ni reviso comentarios antes de su aparición en el sitio web. Los comentarios no reflejan mis puntos de vista u opiniones. Me reservo el derecho de eliminar comentarios que considere inapropiados, ofensivos o que violen estos términos y condiciones.",
        },
      ],
    },
    {
      id: "responsabilidad-contenido",
      heading: "Responsabilidad del contenido",
      blocks: [
        {
          type: "p",
          text: "No seré responsable por ningún contenido que aparezca en tu sitio web como resultado de enlazar el mío. Aceptas protegerme y defenderme contra todas las reclamaciones que surjan en tu sitio web. No debe aparecer ningún enlace en cualquier sitio web que pueda ser interpretado como difamatorio, obsceno o delictivo, o que infrinja, viole o promueva la infracción o cualquier otra violación de los derechos de terceros.",
        },
        {
          type: "p",
          text: "Todo el contenido publicado en este sitio web, incluyendo pero no limitado a artículos técnicos, código fuente de ejemplos y material educativo, se proporciona únicamente con fines informativos y educativos. No garantizo la exactitud, integridad o actualidad del contenido. El uso de cualquier información o código proporcionado es bajo tu propia responsabilidad y riesgo.",
        },
      ],
    },
    {
      id: "reserva-de-derechos",
      heading: "Reserva de derechos",
      blocks: [
        {
          type: "p",
          text: "Me reservo el derecho de solicitar que elimines todos los enlaces o cualquier enlace particular a mi sitio web. Aceptas eliminar inmediatamente todos los enlaces a mi sitio web cuando te lo solicite. También me reservo el derecho de modificar estos términos y condiciones y su política de enlaces en cualquier momento, de acuerdo con las disposiciones establecidas en el Código Civil colombiano y la legislación aplicable. Al continuar enlazando a mi sitio web, aceptas estar vinculado y seguir estos términos y condiciones de enlace.",
        },
        {
          type: "p",
          text: "Me reservo el derecho de modificar o discontinuar, temporal o permanentemente, el sitio web o cualquier parte del mismo con o sin previo aviso. No seré responsable ante ti ni ante terceros por cualquier modificación, suspensión o interrupción del sitio web.",
        },
      ],
    },
    {
      id: "eliminacion-de-enlaces",
      heading: "Eliminación de enlaces",
      blocks: [
        {
          type: "p",
          text: "Si encuentras algún enlace en mi sitio web que sea ofensivo por cualquier motivo, tienes libertad para contactarme e informarme en cualquier momento. Consideraré las solicitudes para eliminar enlaces, pero no estoy obligado a hacerlo ni a responderte directamente. Sin embargo, me esforzaré por atender todas las comunicaciones en un plazo razonable.",
        },
        {
          type: "p",
          text: "No garantizo que la información en este sitio web sea correcta, no garantizo su integridad o exactitud; ni prometo asegurar que el sitio web permanezca disponible o que el material en el sitio web se mantenga actualizado. El contenido técnico puede quedar obsoleto con el tiempo debido a los rápidos cambios en las tecnologías de desarrollo de software.",
        },
      ],
    },
    {
      id: "exencion-de-responsabilidad",
      heading: "Exención de responsabilidad",
      blocks: [
        {
          type: "p",
          text: "En la máxima medida permitida por la ley aplicable colombiana, excluyo todas las representaciones, garantías y condiciones relacionadas con mi sitio web y el uso de este sitio web, en conformidad con los artículos 1604 a 1615 del Código Civil colombiano y demás normas aplicables. Nada en esta exención de responsabilidad:",
        },
        {
          type: "list",
          items: [
            {
              text: "Limitará o excluirá mi responsabilidad o la tuya por muerte o lesiones personales.",
            },
            {
              text: "Limitará o excluirá mi responsabilidad o la tuya por fraude o tergiversación fraudulenta.",
            },
            {
              text: "Limitará cualquiera de mis responsabilidades o las tuyas de manera no permitida por la legislación aplicable.",
            },
            {
              text: "Excluirá cualquiera de mis responsabilidades o las tuyas que no puedan ser excluidas según la legislación aplicable.",
            },
          ],
        },
        {
          type: "p",
          text: "Las limitaciones y prohibiciones de responsabilidad establecidas en esta sección y en otras partes de esta exención de responsabilidad: (a) están sujetas al párrafo anterior; y (b) rigen todas las responsabilidades que surjan en virtud de la exención de responsabilidad, incluidas las responsabilidades que surjan por contrato, por acto ilícito y por incumplimiento del deber legal.",
        },
        {
          type: "p",
          text: "En la medida en que el sitio web y la información y los servicios en el sitio web se proporcionen de forma gratuita, no seré responsable de ninguna pérdida o daño de ninguna naturaleza, excepto en los casos previstos por la legislación colombiana sobre protección al consumidor (Ley 1480 de 2011).",
        },
      ],
    },
    {
      id: "disputas",
      heading: "Solución de disputas",
      blocks: [
        {
          type: "p",
          text: "Cualquier disputa que surja de o en conexión con estos Términos y Condiciones, incluyendo cualquier cuestión relacionada con su existencia, validez o terminación, será resuelta a través de un proceso de conciliación de acuerdo con la legislación colombiana. Si no se llegara a un acuerdo mediante conciliación, la disputa será sometida a la jurisdicción de los tribunales colombianos.",
        },
      ],
    },
    {
      id: "el-blog",
      heading: "El blog y la plataforma que lo aloja",
      blocks: [
        {
          type: "p",
          text: "Escribo en Substack. La publicación se sirve bajo blog.carrillo.app, un subdominio mío apuntando a la infraestructura de Substack Inc., y ningún artículo se renderiza en carrillo.app. La sección /blog de este sitio es un registro de lo que existe: cada título abre la entrada en la publicación.",
        },
        {
          type: "p",
          text: "La consecuencia es la que importa: cuando sigues un enlace del índice, dejas de estar bajo estos términos. A partir de ahí rigen los términos de uso y la política de privacidad de Substack, tanto para leer como para comentar, suscribirte o gestionar tu cuenta. No controlo esa plataforma, sus condiciones ni sus cambios.",
        },
        {
          type: "p",
          text: "El índice se construye a partir del feed RSS público de la publicación, que es el mecanismo que la propia plataforma ofrece para sindicar. Se leen título, fecha, subtítulo e imagen de portada, y siempre se enlaza al original: no se copia ni se reproduce aquí el cuerpo de ningún artículo. Ese límite es deliberado — los términos de Substack prohíben rastrear sus páginas y almacenar porciones significativas de su contenido, y respetarlo protege a la publicación y a su lista de suscriptores.",
        },
        {
          type: "p",
          text: "El feed entrega las veinte entradas más recientes y no admite paginación. Cuando la publicación supera esa cifra, el índice lo declara y remite al archivo completo en la propia publicación. Si el feed no responde, la página lo dice en lugar de aparentar que no hay nada escrito.",
        },
        {
          type: "p",
          text: "Sobre la autoría: conservo la titularidad de lo que escribo, y al publicarlo en Substack le concedo la licencia que sus términos requieren para operar el servicio. Lo que aparece en este sitio son títulos y enlaces, que puedes citar y compartir libremente. Reproducir un artículo completo requiere mi autorización, en los mismos términos que el resto del contenido de este sitio.",
        },
        {
          type: "p",
          text: "El formulario del boletín no crea la suscripción: valida tu correo y te lleva a la página de suscripción de Substack con el campo diligenciado, para que el alta la tome la plataforma. Hasta que completes ese paso allí, no estás suscrito. Ninguna confirmación en este sitio sustituye a la que envía Substack.",
        },
      ],
    },
    {
      id: "proteccion-de-datos",
      heading: "Protección de datos",
      blocks: [
        {
          type: "p",
          text: "El tratamiento de datos personales relacionados con este sitio web se rige por mi",
          link: {
            href: "/privacidad",
            label: "Política de Privacidad",
            tail: ", que cumple con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 sobre la protección de datos personales en Colombia.",
          },
        },
      ],
    },
    {
      id: "contacto",
      heading: "Información de contacto",
      blocks: [
        {
          type: "p",
          text: `Si tienes alguna pregunta sobre estos Términos y Condiciones o necesitas aclaraciones adicionales, escríbeme a ${CONTACT_EMAIL}.`,
        },
      ],
    },
  ],
}

export const COOKIE_POLICY: LegalDocumentProps = {
  title: "Política de Cookies",
  path: "/cookies",
  updated: UPDATED,
  summary:
    "Qué cookies coloca carrillo.app, cuáles coloca el blog en Substack, para qué sirve cada una y cómo aceptarlas o rechazarlas. Las analíticas no se cargan hasta que aceptas.",
  particulars: [
    { term: "Analíticas", value: "Con consentimiento" },
    { term: "Decisión", value: "En localStorage" },
    { term: "Blog", value: "Cookies de Substack" },
    { term: "Contacto", value: CONTACT_EMAIL },
  ],
  sections: [
    {
      id: "introduccion",
      heading: "Introducción",
      blocks: [
        {
          type: "p",
          text: "Esta Política de Cookies explica cómo José Porfirio Carrillo Echenique, quien opera públicamente bajo el nombre de Junior Carrillo, utiliza cookies y tecnologías similares para reconocerte cuando visitas mi sitio web en carrillo.app. En ella se explica qué son estas tecnologías, por qué las utilizo, así como tus derechos para controlar mi uso de ellas en conformidad con la legislación colombiana y las mejores prácticas internacionales de privacidad digital.",
        },
      ],
    },
    {
      id: "que-son",
      heading: "¿Qué son las cookies?",
      blocks: [
        {
          type: "p",
          text: "Las cookies son pequeños archivos de datos que se colocan en tu computadora o dispositivo móvil cuando visitas un sitio web. Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios funcionen, o funcionen de manera más eficiente, así como para proporcionar información de reportes.",
        },
        {
          type: "p",
          text: 'Las cookies establecidas por el propietario del sitio web (en este caso, José Porfirio Carrillo Echenique, quien opera públicamente como Junior Carrillo) se denominan "cookies de primera parte". Las cookies establecidas por terceros se denominan "cookies de terceros". Las cookies de terceros permiten que funciones o características de terceros se proporcionen en o a través del sitio web (por ejemplo, análisis de uso, contenido interactivo y referencias a redes sociales). Las partes que establecen estas cookies de terceros pueden reconocer tu dispositivo tanto cuando visita nuestro sitio web como cuando visita ciertos otros sitios web.',
        },
      ],
    },
    {
      id: "por-que",
      heading: "¿Por qué utilizo cookies?",
      blocks: [
        {
          type: "p",
          text: 'Utilizo cookies propias y de terceros por varias razones. Algunas cookies son necesarias por razones técnicas para que mi sitio web funcione correctamente, y las denomino cookies "esenciales" o "estrictamente necesarias". Otras cookies me permiten rastrear y segmentar los intereses de los usuarios para mejorar la experiencia en mi propiedad online. Terceros proporcionan cookies a través de mi sitio web para análisis y otros fines.',
        },
        {
          type: "list",
          items: [
            {
              term: "Cookies estrictamente necesarias:",
              text: "ninguna. Conviene decirlo, porque casi toda política declara unas: carrillo.app no tiene cuentas, sesiones ni carrito, así que no necesita colocar nada para funcionar. Tu decisión sobre las cookies tampoco es una cookie — vive en el almacenamiento local del navegador.",
            },
            {
              term: "Cookies de funcionalidad:",
              text: "las que coloca el widget de Cal.com cuando abres el agendador, para sostener la reserva mientras la completas. Solo aparecen si usas esa función.",
            },
            {
              term: "Cookies de análisis y personalización:",
              text: "recopilan información que se utiliza en forma agregada para ayudarme a entender cómo se utiliza mi sitio web o qué tan efectivas son mis publicaciones técnicas y repositorios de código, o para ayudarme a personalizar mi sitio web para ti.",
            },
          ],
        },
        {
          type: "p",
          text: "Conforme a las disposiciones de la Ley 1581 de 2012 y demás normativa colombiana aplicable, solicito tu consentimiento expreso antes de cargar cookies no esenciales. Ni Google Analytics ni Microsoft Clarity se descargan mientras no aceptes: los scripts se insertan en la página en el momento en que pulsas aceptar, no antes.",
        },
      ],
    },
    {
      id: "control",
      heading: "¿Cómo puedes controlar las cookies?",
      blocks: [
        {
          type: "p",
          text: "Tienes derecho a decidir si aceptas o rechazas las cookies. Al entrar por primera vez aparece un aviso al pie de la página con dos opciones, y conviene describirlas sin adornos: aceptar activa la analítica —Google Analytics y Microsoft Clarity a la vez— y guarda esa decisión; rechazar cierra el aviso sin activar nada y sin guardar la decisión, de modo que el aviso vuelve a mostrarse en la siguiente visita o recarga.",
        },
        {
          type: "p",
          text: "Hoy el aviso no ofrece selección por categorías: acepta la analítica completa o no acepta ninguna. Mientras no aceptes, ningún script de medición se carga. Si aceptaste y quieres revertirlo, borra la entrada cookieConsent del almacenamiento local de tu navegador —Herramientas de desarrollo › Aplicación › Almacenamiento local, o el borrado de datos de sitio— y la analítica dejará de cargarse.",
        },
        {
          type: "p",
          text: "Rechazar no limita nada: el sitio no tiene áreas reservadas, cuentas ni funcionalidad que dependa de cookies de analítica. También puedes configurar los controles de tu navegador para aceptar o rechazar cookies. La forma de hacerlo depende de cuál uses:",
        },
        {
          type: "list",
          items: [
            {
              term: "Chrome:",
              text: "Configuración › Privacidad y seguridad › Cookies y otros datos de sitios.",
            },
            {
              term: "Firefox:",
              text: "Menú › Opciones › Privacidad y Seguridad › Cookies y datos del sitio.",
            },
            { term: "Safari:", text: "Preferencias › Privacidad › Cookies y datos del sitio web." },
            { term: "Edge:", text: "Configuración › Cookies y permisos del sitio › Cookies." },
          ],
        },
      ],
    },
    {
      id: "cookies-que-uso",
      heading: "Cookies que utilizo",
      blocks: [
        {
          type: "p",
          text: "Estas son las que se colocan en carrillo.app, todas de terceros y ninguna antes de que aceptes:",
        },
        {
          type: "table",
          head: ["Nombre", "Quién la coloca", "Para qué", "Caducidad"],
          rows: [
            ["_ga", "Google Analytics 4", "Distingue visitantes entre sesiones.", "2 años"],
            [
              "_ga_<ID>",
              "Google Analytics 4",
              "Mantiene el estado de la sesión de la propiedad de medición.",
              "2 años",
            ],
            [
              "_clck",
              "Microsoft Clarity",
              "Asocia tus visitas a un mismo identificador de Clarity.",
              "1 año",
            ],
            [
              "_clsk",
              "Microsoft Clarity",
              "Agrupa en una sola grabación las páginas de una misma visita.",
              "1 día",
            ],
          ],
        },
        {
          type: "p",
          text: "Dos precisiones que la versión anterior de este documento no daba. La primera: tu decisión sobre las cookies no se guarda en una cookie, sino en el almacenamiento local del navegador, bajo la clave cookieConsent; no viaja en ninguna petición y no sale de tu equipo. La segunda: Clarity no solo cuenta, graba — reconstruye clics, desplazamiento y movimiento del cursor para producir mapas de calor y repeticiones de sesión.",
        },
        {
          type: "p",
          text: "Al abrir el agendador de asesorías se carga además el widget de Cal.com, que coloca sus propias cookies para sostener la reserva. Solo ocurre si abres ese agendador, y se rige por la política de Cal.com.",
        },
      ],
    },
    {
      id: "cookies-del-blog",
      heading: "Cookies del blog (blog.carrillo.app)",
      blocks: [
        {
          type: "p",
          text: "El blog vive en blog.carrillo.app. El dominio es mío; la plataforma no. Ese subdominio lo sirve Substack Inc. detrás de Cloudflare, así que las cookies que encuentres allí las pone Substack, no yo, y no dependen del aviso de consentimiento de este sitio: se colocan en la primera petición, antes de cualquier interacción.",
        },
        {
          type: "p",
          text: "Lo digo explícitamente porque la apariencia engaña: al leerse bajo un dominio mío, esas cookies parecen propias. Verificadas sobre las cabeceras de respuesta reales, son estas:",
        },
        {
          type: "table",
          head: ["Nombre", "Quién la coloca", "Para qué", "Caducidad"],
          rows: [
            [
              "ab_testing_id",
              "Substack",
              "Identificador que asigna tu navegador a un grupo de pruebas A/B.",
              "1 año",
            ],
            [
              "ab_experiment_sampled",
              "Substack",
              "Marca si tu visita entró en la muestra de un experimento.",
              "1 año",
            ],
            [
              "__cf_bm",
              "Cloudflare",
              "Distingue tráfico humano de automatizado para proteger la publicación.",
              "30 minutos",
            ],
          ],
        },
        {
          type: "p",
          text: "Si abres sesión en Substack o te suscribes, la plataforma añadirá además sus cookies de sesión y de analítica. El detalle completo está en la política de privacidad de Substack, que es quien responde por ellas; sobre lo que implica suscribirte, la",
          link: {
            href: "/privacidad",
            label: "Política de Privacidad",
            tail: " lo explica en la sección del blog.",
          },
        },
        {
          type: "p",
          text: "El índice de artículos que ves en carrillo.app/blog no activa nada de lo anterior: se construye en mi servidor leyendo el feed RSS público, y tu navegador no contacta a Substack hasta que abres un artículo.",
        },
      ],
    },
    {
      id: "cambios",
      heading: "Cambios en esta política",
      blocks: [
        {
          type: "p",
          text: "Puedo actualizar esta Política de Cookies periódicamente para reflejar, por ejemplo, cambios en las cookies que utilizo o por otras razones operativas, legales o regulatorias. Te recomiendo visitar regularmente esta política para mantenerte informado sobre mi uso de cookies y tecnologías relacionadas.",
        },
        {
          type: "p",
          text: "La fecha en la parte superior indica cuándo fue actualizada por última vez, y cambia solo cuando cambia el texto: no se mueve por retoques de maquetación. Si en el futuro incorporo una cookie nueva o cambia el propósito de una existente, aparecerá primero en las tablas de arriba, y el aviso de consentimiento volverá a solicitarse cuando el cambio afecte a lo que ya habías aceptado.",
        },
      ],
    },
    {
      id: "marco-legal",
      heading: "Marco legal",
      blocks: [
        {
          type: "p",
          text: "Esta Política de Cookies ha sido elaborada en cumplimiento de la normativa colombiana aplicable, incluida la Ley 1581 de 2012 (Ley de Protección de Datos Personales), el Decreto 1377 de 2013, y las directrices proporcionadas por la Superintendencia de Industria y Comercio de Colombia en materia de protección de datos personales y privacidad en línea.",
        },
        {
          type: "p",
          text: "Para los visitantes de países de la Unión Europea, esta política también se alinea con los requisitos del Reglamento General de Protección de Datos (GDPR) en lo que respecta al uso de cookies e información de rastreo similar.",
        },
      ],
    },
    {
      id: "contacto",
      heading: "Información de contacto",
      blocks: [
        {
          type: "p",
          text: `Si tienes alguna pregunta sobre mi uso de cookies u otras tecnologías, o sobre cómo ejercer tus derechos relacionados con la privacidad de tus datos, escríbeme a ${CONTACT_EMAIL}.`,
        },
      ],
    },
  ],
}
