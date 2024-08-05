import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard/BlogCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../main";
import "./ContentPosts.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

const ContentPosts = () => {
  const { type } = useParams(); // Get type from URL
  const [contentPosts, setContentPosts] = useState([]);
  const [mostTrendingPost, setMostTrendingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (type === "trending") {
          const response = await axios.get(`${baseUrl}/api/posts/trending`);
          setMostTrendingPost(response.data.mostTrendingPost);
          setContentPosts(response.data.remainingPosts);
        } else if (type === "trending-all") {
          const response = await axios.get(`${baseUrl}/api/posts/trending/all`);
          setContentPosts(response.data);
        } else if (type === "latest-all") {
          const response = await axios.get(`${baseUrl}/api/posts/latest/all`);
          setContentPosts(response.data);
        } else if (type === "popular-all") {
          const response = await axios.get(`${baseUrl}/api/posts/popular/all`);
          setContentPosts(response.data);
        } else {
          // Handle other types if needed
        }
      } catch (error) {
        console.error(error);
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
        <h2>{type === "trending" ? "Trending Posts" : type === "trending-all" ? "All Trending Posts" : type === "latest-all" ? "All Latest Posts" : type === "popular-all" ? "All Popular Posts" : "All Posts"}</h2>
      </div>

      <div className="contentPosts">
        {type === "trending" && mostTrendingPost && (
          <div className="mostTrendingPost">
            <BlogCard
              title={mostTrendingPost.title}
              desc={mostTrendingPost.desc}
              image={mostTrendingPost.photo}
              id={mostTrendingPost._id}
              key={mostTrendingPost._id}
              date={mostTrendingPost.createdAt}
            />
          </div>
        )}
        <div className="contentPosts">
        <div className="contentCatPosts">
          {contentPosts.map((post) => (
            <BlogCard
              title={post.title}
              desc={post.desc}
              image={post.photo}
              id={post._id}
              key={post._id}
              date={post.createdAt}
              context="contentposts"

            />
          ))}
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        </div>
    
      </div>
    </div>
  );
};

export default ContentPosts;
