import "./MainFeature.scss";
import { Link } from "react-router-dom";

const MainFeature = ({
  title,
  desc,
  photo,
  _id,
  createdAt,
  categories,
  context,
  tagname,
}) => {
  const date = new Date(createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link to={`/single/${_id}`}>
      <div className={`mainFeature ${context}`}>
        <div className="bgImg">
          <img src={photo} alt="" />
        </div>
        <div className="info">
          <span className="feature">{tagname}</span>
          <div className="date">
            <span className="catName">{categories}</span>
            <span className="line">|</span>
            <span> {date}</span>
          </div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default MainFeature;
