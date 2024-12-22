import { Router } from "express";
import {
  createDeveloper,
  deleteDeveloper,
  getDeveloper,
  getDevelopers,
  updateDeveloper,
} from "../controllers/DeveloperController.js";

const DeveloperRoute = Router();

DeveloperRoute.get("/", getDevelopers);

DeveloperRoute.get("/:id", getDeveloper);

DeveloperRoute.post("/create", createDeveloper);

DeveloperRoute.put("/update/:id", updateDeveloper);

DeveloperRoute.delete("/delete/:id", deleteDeveloper);

export default DeveloperRoute;
