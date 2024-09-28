import { Link } from "react-router-dom";
import "./BlogCard.scss";
import Skeleton from "@mui/material/Skeleton";

const BlogCard = ({ title, image, id, date, category, context, isLoading }) => {
  const newdate = date
    ? new Date(date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className={`blogcard ${context}`}>
        <div className="cardImg">
          <Skeleton variant="rectangular" width="100%" height={100} />
        </div>
        <div className="blogInfo">
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />

        </div>
      </div>
    );
  }

  return (
    <Link to={`/single/${id}`} onClick={handleLinkClick}>
      <div className={`blogcard ${context}`}>
        <div className="cardImg">
          <img src={image} alt={title} />
        </div>
        <div className="blogInfo">
          <h3>{title}</h3>
          <span className="smInfo">
            <span>{category}</span> <span className="line">|</span>
            {newdate}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
