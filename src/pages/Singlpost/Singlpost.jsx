import "./Singlpost.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";
import PostUpdate from "../../components/PostUpdate/PostUpdate";

const Singlpost = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  const [singlepost, setSinglepost] = useState({});

  const { user } = useContext(Context);


  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/${path}`);
        setSinglepost(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
      console.log("post deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const [showUpdate, setShowUpdate] = useState(false);

  const showPopUp = () => {
    setShowUpdate(true);
  };

 
  const date = new Date(singlepost.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });


  return (
    <div className="singlepost">
      <div className="postImg">
        <img src={singlepost.photo} alt="" />
      </div>
      <div className="singlePostInfo">
        <div className="userInfo">
          <span className="singlePostAuthor">
            Author: {singlepost.username}
          </span>
          <span className="date">
  Date: {date}
</span>

        </div>
        <div className="userDoneIcon">
          <div className="edit">
            <FaEdit onClick={showPopUp} />
          </div>
          <div className="delete">
            <MdDelete onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div className="postDesc">
        <h1>{singlepost.title} </h1>
        <p>{singlepost.desc}</p>
      </div>
      {showUpdate && (
        <PostUpdate
          showPopUp={setShowUpdate}
          updateTitle={singlepost.title}
          updateDesc={singlepost.desc}
          authorName={singlepost.username}
          postDate={date}
          postId={path}

        />
      )}
    </div>
  );
};

export default Singlpost;
