import { Link } from "react-router-dom";
import BlogCards from "../BlogCards/BlogCards";
import "./PopularPost.scss";

const PopularPost = () => {
  return (
    <div className="popular">
      <div className="popularTop">
        <p>Pupular Posts</p>
        <Link to={`/posts/content/popular`}>
          <p>View All</p>
        </Link>
      </div>

      <div className="popularPosts">
        <BlogCards context="popular" limit={10} contentCat="popular" />
      </div>
    </div>
  );
};

export default PopularPost;
