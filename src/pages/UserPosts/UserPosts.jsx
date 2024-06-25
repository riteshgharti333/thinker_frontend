import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UserPosts.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard/BlogCard";
import { baseUrl } from "../../main";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";

const UserPosts = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/${path}/posts`);
        
        if (response.data.message) {
          setErrorMessage(response.data.message);
        } else {
          setUserPosts(response.data.posts);
          setUser(response.data.posts[0].username.username);
          setErrorMessage(""); // Clear error message if posts are found
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("User post not found");
      }
    };

    fetchUserPosts();
  }, [path]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="queryPostsContainer">
      <div className="postBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>

        <h2>{user} Posts</h2>
      </div>

      <div className="queryPosts">
        <div className="catPosts">
          {errorMessage ? (
            <p className="errorMessage">{errorMessage}</p>
          ) : (
            userPosts.map((post) => (
              <BlogCard
                title={post.title}
                desc={post.desc}
                image={post.photo}
                id={post._id}
                key={post._id}
                date={post.createdAt}
              />
            ))
          )}
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
