import { Link } from "react-router-dom";
import "./BlogCard.scss";
import Loader from "../Loader/Loader"; // Assuming you have a Loader component

const BlogCard = ({ title, desc, image, id, username, date, isLoading }) => {
  const newdate = new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link to={`/posts/${id}`} onClick={handleLinkClick}>
      <div className="blogcard">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="cardImg">
              <img src={image} alt="" />
            </div>
            <div className="blogInfo">
              <Link to={`/posts/${id}`} onClick={handleLinkClick}>
                <h3>{title}</h3>
              </Link>
              <p>{desc}</p>
              <span>
                {username} ► {newdate}
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
