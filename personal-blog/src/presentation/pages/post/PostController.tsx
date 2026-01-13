import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import { usePostStore } from "./PostStore";

export default function PostController({
    postsRepository,
}: {
    postsRepository: typeof PostsRemoteRepository;
}) {
    const store = usePostStore.getState();
    
    async function getPost(id: number) {
        if (store.post != null && !store.isLoading) {
            return;
        }

        store.setLoading(true);
        store.setError(null);

        try {    
            const post = await postsRepository.getPost(id);
            store.setPost(post);
            console.log("post", post);
        } catch (error) {
            store.setError(error instanceof Error ? error.message : "Unknown error");  
        } finally {
            store.setLoading(false);
        }
    }

    function getState() {
        return {
            post: store.post,
            isLoading: store.isLoading,
            error: store.error,
        };
    }

    const state = getState();

    const actions = {
        getPost: getPost,
    };

    return {
        actions,
        state,
    };
}
