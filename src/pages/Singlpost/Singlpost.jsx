import "./Singlpost.scss";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";

const Singlpost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useContext(Context);

  const [singlepost, setSinglepost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    "Personal",
    "Foods",
    "Travel",
    "Health",
    "Lifestyle",
    "Sports",
    "Tech",
    "Science",
    "Movies",
  ];

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [tag];
      }
    });
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/${path}`);
        setSinglepost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setSelectedTags(res.data.categories || []);
      } catch (error) {}
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
      toast.success(`Post Deleted`, { duration: 5000 });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/api/posts/${path}`, {
        username: user.username,
        title,
        desc,
        categories: selectedTags,
      });
      window.location.reload();
      toast.success(`Post Updated`, { duration: 5000 });
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date(singlepost.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="singlepost">
      <div className="postImg">
        <img src={singlepost.photo} alt="" />
      </div>

      {updateMode ? (
        <>
          <div className="tags">
            <span>Tags : </span>
            <div className="tagsCat">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className={`tag ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <FaCheck className="rightIcon" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <CiCirclePlus className="plusIcon" />
            </label>

            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="cencel" onClick={() => setUpdateMode(false)}>
              Cencel
            </button>
            <button onClick={handleUpdate}>Publish</button>
          </div>
        </>
      ) : (
        <>
          <div className="singlePostInfo">
            <div className="userInfo">
              <span className="singlePostAuthor">
                Author: {singlepost.username}
              </span>
              <span className="date">Date: {date}</span>
            </div>
            <div className="userDoneIcon">
              {singlepost.username === user?.username && (
                <>
                  <div className="edit">
                    <FaEdit onClick={() => setUpdateMode(true)} />
                  </div>
                  <div className="delete">
                    <MdDelete onClick={handleDelete} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="postDesc">
            <h1>{singlepost.title} </h1>
            <span>{singlepost.categories}</span>
            <p>{singlepost.desc}</p>
          </div>
        </>
      )}

      {updateMode && (
        <div className="textarea">
          <textarea
            placeholder="write your blog..."
            type="text"
            value={desc}
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Singlpost;
