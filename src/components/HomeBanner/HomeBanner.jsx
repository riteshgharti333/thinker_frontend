import "./HomeBanner.scss";
import MainFeature from "../MainFeature/MainFeature.jsx";
import SmFeature from "../SmFeature/SmFeature";
import Slide from "../Slide/Slide";
import RightSlide from "../RightSlider/RightSlide.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main.jsx";

const HomeBanner = () => {
  const [featurePosts, setFeaturePosts] = useState([]);
  const [moviePosts, setMoviePosts] = useState([]);
  const [foodPosts, setFoodPosts] = useState([]);

  useEffect(() => {
    const getFeaturePosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/random`);
        setFeaturePosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getPostsByCategory = async (category) => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts?cat=${category}`);
        return res.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    const fetchData = async () => {
      await getFeaturePosts();
      const movieData = await getPostsByCategory("Movies");
      const foodData = await getPostsByCategory("Foods");

      setMoviePosts(movieData);
      setFoodPosts(foodData);
    };

    fetchData();
  }, []);

  return (
    <div className="homeBanner">
      <div className="leftFeature">
        {Array.isArray(featurePosts) && featurePosts.length > 0 &&
          <Slide slidesToShow={1} arrowsScroll={1}>
            {featurePosts.map((post) => (
              <MainFeature key={post._id} {...post} tagname="Feature"  />
            ))}
          </Slide>
        
        }
      </div>
     <div className="rightFeature">
        <div className="rightTopFeature">
          {Array.isArray(foodPosts) && foodPosts.length > 0 &&
            <RightSlide slidesToShow={1} arrowsScroll={1}>
              {foodPosts.map((post) => (
                <SmFeature key={post._id} tag="Foods" {...post} />
              ))}
            </RightSlide>
  }
        </div> 
        <div className="rightBottomFeature">
          {Array.isArray(moviePosts) && moviePosts.length > 0 &&
            <RightSlide slidesToShow={1} arrowsScroll={1}>
              {moviePosts.map((post) => (
                <SmFeature key={post._id} tag="Movies" {...post} />
              ))}
            </RightSlide>
        }
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
