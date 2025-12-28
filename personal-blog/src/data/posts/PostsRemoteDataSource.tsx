import { useQuery } from '@tanstack/react-query';
import { apiClient, TIMEOUT } from "../RestApi";
import { RemotePost } from "../model/RemotePost";

export const getPosts = async (): Promise<RemotePost[]> => {
    const response = await apiClient.get<RemotePost[]>('');
    console.log("from backend")
    const posts = response.data;
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
};

const _fetchPostById = async (id: number): Promise<RemotePost> => {
    const response = await apiClient.get<RemotePost>(`/${id}`);
    return response.data;
};

export const usePosts = () => {
    return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: TIMEOUT,
    });
};

export const usePost = (id: number) => {
    return useQuery({
    queryKey: ['post', id],
    queryFn: () => _fetchPostById(id),
    enabled: !!id,
    //staleTime: TIMEOUT,
    });
};

