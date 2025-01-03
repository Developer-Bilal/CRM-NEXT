import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/ProjectController.js";

const ProjectRouter = Router();

ProjectRouter.get("/", getProjects).post("/", createProject);

ProjectRouter.get("/:id", getProject)
  .patch("/:id", updateProject)
  .delete("/:id", deleteProject);

export default ProjectRouter;
