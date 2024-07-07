// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { AddCircleOutline, Edit } from "@mui/icons-material";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import Diversity3Icon from "@mui/icons-material/Diversity3";

// const UserProfile = () => {
//   const { username } = useParams();
//   const [userDetails, setUserDetails] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log('Token:', token);
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get(`http://localhost:9002/api/profiles/getUserDetails/${username}`, config);
//         setUserDetails(response.data);

//         // Fetch follow status
//         const followStatus = await axios.get(`http://localhost:9002/api/profiles/followStatus/${username}`, config);
//         setIsFollowing(followStatus.data.isFollowing);
//         console.log(isFollowing);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [username]);

//   const handleFollow = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let response;
//       console.log(isFollowing);
//       if (isFollowing) {
//         response = await axios.post(`http://localhost:9002/api/profiles/unfollow/${username}`, {}, config);
//       } else {
//         response = await axios.post(`http://localhost:9002/api/profiles/follow/${username}`, {}, config);
//       }
//       alert(response.data.message);
//       setIsFollowing(!isFollowing);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error following/unfollowing user:', error);
//       setLoading(false);
//     }
//   };

//   if (loading || !userDetails) return <div>Loading...</div>;

//   return (
//     <div className="bg-black text-white p-4 rounded-lg shadow-md">
//       <div className="grid grid-cols-3 gap-8">
//         <div className="col-span-1">
//           <div className="bg-purple-900 shadow-md rounded mb-8 relative">
//             <img
//               className="w-full rounded h-1/2 object-cover"
//               src={`http://localhost:9002/uploads/${userDetails.backgroundImage}`}
//               alt=""
//             />
//             <div className="flex flex-col p-4 space-y-4">
//               <img
//                 className="w-24 h-24 rounded-full mb-4 absolute left-2 top-14"
//                 src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
//                 alt="Profile avatar"
//               />
//               <div className="">
//                 <div className="flex text-white font-bold">
//                   <h1 className="text-xl">{userDetails.username}</h1>
//                   <h1 className="ml-auto flex">
//                     {userDetails.designation}
//                     <img
//                       className="rounded-full w-6 h-6 ml-2"
//                       src="/images/google.jpeg"
//                       alt=""
//                     />
//                   </h1>
//                 </div>
//                 <p className="text-gray-300 text-sm mt-2">
//                   {userDetails.bio}
//                 </p>
//                 <p className="text-gray-300 mt-2">{userDetails.location}</p>
//               </div>
//               <div className="flex items-center mt-4 text-gray-400 space-x-8 cursor-pointer ">
//                 <div className="flex gap-2 hover:text-white">
//                   <Diversity3Icon />
//                   <span className="text-gray-400 hover:text-white">
//                     500 Followers
//                   </span>
//                 </div>
//                 <div className="flex gap-2 hover:text-white">
//                   <GroupAddIcon />
//                   <span className="text-gray-400 hover:text-white">
//                     500+ Connections
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center mt-2 mb-2 p-4">
//               <button
//                 onClick={handleFollow}
//                 className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 ${isFollowing ? 'border-blue-700 hover:border-blue-500' : 'border-green-700 hover:border-green-500'} rounded`}
//               >
//                 {isFollowing ? 'Unfollow' : 'Follow'}
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-span-2">
//           <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Experience</h2>
//               <div className="text-2xl flex space-x-4">
//                 <span className="cursor-pointer">
//                   <AddCircleOutline />
//                 </span>
//                 <span className="cursor-pointer">
//                   <Edit />
//                 </span>
//               </div>
//             </div>
//             <p>{userDetails.experience}</p>
//           </div>
//           <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Education</h2>
//               <div className="text-2xl flex space-x-4">
//                 <span className="cursor-pointer">
//                   <AddCircleOutline />
//                 </span>
//                 <span className="cursor-pointer">
//                   <Edit />
//                 </span>
//               </div>
//             </div>
//             <p>{userDetails.education}</p>
//           </div>
//           <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Skills</h2>
//               <div className="text-2xl flex space-x-4">
//                 <span className="cursor-pointer">
//                   <AddCircleOutline />
//                 </span>
//                 <span className="cursor-pointer">
//                   <Edit />
//                 </span>
//               </div>
//             </div>
//             <p>{userDetails.skills}</p>
//           </div>
//           <div className="mb-8 p-4 rounded-lg border-4 border-white text-white">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Achievements</h2>
//               <div className="text-2xl flex space-x-4">
//                 <span className="cursor-pointer">
//                   <AddCircleOutline />
//                 </span>
//                 <span className="cursor-pointer">
//                   <Edit />
//                 </span>
//               </div>
//             </div>
//             <p>{userDetails.achievements}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components_lp/Navbar";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ActivityFeed from "./ProfileDash/Activity";
import Interests from "./ProfileDash/Interests";
import Carousel from "./ProfileDash/PostCarousel";
import { ThemeContext } from "../context/ThemeContext";

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

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [Blockedusers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch User Details
        const response = await axios.get(
          `http://localhost:9002/api/profiles/getUserDetails/${username}`,
          config
        );
        console.log(response.data);
        setUserDetails(response.data);

        // Fetch follow status
        const followStatus = await axios.get(
          `http://localhost:9002/api/profiles/followStatus/${username}`,
          config
        );
        setIsFollowing(followStatus.data.isFollowing);

        // Fetch block status
        const blockStatus = await axios.get(
          `http://localhost:9002/api/block/blockStatus/${username}`,
          config
        );
        setIsBlocked(blockStatus.data.isBlocked);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);


  useEffect(() => {
    const fetchFollowers = async () => {
      if (userDetails) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://localhost:9002/followers/${userDetails.userId}`,
            config
          );

          setUserFollowers(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    // Assuming you store user ID in local storage
    const userId = localStorage.getItem("userId");
    const fetchblockusers = async () => {
      if (userDetails) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://localhost:9002/blockusers/${userId}`,
            config
          );

          setBlockedUsers(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    const handleReport = async () => {
   
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        const response = await axios.post(`http://localhost:9002/report/${username},{},  config`);
        alert(response.data.message);
        
      } catch (error) {
        console.error('Error reporting user:', error);
        
      }
    };

    const fetchPrivacy = async () => {
      if (userDetails) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://localhost:9002/privacy/${userDetails.userId}`,
            config
          );
          setIsPrivate(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchPrivacy();
    fetchFollowers();
    fetchblockusers();
  }, [userDetails]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      if (isFollowing) {
        response = await axios.post(
          `http://localhost:9002/api/profiles/unfollow/${username}`,
          {},
          config
        );
      } else {
        response = await axios.post(
          `http://localhost:9002/api/profiles/follow/${username}`,
          {},
          config
        );
      }
      alert(response.data.message);
      setIsFollowing(!isFollowing);
      setLoading(false);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      setLoading(false);
    }
  };

  const handleBlock = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      if (isBlocked) {
        response = await axios.post(
          `http://localhost:9002/api/block/unblock/${username}`,
          {},
          config
        );
      } else {
        response = await axios.post(
          `http://localhost:9002/api/block/block/${username}`,
          {},
          config
        );
      }
      alert(response.data.message);
      setIsBlocked(!isBlocked);
      setLoading(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      setLoading(false);
    }
  };

  const canViewProfile = () => {
    if (!isPrivate) return true;
    if (Blockedusers.length > 0) {
      if (Blockedusers.includes(userDetails.userId)) return false;
    } else return true;
  };
  canViewProfile();

  const renderSkills = () => {
    if (!userDetails || !userDetails.skills) return null;

    // Group skills by category and subcategory
    const groupedSkills = userDetails.skills.reduce((acc, skillSet) => {
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

    return Object.entries(groupedSkills).map(([category, subcategories], catIndex) => (
      <div key={catIndex} className="mb-4">
        <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
          {category}
        </h3>
        <ul className="list-decimal list-inside ml-4">
          {Object.entries(subcategories).map(([subcategory, skills], subIndex) => (
            <li key={subIndex} className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {subcategory}
              <ol className="list-decimal list-inside ml-4">
                {skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {skill}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  if (loading || !userDetails) return <div>Loading...</div>;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <nav className="bg-white shadow-lg dark:bg-gray-800">
        <Navbar />
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div
              className={`shadow-md rounded mb-8 mt-12 relative ${
                theme === "dark" ? "bg-black" : "bg-lightGray"
              } dark:bg-gray-700`}
            >
              <img
                className="w-full rounded h-1/2 object-cover"
                src={`http://localhost:9002/uploads/${userDetails.backgroundImage}`}
                alt=""
              />
              <div className="flex flex-col p-4 space-y-4">
                <img
                  className="w-24 h-24 rounded-full mb-4 absolute left-2 top-14"
                  src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
                  alt="Profile avatar"
                />
                <div className="">
                  <div
                    className={`flex font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    } dark:text-white`}
                  >
                    <h1 className="text-xl">{userDetails.username}</h1>
                    <h1 className="ml-auto flex">
                      {userDetails.designation}
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
                    } dark:text-gray-300`}
                  >
                    {userDetails.bio}
                  </p>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    } dark:text-gray-300`}
                  >
                    {userDetails.location}
                  </p>
                </div>
                <div className="flex items-center mt-4 space-x-8 cursor-pointer">
                  <div
                    className={`flex gap-2 hover:text-white ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    } dark:text-gray-400`}
                  >
                    <Diversity3Icon />
                    <span
                      className={`hover:text-white ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } dark:text-gray-400`}
                    >
                      {userDetails.followers.length}
                    </span>
                  </div>
                  <div
                    className={`flex gap-2 hover:text-white ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    } dark:text-gray-400`}
                  >
                    <GroupAddIcon />
                    <span
                      className={`hover:text-white ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } dark:text-gray-400`}
                    >
                     {userDetails.following.length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2 mb-2 p-4">
                <button
                  onClick={handleFollow}
                  className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 ${
                    isFollowing
                      ? "border-blue-700 hover:border-blue-500"
                      : "border-green-700 hover:border-green-500"
                  } rounded`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button
                  onClick={handleBlock}
                  className={`ml-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 ${
                    isBlocked
                      ? "border-red-700 hover:border-red-500"
                      : "border-yellow-700 hover:border-yellow-500"
                  } rounded`}
                >
                  {isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                onClick={() => handleReport(userDetails.username)}
                className={`ml-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4  rounded`}
              >
                Report 
              </button>
              </div>
            </div>
            {/* <div className={`p-4 shadow-md rounded ${theme === 'dark' ? 'bg-darkPurple' : 'bg-white'}`}>
              <SuggestedConnectionsContainer
                connections={userDetails.suggestedConnections || []}
              />
            </div> */}
          </div>
          <div className="col-span-2">
            {canViewProfile() ? (
              <>
                <div
                  className={`mb-8 mt-12 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                    theme === "dark"
                      ? "bg-black text-white border-darkPurple"
                      : "bg-lightGray text-black border-darkPurple"
                  } dark:border-darkPurple dark:bg-black dark:text-white`}
                >
                  <div className="z-10 flex flex-col justify-evenly w-full h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">EXPERIENCE</h2>
                      <div className="text-2xl flex space-x-4">
                        <span className="cursor-pointer">
                          <AddCircleOutline />
                        </span>
                        <span className="cursor-pointer">
                          <Edit />
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 font-bold">{userDetails.experience}</p>
                    <Dropdown>
                      <p>Additional experiences go here</p>
                    </Dropdown>
                  </div>
                </div>

                <div
                  className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                    theme === "dark"
                      ? "bg-black text-white border-darkPurple"
                      : "bg-lightGray text-black border-darkPurple"
                  } dark:border-darkPurple dark:bg-black dark:text-white`}
                >
                  <div className="z-10 flex flex-col justify-evenly w-full h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">EDUCATION</h2>
                      <div className="text-2xl flex space-x-4">
                        <span className="cursor-pointer">
                          <AddCircleOutline />
                        </span>
                        <span className="cursor-pointer">
                          <Edit />
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 font-bold">{userDetails.education}</p>
                    <Dropdown>
                      <p>Additional experiences go here</p>
                    </Dropdown>
                  </div>
                </div>

                <div
                  className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                    theme === "dark"
                      ? "bg-black text-white border-darkPurple"
                      : "bg-lightGray text-black border-darkPurple"
                  } dark:border-darkPurple dark:bg-black dark:text-white`}
                >
                  <div className="z-10 flex flex-col justify-evenly w-full h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">SKILLS</h2>
                      <div className="text-2xl flex space-x-4">
                        <span className="cursor-pointer">
                          <AddCircleOutline />
                        </span>
                        <span className="cursor-pointer">
                          <Edit />
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">{renderSkills()}</div>
                    <p className="mb-4 font-bold">{userDetails.skillSets.category}</p>
                    <Dropdown>
                      <p>Additional experiences go here</p>
                    </Dropdown>
                  </div>
                </div>

                <div
                  className={`mb-8 p-4 rounded-lg border-4 text-white duration-500 group overflow-hidden relative flex flex-col justify-evenly ${
                    theme === "dark"
                      ? "bg-black text-white border-darkPurple"
                      : "bg-lightGray text-black border-darkPurple"
                  } dark:border-darkPurple dark:bg-black dark:text-white`}
                >
                  <div className="z-10 flex flex-col justify-evenly w-full h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">ACHIEVEMENTS</h2>
                      <div className="text-2xl flex space-x-4">
                        <span className="cursor-pointer">
                          <AddCircleOutline />
                        </span>
                        <span className="cursor-pointer">
                          <Edit />
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 font-bold">{userDetails.achievements}</p>
                    <Dropdown>
                      <p>Additional experiences go here</p>
                    </Dropdown>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>Profile is locked</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 py-8 rounded mt-4 ml-10">
        <h1
          className={`text-xl text-center ml-1 mb-4 font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          } dark:text-white`}
        >
          Posts
        </h1>
        <div className="m-10 p-10">
          <Carousel cards={userDetails.posts || []} />
        </div>
      </div>
      <div
        className={`container grid grid-cols-1 lg:grid-cols-3 mt-6 mx-auto px-4 py-8`}
      >
        <div className="col-span-3">
          <div className="w-full lg:w-150 flex flex-col lg:flex-row gap-10">
            <ActivityFeed activities={userDetails.activities || []} />
            <ActivityFeed activities={userDetails.activities || []} />
            <ActivityFeed activities={userDetails.activities || []} />
          </div>
        </div>
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

export default UserProfile;
