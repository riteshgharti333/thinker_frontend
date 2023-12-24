import { Link, useNavigate } from 'react-router-dom';
import Singlpost from '../../pages/Singlpost/Singlpost'
import Sidebar from '../Sidebar/Sidebar'
import './Single.scss'
import { IoMdArrowRoundBack } from "react-icons/io";


const Single = () => {

  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };


  return ( 
    <>
    <Link  to="#" onClick={goBack}>
    <IoMdArrowRoundBack className='back' />

    </Link>

    <div className='single'>
      <div className="singlepost">
      <Singlpost />
      </div>
      <div className="sidebar">
      <Sidebar />
      </div>
    </div>
    </>

  )
}

export default Single
