import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import axios from "axios";

export default function AddBlog() {
  const [data, setdata] = useState([])
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setformdata({ ...formdata, [e.target.name]: e.target.files[0] });
    } else {
      setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formdata.title);
    data.append("description", formdata.description);
    data.append("image", formdata.image);

    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = await axios.post("http://localhost:5000/blog/addblog", data);
      setdata(res.data.data);
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-6 p-17.5 items-start justify-center">
        {/* Left Section */}
        <div className="w-[40%] flex flex-col gap-5">
          <div className="w-full">
            <label className="flex flex-col text-gray-700 font-medium">
              Title:
              <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={(e) => handleChange(e)}
                className="mt-2 border rounded-lg w-full h-12 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </label>
          </div>
          <div className="w-full">
            <label className="flex flex-col text-gray-700 font-medium">
              Description:
              <textarea
                name="description"
                onChange={(e) => handleChange(e)}
                className="mt-2 border rounded-lg w-full h-32 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
              ></textarea>
            </label>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-[40%] border rounded-lg h-[300px] bg-gray-50 p-4 gap-3">
          <input
            type="file"
            name="image"
            // value={formdata.image}
            onChange={(e) => handleChange(e)}
            className="w-full h-[1000px] border rounded-lg px-3 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <img
            className="object-contain rounded w-full h-[200px]"
            src={formdata.image ? URL.createObjectURL(formdata.image) : ""}
            alt="Preview"
          />
        </div>
      </div>

      {/* Button */}
      <div className="w-full my-4 flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-80 py-2 border rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
        >
          Add
        </button>
      </div>
      <Footer />
    </>
  );
}
