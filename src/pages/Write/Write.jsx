import "./Write.scss";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { category } from "../../assets/data";
import { Context } from "../../context/Context";
import uploadToCloudinary from "../../upload";
import { FaCheck } from "react-icons/fa";
import dropImg from "../../assets/images/drop.png";
import { baseUrl } from "../../main";

const Write = () => {
  const { user, isFetching } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to remove HTML tags
  const removeHtmlTags = (html) => {
    const regex = /(<([^>]+)>)/ig;
    return html.replace(regex, "");
  };

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

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!file || selectedTags.length === 0 || !title || !desc) {
      let errorMessage = "Please fill in all the required fields.";

      if (!file) {
        errorMessage = "Please select an image.";
      } else if (selectedTags.length === 0) {
        errorMessage = "Please select at least one tag.";
      } else if (!title) {
        errorMessage = "Please enter a title.";
      } else if (!desc) {
        errorMessage = "Please enter a description.";
      }

      toast.error(errorMessage, { duration: 5000 });
      return;
    }

    setIsSubmitting(true); // Start submitting

    const newPost = {
      userId: user._id,
      username: user.username,
      title,
      desc: removeHtmlTags(desc), // Remove HTML tags from description
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
      const res = await axios.post(`${baseUrl}/api/posts`, newPost);
      const loadingToast = toast.loading("Creating Post...");
      toast.dismiss(loadingToast.id);
      const postId = res.data.savedPost._id;
      window.location.replace(`/posts/` + postId);
      toast.success("Post Created", { duration: 5000 });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Could not create the post.");
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

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
            placeholder="Title"
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
          <ReactQuill
            className="editor"
            theme="snow"
            value={desc}
            placeholder="write your blog..."
            onChange={(content) => setDesc(content)}
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
