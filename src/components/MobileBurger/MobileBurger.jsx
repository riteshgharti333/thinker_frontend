import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link, useNavigate } from "react-router-dom";

const MobileBurger = () => {

  return (
    <div>
      <Menu right>
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
          <Link to="/login">
          <span>Login</span>
          </Link>
      </Menu>
    </div>
  );
};

export default MobileBurger;
