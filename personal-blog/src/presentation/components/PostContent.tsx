import { Post } from "../../domain/model/Post";
import { stripHtml } from "../../utils/stripHtml";

interface PostProps {
  post: Post;
  index: number;
}

const PREVIEW_LENGTH = 400;

const PostContent = (props: PostProps) => {
  const post = props.post;
  const plainText = stripHtml(post.description);
  const isLong =
    post.description.length > PREVIEW_LENGTH || plainText.length > PREVIEW_LENGTH;

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
            <div
              className={`post-body${isLong ? " post-body-preview" : ""}`}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            {isLong && (
              <a className="read-me" href={`/post/${post.id}`}>
                Ler mais
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostContent;
