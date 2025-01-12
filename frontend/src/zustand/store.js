import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;
export const useStore = create((set) => ({
  image: null,
  loading: true,
  message: null,
  imageFile: null,

  saveImg: async (image, fileName) => {
    try {
      const res = await axios.post("http://localhost:3000/api/image/save", {
        image,
        fileName,
      });
      //   console.log(res);
      set({
        loading: false,
        image: res?.data?.image,
        message: res?.data?.message,
        imageFile: res?.data?.fileName,
      });
    } catch (error) {
      console.log("Error Occured", error);
      set({
        loading: false,
        image: null,
        message: "Failed to save the image!",
      });
    }
  },
}));
