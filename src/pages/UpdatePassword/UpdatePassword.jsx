import { useContext, useState } from "react";
import "./UpdatePassword.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import toast from "react-hot-toast";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";
import { updatePasswordSchema } from "../../schemas";
import { useFormik } from "formik";

const initialvalues = {
    currentPassword : "",
    newPassword : "",
    confirmPassword : "",
  };

const UpdatePassword = () => {

  const { user } = useContext(Context);


  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };



  const {values, errors, handleBlur, touched, handleChange, handleSubmit} = useFormik({
    initialValues: initialvalues,
    validationSchema: updatePasswordSchema,

    onSubmit: async (values) => {
      console.log("Helo")
      try {
        const response = await axios.put(`${baseUrl}/api/changepassword/${user._id}`, values);
        console.log(response.data);
        res.data && window.location.replace("/profile");
        toast.success("Password changed successfully");
      } catch (error) {
        console.error("Error changing password:", error);
        toast.error(error.response.data.message);
        console.log(error.response.data.message)
      }
    }
  })

  return (
    <div className="updatePassword">
      <div className="updatePasswordBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
      </div>
      <div className="updatePasswordContainer">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="formData">
            <label htmlFor="">Add Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Add Current Password"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {errors.currentPassword && touched.currentPassword ? (
            <p className="formError">{errors.currentPassword}</p>
          ) : null}
          </div>
          <div className="formData">
            <label htmlFor="">Add New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Add New Password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             {/* {errors.newPassword && touched.newPassword ? (
            <p className="formError">{errors.newPassword}</p>
          ) : null} */}
          </div>
          <div className="formData">
            <label htmlFor="">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             {errors.confirmPassword && touched.confirmPassword ? (
            <p className="formError">{errors.confirmPassword}</p>
          ) : null}
          </div>

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
