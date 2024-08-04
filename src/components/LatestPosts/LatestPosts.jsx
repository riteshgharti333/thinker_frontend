import BlogCards from '../BlogCards/BlogCards';
import './LatestPosts.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../main';
import moment from 'moment';
import { Link } from 'react-router-dom';


const LatestPosts = () => {
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/latest`);
        const { mostRecentPost, remainingPosts } = res.data;
        setMostRecentPost(mostRecentPost);
        setIsFetching(false);
      } catch (error) {
        console.error(error);
        setIsFetching(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className='latest'>
      <div className="leftLatest">
        <div className="leftLatestTop">
          <p>Latest Posts</p>
          <Link to={`/posts/content/latest-all`} >
          <p>View All</p>
          </Link>

        </div>
        <div className="leftArticle">
          <BlogCards context="latest" contentCat="/" limit={6} />
        </div>
      </div>
      
      <div className="rightLatest">
        <div className="rightInfo">
          <span>{mostRecentPost?.categories?.join(", ")}</span>
          <span className='line'> |</span>
          <span>{moment(mostRecentPost.createdAt).format("DD MMM YYYY")}</span>
        </div>
        
        <div className="rightArticle">
          {isFetching ? (
            <p>Loading...</p>
          ) : mostRecentPost ? (
            <>
            <Link  to={`/single/${mostRecentPost._id}`}>
              <h1>{mostRecentPost.title}</h1>
              <div className='latestDesc' dangerouslySetInnerHTML={{ __html: mostRecentPost.desc }}></div>
              <img src={mostRecentPost.photo} alt={mostRecentPost.title} />
            </Link>

            </>

          ) : (
            <p>No latest post available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
