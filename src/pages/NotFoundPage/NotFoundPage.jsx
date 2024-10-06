import './NotFoundPage.scss'
import bnf from "../../assets/images/bnf.png"
import smnf from "../../assets/images/smnf.png"
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'


const NotFoundPage = () => {

  const isSm = useMediaQuery("(max-width: 480px)");


  return (
    <div className='notfound'>
      <div className="notfoundImg">
        {isSm ?  <img src={smnf} alt="" /> :  <img src={bnf} alt="" />}
       
        <h1 className='notfoundTitle'>404</h1>
        <div className="notfoundInfo">
          <h1 className='notfoundesc'>Oops! Looks like this page is lost.<span> We couldn’t find the page you were looking for.</span> </h1>
          <button><Link to={"/"}>
          Go to Homepage
          </Link></button>
        </div>

      </div>
      </div>

     
  )
}

export default NotFoundPage
