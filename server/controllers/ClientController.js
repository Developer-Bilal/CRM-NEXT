import { Clients } from "../models/ClientModel.js";

// GET clients
export const getClients = async (req, res) => {
  try {
    const clients = await Clients.find({});
    return res.status(200).json({ count: clients.length, data: clients });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// CREATE client
export const createClient = async (req, res) => {
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
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const client = await Clients.create({
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
    return res.status(200).json({ message: "created sucessfully" });
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
    return res.status(200).json({ message: "Success!", data: client });
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
