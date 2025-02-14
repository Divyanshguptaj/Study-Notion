import React, { useState } from "react";
import loginImage from "../assets/Images/loginImage.png";
import loginBackground from "../assets/Images/loginBackground.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Student", 
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="bg-richblack-900 mx-auto flex justify-center items-center w-full h-full mt-10">
      <div className="flex justify-center items-center h-[100%] gap-10 w-5/6">
        {/* Section 1 */}
        <div className="flex justify-center items-start flex-col w-[40%] p-10">
          <p className="text-3xl text-white font-bold">Welcome Back</p>
          <p className="text-sm text-gray-300 mt-5">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="font-edu text-blue-300">
              Education to future-proof your career.
            </span>
          </p>

          <form className="w-full" onSubmit={handleOnSubmit}>
            {/* Role Toggle Buttons */}
            <div className="flex justify-center space-x-4 mt-5 bg-slate-800 rounded-full p-1 w-1/2">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-gray-200 text-sm ${
                  formData.role === "Student"
                    ? "bg-richblack-900 text-white"
                    : "bg-slate-800 hover:bg-gray-600"
                }`}
                onClick={() => handleRoleChange("Student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-gray-200 text-sm ${
                  formData.role === "Instructor"
                    ? "bg-richblack-900 text-white"
                    : "bg-slate-800 hover:bg-gray-600"
                }`}
                onClick={() => handleRoleChange("Instructor")}
              >
                Instructor
              </button>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 mt-5 text-white"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-b-[3px] border-gray-700"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 mt-5 text-white"
              >
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  name="password"
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-b-[3px] border-gray-700"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-yellow-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              <div className="text-right mt-1">
                <a href="forgotPassword" className="text-sm text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="mt-10 w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* Section 2 */}
        <div className="w-[40%] h-fit flex justify-center items-center">
          <div className="w-full h-max relative">
            <img
              src={loginBackground}
              alt=""
              className="absolute w-5/6 z-0 object-cover translate-x-4 translate-y-[-46%]"
            />
            <img
              src={loginImage}
              alt=""
              className="absolute w-5/6 z-10 object-cover translate-y-[-50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;