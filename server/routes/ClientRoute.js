import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../controllers/ClientController.js";

const ClientRouter = Router();

ClientRouter.get("/", getClients);

ClientRouter.get("/:id", getClient);

ClientRouter.post("/create", createClient);

ClientRouter.put("/update/:id", updateClient);

ClientRouter.delete("/delete/:id", deleteClient);

export default ClientRouter;
