import express from "express";
import {
  deleteImage,
  getLastImage,
  saveImage,
} from "../controllers/image.controller.js";

const router = express.Router();

router.post("/save", saveImage);
router.get("/last", getLastImage);
router.delete("/delete-image/:id", deleteImage);

export default router;
