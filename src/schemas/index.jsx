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

  newPassword: Yup.string()
    .min(6)
    .max(25)
    .required("Please enter your new password"),

  confirmPassword: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});


export const WriteSchema = Yup.object({
  image: Yup.string().required("Please select an image."),
  tag: Yup.string().required("Please enter a tag."),
  title: Yup.string()
    .min(20, "Title must be at least 20 characters long.")
    .max(50, "Title cannot exceed 50 characters.")
    .required("Please enter a title."),
  desc: Yup.string()
    .min(30, "Description must be at least 30 characters long.")
    .required("Please enter a description."),
});
