// Service Worker para mejorar el rendimiento y SEO
const CACHE_NAME = 'carrillo-app'
const STATIC_ASSETS = [
  '/',
  '/blog',
  '/servicios',
  '/sobre-mi',
  '/contacto',
  '/recursos',
  '/manifest.json',
  '/placeholder-logo.svg',
  '/placeholder-logo.png',
]

// Instalar el service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
  )
})

// Activar el service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Interceptar requests
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') {
    return
  }

  // Estrategia cache-first para assets estáticos
  if (event.request.url.includes('/static/') || 
      event.request.url.includes('/_next/') ||
      event.request.url.includes('.css') ||
      event.request.url.includes('.js') ||
      event.request.url.includes('.png') ||
      event.request.url.includes('.jpg') ||
      event.request.url.includes('.svg')) {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
        })
    )
    return
  }

  // Estrategia network-first para contenido dinámico
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta antes de cachearla
        const responseClone = response.clone()
        
        // Solo cachear respuestas exitosas
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone)
            })
        }
        
        return response
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        return caches.match(event.request)
      })
  )
})