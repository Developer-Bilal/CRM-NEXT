import { Router } from "express";
import {
  createDeveloper,
  deleteDeveloper,
  getDeveloper,
  getDevelopers,
  updateDeveloper,
} from "../controllers/DeveloperController.js";

const DeveloperRoute = Router();

DeveloperRoute.get("/", getDevelopers).post("/", createDeveloper);

DeveloperRoute.get("/:id", getDeveloper)
  .patch("/:id", updateDeveloper)
  .delete("/:id", deleteDeveloper);

export default DeveloperRoute;
