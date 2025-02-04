import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import signupImage from '../assets/Images/signupImage.png';
import loginBackground from '../assets/Images/loginBackground.png';
import countryCode from '../data/countrycode.json';
import { sendOtp } from '../services/operations/authAPI';
import { toast } from 'react-hot-toast';

const ACCOUNT_TYPE = {
  STUDENT: 'Student',
  INSTRUCTOR: 'Instructor'
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    countryCode: countryCode[0].dial_code,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = { ...formData, accountType };

    await dispatch(sendOtp(formData.email, signupData, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      countryCode: countryCode[0].dial_code,
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div className='bg-richblack-900 flex justify-center items-center w-full min-h-screen py-10'>
      <div className='flex flex-wrap justify-center items-center gap-12 w-5/6'>
        
        {/* Left Section (Form) */}
        <div className='flex flex-col w-[40%] p-10 bg-gray-800 rounded-lg shadow-lg'>
          <p className='text-3xl text-white font-bold text-center'>Join StudyNotion for free</p>
          <p className='text-sm text-gray-300 mt-3 text-center'>
            Build skills for today, tomorrow, and beyond.{" "}
            <span className='font-semibold text-blue-300'>Future-proof your career.</span>
          </p>

          {/* Account Type Toggle */}
          <div className="flex justify-center space-x-4 mt-5 bg-gray-700 rounded-full p-1">
            <button type="button" onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
              className={`px-4 py-2 rounded-full ${accountType === ACCOUNT_TYPE.STUDENT ? 'bg-richblack-900 text-white' : 'bg-gray-700 text-gray-200'}`}>
              Student
            </button>
            <button type="button" onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
              className={`px-4 py-2 rounded-full ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'bg-richblack-900 text-white' : 'bg-gray-700 text-gray-200'}`}>
              Instructor
            </button>
          </div>

          <form className='w-full mt-5' onSubmit={handleOnSubmit}>
            {/* Name Fields */}
            <div className='flex gap-4'>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleOnChange}
                placeholder="First Name" className="w-1/2 px-4 py-3 rounded-md bg-gray-900 text-white" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleOnChange}
                placeholder="Last Name" className="w-1/2 px-4 py-3 rounded-md bg-gray-900 text-white" required />
            </div>

            {/* Email */}
            <input type="email" name="email" value={formData.email} onChange={handleOnChange}
              placeholder="Email Address" className="w-full px-4 py-3 mt-4 rounded-md bg-gray-900 text-white" required />

            {/* Contact Number */}
            <div className='flex gap-4 mt-4'>
              <select name="countryCode" value={formData.countryCode} onChange={handleOnChange}
                className='w-1/3 px-4 py-3 rounded-md bg-gray-900 text-white' required>
                {countryCode.map((country) => (
                  <option key={country.code} value={country.dial_code}>{country.dial_code}</option>
                ))}
              </select>
              <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleOnChange}
                placeholder="12345 67890" className='w-2/3 px-4 py-3 rounded-md bg-gray-900 text-white' required />
            </div>

            {/* Passwords */}
            <div className='flex gap-4 mt-4'>
              <div className='relative w-1/2'>
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleOnChange}
                  placeholder="Password" className="w-full px-4 py-3 rounded-md bg-gray-900 text-white" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3">
                  <FaRegEye className='text-gray-400 hover:text-yellow-500' />
                </button>
              </div>
              <div className='relative w-1/2'>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleOnChange}
                  placeholder="Confirm Password" className="w-full px-4 py-3 rounded-md bg-gray-900 text-white" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3">
                  <FaRegEye className='text-gray-400 hover:text-yellow-500' />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="mt-6 w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600">
              Sign up
            </button>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className='w-[40%] flex justify-center items-center'>
          <div className='relative w-full'>
            <img src={loginBackground} alt="Background" className='absolute w-5/6 z-0 object-cover translate-x-4 translate-y-[-46%]' />
            <img src={signupImage} alt="Signup" className='absolute w-5/6 z-10 object-cover translate-y-[-50%]' />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
