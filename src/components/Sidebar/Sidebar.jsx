import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {

  const tags = ['Personal', 'Foods', 'Travel', 'Health', 'Lifestyle', 'Sports', 'Tech', 'Science', 'Movies'];

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <div className='sidebar'>
      <p className='sidebarHeader'>About Me</p>
      <div className="sidebarImg">
        <img src="https://w0.peakpx.com/wallpaper/86/560/HD-wallpaper-i-m-groot-newyear19-marvel-imgroot-thumbnail.jpg" alt="" />
      </div>
      <div className="aboutMe">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellendus quod dolor pariatur incidunt illum voluptas quas corporis saepe tempora itaque ex, impedit quisquam perspiciatis suscipit, laborum laudantium. Quod quia ipsam et doloremque obcaecati blanditiis id placeat quidem. Fugiat, nihil!
        </p>
      </div>
      <p className='sidebarHeader'>Categories</p>
      <div className="categories">
        {tags.map((tag) => (
          <Link key={tag} to={`/posts?cat=${tag}`}  onClick={handleLinkClick}>
            <span>{tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
