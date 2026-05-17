import { type Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "cencosud",
    title: "Cencosud - Pagos & Facturación",
    description:
      "Producto estrella de Wompi procesando millones de transacciones al mes.",
    fullDescription:
      "Como Dev Leader, participé en el desarrollo, soporte, análisis y monitoreo de todas las operaciones financieras del Grupo Cencosud.",
    technologies: ["Node.js", "MongoDB", "Microservicios", "AWS", "Kubernetes", "Redis"],
    imageEmoji: "📊",
    year: "2023",
    demoUrl: "https://wompi.com",
    repoUrl: "https://docs.wompi.co/docs/colombia/pagos-a-terceros/",
    image:
      "https://media.fashionnetwork.com/cdn-cgi/image/format=auto/m/8b88/b3a0/f6c6/e6db/1dad/2f67/5628/bc1b/cabe/64c3/64c3.jpg",
    imageAlt: "Cencosud - Pagos & Facturación",
    shortTitle: "Cencosud - Pagos & Facturación",
    shortDescription:
      "Conciliación diaria de millones de facturas y pagos cruzados entre múltiples procesadores, con observabilidad end-to-end y arquitectura tolerante a fallas.",
    type: "Retail",
    role: "Developer Lead",
    outcome: "Conciliando 2M facturas al día",
    metrics: [
      { value: "2M", label: "Facturas/día" },
      { value: "60%", label: "Más rápido" },
      { value: "99.95%", label: "Uptime" },
    ],
  },
  {
    id: "wompi",
    title: "Wompi - Pagos a terceros",
    description:
      "Producto estrella de Wompi procesando millones de transacciones al mes.",
    fullDescription:
      "Como Sr. Software Engineer, participé en el desarrollo de una herramienta de Wompi — la pasarela de pagos del Grupo Bancolombia — que permite efectuar pagos a clientes, trabajadores y proveedores de sus comercios afiliados. La solución se basa en microservicios, contenedores, y tiene soporte multicloud, con integración directa y a través de terceros a varios bancos del país.",
    technologies: ["Node.js", "MongoDB", "Microservicios", "AWS", "Kubernetes", "Redis"],
    imageEmoji: "📊",
    year: "2023",
    demoUrl: "https://wompi.com",
    repoUrl: "https://docs.wompi.co/docs/colombia/pagos-a-terceros/",
    image:
      "https://www.bancolombia.com/wcm/connect/26a7688d-2822-4011-8d04-2086f74e478d/Wompi_lanza_servicio_de_pagos_a_terceros_para_los_comercios.jpg?MOD=AJPERES",
    imageAlt: "Wompi - Pagos a terceros",
    shortTitle: "Wompi - Pagos a terceros",
    shortDescription:
      "Pasarela del Grupo Bancolombia que permite a comercios afiliados pagar a clientes, trabajadores y proveedores con integración directa a múltiples bancos.",
    type: "Pasarela de pagos",
    role: "Sr. Software Engineer",
    outcome: "1M+ pagos B2B mensuales",
    metrics: [
      { value: "1M+", label: "Pagos/mes" },
      { value: "5+", label: "Bancos integrados" },
      { value: "Multi", label: "Cloud" },
    ],
  },
]
