import { Post } from "../models/Post";

interface PostProps {
  post: Post;
  index: number;
}

const PostContent = (props: PostProps) => {
  const post = props.post;

  return (
    <li key={props.index} className="main-content">
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="post-image" />
      )}

      <div className="main-content-post">
        <div className="main-content-text">
          <h3>{post.title}</h3>
          <small>{post.date.toLocaleDateString()}</small>
          {post.description.length > 300 ? (
            <div>
              <p>{post.description.substring(0, 300)}</p>
              <a className="read-me" href="/post/1234">Read more</a>
            </div>
          ) : (
            <div>
              <p>{post.description}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default PostContent;
