import "./Login.scss";
import { useContext, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Context } from "../../context/Context";
import { baseUrl } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const initialvalues = {
  email: "",
  password: "",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(Context);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: async (values) => {
        setIsSubmitting(true);
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post(`${baseUrl}/api/auth/login`, values);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          navigate("/");
          toast.success(`Welcome to Thinker.`);
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE" });
          toast.error(error.response.data);
        } finally {
          setIsSubmitting(false); 
        }
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="logo">
        <h1>
          Thinker<span>.</span>
        </h1>
      </div>

      <form className="input" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="inputValid">
          <div className="inputType">
            <IoMdMail className="inputIcon" />
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email ? (
            <p className="formError">{errors.email}</p>
          ) : null}
        </div>

        <div className="inputValid">
          <div className="inputType">
            <BiSolidLock className="inputIcon" />
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showPassword ? (
              <BiHide
                className="inputIcon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <BiShow
                className="inputIcon"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {errors.password && touched.password ? (
            <p className="formError">{errors.password}</p>
          ) : null}
        </div>

        <button className="loginButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <span className="forgot">
          <Link to="/forgot-password"> Forgot Password</Link>
        </span>

        <span>
          New to Thinker.
          <span className="signupLink">
            <Link to="/register"> Sign Up</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
