import { Users } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    password,
  } = req.body;

  const { id } = req.params;

  try {
    if (!name || !isAdmin || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
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
      password,
    };

    const user = await Users.findByIdAndUpdate(id, data);
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

export const signUpUser = async (req, res) => {
  console.log("signUpUser");

  const { name, email, password } = req.body;
  const admin = false;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    // hash password
    const salt = bcrypt.genSalt(10);
    const hashedpass = bcrypt.hash(password, salt);
    // create user
    const user = await Users.create({ name, admin, email, hashedpass });

    const { id } = user._id;
    // sign in user
    const myToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    return res.status(200).json({ token: myToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  console.log("signInUser");
  // get user credentials
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete credentials!" });
    }

    // try 1
    // const users = await Users.find({});
    // const found = users.filter((u) => u.email == email);

    // try 2
    const found = await Users.findOne({ email });

    if (!found) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // password hashing verify
    const isPass = await bcrypt.compare(password, found.password);

    if (!isPass) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // jsonwebtoken sign in function
    const { id } = found._id;

    const myToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ _id: found._id, email: found.email, token: myToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
