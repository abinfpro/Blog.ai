import { useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { useState } from "react";

export default function HomePage() {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog/getblog");
      console.log(res.data.data);
      setdata(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 h-screen sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id} // use unique id if possible
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blogs available
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
