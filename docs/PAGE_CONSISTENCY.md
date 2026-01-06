# Guía de Consistencia de Páginas

Esta guía documenta los estándares de diseño y estructura que deben seguirse al crear nuevas páginas en el proyecto para mantener la consistencia visual y funcional con el blog y otras páginas principales.

## Componente PageHero

**IMPORTANTE**: Usa el componente `PageHero` para el hero section de todas las páginas. Este componente abstrae toda la lógica de animación y estructura, manteniendo la consistencia automáticamente.

### Uso Básico

```tsx
import { PageHero } from "@/components/page-hero";

<PageHero
  badge={{ text: "Nombre de la Página" }}
  title="Título Principal"
  description="Descripción breve de la página."
/>
```

### Con Icono y Colores Personalizados

```tsx
import { PageHero } from "@/components/page-hero";
import { Mail } from "lucide-react";

<PageHero
  badge={{
    text: "Disponible para nuevos proyectos",
    icon: Mail,
    gradientFrom: "from-emerald-600/20",
    gradientTo: "to-teal-600/20",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    shadowColor: "shadow-emerald-600/10",
  }}
  title="Hablemos"
  description="¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu visión."
/>
```

### Con Contenido Adicional

```tsx
<PageHero
  badge={{ text: "Blog" }}
  title="Insights & experiencias"
  description="Artículos sobre desarrollo de software..."
>
  <Suspense fallback={<Loading />}>
    <FeaturedContent />
  </Suspense>
</PageHero>
```

## Estructura Base

Todas las páginas deben seguir esta estructura base:

```tsx
"use client";

import { Suspense } from "react";
import { motion, Variants } from "framer-motion";
// ... otros imports

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ParticleHeroBackground } from "@/components/particle-hero-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { PageHero } from "@/components/page-hero";

function PageContent() {
  const { isLoading } = usePageLoading();

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleHeroBackground />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
        
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{ text: "Nombre de la Página" }}
            title="Título Principal"
            description="Descripción breve de la página."
          />

          {/* Secciones adicionales */}
          <motion.section 
            className="py-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Contenido de la sección */}
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  );
}
```

## Componentes Requeridos

### 1. PageLoadingProvider y PageLoadingOverlay

Todas las páginas deben usar el sistema de carga consistente:

```tsx
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";

function PageContent() {
  const { isLoading } = usePageLoading();
  
  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      {/* resto del contenido */}
    </>
  );
}

export default function Page() {
  return (
    <PageLoadingProvider>
      <PageContent />
    </PageLoadingProvider>
  );
}
```

### 2. ParticleHeroBackground

Todas las páginas deben incluir el fondo de partículas animado:

```tsx
import { ParticleHeroBackground } from "@/components/particle-hero-background";

<div className="min-h-screen bg-black text-white relative overflow-hidden">
  <ParticleHeroBackground />
  {/* resto del contenido */}
</div>
```

### 3. Gradient Overlay

El gradiente overlay debe ser consistente en todas las páginas:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
```

## Estructura del Hero Section

**Usa siempre el componente `PageHero`**. No crees hero sections manualmente. El componente maneja automáticamente:
- Animaciones consistentes
- Estructura y espaciado
- Responsive design
- Variantes de animación

### Props del PageHero

- `badge`: Objeto con configuración del badge
  - `text` (requerido): Texto del badge
  - `icon` (opcional): Icono de Lucide React
  - `gradientFrom` (opcional): Clase de gradiente inicial (default: `"from-blue-600/20"`)
  - `gradientTo` (opcional): Clase de gradiente final (default: `"to-purple-600/20"`)
  - `borderColor` (opcional): Clase de color del borde (default: `"border-blue-600/30"`)
  - `textColor` (opcional): Clase de color del texto (default: `"text-white"`)
  - `shadowColor` (opcional): Clase de color de la sombra (default: `"shadow-blue-600/10"`)
- `title` (requerido): Título principal
- `description` (requerido): Descripción de la página
- `children` (opcional): Contenido adicional después del hero (ej: featured content)

## Estructura del Main

El elemento `<main>` debe tener estas clases y estructura:

```tsx
<main className="relative z-10 container py-12 space-y-24" id="main-content">
  {/* Secciones con space-y-24 entre ellas */}
</main>
```

## Secciones Adicionales

Para secciones que aparecen después del hero, usa `whileInView`:

```tsx
<motion.section 
  className="py-12 space-y-8"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  {/* Contenido */}
</motion.section>
```

## Variantes de Animación

**El componente `PageHero` maneja automáticamente las animaciones**. Para secciones adicionales, usa estas variantes:

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
```

## Breadcrumbs

**IMPORTANTE**: No incluyas breadcrumbs visuales en la UI. Los breadcrumbs solo deben estar en el JSON-LD del layout para SEO:

```tsx
// ❌ NO hacer esto en page.tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// ✅ Hacer esto en layout.tsx
<BreadcrumbJsonLd
  items={[
    { name: "Inicio", url: "https://carrillo.app" },
    { name: "Página", url: "https://carrillo.app/pagina" },
  ]}
/>
```

## Colores y Gradientes

### Badge del Hero
- Clase: `bg-gradient-to-r from-blue-600/20 to-purple-600/20`
- Borde: `border-blue-600/30`
- Sombra: `shadow-lg shadow-blue-600/10`

### Título Principal
- Clase: `bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent`

### Títulos de Sección
- Clase: `bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent`

## Espaciado

- Entre secciones principales: `space-y-24`
- Padding del main: `py-12`
- Padding del hero: `py-12 md:py-24`
- Padding de secciones: `py-12`

## Ejemplos de Referencia

Páginas que siguen correctamente estos estándares:
- `app/blog/page.tsx` - Página de blog
- `app/recursos/page.tsx` - Página de recursos
- `app/contacto/page.tsx` - Página de contacto

## Checklist para Nuevas Páginas

Al crear una nueva página, verifica:

- [ ] Usa `PageLoadingProvider` y `PageLoadingOverlay`
- [ ] Incluye `ParticleHeroBackground`
- [ ] Tiene el gradiente overlay correcto
- [ ] **Usa el componente `PageHero` para el hero section**
- [ ] Main tiene `space-y-24` entre secciones
- [ ] Secciones adicionales usan `whileInView`
- [ ] No tiene breadcrumbs visuales (solo JSON-LD en layout)
- [ ] Badge, títulos y colores son consistentes (manejados por `PageHero`)
- [ ] Espaciado es consistente con otras páginas

## Notas Importantes

1. **No uses breadcrumbs visuales**: El proyecto no usa breadcrumbs en la UI, solo en JSON-LD para SEO.

2. **Consistencia de animaciones**: Todas las páginas deben usar las mismas variantes de animación para una experiencia uniforme.

3. **Fondo de partículas**: Siempre incluye `ParticleHeroBackground` para mantener la identidad visual.

4. **Sistema de carga**: Usa siempre `PageLoadingProvider` para transiciones suaves entre páginas.

5. **Espaciado**: Mantén `space-y-24` en el main para consistencia visual entre secciones.

