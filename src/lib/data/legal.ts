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
 */

const UPDATED = "2025-05-15"
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
      heading: "Enlaces a terceros",
      blocks: [
        {
          type: "p",
          text: "Mi sitio web puede contener enlaces a sitios web, plugins y aplicaciones de terceros, como GitHub, GitLab, Substack o plataformas de redes sociales donde comparto mi trabajo profesional. Hacer clic en esos enlaces o habilitar esas conexiones puede permitir que terceros recopilen o compartan datos sobre ti. No controlo estos sitios web de terceros y no soy responsable de sus declaraciones de privacidad. Te recomiendo leer la política de privacidad de cada sitio que visites, incluidos aquellos a los que accedas a través de enlaces en mi sitio web.",
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
          text: "Como desarrollador especializado en sistemas financieros y tecnológicos que trabaja con clientes internacionales, en ocasiones puede ser necesario transferir datos a países fuera de Colombia. En tales casos, me aseguro de que existan garantías adecuadas para proteger tu información, cumpliendo con los principios establecidos en la Ley 1581 de 2012 y garantizando un nivel adecuado de protección de datos comparable al requerido por la legislación colombiana.",
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
    "Las reglas de uso de carrillo.app: qué puedes hacer con el contenido, qué no garantizo y bajo qué jurisdicción se resuelve cualquier disputa.",
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
    "Qué cookies usa carrillo.app, para qué sirve cada una y cómo aceptarlas o rechazarlas. Las esenciales no se pueden desactivar; el resto depende de tu consentimiento.",
  particulars: [
    { term: "Esenciales", value: "Siempre activas" },
    { term: "Analíticas", value: "Con consentimiento" },
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
              term: "Cookies esenciales del sitio web:",
              text: "estrictamente necesarias para proporcionarte los servicios disponibles a través de mi sitio web y para utilizar algunas de sus características, como el acceso a áreas seguras o la funcionalidad del formulario de contacto.",
            },
            {
              term: "Cookies de rendimiento y funcionalidad:",
              text: "se utilizan para mejorar el rendimiento y la funcionalidad de mi sitio web, pero no son esenciales para su uso. Sin embargo, sin estas cookies, ciertas funcionalidades pueden no estar disponibles.",
            },
            {
              term: "Cookies de análisis y personalización:",
              text: "recopilan información que se utiliza en forma agregada para ayudarme a entender cómo se utiliza mi sitio web o qué tan efectivas son mis publicaciones técnicas y repositorios de código, o para ayudarme a personalizar mi sitio web para ti.",
            },
          ],
        },
        {
          type: "p",
          text: "Conforme a las disposiciones de la Ley 1581 de 2012 y demás normativa colombiana aplicable, solicito tu consentimiento expreso antes de utilizar cookies no esenciales. Puedes modificar o retirar este consentimiento en cualquier momento utilizando el gestor de consentimiento de cookies.",
        },
      ],
    },
    {
      id: "control",
      heading: "¿Cómo puedes controlar las cookies?",
      blocks: [
        {
          type: "p",
          text: "Tienes derecho a decidir si aceptas o rechazas las cookies. Puedes ejercer tus derechos relacionados con las cookies configurando tus preferencias en el gestor de consentimiento que aparece cuando visitas mi sitio por primera vez. El gestor te permite seleccionar qué categorías de cookies aceptas o rechazas. Las cookies esenciales no pueden ser rechazadas, ya que son estrictamente necesarias para proporcionarte los servicios básicos.",
        },
        {
          type: "p",
          text: "Si eliges rechazar las cookies, aún podrás usar mi sitio web, aunque tu acceso a algunas funcionalidades y áreas puede estar restringido. También puedes configurar o modificar los controles de tu navegador web para aceptar o rechazar cookies. La forma de hacerlo depende de tu navegador:",
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
          text: "Los tipos específicos de cookies propias y de terceros que se utilizan en mi sitio web y los fines que cumplen se describen en la tabla siguiente:",
        },
        {
          type: "table",
          head: ["Nombre", "Propósito", "Caducidad"],
          rows: [
            ["_ga", "Cookie de Google Analytics utilizada para distinguir usuarios.", "2 años"],
            ["_gid", "Cookie de Google Analytics utilizada para distinguir usuarios.", "24 horas"],
            [
              "_gat",
              "Cookie de Google Analytics utilizada para limitar la frecuencia de solicitudes.",
              "1 minuto",
            ],
            [
              "cookie_consent",
              "Almacena tus preferencias de consentimiento de cookies.",
              "6 meses",
            ],
          ],
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
          text: "La fecha en la parte superior indica cuándo fue actualizada por última vez. Cualquier cambio en la forma en que utilizo las cookies será reflejado en este documento y comunicado mediante el gestor de consentimiento.",
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
