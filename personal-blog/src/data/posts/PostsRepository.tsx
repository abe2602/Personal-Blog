import { apiClient } from "../RestApi";
import { RemotePost, PostsListing } from "./model/RemotePost";
import { Post } from "../../domain/model/Post";

export const getPosts = async (): Promise<{ posts: Post[]; total: number }> => {
  const response = await apiClient.get<PostsListing>("posts");
  console.log(response);
  const posts = response.data.postList.map((remotePost: RemotePost) => {
    console.log(remotePost);
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(),
      remotePost.imageUrl,
      remotePost.id
    );
  });
  return {
    posts,
    total: response.data.total,
  };
};

export const getFavoriteMediaPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("favorites");
  console.log(response);
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost);
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(),
      remotePost.imageUrl,
      remotePost.id
    );
  });
};

export const getArtPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("gallery");
  console.log(response);
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost);
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(),
      remotePost.imageUrl,
      remotePost.id
    );
  });
};

export const getThoughtsPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<RemotePost[]>("thoughts");
  console.log(response);
  return response.data.map((remotePost: RemotePost) => {
    console.log(remotePost);
    return new Post(
      remotePost.title,
      remotePost.body,
      new Date(),
      remotePost.imageUrl,
      remotePost.id,
      (remotePost.recommendedPosts || []).map((recPost) =>
        new Post(
          recPost.title,
          recPost.body,
          new Date(),
          recPost.imageUrl,
          recPost.id
        )
      )
    );
  });
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<RemotePost>(`post/${id}`);
  const remotePost = response.data;
  const post = new Post(
    remotePost.title,
    remotePost.body,
    new Date(),
    remotePost.imageUrl,
    remotePost.id,
    (remotePost.recommendedPosts || []).map((recPost) =>
      new Post(
        recPost.title,
        recPost.body,
        new Date(),
        recPost.imageUrl,
        recPost.id
      )
    )
  );
  return post;
};
