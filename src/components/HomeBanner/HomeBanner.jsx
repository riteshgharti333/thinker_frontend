import './HomeBanner.scss'
import hp from "../../assets/images/hp.jpg"
import girl from "../../assets/images/girl.png"
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomeBanner = () => {
  return (
    <div className='homeBanner'>  
      <div className="bgImg">
        <img src={hp} alt="" />
        <div className="homeInfo">
            <div className="left">
            <h1>Embark on a journey where every pixel promises discovery. Explore <span className='logo'>Thinker.</span> </h1>
            <Link to={"/write"}>
            <button> <FaPen className='pen' /> Write</button>
            </Link>
            </div>
          <div className="right">
          <img src={girl} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
