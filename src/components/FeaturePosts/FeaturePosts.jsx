import { useEffect, useState } from 'react';
import "./FeaturePosts.scss"
import axios from 'axios';
import { baseUrl } from '../../main';
import MainFeature from '../MainFeature/MainFeature';
import FeatureSlide from '../FeatureSlide/FeatureSlide';
import { Link } from 'react-router-dom';

const cat = "Tech";

const FeaturePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(1); // Small devices
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(3); // Medium devices
      } else {
        setSlidesToShow(4); // Large devices
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts?cat=${cat}`);
        setPosts(res.data.slice(0, 6));
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };

    fetchPosts();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='feature'>
      <div className="featureInfo">
        <p>Tech Posts</p>
        <Link to={`/posts/query?cat=${cat}`}>
          <p>View All</p>
        </Link>
      </div>

      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <FeatureSlide slidesToShow={slidesToShow} arrowsScroll={1}>
          {posts.map((post) => (
            <MainFeature key={post._id} {...post} context='feature' tagname="Tech" />
          ))}
        </FeatureSlide>
      )}
    </div>
  );
};

export default FeaturePosts;
