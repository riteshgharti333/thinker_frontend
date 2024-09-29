import React, { useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { category } from "../../assets/data";

const MobileBurger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

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
      <Menu
        right
        isOpen={isOpen}
        onStateChange={({ isOpen }) => setIsOpen(isOpen)}
      >
        <div className="user">
          <Link to="/profile" onClick={handleCloseMenu}>
            <FaUser className="userIcon" />
          </Link>
          {/* <span>{user.username}</span> */}
        </div>

        <Link
          className="menu-item"
          to="/"
          onClick={() => {
            handleLinkClick();
            handleCloseMenu();
          }}
        >
          Home
        </Link>
        <Link className="menu-item" to="/write"  onClick={() => {
            handleLinkClick();
            handleCloseMenu();
          }}>
          Write
        </Link>
        <Link className="menu-item" to="/about"  onClick={() => {
            handleLinkClick();
            handleCloseMenu();
          }}>
          About
        </Link>
        <Link className="menu-item" to="/contact"  onClick={() => {
            handleLinkClick();
            handleCloseMenu();
          }}>
          Contact
        </Link>
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
            <div className="burgerCategories">
              {category.map((tag) => (
                <Link to={`/posts/query/?cat=${tag}`} key={tag}  onClick={handleCloseMenu}>
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
