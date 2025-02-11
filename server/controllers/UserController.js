import { Users } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";
config();

// GET users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// CREATE user
export const createUser = async (req, res) => {
  const {
    name = "",
    email = "",
    isAdmin = false,
    phone = "",
    country = "",
    profilePhoto = "",
    linkedin = "",
    additionalInfo = "",
    password = "",
  } = req.body;
  try {
    if (!name || !isAdmin || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    // Upload image
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });

    fs.unlinkSync(file.path);
    //
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const data = {
      name,
      isAdmin,
      email,
      phone,
      country,
      profilePhoto: uploadResult.url,
      linkedin,
      additionalInfo,
      password: hashedPass,
    };

    const user = await Users.create(data);
    return res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET a user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE user
export const updateUser = async (req, res) => {
  const {
    name,
    email,
    isAdmin,
    phone,
    country,
    profilePhoto,
    linkedin,
    additionalInfo,
    oldPassword,
    newPassword,
  } = req.body;

  const { id } = req.params;

  try {
    if (!name || !isAdmin || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const user = await Users.findById(id);
    let hashedPass = user.password;

    if (oldPassword && newPassword) {
      const match = await bcrypt.compare(oldPassword, user.password);

      if (!match) {
        return res.status(400).json({ message: "Incorrect Password" });
      }

      const salt = await bcrypt.genSalt(10);
      hashedPass = await bcrypt.hash(newPassword, salt);
    }

    const data = {
      name,
      email,
      isAdmin,
      phone,
      country,
      profilePhoto,
      linkedin,
      additionalInfo,
      password: hashedPass,
    };

    const updatedUser = await Users.findByIdAndUpdate(id, data);
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with id ${id} does not exist` });
    }
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
