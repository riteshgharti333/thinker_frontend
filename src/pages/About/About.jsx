import "./About.scss";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

const About = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <div className="aboutLeft">
          <img
            src="https://images03.nicepage.com/a1389d7bc73adea1e1c1fb7e/97a14e38bdb25878b6d25e05/pexels-dazzle-jam-2020991.jpg"
            alt=""
          />
        </div>
        <div className="aboutRight">
          <div className="heading">
            <h1>ABOUT ME</h1>
          </div>
          <div className="aboutInfo">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              ratione aperiam alias minima qui blanditiis adipisci nihil
              voluptates! Hic ab soluta facere neque dignissimos assumenda
              molestias. Eius non architecto iure!
            </p>

            <div className="socialIcon">
              <div className="icons">
                <FaGithub className="sIcon"/>
                <span>GITHUB</span>
              </div>
              <div className="icons">
                <FaLinkedin className="sIcon"/>
                <span>LINKEDIN</span>
              </div>
              <div className="icons">
                <GrNotes className="sIcon" />

                <span>RESUME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
