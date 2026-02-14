import { apiClient } from "../RestApi";
import type { ApiPost } from "./model/ApiPost";

export async function createPost(post: ApiPost): Promise<ApiPost> {
  const response = await apiClient.post<ApiPost>("posts", post);
  return response.data;
}
