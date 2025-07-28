import type { MediumPost } from "@/types/medium"
import { 
  getCachedMediumPosts, 
  getCachedMediumPostBySlug, 
  getCachedRelatedMediumPosts, 
  getCachedMediumCategories,
  getCachedFeaturedPost
} from "./rss-service"

// Función principal para obtener los posts de Medium (ahora usa caché)
export async function fetchMediumPosts(username?: string): Promise<MediumPost[]> {
  try {
    return await getCachedMediumPosts()
  } catch (error) {
    console.error("Error fetching Medium posts:", error)
    return getMockPosts()
  }
}

// Función para obtener un post específico por su slug (ahora usa caché)
export async function fetchMediumPostBySlug(username: string, slug: string): Promise<MediumPost | null> {
  try {
    return await getCachedMediumPostBySlug(slug)
  } catch (error) {
    console.error("Error fetching Medium post by slug:", error)
    const mockPosts = getMockPosts()
    return mockPosts.find((post) => post.slug === slug) || mockPosts[0]
  }
}

// Función para obtener posts relacionados (ahora usa caché)
export async function fetchRelatedMediumPosts(username: string, currentSlug: string): Promise<MediumPost[]> {
  try {
    return await getCachedRelatedMediumPosts(currentSlug)
  } catch (error) {
    console.error("Error fetching related Medium posts:", error)
    const mockPosts = getMockPosts()
    return mockPosts.filter((post) => post.slug !== currentSlug).slice(0, 3)
  }
}

// Función para obtener todas las categorías únicas (ahora usa caché)
export async function fetchMediumCategories(username?: string): Promise<string[]> {
  try {
    return await getCachedMediumCategories()
  } catch (error) {
    console.error("Error fetching Medium categories:", error)
    return ["Desarrollo", "Finanzas", "Tecnología", "Liderazgo", "Arquitectura"]
  }
}

// Función para obtener el post destacado
export async function fetchFeaturedPost(): Promise<MediumPost | null> {
  try {
    return await getCachedFeaturedPost()
  } catch (error) {
    console.error("Error fetching featured post:", error)
    const mockPosts = getMockPosts()
    return mockPosts[0] || null
  }
}

