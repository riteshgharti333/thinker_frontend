import FeaturePosts from "../../components/FeaturePosts/FeaturePosts.jsx";
import HomeBanner from "../../components/HomeBanner/HomeBanner.jsx";
import LatestPosts from "../../components/LatestPosts/LatestPosts.jsx";
import PopularPost from "../../components/PopularPost/PopularPost.jsx";
import TrendingPosts from "../../components/TrendingPosts/TrendingPosts.jsx";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div className="homeSlide">
          <HomeBanner />
        </div>

        <div className="trending">
          <TrendingPosts />
        </div>

        <div className="latest">
          <LatestPosts />
        </div>

        <div className="popular">
          <PopularPost />
        </div>

        <div className="feature">
          <FeaturePosts />
        </div>
      </div>
    </>
  );
};

export default Homepage;
