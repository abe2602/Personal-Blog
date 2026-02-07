export interface RemotePost {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  type: string;
  creationDate: string; // yyyy-mm-ddThh:mm or similar
  recommendedPosts: RemotePost[];
}

export interface PostsListing {
  postsList: RemotePost[];
  total: number;
}