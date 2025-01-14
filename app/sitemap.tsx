import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const DOMAIN = 'https://carrillo.app'
	return [
		{
			url: `${DOMAIN}/`,
			lastModified: new Date(2025, 0, 14, 10, 0, 0),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${DOMAIN}/conoceme`,
			lastModified: new Date(2025, 0, 14, 11, 0, 0),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${DOMAIN}/blog`,
			lastModified: new Date(2025, 0, 14, 11, 11, 0),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
	]
}
