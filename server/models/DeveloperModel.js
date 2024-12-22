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
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    source: {
      type: String,
      // required: true,
    },
    portfolioURL: {
      type: String,
      // required: true,
    },
    linkedin: {
      type: String,
      // required: true,
    },
    resumeFile: {
      type: String,
      // required: true,
    },
    profilePhoto: {
      type: String,
      // required: true,
    },
    date: {
      type: String,
      // required: true,
    },
    additionalInfo: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Developers = mongoose.model("Developers", developerSchema);
