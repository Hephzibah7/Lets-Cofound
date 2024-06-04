import React from "react";
import {
  AccountCircle,
  Home,
  PeopleAlt,
  Explore,
  Message,
  PostAdd,
  Dashboard,
  ExitToApp,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const LeftColumn = () => {

  const [userDetails, setUserDetails] = useState(null);
  const Navigate= useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userresponse = await axios.get('http://localhost:9002/getUserDetails', config);
        setUserDetails(userresponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePost = () =>{
    Navigate("/CreatePostForm");
  }
  const handleProfileForm = () => {
    Navigate("/ProfileForm");
  };

  const handleDashboard = () => {
    Navigate("/Dashboard");
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen items-center bg-black mt-5 text-white">
      {/* Top Part */}
      <div className="mb-4">
        {/* Logo */}
        <div className="text-center mb-3">
          <h2 className="text-3xl font-bold">LetsCoFound</h2>
        </div>
        <div className="tag text-purple-500 font-bold text-lg text-center mb-4 italic">
          Connecting Entrepreneurs
        </div>
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
            alt="Profile"
            className="h-20 w-20 rounded-full border-4 border-purple-800"
          />
          <p className="text-center mt-2 font-bold text-xl">{userDetails.username}</p>
          <p className="text-center text-sm">{userDetails.designation}</p>
          <div className="flex mt-2 space-x-4 items-center">
            <div className="flex flex-col">
              <p className="text-center text-sm font-bold">100</p>
              <p className="text-sm text-gray-200">Posts</p>
            </div>
            <div className="flex flex-col">
              <p className="text-center text-sm font-bold">50k</p>
              <p className="text-sm text-gray-200">Followers</p>
            </div>
            <div className="flex flex-col">
              <p className="text-center text-sm font-bold">500</p>
              <p className="text-sm text-gray-200">Folllowing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Part */}

      <div className="mt-6 mb-4 bg-purple-800 w-4/5 mx-auto p-2 rounded-lg">
        {/* Navlinks */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <Home />
            <span>Home</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <PeopleAlt />
            <span>Network</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <Explore />
            <span>Explore</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <Message />
            <span>Messaging</span>
          </div>
          <div onClick={handlePost} className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <PostAdd />
            <span>Create Post</span>
          </div>
          <div onClick={userDetails ? handleDashboard : handleProfileForm}  className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <Dashboard />
            <span>{userDetails ? 'Dashboard' : 'Create Dashboard'}</span>
          </div>
        </div>
        {/* Horizontal Dotted Line */}
        <hr className="border-b border-dotted border-white my-2" />
        {/* Logout and Settings */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <ExitToApp />
            <span>Log Out</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:rounded-full hover:text-black transition duration-300">
            <Settings />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
