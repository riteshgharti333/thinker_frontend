import "./Profile.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import uploadToCloudinary from "../../upload";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { signUpSchema } from "../../schemas/index";
import { useFormik } from "formik";
import { baseUrl } from "../../main";
import toast from "react-hot-toast";

const initialvalues = {
  profilename: "",
  profileemail: "",
  profilepassword: "",
  password: "",
};

export default function Profile() {
  const [file, setFile] = useState(null);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  // const handleSubmitForm = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "UPDATE_START" });

  //   const updatedUser = {
  //     userId: user._id,
  //     username,
  //     email,
  //     password,
  //   };
  //   if (file) {
  //     try {
  //       const cloudinaryResponse = await uploadToCloudinary(file);
  //       updatedUser.photo = cloudinaryResponse.secure_url;
  //     } catch (error) {
  //       console.error("Error uploading image to Cloudinary:", error);
  //     }
  //   }
  //   try {
  //     const res = await axios.put(
  //       `${process.env.REACT_APP_API_URL}users/` + user._id,
  //       updatedUser
  //     );
  //     setSuccess(true);
  //     dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
  //   } catch (err) {
  //     dispatch({ type: "UPDATE_FAILURE" });
  //   }
  // };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        console.log("hello");

        // dispatch({ type: "UPDATE_START" });
        console.log("hello");

        try {
          console.log("hello");

          // if (!password) {
          //   console.log("Current Password is empty!");
          //   toast.error("Current Password Required");
          // }

          // const res = await axios.post(`${baseUrl}/api/profile/${user._id}`, values);
          // toast.success(res.data.message);
          // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
          console.log("Error:", error);
        }
      },
    });

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {!file ? (
              <FaUser className="userIcon" />
            ) : (
              <img
                src={file ? URL.createObjectURL(file) : user.profilepic}
                alt=""
              />
            )}

            <label htmlFor="fileInput">
              <FaPlus className="plusIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="profilename"
            value={values.profilename}
            placeholder={user.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.profilename && touched.profilename ? (
            <p className="formError">{errors.profilename}</p>
          ) : null}

          <label>Email</label>
          <input
            type="email"
            name="profileemail"
            value={values.profileemail}
            placeholder={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.profileemail && touched.profileemail ? (
            <p className="formError">{errors.profileemail}</p>
          ) : null}
          <label>New Password</label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            name="profilepassword"
            value={values.profilepassword}
          />
          {errors.profilepassword && touched.profilepassword ? (
            <p className="formError">{errors.profilepassword}</p>
          ) : null}

          <label>Current Password</label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />

          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
}
