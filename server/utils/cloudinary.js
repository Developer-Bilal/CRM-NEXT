import { v2 as cloudinary } from "cloudinary";
// import { fs } from "fs";

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_SECRET,
});

/////////////////////////////////////////////////////

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const uploadResult = cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("file is uploaded!!!", uploadResult.url);
//     return uploadResult;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default cloudinary;
