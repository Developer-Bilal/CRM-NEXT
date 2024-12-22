import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    client: {
      type: String,
      // required: true,
    },
    developer: {
      type: String,
      // required: true,
    },
    manager: {
      type: String,
      // required: true,
    },
    startDate: {
      type: String,
      // required: true,
    },
    deadline: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    priorityLevel: {
      type: String,
      // required: true,
    },
    budget: {
      type: String,
      // required: true,
    },
    billing: {
      type: String,
      // required: true,
    },
    requirements: {
      type: String,
      // required: true,
    },
    milestones: {
      type: String,
      // required: true,
    },
    progressTracker: {
      type: String,
      // required: true,
    },
    notes: {
      type: String,
      // required: true,
    },
    relatedDocuments: {
      type: String,
      // required: true,
    },
    communicationHistory: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Projects = mongoose.model("Projects", projectSchema);
