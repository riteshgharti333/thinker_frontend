import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FaUser } from "react-icons/fa";
import MobileBurger from "../MobileBurger/MobileBurger";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logout");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = scroll ? "nav scrolled" : "nav";

  return (
    <div className={navbarClass}>
      <div className="left">
        <a href="https://github.com/riteshgharti333">
          <FaGithub className="leftIcon" />
        </a>
        <a href="https://www.linkedin.com/in/riteshgharti333">
          <FaLinkedin className="Linkedin" />
        </a>
      </div>

      <div className="hamburger">
        <MobileBurger />
      </div>

      <div className="center">
        <div className="logo">
          <Link to="/">
            <h1>
              Thinker<span>.</span>
            </h1>
          </Link>
        </div>
      </div>

      <div className="right">
        <div className="links">
          <Link to={"/write"}>
            <span>Write</span>
          </Link>
          <Link to={"/about"}>
            <span>About</span>
          </Link>
          <Link to={"/contact"}>
            <span>Contact</span>
          </Link>
        </div>
        <div className="userInfo">
          {user ? (
            <>
              <Link to={"/login"} onClick={handLogout}>
                <button>Logout</button>
              </Link>

              <div className="user">
                <Link to={"/profile"}>
                  <FaUser className="userIcon" />
                </Link>
              </div>
            </>
          ) : (
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
