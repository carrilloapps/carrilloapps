export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const { pathname } = url

    // --- ENRUTADOR ---
    if (pathname === "/podcast.xml" || pathname === "/podcast.rss" || pathname === "/podcast") {
      return handlePodcastFeed(request, ctx)
    }

    if (pathname === "/" || pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", service: "api.carrillo.app" }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
    }

    return new Response("Not Found", { status: 404 })
  },
}

/**
 * Proxy con caché en Cloudflare Edge para el podcast feed de Substack
 */
async function handlePodcastFeed(request, ctx) {
  // Clave de caché versionada para invalidar automáticamente tras cambios
  const url = new URL(request.url)
  const cacheKey = new Request(`${url.origin}${url.pathname}?v=2`, request)
  const cache = caches.default

  // 1. Verificar si está en la caché global de Cloudflare Edge
  let response = await cache.match(cacheKey)
  if (response) {
    return response
  }

  const SUBSTACK_FEED = "https://api.substack.com/feed/podcast/8955345.rss"

  try {
    const upstreamRes = await fetch(SUBSTACK_FEED, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CarrilloAppPodcastProxy/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    })

    if (!upstreamRes.ok) {
      return new Response(`Error consultando Substack: ${upstreamRes.statusText}`, {
        status: upstreamRes.status,
      })
    }

    let xml = await upstreamRes.text()

    // 2. Reemplazar el correo a m@carrillo.app (<itunes:email> y <webMaster>)
    xml = xml.replaceAll("carrilloapps@substack.com", "m@carrillo.app")

    // 3. Ajustar el self-link del feed a api.carrillo.app
    xml = xml.replaceAll(
      "https://api.substack.com/feed/podcast/8955345.rss",
      "https://api.carrillo.app/podcast.xml",
    )

    // 4. Traducir el CTA de suscripción a español manteniendo el enlace dinámico
    xml = xml.replaceAll(
      "Get full access to Junior Carrillo at blog.carrillo.app/subscribe",
      "Obtén acceso completo al PodCast (Vía La Web) de Junior Carrillo en blog.carrillo.app/subscribe",
    )
    xml = xml.replaceAll(
      "Get full access to Junior Carrillo at ",
      "Obtén acceso completo al PodCast (Vía La Web) de Junior Carrillo en ",
    )

    // 5. Agregar "Visítame en" antes del enlace al blog en la descripción del canal
    xml = xml.replaceAll(
      '<br/><br/><a href="https://blog.carrillo.app?utm_medium=podcast">blog.carrillo.app</a>',
      '<br/><br/>Visítame en <a href="https://blog.carrillo.app?utm_medium=podcast">blog.carrillo.app</a>',
    )
    xml = xml.replaceAll(
      '<br /><br /><a href="https://blog.carrillo.app?utm_medium=podcast">blog.carrillo.app</a>',
      '<br /><br />Visítame en <a href="https://blog.carrillo.app?utm_medium=podcast">blog.carrillo.app</a>',
    )

    // 6. Crear respuesta con cabeceras de caché (15 min en edge, revalidación en segundo plano)
    response = new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "X-Proxied-By": "api.carrillo.app",
      },
    })

    // Guardar en la caché Edge asíncronamente
    ctx.waitUntil(cache.put(cacheKey, response.clone()))

    return response
  } catch (error) {
    return new Response(`Error interno: ${error.message}`, { status: 502 })
  }
}
