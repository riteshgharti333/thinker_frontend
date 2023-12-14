import Singlpost from '../../pages/Singlpost/Singlpost'
import Sidebar from '../Sidebar/Sidebar'
import './Single.scss'

const Single = () => {
  return (
    <div className='single'>
      <div className="singlepost">
      <Singlpost />
      </div>
      <div className="sidebar">
      <Sidebar />
      </div>
    </div>
  )
}

export default Single
