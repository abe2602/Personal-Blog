import { useQuery } from '@tanstack/react-query';
import { apiClient, TIMEOUT } from "../RestApi";
import { RemotePost } from "../model/RemotePost";

const _getPosts = async (): Promise<RemotePost[]> => {
    const response = await apiClient.get<RemotePost[]>('');
    return response.data;
};

const _fetchPostById = async (id: number): Promise<RemotePost> => {
    const response = await apiClient.get<RemotePost>(`/${id}`);
    return response.data;
};

export const usePosts = () => {
    return useQuery({
    queryKey: ['posts'],
    queryFn: _getPosts,
    staleTime: TIMEOUT,
    });
};

export const usePost = (id: number) => {
    return useQuery({
    queryKey: ['post', id],
    queryFn: () => _fetchPostById(id),
    enabled: !!id,
    staleTime: TIMEOUT,
    });
};

