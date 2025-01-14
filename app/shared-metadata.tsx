import {Metadata} from "next";

export const SharedMetadata: Metadata = {
	metadataBase: new URL('https://carrillo.app'),
	title: 'José Carrillo - Te enseño sobre banking, fintech y ecommerce',
	description: 'Conviértete en experto de banking, fintech y ecommerce. Todo lo que necesitas aprender sobre pagos, banca y comercio electrónico. Acceso gratuito con recursos y asesoría gratis.',
	applicationName: 'carrillo.app',
	authors: [{name: "José Carrillo", url: "https://x.com/carrilloapps"}],
	generator: 'Next.js',
	keywords: ['banking', 'fintech', 'ecommerce', 'pagos', 'banca', 'comercio electrónico'],
	referrer: 'strict-origin-when-cross-origin',
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	creator: 'José Carrillo',
	publisher: 'CloudFlare, Inc.',
	alternates: {
		canonical: "/",
		languages: {
			'es-CO': '/',
			'en-US': '/en',
		},
		// media: {
		// 	'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
		// },
		types: {
			'application/rss+xml': [
				{ url: 'feed.xml', title: 'RSS+XML' },
				{ url: 'feed.json', title: 'RSS+JSON' },
			],
		},
	},
	icons: {
		icon: [
			{ url: '/icon.png' },
			new URL('/icon.png', 'https://carrillo.app'),
			{ url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
		],
		shortcut: ['/shortcut-icon.png'],
		apple: [
			{ url: '/apple-icon.png' },
			{ url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{
				rel: 'apple-touch-icon-precomposed',
				url: '/apple-touch-icon-precomposed.png',
			},
		],
	},
	manifest: "https://carrillo.app/manifest.json",
	openGraph: {
		type: "website",
		url: "/",
		title: "Conviértete en experto de banking, fintech y ecommerce",
		description: "Totalmente gratis y con acceso a recursos y asesoría gratis. Aprende sobre pagos, banca y comercio electrónico.",
		siteName: "José Carrillo",
		locale: 'es_CO',
		images: [
			{
				url: 'https://nextjs.org/og.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://nextjs.org/og-alt.png',
				width: 1800,
				height: 1600,
				alt: 'José Carrillo',
			},
		],
		// videos: [
		// 	{
		// 		url: 'https://nextjs.org/video.mp4',
		// 		width: 800,
		// 		height: 600,
		// 	},
		// ],
		// audio: [
		// 	{
		// 		url: 'https://nextjs.org/audio.mp3',
		// 	},
		// ],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Conviértete en experto de banking, fintech y ecommerce',
		description: 'Totalmente gratis y con acceso a recursos y asesoría gratis. Aprende sobre pagos, banca y comercio electrónico.',
		creatorId: '1467726470533754880',
		creator: '@carrilloapps',
		siteId: '1467726470533754880',
		site: '@carrilloapps',
		images: ['https://nextjs.org/og.png'],
	},
	facebook: {
		appId: "12345678",
	},
	verification: {
		google: 'google',
		yandex: 'yandex',
		yahoo: 'yahoo',
		// other: {
		// 	me: ['my-email', 'my-link'],
		// },
	},
	appleWebApp: {
		capable: true,
		title: "carrillo.app",
		statusBarStyle: "black-translucent",
		startupImage: [
			'/assets/startup/apple-touch-startup-image-768x1004.png',
			{
				url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
				media: '(device-width: 768px) and (device-height: 1024px)',
			},
		],
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	abstract: "Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.",
	// appLinks: {
	// 	ios: { app_store_id: "123456789", url: "https://example.com", app_name: "carrillo.app" },
	// 	android: { package: "123456789", url: "https://example.com", app_name: "carrillo.app", class: "com.example.MyApp" },
	// 	web: { url: "https://example.com", should_fallback: true },
	// 	windows: { app_id: "123456789", url: "https://example.com", app_name: "carrillo.app" },
	// },
	archives: 'https://carrillo.app/blog',
	assets: 'https://carrillo.app/static',
	bookmarks: 'https://carrillo.app/bookmarks',
	category: 'https://carrillo.app/category',
	classification: 'https://carrillo.app/classification',
}

export const SharedJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": [
				"Organization",
				"Person"
			],
			"@id": "https://carrillo.app/#person",
			"name": "Junior Carrillo",
			"url": "https://www.juniorcarrillo.com",
			"sameAs": [
				"https://www.facebook.com/carrillo.apps/",
				"https://twitter.com/soyjrcarrillo@gmail.com"
			],
			"email": "m@juniorcarrillo.com",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "Cl 30A #79-42",
				"addressLocality": "Medell\u00edn",
				"addressRegion": "Antioquia",
				"postalCode": "050030",
				"addressCountry": "Colombia"
			},
			"logo": {
				"@type": "ImageObject",
				"@id": "https://www.juniorcarrillo.com/#logo",
				"url": "https://www.juniorcarrillo.com/wp-content/uploads/2024/08/16759783.jpeg",
				"contentUrl": "https://www.juniorcarrillo.com/wp-content/uploads/2024/08/16759783.jpeg",
				"caption": "Junior Carrillo",
				"inLanguage": "es",
				"width": "460",
				"height": "460"
			},
			"telephone": "3003328389",
			"image": {
				"@id": "https://www.juniorcarrillo.com/#logo"
			}
		},
		{
			"@type": "WebSite",
			"@id": "https://www.juniorcarrillo.com/#website",
			"url": "https://www.juniorcarrillo.com",
			"name": "Junior Carrillo",
			"alternateName": "carrillo.app",
			"publisher": {
				"@id": "https://www.juniorcarrillo.com/#person"
			},
			"inLanguage": "es",
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://www.juniorcarrillo.com/?s={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		},
		{
			"@type": "WebPage",
			"@id": "https://www.juniorcarrillo.com/#webpage",
			"url": "https://www.juniorcarrillo.com/",
			"name": "Junior Carrillo - Desarrollador de software full stack",
			"datePublished": "2024-08-11T19:04:33-05:00",
			"dateModified": "2024-11-20T15:23:39-05:00",
			"about": {
				"@id": "https://www.juniorcarrillo.com/#person"
			},
			"isPartOf": {
				"@id": "https://www.juniorcarrillo.com/#website"
			},
			"inLanguage": "es"
		},
		{
			"@type": "Person",
			"@id": "https://www.juniorcarrillo.com/#author",
			"name": "Junior Carrillo",
			"image": {
				"@type": "ImageObject",
				"@id": "https://secure.gravatar.com/avatar/55b42e6baad3c455a1c221164ca59a11?s=96&amp;d=mm&amp;r=g",
				"url": "https://secure.gravatar.com/avatar/55b42e6baad3c455a1c221164ca59a11?s=96&amp;d=mm&amp;r=g",
				"caption": "Junior Carrillo",
				"inLanguage": "es"
			},
			"sameAs": [
				"https://www.juniorcarrillo.com",
				"https://www.facebook.com/carrillo.apps",
				"https://twitter.com/carrilloapps"
			]
		},
		{
			"@type": "Article",
			"headline": "Junior Carrillo - Desarrollador de software full stack",
			"keywords": "junior carrillo,desarrollador,full stack,desarrollador de software,desarrollador full stack",
			"datePublished": "2024-08-11T19:04:33-05:00",
			"dateModified": "2024-11-20T15:23:39-05:00",
			"author": {
				"@id": "https://www.juniorcarrillo.com/#author",
				"name": "Junior Carrillo"
			},
			"publisher": {
				"@id": "https://www.juniorcarrillo.com/#person"
			},
			"description": "Desarrollador de software full stack, actualmente SSr. Software Engineering como Developer Lead para diferentes marcas en toda Latinoam\u00e9rica.",
			"name": "Junior Carrillo - Desarrollador de software full stack",
			"@id": "https://www.juniorcarrillo.com/#richSnippet",
			"isPartOf": {
				"@id": "https://www.juniorcarrillo.com/#webpage"
			},
			"inLanguage": "es",
			"mainEntityOfPage": {
				"@id": "https://www.juniorcarrillo.com/#webpage"
			}
		}
	]
}
