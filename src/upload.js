import axios from "axios";
const cloudName = "ddmucrojh";
const unsignedUploadPreset = "wedxuzli";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);
  formData.append("folder", "thinker");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Upload failed");
  }
};

export default uploadToCloudinary;
