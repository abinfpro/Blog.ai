import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
  const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
  const res = await axios.post("http://localhost:5000/auth/logout",{},{withCredentials: true})  
  navigate("/auth")
    } catch (error) {
      
    }
  }
  

  return (
    <>
    <div className=' bg-gradient-to-r from-teal-800 to-gray-900 text-white py-10 flex justify-around w-[100%] '>
        <NavLink to={"/"} className='text-2xl' >Blog.ai</NavLink>
        <div className='flex justify-between gap-5'>
        <NavLink to="/" className="hover:text-teal-300">Home</NavLink>
        <NavLink to="/addblog" className="hover:text-teal-300">Add Blog</NavLink>
        <NavLink to="/profile" className="hover:text-teal-300">Profile</NavLink>
        </div>
        <button className='bg-black px-4 border rounded' onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}
