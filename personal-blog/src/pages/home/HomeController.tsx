import * as PostsRemoteDataSourceType from "../../data/posts/PostsRemoteDataSource";
import { RemotePost } from "../../data/model/RemotePost";
import { Post } from "../../models/Post";
import { usePostsStore } from "./HomeStore";

export default function HomeController({
  PostsRemoteDataSource,
}: {
  PostsRemoteDataSource: typeof PostsRemoteDataSourceType;
}) {
  const store = usePostsStore.getState();

  async function getPosts() {  
    if (store.posts.length > 0) {
      store.setLoading(false);
      return;
    }

    store.setLoading(true);

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
      store.setPosts(postList);
      store.setError(null);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function filterPosts(searchTerm: string) {
    usePostsStore.getState().setSearchTerm(searchTerm);
  }

  return {
    getPosts,
    posts: store.posts.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(store.searchTerm.toLocaleLowerCase())
    ),
    isLoading: store.isLoading,
    error: store.error,
    filterPosts
  };
}

