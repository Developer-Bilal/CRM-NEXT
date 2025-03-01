import mongoose from "mongoose";

const developerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    source: {
      type: String,
    },
    portfolioURL: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    resumeFile: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    date: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
    addedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Developers = mongoose.model("Developers", developerSchema);
