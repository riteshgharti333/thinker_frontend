import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { category } from "../../assets/data";

const Foooter = () => {
  const handleSpanClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer card-bg">
      <div className="footerLeft">
        <div className="logo">
          <h1>
            Thinker<span>.</span>
          </h1>
        </div>
        <div className="socilMediaIcon">
          <a href="https://github.com/riteshgharti333">
            <FaGithub className="leftIcon" />
          </a>
          <a href="https://www.linkedin.com/in/riteshgharti333">
            <FaLinkedin className="Linkedin" />
          </a>
        </div>
      </div>
      <div className="footerCenter">
        <p>Category</p>
        <div className="tags">
          {category.map((cat) => (
            <Link key={cat} to={`/posts/query?cat=${cat}`}>
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="footerRight">
        <h1>Usefull Links</h1>
        <div className="links">
          <Link to={"/about"}>
            <span onClick={handleSpanClick}>About Me</span>
          </Link>
          <Link to={"/contact"}>
            <span onClick={handleSpanClick}>Contact Me</span>
          </Link>
          <div className="contactLinks">
            <a href="mailto:riteshgharti333@gmail.com">
              <span>
                <IoMdMail className="contactIcon" /> riteshgharti333@gmail.com
              </span>
            </a>

            <span>
              <IoCallSharp className="contactIcon" />
              +91 000 333 999
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foooter;
