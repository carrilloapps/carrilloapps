# Configuración de Disqus

Este documento explica cómo configurar Disqus para habilitar comentarios en el blog.

## Variables de Entorno Requeridas

### Variables Públicas (Requeridas)

```env
# Shortname de tu sitio en Disqus
NEXT_PUBLIC_DISQUS_SHORTNAME=tu-shortname-aqui

# URL base de tu sitio
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Variables Opcionales (Para funcionalidades avanzadas)

```env
# API Key de Disqus (para obtener estadísticas de comentarios)
DISQUS_API_KEY=tu-api-key-aqui

# API Secret de Disqus
DISQUS_API_SECRET=tu-api-secret-aqui

# Access Token de Disqus
DISQUS_ACCESS_TOKEN=tu-access-token-aqui
```

## Configuración Paso a Paso

### 1. Crear una cuenta en Disqus

1. Ve a [https://disqus.com/](https://disqus.com/)
2. Crea una cuenta o inicia sesión
3. Haz clic en "Get Started"
4. Selecciona "I want to install Disqus on my site"

### 2. Configurar tu sitio

1. Ingresa el nombre de tu sitio web
2. Elige una categoría
3. Selecciona un plan (puedes empezar con el plan gratuito)
4. **Importante**: Anota el "shortname" que se genera automáticamente

### 3. Configurar las variables de entorno

1. Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y actualiza las variables:
   ```env
   NEXT_PUBLIC_DISQUS_SHORTNAME=tu-shortname-de-disqus
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
   ```

### 4. Configuración avanzada (Opcional)

Para obtener estadísticas de comentarios y funcionalidades avanzadas:

1. Ve a [https://disqus.com/api/applications/](https://disqus.com/api/applications/)
2. Crea una nueva aplicación
3. Obtén tu API Key, API Secret y Access Token
4. Agrega estas variables a tu `.env.local`

### 5. Configuración de dominio en Disqus

1. Ve a tu panel de administración de Disqus
2. Navega a Settings > General
3. En "Website URL", ingresa tu dominio: `https://tu-dominio.com`
4. En "Trusted Domains", agrega:
   - `tu-dominio.com`
   - `localhost` (para desarrollo)

## Características del Componente

El componente `DisqusComments` incluye:

- ✅ **Carga automática**: Se carga automáticamente cuando es necesario
- ✅ **Estados de carga**: Muestra un skeleton mientras carga
- ✅ **Manejo de errores**: Muestra mensajes de error si algo falla
- ✅ **Contador de comentarios**: Muestra el número de comentarios
- ✅ **Configuración por variables de entorno**: Fácil configuración
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Animaciones**: Incluye animaciones suaves con Framer Motion
- ✅ **Tema oscuro**: Diseñado para el tema oscuro del sitio

## Solución de Problemas

### Los comentarios no aparecen

1. Verifica que `NEXT_PUBLIC_DISQUS_SHORTNAME` esté configurado correctamente
2. Asegúrate de que el dominio esté configurado en Disqus
3. Revisa la consola del navegador para errores

### Error de dominio no confiable

1. Ve a tu panel de Disqus
2. Agrega tu dominio a "Trusted Domains"
3. Incluye tanto `tu-dominio.com` como `localhost`

### Los comentarios no se sincronizan entre páginas

Esto es normal. Cada página tiene su propio hilo de comentarios basado en el `identifier` único.

## Desarrollo Local

Para desarrollo local, asegúrate de:

1. Tener `localhost` en los dominios confiables de Disqus
2. Usar `NEXT_PUBLIC_SITE_URL=http://localhost:3000` en desarrollo
3. Reiniciar el servidor de desarrollo después de cambiar variables de entorno

## Producción

Para producción:

1. Actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio real
2. Configura las variables de entorno en tu plataforma de hosting
3. Verifica que el dominio esté configurado correctamente en Disqus

## Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación oficial de Disqus](https://help.disqus.com/)
2. Verifica la configuración en el panel de administración de Disqus
3. Revisa los logs del navegador para errores específicos