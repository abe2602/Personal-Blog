import { useState, useMemo, useLayoutEffect } from "react";
import "../../index.css";
import { Post } from "../../models/Post";
import SideMenu from "../../components/SideMenu";
import PostContent from "../../components/PostContent";
import SearchInput from "../../components/SearchInput";
import NavBar from "../../components/navbar/NavBar";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import DI from '../../di/BlogDiModule'
import { RemotePost } from "../../data/model/RemotePost";
import { usePostsStore } from "../../store/postsStore";

const HomePage = () => {
  //const { data: remotePosts, isLoading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const { getPosts, posts, isLoading, error } = DI.resolve("HomeViewModel");
  const { scrollPosition, setScrollPosition } = usePostsStore();

  useEffect(() => {
    getPosts();
  }, []);

  // Restore scroll position immediately on mount to prevent flash
  useLayoutEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, []); // Only run once on mount

  // Ensure scroll position is maintained after content loads
  useLayoutEffect(() => {
    if (scrollPosition > 0 && !isLoading && posts.length > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [isLoading, posts.length, scrollPosition]);

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollPosition]);

  // const postsList: Post[] = useMemo(() => {
  //   if (!remotePosts) return [];
  //   return remotePosts.map((remotePost: RemotePost) => {
  //     const imageUrl = remotePost.id % 3 === 0 
  //       ? `https://picsum.photos/400/300?random=${remotePost.id}` 
  //       : null;
      
  //     return new Post(
  //       remotePost.title,
  //       remotePost.body,
  //       new Date(),
  //       imageUrl
  //     );
  //   });
  // }, [remotePosts]);

  // const filteredUsers = useMemo(() => {
  //   if (searchTerm === "") {
  //     return postsList;
  //   }
    
  //   return postsList.filter((post) =>
  //     post.title
  //       .toLocaleLowerCase()
  //       .includes(searchTerm.toLocaleLowerCase())
  //   );
  // }, [postsList, searchTerm]);

  const searchItems = (searchInput: string) => {
    setSearchTerm(searchInput);
  };

  const filteredUsers = useMemo(() => {
    if (searchTerm === "") {
      return posts;
    }
    
    return posts.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
  }, [posts, searchTerm]);

  
  if (isLoading) {
    return (
      <div className="main-container">
        <NavBar/>
        <div className="content-layout">
          <div className="posts-section">
            <p>Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <NavBar/>
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
      <NavBar/>
      <div className="content-layout">
        <div className="posts-section">
          <SearchInput onChangeCallback={searchItems} />
          <ul>
            {filteredUsers.map((post: Post, index: number) => (
              <PostContent key={post.title + index} index={index} post={post} />
            ))}
          </ul>
        </div>
        <div className="sidebar-section">
          <SideMenu
            imageUrl="https://picsum.photos/300/200?random=10"
            message="Welcome to My Blog"
            description="This is a personal blog where I share my thoughts and experiences. Feel free to explore the posts and discover interesting content."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
