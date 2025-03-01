import { Clients } from "../models/ClientModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";
config();
// GET clients
export const getClients = async (req, res) => {
  try {
    const clients = await Clients.find({});
    return res.status(200).json(clients);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET User Client
export const getUserClients = async (req, res) => {
  const { user } = req.params;
  try {
    const clients = await Clients.find({ addedBy: `${user}` });
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE client
export const createClient = async (req, res) => {
  const {
    name = "",
    email = "",
    phone = "",
    country = "",
    source = "",
    websiteURL = "",
    linkedin = "",
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

    const file = req.file;
    let uploadResult = "";

    if (file) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });

      uploadResult = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });

      fs.unlinkSync(file.path);
    }

    const client = await Clients.create({
      name,
      email,
      profilePhoto: uploadResult.url,
      phone,
      country,
      source,
      websiteURL,
      linkedin,
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

// GET a client
export const getClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Clients.findById(id);
    return res.status(200).json(client);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE client
export const updateClient = async (req, res) => {
  const {
    name,
    email,
    profilePhoto,
    phone,
    country,
    source,
    websiteURL,
    linkedin,
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

    const client = await Clients.findByIdAndUpdate(id, {
      name,
      email,
      profilePhoto,
      phone,
      country,
      source,
      websiteURL,
      linkedin,
      date,
      additionalInfo,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE client
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Clients.findByIdAndDelete(id);
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
