import { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import DI from "../../../di/DiModule";
import CircularProgress from "../../components/circular_progress/CircularProgress";
import { usePostStore } from "./PostStore";
import { Post } from "../../../domain/model/Post";
import { Link } from "react-router-dom";
import SideMenu from "../../components/profile_sidemenu/ProfileSideMenu";

const PostPage = () => {
    const { actions } = DI.resolve("PostController");
    // Subscribe to store changes to make it reactive
    const post = usePostStore((state) => state.post);
    const isLoading = usePostStore((state) => state.isLoading);
    const error = usePostStore((state) => state.error);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            const postId = parseInt(id);
            actions.getPost(postId);
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="main-container">
                <NavBar />
                <div className="content-layout">
                    <div className="posts-section">
                        <CircularProgress />
                    </div>
                    <div className="sidebar-section">
                        <SideMenu />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-container">
                <NavBar />
                <div className="content-layout">
                    <div className="posts-section">
                        <p>Error loading posts: {error}</p>
                    </div>
                    <div className="sidebar-section">
                        <SideMenu />
                    </div>
                </div>
            </div>
        );
    }

    if(post != null) {
        return (
            <div className="main-container">
                <NavBar />
                <div className="content-layout">
                    <div className="posts-section">
                        <div className="main-content">
                            <div className="main-content-post">
                                <div className="main-content-text">
                                    <h3>{post.title}</h3>
                                    <small>{post.date.toLocaleDateString()}</small>
                                    {post.imageUrl && (
                                        <img src={post.imageUrl} alt={post.title} className={`post-image`} />
                                    )}
                                    <div
                                        className="post-body"
                                        dangerouslySetInnerHTML={{ __html: post.description }}
                                    />
                                    {post.recommendedPosts && post.recommendedPosts.length > 0 && (
                                        <div className="recommended-posts-container">
                                            <h4 className="recommended-posts-heading">
                                                Recommended Posts
                                            </h4>
                                            <div className="recommended-posts-list">
                                                {post.recommendedPosts.map((recommendedPost: Post) => (
                                                    <Link 
                                                        key={recommendedPost.id} 
                                                        to={`/post/${recommendedPost.id}`}
                                                        className="recommended-post-card"
                                                    >
                                                        {recommendedPost.imageUrl ? (
                                                            <img 
                                                                src={recommendedPost.imageUrl} 
                                                                alt={recommendedPost.title} 
                                                                className="recommended-post-image"
                                                            />
                                                        ) : (
                                                            <div className="recommended-post-placeholder">
                                                                📄
                                                            </div>
                                                        )}
                                                        <h5 className="recommended-post-title">
                                                            {recommendedPost.title}
                                                        </h5>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <SideMenu />
                    </div>
                </div>
            </div>
        );
    }   
};

export default PostPage;
