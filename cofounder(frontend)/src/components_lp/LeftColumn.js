

// import React, { useEffect, useState, useContext } from "react";
// import {
//   Home,
//   PeopleAlt,
//   Explore,
//   Message,
//   PostAdd,
//   Dashboard,
//   ExitToApp,
//   Settings,
// } from "@mui/icons-material";
// import CreateIcon from "@mui/icons-material/Create";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

// const LeftColumn = ({ onMessagingClick, onSettingsClick }) => {
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext); // Get the current theme from context

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const userresponse = await axios.get(
//           "http://localhost:9002/getUserDetails",
//           config
//         );
//         setUserDetails(userresponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePost = () => {
//     navigate("/createPostForm");
//   };
//   const handleProject = () => {
//     navigate("/StartupOptions");
//   };
//   const handleProfileForm = () => {
//     navigate("/profileform");
//   };
//   const handleDashboard = () => {
//     navigate("/profiledash");
//   };
//   const handleSettings = () => {
//     navigate("/settings");
//   };
//   const handleExploreProjects = () => {
//     navigate("/projectpage");
//   };

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={`h-screen items-center pt-4 border-r-2 ${theme === 'dark' ? 'bg-black text-white border-black' : 'bg-white text-black border-white'}`}>
//       <div className="mb-4">
//         <div className="text-center mb-3">
//           <h2 className="text-3xl font-bold">LetsCoFound</h2>
//         </div>
//         <div className="tag text-darkPurple font-bold text-lg text-center mb-4 italic">
//           Connecting Entrepreneurs
//         </div>
//         <div className="flex flex-col items-center mb-4">
//           <img
//             src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
//             alt="Profile"
//             className="h-20 w-20 rounded-full border-4 border-darkPurple"
//           />
//           <p className="text-center mt-2 font-bold text-xl">
//             {userDetails.username}
//           </p>
//           <p className="text-center text-sm">{userDetails.designation}</p>
//           <div className="flex mt-2 space-x-4 items-center">
//             <div className="flex flex-col">
//               <p className="text-center text-sm font-bold">100</p>
//               <p className="text-sm text-gray-200">Posts</p>
//             </div>
//             <div className="flex flex-col">
//               <p className="text-center text-sm font-bold">50k</p>
//               <p className="text-sm text-gray-200">Followers</p>
//             </div>
//             <div className="flex flex-col">
//               <p className="text-center text-sm font-bold">500</p>
//               <p className="text-sm text-gray-200">Following</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 mb-4 bg-darkPurple w-4/5 mx-auto p-2 rounded-lg">
//         <div className="flex flex-col">
//           <Link to="/home">
//             <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
//               <Home />
//               <span>Home</span>
//             </div>
//           </Link>
//           <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
//             <PeopleAlt />
//             <span>Network</span>
//           </div>
//           <div onClick={handleExploreProjects} className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
//             <Explore />
//             <span>Explore Projects</span>
//           </div>
//           <div
//             onClick={onMessagingClick}
//             className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
//           >
//             <Message />
//             <span>Messaging</span>
//           </div>
//           <div
//             onClick={handlePost}
//             className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
//           >
//             <PostAdd />
//             <span>Create Post</span>
//           </div>
//           <div
//             onClick={handleProject}
//             className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
//           >
//             <CreateIcon />
//             <span>Create Project</span>
//           </div>
//           <div
//             onClick={userDetails ? handleDashboard : handleProfileForm}
//             className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
//           >
//             <Dashboard />
//             <span>{userDetails ? "Dashboard" : "Create Dashboard"}</span>
//           </div>
//         </div>
//         <hr className="border-b border-dotted border-white my-2" />
//         <div className="flex flex-col space-y-2">
//           <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
//             <ExitToApp />
//             <span>Log Out</span>
//           </div>
//           <div onClick={onSettingsClick} className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
//             <Settings />
//             <span>Settings</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftColumn;



import React, { useEffect, useState, useContext } from "react";
import {
  Home,
  PeopleAlt,
  Explore,
  Message,
  PostAdd,
  Dashboard,
  ExitToApp,
  Settings,
  Menu,
  Close,
} from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const LeftColumn = ({ onMessagingClick, onSettingsClick }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [posts, setPosts] = useState(null);
  const [followDetails, setFollowDetails] = useState(null);
  const [followingDetails, setFollowingDetails] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get(
          "http://localhost:9002/api/profiles/getUserDetails",
          config
        );
        setUserDetails(userResponse.data);

        const followResponse = await axios.get(
          `http://localhost:9002/api/profiles/followers/${userId}`,
          config
        );
        setFollowDetails(followResponse.data.length);

        const followingResponse = await axios.get(
          `http://localhost:9002/api/profiles/following/${userId}`,
          config
        );
        setFollowingDetails(followingResponse.data.length);

        if (userId) {
          const postsResponse = await axios.get(
            `http://localhost:9002/api/posts/getUserPosts/${userId}`,
            config
          );
          setPosts(postsResponse.data.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePost = () => {
    navigate("/createPostForm");
  };
  const handleProject = () => {
    navigate("/StartupOptions");
  };
  const handleProfileForm = () => {
    navigate("/profileform");
  };
  const handleDashboard = () => {
    navigate("/profiledash");
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  const handleExploreProjects = () => {
    navigate("/projectpage");
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen">
      <button
        className="md:hidden absolute top-4 left-4 z-20 text-3xl"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu />
      </button>

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-[-10]"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 transform ${
              isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
            } md:hidden transition-transform duration-300 ease-in-out w-64 z-20 bg-gray-800`}
          >
            <div
              className={`h-screen items-center pt-4 px-2 ${
                theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <div className="mb-4 flex justify-between items-center">
                <div className="text-center mb-3 flex-grow">
                  <h2 className="text-3xl font-bold">LetsCoFound</h2>
                </div>
                <button
                  className="text-3xl z-20"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Close />
                </button>
              </div>
              <div className="tag text-darkPurple font-bold text-lg text-center mb-4 italic">
                Connecting Entrepreneurs
              </div>
              <div className="flex flex-col items-center mb-4">
                <img
                  src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
                  alt="Profile"
                  className="h-20 w-20 rounded-full border-4 border-darkPurple"
                />
                <p className="text-center mt-2 font-bold text-xl">
                  {userDetails.username}
                </p>
                <p className="text-center text-sm">{userDetails.designation}</p>
                <div className="flex mt-2 space-x-4 items-center">
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">{posts}</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Posts
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">{followDetails}</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Followers
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center text-sm font-bold">{followingDetails}</p>
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

              <div
                className={`mt-6 mb-4 w-full mx-auto p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-darkPurple text-white"
                    : "bg-lightGray text-black border-4 border-lightPurple"
                }`}
              >
                <div className="flex flex-col">
                  <Link to="/home">
                    <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
                      <Home />
                      <span>Home</span>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
                    <PeopleAlt />
                    <span>Network</span>
                  </div>
                  <div
                    onClick={handleExploreProjects}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <Explore />
                    <span>Explore Projects</span>
                  </div>
                  <div
                    onClick={onMessagingClick}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <Message />
                    <span>Messaging</span>
                  </div>
                  <div
                    onClick={handlePost}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <PostAdd />
                    <span>Create Post</span>
                  </div>
                  <div
                    onClick={handleProject}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <CreateIcon />
                    <span>Create Project</span>
                  </div>
                  <div
                    onClick={userDetails ? handleDashboard : handleProfileForm}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <Dashboard />
                    <span>{userDetails ? "Dashboard" : "Create Dashboard"}</span>
                  </div>
                </div>
                <hr className="border-b-2 border-dotted border-lightPurple my-2" />
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
                    <ExitToApp />
                    <span>Log Out</span>
                  </div>
                  <div
                    onClick={onSettingsClick}
                    className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
                  >
                    <Settings />
                    <span>Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop view */}
      <div
        className={`hidden md:block h-screen items-center pt-4 px-2 md:px-4 lg:px-6 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="mb-4">
          <div className="text-center mb-3">
            <h2 className="text-3xl font-bold">LetsCoFound</h2>
          </div>
          <div className="tag text-darkPurple font-bold text-lg text-center mb-4 italic">
            Connecting Entrepreneurs
          </div>
          <div className="flex flex-col items-center mb-4">
            <img
              src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
              alt="Profile"
              className="h-20 w-20 rounded-full border-4 border-darkPurple"
            />
            <p className="text-center mt-2 font-bold text-xl">
              {userDetails.username}
            </p>
            <p className="text-center text-sm">{userDetails.designation}</p>
            <div className="flex mt-2 space-x-4 items-center">
              <div className="flex flex-col">
                <p className="text-center text-sm font-bold">{posts}</p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Posts
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center text-sm font-bold">{followDetails}</p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Followers
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center text-sm font-bold">{followingDetails}</p>
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
        </div>

        <div
          className={`mt-6 mb-4 w-4/5 mx-auto p-2 rounded-lg ${
            theme === "dark"
              ? "bg-darkPurple text-white"
              : "bg-lightGray text-black border-4 border-lightPurple"
          }`}
        >
          <div className="flex flex-col">
            <Link to="/home">
              <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
                <Home />
                <span>Home</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
              <PeopleAlt />
              <span>Network</span>
            </div>
            <div
              onClick={handleExploreProjects}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <Explore />
              <span>Explore Projects</span>
            </div>
            <div
              onClick={onMessagingClick}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <Message />
              <span>Messaging</span>
            </div>
            <div
              onClick={handlePost}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <PostAdd />
              <span>Create Post</span>
            </div>
            <div
              onClick={handleProject}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <CreateIcon />
              <span>Create Project</span>
            </div>
            <div
              onClick={userDetails ? handleDashboard : handleProfileForm}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <Dashboard />
              <span>{userDetails ? "Dashboard" : "Create Dashboard"}</span>
            </div>
          </div>
          <hr className="border-b-2 border-dotted border-lightPurple my-2" />
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300">
              <ExitToApp />
              <span>Log Out</span>
            </div>
            <div
              onClick={onSettingsClick}
              className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-white hover:text-black hover:rounded-full transition duration-300"
            >
              <Settings />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
