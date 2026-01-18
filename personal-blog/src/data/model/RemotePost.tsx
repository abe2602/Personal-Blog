export interface RemotePost {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  type: string;
  recommendedPosts: RemotePost[];
}
