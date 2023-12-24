import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Foooter.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";

const Foooter = () => {
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

  return (
    <div className="footer">
      <div className="footerLeft">
        <div className="logo">
          <h1>
            Thinker<span>.</span>
          </h1>
        </div>
        <div className="socilMediaIcon">
          <FaGithub className="leftIcon" />
          <FaLinkedin />
        </div>
      </div>
      <div className="footerCenter">
        <p>Tags :</p>
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="footerRight">
        <h1>Usefull Links</h1>
        <div className="links">
          <span>Contact Us</span>
          <span>About Us</span>
          <div className="contactLinks">
          <span>
            <IoMdMail className="contactIcon"/>        riteshgharti333@gmail.com
          </span>
          <span>
            <IoCallSharp className="contactIcon" />+91 000 333 999
          </span>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Foooter;
