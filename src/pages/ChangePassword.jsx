import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { resetPassword } from '../services/operations/authAPI';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    console.log("Reset Token:", token);

    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };


  const passwordRequirements = [
    { label: 'one lowercase character', regex: /[a-z]/ },
    { label: 'one uppercase character', regex: /[A-Z]/ },
    { label: 'one number', regex: /\d/ },
    { label: 'one special character', regex: /[!@#$%^&*]/ },
    { label: '8 character minimum', regex: /.{8,}/ },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Choose new password</h1>
      <p className="text-gray-400 mb-6 text-center">Almost done. Enter your new password and you're all set.</p>

      <div className="w-full max-w-md">
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-white rounded-md bg-gray-800"
            placeholder="New password *"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 text-white rounded-md bg-gray-800"
            placeholder="Confirm new password *"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mb-4">
          {passwordRequirements.map((requirement, index) => (
            <div key={index} className="flex items-center text-sm text-green-400">
              {requirement.regex.test(password) ? <BsCheckCircleFill className="mr-2" /> : <span className="mr-2">○</span>}
              {requirement.label}
            </div>
          ))}
        </div>

        <button className="w-full p-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600" onClick={handleOnSubmit}>
          Reset Password
        </button>
      </div>

      <a href="/login" className="mt-4 text-blue-400 hover:underline flex items-center">
        ← Back to login
      </a>
    </div>
  );
};

export default ResetPassword;
