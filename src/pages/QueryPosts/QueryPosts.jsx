import { Link, useLocation, useNavigate } from "react-router-dom";
import "./QueryPosts.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard/BlogCard";
import { baseUrl } from "../../main";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";

const QueryPosts = () => {
  const location = useLocation();
  const path = location.search;

  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get("cat");


  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/posts${path}`);
        setCategoryPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryPosts();
  }, []);

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

        <h2> {categoryName} Posts</h2>
      </div>

      <div className="queryPosts">
        <div className="catPosts">
          {categoryPosts.map((post) => (
            <BlogCard
              title={post.title}
              desc={post.desc}
              image={post.photo}
              id={post._id}
              key={post._id}
              date={post.createdAt}
              context="queryposts"
            />
          ))}
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default QueryPosts;
