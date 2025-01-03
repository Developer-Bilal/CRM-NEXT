import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../controllers/ClientController.js";

const ClientRouter = Router();

ClientRouter.get("/", getClients).post("/", createClient);

ClientRouter.get("/:id", getClient)
  .patch("/:id", updateClient)
  .delete("/:id", deleteClient);

export default ClientRouter;
