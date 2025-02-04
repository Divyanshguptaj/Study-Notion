import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent,navigate));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-richblack-900">
      <div className="flex flex-col w-[90%] md:w-[30%] h-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-white text-center">Reset Your Password</p>
        <p className="text-sm text-gray-300 mt-2 text-center">
          Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery.
        </p>

        <form onSubmit={handleOnSubmit} className="mt-5">
          <label htmlFor="email" className="block text-sm mb-1 text-white">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-5 w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        {emailSent && <p className="text-green-500 text-sm mt-2 text-center">Check your email for the reset link.</p>}

        <div className="mt-3 text-center">
          <a href="/login" className="text-sm text-slate-200 flex items-center justify-center gap-2 hover:text-gray-500">
            <FaArrowLeftLong /> Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
