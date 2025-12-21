import { useState } from "react";
import "../../index.css";
import { Post } from "../../models/Post";
import SideMenu from "../../components/SideMenu";
import PostContent from "../../components/PostContent";
import SearchInput from "../../components/SearchInput";
import NavBar from "../../components/navbar/NavBar";
import { usePosts } from "../../data/posts/PostsRemoteDataSource";

const HomePage = () => {
  const { data: remotePosts, isLoading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  const postsList: Post[] = remotePosts
    ? remotePosts.map((remotePost) => {
        // Generate a random image URL for some posts
        const imageUrl = remotePost.id % 3 === 0 
          ? `https://picsum.photos/400/300?random=${remotePost.id}` 
          : null;
        
        return new Post(
          remotePost.title,
          remotePost.body,
          new Date(), // You might want to use a date from the API if available
          imageUrl
        );
      })
    : [];

  const filteredUsers = searchTerm === ""
    ? postsList
    : postsList.filter((post) =>
        post.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );

  const searchItems = (searchInput: string) => {
    setSearchTerm(searchInput);
  };

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
            <p>Error loading posts: {error instanceof Error ? error.message : 'Unknown error'}</p>
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
            {filteredUsers.map((post, index) => (
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
