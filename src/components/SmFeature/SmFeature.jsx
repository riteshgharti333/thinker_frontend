import { Link } from "react-router-dom";
import "./SmFeature.scss";

const SmFeature = ({ tag, title, photo, _id }) => {
  return (
    <Link to={`/single/${_id}`}>
      <div className="SmFeature">
        <div className="bgImg">
          <img src={photo} alt="" />
        </div>
        <div className="info">
          <span>{tag}</span>
            <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default SmFeature;
