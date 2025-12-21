import { useEffect, useState } from "react";
import "../../index.css";
import { Post } from "../../models/Post";
import mockedList from "../../data/MockedList";
import SideMenu from "../../components/SideMenu";
import PostContent from "../../components/PostContent";
import SearchInput from "../../components/SearchInput";
import NavBar from "../../components/navbar/NavBar";

const HomePage = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [filteredUsers, setSearchList] = useState<Post[]>([]);
  const searchItems = (searchInput: string) => {
    const searchList =
      searchInput !== ""
        ? postsList.filter((post) =>
            post.title
              .toLocaleLowerCase()
              .includes(searchInput.toLocaleLowerCase())
          )
        : postsList;

    setSearchList(searchList);
  };

  useEffect(() => {
    setPostsList(mockedList);
    setSearchList(mockedList);
  }, []);

  return (
    <div className="main-container">
      <NavBar/>
      <div className="content-layout">
        <div className="posts-section">
          <SearchInput onChangeCallback={searchItems} />
          <ul>
            {filteredUsers.map((post, index) => (
              <PostContent index={index} post={post} />
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
