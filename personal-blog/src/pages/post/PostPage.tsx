import NavBar from "../../components/navbar/NavBar";
import "../../index.css";
import { useParams } from 'react-router-dom';


const PostPage = () => {
    const { id } = useParams(); 

    return (
    <div className="main-container">
        <NavBar/>
        <div className="content-layout">
            <p className="side-menu-message">{id}</p>
        </div>
    </div>
    );
}

export default PostPage;