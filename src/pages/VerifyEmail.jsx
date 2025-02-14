import React, { useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email || "No Email Provided";
  const signupData = location.state?.signupData || {};

  const inputRefs = useRef([]);

  const handleOnSubmit = async () => {
    const otp = code.join("");
    if (otp.length === 6) {
      const fullSignupData = {
        ...signupData,
        otp,
      };

      try {
        const result = await dispatch(signUp(fullSignupData));
        if (result?.success) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error("Signup failed:", error);
        navigate("/signup");
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (!/^\d?$/.test(value)) return; // Ensure only a single digit (0-9)

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend code logic
  const handleResendCode = async () => {
    try {
      // Implement actual resend OTP functionality here, e.g., making an API call
      alert("Verification code resent!");
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
      <p className="text-gray-400 mb-6">
        A verification code has been sent to {email}. Enter the code below:
      </p>

      {/* OTP Input Fields */}
      <div className="flex space-x-2 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            id={`otp-${index}`} // Unique ID for easy focus
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(e, index)} // Pass event properly
            onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace key
            className="w-12 h-12 text-center text-2xl border rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleOnSubmit}
        type="button"
        className="w-full max-w-xs px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
      >
        Verify Email
      </button>

      {/* Resend & Back Options */}
      <div className="flex items-center justify-between w-full max-w-xs mt-6 text-sm">
        <div className="text-left mt-2">
          <a
            href="/signup"
            className="text-sm text-slate-200 flex items-center gap-2 hover:text-gray-500"
          >
            <FaArrowLeftLong /> Back to Signup
          </a>
        </div>

        <button
          onClick={handleResendCode}
          className="flex items-center text-blue-400 hover:underline gap-1"
        >
          <RxCountdownTimer />
          Resend it
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
