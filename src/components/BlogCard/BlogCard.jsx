import { Link } from 'react-router-dom'
import './BlogCard.scss'

const BlogCard = ({title,desc,image ,id}) => {
  return (
    <div className='blogcard'>
      <div className="cardImg">
        <img src={image} alt="" />
      </div>
      <div className="blogInfo">
      <Link to={`/posts/${id}`}>
        <h3>{title}</h3>
        </Link>
        <p>{desc}</p>
        <Link to={`/posts/${id}`}>
        <span>Read More...</span>
        </Link>
      </div>
    
    </div>
  )
}

export default BlogCard
