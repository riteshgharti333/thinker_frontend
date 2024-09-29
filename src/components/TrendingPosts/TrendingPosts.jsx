import BlogCards from "../BlogCards/BlogCards";
import "./TrendingPosts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../main";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material"; // Import Skeleton from MUI

const TrendingPosts = () => {
  const [topTrendingPost, setTopTrendingPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/api/posts/trending`);
        const trending = data.trendingPosts;

        if (data && trending) {
          setTopTrendingPost(trending[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <div className="trendingPosts">
      <div className="left">
        <div className="top">
          <p>Trending Now</p>
          <Link to={`/posts/content/trending`}  className={`${isLoading ? "isLoading" : " "}`}>
            <p>View All</p>
          </Link>
        </div>
        <div className="date">
          {isLoading ? (
            <>
              <Skeleton width={100} />
              <span className="line">|</span>
              <Skeleton width={80} />
            </>
          ) : (
            <>
              <span>{topTrendingPost?.categories?.join(", ")}</span>
              <span className="line">|</span>
              <span>Adventure</span>
            </>
          )}
        </div>

        <div className="postInfo">
          {isLoading ? (
            <Link to="#" className="latestImg">
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Link>
          ) : (
            <Link to={`/single/${topTrendingPost._id}`} className="latestImg">
              <h1>{topTrendingPost.title}</h1>
              <img src={topTrendingPost.photo} alt={topTrendingPost.title} />
            </Link>
          )}
        </div>
      </div>

      <div className="right">
        <BlogCards context="trending" contentCat="trending" limit={7} />
      </div>
    </div>
  );
};

export default TrendingPosts;
