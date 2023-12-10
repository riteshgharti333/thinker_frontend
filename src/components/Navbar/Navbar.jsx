import { Link } from 'react-router-dom';
import './Navbar.scss'
import { FaUser } from "react-icons/fa";
import MobileBurger from '../MobileBurger/MobileBurger';

const Navbar = () => {
  return (
    <div className='nav'>
      <div className="left">
        <div className="logo">
          <Link to="/">
          <h1>Thinker<span>.</span></h1>
          </Link>
        </div>
      </div>

    <div className="hamburger">
      <MobileBurger />
    </div>

      <div className="right">
        <div className="links">
         <Link to={"/write"}>
         <span>Write</span>
         </Link>
         <Link>
         <span>About</span>

         </Link>
         <Link>
         <span>Contact</span>
         </Link>
        </div>
       <div className="userInfo">
        <Link to={"/login"}>
        <button>Login</button>
        </Link>
        <div className="user">
          <Link to={"/profile"}>
        <FaUser className='userIcon' />

          </Link>
        </div>
       </div>
      </div>
    </div>
  )
}

export default Navbar
