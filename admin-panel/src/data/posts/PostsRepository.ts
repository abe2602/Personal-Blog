import { apiClient } from "../RestApi";
import type { ApiPost } from "./model/ApiPost";

interface PostsListing {
  postsList: ApiPost[];
  total: number;
}

export async function getPosts(
  page: number = 1,
  limit: number = 10,
  searchQuery: string = ""
): Promise<{ posts: ApiPost[]; total: number }> {
  const response = await apiClient.get<PostsListing>("posts", {
    params: { limit, page, searchQuery },
  });

  console.log(response)

  const posts = response.data?.postsList ?? [];
  const total = response.data?.total ?? 0;
  return { posts, total };
}

export async function getPost(id: number): Promise<ApiPost> {
  const response = await apiClient.get<ApiPost>(`post/${id}`);
  return response.data;
}

export async function createPost(post: ApiPost): Promise<ApiPost> {
  const response = await apiClient.post<ApiPost>("post", post);
  return response.data;
}

export async function updatePost(id: number, post: Partial<ApiPost>): Promise<ApiPost> {
  const response = await apiClient.patch<ApiPost>(`post`, post);
  return response.data;
}

export async function deletePost(id: number): Promise<void> {
  await apiClient.delete(`post/${id}`);
}
