/**
 * The service catalogue, in one place.
 *
 * It used to live inside `app/servicios/page.tsx` as a `const services` array
 * feeding a tab strip, which meant the only way to reach a service was an
 * anchor on a page that rendered all seven at once. Each one is now a route, so
 * the data has to be readable from the index, from every detail page, from
 * `generateStaticParams`, from the sitemap and from the structured data.
 *
 * Slugs are Spanish, like every other route on this site. The English ids the
 * tabs used (`technical-leadership`, `financial-systems`…) never appeared in a
 * URL — they were fragment targets — so nothing external depended on them.
 *
 * Every service carries enough prose to be a page in its own right rather than
 * a card with five bullets: a search engine ranking a "consultoría de
 * arquitectura de pagos" query needs something to read, and so does the person
 * deciding whether to write. Each one runs roughly 900–1,100 words rendered.
 */

export interface ServiceCase {
  /** Short name of the engagement. */
  title: string
  /** What was done and what came of it. */
  description: string
  /**
   * The figures already stated in `description`, pulled out so the page can set
   * them as figures. Restating, never adding: every value here appears in the
   * sentence above it.
   */
  metrics: { value: string; label: string }[]
}

export interface Service {
  /** URL segment under /servicios. */
  slug: string
  /** Short label, for navigation and the index table. */
  title: string
  /** The detail page's own heading — a claim, not a category. */
  heading: string
  /** One line, used on the index, in metadata and on the social card. */
  summary: string
  /** Longer form for the meta description, where 160px of Arial is the budget. */
  metaDescription: string
  /** Terms this page should be findable by. */
  keywords: string[]
  /** The opening prose: what the problem actually is, and what the work is. */
  intro: string[]
  /** What the engagement covers. */
  benefits: string[]
  /** How it is done, step by step, naming the practice behind each move. */
  approach: { title: string; description: string }[]
  /** Named engineering practices this front leans on. */
  practices: string[]
  /** What lands in the client's repository or inbox. */
  deliverables: string[]
  /** The tools actually used. */
  stack: string[]
  /**
   * Where this front has actually been done. Named contexts with a figure,
   * drawn from the same career record the timeline on /sobre-mi renders — a
   * service page that cannot say where the claim comes from is a brochure.
   */
  evidence: { context: string; detail: string; metric: string }[]
  /**
   * A deep-dive inside the service: the angle that makes this front specific
   * rather than a category anyone could list. Every service has one, and no
   * two are the same shape of argument.
   */
  spotlight?: {
    label: string
    title: string
    body: string[]
    items: string[]
  }
  /** A piece of work that shows it. */
  caseStudy: ServiceCase
  /** Real questions, answered. Also the page's `FAQPage` graph. */
  faq: { question: string; answer: string }[]
  /** Certifications that back this front, where there are any. */
  credentials?: string[]
  /** The four ruled cells on the service's social card. */
  particulars: { term: string; value: string }[]
}

