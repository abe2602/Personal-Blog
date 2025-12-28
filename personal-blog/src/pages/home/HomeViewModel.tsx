import { useState, useEffect } from "react";
import * as PostsRemoteDataSourceType from "../../data/posts/PostsRemoteDataSource";
import { RemotePost } from "../../data/model/RemotePost";
import { Post } from "../../models/Post";
import { usePostsStore } from "../../store/postsStore";

export default function HomeViewModel({
  PostsRemoteDataSource,
}: {
  PostsRemoteDataSource: typeof PostsRemoteDataSourceType;
}) {
  const [error, setError] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const store = usePostsStore.getState();

  async function getPosts() {
    if (store.posts.length > 0) {
      setPosts(store.posts);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const remotePosts = await PostsRemoteDataSource.getPosts();
      const postList = remotePosts.map((remotePost: RemotePost) => {
        const imageUrl = null;
        return new Post(
          remotePost.title,
          remotePost.body,
          new Date(),
          imageUrl
        );
      });
      if (postList.length > 0) {
        usePostsStore.getState().setPosts(posts);
      }
      setPosts(postList);
      setError("");
      store.setPosts(postList);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return {
    getPosts,
    posts,
    isLoading,
    error,
  };
}
