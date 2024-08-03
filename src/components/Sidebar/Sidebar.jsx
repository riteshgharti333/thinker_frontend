import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import aboutImg from "../../assets/images/about.png";
import { category } from "../../assets/data.js";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate(`/posts?cat=${cat}`);
  };

  return (
    <div className="sidebar">
      <p className="sidebarHeader">Categories</p>
      <div className="categories">
        {category.map((cat) => (
          <Link key={cat} to={`/posts/query?cat=${cat}`} onClick={handleLinkClick}>
            <span>{cat}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
