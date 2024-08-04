import "./Singlpost.scss";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { category } from "../../assets/data";

// Function to remove HTML tags and return plain text
const removeHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const Singlpost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useContext(Context);

  const [singlepost, setSinglepost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // HTML content
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState(""); // Single tag
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts/single/${path}`);
        console.log(res.data);
        setSinglepost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc); // HTML content
        setSelectedTag(res.data.categories[0] || ""); // Assuming one category
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/posts/single/${path}`, {
        data: { userId: user._id },
      });
      window.location.replace("/");
      toast.success(`Post Deleted`, { duration: 5000 });
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(`${baseUrl}/api/posts/single/${path}`, {
        username: user.username,
        title,
        desc, // HTML content for storage
        categories: [selectedTag], // Single category
      });
      window.location.reload();
      toast.success(`Post Updated`, { duration: 5000 });
    } catch (err) {
      console.log("Error updating post:", err);
      toast.error(`Error updating post: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag); // Only one tag can be selected
  };

  const date = new Date(singlepost.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="singlepost">
      <div className="postImg">
        <h1>{singlepost.title}</h1>
        <div className="tags">
          {singlepost.categories && singlepost.categories.map((cat) => (
            <span key={cat} className="tag">{cat}</span>
          ))}
        </div>
        <img src={singlepost.photo} alt="" />
      </div>

      {updateMode ? (
        <>
          <div className="tags">
            <span>Tags:</span>
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
          <hr />
          <div className="postDesc">
            <div dangerouslySetInnerHTML={{ __html: singlepost.desc }} />
          </div>
        </>
      )}

      {updateMode && (
        <div className="textarea">
          <textarea
            placeholder="write your blog..."
            type="text"
            value={removeHtmlTags(desc)} // Strip HTML tags for editing
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Singlpost;
