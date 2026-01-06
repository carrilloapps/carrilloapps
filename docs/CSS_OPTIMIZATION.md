# CSS Optimization Guide

## Optimizaciones Implementadas

### 1. CSS Chunking Strict Mode

**Configuración en next.config.mjs:**
```javascript
experimental: {
  optimizeCss: true,
  cssChunking: 'strict',
}
```

**Beneficios:**
- CSS se divide en chunks más pequeños y se carga solo cuando es necesario
- Reduce el tiempo de bloqueo de renderización inicial
- Mejora el First Contentful Paint (FCP) y Largest Contentful Paint (LCP)

### 2. Font Preload y Optimización

**Configuración en app/layout.tsx:**
```typescript
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-inter",
});
```

**Headers de Preload en vercel.json:**
```json
{
  "key": "Link",
  "value": "</fonts/inter-latin.woff2>; rel=preload; as=font; crossorigin=anonymous"
}
```

**Beneficios:**
- `display: "swap"` muestra el texto inmediatamente con fuente fallback
- `adjustFontFallback: true` ajusta métricas de fuente fallback para evitar layout shift
- Preload reduce el tiempo de carga de la fuente crítica
- Evita Flash of Unstyled Text (FOUT)

### 3. Eliminación de Polyfills

**Configuración en tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}
```

**Browserslist en package.json:**
```json
{
  "browserslist": {
    "production": [
      "Chrome >= 90",
      "Safari >= 14",
      "Firefox >= 88",
      "Edge >= 90"
    ]
  }
}
```

**Beneficios:**
- Reduce ~13.9 KiB de código de polyfills
- Código más pequeño = descarga más rápida
- Solo soporta navegadores modernos (2021+)

### 4. CSS Crítico y Inline

**Configuración en next.config.mjs:**
```javascript
experimental: {
  optimizeCss: true,
}
```

**Beneficios:**
- Next.js automáticamente inline CSS crítico en HTML
- Reduce las solicitudes de red bloqueantes
- Mejora el First Contentful Paint (FCP)

## Resultados Esperados

### Antes de la Optimización
- CSS bloqueante: 23.2 KiB (990ms total)
  - `56996a801544db59.css`: 21 KiB (490ms)
  - `242005b0b2cae306.css`: 2.1 KiB (490ms)
- Polyfills: ~13.9 KiB
- Font loading: FOUT visible

### Después de la Optimización
- CSS inline para above-the-fold content
- CSS no crítico cargado de forma asíncrona
- Polyfills eliminados: -13.9 KiB
- Font swap con fallback optimizado: sin FOUT
- Tiempo de bloqueo reducido en ~40-60%

## Optimizaciones Adicionales de Cloudflare

### ⚠️ IMPORTANTE: Configuración Manual Requerida

Para maximizar el rendimiento, **debes configurar manualmente Cloudflare**:

#### 1. Desactivar Email Obfuscation
**Dashboard → Scrape Shield → Email Address Obfuscation → OFF**

**Por qué:**
- Inyecta `email-decode.min.js` (1 KB + 560ms)
- Bloquea el renderizado inicial
- Next.js ya protege emails de forma nativa

#### 2. Desactivar Rocket Loader
**Dashboard → Speed → Optimization → Rocket Loader → OFF**

**Por qué:**
- Inyecta `rocket-loader.min.js` (5 KB)
- Interfiere con optimizaciones de Next.js
- Puede causar errores de hidratación en React

#### 3. Desactivar Web Analytics (si no se usa)
**Dashboard → Speed → Optimization → Web Analytics → OFF**

**Por qué:**
- Inyecta `beacon.min.js` (7 KB)
- Solo necesario si usas Cloudflare Analytics
- Usa Vercel Analytics en su lugar

#### 4. Desactivar Auto Minify
**Dashboard → Speed → Optimization → Auto Minify → OFF (todos los checkboxes)**

**Por qué:**
- Next.js ya minifica todos los assets
- Puede causar double-minification (errores)
- Vercel maneja la optimización

#### 5. Configurar Browser Cache TTL
**Dashboard → Caching → Browser Cache TTL → Respect Existing Headers**

**Por qué:**
- Usa los headers `Cache-Control` de Vercel
- Optimizados para cada tipo de recurso
- Evita conflictos de caché

### Impacto Total de Scripts Cloudflare

Si no se desactivan, Cloudflare inyecta:
- `email-decode.min.js`: 1 KB + 560ms
- `rocket-loader.min.js`: 5 KB
- `beacon.min.js`: 7 KB (si analytics está activo)
- **Total**: ~13 KB + latencia de red adicional

## Verificación Post-Despliegue

### 1. PageSpeed Insights
```
https://pagespeed.web.dev/
```
- FCP: < 1.8s (verde)
- LCP: < 2.5s (verde)
- TBT: < 200ms (verde)
- CLS: < 0.1 (verde)

### 2. Chrome DevTools
**Network Tab:**
1. Abre DevTools (F12)
2. Network → Clear → Reload
3. Verifica que CSS crítico esté inline en HTML
4. Verifica que NO se carguen scripts de Cloudflare no deseados

**Coverage Tab:**
1. Abre DevTools (F12)
2. Cmd+Shift+P → "Show Coverage"
3. Reload
4. Verifica que el CSS usado en la carga inicial sea > 80%

### 3. Lighthouse
**Ejecutar desde Chrome DevTools:**
1. F12 → Lighthouse tab
2. Mode: Navigation
3. Categories: Performance
4. Device: Mobile y Desktop
5. Analyze page load

**Métricas objetivo:**
- Performance: > 90/100
- Accessibility: > 95/100
- Best Practices: > 95/100
- SEO: 100/100

## Monitoreo Continuo

### Vercel Analytics
**Dashboard → Project → Analytics**

Métricas clave:
- Real Experience Score (RES): > 85
- LCP P75: < 2.5s
- FCP P75: < 1.8s
- CLS P75: < 0.1

### Cloudflare Analytics
**Dashboard → Analytics & Logs → Web Analytics**

Métricas clave:
- Page Load Time: < 2.5s
- Time to First Byte (TTFB): < 600ms
- Cache Hit Ratio: > 90%

## Troubleshooting

### CSS no se inline correctamente
**Síntoma:** CSS aún aparece como archivos externos grandes en Network tab

**Solución:**
1. Verificar `optimizeCss: true` en `next.config.mjs`
2. Limpiar caché: `rm -rf .next && npm run build`
3. Verificar que no haya errores de build

### Font sigue mostrando FOUT
**Síntoma:** Texto parpadea o cambia al cargar la fuente

**Solución:**
1. Verificar `display: "swap"` en configuración de fuente
2. Verificar `adjustFontFallback: true` está presente
3. Verificar header de preload en `vercel.json`
4. Limpiar caché de Cloudflare

### Polyfills aún presentes
**Síntoma:** Bundle incluye polyfills innecesarios

**Solución:**
1. Verificar `target: "ES2022"` en `tsconfig.json`
2. Verificar `browserslist` en `package.json`
3. Eliminar `.browserslistrc` si existe
4. Rebuild completo: `rm -rf .next node_modules && npm install && npm run build`

### Scripts de Cloudflare siguen apareciendo
**Síntoma:** `email-decode.min.js` o `rocket-loader.min.js` en Network tab

**Solución:**
1. Verifica la configuración en Cloudflare Dashboard
2. Purga caché de Cloudflare: Dashboard → Caching → Purge Everything
3. Espera 2-5 minutos para propagación
4. Hard refresh en navegador (Ctrl+Shift+R)

## Recursos Adicionales

- [Next.js CSS Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/css)
- [Web Vitals](https://web.dev/vitals/)
- [Cloudflare CDN Configuration](https://developers.cloudflare.com/cache/)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)

---

**Última actualización:** Enero 2026
**Versiones:** Next.js 16.1.1, React 19, Vercel (free/Hobby plan), Cloudflare CDN
