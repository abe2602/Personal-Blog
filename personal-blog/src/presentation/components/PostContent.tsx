import { Post } from "../../domain/model/Post";
import { stripHtml } from "../../utils/stripHtml";

interface PostProps {
  post: Post;
  index: number;
}

const PREVIEW_LENGTH = 220;

const PostContent = (props: PostProps) => {
  const post = props.post;
  const plainText = stripHtml(post.description);
  const isLong = plainText.length > PREVIEW_LENGTH;
  const preview = isLong ? plainText.substring(0, PREVIEW_LENGTH) : plainText;

  return (
    <li key={props.index} className="main-content post-list-item">
      <div className="main-content-post">
        <div className="main-content-text">
          <h3>{post.title}</h3>
          <small>{post.date.toLocaleDateString()}</small>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className={`post-image`} />
          )}

          <div>
            <p>{preview}{isLong ? "…" : ""}</p>
            {isLong && (
              <a className="read-me" href={`/post/${post.id}`}>
                Read more
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostContent;
