import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <div className=' bg-gradient-to-r from-teal-800 to-gray-900 text-white py-10 flex justify-around w-[100%] '>
        <span className='text-2xl' >Blog.ai</span>
        <div className='flex justify-between gap-5'>
        <NavLink to="/" className="hover:text-teal-300">Home</NavLink>
        <NavLink to="/addblog" className="hover:text-teal-300">Add Blog</NavLink>
        <NavLink to="/profile" className="hover:text-teal-300">Profile</NavLink>
        </div>
        <button>Logout</button>
    </div>
    </>
  )
}
