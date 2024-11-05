import BlogCards from "../BlogCards/BlogCards";
import "./LatestPosts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../main";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const LatestPosts = () => {
  const [topLatestPost, setTopLatestPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/api/posts/latest`);
        const latest = data.latestPosts;

        if (data && latest) {
          setTopLatestPost(latest[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="latest">
      <div className="leftLatest">
        <div className="leftLatestTop">
          <p>Latest Posts</p>
          <Link
            to={`/posts/content/latest`}
            className={`${isLoading ? "isLoading" : " "}`}
          >
            <p>View All</p>
          </Link>
        </div>
        <div className="leftArticle">
          <BlogCards context="latest" contentCat="latest" limit={6} />
        </div>
      </div>

      <div className={`rightLatest ${isLoading ? "skRightLatest" : ""}`}>
        <div className="rightInfo">
          {isLoading ? (
            <>
              <Skeleton variant="text" width="60%" height={30} />
            </>
          ) : (
            <>
              <span>{topLatestPost.categories?.join(", ")}</span>
              <span className="line"> |</span>
              <span>25 Sep. 2024</span>
            </>
          )}
        </div>

        <div className="rightArticle">
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" height={300} />
              <Skeleton variant="text" height={40} />
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={60} />
            </>
          ) : (
            <Link to={`/single/${topLatestPost._id}`} className="latestImg">
              <h1>{topLatestPost.title}</h1>
              <div
                className="latestDesc"
                dangerouslySetInnerHTML={{ __html: topLatestPost.desc }}
                l
              ></div>
              <img src={topLatestPost.photo} alt={topLatestPost.title} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
