import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className='sidebard'>
        <p className='siderbarHeader'>about us</p>
      <div className="sidebarImg">
        <img src="https://w0.peakpx.com/wallpaper/86/560/HD-wallpaper-i-m-groot-newyear19-marvel-imgroot-thumbnail.jpg" alt="" />
      </div>
      <div className="about">
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellendus quod dolor pariatur incidunt illum voluptas quas corporis saepe tempora itaque ex, impedit quisquam perspiciatis suscipit, laborum laudantium. Quod quia ipsam et doloremque obcaecati blanditiis id placeat quidem. Fugiat, nihil!
        </p>
      </div>
    <p className='siderbarHeader'>categories</p>
      <div className="categories">
        <span>sports</span>
        <span>movies</span>
        <span>travalling</span>
        <span>food</span>
        <span>web series</span>
        <span>news</span>
      </div>
    </div>
  )
}

export default Sidebar
