import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../services/operations/settingsAPI"; 
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userData = user || storedUser;

  const [profileData, setProfileData] = useState({
    gender: user?.gender || "",
    about: user?.about || "",
    contactNumber: user?.contactNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Function to update profile
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(userData.email, profileData, navigate)); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Gender */}
          <div>
            <label className="text-gray-400">Gender</label>
            <select 
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label className="text-gray-400">About</label>
            <textarea
              name="about"
              value={profileData.about}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
              rows="3"
              placeholder="Write something about yourself..."
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-gray-400">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={profileData.contactNumber}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-gray-400">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
