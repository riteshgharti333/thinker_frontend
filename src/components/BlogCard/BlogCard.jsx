import { Link } from "react-router-dom";
import "./BlogCard.scss";

const BlogCard = ({ title, image, id, date , category, context }) => {
  
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
     
            <div className="cardImg">
              <img src={image} alt="" />
            </div>
            <div className="blogInfo">
                <h3>{title}</h3>
              <span className="smInfo">
              <span>{category}</span> <span className="line">|</span>{newdate}
              </span>
            </div>
      </div>
    </Link>
  );
};

export default BlogCard;
