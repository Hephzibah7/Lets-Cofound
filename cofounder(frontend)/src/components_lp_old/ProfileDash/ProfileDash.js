import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SuggestedConnectionsContainer from "./Connection";
import Card from "./Card";
import ActivityFeed from "./Activity";
import Interests from "./Interests";
import Carousel from "./PostCarousel";

const Dropdown = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative">
      {isOpen ? (
        <>
          <div className="mt-2">{children}</div>
          <button
            onClick={toggleDropdown}
            className="text-white bg-purple-800 p-2 rounded-lg hover:bg-purple-600 font-semibold mt-4 mb-2 cursor-pointer"
          >
            Show Less
          </button>
        </>
      ) : (
        <button
          onClick={toggleDropdown}
          className="text-white bg-purple-800 p-2 rounded-lg hover:bg-purple-600 font-semibold mt-4 mb-2 cursor-pointer"
        >
          Show More
        </button>
      )}
    </div>
  );
};

const ProfileDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userresponse = await axios.get('http://localhost:9002/getUserDetails', config);
        setUserId(userresponse.data.userId._id); // Assuming the user ID is returned as userresponse.data.userId
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return; // Skip fetching posts if userId is not yet available
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:9002/getUserPosts/${userId}`, config);
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]); // Trigger the fetch when userId changes


  const suggestedConnections = [
    {
      profilePicture: "/images/profilepic.jpg",
      name: "John Doe",
      headline: "Software Engineer at Google",
    },
    {
      profilePicture: "/images/profilepic.jpg",
      name: "Jane Smith",
      headline: "Data Scientist at Microsoft",
    },
    // Add more suggested connections as needed
  ];

  const activities = [
    {
      user: "Ayash Kumar Behera",
      action: "reposted this",
      timeAgo: "1yr",
      content: "Good evening #connections\nLadies and gentlemen,...",
      link: "https://xim-scse.acm.org",
      linkText: "ACM XIM STUDENT CHAPTER",
      meta: "xim-scse.acm.org • 1 min read",
      interactionOptions: true,
      interactionCount: 7,
      image: "/images/profilepic.jpg",
    },
    // Add more activity objects here
  ];

 

  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:9002/getProfileDetails",
          config
        );
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []);

  return (
    <div className="bg-gradient-to-br from-black to-purple-800 min-h-screen">
      <nav className="bg-white shadow-lg">
        <Navbar />
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-purple-900 shadow-md rounded mb-8 relative">
              <img
                className="w-full rounded h-1/2 object-cover"
                src={`http://localhost:9002/uploads/${profileDetails?.backgroundImage}`}
                alt=""
              />
              <div className="flex flex-col p-4 space-y-4">
                <img
                  className="w-24 h-24 rounded-full mb-4 absolute left-2 top-14"
                  src={`http://localhost:9002/uploads/${profileDetails?.profileImage}`}
                  alt="Profile avatar"
                />
                <div className="">
                  <div className="flex text-white font-bold">
                    <h1 className="text-xl">{profileDetails?.username}</h1>
                    <h1 className="ml-auto flex">
                      {profileDetails?.designation}
                      <img
                        className="rounded-full w-6 h-6 ml-2"
                        src="/images/google.jpeg"
                        alt=""
                      />
                    </h1>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    {profileDetails?.bio}
                  </p>
                  <p className="text-gray-300 mt-2">{profileDetails?.location}</p>
                </div>
                <div className="flex items-center mt-4 text-gray-400 space-x-8 cursor-pointer ">
                  <div className="flex gap-2 hover:text-white">
                    <Diversity3Icon />
                    <span className="text-gray-400 hover:text-white">
                      500 Followers
                    </span>
                  </div>
                  <div className="flex gap-2 hover:text-white">
                    <GroupAddIcon />
                    <span className="text-gray-400 hover:text-white">
                      500+ Connections
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2 mb-2 p-4">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                  Let's Collaborate
                </button>
              </div>
            </div>
            <div className="bg-white p-4 shadow-md rounded">
              <SuggestedConnectionsContainer
                connections={suggestedConnections}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Experience</h2>
                <div className="text-2xl flex space-x-4">
                  <span className="cursor-pointer">
                    <AddCircleOutline />
                  </span>
                  <span className="cursor-pointer">
                    <Edit />
                  </span>
                </div>
              </div>
              <p>{profileDetails?.experience}</p>
              <Dropdown>
                <p>Additional experiences go here</p>
              </Dropdown>
            </div>
            <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Education</h2>
                <div className="text-2xl flex space-x-4">
                  <span className="cursor-pointer">
                    <AddCircleOutline />
                  </span>
                  <span className="cursor-pointer">
                    <Edit />
                  </span>
                </div>
              </div>
              <p>{profileDetails?.education}</p>
              <Dropdown>
                <p>Additional education records go here</p>
              </Dropdown>
            </div>
            <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Skills</h2>
                <div className="text-2xl flex space-x-4">
                  <span className="cursor-pointer">
                    <AddCircleOutline />
                  </span>
                  <span className="cursor-pointer">
                    <Edit />
                  </span>
                </div>
              </div>
              <p>{profileDetails?.skills}</p>
              <Dropdown>
                <p>Additional skills records go here</p>
              </Dropdown>
            </div>
            <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Achievements</h2>
                <div className="text-2xl flex space-x-4">
                  <span className="cursor-pointer">
                    <AddCircleOutline />
                  </span>
                  <span className="cursor-pointer">
                    <Edit />
                  </span>
                </div>
              </div>
              <p>{profileDetails?.achievements}</p>
              <Dropdown>
                <p>Additional achievement records go here</p>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 py-8 rounded mt-4 ml-10 text-white">
        <h1 className="text-xl text-center ml-1 mb-4 font-bold">Posts</h1>
        <div className="m-10 p-10">
        <Carousel cards={posts} />
        </div>
        
      </div>
      <div className="container grid grid-cols-3 mt-6 mx-auto px-4 py-8">
        <div className="col-span-3">
          <div className="w-150 flex gap-10">
            <ActivityFeed activities={activities} />
            <ActivityFeed activities={activities} />
            <ActivityFeed activities={activities} />
          </div>
        </div>
        {/* <div className="col-span-1 mt-12 hover:scale-105 transition-transform duration-300">
          <Card />
        </div> */}
      </div>
      <div className="container mx-auto m-10 p-4">
        <Interests />
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Microsoft Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileDashboard;


