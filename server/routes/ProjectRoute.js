import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/ProjectController.js";

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

const ProjectRouter = Router();

ProjectRouter.get("/", getProjects).post(
  "/",
  upload.fields([
    { name: "relatedDocuments", maxCount: 1 },
    { name: "communicationHistory", maxCount: 1 },
  ]),
  createProject
);

ProjectRouter.get("/:id", getProject)
  .patch("/:id", updateProject)
  .delete("/:id", deleteProject);

export default ProjectRouter;
