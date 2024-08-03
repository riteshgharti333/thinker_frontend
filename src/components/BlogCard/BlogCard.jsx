import { Link } from "react-router-dom";
import "./BlogCard.scss";
import Loader from "../Loader/Loader";

const BlogCard = ({ title, image, id, date, isLoading , category, context }) => {
  
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
    <Link to={`/single/${id}`} onClick={handleLinkClick}>
        <div className={`blogcard ${context}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="cardImg">
              <img src={image} alt="" />
            </div>
            <div className="blogInfo">
                <h3>{title}</h3>
              <span className="smInfo">
              <span>{category}</span> <span className="line">|</span>{newdate}
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
