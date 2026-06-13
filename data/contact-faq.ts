/**
 * Single source of truth for the contact-page FAQ.
 *
 * Rendered as cards in `app/contacto/page.tsx` AND emitted as FAQPage JSON-LD
 * in `app/contacto/layout.tsx`. Keeping one array guarantees the structured
 * data matches the visible content (a Google requirement) and stays optimized
 * for search engines and AI Overviews: real, search-aligned questions with
 * concise, quotable first sentences.
 */
export type ContactFaqIcon =
  | "services"
  | "payments"
  | "schedule"
  | "remote"
  | "pricing"
  | "timeline"

export interface ContactFaqItem {
  question: string
  answer: string
  /** Icon key — mapped to a lucide component on the contact page. */
  icon: ContactFaqIcon
}

export const contactFaq: ContactFaqItem[] = [
  {
    question: "¿Qué servicios de desarrollo y liderazgo técnico ofreces?",
    answer:
      "Ofrezco liderazgo técnico (Tech Lead y CTO fraccional), arquitectura de software, desarrollo full-stack y consultoría en sistemas financieros y de pago. Acompaño desde la estrategia técnica hasta la implementación y el mentoring de equipos de ingeniería.",
    icon: "services",
  },
  {
    question: "¿Tienes experiencia en sistemas de pago, fintech y Open Banking?",
    answer:
      "Sí. Llevo más de 10 años construyendo sistemas de pago en LATAM: lideré la pasarela de pagos a terceros de Wompi (Bancolombia) y el primer Open Banking de Colombia, y hoy dirijo el equipo de pagos en Yummy. Domino arquitecturas de alta transaccionalidad, microservicios y cumplimiento PCI-DSS.",
    icon: "payments",
  },
  {
    question: "¿Cómo agendo una consulta o solicito una cotización?",
    answer:
      "Escríbeme desde el formulario de esta página —te lleva directo a WhatsApp con tu mensaje ya redactado— o reserva una sesión en la página de Agendamiento. Normalmente respondo en menos de 24 horas hábiles.",
    icon: "schedule",
  },
  {
    question: "¿Trabajas de forma remota con clientes internacionales?",
    answer:
      "Sí, trabajo 100% remoto con clientes de cualquier país. Estoy en Medellín, Colombia (GMT-5) y me adapto a distintas zonas horarias; atiendo proyectos en español e inglés.",
    icon: "remote",
  },
  {
    question: "¿Cuánto cuesta un proyecto o una consultoría?",
    answer:
      "El costo depende del alcance, la complejidad y el modelo de colaboración (por proyecto, por hora o retainer mensual). Cuéntame tu caso por WhatsApp o agenda una llamada y te envío una propuesta con cotización, sin compromiso.",
    icon: "pricing",
  },
  {
    question: "¿Cuánto tarda un proyecto típico?",
    answer:
      "Los proyectos pequeños suelen tomar de 2 a 4 semanas; las soluciones empresariales pueden extenderse varios meses. En la consulta inicial defino un cronograma detallado con hitos y entregables claros.",
    icon: "timeline",
  },
]
