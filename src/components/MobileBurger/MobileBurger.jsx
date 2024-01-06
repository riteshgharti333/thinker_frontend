import React, { useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link } from "react-router-dom";
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

  const handLogout = () => {
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
          {/* <span>{user.username}</span> */}
        </div>

        <a className="menu-item" href="/">
          Home
        </a>
        <a className="menu-item" href="/write">
          Write
        </a>
        <a className="menu-item" href="/about">
          About
        </a>
        <a className="menu-item" href="/contact">
          Contact
        </a>
        {user ? (
          <Link to="/login" onClick={handLogout}>
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
            <div className="bugerCategories">
              {tags.map((tag) => (
                <a href={`/posts?cat=${tag}`}>
                  <span>{tag}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default MobileBurger;
