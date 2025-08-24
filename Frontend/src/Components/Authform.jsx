import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Authform() {
  const [signup, setsignup] = useState(true);
  const [formdata,setformdata] = useState({name:"", email:"", password:""})
  const [error, seterror] = useState({name:"", email:"", password:""})
  const URL = import.meta.env.VITE_BASEURL
  const navigate = useNavigate()

  const handleChange = (e)=>{
setformdata({...formdata,[e.target.name]:e.target.value})
  }

  const validation =()=>{
  const  nameRegex = /^[a-zA-Z\s]{2,50}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
  const newError = {
  name: "",
  email: "",
  password: ""
  }

  if(!formdata.name && signup){
      newError.name="Name Required"
  }else if(!nameRegex.test(formdata.name) && signup){
    newError.name = "Name should contain only letters and spaces (2-50 characters)"
  }
  
  if(!formdata.email && signup){
      newError.email="Email Required"
  }else if(!emailRegex.test(formdata.email) && signup){
    newError.email = "Provide a valid email format"
  }
  if(!formdata.password && signup){
      newError.password="Password Required"
  }else if(!passwordRegex.test(formdata.password) && signup){
    newError.password = "Password must include uppercase, lowercase, number, and special character"
  }

  seterror(newError)
return Object.values(newError).every(error => error === "")

  }
  
const handleSubmit = async (e)=>{
    try {
        e.preventDefault()
        const isValid =  validation()
        if(!isValid) return
        const endPoint = signup ? "/auth/signup" : "/auth/login"        
        const res = await axios.post(`${URL}${endPoint}`,formdata,{withCredentials:true})  
        if(res.status === 201){                  
        setformdata({name:"", email:"", password:""})  
        setsignup(false)           
        }        
        if(res.status === 200){  
          const user = res.data.data           
          if(user.role === "user"){
            navigate("/")
          }   
          else{
            navigate("/admin")
          }
        }
    } catch (error) {
        
    }
}




  return (
    <>
      <div className=" py-3 flex flex-col items-center gap-3">
        <p className="text-2xl fw-bolder">{signup ? "Sign up" : "Login"}</p>

        {signup ? (
          <label htmlFor="">
            <p>Username</p>
            <input 
            className=" w-50 border rounded px-1" 
            type="text" 
            name="name" 
            value={formdata.name}
            onChange={handleChange} />
          </label>
        ) : (
          ""
        )}
        {error.name && (
  <p className="text-red-500 text-sm mt-1">{error.name}</p>
)}
        <label htmlFor="">
          <p>email</p>
          <input 
          className=" w-50 border rounded px-1" 
          type="email" 
          name="email" 
          value={formdata.email}
          onChange={handleChange} />
        </label>

{error.email && (
  <p className="text-red-500 text-sm mt-1">{error.email}</p>
)}

        <label htmlFor="">
          <p>Password</p>
          <input 
          className=" w-50 border rounded px-1" 
          type="password" 
          name="password" 
          value={formdata.password}
          onChange={handleChange} />
        </label>

{error.password && (
  <p className="text-red-500 text-sm mt-1">{error.password}</p>
)}

        <button onClick={(e)=>handleSubmit(e)} className="bg-black text-white w-[150px] border rounded hover:bg-white hover:text-black">
          {signup ? "Sign Up" : "Login"}
        </button>
        <p>
          {" "}
          {signup ? "Already have an Account?" : "Create an account?"}{" "}
          <button onClick={() => setsignup(!signup)}>
            {signup ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </>
  );
}
