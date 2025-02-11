import { Router } from "express";
import {
  createDeveloper,
  deleteDeveloper,
  getDeveloper,
  getDevelopers,
  updateDeveloper,
} from "../controllers/DeveloperController.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const DeveloperRoute = Router();

DeveloperRoute.get("/", getDevelopers).post(
  "/",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resumeFile", maxCount: 1 },
  ]),
  createDeveloper
);

DeveloperRoute.get("/:id", getDeveloper)
  .patch("/:id", updateDeveloper)
  .delete("/:id", deleteDeveloper);

export default DeveloperRoute;
