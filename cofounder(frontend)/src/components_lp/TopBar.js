// import React, { useState, useContext, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import BellIcon from "@mui/icons-material/Notifications";
// import HeartIcon from "@mui/icons-material/Favorite";
// import axios from "axios";
// import _ from "lodash";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { ThemeContext } from "../context/ThemeContext";

// export default function TopBar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [profiles, setProfiles] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [profileResults, setProfileResults] = useState([]);
//   const [postResults, setPostResults] = useState([]);
//   const [projectResults, setProjectResults] = useState([]);
//   const navigate = useNavigate();

//   const { theme } = useContext(ThemeContext);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const [profilesResponse, postsResponse, projectsResponse] =
//           await Promise.all([
//             axios.get(
//               "http://localhost:9002/api/search/getallprofiles",
//               config
//             ),
//             axios.get("http://localhost:9002/api/search/getallposts", config),
//             axios.get("http://localhost:9002/api/search/projects", config),
//           ]);
//         console.log(profilesResponse);
//         setProfiles(profilesResponse.data);
//         setPosts(postsResponse.data);
//         setProjects(projectsResponse.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSearch = useCallback(
//     _.debounce((query) => {
//       if (query.trim()) {
//         const profileResults = searchData(profiles, query.toLowerCase());
//         const postResults = searchData(posts, query.toLowerCase(), [
//           "postContent",
//           "tags",
//           "username",
//         ]);
//         const projectResults = searchData(projects, query.toLowerCase(), [
//           "concept",
//           "problem",
//           "username",
//           "solution",
//           "industries",
//           "fundingStatus",
//         ]);
//         console.log(projectResults);
//         setProfileResults(profileResults);
//         setPostResults(postResults);
//         setProjectResults(projectResults);
//       }
//     }, 300), // Adjust the debounce delay as needed
//     [profiles, posts, projects]
//   );

//   const searchData = (
//     data,
//     query,
//     fields = [
//       "fullName",
//       "username",
//       "email",
//       "bio",
//       "experience",
//       "education",
//       "achievements",
//       "designation",
//       "company",
//       "industries",
//       "employment",
//     ]
//   ) => {
//     return data.filter((item) => {
//       return fields.some((field) => {
//         if (Array.isArray(item[field])) {
//           return item[field].some((subField) =>
//             subField.toLowerCase().includes(query)
//           );
//         }
//         return item[field] && item[field].toLowerCase().includes(query);
//       });
//     });
//   };

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//     handleSearch(e.target.value);
//   };

//   const handleResultClick = (query) => {
//     navigate(`/search-results?query=${query}`);
//   };

//   return (
//     <div
//       className={`${
//         theme === "dark" ? "bg-black text-white" : "bg-white text-black"
//       } flex items-center justify-between bg-black p-4`}
//     >
//       {/* Search Bar */}
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="relative flex items-center w-4/5"
//       >
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={handleInputChange}
//           className="bg-white text-black border border-transparent focus:border-white rounded-lg py-2 px-3 pl-10 outline-none w-full"
//           aria-label="Search"
//         />
//         <button type="submit" className="absolute left-3" aria-label="Search">
//           <SearchIcon className="h-5 w-5 text-black" />
//         </button>
//       </form>
//       {/* Icons */}
//       <div className="flex items-center space-x-6 bg-purple-800 p-2 pl-3 pr-3 rounded-lg">
//         <div className="cursor-pointer" aria-label="Notifications">
//           <BellIcon className="text-white hover:text-black hover:transition hover:duration-300" />
//         </div>
//       </div>

