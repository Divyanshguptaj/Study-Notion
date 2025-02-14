import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { fetchUserDetails } from "../services/operations/profileAPI"; 
import { useNavigate } from "react-router-dom";
import { formatDate } from '../services/formatDate';
import { deleteProfile } from "../services/operations/settingsAPI";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userData = user || storedUser;

  const handleEditProfile = (e) => {
    e.preventDefault();
    navigate("/updateProfile");
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteProfile(userData.email, token, navigate));
  };

  useEffect(() => {
    if (!user && storedUser?.email) {
      dispatch(fetchUserDetails(storedUser.email));
    }
  }, [dispatch, user, storedUser?.email]);

  return (
    <div className="bg-richblack-900 min-h-screen flex items-center justify-center my-10">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full hover:bg-yellow-500 transition duration-300">
              <FaEdit className="text-white text-sm" />
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-3">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-400 text-sm">{userData.accountType || "Student"}</p>
        </div>

        {/* User Details Section */}
        <div className="mt-6 space-y-4">
          <ProfileDetail label="Email" value={userData?.email} />
          <ProfileDetail label="Gender" value={userData?.additionalDetails?.gender || "Not Specified"} />
          <ProfileDetail label="Date of Birth" value={formatDate(userData?.additionalDetails?.dateOfBirth) || "Not Provided"} />
          <ProfileDetail label="Phone" value={userData?.additionalDetails?.contactNumber || "Not Provided"} />
          <ProfileDetail label="Bio" value={userData?.additionalDetails?.about || "No bio available"} />
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <button onClick={handleEditProfile} className="mx-5 bg-yellow-500 text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300">
            Edit Profile
          </button>

          <button onClick={handleDeleteAccount} className="mx-5 bg-yellow-500 text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({ label, value }) => (
  <div>
    <label className="text-gray-400 text-sm">{label}</label>
    <p className="bg-gray-700 px-4 py-2 rounded-md">{value}</p>
  </div>
);

export default Profile;