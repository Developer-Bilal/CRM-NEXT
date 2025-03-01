import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  getUserClients,
  updateClient,
} from "../controllers/ClientController.js";
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

const ClientRouter = Router();

ClientRouter.get("/auth/:user", getUserClients);

ClientRouter.get("/", getClients).post(
  "/",
  upload.single("profilePhoto"),
  createClient
);

ClientRouter.get("/:id", getClient)
  .patch("/:id", updateClient)
  .delete("/:id", deleteClient);

export default ClientRouter;
