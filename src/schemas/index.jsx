import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).max(25).required("Please enter your password"),

  // // confirm_password:  Yup.string()
  // //   .required("Please enter your confirm password")
  // //   .oneOf([Yup.ref("password"), null], "Password must match"),

  // title: Yup.string().min(10).max(100).required("Please Add title"),
  // desc: Yup.string().min(10).max(100).required("Please Add Desc"),

  // // If these are for a different form, consider moving them to a separate Yup schema.
  // profilename: Yup.string().min(3).max(25),
  // profileemail: Yup.string().email(),
  // pfilepassword: Yup.string().min(6),
});