//       {/* Search Results */}
//       {(profileResults.length > 0 ||
//         postResults.length > 0 ||
//         projectResults.length > 0) && (
//         <div className="pt-5 pb-5 pl-12 text-left search-results bg-purple-200 ml-12 text-black absolute top-16 left-80 w-1/2 rounded-md shadow-lg z-50">
//           {profileResults.length > 0 && (
//             <div className="profiles-results mb-4">
//               <h2 className="text-2xl font-bold mb-2">Profiles</h2>
//               {profileResults.map((profile, index) => (
//                 <div
//                   key={index}
//                   className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
//                   onClick={() => handleResultClick(searchQuery)}
//                 >
//                   <div className="flex items-center mt-1">
//                     <FontAwesomeIcon
//                       icon={faSearch}
//                       style={{ marginRight: "10px" }}
//                     />
//                     <h3 className="font-semibold text-lg">
//                       {profile.fullName}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {postResults.length > 0 && (
//             <div className="posts-results mb-4">
//               <h2 className="text-2xl font-bold mb-2">Posts</h2>
//               {postResults.map((post, index) => (
//                 <div
//                   key={index}
//                   className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
//                   onClick={() => handleResultClick(searchQuery)}
//                 >
//                   <div className="flex items-center mt-1">
//                     <FontAwesomeIcon
//                       icon={faSearch}
//                       style={{ marginRight: "10px" }}
//                     />
//                     <h3 className="font-semibold text-lg">
//                       {post.postContent}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {projectResults.length > 0 && (
//             <div className="projects-results">
//               <h2 className="text-2xl font-bold mb-2">Projects</h2>
//               {projectResults.map((project, index) => (
//                 <div
//                   key={index}
//                   className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
//                   onClick={() => handleResultClick(searchQuery)}
//                 >
//                   <div className="flex items-center mt-1">
//                     <FontAwesomeIcon
//                       icon={faSearch}
//                       style={{ marginRight: "10px" }}
//                     />
//                     <h3 className="font-semibold text-lg">{project.concept}</h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import BellIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function TopBar({ onBellClick }) {
  // Accept the toggle function as a prop
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profileResults, setProfileResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [projectResults, setProjectResults] = useState([]);
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [profilesResponse, postsResponse, projectsResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:9002/api/search/getallprofiles",
              config
            ),
            axios.get("http://localhost:9002/api/search/getallposts", config),
            axios.get("http://localhost:9002/api/search/projects", config),
          ]);
        console.log(profilesResponse);
        setProfiles(profilesResponse.data);
        setPosts(postsResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = useCallback(
    _.debounce((query) => {
      if (query.trim()) {
        const profileResults = searchData(profiles, query.toLowerCase());
        const postResults = searchData(posts, query.toLowerCase(), [
          "postContent",
          "tags",
          "username",
        ]);
        const projectResults = searchData(projects, query.toLowerCase(), [
          "concept",
          "problem",
          "username",
          "solution",
          "industries",
          "fundingStatus",
        ]);
        console.log(projectResults);
        setProfileResults(profileResults);
        setPostResults(postResults);
        setProjectResults(projectResults);
      }
    }, 300), // Adjust the debounce delay as needed
    [profiles, posts, projects]
  );

  const searchData = (
    data,
    query,
    fields = [
      "fullName",
      "username",
      "email",
      "bio",
      "experience",
      "education",
      "achievements",
      "designation",
      "company",
      "industries",
      "employment",
    ]
  ) => {
    return data.filter((item) => {
      return fields.some((field) => {
        if (Array.isArray(item[field])) {
          return item[field].some((subField) =>
            subField.toLowerCase().includes(query)
          );
        }
        return item[field] && item[field].toLowerCase().includes(query);
      });
    });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleResultClick = (query) => {
    navigate(`/search-results?query=${query}`);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } flex items-end justify-end bg-black p-4`}
    >
      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center w-full max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          className="bg-white text-black border-2 border-black focus:border-black rounded-lg py-2 pl-10 pr-3 outline-none w-full"
          aria-label="Search"
        />
        <button type="submit" className="absolute left-3" aria-label="Search">
          <SearchIcon className="h-5 w-5 text-black" />
        </button>
      </form>
      {/* Icons */}
      <div className="block lg:hidden flex items-center space-x-6 bg-purple-800 p-2 pl-3 pr-3 rounded-lg">
        <div
          className="cursor-pointer"
          aria-label="Notifications"
          onClick={onBellClick}
        >
          <BellIcon className="text-white hover:text-black hover:transition hover:duration-300 " />
        </div>
      </div>

      {/* Search Results */}
      {(profileResults.length > 0 ||
        postResults.length > 0 ||
        projectResults.length > 0) && (
        <div className="pt-5 pb-5 px-4 text-left search-results bg-purple-200 text-black absolute top-16 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 h-1/2 overflow-auto rounded-md shadow-lg z-50">
          {profileResults.length > 0 && (
            <div className="profiles-results mb-4">
              <h2 className="text-2xl font-bold mb-2">Profiles</h2>
              {profileResults.map((profile, index) => (
                <div
                  key={index}
                  className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
                  onClick={() => handleResultClick(searchQuery)}
                >
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "10px" }}
                    />
                    <h3 className="font-semibold text-lg">
                      {profile.fullName}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          {postResults.length > 0 && (
            <div className="posts-results mb-4">
              <h2 className="text-2xl font-bold mb-2">Posts</h2>
              {postResults.map((post, index) => (
                <div
                  key={index}
                  className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
                  onClick={() => handleResultClick(searchQuery)}
                >
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "10px" }}
                    />
                    <h3 className="font-semibold text-lg">
                      {post.postContent}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          {projectResults.length > 0 && (
            <div className="projects-results">
              <h2 className="text-2xl font-bold mb-2">Projects</h2>
              {projectResults.map((project, index) => (
                <div
                  key={index}
                  className="result-item cursor-pointer p-2 hover:bg-purple-300 rounded-md transition-all duration-200"
                  onClick={() => handleResultClick(searchQuery)}
                >
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "10px" }}
                    />
                    <h3 className="font-semibold text-lg">{project.concept}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
