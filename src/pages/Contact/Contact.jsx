import "./Contact.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";


const Contact = () => {
  return (
    <div className="contact">
      <div className="contactContainer">
        <div className="contactLeft">
          <input type="text" placeholder="Name"/>
          <input type="email" placeholder="Email" />
          <textarea name="" id="" cols="30" rows="6" placeholder="Message"></textarea>
          <button>Send</button>
        </div>

        <div className="contactRight">
          <div className="contactIcons">
            <div className="icons">
              <IoMdMail className="contactIcon"/> 
              <span>riteshgharti333@gmail.com</span>
            </div>
            <div className="icons">
              <IoCallSharp className="contactIcon" />
              <span> +91 123 000 333 </span>
            </div>
          </div>

          <hr className="lineborder"/>
          <div className="socialIcons">
            <div className="socialIcon">
              <FaGithub className="sIcon" />
              <span> Github </span>

            </div>

            <div className="socialIcon">
              <FaLinkedin className="sIcon Linkedin" />
              <span > Linkedin </span>

            </div>

            <div className="socialIcon">
              <GrNotes className="sIcon Resume" />
              <span> Resume </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
