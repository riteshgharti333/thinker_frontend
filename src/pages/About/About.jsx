import "./About.scss";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import aboutImg from "../../assets/images/about.png";

const About = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <div className="aboutLeft">
          <img src={aboutImg} alt="" />
        </div>
        <div className="aboutRight">
          <div className="heading">
            <h1>ABOUT ME</h1>
          </div>
          <div className="aboutInfo">
            <p>
              Hey there! 👋 I'm Ritesh, your friendly neighborhood full-stack
              developer 🚀. Obsessed with turning ideas into lines of code, I
              dance between front-end finesse and back-end wizardry with pure
              joy. 💻 Problem-solving is my superpower, and I thrive on the
              thrill of overcoming coding challenges. Always eager to learn and
              explore new tech horizons 🌐, I'm on a mission to create digital
              magic while sipping on endless cups of coffee ☕. Let's code and
              conquer the tech world together! 🚀🌟
            </p>

            <div className="socialIcon">
              {/* <div className="icons"> */}
                <a className="icons" href="https://github.com/riteshgharti333">
                  <FaGithub className="sIcon" />
                  <span>GITHUB</span>
                </a>
              {/* </div> */}

              {/* <div className="icons"> */}
                <a className="icons" href="https://www.linkedin.com/in/riteshgharti333">
                  <FaLinkedin className="sIcon" />
                  <span>LINKEDIN</span>
                </a>
              {/* </div> */}

              {/* <div className="icons">
                <GrNotes className="sIcon" />

                <span>RESUME</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
