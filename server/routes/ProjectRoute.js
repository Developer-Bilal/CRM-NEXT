import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/ProjectController.js";

const ProjectRouter = Router();

ProjectRouter.get("/", getProjects);

ProjectRouter.get("/:id", getProject);

ProjectRouter.post("/create", createProject);

ProjectRouter.put("/update/:id", updateProject);

ProjectRouter.delete("/delete/:id", deleteProject);

export default ProjectRouter;
