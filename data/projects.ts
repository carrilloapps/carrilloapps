import { type Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "cencosud",
    title: "Cencosud - Pagos & Facturación",
    description: "Producto estrella de Wompi procesando millones de transacciones al mes.",
    fullDescription: "Como Dev Leader, participe en el desarrollando, soporte, analisis y monitoreo de todas las operaciones financieras del Grupo Cencosud",
    technologies: ["Node.js", "MongoDB", "Microservices", "AWS", "Kubernetes", "Redis"],
    imageEmoji: "📊",
    year: "2023",
    demoUrl: "https://wompi.com",
    repoUrl: "https://docs.wompi.co/docs/colombia/pagos-a-terceros/",
    image: "https://media.fashionnetwork.com/cdn-cgi/image/format=auto/m/8b88/b3a0/f6c6/e6db/1dad/2f67/5628/bc1b/cabe/64c3/64c3.jpg",
    imageAlt: "Cencosud - Pagos & Facturación",
    shortTitle: "Cencosud - Pagos & Facturación",
    shortDescription: "Procesando millones de facturas y realizando su conciliación diaria con millones de pagos en diferentes procesadores de pagos.",
    type: "Retail"
  },
  {
    id: "wompi",
    title: "Wompi - Pagos a terceros",
    description: "Producto estrella de Wompi procesando millones de transacciones al mes.",
    fullDescription: "Como Sr. Software Engineering, participe en el desarrollando una herramienta de Wompi, la pasarela de pagos del Grupo Bancolombia que permite efectuar pagos a clientes, trabajadores y proveedores de sus comercios afiliados. La solución se basa en microservicios, contenedores, y tiene un soporte multicloud. Con integración directa y por medio de terceros a varios bancos del país.",
    technologies: ["Node.js", "MongoDB", "Microservices", "AWS", "Kubernetes", "Redis"],
    imageEmoji: "📊",
    year: "2023",
    demoUrl: "https://wompi.com",
    repoUrl: "https://docs.wompi.co/docs/colombia/pagos-a-terceros/",
    image: "https://www.bancolombia.com/wcm/connect/26a7688d-2822-4011-8d04-2086f74e478d/Wompi_lanza_servicio_de_pagos_a_terceros_para_los_comercios.jpg?MOD=AJPERES",
    imageAlt: "Wompi - Pagos a terceros",
    shortTitle: "Wompi - Pagos a terceros",
    shortDescription: "Herramienta de Wompi, la pasarela de pagos del Grupo Bancolombia que permite efectuar pagos a clientes, trabajadores y proveedores.",
    type: "Pasarela de pagos"
  }
]