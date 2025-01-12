import mongoose from "mongoose";

const imgSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imgSchema);

export default Image;
