/**
 * Post shape for personal-blog-backend POST /posts (create).
 */
export type PostType = "THOUGHTS" | "FAVORITE_CONTENT" | "MEDIA";

export interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  imageUrl: string | null;
  type: PostType;
  creationDate: string;
  recommendedPosts: ApiPost[];
}
