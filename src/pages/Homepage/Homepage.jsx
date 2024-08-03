import BlogCards from "../../components/BlogCards/BlogCards.jsx";
import FeaturePosts from "../../components/FeaturePosts/FeaturePosts.jsx";
import HomeBanner from "../../components/HomeBanner/HomeBanner.jsx";
import LatestPosts from "../../components/LatestPosts/LatestPosts.jsx";
import PopularPost from "../../components/PopularPost/PopularPost.jsx";
import Sidebar from "../../components/Sidebar/Sidebar";
import TrendingPosts from "../../components/TrendingPosts/TrendingPosts.jsx";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        {/* <div className="homeBanner"> */}
        <HomeBanner />

        {/* </div> */}
        
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


        {/* <div className="article">
          <div className="blog-container">
            <BlogCards />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Homepage;
