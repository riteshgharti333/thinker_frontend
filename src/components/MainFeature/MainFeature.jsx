import { Link } from "react-router-dom";
import "./MainFeature.scss";
import Skeleton from "@mui/material/Skeleton";

const MainFeature = ({
  title,
  photo,
  _id,
  createdAt,
  categories,
  context,
  tagname,
  isLoading,
}) => {
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
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
      <div className={`mainFeatures ${context}`}>
        <div className="bgImg">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            style={{ borderRadius: "10px", backgroundImage: "none" }}
          />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="30%" height={30} />
        </div>
      </div>
    );
  }

  return (
    <Link to={`/single/${_id}`} onClick={handleLinkClick}>
      <div className={`mainFeature ${context}`}>
        <div className="bgImg">
          <img src={photo} alt={title} />
        </div>
        <div className="info">
          <span className="feature">{tagname}</span>
          <div className="date">
            <span className="catName">{categories}</span>
            <span className="line">|</span>
            <span>{date}</span>
          </div>
          <h1>{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default MainFeature;
