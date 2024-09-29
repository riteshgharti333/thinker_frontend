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
        const { data } = await axios.get(`${baseUrl}/api/user/${path}/posts`);
        setUserPosts(data.posts);

        if (data.postCount === 0) {
          setErrorMessage("User post not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts();
  }, [path]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="userPostsContainer">
      <div className="postBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>

        <h2>My Posts</h2>
      </div>

      <div className="userPosts">
        <div className="userCatPosts">
          {errorMessage ? (
            <p className="errorMessage" style={{color: "red"}}>{errorMessage}</p>
          ) : (
            userPosts.map((post) => (
              <BlogCard
                title={post.title}
                desc={post.desc}
                image={post.photo}
                id={post._id}
                key={post._id}
                date={post.createdAt}
                category={post.categories}
                context="userposts"
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
