import BlogCards from '../../components/BlogCards/BlogCards.jsx'
import HomeBanner from '../../components/HomeBanner/HomeBanner.jsx'
import Sidebar from '../../components/Sidebar/Sidebar'
import  './Homepage.scss'

const Homepage = () => {
  return (
    <>
      <HomeBanner />
    <div className='homepage'>
      <div className="blog-container">
        <BlogCards />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div> 
    </div>
    </>

  )
}

export default Homepage
