import './BlogCards.scss'
import {blogs} from "../../assets/data";
import BlogCard from '../BlogCard/BlogCard';
import {baseUrl} from "../../main";
import axios from 'axios';
import { useEffect, useState } from 'react';

const BlogCards = () => {

  const [posts , setposts] = useState([]);

  useEffect(() =>{
    const fetchPosts = async () =>{
      try {
        const res = await axios.get(`${baseUrl}/api/posts`)
        setposts(res.data);
      } catch (error) {
        console.log(error)
      }
   
    }
    fetchPosts();
  } , []);

  return (
    <div className='blogcards'>
      {posts.map((post) => (
        <BlogCard title={post.title} desc={post.desc} image={post.photo} key={post._id} id={post._id} />
      ))}
    </div>
  )
}

export default BlogCards
