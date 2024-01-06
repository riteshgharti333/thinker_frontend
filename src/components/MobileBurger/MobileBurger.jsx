import React, { useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./MobileBurger.scss";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const MobileBurger = () => {
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

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logout");
  };

  const [showTags, setShowTags] = useState(false);

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Menu right>
        <div className="user">
          <Link to={"/profile"}>
            <FaUser className="userIcon" />
          </Link>
        </div>

        <Link to="/" className="menu-item" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/write" className="menu-item" onClick={handleLinkClick}>
          Write
        </Link>
        <Link to="/about" className="menu-item" onClick={handleLinkClick}>
          About
        </Link>
        <Link to="/contact" className="menu-item" onClick={handleLinkClick}>
          Contact
        </Link>
        {user ? (
          <Link to="/login" onClick={handleLogout}>
            <span>Logout</span>
          </Link>
        ) : (
          <Link to="/login">
            <span>Login</span>
          </Link>
        )}
        <div className="cat" onClick={toggleTags}>
          <span>Categories</span>
          <span>
            {showTags ? (
              <IoMdArrowDropup className="dA" />
            ) : (
              <IoMdArrowDropdown className="dA" />
            )}
          </span>
          {showTags && (
            <div className="burgerCategories">
              {tags.map((tag) => (
                <Link to={`/posts?cat=${tag}`} key={tag} onClick={handleLinkClick}>
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default MobileBurger;
