import { useContext, useEffect, useState } from "react";
import "./PostUpdate.scss";
import { baseUrl } from "../../main";
import axios from "axios";
import { Context } from "../../context/Context";

const PostUpdate = ({
  showPopUp,
  updateTitle,
  updateDesc,
  authorName,
  postDate,
  postId
}) => {

  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setTitle(updateTitle);
    setDesc(updateDesc);
  }, [updateTitle, updateDesc]);


  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/api/posts/${postId}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      {showPopUp && (
        <div className="postUpdate">
          <div className="postUpdateContainer">
            <div className="userInfo">
              <div className="usersmInfo">
                <span className="singlePostAuthor">Author: {authorName}</span>
                <span className="date">Date: {postDate}</span>
              </div>

              <div className="buttons">
                <button onClick={() => showPopUp(false)}>Cencel</button>
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
            <form>
              <input
                type="text"
                className="singlePostTitleInput"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostUpdate;
