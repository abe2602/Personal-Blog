import { apiClient } from "../RestApi";
import { RemotePost, PostsListing } from "./model/RemotePost";
import { Post } from "../../domain/model/Post";

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<{ posts: Post[]; total: number }> => {
  console.log(search)
  const response = await apiClient.get<PostsListing>("posts", {
    params: { limit: limit, page: page, searchQuery: search },
  });
  const posts = response.data.postsList.map((remotePost: RemotePost) => {
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(remotePost.creationDate),
      remotePost.imageUrl,
      remotePost.id
    );
  });
  return {
    posts,
    total: response.data.total,
  };
};

export const getFavoriteMediaPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> => {
  const response = await apiClient.get<PostsListing>("favorites", {
    params: { limit: limit, page: page },
  });
  const posts = response.data.postsList.map((remotePost: RemotePost) => {
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(remotePost.creationDate),
      remotePost.imageUrl,
      remotePost.id
    );
  });
  return {
    posts,
    total: response.data.total,
  };
};

export const getArtPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> => {
  const response = await apiClient.get<PostsListing>("gallery", {
    params: { limit: limit, page: page },
  });

  const posts = response.data.postsList.map((remotePost: RemotePost) => {
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(remotePost.creationDate),
      remotePost.imageUrl,
      remotePost.id
    );
  });
  return {
    posts,
    total: response.data.total,
  };
};

export const getThoughtsPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> => {
  const response = await apiClient.get<PostsListing>("thoughts", {
    params: { limit: limit, page: page },
  });

  const posts = response.data.postsList.map((remotePost: RemotePost) => {
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(remotePost.creationDate),
      remotePost.imageUrl,
      remotePost.id,
      (remotePost.recommendedPosts || []).map((recPost) =>
        new Post(
          recPost.title,
          recPost.body,
          new Date(recPost.creationDate),
          recPost.imageUrl,
          recPost.id
        )
      )
    );
  });

  return {
    posts,
    total: response.data.total,
  };
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[] | { postsList: RemotePost[] }>("posts/search", {
    params: { q: query },
  });
  const list = Array.isArray(response.data)
    ? response.data
    : (response.data as { postsList: RemotePost[] })?.postsList ?? [];
  return list.map((remotePost: RemotePost) => {
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(remotePost.creationDate),
      remotePost.imageUrl,
      remotePost.id
    );
  });
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<RemotePost>(`post/${id}`);
  const remotePost = response.data;
  const post = new Post(
    remotePost.title,
    remotePost.body,
    new Date(remotePost.creationDate),
    remotePost.imageUrl,
    remotePost.id,
    (remotePost.recommendedPosts || []).map((recPost) =>
      new Post(
        recPost.title,
        recPost.body,
        new Date(recPost.creationDate),
        recPost.imageUrl,
        recPost.id
      )
    )
  );
  return post;
};
