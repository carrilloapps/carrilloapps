import { getBlogPosts } from "@/app/blog/blogData";

const DOMAIN = "https://carrillo.com";

const feed = {
	title: 'José Carrillo',
	description: 'Conviértete en experto de banking, fintech y ecommerce',
	site_url: DOMAIN,
	feed_url: `${DOMAIN}/feed.json`,
	copyright: `José Carrillo &copy; ${new Date().getFullYear()}`,
	language: 'es',
	pubDate: new Date(2025, 0, 14, 12, 0, 0),
	generator: 'Next.js',
	image_url: `${DOMAIN}/favicon.ico`,
	docs: 'https://validator.w3.org/feed/docs/json.html',
	managingEditor: 'José Carrillo, <junior@carrillo.app>',
	webMaster: 'José Carrillo, <junior@carrillo.app>',
	categories: ['Web Development', 'JavaScript', 'React', 'Next.js'],
	ttl: 60,
	hub: 'https://pubsubhubbub.appspot.com/',
};

export async function GET() {
	const blogPosts = await getBlogPosts();

	blogPosts.map((post) => {
		feed.item.push({
			title: post.title.rendered,
			guid: `${DOMAIN}/blog/${post.slug}`,
			url: `${DOMAIN}/blog/${post.slug}`,
			date: new Date(post.date),
			description: post.excerpt,
			author: post.author,
			categories: post.categories,
		});
	});

	return new Response(JSON.stringify(feed), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}
