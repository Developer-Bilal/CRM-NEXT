import { Projects } from "../models/ProjectModel.js";

// GET Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({});
    return res.status(200).json({ count: projects.length, data: projects });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// CREATE Project
export const createProject = async (req, res) => {
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
  try {
    if (!title) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

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
      relatedDocuments,
      communicationHistory,
    });
    return res.status(200).json({ message: "created sucessfully" });
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
    return res.status(200).json({ message: "Success!", data: project });
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
