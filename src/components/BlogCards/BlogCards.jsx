import "./BlogCards.scss";
import { blogs } from "../../assets/data";
import BlogCard from "../BlogCard/BlogCard";
import { baseUrl } from "../../main";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Loader from "../Loader/Loader";

const BlogCards = () => {
  const [posts, setposts] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts`);
        setposts(res.data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blogcards">
          {posts.map((post) => (
            <BlogCard
              title={post.title}
              desc={post.desc}
              image={post.photo}
              key={post._id}
              id={post._id}
              username={post.username}
              date={post.updatedAt}
              isLoading={isFetching}
            />
          ))}
    </div>
  );
};

export default BlogCards;