// Función para obtener datos de ejemplo (para desarrollo y demostración)
function getMockPosts(): MediumPost[] {
  return [
    {
      title: "Arquitectura de Microservicios en Sistemas Financieros",
      author: "José Carrillo",
      content: `<p>Los microservicios se han convertido en una arquitectura fundamental para sistemas financieros modernos. En este artículo, exploramos cómo implementar una arquitectura de microservicios efectiva para aplicaciones financieras de alta disponibilidad.</p>
                <h2>Beneficios de los Microservicios en Fintech</h2>
                <p>La arquitectura de microservicios ofrece numerosas ventajas para sistemas financieros:</p>
                <ul>
                  <li>Escalabilidad independiente de componentes</li>
                  <li>Resiliencia y tolerancia a fallos</li>
                  <li>Despliegues más seguros y frecuentes</li>
                  <li>Equipos autónomos trabajando en servicios específicos</li>
                </ul>
                <p>Implementar correctamente esta arquitectura requiere considerar aspectos como la consistencia de datos, la seguridad entre servicios y la observabilidad del sistema.</p>`,
      description:
        "<strong>Explorando</strong> las mejores prácticas para implementar arquitecturas de microservicios en sistemas financieros de alta disponibilidad y seguridad.",
      link: "https://medium.com/@carrilloapps/arquitectura-microservicios-sistemas-financieros",
      guid: "1",
      thumbnail: "https://miro.medium.com/max/1200/1*tOitxCwTNcS3ESstLylmtg.jpeg",
      pubDate: "2023-04-15T10:00:00Z",
      categories: ["Arquitectura", "Microservicios", "Finanzas", "Desarrollo"],
      readingTime: 8,
      slug: "arquitectura-de-microservicios-en-sistemas-financieros",
      claps: 245,
      responses: 12,
      wordCount: 350,
      mediumUrl: "https://medium.com/@carrilloapps/arquitectura-microservicios-sistemas-financieros",
      canonicalUrl: "https://medium.com/@carrilloapps/arquitectura-microservicios-sistemas-financieros",
      subtitle: "Implementando arquitecturas escalables para el sector financiero",
      lastModified: "2023-04-20T14:30:00Z",
      firstPublished: "2023-04-15T10:00:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["Arquitectura", "Microservicios", "Finanzas", "Desarrollo", "Escalabilidad"],
      estimatedReadingTime: 8,
    },
    {
      title: "Optimización de Rendimiento en Aplicaciones React",
      author: "José Carrillo",
      content: `<p>El rendimiento es crucial para ofrecer una buena experiencia de usuario. En este artículo, comparto técnicas avanzadas para optimizar aplicaciones React en producción.</p>
                <h2>Técnicas de Optimización</h2>
                <p>Estas son algunas de las técnicas más efectivas:</p>
                <ul>
                  <li>Memoización con React.memo, useMemo y useCallback</li>
                  <li>Code splitting y lazy loading</li>
                  <li>Virtualización de listas largas</li>
                  <li>Optimización de re-renderizados</li>
                </ul>
                <p>Implementar estas técnicas puede mejorar significativamente el tiempo de carga y la interactividad de tu aplicación.</p>`,
      description:
        "<strong>Técnicas avanzadas</strong> para mejorar el rendimiento de aplicaciones React en producción, desde la memoización hasta la virtualización de listas.",
      link: "https://medium.com/@carrilloapps/optimizacion-rendimiento-react",
      guid: "2",
      thumbnail: "https://miro.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
      pubDate: "2023-05-20T14:30:00Z",
      categories: ["React", "Rendimiento", "Frontend", "JavaScript"],
      readingTime: 6,
      slug: "optimizacion-de-rendimiento-en-aplicaciones-react",
      claps: 189,
      responses: 8,
      wordCount: 320,
      mediumUrl: "https://medium.com/@carrilloapps/optimizacion-rendimiento-react",
      canonicalUrl: "https://medium.com/@carrilloapps/optimizacion-rendimiento-react",
      subtitle: "Técnicas avanzadas para aplicaciones React más rápidas",
      lastModified: "2023-05-22T09:15:00Z",
      firstPublished: "2023-05-20T14:30:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["React", "Rendimiento", "Frontend", "JavaScript", "Optimización"],
      estimatedReadingTime: 6,
    },
    {
      title: "Implementando Sistemas de Detección de Fraude con Machine Learning",
      author: "José Carrillo",
      content: `<p>La detección de fraude es un componente crítico en sistemas financieros modernos. En este artículo, exploramos cómo implementar un sistema efectivo utilizando técnicas de machine learning.</p>
                <h2>Algoritmos Efectivos</h2>
                <p>Estos son algunos de los algoritmos más efectivos para detección de fraude:</p>
                <ul>
                  <li>Random Forest para clasificación de transacciones</li>
                  <li>Redes neuronales para detección de anomalías</li>
                  <li>Isolation Forest para identificar outliers</li>
                  <li>Análisis de grafos para detectar redes de fraude</li>
                </ul>
                <p>La combinación de estos enfoques puede reducir significativamente las tasas de falsos positivos mientras se mantiene una alta tasa de detección.</p>`,
      description:
        "<strong>Cómo implementar</strong> sistemas efectivos de detección de fraude utilizando algoritmos de machine learning y técnicas avanzadas de análisis de datos.",
      link: "https://medium.com/@carrilloapps/deteccion-fraude-machine-learning",
      guid: "3",
      thumbnail: "https://miro.medium.com/max/1200/1*_G9Twd0rsUn-82AHiQrZ_w.jpeg",
      pubDate: "2023-06-10T09:15:00Z",
      categories: ["Machine Learning", "Seguridad", "Finanzas", "Python"],
      readingTime: 10,
      slug: "implementando-sistemas-de-deteccion-de-fraude-con-machine-learning",
      claps: 312,
      responses: 15,
      wordCount: 420,
      mediumUrl: "https://medium.com/@carrilloapps/deteccion-fraude-machine-learning",
      canonicalUrl: "https://medium.com/@carrilloapps/deteccion-fraude-machine-learning",
      subtitle: "Protegiendo sistemas financieros con inteligencia artificial",
      lastModified: "2023-06-15T11:20:00Z",
      firstPublished: "2023-06-10T09:15:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["Machine Learning", "Seguridad", "Finanzas", "Python", "Fraude"],
      estimatedReadingTime: 10,
    },
    {
      title: "Liderazgo Técnico Efectivo en Equipos Remotos",
      author: "José Carrillo",
      content: `<p>El liderazgo técnico en equipos remotos presenta desafíos únicos. En este artículo, comparto estrategias efectivas basadas en mi experiencia liderando equipos distribuidos.</p>
                <h2>Principios Clave</h2>
                <p>Estos son algunos principios fundamentales para liderar equipos técnicos remotos:</p>
                <ul>
                  <li>Comunicación asíncrona efectiva</li>
                  <li>Documentación como pilar del conocimiento compartido</li>
                  <li>Establecimiento de expectativas claras</li>
                  <li>Creación de espacios para interacciones informales</li>
                </ul>
                <p>Implementar estos principios puede transformar la efectividad de un equipo distribuido y crear una cultura de alto rendimiento.</p>`,
      description:
        "Estrategias y principios para liderar equipos técnicos remotos de manera efectiva, basados en experiencia real con equipos distribuidos globalmente.",
      link: "https://medium.com/@carrilloapps/liderazgo-tecnico-equipos-remotos",
      guid: "4",
      thumbnail: "https://miro.medium.com/max/1200/1*3Xf3pf_Zh6dDi5_8VPtEVA.jpeg",
      pubDate: "2023-07-05T16:45:00Z",
      categories: ["Liderazgo", "Equipos Remotos", "Gestión", "Cultura"],
      readingTime: 7,
      slug: "liderazgo-tecnico-efectivo-en-equipos-remotos",
      claps: 278,
      responses: 22,
      wordCount: 380,
      mediumUrl: "https://medium.com/@carrilloapps/liderazgo-tecnico-equipos-remotos",
      canonicalUrl: "https://medium.com/@carrilloapps/liderazgo-tecnico-equipos-remotos",
      subtitle: "Construyendo equipos de alto rendimiento en entornos distribuidos",
      lastModified: "2023-07-10T08:30:00Z",
      firstPublished: "2023-07-05T16:45:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["Liderazgo", "Equipos Remotos", "Gestión", "Cultura", "Trabajo Remoto"],
      estimatedReadingTime: 7,
    },
    {
      title: "Automatización de Backoffice: Casos de Éxito",
      author: "José Carrillo",
      content: `<p>La automatización de procesos de backoffice puede transformar la eficiencia operativa de una organización. En este artículo, comparto casos de éxito reales y lecciones aprendidas.</p>
                <h2>Áreas de Mayor Impacto</h2>
                <p>Estas son las áreas donde la automatización de backoffice suele tener mayor impacto:</p>
                <ul>
                  <li>Procesamiento de documentos y extracción de datos</li>
                  <li>Conciliación financiera y contable</li>
                  <li>Gestión de excepciones y casos especiales</li>
                  <li>Generación y distribución de reportes</li>
                </ul>
                <p>Los casos presentados muestran reducciones de tiempo de procesamiento de hasta un 80% y mejoras significativas en la precisión.</p>`,
      description:
        "Casos de éxito reales de automatización de procesos de backoffice en empresas financieras, con análisis de resultados y lecciones aprendidas.",
      link: "https://medium.com/@carrilloapps/automatizacion-backoffice-casos-exito",
      guid: "5",
      thumbnail: "https://miro.medium.com/max/1200/1*QoR_vbD4F6Y-QoYDyF009Q.jpeg",
      pubDate: "2023-08-12T11:20:00Z",
      categories: ["Automatización", "Backoffice", "Eficiencia", "RPA"],
      readingTime: 9,
      slug: "automatizacion-de-backoffice-casos-de-exito",
      claps: 195,
      responses: 7,
      wordCount: 410,
      mediumUrl: "https://medium.com/@carrilloapps/automatizacion-backoffice-casos-exito",
      canonicalUrl: "https://medium.com/@carrilloapps/automatizacion-backoffice-casos-exito",
      subtitle: "Transformando la eficiencia operativa con tecnología",
      lastModified: "2023-08-15T14:10:00Z",
      firstPublished: "2023-08-12T11:20:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["Automatización", "Backoffice", "Eficiencia", "RPA", "Procesos"],
      estimatedReadingTime: 9,
    },
    {
      title: "Seguridad en APIs Financieras: Mejores Prácticas",
      author: "José Carrillo",
      content: `<p>La seguridad es crítica en APIs que manejan datos financieros sensibles. Este artículo presenta las mejores prácticas actuales para asegurar APIs en el sector financiero.</p>
                <h2>Prácticas Fundamentales</h2>
                <p>Estas son algunas prácticas fundamentales para APIs financieras seguras:</p>
                <ul>
                  <li>Autenticación multifactor para endpoints críticos</li>
                  <li>Cifrado de datos en tránsito y en reposo</li>
                  <li>Implementación de rate limiting y detección de abusos</li>
                  <li>Validación estricta de inputs y sanitización de datos</li>
                </ul>
                <p>Implementar estas prácticas es esencial para cumplir con regulaciones como PCI DSS y proteger datos sensibles de los clientes.</p>`,
      description:
        "Mejores prácticas de seguridad para el diseño e implementación de APIs en el sector financiero, con énfasis en protección de datos sensibles.",
      link: "https://medium.com/@carrilloapps/seguridad-apis-financieras",
      guid: "6",
      thumbnail: "https://miro.medium.com/max/1200/1*8wz97F6XO9hg3Nj8l_-K9g.jpeg",
      pubDate: "2023-09-18T13:10:00Z",
      categories: ["Seguridad", "APIs", "Finanzas", "Desarrollo"],
      readingTime: 11,
      slug: "seguridad-en-apis-financieras-mejores-practicas",
      claps: 267,
      responses: 14,
      wordCount: 450,
      mediumUrl: "https://medium.com/@carrilloapps/seguridad-apis-financieras",
      canonicalUrl: "https://medium.com/@carrilloapps/seguridad-apis-financieras",
      subtitle: "Protegiendo datos financieros en la era de las APIs",
      lastModified: "2023-09-22T09:45:00Z",
      firstPublished: "2023-09-18T13:10:00Z",
      language: "es",
      license: "All Rights Reserved",
      tags: ["Seguridad", "APIs", "Finanzas", "Desarrollo", "Ciberseguridad"],
      estimatedReadingTime: 11,
    },
  ]
}
