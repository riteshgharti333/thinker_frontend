import './FeaturePosts.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../main';
import MainFeature from '../MainFeature/MainFeature';
import FeatureSlide from '../FeatureSlide/FeatureSlide';
import { Link } from 'react-router-dom';

const cat = "Tech";

const FeaturePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className='feature'>
      <div className="featureInfo">
      <p>Tech Posts</p>
      <Link to={`/posts/query?cat=${cat}`} >
      <p>View All</p>
      </Link>
      </div>
  
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <FeatureSlide slidesToShow={4} arrowsScroll={1}>
          {posts.map((post) => (
            <MainFeature key={post._id} {...post}  context='feature' tagname="Tech"/>
          ))}
        </FeatureSlide>
      )}
    </div>
  );
};

export default FeaturePosts;
