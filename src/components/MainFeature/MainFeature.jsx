import './MainFeature.scss';
import {Link} from "react-router-dom";

const MainFeature = ({title,desc,photo,_id}) => {

  return (
    <Link to={`/posts/${_id}`}>
    <div className='mainFeature'>
     <div className="bgImg">
      <img src={photo} alt="" />
     </div>
     <div className="info">
       <span>Feature</span>
       <Link to={`/posts/${_id}`}>
       <h1>{title}</h1>
       </Link>
       <p>{desc}</p>
     </div>
    </div>
    </Link>
  )
}

export default MainFeature
