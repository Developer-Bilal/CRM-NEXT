import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.get("/", getUsers).post("/", createUser);

UserRouter.get("/:id", getUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export default UserRouter;
