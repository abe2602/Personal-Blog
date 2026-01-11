import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../RestApi";
import { RemotePost } from "../model/RemotePost";
import { Post } from "../../domain/model/Post";

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("posts");
  console.log(response)
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost)
    return new Post(remotePost.title, remotePost.body, new Date(), remotePost.imageUrl);
  });
};


export const getFavoriteMediaPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("favorites");
  console.log(response)
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost)
    return new Post(remotePost.title, remotePost.body, new Date(), remotePost.imageUrl);
  });
};


export const getArtPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("gallery");
  console.log(response)
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost)
    return new Post(remotePost.title, remotePost.body, new Date(), remotePost.imageUrl);
  });
};


export const getThoughtsPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("thoughts");
  console.log(response)
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost)
    return new Post(remotePost.title, remotePost.body, new Date(), remotePost.imageUrl);
  });
};

const _fetchPostById = async (id: number): Promise<RemotePost> => {
  const response = await apiClient.get<RemotePost>(`/${id}`);
  return response.data;
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => _fetchPostById(id),
    enabled: !!id,
  });
};
