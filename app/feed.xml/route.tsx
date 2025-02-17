import RSS from "rss"
import { getBlogPosts } from "@/app/blog/blogData";

const DOMAIN = "https://carrillo.com";

const feed = new RSS({
	title: 'José Carrillo',
	description: 'Conviértete en experto de banking, fintech y ecommerce',
	site_url: DOMAIN,
	feed_url: `${DOMAIN}/feed.xml`,
	copyright: `José Carrillo &copy; ${new Date().getFullYear()}`,
	language: 'es',
	pubDate: new Date(2025, 0, 14, 12, 0, 0),
	generator: 'Next.js',
	image_url: `${DOMAIN}/favicon.ico`,
	docs: 'https://validator.w3.org/feed/docs/rss2.html',
	managingEditor: 'José Carrillo, <junior@carrillo.app>',
	webMaster: 'José Carrillo, <junior@carrillo.app>',
	categories: ['Web Development', 'JavaScript', 'React', 'Next.js'],
	ttl: 60,
	hub: 'https://pubsubhubbub.appspot.com/',
});

export async function GET() {
	const blogPosts = await getBlogPosts();

	blogPosts.map((post) => {
		feed.item({
			title: post.title.rendered,
			guid: `${DOMAIN}/blog/${post.slug}`,
			url: `${DOMAIN}/blog/${post.slug}`,
			date: new Date(post.date),
			description: post.yoast_head_json.description,
			author: post.author_meta.display_name,
			categories: post.categories as unknown as Array<string>,
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8',
		},
	});
}