export const SERVICES: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "liderazgo-tecnico",
    title: "Liderazgo técnico",
    heading: "Equipos que sostienen lo que construyen",
    summary:
      "Dirección estratégica y liderazgo para equipos de desarrollo y proyectos tecnológicos.",
    metaDescription:
      "Liderazgo técnico y agilidad con IA: del kickoff transcrito a la especificación, de la especificación a SDD, y de git a la capacidad estimada.",
    keywords: [
      "liderazgo técnico",
      "agilidad y procesos de entrega",
      "spec driven development",
      "estimación por capacidad",
      "ceremonias de refinamiento",
      "métricas DORA",
      "tech lead externo",
    ],
    intro: [
      "La mayoría de los equipos que encuentro no tienen un problema de talento: tienen un problema de criterio compartido. Cada persona decide bien por su cuenta y el conjunto avanza en direcciones ligeramente distintas, hasta que integrar cuesta más que construir. Eso no se arregla con una herramienta nueva ni con más reuniones; se arregla haciendo explícito lo que hasta ahora vivía en la cabeza de dos o tres personas.",
      "Mi trabajo aquí es dejar el criterio escrito y practicado. Escrito, en forma de especificaciones, ADRs y estándares que se pueden discutir y cambiar. Practicado, en revisiones de código donde se explica el porqué y no solo el qué. El objetivo declarado de cada acompañamiento es volverse innecesario: si a los seis meses el equipo sigue dependiendo de mí para avanzar, hice mal el trabajo.",
      "Trabajo especialmente bien con equipos de plataforma y de pagos, donde una decisión de diseño equivocada no produce un bug visible sino una discrepancia contable que aparece un trimestre después. En esos contextos el liderazgo técnico no es motivacional: es la disciplina de escribir lo que se va a construir antes de construirlo.",
    ],
    spotlight: {
      label: "Ciclo de entrega asistido",
      title: "Del kickoff transcrito al punto de capacidad",
      body: [
        "Lo que se acuerda hablando en un kickoff se pierde. Dos semanas después nadie recuerda por qué se descartó la alternativa obvia, y la discusión se repite entera. La primera pieza del ciclo es simple: la reunión se transcribe y de ahí sale un borrador de especificación —qué se dijo, qué se decidió, qué quedó abierto—. No es la especificación final; es el acta que nadie iba a escribir.",
        "Ese borrador entra a la ceremonia de refinamiento y ahí se corrige con el equipo. Es la parte que no se puede saltar y donde la regla es la de siempre: la IA prepara, el equipo decide. Se marcan los invariantes, se parte lo que es demasiado grande, se descarta lo que se coló mal transcrito. Lo que sale aprobado ya es una especificación de verdad.",
        "A partir de ahí se ejecuta como Spec-Driven Development: la especificación es la fuente, el código la sigue, y cada decisión estructural queda como ADR fechado. La diferencia con SDD a secas es de dónde vino la primera versión — de una conversación real, no de un documento que alguien redactó a solas tres días después.",
        "El ciclo cierra en git. Cada entrega deja una traza completa: especificación, commits, pull request, despliegue. Cuando eso se acumula durante unos meses hay un histórico que relaciona la forma de una especificación con lo que costó de verdad entregarla, por persona y según cuánto se apoyó en IA. De ahí salen dos cosas que normalmente se adivinan: los puntos de capacidad de una tarea, estimados contra casos parecidos que ya ocurrieron, y los KPIs de entrega —tiempo de ciclo, tasa de fallo en despliegue, tiempo de recuperación— calculados del mismo registro en lugar de reportados a mano.",
      ],
      items: [
        "Kickoff transcrito → borrador de especificación con decisiones y preguntas abiertas",
        "Refinamiento con el equipo: la IA prepara, las personas deciden",
        "Especificación aprobada como fuente, ADR para lo estructural (SDD)",
        "Traza completa en git: especificación → commits → pull request → despliegue",
        "Capacidad estimada contra el histórico real, no contra la intuición",
        "KPIs y métricas DORA calculadas del registro, no reportadas a mano",
      ],
    },
    evidence: [
      {
        context: "Yummy Inc. · Tech Leader",
        detail: "Equipo de 7 desarrolladores en Pagos y Finanzas de una super-app de LATAM",
        metric: "7 personas",
      },
      {
        context: "Cencosud S.A. · Developer Lead",
        detail: "Módulos de contabilidad con integración SAP y optimización de procesos batch",
        metric: "−60% tiempo",
      },
      {
        context: "Sky Airline · Sr. Software Engineer",
        detail:
          "Escalé hasta Tech Leader Backup mientras sostenía la versión anterior en producción",
        metric: "1M+ tx/mes",
      },
    ],
    benefits: [
      "Mentorización de equipos de desarrollo",
      "Establecimiento de estándares técnicos",
      "Planificación estratégica de tecnología",
      "Gestión de equipos multidisciplinarios",
      "Optimización de procesos de desarrollo",
    ],
    approach: [
      {
        title: "Diagnóstico del sistema y del equipo",
        description:
          "Reviso el repositorio, el pipeline y el tablero antes que las personas. El código dice cómo se decide de verdad: dónde hay pruebas, dónde hay parches, qué se toca con miedo. De ahí sale un mapa de riesgos técnicos ordenado por lo que cuesta si falla, no por lo que molesta.",
      },
      {
        title: "Spec-Driven Development como norma",
        description:
          "Antes de escribir código se escribe la especificación: qué problema resuelve, qué invariantes debe mantener, qué queda explícitamente fuera. SDD parece burocracia hasta que evita la tercera reimplementación de la misma regla de negocio. Cada decisión estructural queda además como ADR fechado, así que dentro de un año se sabrá por qué se hizo así.",
      },
      {
        title: "TDD donde el costo del error es alto",
        description:
          "No pido cobertura por cobertura. Pido pruebas donde el dinero cambia de manos: cálculo de comisiones, conciliación, idempotencia de reintentos. Ahí el test se escribe primero, porque es la única forma de saber que la regla quedó entendida antes de codificarla. En el resto, pruebas de contrato e integración que sí atrapan regresiones reales.",
      },
      {
        title: "Ceremonias que producen especificación",
        description:
          "El kickoff se transcribe y produce un borrador; el refinamiento lo convierte en especificación aprobada. Suena a proceso añadido y en la práctica quita trabajo: elimina el acta que nadie escribe y la discusión que se repite dos semanas después.",
      },
      {
        title: "Traspaso y medición",
        description:
          "El acompañamiento termina con el equipo tomando decisiones sin mí, y eso se mide: tiempo de ciclo, tasa de fallo en despliegue, tiempo de recuperación. Son las métricas DORA, y sirven porque no se pueden actuar sin cambiar de verdad cómo se trabaja.",
      },
    ],
    practices: [
      "Spec-Driven Development",
      "Test-Driven Development",
      "Ceremonias de refinamiento",
      "Estimación contra histórico",
      "Trunk-based development",
      "Revisión de código en profundidad",
      "ADRs",
      "Métricas DORA",
    ],
    deliverables: [
      "Mapa de riesgos técnicos priorizado",
      "Estándares de ingeniería y guía de estilo",
      "Plantillas de especificación y ADR",
      "Plan de formación por persona",
      "Métricas de entrega con línea base",
      "Ciclo kickoff → especificación → SDD instrumentado",
    ],
    stack: ["TypeScript", "Node.js", "React", "GitHub Actions", "spec-kit"],
    caseStudy: {
      title: "Transformación de equipo técnico",
      description:
        "Lideré un equipo de 15 desarrolladores en la transformación de un sistema monolítico a una arquitectura de microservicios, mejorando la eficiencia del equipo en un 40% y reduciendo el tiempo de entrega en un 60%.",
      metrics: [
        { value: "15", label: "Desarrolladores" },
        { value: "+40%", label: "Eficiencia" },
        { value: "−60%", label: "Tiempo de entrega" },
      ],
    },
    faq: [
      {
        question: "¿Reemplazas a un Tech Lead interno?",
        answer:
          "No, lo formo. Cuando ya existe la persona, trabajo con ella; cuando no, ayudo a identificarla dentro del equipo y a que asuma el rol. Contratar liderazgo externo permanente es un síntoma, no una solución.",
      },
      {
        question: "¿Cuánto dura un acompañamiento?",
        answer:
          "Entre tres y seis meses en la mayoría de los casos, con dedicación parcial. Menos de tres no alcanza para que un hábito nuevo se sostenga solo; más de seis suele significar que estoy tapando un problema de estructura en vez de resolverlo.",
      },
      {
        question: "¿Trabajas con equipos que no son de pagos?",
        answer:
          "Sí. Los hábitos —especificar antes de construir, probar donde duele, medir la entrega— son los mismos. Lo que cambia es dónde está el riesgo, y eso lo identifico en el diagnóstico.",
      },
      {
        question: "¿La IA estima las tareas por el equipo?",
        answer:
          "No estima: propone un rango contra tareas parecidas que ya se entregaron, con su traza en git. El equipo lo acepta o lo corrige en el refinamiento, y esa corrección también entra al histórico. Lo que se elimina es la estimación a ojo sobre una tarea que ya se hizo tres veces.",
      },
      {
        question: "¿Qué necesitas del equipo para empezar?",
        answer:
          "Acceso de lectura al repositorio y al pipeline, y una hora con quien conozca la historia del sistema. Con eso puedo decir en una semana dónde está el riesgo real.",
      },
    ],
    particulars: [
      { term: "Formato", value: "Acompañamiento" },
      { term: "Equipo", value: "15 personas" },
      { term: "Eficiencia", value: "+40%" },
      { term: "Entrega", value: "−60%" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fintech-y-banca",
    title: "Fintech y banca",
    heading: "Pagos que no pueden fallar",
    summary:
      "Desarrollo e implementación de soluciones tecnológicas para el sector financiero y bancario.",
    metaDescription:
      "Plataformas de pago de alta transaccionalidad: idempotencia, conciliación, Open Banking y PCI DSS como restricción de diseño, no como auditoría final.",
    keywords: [
      "arquitectura de pagos",
      "plataforma de pagos",
      "conciliación transaccional",
      "open banking latam",
      "pci dss desarrollo",
      "consultor fintech",
    ],
    intro: [
      "Un sistema de pagos tiene una propiedad incómoda: la mayoría de sus fallos no se ven. Una API que devuelve 200 y no registró el movimiento, un reintento que cobra dos veces, un webhook que llega fuera de orden. Nada de eso enciende una alarma; aparece semanas después, en una conciliación que no cuadra o en un cliente que reclama.",
      "Por eso empiezo siempre por el modelo de datos y no por el framework. Antes de proponer arquitectura necesito saber de dónde sale cada peso, dónde queda registrado, y quién tendrá que auditarlo seis meses después. En pagos el modelo de datos es el producto; el resto es plomería alrededor.",
      "De ahí salen las decisiones que importan: idempotencia real en cada operación que mueve dinero, un libro de asientos inmutable como fuente de verdad, el patrón outbox para que nunca haya un evento publicado sin su escritura correspondiente, y sagas con compensación explícita en lugar de transacciones distribuidas que nadie puede razonar.",
    ],
    evidence: [
      {
        context: "Yummy Inc. · Pagos y Finanzas",
        detail: "Medios de pago y microservicios para una super-app de LATAM, hoy en producción",
        metric: "2M tx/día",
      },
      {
        context: "Wompi (Grupo Bancolombia)",
        detail: "Integraciones con entidades bancarias y rediseño de backend para Open Banking",
        metric: "99,9% disponibilidad",
      },
      {
        context: "Cencosud S.A. · Conciliación",
        detail: "Contabilidad integrada con SAP sobre volumen semanal de retail",
        metric: "2M+ tx/semana",
      },
      {
        context: "bcv-exchange-rate · Código abierto",
        detail:
          "Tasas oficiales BCV, TRM y PTAX con scraping resiliente, cache y reintentos; publicada en npm",
        metric: "~700 desc./mes",
      },
    ],
    spotlight: {
      label: "Conciliación",
      title: "La pregunta que revela una plataforma en dos minutos",
      body: [
        "Cuando entro a una plataforma de pagos existente hago siempre la misma pregunta antes que cualquier otra: ¿cuántas transacciones quedaron sin cuadrar ayer, y por qué? Si el sistema no puede responderla en el momento, todo lo demás que me cuenten sobre su arquitectura es una hipótesis.",
        "No es una pregunta de proceso, es de diseño. Un sistema que puede responderla tiene asientos inmutables, estados explícitos y un identificador que sobrevive a los reintentos. Uno que no puede, tiene actualizaciones en sitio y un equipo que reconstruye la verdad a mano cada cierre.",
        "En Cencosud eso significó conciliar del orden de dos millones de transacciones semanales contra SAP; en Yummy, sostener dos millones diarias. Son escalas distintas con el mismo requisito: que la conciliación sea una consulta y no un rescate mensual.",
      ],
      items: [
        "Partida doble con asientos inmutables como fuente de verdad",
        "Clave de idempotencia en toda operación que mueve dinero",
        "Patrón outbox: el evento y la escritura viajan juntos o no viajan",
        "Estados de transacción explícitos, nunca actualización en sitio",
        "Transacciones sin conciliar a 24 h como indicador de servicio",
      ],
    },
    benefits: [
      "Procesamiento de pagos seguro",
      "Sistemas de gestión de riesgos",
      "Plataformas de trading",
      "Soluciones de cumplimiento regulatorio",
      "Dashboards financieros en tiempo real",
    ],
    approach: [
      {
        title: "Modelo contable antes que API",
        description:
          "Partida doble, asientos inmutables y estados de transacción explícitos. Un pago no se 'actualiza': genera asientos que se pueden reconstruir. Con eso, la conciliación deja de ser un proceso de rescate mensual y pasa a ser una consulta.",
      },
      {
        title: "Idempotencia y entrega exactamente una vez",
        description:
          "Toda operación que mueve dinero recibe una clave de idempotencia y se prueba contra reintentos, duplicados y desorden. El patrón outbox garantiza que el evento y la escritura viajen juntos; los consumidores se diseñan para poder recibir el mismo mensaje dos veces sin consecuencias.",
      },
      {
        title: "Cumplimiento desde el primer día",
        description:
          "PCI DSS, tokenización y minimización de datos entran como restricciones de diseño, no como una auditoría al final. Sale más barato y produce mejores sistemas: si nunca almacenas el PAN, no tienes que protegerlo.",
      },
      {
        title: "Observabilidad con SLO sobre el dinero",
        description:
          "Los indicadores no son CPU y memoria: son tasa de autorización, latencia p99 del checkout, transacciones sin conciliar a las 24 horas. Se instrumenta con OpenTelemetry y se define un presupuesto de error, porque sin él nadie sabe cuándo parar de lanzar features.",
      },
    ],
    practices: [
      "Event sourcing",
      "Patrón outbox",
      "Sagas con compensación",
      "Idempotencia",
      "Contract testing",
      "OpenTelemetry",
      "SLO y error budgets",
      "Domain-Driven Design",
    ],
    deliverables: [
      "Modelo de dominio y esquema contable",
      "Especificación de API e idempotencia",
      "Matriz de riesgos y controles PCI DSS",
      "Suite de pruebas de contrato",
      "Tableros de conciliación y SLO",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "Kafka", "Redis", "Azure", "AWS"],
    caseStudy: {
      title: "Plataforma de pagos enterprise",
      description:
        "Desarrollé una plataforma de pagos que procesa más de 2 millones de transacciones diarias para una institución financiera líder, con detección de fraude en tiempo real y cumplimiento de estándares PCI DSS.",
      metrics: [
        { value: "2M+", label: "Tx/día" },
        { value: "Tiempo real", label: "Detección de fraude" },
        { value: "PCI DSS", label: "Cumplimiento" },
      ],
    },
    faq: [
      {
        question: "¿Construyes la pasarela o integras una existente?",
        answer:
          "Casi siempre lo segundo, y suele ser la respuesta correcta. Construir una pasarela desde cero tiene sentido en muy pocos casos; integrar bien varias, con enrutamiento, reintentos y conciliación propia, resuelve el 90% de los problemas reales.",
      },
      {
        question: "¿Qué es lo primero que revisas en una plataforma existente?",
        answer:
          "La conciliación. Si el sistema no puede decirme cuántas transacciones quedaron sin cuadrar ayer y por qué, todo lo demás que me cuenten sobre su arquitectura es una hipótesis.",
      },
      {
        question: "¿Trabajas con Open Banking?",
        answer:
          "Sí, tanto en agregación como en iniciación de pagos. Es donde el modelo de consentimiento y la trazabilidad dejan de ser buenas prácticas y pasan a ser requisitos regulatorios.",
      },
      {
        question: "¿Puedes auditar sin rediseñar?",
        answer:
          "Sí, y suele ser el mejor primer paso. Una auditoría de dos a tres semanas produce un informe priorizado por riesgo; a partir de ahí decides qué se toca y qué se deja.",
      },
    ],
    particulars: [
      { term: "Dominio", value: "Pagos y banca" },
      { term: "Volumen", value: "2M tx/día" },
      { term: "Norma", value: "PCI DSS" },
      { term: "Fraude", value: "Tiempo real" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "backoffice",
    title: "Backoffice",
    heading: "El trabajo manual que ya no hace nadie",
    summary:
      "Automatización y optimización de procesos internos y operaciones de backoffice empresarial.",
    metaDescription:
      "Automatización de backoffice financiero: conciliación, integración con ERP, flujos con revisión humana y agentes que preparan el trabajo sin decidir solos.",
    keywords: [
      "automatización backoffice",
      "conciliación automática",
      "integración ERP",
      "automatización procesos financieros",
      "human in the loop",
      "workflow engine",
    ],
    intro: [
      "El backoffice es donde una empresa descubre cuánto le cuesta de verdad su arquitectura. Cada integración a medias, cada campo que no se normalizó, termina siendo una persona copiando datos de una pantalla a otra al cierre de mes. Ese trabajo no aparece en ningún roadmap, pero consume equipos enteros y es donde se producen los errores más caros.",
      "El primer paso nunca es automatizar: es medir. Cuántas horas, en qué paso concreto, con qué tasa de error. Muchas veces el hallazgo es que el proceso no hay que automatizarlo sino eliminarlo, porque existe para compensar un problema de origen que sale más barato arreglar.",
      "Lo que sí se automatiza se hace con una regla firme: la máquina prepara, la persona aprueba lo que tiene consecuencias. Un agente puede clasificar mil documentos, cruzar un extracto contra el libro y dejar veinte excepciones listas para revisar. Lo que no hace es aprobar un asiento por su cuenta.",
    ],
    evidence: [
      {
        context: "Cencosud S.A. · Automatización contable",
        detail: "Módulos de contabilidad y procesos batch integrados con SAP",
        metric: "−85% errores",
      },
      {
        context: "Wompi (Grupo Bancolombia)",
        detail: "Flujo completo del panel de administración y mejoras de operación interna",
        metric: "Flujo completo",
      },
      {
        context: "Yummy Inc. · Operación de pagos",
        detail: "Herramientas internas de finanzas para el equipo que opera el dinero a diario",
        metric: "Uso diario",
      },
    ],
    spotlight: {
      label: "Criterio",
      title: "Automatizar es la segunda opción",
      body: [
        "La petición casi siempre llega igual: «automatiza este proceso». Y en una parte de los casos la respuesta correcta es que ese proceso no debería existir. Muchos flujos de backoffice son compensaciones: alguien copia datos de un sistema a otro porque una integración quedó a medias, o revisa un informe línea a línea porque el origen no valida nada.",
        "Automatizar la compensación la vuelve permanente y más difícil de quitar. Por eso el primer entregable no es un flujo automatizado sino un mapa con tiempos y tasa de error por paso, que hace visible cuál es el problema de origen y cuánto cuesta al mes seguir tapándolo.",
        "Lo que sí se automatiza se hace con una regla que no negocio: la máquina prepara, la persona aprueba lo que tiene consecuencias contables. Un agente puede cruzar mil líneas y dejar veinte excepciones listas; lo que no hace es firmar un asiento.",
      ],
      items: [
        "Mapa del proceso con tiempo y tasa de error por paso, antes de tocar nada",
        "Eliminar el paso que existe para compensar un problema de origen",
        "Automatizar el caso claro, escalar la excepción a una persona",
        "Cada decisión automática con su traza: qué regla, con qué datos",
        "Aprobación humana obligatoria en todo lo que tenga efecto contable",
      ],
    },
    benefits: [
      "Automatización de flujos de trabajo",
      "Integración con sistemas ERP",
      "Gestión documental inteligente",
      "Dashboards operativos",
      "Reducción de procesos manuales",
    ],
    approach: [
      {
        title: "Medir el proceso antes de tocarlo",
        description:
          "Instrumentar el flujo actual: cuántos casos, cuánto tarda cada paso, dónde se devuelve el trabajo. Sin esa línea base cualquier mejora posterior es una anécdota, no un resultado.",
      },
      {
        title: "Integración con lo que ya existe",
        description:
          "SAP, el ERP de turno, el banco y las hojas de cálculo que nadie admite que son críticas. Se integran con contratos explícitos y pruebas de contrato, para que un cambio del proveedor no aparezca como un error contable tres días después.",
      },
      {
        title: "Automatización con revisión humana",
        description:
          "Los flujos se diseñan con puntos de control: la automatización resuelve el caso claro y escala la excepción. Cada decisión automática queda con su traza —qué regla la tomó, con qué datos— porque un backoffice sin auditoría es un problema nuevo, no una mejora.",
      },
      {
        title: "Agentes para el trabajo de lectura",
        description:
          "Donde hay documentos no estructurados —facturas, extractos, comprobantes— un agente con herramientas acotadas extrae, valida contra el sistema de registro y propone. Se evalúa con un conjunto de casos etiquetados antes de dejarlo tocar producción, y opera siempre en modo propuesta.",
      },
    ],
    practices: [
      "Human-in-the-loop",
      "Contract testing",
      "Idempotencia",
      "Trazabilidad de decisiones",
      "Evaluación con casos etiquetados",
      "Automatización incremental",
    ],
    deliverables: [
      "Mapa del proceso con tiempos y tasa de error",
      "Integraciones con contrato y pruebas",
      "Flujos automatizados con puntos de control",
      "Tablero operativo y de excepciones",
      "Registro de auditoría de cada decisión",
    ],
    stack: ["TypeScript", "PostgreSQL", "Temporal", "SAP", "Amazon Redshift"],
    caseStudy: {
      title: "Suite de automatización backoffice",
      description:
        "Implementé una solución integral de automatización que redujo el tiempo de procesamiento manual en un 70% para un proveedor global de servicios financieros, resultando en ahorros significativos y una reducción de errores del 85%.",
      metrics: [
        { value: "−70%", label: "Proceso manual" },
        { value: "−85%", label: "Errores" },
        { value: "ERP", label: "Integración" },
      ],
    },
    faq: [
      {
        question: "¿Hace falta cambiar el ERP?",
        answer:
          "Casi nunca. Reemplazar un ERP es un proyecto de años con un riesgo enorme; integrarse bien contra él y sacar los procesos que no le corresponden resuelve el problema en semanas.",
      },
      {
        question: "¿Qué procesos conviene automatizar primero?",
        answer:
          "Los de alto volumen y regla clara: conciliación bancaria, clasificación de documentos, cierres repetitivos. Los de bajo volumen y mucho criterio se dejan para el final, o no se automatizan.",
      },
      {
        question: "¿La automatización elimina puestos?",
        answer:
          "En los casos que he visto, mueve a las personas del trabajo de copiar al de resolver excepciones, que es el que realmente requiere su criterio. Lo digo como observación, no como promesa: esa decisión es de la empresa.",
      },
      {
        question: "¿Cómo se controla que un agente no se equivoque?",
        answer:
          "Con alcance acotado, herramientas de solo lectura donde corresponde, un conjunto de evaluación con casos reales etiquetados, y aprobación humana para todo lo que tenga efecto contable.",
      },
    ],
    particulars: [
      { term: "Formato", value: "Automatización" },
      { term: "Proceso manual", value: "−70%" },
      { term: "Errores", value: "−85%" },
      { term: "Integra", value: "ERP" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "arquitectura-de-software",
    title: "Arquitectura",
    heading: "Sistemas que siguen siendo comprensibles cuando crecen",
    summary:
      "Diseño de arquitecturas de software escalables, resilientes y mantenibles para sistemas empresariales.",
    metaDescription:
      "Arquitectura de software para sistemas críticos: DDD, event sourcing, microservicios cuando corresponde y un monolito bien ordenado cuando no.",
    keywords: [
      "arquitectura de software",
      "microservicios",
      "domain driven design",
      "event sourcing",
      "arquitectura escalable",
      "auditoría de arquitectura",
    ],
    intro: [
      "La pregunta que casi nunca se hace al empezar un rediseño es la más importante: ¿este sistema es difícil porque el dominio lo es, o porque nadie lo ordenó? La respuesta cambia todo. Un dominio genuinamente complejo pide límites explícitos y modelos separados; un desorden acumulado pide, casi siempre, menos piezas y no más.",
      "Por eso no llego con una arquitectura de referencia. Llego con preguntas sobre el dominio: qué cambia junto, qué se puede desplegar por separado sin coordinar equipos, dónde está el invariante que no se puede romper nunca. De ahí salen los límites, y solo después se decide si son módulos de un mismo despliegue o servicios independientes.",
      "Prefiero un sistema aburrido que se entienda a las tres de la mañana antes que uno elegante que solo yo sepa operar. Microservicios cuando el dominio y la organización lo justifican; un monolito modular bien ordenado cuando la respuesta honesta es que un equipo de seis personas no necesita doce despliegues.",
    ],
    evidence: [
      {
        context: "Yummy Inc. · Microservicios de pagos",
        detail: "Arquitectura de medios de pago que mejoró la confiabilidad del sistema",
        metric: "+40% confiabilidad",
      },
      {
        context: "Wompi (Grupo Bancolombia)",
        detail: "Rearquitectura para soportar Open Banking como iniciador de pagos",
        metric: "−35% proceso",
      },
      {
        context: "Sky Airline · Servicios y mobile",
        detail: "Microservicios de perfiles y la nueva AppSales, con la anterior aún en producción",
        metric: "5+ servicios",
      },
    ],
    spotlight: {
      label: "Decisión",
      title: "Difícil por el dominio, o difícil por desorden",
      body: [
        "Es la pregunta que casi nadie hace al empezar un rediseño, y la que cambia todo el resultado. Un dominio genuinamente complejo pide límites explícitos y modelos separados. Un desorden acumulado pide, casi siempre, menos piezas y no más.",
        "Confundirlas es el error caro. Partir en microservicios un sistema que solo estaba mal ordenado multiplica el desorden por el número de despliegues, y añade latencia de red y consistencia eventual a un problema que era de nombres y responsabilidades.",
        "En Sky Airline la respuesta fue partir: había que construir la nueva AppSales mientras la anterior seguía sirviendo más de un millón de transacciones mensuales, y eso exige piezas que se despliegan por separado. En otros casos la respuesta honesta ha sido que un equipo de seis personas no necesita doce despliegues, y que un monolito modular bien ordenado entrega antes y se opera mejor.",
      ],
      items: [
        "Event storming con negocio, no solo con desarrollo",
        "Los límites salen del dominio; el despliegue se decide después",
        "Microservicios cuando hay equipos que necesitan no coordinarse",
        "Strangler fig: el sistema nuevo crece alrededor del viejo",
        "Cada etapa con valor propio y camino de vuelta",
      ],
    },
    benefits: [
      "Arquitecturas de microservicios",
      "Diseño orientado a eventos",
      "Sistemas distribuidos",
      "Arquitecturas cloud-native",
      "Patrones de escalabilidad",
    ],
    approach: [
      {
        title: "Descubrimiento del dominio",
        description:
          "Event storming con la gente que conoce el negocio, no solo con desarrollo. De ahí salen los contextos acotados y el lenguaje común. Es la parte que más se salta y la que más caro cuesta saltarse: unos límites mal puestos se pagan durante años.",
      },
      {
        title: "Decisiones registradas, no heredadas",
        description:
          "Cada decisión estructural queda como ADR: qué se decidió, qué alternativas se descartaron y bajo qué supuestos. Cuando los supuestos cambien —y cambian— se podrá revisar la decisión sin arqueología.",
      },
      {
        title: "Evolución incremental, no big bang",
        description:
          "El patrón strangler fig: el sistema nuevo crece alrededor del viejo y le va quitando responsabilidades, con la posibilidad de volver atrás en cada paso. Una reescritura completa es la forma más cara de descubrir que el sistema anterior hacía cosas que nadie documentó.",
      },
      {
        title: "Resiliencia probada, no supuesta",
        description:
          "Timeouts, reintentos con backoff, circuit breakers y degradación explícita. Y después, ejercicios donde se rompe algo a propósito en un entorno controlado, porque un plan de recuperación que nunca se ensayó es un documento, no una capacidad.",
      },
    ],
    practices: [
      "Domain-Driven Design",
      "Event storming",
      "ADRs",
      "Strangler fig",
      "CQRS y event sourcing",
      "Chaos engineering",
      "Fitness functions",
      "C4 model",
    ],
    deliverables: [
      "Mapa de contextos acotados",
      "Diagramas C4 y ADRs fechados",
      "Plan de migración por etapas reversibles",
      "Presupuesto de rendimiento y escalabilidad",
      "Guía de operación y recuperación",
    ],
    stack: ["TypeScript", "Go", "PostgreSQL", "Kafka", "RabbitMQ", "Terraform"],
    caseStudy: {
      title: "Rediseño arquitectónico",
      description:
        "Diseñé la arquitectura de un sistema financiero crítico que mejoró la escalabilidad en un 300%, redujo los costos de infraestructura en un 40% y disminuyó el tiempo de recuperación ante fallos de horas a minutos.",
      metrics: [
        { value: "+300%", label: "Escalabilidad" },
        { value: "−40%", label: "Costo de infra" },
        { value: "Minutos", label: "Recuperación" },
      ],
    },
    faq: [
      {
        question: "¿Siempre recomiendas microservicios?",
        answer:
          "No. Recomiendo microservicios cuando hay equipos que necesitan desplegar sin coordinarse y partes del sistema con perfiles de carga distintos. Con un equipo pequeño, un monolito modular entrega más rápido y se opera mejor.",
      },
      {
        question: "¿Cuánto dura una auditoría de arquitectura?",
        answer:
          "De dos a cuatro semanas, según el tamaño. Termina en un informe con los riesgos ordenados por impacto y un plan de etapas, cada una con valor por sí misma.",
      },
      {
        question: "¿Se puede migrar sin congelar el producto?",
        answer:
          "Sí, y es la única forma que recomiendo. Con strangler fig y feature flags el sistema nuevo se va llevando tráfico real de manera gradual y reversible, sin una fecha de corte que nadie puede garantizar.",
      },
      {
        question: "¿Qué entregas al final?",
        answer:
          "Diagramas C4, ADRs, el plan por etapas y —cuando el alcance lo incluye— el andamiaje inicial ya construido y desplegado, para que la primera etapa no empiece desde una hoja en blanco.",
      },
    ],
    particulars: [
      { term: "Formato", value: "Diseño y auditoría" },
      { term: "Escalabilidad", value: "+300%" },
      { term: "Infraestructura", value: "−40%" },
      { term: "Recuperación", value: "Minutos" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "seguridad-y-compliance",
    title: "Seguridad y compliance",
    heading: "El cumplimiento como restricción de diseño",
    summary:
      "Implementación de soluciones de seguridad y cumplimiento normativo para sistemas financieros.",
    metaDescription:
      "Seguridad y cumplimiento para sistemas financieros: PCI DSS, SOC 2, GDPR y habeas data, tratados como restricciones de diseño desde el primer día.",
    keywords: [
      "pci dss",
      "soc 2",
      "cumplimiento normativo fintech",
      "seguridad sistemas financieros",
      "gdpr habeas data",
      "auditoría de seguridad",
    ],
    intro: [
      "El cumplimiento se sufre cuando llega al final. Un equipo construye durante un año, aparece la auditoría y descubre que el número de tarjeta se guarda en texto plano en una tabla de logs. Rehacer eso cuesta diez veces más que haberlo evitado, y el coste no es solo técnico: es la fecha de salida que se corre dos trimestres.",
      "Tratado como restricción de diseño, el mismo requisito produce un sistema mejor. Si nunca almacenas el PAN, no tienes que protegerlo ni justificarlo ante nadie. Si el registro de auditoría es inmutable por construcción, la evidencia para el auditor es una consulta y no un proyecto.",
      "Trabajo PCI DSS y SOC 2 en sistemas de pago, y privacidad —GDPR en Europa, habeas data en Colombia— en cualquier sistema que toque datos personales. El enfoque es el mismo: entender qué exige la norma en términos de comportamiento del sistema, y traducirlo a controles que se verifican solos en el pipeline.",
    ],
    evidence: [
      {
        context: "Wompi (Grupo Bancolombia)",
        detail: "Desarrollo bajo PCI DSS en la pasarela y sus integraciones bancarias",
        metric: "PCI DSS",
      },
      {
        context: "Yummy Inc. · Pagos en producción",
        detail: "Medios de pago y datos de pagadores bajo requisitos de cumplimiento continuo",
        metric: "2M tx/día",
      },
      {
        context: "Yummy Inc. · Certificaciones",
        detail: "Certificado en ISO 27001 y PCI DSS en el contexto de la operación de pagos",
        metric: "ISO 27001",
      },
      {
        context: "zefer · Código abierto",
        detail:
          "Cifrado AES-256-GCM en el cliente con Web Crypto API, app web y CLI: el servidor nunca ve los datos",
        metric: "AES-256-GCM",
      },
    ],
    credentials: ["ISO 27001", "PCI DSS"],
    spotlight: {
      label: "Principio",
      title: "El dato que no guardas no lo tienes que proteger",
      body: [
        "La forma más barata de cumplir una norma es quedar fuera de su alcance. Si el número de tarjeta nunca toca tu infraestructura porque se tokeniza en el borde, no hay que cifrarlo, ni rotarle llaves, ni justificar su almacenamiento ante un auditor. El control más fuerte es el dato ausente.",
        "Ese razonamiento es el que aplico primero, y por eso el entregable inicial es un mapa de datos y no una lista de controles. El resultado habitual sorprende: la mayor parte del sistema deja de estar sujeta a la norma en cuanto el dato deja de atravesarla, y el trabajo se reduce antes de escribir una línea de código.",
        "Lo mismo llevé al código abierto. zefer-cli cifra con AES-256-GCM en el cliente y sube solo el resultado: el servidor no puede leer lo que almacena aunque quiera. Es la misma idea —eliminar la confianza en lugar de gestionarla— aplicada a una herramienta que cualquiera puede instalar y auditar.",
      ],
      items: [
        "Mapa de datos primero: qué entra, por dónde pasa, dónde se queda",
        "Reducción de alcance antes que adición de controles",
        "Tokenización en el borde y minimización por defecto",
        "Controles que rompen la build, no que dependen de que alguien recuerde",
        "Evidencia continua: cuando llega la auditoría, ya existe",
      ],
    },
    benefits: [
      "Cumplimiento PCI DSS",
      "Implementación GDPR",
      "Auditorías de seguridad",
      "Protección de datos sensibles",
      "Gestión de identidades y accesos",
    ],
    approach: [
      {
        title: "Mapa de datos y alcance",
        description:
          "Dónde entra cada dato sensible, por dónde pasa y dónde se queda. El primer resultado suele ser una reducción de alcance: la mayor parte del sistema deja de estar sujeta a la norma en cuanto el dato deja de atravesarla.",
      },
      {
        title: "Modelado de amenazas",
        description:
          "STRIDE sobre los flujos que importan, con la pregunta concreta de qué gana un atacante en cada punto. Produce una lista de controles justificados, no una checklist copiada de un PDF.",
      },
      {
        title: "Controles verificados en el pipeline",
        description:
          "SAST, análisis de dependencias, detección de secretos y política como código en cada commit. Un control que depende de que alguien se acuerde no es un control; uno que rompe la build sí lo es.",
      },
      {
        title: "Evidencia continua",
        description:
          "Registro de auditoría inmutable, rotación de secretos automatizada y accesos con mínimo privilegio revisados periódicamente. Cuando llega la auditoría, la evidencia ya existe: no hay que fabricarla en tres semanas de pánico.",
      },
    ],
    practices: [
      "Modelado de amenazas STRIDE",
      "Zero trust",
      "Mínimo privilegio",
      "Policy as code",
      "SAST y SCA en CI",
      "Rotación de secretos",
      "Registro de auditoría inmutable",
    ],
    deliverables: [
      "Mapa de datos y reducción de alcance",
      "Modelo de amenazas por flujo",
      "Matriz de controles con su evidencia",
      "Controles automatizados en el pipeline",
      "Plan de respuesta a incidentes ensayado",
    ],
    stack: ["Azure", "AWS", "Terraform", "OpenTelemetry", "Vault"],
    caseStudy: {
      title: "Programa de seguridad financiera",
      description:
        "Implementé un programa completo de seguridad para una institución financiera que resultó en la certificación PCI DSS y SOC 2, reduciendo los incidentes de seguridad en un 75% y mejorando la confianza de los clientes.",
      metrics: [
        { value: "PCI DSS · SOC 2", label: "Certificaciones" },
        { value: "−75%", label: "Incidentes" },
        { value: "Continua", label: "Evidencia" },
      ],
    },
    faq: [
      {
        question: "¿Emites la certificación?",
        answer:
          "No, eso lo hace un auditor acreditado y es correcto que sea así. Mi trabajo es que cuando llegue, el sistema y la evidencia estén listos, y acompañar el proceso desde el lado técnico.",
      },
      {
        question: "¿Por dónde se empieza si no hay nada hecho?",
        answer:
          "Por el mapa de datos. Casi siempre revela que el alcance real es mucho menor del que se asumía, y eso reduce el trabajo antes de escribir una sola línea de código.",
      },
      {
        question: "¿Esto frena la velocidad del equipo?",
        answer:
          "Al principio sí, unas semanas. Después la acelera, porque los controles automatizados sustituyen revisiones manuales y las preguntas del auditor dejan de interrumpir el desarrollo.",
      },
      {
        question: "¿Cubres habeas data y no solo GDPR?",
        answer:
          "Sí. En Colombia y buena parte de LATAM el marco local es el que aplica; los principios de minimización y consentimiento se implementan igual, cambian las obligaciones formales.",
      },
    ],
    particulars: [
      { term: "Normas", value: "PCI DSS · SOC 2" },
      { term: "Privacidad", value: "GDPR" },
      { term: "Incidentes", value: "−75%" },
      { term: "Formato", value: "Programa" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "infraestructura-cloud",
    title: "Infraestructura cloud",
    heading: "Infraestructura que no cuesta lo que costaba",
    summary:
      "Diseño e implementación de infraestructuras cloud escalables, seguras y optimizadas en costos.",
    metaDescription:
      "Infraestructura cloud en Azure, AWS y GCP para sistemas financieros: Terraform, GitOps, despliegues progresivos y costo por transacción, no por factura.",
    keywords: [
      "infraestructura cloud",
      "azure y aws",
      "migración a la nube",
      "terraform infraestructura como código",
      "finops",
      "gitops",
      "arquitectura serverless",
    ],
    intro: [
      "La factura de la nube casi nunca es un problema de precios: es un problema de arquitectura que llega en forma de factura. Instancias dimensionadas para un pico que ocurre dos veces al año, datos que cruzan zonas de disponibilidad sin necesidad, entornos de prueba encendidos los fines de semana.",
      "Por eso el trabajo empieza atribuyendo el costo a algo que el negocio entienda: cuánto cuesta procesar mil transacciones. Con esa unidad, una discusión sobre infraestructura deja de ser una pelea entre finanzas e ingeniería y pasa a ser una decisión de producto.",
      "Todo lo que se construye queda como código. Nada de consolas: si el entorno no se puede recrear desde el repositorio, no existe como capacidad, existe como suerte. Terraform para la infraestructura, GitOps para el estado de los despliegues, y entornos efímeros para que probar deje de significar competir por el único servidor de staging.",
      "He operado los tres grandes en producción y en contextos distintos: Azure y AWS sosteniendo pagos en Yummy y en Wompi, GCP y Firebase detrás de una app con más de un millón de transacciones mensuales en Sky Airline, y Redshift con Terraform para las cargas de conciliación de Cencosud. Esa variedad importa menos por el catálogo de servicios de cada proveedor que por lo contrario: deja claro cuánto de una buena infraestructura es independiente de quién la aloja.",
    ],
    evidence: [
      {
        context: "Yummy Inc. · Azure y AWS",
        detail: "Microservicios de pagos en producción con requisitos de disponibilidad continua",
        metric: "2M tx/día",
      },
      {
        context: "Wompi (Grupo Bancolombia)",
        detail: "Pasarela de pagos e integraciones bancarias sobre Azure y AWS",
        metric: "99,9%",
      },
      {
        context: "Cencosud S.A. · Datos y provisión",
        detail: "Amazon Redshift y Terraform sobre cargas de conciliación de retail",
        metric: "Terraform",
      },
      {
        context: "Sky Airline · GCP y Firebase",
        detail: "Servicios y backend mobile sobre infraestructura gestionada",
        metric: "GCP",
      },
    ],
    spotlight: {
      label: "Unidad",
      title: "Cuánto cuesta procesar mil transacciones",
      body: [
        "Mientras el costo de la nube se discuta en dólares al mes, la conversación entre finanzas e ingeniería no tiene salida: uno pide reducir y el otro responde que no se puede sin arriesgar disponibilidad. Ninguno de los dos tiene los datos para cerrar la discusión.",
        "Cambia entera cuando el costo se expresa por unidad de negocio. Cuánto cuesta procesar mil transacciones, o atender mil peticiones. Con esa cifra, subir la infraestructura deja de ser un gasto y pasa a ser una decisión de producto con margen conocido, y bajarla deja de ser un recorte a ciegas.",
        "Llegar ahí es trabajo de etiquetado y atribución antes que de arquitectura: cada recurso asignado a un servicio y a un equipo. Después, lo habitual en sistemas nunca revisados es encontrar entre un 30% y un 50% de margen sin tocar el diseño — dimensionamiento, ciclo de vida de datos y entornos encendidos que nadie usa.",
      ],
      items: [
        "Etiquetado y atribución de cada recurso a un servicio",
        "Costo por mil transacciones como métrica de producto",
        "Todo como código: si no se recrea desde el repositorio, no existe",
        "Despliegues progresivos con rollback aburrido de tan probado",
        "Migración por etapas reversibles, nunca una ventana única",
      ],
    },
    benefits: [
      "Arquitecturas multi-cloud",
      "Infraestructura como código",
      "Optimización de costos cloud",
      "Estrategias de migración",
      "Automatización de despliegues",
    ],
    approach: [
      {
        title: "Costo por unidad de negocio",
        description:
          "Etiquetado consistente y atribución de cada recurso a un servicio y a un equipo, para llegar al costo por mil transacciones. A partir de ahí las decisiones se pueden justificar solas.",
      },
      {
        title: "Infraestructura como código, sin excepciones",
        description:
          "Terraform con módulos revisados y estado remoto bloqueado. Los cambios pasan por pull request con plan visible, igual que el código de aplicación, porque un cambio de infraestructura puede tumbar el sistema tan rápido como uno de negocio.",
      },
      {
        title: "Despliegues progresivos y reversibles",
        description:
          "Canary o blue-green con métricas de decisión definidas de antemano, y feature flags para separar el despliegue de la activación. El objetivo es que volver atrás sea aburrido: si el rollback da miedo, el sistema no está listo.",
      },
      {
        title: "Migración por etapas con valor propio",
        description:
          "Nada de un corte único de fin de semana. Cada etapa mueve una parte, se mide en producción y puede revertirse. La estrategia —rehost, replatform o refactor— se elige por componente, no para todo el sistema a la vez.",
      },
    ],
    practices: [
      "Infraestructura como código",
      "GitOps",
      "FinOps",
      "Despliegue canary y blue-green",
      "Feature flags",
      "Entornos efímeros",
      "Autoescalado con presupuesto",
    ],
    deliverables: [
      "Módulos de Terraform revisados",
      "Pipeline de despliegue con rollback probado",
      "Modelo de costo por unidad de negocio",
      "Runbooks de operación y recuperación",
      "Plan de migración por etapas reversibles",
    ],
    stack: ["Azure", "AWS", "GCP", "Terraform", "Docker", "Kubernetes"],
    caseStudy: {
      title: "Migración a la nube",
      description:
        "Lideré la migración de un sistema financiero crítico a AWS, implementando una arquitectura serverless que redujo los costos operativos en un 60% y mejoró la disponibilidad al 99.99%.",
      metrics: [
        { value: "−60%", label: "Costo operativo" },
        { value: "99,99%", label: "Disponibilidad" },
        { value: "AWS", label: "Destino" },
      ],
    },
    faq: [
      {
        question: "¿Azure, AWS o GCP?",
        answer:
          "El que ya use el equipo, salvo que haya una razón concreta para cambiar. He trabajado los tres —Azure y AWS en Yummy y en Wompi, GCP en Sky Airline— y la diferencia real rara vez está en el proveedor: está en cómo se provisiona, se despliega y se atribuye el costo. Multi-cloud de verdad cuesta mucho más de lo que la mayoría estima; portabilidad razonable sí vale la pena, y se consigue con contenedores y Terraform.",
      },
      {
        question: "¿Serverless siempre sale más barato?",
        answer:
          "No. Sale barato con carga irregular y caro con carga alta y constante. La comparación honesta se hace con el perfil de tráfico real, no con el de la presentación del proveedor.",
      },
      {
        question: "¿Se puede migrar sin parar el servicio?",
        answer:
          "Sí, con etapas reversibles y tráfico dividido. Las migraciones que fallan casi siempre son las que intentaron moverlo todo en una ventana de mantenimiento.",
      },
      {
        question: "¿Cuánto se puede reducir la factura?",
        answer:
          "Depende del punto de partida. En sistemas que nunca han sido revisados es habitual encontrar entre un 30% y un 50% sin tocar la arquitectura, solo con dimensionamiento, ciclo de vida de datos y apagado de lo que nadie usa.",
      },
    ],
    particulars: [
      { term: "Formato", value: "Migración" },
      { term: "Costo", value: "−60%" },
      { term: "Disponibilidad", value: "99,99%" },
      { term: "Nube", value: "Azure · AWS · GCP" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial",
    heading: "Agentes con permisos, no demos",
    summary:
      "Agentes de IA aplicados a sistemas financieros y de backoffice, incluida la infraestructura para que operen dinero con límites y auditoría.",
    metaDescription:
      "IA con agentes en sistemas financieros: herramientas acotadas vía MCP, evaluaciones antes de producción y finanzas agénticas con mandatos y auditoría.",
    keywords: [
      "agentes de ia",
      "finanzas agenticas",
      "model context protocol",
      "llm en producción",
      "detección de fraude con ia",
      "pagos entre agentes",
    ],
    intro: [
      "La distancia entre una demo de agente y un agente en producción no es el modelo: es todo lo demás. Permisos acotados, herramientas que no pueden hacer más de lo necesario, un conjunto de evaluación que dice si la nueva versión mejoró o empeoró, y un registro de qué hizo y por qué. Sin eso hay un prototipo impresionante que nadie se atreve a conectar a un sistema real.",
      "Trabajo la IA como se trabaja cualquier otra integración crítica. El agente recibe herramientas explícitas —consultar, calcular, redactar, proponer— a través de MCP, cada una con su contrato y sus límites. Las de escritura requieren aprobación humana cuando tienen efecto contable. Nada de acceso general a la base de datos porque sea más cómodo.",
      "Y se mide. Antes de que un agente toque producción existe un conjunto de casos reales etiquetados con la respuesta correcta, y cada cambio de prompt, de modelo o de herramienta se compara contra él. Es la disciplina de TDD aplicada a un componente no determinista: primero el caso, después la implementación.",
      "Esto no lo digo desde fuera. Mantengo en abierto las piezas de las que hablo: `skills`, una compuerta adversarial de riesgo que bloquea la acción de un agente hasta que una persona la aprueba, compatible con más de cuarenta agentes; `ai-sync-cli`, que sincroniza configuración y capacidades entre agentes e IDEs con MCP nativo; y `bcv-exchange-rate`, una librería de tasas oficiales que además se expone como servidor MCP. Son las herramientas que uso para poner límites a un agente, publicadas para que cualquiera las audite.",
    ],
    /**
     * The agentic-finance section. It is part of this service and not a separate
     * one: what makes it credible is the payments experience, not the AI.
     */
    spotlight: {
      label: "Finanzas agénticas",
      title: "Cuando el que paga es un agente",
      body: [
        "Durante toda la historia de los sistemas de pago, del otro lado hubo una persona. Eso está dejando de ser cierto: cada vez más un agente inicia la compra, contrata el servicio o paga el consumo de una API. Y casi ninguna plataforma financiera está construida para eso.",
        "Las preguntas que aparecen no son teóricas. ¿Quién es el agente ante el sistema, y cómo se distingue del humano que lo desplegó? ¿Cuánto puede gastar, en qué y hasta cuándo? Cuando algo sale mal, ¿la traza permite decir qué instrucción originó el movimiento y quién autorizó el mandato?",
        "Puedo integrarlo porque vengo del otro lado. En Yummy opero pagos de alta transaccionalidad —2 millones de transacciones diarias, medios de pago, conciliación— y ese es exactamente el conocimiento que esto exige: identidad, mandatos revocables, idempotencia, partida doble y auditoría. Que el iniciador sea una máquina no relaja ninguna garantía; la aumenta, porque una máquina reintenta más rápido y más veces que una persona.",
      ],
      items: [
        "Identidad y credenciales propias del agente, separadas de las del humano que lo desplegó",
        "Mandatos explícitos con monto, categoría, contraparte y caducidad, revocables y auditables",
        "Umbral de aprobación humana: por debajo se ejecuta y queda trazado, por encima escala",
        "Liquidación con idempotencia y partida doble, igual que cualquier pago entre personas",
        "Herramientas financieras acotadas vía MCP, nunca acceso general al core",
      ],
    },
    evidence: [
      {
        context: "Yummy Inc. · Pagos de alta transaccionalidad",
        detail:
          "El conocimiento que exigen las finanzas agénticas: identidad, límites, conciliación",
        metric: "2M tx/día",
      },
      {
        context: "skill-rules · Código abierto",
        detail: "Sincroniza capacidades de agentes entre Claude Code, Cursor y Windsurf",
        metric: "npm",
      },
      {
        context: "skills · Código abierto",
        detail:
          "Compuerta adversarial de riesgo: bloquea la acción de un agente hasta que una persona la aprueba",
        metric: "40+ agentes",
      },
      {
        context: "ai-sync-cli · Código abierto",
        detail:
          "Sincroniza configuración, skills y sesiones entre agentes e IDEs, con soporte MCP nativo",
        metric: "20+ agentes",
      },
      {
        context: "bcv-exchange-rate · Código abierto",
        detail: "Librería Node y servidor MCP de tasas oficiales BCV, TRM y PTAX",
        metric: "~700 desc./mes",
      },
    ],
    benefits: [
      "Detección de fraude con IA",
      "Análisis predictivo financiero",
      "Automatización inteligente de procesos",
      "Finanzas agénticas: pagos iniciados por agentes con mandato",
      "Procesamiento de lenguaje natural y documentos",
    ],
    approach: [
      {
        title: "Empezar por la decisión, no por el modelo",
        description:
          "Qué decisión se quiere apoyar, quién la toma hoy y con qué información. Si no hay una decisión concreta detrás, lo que se pide no es IA: es un buscador, y sale mucho más barato.",
      },
      {
        title: "Herramientas acotadas sobre MCP",
        description:
          "El agente no accede a sistemas, accede a herramientas con contrato: entradas validadas, permisos mínimos, salida tipada. Model Context Protocol da esa frontera de forma estándar y hace que el mismo conjunto sirva para varios clientes y modelos.",
      },
      {
        title: "Evaluaciones antes que producción",
        description:
          "Un conjunto de casos etiquetados con la respuesta esperada, ejecutado en cada cambio, con métricas por tipo de error. Sin evaluaciones no se puede decir si una versión es mejor: solo si la última prueba manual salió bien.",
      },
      {
        title: "Mandatos y límites cuando hay dinero",
        description:
          "En cuanto el agente puede gastar, el control deja de ser un prompt y pasa a ser un objeto del sistema: un mandato con monto, categoría, contraparte y caducidad, consultable y revocable. Un límite que solo vive en las instrucciones no es un límite.",
      },
      {
        title: "Guardarraíles y trazas",
        description:
          "Límites de gasto, tiempos máximos, validación de salida contra esquema y detección de casos fuera de distribución. Cada ejecución queda trazada con sus entradas, sus llamadas a herramientas y su resultado, porque un agente sin auditoría no es auditable por definición.",
      },
    ],
    practices: [
      "Model Context Protocol",
      "Evaluaciones automatizadas",
      "Human-in-the-loop por umbral",
      "Mandatos revocables",
      "Identidad de máquina",
      "RAG con fuentes citadas",
      "Guardarraíles y validación de esquema",
      "Observabilidad de LLM",
    ],
    deliverables: [
      "Definición de la decisión a apoyar",
      "Servidor MCP con herramientas acotadas",
      "Conjunto de evaluación con casos reales",
      "Modelo de identidad, mandatos y políticas de gasto",
      "Trazas, auditoría por instrucción y coste por ejecución",
    ],
    stack: ["TypeScript", "MCP", "Ollama", "OpenTelemetry", "PostgreSQL", "pgvector"],
    caseStudy: {
      title: "Detección de fraude con IA",
      description:
        "Desarrollé un sistema de detección de fraude basado en IA que redujo las transacciones fraudulentas en un 45% para un banco internacional, ahorrando millones en pérdidas potenciales.",
      metrics: [
        { value: "−45%", label: "Tx fraudulentas" },
        { value: "Banca", label: "Sector" },
        { value: "ML", label: "Enfoque" },
      ],
    },
    faq: [
      {
        question: "¿Hace falta entrenar un modelo propio?",
        answer:
          "Rara vez. En la mayoría de los casos el valor está en las herramientas, el contexto y las evaluaciones, no en el modelo. Entrenar tiene sentido cuando hay datos propios que ningún modelo general ha visto y el volumen justifica el coste.",
      },
      {
        question: "¿Por dónde se empieza con finanzas agénticas?",
        answer:
          "Por un caso acotado y con tope: pago de consumo de APIs, compras internas con límite, reposición automática. Se define el mandato, se fija el umbral de aprobación y se amplía solo cuando la traza demuestra que se sostiene.",
      },
      {
        question: "¿Qué pasa con los datos sensibles?",
        answer:
          "No salen del perímetro si no deben. Se trabaja con minimización, enmascarado antes de la llamada y, cuando el dato no puede salir, con modelos desplegados dentro de la infraestructura del cliente.",
      },
      {
        question: "¿Cómo se audita algo que decidió un modelo?",
        answer:
          "Trazando la instrucción, no el razonamiento. Qué mandato estaba vigente, qué herramienta se llamó, con qué parámetros y con qué resultado. Eso es auditable y suficiente; reconstruir el razonamiento del modelo no lo es.",
      },
      {
        question: "¿Cómo se sabe si el agente está funcionando bien?",
        answer:
          "Por el conjunto de evaluación y por las métricas en producción: tasa de escalado a humano, tasa de corrección posterior y coste por caso resuelto. Si esas tres no se miden, la respuesta honesta es que no se sabe.",
      },
    ],
    particulars: [
      { term: "Formato", value: "Integración" },
      { term: "Fraude", value: "−45%" },
      { term: "Enfoque", value: "Agentes + ML" },
      { term: "Frontera", value: "MCP" },
    ],
  },
]

/** The engagement, stated once. Same three steps the old page printed. */
export const METHOD = [
  {
    term: "Análisis",
    title: "Análisis estratégico",
    description:
      "Evaluación profunda de necesidades, objetivos y arquitectura actual. Antes de proponer nada leo el repositorio, el pipeline y los incidentes del último trimestre: el código dice cómo se decide de verdad. El kickoff se transcribe y deja un borrador de especificación en vez de un acta que nadie escribe.",
    items: ["Auditoría técnica", "Kickoff transcrito", "Evaluación de riesgos"],
  },
  {
    term: "Diseño",
    title: "Diseño arquitectónico",
    description:
      "El borrador se refina con el equipo hasta ser una especificación aprobada, y de ahí se ejecuta como SDD: la especificación es la fuente y cada decisión estructural queda como ADR fechado. La IA prepara; las personas deciden.",
    items: ["Ceremonia de refinamiento", "Especificación y ADR", "Plan por etapas"],
  },
  {
    term: "Entrega",
    title: "Implementación ágil",
    description:
      "Desarrollo iterativo con TDD donde el error cuesta dinero, despliegues progresivos y medición en producción. Cada entrega deja su traza en git, y de ese histórico salen la capacidad estimada y los KPIs, calculados en vez de reportados.",
    items: ["Entrega incremental", "Capacidad y KPIs desde git", "Traspaso al equipo"],
  },
]

/**
 * The questions that come before choosing a front. They live on the index and
 * feed its `FAQPage` graph — the same array, so the markup can never claim an
 * answer the visitor cannot read.
 */
export const SERVICES_FAQ = [
  {
    question: "¿Cómo empieza un trabajo contigo?",
    answer:
      "Por un diagnóstico de una hora. Reviso el problema concreto, hago las preguntas que hagan falta y salgo con los riesgos que veo priorizados y unos siguientes pasos. Si de ahí no sale nada útil, no hay nada que contratar.",
  },
  {
    question: "¿Trabajas por proyecto cerrado o por acompañamiento?",
    answer:
      "Ambos, según el frente. Una auditoría de arquitectura o un programa de cumplimiento tienen alcance cerrado y entregables claros. El liderazgo técnico es acompañamiento por definición, con dedicación parcial durante tres a seis meses.",
  },
  {
    question: "¿Qué metodologías aplicas?",
    answer:
      "Spec-Driven Development para escribir la especificación antes que el código, ADRs para que las decisiones estructurales queden fechadas, TDD donde el error cuesta dinero y pruebas de contrato en el resto. En infraestructura, todo como código con despliegues progresivos y reversibles.",
  },
  {
    question: "¿Integras IA y agentes en sistemas que ya están en producción?",
    answer:
      "Sí, y con el mismo rigor que cualquier otra integración crítica: herramientas acotadas vía MCP, evaluaciones con casos reales antes de tocar producción y aprobación humana donde hay efecto contable. Incluye finanzas agénticas —agentes que inician pagos con mandato, límite y auditoría—, que puedo abordar porque vengo del lado de los pagos de alta transaccionalidad.",
  },
  {
    question: "¿Trabajas en remoto y con qué zonas horarias?",
    answer:
      "Remoto desde Medellín, sobre America/Bogotá. Trabajo habitualmente con equipos en LATAM y Estados Unidos, en español o en inglés.",
  },
  {
    question: "¿Qué necesitas para dar un estimado?",
    answer:
      "El problema en una o dos frases, el volumen aproximado y si hay una fecha externa que cumplir. Con eso puedo decir si es un trabajo de semanas o de meses, y si soy la persona indicada o conviene otra cosa.",
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
