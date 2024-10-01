import "./BlogCards.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { baseUrl } from "../../main";

const BlogCards = ({ context, limit = 6, contentCat }) => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/posts/${contentCat}`);
        const queryPosts = res.data;

        if (queryPosts) {
          if (contentCat === "trending") {
            setPosts(queryPosts.trendingPosts.slice(1, limit));
          } else if (contentCat === "popular") {
            setPosts(queryPosts.popularPosts.slice(0, limit));
          } else if (contentCat === "latest") {
            setPosts(queryPosts.latestPosts.slice(1, limit));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [limit, contentCat]);

  return (
    <div className={`blogcards ${context}`}>
      {posts.map((post) => (
        <BlogCard
          title={post.title}
          desc={post.desc}
          image={post.photo}
          key={post._id}
          id={post._id}
          username={post.username}
          date={post.updatedAt}
          category={post.categories}
          context={context}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default BlogCards;
