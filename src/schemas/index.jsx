import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).max(25).required("Please enter your password"),
});


export const profileSchema = Yup.object({
  username: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
});


export const updatePasswordSchema = Yup.object({

  // currentPassword: Yup.string().min(6).max(25).required("Please enter your password"),

  newPassword: Yup.string().min(6).max(25).required("Please enter your new password"),

  confirmPassword:  Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});