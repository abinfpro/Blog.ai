import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function viewBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;


  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/blog/deleteblog/${blog._id}`,
        { withCredentials: true })
        toast.success("Deleted Sucessfully")
        if(res.status == 200){
            navigate("/")
        }
    } catch (error) {}
  }



  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{blog.title}</h1>
        <p className="text-gray-600 mt-2">{blog.description}</p>

        <div className="flex gap-4 mt-6">
          <NavLink to={`/addblog`} state={{item:blog}} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Update  
          </NavLink>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
      <Footer />{" "}
    </>
  );
}
