import "./SinglePost.scss";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { category } from "../../assets/data";
import { IoEyeSharp } from "react-icons/io5";
import { format } from "date-fns";
import JoditEditor from "jodit-react";
import { Skeleton } from "@mui/material";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const editor = useRef(null);

  const { user } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  const [singlepost, setSinglepost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // HTML content
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState(""); // Single tag
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseUrl}/api/posts/single/${path}`);
        setSinglepost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setSelectedTag(res.data.categories[0] || "");
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/posts/single/${path}`,
        {
          data: { userId: user._id },
        },
        {
          withCredentials: true,
        }
      );
      window.location.replace("/");
      toast.success(`Post Deleted`, { duration: 5000 });
    } catch (err) {
      console.log("Error deleting post:", err);
      toast.error(err.response.data.message);
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(
        `${baseUrl}/api/posts/single/${path}`,
        {
          username: user.username,
          title,
          desc,
          categories: [selectedTag],
        },
        {
          withCredentials: true,
        }
      );
      window.location.reload();
      toast.success(`Post Updated`, { duration: 5000 });
    } catch (err) {
      console.log("Error updating post:", err);
      toast.error(err.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : format(date, "dd MMM. yyyy");
  };

  const editorConfig = useMemo(() => {
    return {
      readonly: false,
      height: 500,
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" width="100%" height={40} />
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={40} />
        <Skeleton variant="ractangle" width="100%" height={300} />

        <Skeleton variant="text" width="100%" height={40} />
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={40} />

        <Skeleton variant="text" width="100%" height={40} />
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="text" width="30%" height={40} />
      </>
    );
  }

  return (
    <div className="singlepostContainer">
      <img src={singlepost.photo} alt="" />

      {updateMode ? (
        <>
          <div className="updateSingle">
            <p className="updateTag">Tags:</p>
            <div className="tagsCat">
              {category.map((tag) => (
                <div
                  key={tag}
                  className={`tag ${selectedTag === tag ? "selected" : ""}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                  {selectedTag === tag && <FaCheck className="rightIcon" />}
                </div>
              ))}
            </div>
          </div>

          <div className="writeFormGroup">
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="cancel" onClick={() => setUpdateMode(false)}>
              Cancel
            </button>
            <button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>

          <div className="textarea">
            <JoditEditor
              ref={editor}
              value={desc}
              config={editorConfig}
              onBlur={(newContent) => setDesc(newContent)}
              onChange={(newContent) => setDesc(newContent)}
            />
          </div>
        </>
      ) : (
        <>
          <h1>{singlepost.title}</h1>
          <div className="postTags">
            {singlepost.categories &&
              singlepost.categories.map((cat) => (
                <span key={cat} className="postTag">
                  {cat}
                </span>
              ))}
            <div className="views">
              <IoEyeSharp className="viewsIcon" />
              <p>{singlepost.views}</p>
            </div>
          </div>
          <div className="singlePostInfo">
            <div className="userInfo">
              <span className="singlePostAuthor">
                Author: {singlepost.username}
              </span>
              <span className="date">
                Date: {formatDate(singlepost.createdAt)}
              </span>
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
          <hr />
          <div className="postDesc">
            <div dangerouslySetInnerHTML={{ __html: singlepost.desc }} />
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
