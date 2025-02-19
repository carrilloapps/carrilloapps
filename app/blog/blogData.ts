import { Posts, Post } from "@/types/post";
import apiClient from "@/api/wp";

export async function getBlogPosts(): Promise<Posts> {
  const blogPosts = await apiClient.get<Posts>("/wp/v2/posts");
  return await blogPosts.data;
}

export async function getBlogPost(slug: string): Promise<Post> {
  const blogPosts = await apiClient.get<Posts>(`/wp/v2/posts?slug=${slug}`);
  return await blogPosts.data[0];
}