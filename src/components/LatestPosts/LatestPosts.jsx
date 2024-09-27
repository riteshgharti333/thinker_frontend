import BlogCards from "../BlogCards/BlogCards";
import "./LatestPosts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../main";
import { Link } from "react-router-dom";

const LatestPosts = () => {
  const [topLatestPost, setTopLatestPost] = useState({});

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/posts/latest`);
        const latest = data.latestPosts;

        if (data && latest) {
          setTopLatestPost(latest[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPosts();
  }, []);


  return (
    <div className="latest">
      <div className="leftLatest">
        <div className="leftLatestTop">
          <p>Latest Posts</p>
          <Link to={`/posts/content/latest`}>
            <p>View All</p>
          </Link>
        </div>
        <div className="leftArticle">
          <BlogCards context="latest" contentCat="latest" limit={5} />
        </div>
      </div>

      <div className="rightLatest">
        <div className="rightInfo">
          <span>{topLatestPost.categories?.join(", ")}</span>
          <span className="line"> |</span>
          <span>{}</span>
        </div>

        <div className="rightArticle">
          <Link to={`/single/${topLatestPost._id}`}>
            <h1>{topLatestPost.title}</h1>
            <div
              className="latestDesc"
              dangerouslySetInnerHTML={{ __html: topLatestPost.desc }}
            ></div>
            <img src={topLatestPost.photo} alt={topLatestPost.title} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
