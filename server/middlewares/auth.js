import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  //   console.log(token);
  if (!token) res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
