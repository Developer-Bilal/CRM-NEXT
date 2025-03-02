import { Projects } from "../models/ProjectModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";
config();

// GET Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({});
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET User Projects
export const getUserProjects = async (req, res) => {
  const { user } = req.params;
  try {
    const projects = await Projects.find({ addedBy: `${user}` });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE Project
export const createProject = async (req, res) => {
  const {
    title = "",
    description = "",
    client = "",
    developer = "",
    manager = "",
    startDate = "",
    deadline = "",
    status = "",
    priorityLevel = "",
    budget = "",
    billing = "",
    requirements = "",
    milestones = "",
    progressTracker = "",
    notes = "",
    relatedDocuments = "",
    communicationHistory = "",
    addedBy = "",
  } = req.body;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    // files upload
    let uploadResults = [];
    if (req.files) {
      // Extract all file arrays from req.files
      const fileArrays = Object.values(req.files);

      // Flatten the nested arrays into a single array of files
      const allFiles = fileArrays.flat();

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });

      // const uploadResult = await cloudinary.uploader.upload(req.files.path, {
      //   resource_type: "auto",
      // });

      // Iterate over files and upload each file to Cloudinary
      uploadResults = await Promise.all(
        allFiles.map((file) =>
          cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
          })
        )
      );

      // Remove the file from local storage
      allFiles.map((file) => fs.unlinkSync(file.path));
    }

    //

    const project = await Projects.create({
      title,
      description,
      client,
      developer,
      manager,
      startDate,
      deadline,
      status,
      priorityLevel,
      budget,
      billing,
      requirements,
      milestones,
      progressTracker,
      notes,
      relatedDocuments: uploadResults.length > 1 ? uploadResults[0].url : "",
      communicationHistory:
        uploadResults.length > 1 ? uploadResults[1].url : "",
      addedBy,
    });
    return res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET a Project
export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE Project
export const updateProject = async (req, res) => {
  const {
    title,
    description,
    client,
    developer,
    manager,
    startDate,
    deadline,
    status,
    priorityLevel,
    budget,
    billing,
    requirements,
    milestones,
    progressTracker,
    notes,
    relatedDocuments,
    communicationHistory,
  } = req.body;
  const { id } = req.params;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const project = await Projects.findByIdAndUpdate(id, {
      title,
      description,
      client,
      developer,
      manager,
      startDate,
      deadline,
      status,
      priorityLevel,
      budget,
      billing,
      requirements,
      milestones,
      progressTracker,
      notes,
      relatedDocuments,
      communicationHistory,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findByIdAndDelete(id);
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
