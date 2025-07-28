# Solución de Problemas: Disqus en Vercel

## Problema Identificado

Disqus funciona en desarrollo local pero no en Vercel. Este es un problema común con varias causas posibles.

## Causas Más Comunes

### 1. Variables de Entorno No Configuradas en Vercel

**Síntoma**: Los comentarios no aparecen en producción
**Solución**:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las siguientes variables:

```env
# Para todos los entornos (Development, Preview, Production)
NEXT_PUBLIC_DISQUS_SHORTNAME=carrilloapps

# Diferentes valores según el entorno:
# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Preview
NEXT_PUBLIC_SITE_URL=https://carrilloapps-git-[branch].vercel.app

# Production
NEXT_PUBLIC_SITE_URL=https://carrillo.app
```

### 2. Dominio No Configurado en Disqus

**Síntoma**: Error "We were unable to load Disqus"
**Solución**:
1. Ve a [Disqus Admin](https://disqus.com/admin/)
2. Selecciona tu sitio
3. Settings → General
4. En "Website URL": `https://carrillo.app`
5. En "Trusted Domains", agrega:
   - `carrillo.app`
   - `carrilloapps.vercel.app`
   - `*.vercel.app` (para previews)
   - `localhost` (para desarrollo)

### 3. URL Incorrecta Pasada a Disqus

**Síntoma**: Comentarios no se cargan o aparecen en sitio incorrecto
**Solución**: Verificar que la URL generada sea correcta

```typescript
// En el componente DisqusComments
const siteUrl = getSiteUrl() // Debe retornar la URL correcta
const fullUrl = `${siteUrl}/blog/${slug}` // URL completa del artículo
```

### 4. Configuración de CSP (Content Security Policy)

**Síntoma**: Scripts de Disqus bloqueados
**Solución**: Agregar a `next.config.mjs`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.disqus.com *.disquscdn.com; frame-src 'self' disqus.com *.disqus.com;"
          }
        ]
      }
    ]
  }
}
```

### 5. Problemas con Edge Runtime

**Síntoma**: Variables de entorno no disponibles en Edge
**Solución**: Asegurar que las variables públicas estén correctamente prefijadas:

```typescript
// ✅ Correcto - disponible en Edge Runtime
process.env.NEXT_PUBLIC_DISQUS_SHORTNAME

// ❌ Incorrecto - no disponible en Edge Runtime
process.env.DISQUS_SHORTNAME
```

## Pasos de Diagnóstico

### 1. Verificar Variables de Entorno

```bash
# En local
vercel env pull .env.local

# Verificar que las variables estén disponibles
vercel env ls
```

### 2. Verificar Configuración de Disqus

1. Ve a tu panel de Disqus
2. Verifica que el shortname sea correcto
3. Confirma que los dominios estén configurados
4. Revisa que no haya restricciones de país/región

### 3. Verificar en Consola del Navegador

Abre las herramientas de desarrollador y busca:
- Errores de CORS
- Scripts bloqueados
- Errores de configuración de Disqus

### 4. Probar en Diferentes Entornos

- ✅ Local: `http://localhost:3000`
- ✅ Preview: `https://carrilloapps-git-[branch].vercel.app`
- ❌ Production: `https://carrillo.app`

## Configuración Recomendada para Vercel

### Variables de Entorno por Entorno

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | `carrilloapps` | `carrilloapps` | `carrilloapps` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://carrilloapps-git-main.vercel.app` | `https://carrillo.app` |

### Configuración en Disqus

**Website URL**: `https://carrillo.app`

**Trusted Domains**:
```
carrillo.app
carrilloapps.vercel.app
*.vercel.app
localhost
```

## Comandos Útiles

```bash
# Sincronizar variables de Vercel
vercel env pull .env.local

# Ejecutar en modo Vercel localmente
vercel dev

# Ver logs de deployment
vercel logs [deployment-url]

# Verificar variables en runtime
vercel env ls --environment=production
```

## Verificación Final

1. **Variables configuradas en Vercel** ✅
2. **Dominios configurados en Disqus** ✅
3. **URLs correctas generadas** ✅
4. **Sin errores en consola** ✅
5. **Funciona en preview** ✅
6. **Funciona en producción** ✅

## Contacto para Soporte

Si el problema persiste después de seguir estos pasos:
1. Revisa los logs de Vercel
2. Verifica la configuración en Disqus Admin
3. Contacta al soporte de Disqus si es necesario

---

**Nota**: Este documento se actualizará según se identifiquen nuevos problemas o soluciones.