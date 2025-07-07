import "./Write.scss";
import { useContext, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { category } from "../../assets/data";
import { Context } from "../../context/Context";
import uploadToCloudinary from "../../upload";
import { FaCheck } from "react-icons/fa";
import dropImg from "../../assets/images/drop.png";
import { baseUrl } from "../../main";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

// Function to remove HTML tags and return plain text
const removeHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const Write = () => {
  const editor = useRef(null);

  const { user, isFetching } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // HTML content
  const [file, setFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleTagClick = (category) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(category)) {
        return prevSelectedTags.filter(
          (selectedTag) => selectedTag !== category
        );
      } else {
        return [category];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in when the Publish button is clicked
    if (!user) {
      toast.error("To write a post, you have to log in.");
      return; // Prevent submission if not logged in
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Extract plain text from HTML for validation
    const plainTextDesc = removeHtmlTags(desc);

    // Validation
    if (!file || selectedTags.length === 0 || !title || !plainTextDesc) {
      let errorMessage = "Please fill in all the required fields.";

      if (!file) {
        errorMessage = "Please select an image.";
      } else if (selectedTags.length === 0) {
        errorMessage = "Please select at least one tag.";
      } else if (!title) {
        errorMessage = "Please enter a title.";
      } else if (title.split(/\s+/).filter(Boolean).length < 30) {
        // Check for at least 5 words in title
        errorMessage = "Title must be at least 5 words long.";
      } else if (!plainTextDesc) {
        errorMessage = "Please enter a description.";
      } else if (plainTextDesc.split(/\s+/).filter(Boolean).length < 60) {
        // Check for at least 10 words in description
        errorMessage = "Description must be at least 10 words long.";
      }

      toast.error(errorMessage, { duration: 5000 });
      return;
    }

    setIsSubmitting(true); // Start submitting

    const newPost = {
      userId: user._id,
      username: user.username,
      title,
      desc,
      categories: selectedTags,
    };

    if (file) {
      try {
        const cloudinaryResponse = await uploadToCloudinary(file);
        newPost.photo = cloudinaryResponse.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        toast.error("Failed to upload image");
        setIsSubmitting(false); // Reset submission state
        return;
      }
    }
    try {
      const res = await axios.post(`${baseUrl}/api/posts`, newPost, {
        withCredentials: true,
      });
      const loadingToast = toast.loading("Creating Post...");
      toast.dismiss(loadingToast.id);
      const postId = res.data.savedPost._id;
      navigate(`/single/` + postId);
      toast.success("Post Created", { duration: 5000 });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const editorConfig = useMemo(() => {
    return {
      readonly: false, // Enable editing
      height: 500, // Set the desired height
    };
  }, []);

  return (
    <div className="write">
      <input
        type="file"
        id="inputFile"
        hidden
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="inputFile" className="dropSection">
        {file ? (
          <img
            className="uploadImg"
            src={URL.createObjectURL(file)}
            alt="Uploaded"
          />
        ) : (
          <div className="droparea">
            <img src={dropImg} alt="Drop area" />
            <p>Drag and Drop or click here to upload image</p>
            <span>Upload any images from desktop</span>
          </div>
        )}
      </label>

      <div className="tags">
        <span>Tags: </span>
        <div className="tagsCat">
          {category.map((cat) => (
            <div
              key={cat}
              className={`tag ${selectedTags.includes(cat) ? "selected" : ""}`}
              onClick={() => handleTagClick(cat)}
            >
              {cat}
              {selectedTags.includes(cat) && <FaCheck className="rightIcon" />}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title....."
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" disabled={isFetching || isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
        <div className="textarea">
          <JoditEditor
            className="editor"
            value={desc}
            ref={editor}
            config={editorConfig}
            tabIndex={1}
            onBlur={(newContent) => setDesc(newContent)}
            onChange={(newContent) => setDesc(newContent)}
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
