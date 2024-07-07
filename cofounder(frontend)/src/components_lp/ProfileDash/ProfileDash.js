

// ProfileDashboard.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar"; // Ensure this path is correct
import { AddCircleOutline, Edit } from "@mui/icons-material";
import SuggestedConnectionsContainer from "./Connection";
import Carousel from "./PostCarousel";
import ActivityFeed from "./Activity";
import Interests from "./Interests";
import Post from "../Project_comp/Project_Posts/Post";
import {  useNavigate } from 'react-router-dom';
import { ThemeContext } from "../../context/ThemeContext";

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

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
            className={`${
              theme === "dark"
                ? "bg-darkPurple text-white hover:bg-lightPurple"
                : "bg-darkPurple text-white"
            } p-2 rounded-lg font-semibold mt-4 mb-2 cursor-pointer w-full`}
          >
            Show Less
          </button>
        </>
      ) : (
        <button
          onClick={toggleDropdown}
          className={`${
            theme === "dark"
              ? "bg-darkPurple text-white hover:bg-lightPurple "
              : "bg-darkPurple text-white hover:bg-lightPurple"
          } p-2 rounded-lg font-semibold mt-4 mb-2 cursor-pointer w-full`}
        >
          Show More
        </button>
      )}
    </div>
  );
};

const ProfileDashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // Initialize as null
  const [postsLen, setPostsLen] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [followDetails, setFollowDetails] = useState(null);
  const [followingDetails, setFollowingDetails] = useState(null);
  const [projectsDetails, setProjectDetails] = useState(null);
  const [projectsLen, setProjectLen] = useState(null);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (username) => {
    navigate(`/user/${username}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userresponse = await axios.get(
          "http://localhost:9002/api/profiles/getUserDetails",
          config
        );
        setUserId(userresponse.data.userId._id); // Assuming the user ID is returned as userresponse.data.userId

        // Fetch follow stats details
        const followResponse = await axios.get(
          `http://localhost:9002/api/profiles/followers/${userId}`,
          config
        );
        console.log(followResponse.data);
        setFollowDetails(followResponse.data.length);

        // Fetch the following stats
        const followingResponse = await axios.get(
          `http://localhost:9002/api/profiles/following/${userId}`,
          config
        );
        console.log(followingResponse.data);
        setFollowingDetails(followingResponse.data.length);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRecommendedUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const recommendResponse = await axios.get(
          "http://localhost:9002/api/recommend/users",
          config
        );
        console.log(recommendResponse.data);
        setRecommendedUsers(recommendResponse.data);
      } catch (error) {
        console.error("Error fetching recommended users:", error);
      }
    };

    fetchUserData();
    fetchRecommendedUsers();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return; // Skip fetching posts if userId is not yet available
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:9002/api/posts/getUserPosts/${userId}`,
          config
        );
        setPosts(response.data);
        setPostsLen(response.data.length);
        console.log(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchUserProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9002/api/projects/user-projects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };


    fetchPosts();
    fetchUserProjects();
  }, [userId]); // Trigger the fetch when userId changes

  localStorage.setItem("userId", `${userId}`);

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
          "http://localhost:9002/api/profiles/getProfileDetails",
          config
        );
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []);

  const renderSkills = () => {
    if (!profileDetails || !profileDetails.skills) return null;

    // Group skills by category and subcategory
    const groupedSkills = profileDetails.skills.reduce((acc, skillSet) => {
      const { category, subcategory, skills } = skillSet;
      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category][subcategory]) {
        acc[category][subcategory] = [];
      }
      acc[category][subcategory].push(...skills);
      return acc;
    }, {});

    return Object.entries(groupedSkills).map(
      ([category, subcategories], catIndex) => (
        <div key={catIndex} className="mb-4">
          <h3
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {category}
          </h3>
          <ul className="list-decimal list-inside ml-4">
            {Object.entries(subcategories).map(
              ([subcategory, skills], subIndex) => (
                <li
                  key={subIndex}
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {subcategory}
                  <ol className="list-decimal list-inside ml-4">
                    {skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ol>
                </li>
              )
            )}
          </ul>
        </div>
      )
    );
  };

  return (
    <div
      className={`min-h-screen mb-8 p-2 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar /> {/* Integrate the Navbar component */}
      <div className="lg:container lg:mx-auto lg:px-4 lg:py-8 lg:mt-10 mt-14">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1">
            <div
              className={`lg:shadow-md lg:rounded lg:mb-8 lg:relative ${
                theme === "dark"
                  ? "bg-darkPurple"
                  : "bg-lightGray border-4 border-lightPurple"
              }`}
            >
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
                  <div
                    className={`flex font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
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
                  <p
                    className={`text-sm mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {profileDetails?.bio}
                  </p>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {profileDetails?.location}
                  </p>
                </div>
                <div className="flex mt-2 space-x-4 items-center">
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">{postsLen}</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Posts
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">
                      {followDetails}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Followers
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">
                      {followingDetails}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Following
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2 mb-2 p-4">
                <button
                  className={`${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-lightGray"
                      : "bg-darkPurple text-white"
                  } font-bold py-2 px-4 border-b-4 border-white hover:border-lightPurple rounded`}
                >
                  Let's Collaborate
                </button>
              </div>
            </div>
            {/* <div
              className={`p-4 shadow-md rounded mb-8 mt-6 ${
                theme === "dark"
                  ? "bg-white text-black"
                  : "bg-lightGray border-4 border-lightPurple"
              }`}
            >
              <SuggestedConnectionsContainer
                connections={suggestedConnections}
              />
            </div> */}

<div className="mb-8 mt-6 w-4/5 bg-purple-800 p-1 pl-3 pr-3  rounded-lg mx-auto transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-sm bg-white rounded-full p-1 mt-2 text-black font-semibold mb-4 text-center">
          Suggested for You
        </h2>
        {/* Contact list */}
        <div className="flex flex-col space-y-2 items-left text-sm mb-4 text-left">
          {recommendedUsers.map((recommendedUser, index) => (
            <div key={index} className="flex text-left p-3 cursor-pointer" onClick={() => handleClick(recommendedUser.username)}>
              <img
                src={`http://localhost:9002/uploads/${recommendedUser.profileImage}`}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-1">
                <p className="font-semibold p-1">{recommendedUser.fullName}</p>
                <p className="text-sm text-gray-400">{recommendedUser.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
          </div>
          <div className="lg:col-span-2">
            <div
              className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                theme === "dark"
                  ? "border-darkPurple bg-black text-white"
                  : "border-lightPurple bg-lightGray text-black"
              }`}
            >
              <div className="z-10 flex flex-col space-y-8 justify-evenly w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } mx-auto text-2xl font-bold`}
                  >
                    EXPERIENCE
                  </h2>
                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-2xl flex space-x-4`}
                  >
                    <span className="cursor-pointer">
                      <AddCircleOutline />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                  </div>
                </div>
                <p
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } text-xl mb-4 font-bold`}
                >
                  {profileDetails?.experience}
                </p>
                <Dropdown>
                  <p>Additional experiences go here</p>
                </Dropdown>
              </div>
            </div>

            <div
              className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                theme === "dark"
                  ? "border-darkPurple bg-black text-white"
                  : "border-lightPurple bg-lightGray text-black"
              }`}
            >
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } mx-auto text-2xl font-bold`}
                  >
                    EDUCATION
                  </h2>
                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-2xl flex space-x-4`}
                  >
                    <span className="cursor-pointer">
                      <AddCircleOutline />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                  </div>
                </div>
                <p
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } text-xl mb-4 font-bold`}
                >
                  {profileDetails?.education}
                </p>
                <Dropdown>
                  <p>Additional experiences go here</p>
                </Dropdown>
              </div>
            </div>

            <div
              className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                theme === "dark"
                  ? "border-darkPurple bg-black text-white"
                  : "border-lightPurple bg-lightGray text-black"
              }`}
            >
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } mx-auto text-2xl font-bold`}
                  >
                    SKILLS
                  </h2>
                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-2xl flex space-x-4`}
                  >
                    <span className="cursor-pointer">
                      <AddCircleOutline />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                  </div>
                </div>
                <div className="mt-4">{renderSkills()}</div>
                <Dropdown>
                  <p>Additional experiences go here</p>
                </Dropdown>
              </div>
            </div>

            <div
              className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                theme === "dark"
                  ? "border-darkPurple bg-black text-white"
                  : "border-lightPurple bg-lightGray text-black"
              }`}
            >
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } mx-auto text-2xl font-bold`}
                  >
                    ACHIEVEMENTS
                  </h2>
                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-2xl flex space-x-4`}
                  >
                    <span className="cursor-pointer">
                      <AddCircleOutline />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                  </div>
                </div>
                <p
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } text-xl mb-4 font-bold`}
                >
                  {profileDetails?.achievements}
                </p>
                <Dropdown>
                  <p>Additional experiences go here</p>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 py-8 rounded mt-4 ml-10">
        <h1
          className={`text-xl text-center ml-1 mb-4 font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Posts
        </h1>
        <div className="m-10 p-10">
          <Carousel cards={posts} />
        </div>
      </div>
      <div className="mx-auto lg:w-1/2 lg:h-1/3">
        <h1 className="text-center text-xl font-bold mt-4 mb-4 ">Projects</h1>
        {projects.map((project) => {
          return (
            <Post
              key={project._id}
              projectId={project._id}
              projectOwner={project.userId._id}
              image={project.postImage}
              date={new Date(project.createdAt).toLocaleDateString()}
              category={project.startupType}
              title={project.concept}
              description={project.problem}
              authorImage={project.profileimageUrl}
              authorName={project.username}
              authorRole={project.designation}
              fundingStatus={project.fundingStatus}
            />
          );
        })}
      </div>
      <footer className="bg-gray-800 w-full text-white py-4">
        <div className="container px-4 text-center">
          <p>&copy; 2024 Microsoft Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileDashboard;
