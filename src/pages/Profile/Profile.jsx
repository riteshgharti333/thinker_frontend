import "./Profile.scss";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import profileImg from "../../assets/images/1.png";
import { baseUrl } from "../../main";
import toast from "react-hot-toast";
import uploadToCloudinary from "../../upload";
import { profileSchema } from "../../schemas";
import { useFormik } from "formik";

export default function Profile() {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/user/${user._id}/posts`);
        setPostCount(res.data.postCount);
      } catch (error) {
        console.log("Error fetching post count:", error);
      }
    };

    if (user) {
      fetchPostCount();
    }
  }, [user]);

  const initialValues = {
    username: user.username || "",
    email: user.email || "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: profileSchema,
      onSubmit: async (values) => {
        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
          userId: user._id,
          username: values.username,
          email: values.email,
          profilepic: user.profilepic,
        };

        if (file) {
          try {
            const cloudinaryResponse = await uploadToCloudinary(file);
            updatedUser.profilepic = cloudinaryResponse.secure_url;
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            toast.error("Failed to upload image");
            dispatch({ type: "UPDATE_FAILURE" });
            return;
          }
        }

        try {
          const res = await axios.put(
            `${baseUrl}/api/profile/${user._id}`,
            updatedUser
          );
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data.updatedUser });
          setUpdateMode(false);
          toast.success("Profile Updated");

          // Re-fetch updated user data
          const updatedUserData = await axios.get(
            `${baseUrl}/api/user/${user._id}`
          );
          dispatch({ type: "REFRESH_USER", payload: updatedUserData.data });
        } catch (error) {
          console.log("Error updating profile:", error);
          toast.error("Failed to update profile");
          dispatch({ type: "UPDATE_FAILURE" });
        }
      },
    });

  const handleEditClick = () => {
    setUpdateMode(!updateMode);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="settings">
      <div className="profileBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
      </div>
      <div className="settingsWrapper">
        <div className="settingsIcon">
          <span title="Delete Account">
            <FaRegTrashAlt />
          </span>
        </div>
        <div className="profileData">
          {updateMode ? (
            <form onSubmit={handleSubmit}>
              <div className="profileUpdatedImg">
                <input
                  type="file"
                  id="inputFile"
                  hidden
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="inputFile">
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="Profile" />
                  ) : (
                    <img src={user.profilepic || profileImg} alt="Profile" />
                  )}
                  <span>Update Profile</span>
                </label>
              </div>

              <div className="profileInputForm">
                <input
                  type="text"
                  placeholder="User Name"
                  name="username"
                  autoFocus={true}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username ? (
                  <p className="formError">{errors.username}</p>
                ) : null}
              </div>

              <div className="profileInputForm">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="formError">{errors.email}</p>
                ) : null}
              </div>

              <div className="postCount">
                <span>{postCount}</span>
                <span>Posts</span>
              </div>

              <div className="profileUpdateBtn">
                <button className="cancel" onClick={handleEditClick}>
                  Cancel
                </button>
                <button type="submit" disabled={isFetching}>
                  {isFetching ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="profileUpdatedImg">
                <img src={user.profilepic || profileImg} alt="Profile" />
              </div>
              <div className="profileName">
                <h3>{user.username}</h3>
              </div>
              <div className="ProfileEmail">
                <span>{user.email}</span>
              </div>

              <Link to={`/user/${user._id}/posts`}>
                <div className="postCount">
                  <span>{postCount}</span>
                  <span>Posts</span>
                </div>
              </Link>

              <div className="profileEditBtn">
                <button onClick={handleEditClick}>Edit</button>
                <div className="changePwd">
                  <Link to={"/changepassword"}>
                    <span className="changePwd">Change Password</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
