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
    websiteURL: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    date: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Clients = mongoose.model("Clients", clientSchema);
