import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
			{
				userAgent: 'Googlebot',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
			{
				userAgent: 'Bingbot',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
			{
				userAgent: 'Applebot',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
			{
				userAgent: 'Yandex',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
			{
				userAgent: 'DuckDuckBot',
				allow: ['/'],
				disallow: ['/terms', '/policy', '/cookies', '/private/'],
			},
		],
		sitemap: 'https://carrillo.app/sitemap.xml',
	};
}
