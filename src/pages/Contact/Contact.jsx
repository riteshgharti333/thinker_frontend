import "./Contact.scss";
import { IoMdMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      toast.success("Message Send Successfuly");
    }
  };

  return (
    <div className="contact">
      <div className="contactContainer">
        <h1>Contact Me</h1>
        <div className="contactPart">
          <form className="contactLeft" target="_blank" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea
              name="message"
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
