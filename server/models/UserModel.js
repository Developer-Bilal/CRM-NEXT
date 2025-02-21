import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model("Users", userSchema);
