import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { FaUser } from "react-icons/fa";
import MobileBurger from "../MobileBurger/MobileBurger";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { category } from "../../assets/data";

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

  const location = useLocation();
  const [showCatLinks, setShowCatLinks] = useState(location.pathname === "/");

  useEffect(() => {
    setShowCatLinks(location.pathname === "/");
  }, [location.pathname]);

  return (
    <>
      <div className={navbarClass}>
        <div className="hamburger">
          <MobileBurger />
        </div>

        <div className="left">
          <div className="logo">
            <Link to="/">
              <h1>
                Thinker<span>.</span>
              </h1>
            </Link>
          </div>

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
        </div>

        <div className="right">
          <div className="userInfo">
            {user ? (
              <>
                <div className="user">
                  <Link to={"/profile"}>
                    <FaUser className="userIcon" />
                  </Link>
                </div>

                <Link to={"/login"} onClick={handLogout}>
                  <button>Logout</button>
                </Link>
              </>
            ) : (
              <button>
                <Link to={"/login"}>Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
      {showCatLinks && (
        <div className="catLinks">
          {category.map((cat) => (
            <Link key={cat} to={`/posts/query?cat=${cat}`}>
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
