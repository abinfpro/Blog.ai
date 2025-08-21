import React from 'react'
import Authform from './Components/Authform'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Homepage from './Pages/UserPages/HomePage'
import Protectedroute from './Components/Protectedroute'
import AddBlog from './Pages/UserPages/AddBlog'
import Profile from './Pages/UserPages/Profile'
export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path='/auth' element={<Authform/>}></Route>
<Route element={<Protectedroute/>} >
      <Route path='/' element={<Homepage/>} ></Route>
      <Route path='/addblog' element={<AddBlog/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
</Route>
    </Routes>
    </BrowserRouter>
  )
}
