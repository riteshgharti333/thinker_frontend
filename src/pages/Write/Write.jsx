import './Write.scss'
import { CiCirclePlus } from "react-icons/ci";
import { Context } from '../../context/Context';
import uploadToCloudinary from '../../upload';
import { useContext, useState } from 'react';
import {baseUrl} from "../../main"
import axios from 'axios';

const Write = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    }
  

  if(file) {
    try { 
      const cloudinaryRespose = await uploadToCloudinary(file);
     
      newPost.photo = cloudinaryRespose.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  }
    try {
      const res = await axios.post(`${baseUrl}/api/posts`, newPost);
      const postId = res.data.savedPost._id;
      window.location.replace(`/posts/` + postId);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }



  

  return (
    <div className='write'>
      <div className="writeImg">
        {file ? (
          <img src={URL.createObjectURL(file)} alt="" />
        ) : (
          <>
          <img src="https://wallpaperaccess.com/thumb/10536532.jpg"  />
          </>
        )}
        
        </div>
      <form onSubmit={handleSubmit}>
        <div className="writeFormGroup">
        <label htmlFor="fileInput">
            <CiCirclePlus className='plusIcon'/>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
            <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
            
          />
        <button type='submit'>Publish</button>

        </div>
        <div className="textarea">
        <textarea
            placeholder="write your blog..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        </form>  
    </div>
  )
}

export default Write
