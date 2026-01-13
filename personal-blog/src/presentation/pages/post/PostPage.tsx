import { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import DI from "../../../di/DiModule";
import CircularProgress from "../../components/circular_progress/CircularProgress";

const PostPage = () => {
    const { actions, state } = DI.resolve("PostController");
    const post = state.post;
    const isLoading = state.isLoading;
    const error = state.error;
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
            </div>
            </div>
        );
    }

    if(post != null) {
        return (
                <div className="main-container">
                    <NavBar />
                    <div className="content-layout">
                    <p className="side-menu-message">{post?.title}</p>
                    </div>
                </div>
            );
    }   
};

export default PostPage;
