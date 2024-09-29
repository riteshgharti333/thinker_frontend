import { useContext, useState } from "react";
import "./ResetPassword.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../main";
import { Context } from "../../context/Context";

const ResetPassword = () => {
  const { id, token } = useParams(); // Get id and token from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useContext(Context);

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    let validationErrors = {};
    if (newPassword.length < 6) {
      validationErrors.newPassword =
        "Password must be at least 6 characters long";
    }
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/password/reset-password/${id}/${token}`,
        {
          password: newPassword,
        }
      );
      console.log(response.data);
      toast.success("Password changed successfully");
      if(user){
        navigate("/profile");
      }else{
        navigate("/login");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Error changing password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="resetPassword">
      {!user && (
        <div className="logo">
          <h1>
            Thinker<span>.</span>
          </h1>
        </div>
      )}
      <div className="updatePasswordBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
      </div>
      <div className="updatePasswordContainer card-bg">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="formData">
            <label htmlFor="newPassword">Add New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Add New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && (
              <p className="formError">{errors.newPassword}</p>
            )}
          </div>
          <div className="formData">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="formError">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
