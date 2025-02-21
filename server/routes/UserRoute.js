import { Router } from "express";
import {
  createUser,
  deleteUser,
  getSelectedUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
// import { upload } from "../middlewares/multer.middleware.js";/
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

const UserRouter = Router();

UserRouter.get("/auth/:user", getSelectedUsers);

UserRouter.get("/", getUsers).post(
  "/",
  upload.single("profilePhoto"),
  createUser
);

UserRouter.get("/:id", getUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default UserRouter;
