import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePhoto: {
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
    websiteURL: {
      type: String,
      // required: true,
    },
    linkedin: {
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

export const Clients = mongoose.model("Clients", clientSchema);
