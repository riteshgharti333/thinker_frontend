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
      <p className="sidebarHeader">About Me</p>
      <div className="sidebarImg">
        <img src={aboutImg} alt="" />
      </div>
      <div className="aboutMe">
        <p>
          Hi,👋 I'm Ritesh, your friendly neighborhood full-stack developer 🚀.
          Obsessed with turning ideas into lines of code. 💻 Problem-solving is
          my superpower, and I thrive on the thrill of overcoming coding
          challenges. Always eager to learn and explore new tech horizons 🌐
        </p>
      </div>
      <p className="sidebarHeader">Categories</p>
      <div className="categories">
        {category.map((cat) => (
          <Link key={cat} to={`/posts?cat=${cat}`} onClick={handleLinkClick}>
            <span>{cat}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
