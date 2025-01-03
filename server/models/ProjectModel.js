import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    client: {
      type: String,
    },
    developer: {
      type: String,
    },
    manager: {
      type: String,
    },
    startDate: {
      type: String,
    },
    deadline: {
      type: String,
    },
    status: {
      type: String,
    },
    priorityLevel: {
      type: String,
    },
    budget: {
      type: String,
    },
    billing: {
      type: String,
    },
    requirements: {
      type: String,
    },
    milestones: {
      type: String,
    },
    progressTracker: {
      type: String,
    },
    notes: {
      type: String,
    },
    relatedDocuments: {
      type: String,
    },
    communicationHistory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Projects = mongoose.model("Projects", projectSchema);
