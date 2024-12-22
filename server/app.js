import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/UserRoute.js";
import ClientRouter from "./routes/ClientRoute.js";
import DeveloperRouter from "./routes/DeveloperRoute.js";
import ProjectRouter from "./routes/ProjectRoute.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/clients", ClientRouter);
app.use("/api/v1/developers", DeveloperRouter);
app.use("/api/v1/projects", ProjectRouter);

const start = async () => {
  const connectedDB = await mongoose.connect(process.env.MONGO_URI);

  if (!connectedDB) {
    console.log("Connection error");
  }
  console.log("Coonected to DB");
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
