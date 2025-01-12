import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./util/dbConnect.js";
import imageRoutes from "./routes/image.route.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: "https://sqa-task-j1zz.vercel.app",
    credentials: true,
  })
);

app.use("/api/image", imageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  dbConnect();
  console.log("Server is listening on PORT: ", PORT);
});
