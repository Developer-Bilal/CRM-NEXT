import { Developers } from "../models/DeveloperModel.js";

// GET developers
export const getDevelopers = async (req, res) => {
  try {
    const developers = await Developers.find({});
    return res.status(200).json({ count: developers.length, data: developers });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// CREATE developer
export const createDeveloper = async (req, res) => {
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
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const developers = await Developers.create({
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
    return res.status(200).json({ message: "created sucessfully" });
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
    return res.status(200).json({ message: "Success!", data: developer });
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
