import { useLayoutEffect, useEffect } from "react";
import { Post } from "../../../domain/model/Post";
import SideMenu from "../../components/profile_sidemenu/ProfileSideMenu";
import PostContent from "../../components/PostContent";
import SearchInput from "../../components/SearchInput";
import NavBar from "../../components/navbar/NavBar";
import DI from "../../../di/DiModule";
import { useThoughtsStore } from "./ThoughtsStore";
import CircularProgress from "../../components/circular_progress/CircularProgress";

const ThoughtsPage = () => {
  const { actions, state } =
    DI.resolve("ThoughtsController");

  const { setScrollPosition, scrollPosition } = useThoughtsStore();
  const posts = state.posts
  const isLoading = state.isLoading
  const searchTerm = state.searchTerm
  const error = state.error;
  
  useEffect(() => {
    actions.getPosts();
  }, []);

  useLayoutEffect(() => {
    if (scrollPosition > 0 && !isLoading && posts.length > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [isLoading, posts.length, scrollPosition]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollPosition]);

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

  return (
    <div className="main-container">
      <NavBar />
      <div className="content-layout">
        <div className="posts-section">
          <SearchInput onChangeCallback={actions.setSearchTerm} value={searchTerm} />
          <ul>
            {posts.map((post: Post, index: number) => (
              <PostContent key={post.title + index} index={index} post={post} />
            ))}
          </ul>
        </div>
        <div className="sidebar-section">
          <SideMenu/>
        </div>
      </div>
    </div>
  );
};

export default ThoughtsPage;
