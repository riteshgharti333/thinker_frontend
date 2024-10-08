import { useEffect, useState } from "react";
import "./FeaturePosts.scss";
import axios from "axios";
import { baseUrl } from "../../main";
import MainFeature from "../MainFeature/MainFeature";
import FeatureSlide from "../FeatureSlide/FeatureSlide";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const cat = "Tech";

const FeaturePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLg = useMediaQuery("(max-width: 1024px)");
  const isMd = useMediaQuery("(max-width: 768px)");
  const isSMd = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(max-width: 480px)");

  let slidesToShow = 4;
  if (isSm) slidesToShow = 1;
  else if (isSMd) slidesToShow = 2;
  else if (isMd) slidesToShow = 2;
  else if (isLg) slidesToShow = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts?cat=${cat}`);
        setPosts(res.data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feature">
      <div className="featureInfo">
        <p>Tech Posts</p>
        <Link
          to={`/posts/query?cat=${cat}`}
          className={`${isLoading ? "isLoading" : " "}`}
        >
          <p>View All</p>
        </Link>
      </div>

      {Array.isArray(posts) && posts.length > 0 && (
        <FeatureSlide slidesToShow={slidesToShow} arrowsScroll={1}>
          {posts.map((post) => (
            <MainFeature
              key={post._id}
              {...post}
              context="feature"
              tagname="Tech"
              // isLoading={isLoading}
            />
          ))}
        </FeatureSlide>
      )}
    </div>
  );
};

export default FeaturePosts;
