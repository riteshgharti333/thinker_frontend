import React, { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import "./MobileBurger.scss";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

const MobileBurger = () => {

  const { user, dispatch } = useContext(Context);

  const handLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logout");
  };

  return (
    <div>
      
      <Menu right>
      <div className="user">
                <Link to={"/profile"}>
                  <FaUser className="userIcon" />
                </Link>
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
        )
          
        }
        
      </Menu>
    </div>
  );
};

export default MobileBurger;
