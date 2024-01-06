import { Link } from "react-router-dom";
import "./Sidebar.scss";
import aboutImg from "../../assets/images/about.png";

const Sidebar = () => {
  const tags = [
    "Personal",
    "Foods",
    "Travel",
    "Health",
    "Lifestyle",
    "Sports",
    "Tech",
    "Science",
    "Movies",
  ];

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        {tags.map((tag) => (
          <Link key={tag} to={`/posts?cat=${tag}`} onClick={handleLinkClick}>
            <span>{tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
