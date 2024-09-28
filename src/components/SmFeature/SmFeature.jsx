import { Link } from "react-router-dom";
import "./SmFeature.scss";
import { Skeleton } from "@mui/material";

const SmFeature = ({ tag, title, photo, _id, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="SmFeature" style={{ backgroundColor: "transparent" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={90}
            style={{ borderRadius: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            className="skInfo"
            width="100%"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="skInfo"
            width="80%"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="skInfo"
            width="50%"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="skInfo"
            width="50%"
            height={20}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default SmFeature;
