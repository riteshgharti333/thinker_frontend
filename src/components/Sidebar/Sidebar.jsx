import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { category } from "../../assets/data.js";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p className="sidebarHeader">Categories</p>
      <div className="categories">
        {category.map((cat) => (
          <Link key={cat} to={`/posts/query?cat=${cat}`}>
            <span>{cat}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
