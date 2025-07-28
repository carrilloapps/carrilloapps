# Vercel Deployment Guide

Este documento explica cómo configurar correctamente las variables de entorno para el despliegue en Vercel.

## Variables de Entorno en Vercel

### Configuración en el Dashboard de Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a **Settings** > **Environment Variables**
3. Configura las siguientes variables:

#### Variables Públicas (NEXT_PUBLIC_*)

Estas variables son expuestas al navegador y se incluyen en el bundle de JavaScript:

```
NEXT_PUBLIC_SITE_URL=https://carrillo.app
NEXT_PUBLIC_BASE_URL=https://carrillo.app
NEXT_PUBLIC_DISQUS_SHORTNAME=carrilloapps
```

#### Variables Privadas (Solo servidor)

Estas variables solo están disponibles en el servidor:

```
DISQUS_API_KEY=your_disqus_api_key_here
DISQUS_API_SECRET=your_disqus_api_secret_here
DISQUS_ACCESS_TOKEN=your_disqus_access_token_here
```

### Configuración por Entorno

Vercel permite configurar variables específicas para cada entorno:

- **Development**: Para `vercel dev` y desarrollo local
- **Preview**: Para deployments de preview (branches)
- **Production**: Para el deployment de producción

#### Configuración Recomendada:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://carrilloapps-git-[branch].vercel.app` | `https://carrillo.app` |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | `carrilloapps` | `carrilloapps` | `carrilloapps` |

## Variables Automáticas de Vercel

Vercel proporciona automáticamente estas variables:

- `VERCEL=1`: Indica que el código se ejecuta en Vercel
- `VERCEL_URL`: URL del deployment actual
- `VERCEL_ENV`: Entorno actual (development, preview, production)
- `VERCEL_REGION`: Región donde se ejecuta el código

### Uso en el Código

```typescript
// Detectar si estamos en Vercel
const isVercel = process.env.VERCEL === '1'

// Obtener la URL del deployment
const deploymentUrl = process.env.VERCEL_URL

// Obtener el entorno actual
const environment = process.env.VERCEL_ENV

// Usar la URL correcta según el entorno
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
```

## Mejores Prácticas

### 1. Prefijos Correctos

- ✅ `NEXT_PUBLIC_*`: Variables expuestas al navegador
- ✅ Sin prefijo: Variables solo del servidor
- ❌ No uses `REACT_APP_*` (es para Create React App)

### 2. Seguridad

- ✅ Nunca pongas secrets en variables `NEXT_PUBLIC_*`
- ✅ Usa variables privadas para API keys y tokens
- ✅ Configura variables en Vercel Dashboard, no en archivos `.env`

### 3. URLs Dinámicas

```typescript
// ✅ Buena práctica: URL dinámica según entorno
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  return 'http://localhost:3000'
}

// ❌ Mala práctica: URL hardcodeada
const baseUrl = 'https://carrillo.app'
```

### 4. Validación de Variables

```typescript
// utils/env.ts
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || 'carrilloapps',
  DISQUS_API_KEY: process.env.DISQUS_API_KEY,
} as const

// Validar variables requeridas
if (!env.NEXT_PUBLIC_DISQUS_SHORTNAME) {
  throw new Error('NEXT_PUBLIC_DISQUS_SHORTNAME is required')
}
```

## Comandos de Vercel CLI

### Sincronizar Variables Locales

```bash
# Descargar variables de entorno de Vercel
vercel env pull .env.local

# Listar variables de entorno
vercel env ls

# Agregar una nueva variable
vercel env add VARIABLE_NAME

# Remover una variable
vercel env rm VARIABLE_NAME
```

### Desarrollo Local

```bash
# Usar variables de Vercel en desarrollo local
vercel dev

# O usar Next.js con variables locales
npm run dev
```

## Troubleshooting

### Variables no se actualizan

1. Verifica que la variable esté configurada en el entorno correcto
2. Redeploy el proyecto después de cambiar variables
3. Para variables `NEXT_PUBLIC_*`, necesitas rebuild

### Variables undefined en el cliente

1. Verifica que tengan el prefijo `NEXT_PUBLIC_`
2. Reinicia el servidor de desarrollo
3. Verifica que no haya typos en el nombre

### Variables no disponibles en Edge Runtime

- Las variables `.env*` no están disponibles en Edge Runtime
- Configura todas las variables en Vercel Dashboard
- Usa variables con prefijo `NEXT_PUBLIC_` para el cliente

## Recursos

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel CLI](https://vercel.com/docs/cli)