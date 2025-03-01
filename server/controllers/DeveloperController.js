import { Developers } from "../models/DeveloperModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";
config();

// GET developers
export const getDevelopers = async (req, res) => {
  try {
    const developers = await Developers.find({});
    return res.status(200).json(developers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET User Developers
export const getUserDevelopers = async (req, res) => {
  const { user } = req.params;
  try {
    const developers = await Developers.find({ addedBy: `${user}` });
    return res.status(200).json(developers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE developer
export const createDeveloper = async (req, res) => {
  const {
    name = "",
    email = "",
    role = "",
    phone = "",
    country = "",
    source = "",
    linkedin = "",
    portfolioURL = "",
    date = "",
    additionalInfo = "",
    addedBy = "",
  } = req.body;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    // Extract all file arrays from req.files
    const fileArrays = Object.values(req.files);

    // Flatten the nested arrays into a single array of files
    const allFiles = fileArrays.flat();

    // file upload
    if (!allFiles.length) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    // Iterate over files and upload each file to Cloudinary
    const uploadResults = await Promise.all(
      allFiles.map((file) =>
        cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        })
      )
    );

    // Remove the file from local storage
    allFiles.map((file) => fs.unlinkSync(file.path));

    const developers = await Developers.create({
      name,
      email,
      profilePhoto: uploadResults[0].url,
      role,
      phone,
      country,
      source,
      portfolioURL,
      linkedin,
      resumeFile: uploadResults[1].url,
      date,
      additionalInfo,
      addedBy,
    });
    return res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET a developer
export const getDeveloper = async (req, res) => {
  const { id } = req.params;
  try {
    const developer = await Developers.findById(id);
    return res.status(200).json(developer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE developer
export const updateDeveloper = async (req, res) => {
  const {
    name,
    email,
    role,
    phone,
    country,
    source,
    portfolioURL,
    linkedin,
    resumeFile,
    profilePhoto,
    date,
    additionalInfo,
  } = req.body;
  const { id } = req.params;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const developers = await Developers.findByIdAndUpdate(id, {
      name,
      email,
      role,
      phone,
      country,
      source,
      portfolioURL,
      linkedin,
      resumeFile,
      profilePhoto,
      date,
      additionalInfo,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE developer
export const deleteDeveloper = async (req, res) => {
  const { id } = req.params;
  try {
    const developer = await Developers.findByIdAndDelete(id);
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
