# Disqus Troubleshooting Guide

## Verificación de Configuración de Disqus

### 1. Verificar el Shortname

El shortname es el identificador único de tu sitio en Disqus. Para verificarlo:

1. Ve a [https://disqus.com/admin/](https://disqus.com/admin/)
2. Haz clic en tu sitio
3. Ve a **Settings** → **General**
4. Busca el campo **Shortname** (debe ser algo como `juniorcarrillo`, `carrillo-app`, etc.)

### 2. Verificar la Configuración del Sitio en Disqus

Asegúrate de que tu sitio esté configurado correctamente en Disqus:

1. En [https://disqus.com/admin/](https://disqus.com/admin/), selecciona tu sitio
2. Ve a **Settings** → **General**
3. Verifica:
   - **Website Name**: Nombre de tu sitio
   - **Website URL**: Debe ser `https://carrillo.app` (sin trailing slash)
   - **Category**: Selecciona una categoría apropiada

### 3. Verificar Trusted Domains

1. En Disqus Admin, ve a **Settings** → **Advanced**
2. En **Trusted Domains**, agrega:
   ```
   carrillo.app
   localhost
   ```
3. Guarda los cambios

### 4. Verificar la Variable de Entorno

En tu archivo `.env.local`, verifica que tengas:

```env
NEXT_PUBLIC_DISQUS_SHORTNAME=juniorcarrillo
```

**IMPORTANTE**: Después de cambiar cualquier variable de entorno, debes:
1. Detener el servidor de desarrollo (`Ctrl+C`)
2. Reiniciar con `npm run dev`

### 5. Problemas Comunes

#### Error: "We were unable to load Disqus"

**Causas posibles:**
- El shortname es incorrecto
- El dominio no está en la lista de Trusted Domains
- El navegador está bloqueando scripts de terceros
- Ad blockers o extensiones de privacidad están bloqueando Disqus

**Soluciones:**
1. Verifica el shortname en Disqus Admin
2. Agrega el dominio a Trusted Domains
3. Desactiva temporalmente ad blockers
4. Prueba en modo incógnito

#### Error: "Error loading Disqus script"

**Causas posibles:**
- Problemas de conectividad
- Firewall o antivirus bloqueando Disqus
- DNS no resuelve correctamente disqus.com

**Soluciones:**
1. Verifica tu conexión a internet
2. Intenta acceder a `https://disqus.com` directamente
3. Desactiva temporalmente firewall/antivirus
4. Prueba con otro navegador

#### Los comentarios no aparecen en localhost

**Solución:**
Agrega `localhost` a los Trusted Domains en Disqus Admin.

### 6. Verificar en la Consola del Navegador

Abre las DevTools (F12) y ve a la pestaña Console. Busca mensajes como:

```
Disqus script loaded successfully
```

O errores como:

```
Error loading Disqus script
Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
```

### 7. Comandos de Verificación

```bash
# Verificar variables de entorno
npm run dev

# En otra terminal, verificar que el sitio cargue
curl http://localhost:3000/blog/[slug]

# Verificar que el script de Disqus sea accesible
curl https://juniorcarrillo.disqus.com/embed.js
```

### 8. Alternativa: Crear un Nuevo Sitio en Disqus

Si después de todo sigue sin funcionar:

1. Ve a [https://disqus.com/admin/create/](https://disqus.com/admin/create/)
2. Crea un nuevo sitio con un nuevo shortname
3. Actualiza el `.env.local` con el nuevo shortname
4. Reinicia el servidor

### 9. Configuración de Disqus API (Opcional)

Para funcionalidades avanzadas como conteo de comentarios desde el servidor:

1. Ve a [https://disqus.com/api/applications/](https://disqus.com/api/applications/)
2. Crea una nueva aplicación
3. Obtén las credenciales:
   - API Key
   - API Secret
   - Access Token

4. Agrégalas a `.env.local`:
```env
DISQUS_API_KEY=tu_api_key
DISQUS_API_SECRET=tu_api_secret
DISQUS_ACCESS_TOKEN=tu_access_token
```

### 10. Información de Depuración

El componente ahora muestra información útil cuando hay un error:
- **Shortname**: El shortname configurado
- **URL**: La URL que Disqus está intentando usar
- **Detalles**: Mensaje de error específico

Esta información te ayudará a identificar el problema exacto.

## Soporte

Si después de seguir estos pasos aún tienes problemas:

1. Revisa la [documentación oficial de Disqus](https://help.disqus.com/)
2. Contacta al [soporte de Disqus](https://disqus.com/support/)
3. Verifica que tu plan de Disqus incluya comentarios para tu sitio

## Checklist Rápido

- [ ] Shortname correcto en `.env.local`
- [ ] Dominio agregado a Trusted Domains en Disqus
- [ ] Servidor reiniciado después de cambiar variables de entorno
- [ ] Ad blockers desactivados para prueba
- [ ] Console del navegador sin errores de bloqueo
- [ ] URL del sitio correcta en configuración de Disqus
- [ ] Sitio activo en Disqus Admin

---

**Última actualización**: Enero 2026
