import React, { useState } from 'react'
import loginImage from '../assets/Images/loginImage.png'
import loginBackground from '../assets/Images/loginBackground.png'
import { FaRegEye } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {login} from '../services/operations/authAPI'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [formData, setformData] = useState({
      email:"",
      password:"",
  });

  const handleOnChange = (e)=>{
    setformData((prevData) =>({
      ...prevData, 
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    dispatch(login(formData.email,formData.password, navigate));
  }

  return (
  <div className='bg-richblack-900 mx-auto flex justify-center items-center w-full h-full mt-10'>
    <div className='flex justify-center items-center h-[100%] gap-10 w-5/6'>

      {/* Section1 */}
      <div className='flex justify-center items-start flex-col w-[40%] p-10'>
        <p className='text-3xl text-white font-bold '>Welcome Back</p>
        <p className='text-sm text-gray-300 mt-5'>Build skills for today, tomorrow, and beyond. <span className='font-edu text-blue-300'>Education to future-proof your career.</span></p>

        <form className='w-full' onSubmit={handleOnSubmit}>

          {/* <!-- Toggle Buttons --> */}
          <div class="flex justify-center space-x-4 mt-5 bg-slate-800 rounded-full p-1 w-1/2">
            <button type="button" className="px-4 py-2 rounded-full bg-slate-800 text-gray-200 text-sm hover:bg-gray-600 focus:text-white focus:bg-richblack-900" >Student</button>
            <button type="button" className="px-4 py-2 rounded-full bg-slate-800 text-gray-200 text-sm hover:bg-gray-600 focus:text-white focus:bg-richblack-900" >Instructors</button>
          </div>

          {/* <!-- Email Address --> */}
          <div>
            <label for="email" className="block text-sm mb-1 mt-5 text-white">Email Address <span class="text-red-500">*</span></label>
            <input type="email" id="email" value={formData.email} name="email" onChange={handleOnChange} placeholder="Enter email address" className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-b-[3px] border-gray-700" required/>
          </div>

          {/* <!-- Password --> */}
          <div>
            <label for="password" class="block text-sm mb-1 mt-5 text-white">Password <span class="text-red-500">*</span></label>

            <div class="relative">
              <input type="password" id="password" value={formData.password} name="password" onChange={handleOnChange} placeholder="Enter Password" class="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-b-[3px] border-gray-700" required/>
              <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-500 focus:outline-none" >
                <FaRegEye/>
              </button>
            </div>

            <div class="text-right mt-1"><a href="forgotPassword" class="text-sm text-blue-400 hover:underline">Forgot password</a></div>
          </div>

          {/* signin/login */}
          <div>
            <button type="submit" class="mt-10 w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Sign in</button>
          </div>
        </form>
      </div>

      {/* Section 2 */}
      <div className='w-[40%] h-fit flex justify-center items-center'>
        <div className='w-full h-max  relative'>
          <img src={loginBackground} alt="" className='absolute w-5/6 z-0 object-cover translate-x-4 translate-y-[-46%]'/>
          <img src={loginImage} alt="" className=' absolute w-5/6 z-10 object-cover translate-y-[-50%]'/>
        </div>
      </div>

    </div>
  </div>
  )
}

export default Login
