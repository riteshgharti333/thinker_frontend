import BlogCards from "../BlogCards/BlogCards";
import "./TrendingPosts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../main";
import moment from "moment";
import { Link } from "react-router-dom";

const TrendingPosts = () => {
  const [mostTrendingPost, setMostTrendingPost] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/trending`);
        const { mostTrendingPost, remainingPosts } = res.data;
        setMostTrendingPost(mostTrendingPost);
        setIsFetching(false);
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
          <Link to={`/posts/content/trending-all`}>
          <p>View All</p>
          </Link>
        </div>
        <div className="date">
          <span>{mostTrendingPost?.categories?.join(", ")}</span>
          <span className="line">|</span>
          <span>{moment(mostTrendingPost.createdAt).format("DD MMM YYYY")}</span>
        </div>

        <div className="postInfo">
          {isFetching ? (
            <p>Loading...</p>
          ) : mostTrendingPost ? (
            <>
      <Link  to={`/single/${mostTrendingPost._id}`}>
              <h1>{mostTrendingPost.title}</h1>
              <img src={mostTrendingPost.photo} alt={mostTrendingPost.title} />
              <div className='trendingDesc' dangerouslySetInnerHTML={{ __html: mostTrendingPost.desc }}></div>
              </Link>
            </>
          ) : (
            <p>No trending post available</p>
          )}
        </div>
      </div>
      

      <div className="right">
        <BlogCards context="trending" contentCat="top-posts" limit={6} />
      </div>
    </div>
  );
};

export default TrendingPosts;
