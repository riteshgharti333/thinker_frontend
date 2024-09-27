import BlogCards from "../BlogCards/BlogCards";
import "./TrendingPosts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../main";
import { Link } from "react-router-dom";

const TrendingPosts = () => {
  const [topTrendingPost, setTopTrendingPost] = useState({});


  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/posts/trending`);
        const trending = data.trendingPosts;

        if (data && trending) {
          setTopTrendingPost(trending[0]);
        }
      } catch (error) {
        console.error(error);
        setIsFetching(false);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <div className="trendingPosts">
      <div className="left">
        <div className="top">
          <p>Trending Now</p>
          <Link to={`/posts/content/trending`}>
            <p>View All</p>
          </Link>
        </div>
        <div className="date">
          <span>{topTrendingPost?.categories?.join(", ")}</span>
          <span className="line">|</span>
          <span>Adventrue</span>
        </div>

        <div className="postInfo">
          <Link to={`/single/${topTrendingPost._id}`}>
            <h1>{topTrendingPost.title}</h1>
            <img src={topTrendingPost.photo} alt={topTrendingPost.title} />
          </Link>
        </div>
      </div>

      <div className="right">
        <BlogCards context="trending" contentCat="trending" limit={6} />
      </div>
    </div>
  );
};

export default TrendingPosts;
