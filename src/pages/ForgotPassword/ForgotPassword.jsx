import "./ForgotPassword.scss";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../main";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/password/forgot-password`,
        {
          email,
        },
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong"); // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgotPassword">
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
      <div className="forgotPasswordInfo card-bg">
        <h2>Forgot Password?</h2>
        <p>
          Enter your email below, and we will send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
