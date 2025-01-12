import { v2 as cloudinary } from "cloudinary";
import Image from "../models/image.model.js";

export const saveImage = async (req, res) => {
  try {
    let { image, fileName } = req.body;
    if (!image || !fileName) {
      return res
        .status(404)
        .json({ message: "Image not found!", success: false });
    }
    const uploadResponse = await cloudinary.uploader.upload(image, {
      public_id: `images/${fileName}`,
    });

    image = uploadResponse?.secure_url;

    const savedImage = new Image({
      fileName,
      image,
      public_id: uploadResponse.public_id,
    });

    await savedImage.save();

    return res.status(200).json({
      image,
      fileName,
      id: savedImage?._id,
      success: true,
    });
  } catch (error) {
    console.log("Error in uploading image: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getLastImage = async (req, res) => {
  try {
    const lastImage = await Image.findOne().sort({ createdAt: -1 });
    if (!lastImage) {
      return res
        .status(404)
        .json({ message: "No images found!", success: false });
    }

    return res.status(200).json({
      message: "Image retrieved successfully",
      image: lastImage.image,
      fileName: lastImage.fileName,
      id: lastImage._id,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting image: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    //Remove from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    //Remove from database
    await Image.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.log("Error in deleting image: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
