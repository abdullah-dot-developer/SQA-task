import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "./components/Modal";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchLastImage = async () => {
      try {
        const { data } = await axios.get(
          "https://sqa-task.onrender.com/api/image/last"
        );

        if (data.success) {
          setSelectedFile(data);
          setFileName(data.fileName);
        } else {
          setSelectedFile(null);
          setFileName("");
        }
      } catch (error) {
        console.error("Error fetching last image:", error);
        setSelectedFile(null);
        setFileName("");
      }
    };

    fetchLastImage();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setSelectedFile(reader.result);
        setFileName(file.name);
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://sqa-task.onrender.com/api/image/delete-image/${selectedFile?.id}`
      );

      if (res?.data?.success) {
        setSelectedFile(null);
        setFileName("");
        fileInputRef.current.value = "";
      }
      toast.success("Image Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    }
  };

  return (
    <div
      className={`w-full h-[100vh] fixed top-0 left-0 ${
        open && "bg-opacity-50 bg-black"
      }`}
    >
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />}
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          logo={selectedFile}
          fileName={fileName}
          setSelectedFile={setSelectedFile}
          setFileName={setFileName}
        />
      )}
      <div
        className={`flex items-center justify-center w-full m-auto gap-2 pt-72 `}
      >
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <button
            className={`flex items-center px-4 py-3 border border-gray-200 rounded-lg gap-2 shadow-md mt-4 ${
              fileName && "cursor-not-allowed"
            }`}
            onClick={() => fileInputRef?.current?.click()}
            disabled={fileName}
          >
            <FiUpload />
            <p>{fileName || "Upload Logo"}</p>
          </button>

          {selectedFile && (
            <button
              className="flex items-center mt-3 p-2 hover:bg-gray-50 rounded-md"
              onClick={handleDelete}
            >
              <IoTrashOutline size={25} className=" text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
