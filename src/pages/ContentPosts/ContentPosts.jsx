import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard/BlogCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../main";
import "./ContentPosts.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

const ContentPosts = () => {
  const { type } = useParams();
  const [contentPosts, setContentPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(`${baseUrl}/api/posts/${type}`);

        let contentPosts;
        if (type === "latest") {
          contentPosts = res.data.latestPosts;
        } else if (type === "trending") {
          contentPosts = res.data.trendingPosts;
        } else if (type === "popular") {
          contentPosts = res.data.popularPosts;
        }

        if (res.data && contentPosts) {
          setContentPosts(contentPosts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [type]);

  return (
    <div className="contentPostsContainer">
      <div className="postBack">
        <Link to="#" onClick={() => window.history.back()}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
        <h2>{type} Posts</h2>
      </div>
      <div className="contentPostsWrapper">
        <div className="contentPosts">
          {contentPosts.map((post) => (
            <BlogCard
              title={post.title}
              desc={post.desc}
              image={post.photo}
              id={post._id}
              key={post._id}
              category={post.categories}
              date={post.createdAt}
              context="contentposts"
              isLoading={isLoading}
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

export default ContentPosts;
