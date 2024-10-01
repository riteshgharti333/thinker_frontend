import "./Contact.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contactContainer">
        <h1>Contact Me</h1>
        <div className="contactPart">
          <form
            className="contactLeft"
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdSUNJf-jO1uFhU76lnZ8Q1ulgiRTL-TbEizLS2RdR5OuDupA/formResponse"
            method="POST"
            target="_blank"
          >
            <input
              type="text"
              name="entry.1234567890"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="entry.0987654321"
              placeholder="Email"
              required
            />
            <textarea
              name="entry.1122334455"
              cols="30"
              rows="6"
              placeholder="Message"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>

          <div className="contactRight">
            <div className="contactIcons">
              <div className="icons">
                <IoMdMail className="contactIcon" />
                <span>riteshgharti333@gmail.com</span>
              </div>
              <div className="icons">
                <IoCallSharp className="contactIcon" />
                <span> +91 123 000 333 </span>
              </div>
            </div>

            <hr className="lineborder" />
            <div className="socialIcons">
              <a
                className="socialIcon"
                href="https://github.com/riteshgharti333"
              >
                <FaGithub className="sIcon" />
                <span> Github </span>
              </a>

              <a
                className="socialIcon"
                href="https://www.linkedin.com/in/riteshgharti333"
              >
                <FaLinkedin className="sIcon Linkedin" />
                <span className="linkdin"> Linkedin </span>
              </a>

              {/* <div className="socialIcon">
              <GrNotes className="sIcon Resume" />
              <span> Resume </span>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
