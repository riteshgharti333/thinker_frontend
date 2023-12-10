import React, { useState } from "react";
import "./Register.scss";
import { Link, Navigate } from "react-router-dom";
import { BiSolidLock, BiSolidUser, BiShow, BiHide } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/index";
import { baseUrl } from "../../main";
import axios from 'axios';
import toast from "react-hot-toast";

const initialvalues = {
  username: "",
  email: "",
  password: "",
  // confirm_password: "",
};

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
        const res = await axios.post(`${baseUrl}/api/auth/register`, values);
        res.data && window.location.replace("/login");
        toast.success(res.data.message);
        console.log(res.data.message)
        } catch (error) {
          console.log(error)
        }
      },
    });

  return (
    <div className="register">
      <div className="top">
      </div>
      <form className="input" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="inputValid">
          <div className="inputType">
            <BiSolidUser className="inputIcon" />
            <input
              type="text"
              autoComplete="off"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.username && touched.username ? (
            <p className="formError">{errors.username}</p>
          ) : null}
        </div>

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
              autoComplete="off"
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

        {/* <div className="inputValid">
          <div className="inputType">
            <BiSolidLock className="inputIcon" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              autoComplete="off"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.confirm_password && touched.confirm_password ? (
            <p className="formError">{errors.confirm_password}</p>
          ) : null}
        </div> */}

        <button className="registerButton" type="submit">
          Sign Up
        </button>
        <span>
          Already have an account?{" "}
          <span className="loginLink">
            <Link to="/login"> Login</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
