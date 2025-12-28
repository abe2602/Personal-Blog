import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { Post } from "../../../domain/model/Post";
import mockedList from "../../../data/MockedList";
import PostContent from "../../components/PostContent";
const ThoughtsPage = () => {
const [postsList, setPostsList] = useState<Post[]>([]);

useEffect( () => {
  setPostsList(mockedList)
}, []);

  return (
    <div className="main-container">
      <NavBar/>
      <div className="content-layout">
        <div className="posts-section">
          <ul>
            {postsList.map((post, index) => (
              <PostContent index={index} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThoughtsPage;
