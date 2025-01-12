import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const Modal = ({
  open,
  setOpen,
  logo,
  fileName,
  setSelectedFile,
  setFileName,
}) => {
  const [opacity, setOpacity] = useState(80);
  const [position, setPosition] = useState(0);

  const handleSliderChange = (e) => {
    setOpacity(e.target.value);
  };

  const saveImage = async () => {
    try {
      const { data } = await axios.post(
        "https://sqa-task.onrender.com/api/image/save",
        {
          image: logo,
          fileName,
        }
      );
      if (data.success) {
        toast.success("Image Saved Successfully!");
      }
      if (data.image) {
        setSelectedFile(data);
        setFileName(data?.fileName);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setFileName("");
    setOpen(false);
  };

  const positionClass = (pos) => {
    const positions = {
      0: "top-0 left-0 p-2",
      1: "top-0 left-1/2 -translate-x-1/2 p-2",
      2: "top-0 right-0 p-2",
      3: "top-1/2 left-0 -translate-y-1/2 p-2",
      4: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2",
      5: "top-1/2 right-0 -translate-y-1/2 p-2",
      6: "bottom-0 left-0 p-2",
      7: "bottom-0 left-1/2 -translate-x-1/2 p-2",
      8: "bottom-0 right-0 p-2",
    };
    return positions[pos];
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%]  bg-white rounded-3xl shadow-xl px-10 pt-10 pb-[4.6rem] z-50">
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-4xl font-semibold text-gray-800 opacity-90">
          Watermark
        </h1>
        <MdClose
          size={35}
          className="text-gray-500 cursor-pointer"
          onClick={handleClose}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.6fr,1fr,0.7fr] gap-8 h-[75%]">
        <div className="flex flex-col items-center justify-end h-[500px] w-[300px] lg:w-full lg:h-full">
          <p className="text-3xl text-center font-[500] opacity-90 pb-5">
            Portrait
          </p>
          <div className="p-3 h-[85%] w-full bg-cyan-50 rounded-xl relative">
            <img
              src={logo}
              alt="Portrait Watermark"
              className={`w-[35%] object-contain absolute ${positionClass(
                position
              )}`}
              style={{ opacity: opacity / 100 }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-end h-[500px] w-[500px] lg:w-full lg:h-full">
          <p className="text-3xl text-center font-[500] opacity-90 pb-5">
            Landscape
          </p>
          <div className="p-3 w-full h-[55%] bg-cyan-50 rounded-xl relative">
            <img
              src={logo}
              alt="Portrait Watermark"
              className={`w-[20%] object-contain absolute ${positionClass(
                position
              )}`}
              style={{ opacity: opacity / 100 }} //means if 100/100 is 1 or 80/100 = 0.8
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-3xl font-[500] opacity-90 py-5">Positions</p>
          <div className="grid grid-cols-3 gap-y-3 w-64 pb-6">
            {[...Array(9)].map((_, idx) => (
              <button
                key={idx}
                className={`flex h-[70px] w-[70px] items-center justify-center rounded-lg border-2 border-dashed ${
                  position === idx && "border-[#6c4bff]"
                }`}
                onClick={() => setPosition(idx)}
              >
                <LuPlus
                  className={`w-full h-full ${
                    position === idx ? "text-[#6c4cfa]" : "text-white"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-3xl font-[500] opacity-90 py-5">Opacity</p>
          {/* Slider */}
          <div className="flex items-center justify-between gap-8 pt-3">
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-50 rounded-full appearance-none focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #6C4CFF ${opacity}%, #E5E7EB ${opacity}%)`,
                }}
              />
              {/* Thumb styling is in index.css */}
            </div>
            <div className="text-2xl font-medium text-gray-900">{opacity}</div>
          </div>
          <button
            className="bg-[#6c4bff] text-white rounded-xl w-full mt-16 flex items-center justify-center py-4 gap-3 mb-6 lg:mb-0"
            onClick={saveImage}
          >
            <IoSaveOutline size={25} />
            <span className="text-2xl">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
