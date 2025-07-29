# Hook useDisqusComments

Este hook personalizado se conecta a Disqus para obtener el número de comentarios de un artículo específico.

## Características

- ✅ **Múltiples métodos de obtención**: Utiliza diferentes estrategias para obtener el conteo más preciso
- ✅ **Estado de carga**: Proporciona información sobre el estado de carga
- ✅ **Manejo de errores**: Incluye manejo robusto de errores
- ✅ **Fallbacks**: Si un método falla, intenta con otros métodos
- ✅ **Optimización**: Evita cargar scripts duplicados
- ✅ **TypeScript**: Completamente tipado

## Uso Básico

### Hook Completo

```tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const { count, isLoading, error } = useDisqusComments(articleSlug)

  if (isLoading) {
    return <span>Cargando comentarios...</span>
  }

  if (error) {
    return <span>Error: {error}</span>
  }

  return (
    <span>
      {count} {count === 1 ? 'comentario' : 'comentarios'}
    </span>
  )
}
```

### Hook Simplificado

```tsx
import { useCommentCount } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const commentCount = useCommentCount(articleSlug)

  return (
    <span>
      {commentCount} {commentCount === 1 ? 'comentario' : 'comentarios'}
    </span>
  )
}
```

## API

### useDisqusComments(identifier: string)

Retorna un objeto con:

- `count: number` - Número de comentarios (default: 0)
- `isLoading: boolean` - Estado de carga
- `error: string | null` - Mensaje de error si ocurre algún problema

### useCommentCount(identifier: string)

Retorna directamente el número de comentarios como `number`.

## Métodos de Obtención

El hook utiliza múltiples métodos para obtener el conteo de comentarios:

1. **Verificación de Disqus cargado**: Verifica si Disqus ya está cargado en la página
2. **Script count.js**: Carga el script oficial de Disqus para conteo
3. **Elementos existentes**: Busca elementos existentes con el conteo
4. **Elemento temporal**: Crea un elemento temporal para que Disqus lo procese

## Configuración Requerida

Asegúrate de tener configuradas las siguientes variables de entorno:

```env
NEXT_PUBLIC_DISQUS_SHORTNAME=tu-shortname-de-disqus
```

## Ejemplo de Implementación

```tsx
// components/blog-article.tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments"

export function BlogArticle({ slug }: { slug: string }) {
  const { count: commentCount, isLoading: commentLoading } = useDisqusComments(slug)

  return (
    <div className="article-stats">
      <div className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        <span>
          {commentLoading ? (
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-400 rounded animate-pulse"></span>
              comentarios
            </span>
          ) : (
            `${commentCount} ${commentCount === 1 ? 'comentario' : 'comentarios'}`
          )}
        </span>
      </div>
    </div>
  )
}
```

## Consideraciones

- El hook es optimista y no bloquea la UI si no puede obtener el conteo
- Utiliza timeouts para evitar cargas infinitas
- Es compatible con SSR (Server-Side Rendering)
- Se limpia automáticamente cuando el componente se desmonta
- Maneja múltiples instancias del mismo identificador

## Solución de Problemas

### El conteo siempre es 0

1. Verifica que `NEXT_PUBLIC_DISQUS_SHORTNAME` esté configurado
2. Asegúrate de que el dominio esté en los "Trusted Domains" de Disqus
3. Verifica que el artículo tenga comentarios en Disqus

### El hook no carga

1. Revisa la consola del navegador para errores
2. Verifica la conectividad a internet
3. Asegúrate de que Disqus no esté bloqueado por ad-blockers

### Rendimiento

El hook está optimizado para:
- Evitar cargas duplicadas de scripts
- Usar timeouts razonables
- Limpiar recursos automáticamente
- Manejar múltiples instancias eficientemente