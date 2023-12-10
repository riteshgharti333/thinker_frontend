import { useContext } from 'react'
import './Profile.scss'
import { Context } from '../../context/Context'

const Profile = () => {

  const {user} = useContext(Context)
  console.log(user);

  return (
    <div className="profile">
      <div className="profileContainer">
      <h1>Profile Settings</h1>
       <div className="profileSmContainer">
          <div className="userImg">
            <img src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="" />
          </div>
          <div className="userInfo">
            <div className="userSmInfo">
              <label htmlFor="username">Username</label>
              <span>Ritesh</span>
            </div>
            <div className="userSmInfo">
              <label htmlFor="email">Email</label>
              <span>r@gmail.com</span>
            </div>

            <div className="userSmInfo">
              <label htmlFor="password">Password</label>
              <span>123456</span>
            </div>
          </div>
        </div>
       </div>

      </div>
  );
}

export default Profile
