// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";
// import ShareIcon from "@mui/icons-material/Share";
// import Avatar from "@mui/material/Avatar";
// import _ from "lodash";
// import Post from "./Project_comp/Project_Posts/Post";
// import Navbar from "./Navbar";
// import Select from "react-select";

// const CommentsSection = ({ post }) => {
//   const [showAllComments, setShowAllComments] = useState(false);

//   const handleShowMoreComments = () => {
//     setShowAllComments(true);
//   };

//   const handleHideComments = () => {
//     setShowAllComments(false);
//   };

//   const commentsToShow = showAllComments
//     ? post.comments
//     : post.comments.slice(0, 1);

//   return (
//     <div className="mt-4 rounded p-1 w-full">
//       {commentsToShow.map((comment, index) => (
//         <div
//           key={index}
//           className="flex items-left text-white p-2 rounded-lg mb-2"
//         >
//           <div className="flex items-center mb-2">
//             <Avatar
//               src={`http://localhost:9002/uploads/${comment.profileimageUrl}`}
//               alt={comment.username}
//               className="mr-2"
//             />
//           </div>
//           <div className="grid items-left mt-2 w-full p-2 rounded bg-purple-600">
//             <div className="text-left w-full">
//               <p className="text-xl font-bold">{comment.username}</p>
//               <p className="text-sm font-bold">{comment.designation}</p>
//             </div>
//             <div className="w-full">
//               <p className="text-sm mt-2 flex items-left">{comment.comment}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//       {post.comments.length > 1 && !showAllComments && (
//         <button
//           onClick={handleShowMoreComments}
//           className="text-sm text-white hover:underline mt-2"
//         >
//           More Comments
//         </button>
//       )}
//       {showAllComments && (
//         <button
//           onClick={handleHideComments}
//           className="text-sm text-white hover:underline mt-2"
//         >
//           Hide Comments
//         </button>
//       )}
//     </div>
//   );
// };

// const SearchResults = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("query");

//   const navigate = useNavigate();
//   const [profileResults, setProfileResults] = useState([]);
//   const [postResults, setPostResults] = useState([]);
//   const [projectResults, setProjectResults] = useState([]);
//   const userId = localStorage.getItem("userId");

//   const [selectedIndustry, setSelectedIndustry] = useState("");
//   const [selectedExperience, setSelectedExperience] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedPatents, setSelectedPatents] = useState("");
//   const [selectedFundingStatus, setSelectedFundingStatus] = useState("");
//   const [selectedStartupStatus, setSelectedStartupStatus] = useState("");
//   const [selectedRolesStatus, setSelectedRolesStatus] = useState("");
//   const [selectedPitchDeckStatus, setSelectedPitchDeckStatus] = useState("");
//   const [selectedContentType, setSelectedContentType] = useState("");
//   const [selectedSortBy, setSelectedSortBy] = useState("");
//   const [selectedSkillsStatus, setSelectedSkillsStatus] = useState("");
//   const [selectedCommitmentsStatus, setSelectedCommitmentsStatus] =
//     useState("");
//   const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState("");
//   const [selectedSkills, setSelectedSkills] = useState("");
//   const [selectedDomains, setSelectedDomains] = useState("");
//   const [selectedusername, setSelectedUsername] = useState("");
//   const [locationStatus, setLocationStatus] = useState([]);
//   const [locationvalue, setlocationvalue] = useState("");
//   const [activeFilter, setActiveFilter] = useState("profiles");

//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedCitypro, setSelectedCityPro] = useState(null);
//   const [isLoadingpro, setIsLoadingPro] = useState(false);
//   const [locationStatusPro, setLocationStatusPro] = useState([]);

//   const fetchCities = async (inputValue) => {
//     if (!inputValue) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.get("http://api.geonames.org/searchJSON", {
//         params: {
//           q: inputValue,
//           maxRows: 10,
//           username: "hephzibah", // Replace with your Geonames username
//         },
//       });
//       const options = response.data.geonames.map((city) => ({
//         value: city.name,
//         label: city.name,
//       }));
//       setCityOptions(options);
//     } catch (error) {
//       console.error("Error fetching cities data:", error);
//     }
//     setIsLoading(false);
//   };

//   const handleCityInputChange = (inputValue) => {
//     fetchCities(inputValue);
//   };
//   const handleCityChange = (selectedOption) => {
//     console.log(selectedOption.value);
//     setLocationStatus(selectedOption.value);
//   };

//   const handleCityInputChangePro = (inputValue) => {
//     fetchCities(inputValue);
//   };
//   const handleCityChangePro = (selectedOption) => {
//     console.log(selectedOption.value);
//     setLocationStatusPro(selectedOption.value);
//   };

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
//           "username",
//           "problem",
//           "solution",
//           "industries",
//           "fundingStatus",
//         ]);
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
//       "location",
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

//   const filterResults = (results, filter, field, isDate = false) => {
//     if (!filter) return results;
//     if (isDate) {
//       let filterDate;

//       switch (filter) {
//         case "last week":
//           filterDate = new Date();
//           filterDate.setDate(filterDate.getDate() - 7);
//           break;
//         case "last month":
//           filterDate = new Date();
//           filterDate.setMonth(filterDate.getMonth() - 1);
//           break;
//         case "last year":
//           filterDate = new Date();
//           filterDate.setFullYear(filterDate.getFullYear() - 1);
//           break;
//         default:
//           filterDate = new Date(filter);
//       }

//       return results.filter((result) => {
//         const resultDate = new Date(result[field]);
//         return resultDate >= filterDate;
//       });
//     }
//     if (field === "roles")
//       return results.filter((result) =>
//         result[field].some((role) => role.name.includes(filter))
//       );
//     if (field === "skillSets")
//       return results.filter((result) =>
//         result[field].some((skill) => skill.category.includes(filter))
//       );
//     if (field === "subcategory")
//       return results.filter((result) =>
//         result["skillSets"].some((skill) => skill.subcategory.includes(filter))
//       );
//     if (field === "username")
//       return results.filter((result) =>
//         result[field].some((role) => role.username.includes(filter))
//       );

//     if (field === "skills") {
//       console.log(`Filtering by skills with filter: ${filter}`);
//       const filteredResults = results.filter((result) =>
//         result.roles.some((role) =>
//           role.skills.some((skill) => skill.includes(filter))
//         )
//       );
//       console.log("Filtered Results:", filteredResults);
//       return filteredResults;
//     }

//     if (field === "commitments") {
//       return results.filter((result) =>
//         result.roles.some((role) =>
//           role.commitments.toLowerCase().includes(filter.toLowerCase())
//         )
//       );
//     }
//     if (field === "pitchDeck") {
//       if (filter === "Yes") {
//         return results.filter(
//           (result) => result[field] !== null && result[field] !== ""
//         );
//       }
//       if (filter === "No") {
//         return results.filter(
//           (result) => result[field] === null || result[field] === ""
//         );
//       }
//     }
//     return results.filter((result) => result[field].includes(filter));
//   };

//   useEffect(() => {
//     if (query) {
//       handleSearch(query);
//     }
//   }, [query, handleSearch]);

//   useEffect(() => {
//     let filteredProfiles = profileResults;
//     let filteredPosts = postResults;
//     let filteredProjects = projectResults;

//     if (activeFilter === "profiles") {
//       filteredProfiles = filterResults(
//         filteredProfiles,
//         selectedIndustry,
//         "industries"
//       );
//       filteredProfiles = filterResults(
//         filteredProfiles,
//         selectedCommitmentsStatus,
//         "employment"
//       );
//       filteredProfiles = filterResults(
//         filteredProfiles,
//         selectedSkills,
//         "skillSets"
//       );
//       filteredProfiles = filterResults(
//         filteredProfiles,
//         selectedDomains,
//         "subcategory"
//       );
//       filteredProfiles = filterResults(
//         filteredProfiles,
//         locationStatus,
//         "location"
//       );
//     } else if (activeFilter === "posts") {
//       filteredPosts = filterResults(
//         filteredPosts,
//         selectedusername,
//         "username"
//       );
//       filteredPosts = filterResults(
//         filteredPosts,
//         selectedDate,
//         "createdAt",
//         true
//       );
//     } else if (activeFilter === "projects") {
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedExperience,
//         "experience"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedPatents,
//         "patent"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedFundingStatus,
//         "fundingStatus"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedStartupStatus,
//         "startupStage"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedRolesStatus,
//         "roles"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedPitchDeckStatus,
//         "pitchDeck"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedSkillsStatus,
//         "skills"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedCommitmentsStatus,
//         "commitments"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         selectedEmploymentStatus,
//         "employment"
//       );
//       filteredProjects = filterResults(
//         filteredProjects,
//         locationStatusPro,
//         "location"
//       );
//     }
//     console.log(filteredProjects);
//     setProfileResults(filteredProfiles);
//     setPostResults(filteredPosts);
//     setProjectResults(filteredProjects);
//   }, [
//     selectedIndustry,
//     selectedExperience,
//     locationStatusPro,
//     selectedDomains,
//     selectedDate,
//     selectedSkills,
//     locationStatus,
//     selectedusername,
//     selectedPatents,
//     selectedFundingStatus,
//     selectedCommitmentsStatus,
//     selectedEmploymentStatus,
//     selectedStartupStatus,
//     selectedRolesStatus,
//     selectedPitchDeckStatus,
//     selectedSkillsStatus,
//     activeFilter,
//     profiles,
//     posts,
//     projects,
//   ]);

//   const handlelocationchange = (e) => {
//     const { value } = e.target;
//     setLocationStatus(value);
//   };

//   const handleusernamechange = (e) => {
//     const { value } = e.target;

//     setSelectedUsername(value);
//   };

//   const handleLike = async (postId, isLiked) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       if (isLiked) {
//         // Unlike the post
//         const response = await axios.delete(
//           `http://localhost:9002/api/posts/likePost/${postId}`,
//           config
//         );
//         setPosts((prevDetails) =>
//           prevDetails.map((post) =>
//             post._id === postId
//               ? { ...post, likes: response.data.likes, isLiked: false }
//               : post
//           )
//         );
//       } else {
//         // Like the post
//         const response = await axios.post(
//           `http://localhost:9002/api/posts/likePost/${postId}`,
//           {},
//           config
//         );
//         setPosts((prevDetails) =>
//           prevDetails.map((post) =>
//             post._id === postId
//               ? { ...post, likes: response.data.likes, isLiked: true }
//               : post
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleShare = async (postId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.post(
//         `http://localhost:9002/api/posts/sharePost/${postId}`,
//         {},
//         config
//       );
//       setPosts((prevDetails) =>
//         prevDetails.map((post) =>
//           post._id === postId ? { ...post, shares: response.data.shares } : post
//         )
//       );
//     } catch (error) {
//       console.error("Error sharing post:", error);
//     }
//   };

//   const handleComment = async (postId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.post(
//         `http://localhost:9002/api/posts/commentPost/${postId}`,
//         { comment: newComment },
//         config
//       );
//       setPosts((prevDetails) =>
//         prevDetails.map((post) =>
//           post._id === postId
//             ? { ...post, comments: response.data.comments }
//             : post
//         )
//       );
//       setNewComment("");
//     } catch (error) {
//       console.error("Error commenting on post:", error);
//     }
//   };

//   const handleProfileClick = (username) => {
//     navigate(`/user/${username}`);
//   };

//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
//   };

//   const renderProfiles = () =>
//     profileResults.length === 0 ? (
//       <p className="text-white italic">No profiles to show</p>
//     ) : (
//       profileResults.map((profile) => (
//         <div
//           key={profile._id}
//           className="bg-black text-white p-5 m-10 w-3/4 rounded-lg shadow-lg border-4 border-white mb-4 cursor-pointer"
//           onClick={() => handleProfileClick(profile.username)}
//         >
//           <div className="flex items-center">
//             <Avatar
//               src={`http://localhost:9002/uploads/${profile.profileImage}`}
//               alt={profile.fullName}
//               className="mr-4"
//             />
//             <div className="text-left">
//               <h3 className="text-lg font-bold">{profile.username}</h3>
//               <h3 className="text-xl text-white w-full">
//                 {profile.designation}
//               </h3>
//               <h3 className="text-xl text-white w-full">{profile.bio}</h3>
//               <p className="text-purple-500">{profile.bio}</p>
//             </div>
//           </div>
//         </div>
//       ))
//     );

//   const renderPosts = () =>
//     postResults.length === 0 ? (
//       <p className="text-white italic">No posts to show</p>
//     ) : (
//       <div className="flex justify-center">
//         <div className="w-full md:w-3/4 lg:w-1/2">
//           {postResults.map((post) => (
//             <div
//               key={post._id}
//               className="bg-black text-white p-6 m-4 rounded-lg shadow-sm border border-gray-300"
//             >
//               <div className="flex items-center mb-4">
//                 <Avatar
//                   src={`http://localhost:9002/uploads/${post.profileimageUrl}`}
//                   alt={post.username}
//                   className="mr-4"
//                 />
//                 <div className="text-left">
//                   <h3 className="text-lg font-bold">{post.username}</h3>
//                   <h4 className="text-sm text-white">{post.designation}</h4>
//                 </div>
//               </div>
//               <p className="text-left text-purple-600">{post.tags}</p>
//               <p className="mb-4 text-left">{post.postContent}</p>
//               {post.imageUrl && (
//                 <img
//                   src={`http://localhost:9002/uploads/${post.imageUrl}`}
//                   alt="Post"
//                   className="mb-4 max-w-full h-auto rounded-lg"
//                 />
//               )}
//               <div className="flex justify-between items-center mt-4">
//                 <div className="flex items-center">
//                   <FavoriteIcon
//                     className={`mr-1 cursor-pointer ${
//                       post.isLiked ? "text-red-500" : "text-gray-500"
//                     }`}
//                     onClick={() => handleLike(post._id, post.isLiked)}
//                   />
//                   <span className="text-gray-600">{post.likes.length}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CommentIcon className="mr-1 text-gray-500" />
//                   <span className="text-gray-600">{post.comments.length}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <ShareIcon
//                     className="mr-1 cursor-pointer text-gray-500"
//                     onClick={() => handleShare(post._id)}
//                   />
//                   <span className="text-gray-600">{post.shares.length}</span>
//                 </div>
//               </div>
//               <CommentsSection post={post} />
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Add a comment..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//                 <button
//                   onClick={() => handleComment(post._id)}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Post Comment
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//   const renderProjects = () =>
//     projectResults.length === 0 ? (
//       <p className="text-white italic">No projects to show</p>
//     ) : (
//       projectResults.map((project) => (
//         <Post
//           key={project._id}
//           projectId={project._id}
//           projectOwner={project.userId._id}
//           image={project.postImage}
//           date={new Date(project.createdAt).toLocaleDateString()}
//           category={project.startupType}
//           title={project.concept}
//           description={project.problem}
//           authorImage={project.profileimageUrl}
//           authorName={project.username}
//           authorRole={project.designation}
//           fundingStatus={project.fundingStatus}
//         />
//       ))
//     );

//   return (
//     <div className="bg-black min-h-screen">
//       <nav className="mb-12">
//         <Navbar />
//       </nav>
//       <div className="w-full mt-20">
//         {/* Filter section */}
//         <div className="w-full p-4 bg-purple-600 text-white">
//           <h2 className="text-2xl font-bold mb-4">Filters</h2>
//           <div className="flex flex-wrap mb-4">
//             <div className="mr-4">
//               <label className="block text-white text-sm font-bold mb-2">
//                 Filter by
//               </label>
//               <select
//                 value={activeFilter}
//                 onChange={(e) => setActiveFilter(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//               >
//                 <option value="profiles">Profiles</option>
//                 <option value="posts">Posts</option>
//                 <option value="projects">Projects</option>
//               </select>
//             </div>
//             {activeFilter === "profiles" && (
//               <div className="mr-4 flex flex-row ">
//                 <div className="flex flex-col mr-4">
//                   <label className="block px-4 py-1 text-white text-sm font-bold ">
//                     Industry
//                   </label>
//                   <select
//                     value={selectedIndustry}
//                     onChange={(e) => setSelectedIndustry(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Industry</option>
//                     {/* Populate these options with actual industry data */}
//                     <option value="AI">AI</option>
//                     <option value="Fintech">Fintech</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Ecoomerce">Ecommerce</option>
//                     <option value="IT Services">IT Services</option>
//                     <option value="Consulting">Consulting</option>
//                     <option value="AR/VR">AR/VR</option>
//                   </select>
//                 </div>

//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Employment
//                   </label>
//                   <select
//                     value={selectedEmploymentStatus}
//                     onChange={(e) =>
//                       setSelectedEmploymentStatus(e.target.value)
//                     }
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Employment Status</option>
//                     <option value="Student">Student</option>
//                     <option value="Self-employed">Working Professional</option>
//                     <option value="Unemployed">Unemployed</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Skills
//                   </label>
//                   <select
//                     value={selectedSkills}
//                     onChange={(e) => setSelectedSkills(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Skills category</option>
//                     <option value="Technical Skills">Technical Skills</option>
//                     <option value="Business and Management Skills">
//                       Business and Management Skills
//                     </option>
//                     <option value="Design and Creative Skills">
//                       Design and Creative Skills
//                     </option>
//                     <option value="Legal and Regulatory Skills">
//                       Legal and Regulatory Skills
//                     </option>
//                     <option value="Operational Skills">
//                       Operational Skills
//                     </option>

//                     {/* Populate these options with actual skills data */}
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Domain
//                   </label>
//                   <select
//                     value={selectedDomains}
//                     onChange={(e) => setSelectedDomains(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Domain category</option>
//                     <option value="Software Development">
//                       Software Development
//                     </option>
//                     <option value="Web Development">Web Development</option>
//                     <option value="Data Science">Data Science</option>
//                     <option value="Cybersecurity">Cybersecurity</option>
//                     <option value="Entrepreneurship">Entrepreneurship</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Sales">Sales</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Graphic Design">Graphic Design</option>
//                     <option value="Product Design">Product Design</option>
//                     <option value="Content Creation">Content Creation</option>
//                     <option value="Animation and Motion Graphics">
//                       Animation and Motion Graphics
//                     </option>
//                     <option value="Corporate Law">Corporate Law</option>
//                     <option value="Regulatory Affairs">
//                       Regulatory Affairs
//                     </option>
//                     <option value="Ethics and Compliance">
//                       Ethics and Compliance
//                     </option>
//                     <option value="Project Management">
//                       Project Management
//                     </option>
//                     <option value="Supply Chain Management">
//                       Supply Chain Management
//                     </option>
//                     <option value="Human Resources">Human Resources</option>
//                     <option value="Customer Service">Customer Service</option>

//                     {/* Populate these options with actual skills data */}
//                   </select>
//                 </div>

//                 <div className="col-span-1">
//                   <label
//                     className="flex text-white text-sm font-bold mb-2"
//                     htmlFor="city"
//                   >
//                     Location
//                   </label>
//                   <Select
//                     id="city"
//                     options={cityOptions}
//                     onInputChange={handleCityInputChange}
//                     onChange={handleCityChange}
//                     value={selectedCity}
//                     placeholder="Start typing a city..."
//                     isLoading={isLoading}
//                     className="text-gray-700"
//                   />
//                 </div>
//               </div>
//             )}
//             {activeFilter === "posts" && (
//               <>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Date
//                   </label>
//                   <select
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Date</option>
//                     {/* Populate these options with actual date data */}
//                     <option value="last week">Last week</option>
//                     <option value="last month">Last month</option>
//                     <option value="last year">Last year</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col mb-4">
//                   <label className="text-white text-sm font-bold mb-2">
//                     Filter by user
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={selectedusername}
//                     onChange={handleusernamechange}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   />
//                 </div>
//               </>
//             )}
//             {activeFilter === "projects" && (
//               <>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Patents
//                   </label>
//                   <select
//                     value={selectedPatents}
//                     onChange={(e) => setSelectedPatents(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Patents</option>
//                     {/* Populate these options with actual patent data */}
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Funding Status
//                   </label>
//                   <select
//                     value={selectedFundingStatus}
//                     onChange={(e) => setSelectedFundingStatus(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Funding Status</option>
//                     {/* Populate these options with actual funding status data */}
//                     <option value="Bootstrapped">Bootstrapped</option>
//                     <option value="Funded">Funded</option>
//                     <option value="Rather Not Say">Rather Not Say</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Startup Stage
//                   </label>
//                   <select
//                     value={selectedStartupStatus}
//                     onChange={(e) => setSelectedStartupStatus(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Startup Stage</option>
//                     {/* Populate these options with actual startup stage data */}
//                     <option value="Ideation">Ideation</option>
//                     <option value="Concept and Development">
//                       Concept and Development
//                     </option>
//                     <option value="Seed Stage">Seed Stage</option>
//                     <option value="Early Stage(Startup)">
//                       Early Stage(Startup)
//                     </option>
//                     <option value="Growth Stage">Growth Stage</option>
//                     <option value="Expansion Stage">Expansion Stage</option>
//                     <option value="Maturity Stage">Maturity Stage</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Roles
//                   </label>
//                   <select
//                     value={selectedRolesStatus}
//                     onChange={(e) => setSelectedRolesStatus(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Roles</option>
//                     {/* Populate these options with actual roles data */}
//                     <option value="Advisor">Advisor</option>
//                     <option value="Cofounder">Cofounder</option>
//                     <option value="Founding Member">Founding Member</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Pitch Deck
//                   </label>
//                   <select
//                     value={selectedPitchDeckStatus}
//                     onChange={(e) => setSelectedPitchDeckStatus(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Pitch Deck</option>
//                     {/* Populate these options with actual pitch deck data */}
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//                 <div className="mr-4">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Skills
//                   </label>
//                   <select
//                     value={selectedSkillsStatus}
//                     onChange={(e) => setSelectedSkillsStatus(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Skills</option>
//                     {/* Populate these options with actual skills data */}
//                     <option value="programming languages">
//                       Programming Languages
//                     </option>
//                     <option value="Software engineering">
//                       Software Engineering
//                     </option>
//                     <option value="App development">App Development</option>
//                     <option value="Front-end development">
//                       Front-end Development
//                     </option>
//                     <option value="Back-end development">
//                       Back-end Development
//                     </option>
//                     <option value="Web design">Web Design</option>
//                     <option value="User experience (UX)">
//                       User Experience (UX)
//                     </option>
//                     <option value="Data analysis">Data Analysis</option>
//                     <option value="Machine learning">Machine Learning</option>
//                     <option value="Artificial intelligence">
//                       Artificial Intelligence
//                     </option>
//                     <option value="Information security">
//                       Information Security
//                     </option>
//                     <option value="Ethical hacking">Ethical Hacking</option>
//                     <option value="Startup experience">
//                       Startup Experience
//                     </option>
//                     <option value="Business development">
//                       Business Development
//                     </option>
//                     <option value="Strategic planning">
//                       Strategic Planning
//                     </option>
//                     <option value="Digital marketing">Digital Marketing</option>
//                     <option value="Social media management">
//                       Social Media Management
//                     </option>
//                     <option value="SEO/SEM">SEO/SEM</option>
//                     <option value="Content creation">Content Creation</option>
//                     <option value="Sales strategy">Sales Strategy</option>
//                     <option value="Lead generation">Lead Generation</option>
//                     <option value="Customer relationship management (CRM)">
//                       Customer Relationship Management (CRM)
//                     </option>
//                     <option value="Financial planning">
//                       Financial Planning
//                     </option>
//                     <option value="Accounting">Accounting</option>
//                     <option value="Investment management">
//                       Investment Management
//                     </option>
//                     <option value="Visual design">Visual Design</option>
//                     <option value="Branding">Branding</option>
//                     <option value="Adobe Creative Suite proficiency">
//                       Adobe Creative Suite Proficiency
//                     </option>
//                     <option value="User interface (UI) design">
//                       User Interface (UI) Design
//                     </option>
//                     <option value="Product development">
//                       Product Development
//                     </option>
//                     <option value="Prototyping">Prototyping</option>
//                     <option value="Writing">Writing</option>
//                     <option value="Video production">Video Production</option>
//                     <option value="Multimedia storytelling">
//                       Multimedia Storytelling
//                     </option>
//                     <option value="2D/3D animation">2D/3D Animation</option>
//                     <option value="Motion design">Motion Design</option>
//                     <option value="Legal compliance">Legal Compliance</option>
//                     <option value="Intellectual property">
//                       Intellectual Property
//                     </option>
//                     <option value="Contract negotiation">
//                       Contract Negotiation
//                     </option>
//                     <option value="Understanding of industry regulations">
//                       Understanding of Industry Regulations
//                     </option>
//                     <option value="Standards">Standards</option>
//                     <option value="Corporate ethics">Corporate Ethics</option>
//                     <option value="Compliance programs">
//                       Compliance Programs
//                     </option>
//                     <option value="Risk management">Risk Management</option>
//                     <option value="Agile/Scrum methodologies">
//                       Agile/Scrum Methodologies
//                     </option>
//                     <option value="Project planning">Project Planning</option>
//                     <option value="Team coordination">Team Coordination</option>
//                     <option value="Logistics">Logistics</option>
//                     <option value="Procurement">Procurement</option>
//                     <option value="Inventory management">
//                       Inventory Management
//                     </option>
//                     <option value="Recruitment">Recruitment</option>
//                     <option value="Talent management">Talent Management</option>
//                     <option value="Organizational development">
//                       Organizational Development
//                     </option>
//                     <option value="Customer support">Customer Support</option>
//                     <option value="Satisfaction management">
//                       Satisfaction Management
//                     </option>
//                     <option value="Service delivery">Service Delivery</option>
//                   </select>
//                 </div>
//                 <div className="ml-12 pl-12 mt-4 ">
//                   <label className="block text-white text-sm font-bold mb-2">
//                     Commitment
//                   </label>
//                   <select
//                     value={selectedCommitmentsStatus}
//                     onChange={(e) =>
//                       setSelectedCommitmentsStatus(e.target.value)
//                     }
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//                   >
//                     <option value="">Select Commitment</option>
//                     {/* Populate these options with actual pitch deck data */}
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                   </select>
//                 </div>
//                 <div className="col-span-1">
//                   <label
//                     className="flex text-white text-sm font-bold mb-2"
//                     htmlFor="city"
//                   >
//                     Location
//                   </label>
//                   <Select
//                     id="city"
//                     options={cityOptions}
//                     onInputChange={handleCityInputChangePro}
//                     onChange={handleCityChangePro}
//                     value={selectedCitypro}
//                     placeholder="Start typing a city..."
//                     isLoading={isLoadingpro}
//                     className="text-gray-700"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* Main content */}
//         <div className="flex justify-center">
//           <div className="w-1/4 h-1/2 p-5 border-4 rounded-lg text-white m-10">
//             <h2 className="text-2xl font-bold mb-4">On this page</h2>
//             <ul className="ml-auto">
//               <li
//                 className="cursor-pointer hover mb-2 font-bold"
//                 onClick={() => scrollToSection("profiles-section")}
//               >
//                 Profiles
//               </li>
//               <li
//                 className="cursor-pointer hover mb-2 font-bold"
//                 onClick={() => scrollToSection("posts-section")}
//               >
//                 Posts
//               </li>
//               <li
//                 className="cursor-pointer hover mb-2 font-bold"
//                 onClick={() => scrollToSection("projects-section")}
//               >
//                 Projects
//               </li>
//             </ul>
//           </div>
//           <div className="w-3/4 p-4">
//             {activeFilter === "profiles" && (
//               <div id="profiles-section" className="mb-8">
//                 <h2 className="text-2xl font-bold mb-2 text-white">Profiles</h2>
//                 {renderProfiles()}
//               </div>
//             )}
//             {activeFilter === "posts" && (
//               <div id="posts-section" className="mb-8">
//                 <h2 className="text-2xl font-bold mb-2 text-white">Posts</h2>
//                 {renderPosts()}
//               </div>
//             )}
//             {activeFilter === "projects" && (
//               <div id="projects-section">
//                 <h2 className="text-2xl font-bold mb-2 text-white">Projects</h2>
//                 {renderProjects()}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResults;

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import _ from "lodash";
import Post from "./Project_comp/Project_Posts/Post";
import Navbar from "./Navbar";
import Select from "react-select";

const CommentsSection = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const handleHideComments = () => {
    setShowAllComments(false);
  };

  const commentsToShow = showAllComments
    ? post.comments
    : post.comments.slice(0, 1);

  return (
    <div className="mt-4 rounded p-1 w-full">
      {commentsToShow.map((comment, index) => (
        <div
          key={index}
          className="flex items-left text-white p-2 rounded-lg mb-2"
        >
          <div className="flex items-center mb-2">
            <Avatar
              src={`http://localhost:9002/uploads/${comment.profileimageUrl}`}
              alt={comment.username}
              className="mr-2"
            />
          </div>
          <div className="grid items-left mt-2 w-full p-2 rounded bg-purple-600">
            <div className="text-left w-full">
              <p className="text-xl font-bold">{comment.username}</p>
              <p className="text-sm font-bold">{comment.designation}</p>
            </div>
            <div className="w-full">
              <p className="text-sm mt-2 flex items-left">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
      {post.comments.length > 1 && !showAllComments && (
        <button
          onClick={handleShowMoreComments}
          className="text-sm text-white hover:underline mt-2"
        >
          More Comments
        </button>
      )}
      {showAllComments && (
        <button
          onClick={handleHideComments}
          className="text-sm text-white hover:underline mt-2"
        >
          Hide Comments
        </button>
      )}
    </div>
  );
};

const SearchResults = () => {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const navigate = useNavigate();
  const [profileResults, setProfileResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [projectResults, setProjectResults] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const userId = localStorage.getItem("userId");

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPatents, setSelectedPatents] = useState("");
  const [selectedFundingStatus, setSelectedFundingStatus] = useState("");
  const [selectedStartupStatus, setSelectedStartupStatus] = useState("");
  const [selectedRolesStatus, setSelectedRolesStatus] = useState("");
  const [selectedPitchDeckStatus, setSelectedPitchDeckStatus] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedSkillsStatus, setSelectedSkillsStatus] = useState("");
  const [selectedCommitmentsStatus, setSelectedCommitmentsStatus] =
    useState("");
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [selectedDomains, setSelectedDomains] = useState("");
  const [selectedusername, setSelectedUsername] = useState("");
  const [locationStatus, setLocationStatus] = useState([]);
  const [locationvalue, setlocationvalue] = useState("");
  const [activeFilter, setActiveFilter] = useState("profiles");

  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCitypro, setSelectedCityPro] = useState(null);
  const [isLoadingpro, setIsLoadingPro] = useState(false);
  const [locationStatusPro, setLocationStatusPro] = useState([]);

  const fetchCities = async (inputValue) => {
    if (!inputValue) return;

    setIsLoading(true);
    try {
      const response = await axios.get("http://api.geonames.org/searchJSON", {
        params: {
          q: inputValue,
          maxRows: 10,
          username: "hephzibah", // Replace with your Geonames username
        },
      });
      const options = response.data.geonames.map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(options);
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
    setIsLoading(false);
  };

  const handleCityInputChange = (inputValue) => {
    fetchCities(inputValue);
  };
  const handleCityChange = (selectedOption) => {
    console.log(selectedOption.value);
    setLocationStatus(selectedOption.value);
  };

  const handleCityInputChangePro = (inputValue) => {
    fetchCities(inputValue);
  };
  const handleCityChangePro = (selectedOption) => {
    console.log(selectedOption.value);
    setLocationStatusPro(selectedOption.value);
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

        const [profilesResponse, postsResponse, projectsResponse] =
          await Promise.all([
            axios.get("http://localhost:9002/api/search/getallprofiles", config),
            axios.get("http://localhost:9002/api/search/getallposts", config),
            axios.get("http://localhost:9002/api/search/projects", config),
          ]);

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
          "username",
          "problem",
          "solution",
          "industries",
          "fundingStatus",
        ]);
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
      "location",
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

  const filterResults = (results, filter, field, isDate = false) => {
    if (!filter) return results;
    if (isDate) {
      let filterDate;

      switch (filter) {
        case "last week":
          filterDate = new Date();
          filterDate.setDate(filterDate.getDate() - 7);
          break;
        case "last month":
          filterDate = new Date();
          filterDate.setMonth(filterDate.getMonth() - 1);
          break;
        case "last year":
          filterDate = new Date();
          filterDate.setFullYear(filterDate.getFullYear() - 1);
          break;
        default:
          filterDate = new Date(filter);
      }

      return results.filter((result) => {
        const resultDate = new Date(result[field]);
        return resultDate >= filterDate;
      });
    }
    if (field === "roles")
      return results.filter((result) =>
        result[field].some((role) => role.name.includes(filter))
      );
    if (field === "skillSets")
      return results.filter((result) =>
        result[field].some((skill) => skill.category.includes(filter))
      );
    if (field === "subcategory")
      return results.filter((result) =>
        result["skillSets"].some((skill) => skill.subcategory.includes(filter))
      );
      if (field === "employment") {
        return results.filter(result => {
          const value = result[field];
          return value && value.includes(filter);
      });
      }

    if (field === "skills") {
      console.log(`Filtering by skills with filter: ${filter}`);
      const filteredResults = results.filter((result) =>
        result.roles.some((role) =>
          role.skills.some((skill) => skill.includes(filter))
        )
      );
      console.log("Filtered Results:", filteredResults);
      return filteredResults;
    }

    if (field === "commitments") {
      return results.filter((result) =>
        result.roles.some((role) =>
          role.commitments.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    if (field === "pitchDeck") {
      if (filter === "Yes") {
        return results.filter(
          (result) => result[field] !== null && result[field] !== ""
        );
      }
      if (filter === "No") {
        return results.filter(
          (result) => result[field] === null || result[field] === ""
        );
      }
    }
    return results.filter((result) => result[field].includes(filter));
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query, handleSearch]);

  useEffect(() => {
    let filteredProfiles = profileResults;
    let filteredPosts = postResults;
    let filteredProjects = projectResults;

    if (activeFilter === "profiles") {
      filteredProfiles = filterResults(
        filteredProfiles,
        selectedIndustry,
        "industries"
      );
      filteredProfiles = filterResults(
        filteredProfiles,
        selectedEmploymentStatus,
        "employment"
      );
      filteredProfiles = filterResults(
        filteredProfiles,
        selectedSkills,
        "skillSets"
      );
      filteredProfiles = filterResults(
        filteredProfiles,
        selectedDomains,
        "subcategory"
      );
      filteredProfiles = filterResults(
        filteredProfiles,
        locationStatus,
        "location"
      );
    } else if (activeFilter === "posts") {
      filteredPosts = filterResults(
        filteredPosts,
        selectedusername,
        "username"
      );
      filteredPosts = filterResults(
        filteredPosts,
        selectedDate,
        "createdAt",
        true
      );
    } else if (activeFilter === "projects") {
      filteredProjects = filterResults(
        filteredProjects,
        selectedExperience,
        "experience"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedPatents,
        "patent"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedFundingStatus,
        "fundingStatus"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedStartupStatus,
        "startupStage"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedRolesStatus,
        "roles"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedPitchDeckStatus,
        "pitchDeck"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedSkillsStatus,
        "skills"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedCommitmentsStatus,
        "commitments"
      );
      filteredProjects = filterResults(
        filteredProjects,
        selectedEmploymentStatus,
        "employment"
      );
      filteredProjects = filterResults(
        filteredProjects,
        locationStatusPro,
        "location"
      );
    }
    console.log(filteredProjects);
    setProfileResults(filteredProfiles);
    setPostResults(filteredPosts);
    setProjectResults(filteredProjects);
  }, [
    selectedIndustry,
    selectedExperience,
    locationStatusPro,
    selectedDomains,
    selectedDate,
    selectedSkills,
    locationStatus,
    selectedusername,
    selectedPatents,
    selectedFundingStatus,
    selectedCommitmentsStatus,
    selectedEmploymentStatus,
    selectedStartupStatus,
    selectedRolesStatus,
    selectedPitchDeckStatus,
    selectedSkillsStatus,
    activeFilter,
    profiles,
    posts,
    projects,
  ]);

  const handlelocationchange = (e) => {
    const { value } = e.target;
    setLocationStatus(value);
  };

  const handleusernamechange = (e) => {
    const { value } = e.target;

    setSelectedUsername(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Initialize isLiked property
        const updatedPosts = postResults.map((post) => ({
          ...post,
          isLiked: post.likes.includes(userId),
        }));
        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  const handleLike = async (postId, isLiked) => {
    try {
      console.log(isLiked);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isLiked) {
        // Unlike the post
        const response = await axios.delete(
          `http://localhost:9002/api/posts/likePost/${postId}`,
          config
        );
        setPostResults((prevDetails) =>
          prevDetails.map((post) =>
            post._id === postId
              ? { ...post, likes: response.data.likes, isLiked: false }
              : post
          )
        );
      } else {
        // Like the post
        const response = await axios.post(
          `http://localhost:9002/api/posts/likePost/${postId}`,
          {},
          config
        );
        setPostResults((prevDetails) =>
          prevDetails.map((post) =>
            post._id === postId
              ? { ...post, likes: response.data.likes, isLiked: true }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:9002/api/posts/sharePost/${postId}`,
        {},
        config
      );
      setPosts((prevDetails) =>
        prevDetails.map((post) =>
          post._id === postId ? { ...post, shares: response.data.shares } : post
        )
      );
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:9002/api/posts/commentPost/${postId}`,
        { comment: newComment },
        config
      );
      setPostResults((prevDetails) =>
        prevDetails.map((post) =>
          post._id === postId
            ? { ...post, comments: response.data.comments }
            : post
        )
      );
      setNewComment("");
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const handleProfileClick = (username) => {
    navigate(`/user/${username}`);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  const renderProfiles = () =>
    profileResults.length === 0 ? (
      <p className="text-white text-center italic">No profiles to show</p>
    ) : (
      profileResults.map((profile) => (
        <div
          key={profile._id}
          className="bg-black text-white p-5 m-10 w-3/4 rounded-lg shadow-lg border-4 border-white mb-4 cursor-pointer"
          onClick={() => handleProfileClick(profile.username)}
        >
          <div className="flex items-center">
            <Avatar
              src={`http://localhost:9002/uploads/${profile.profileImage}`}
              alt={profile.fullName}
              className="mr-4"
            />
            <div className="text-left">
              <h3 className="text-lg font-bold">{profile.username}</h3>
              <h3 className="text-xl text-white w-full">
                {profile.designation}
              </h3>
              <h3 className="text-xl text-white w-full">{profile.bio}</h3>
              <p className="text-purple-500">{profile.bio}</p>
            </div>
          </div>
        </div>
      ))
    );
  console.log("bye");
  console.log(postResults);
  const renderPosts = () =>
    postResults.length === 0 ? (
      <p className="text-white italic">No posts to show</p>
    ) : (
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          {postResults.map((post) => (
            <div
              key={post._id}
              className="bg-black text-white p-6 m-4 rounded-lg shadow-sm border border-gray-300"
            >
              <div className="flex items-center mb-4">
                <Avatar
                  src={`http://localhost:9002/uploads/${post.profileimageUrl}`}
                  alt={post.username}
                  className="mr-4"
                />
                <div className="text-left">
                  <h3 className="text-lg font-bold">{post.username}</h3>
                  <h4 className="text-sm text-white">{post.designation}</h4>
                </div>
              </div>
              <p className="text-left text-purple-600">{post.tags}</p>
              <p className="mb-4 text-left">{post.postContent}</p>
              <p className="mb-4 text-left">{post.isLiked}</p>
              {post.imageUrl && (
                <img
                  src={`http://localhost:9002/uploads/${post.imageUrl}`}
                  alt="Post"
                  className="mb-4 max-w-full h-auto rounded-lg"
                />
              )}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <FavoriteIcon
                    className={`mr-1 cursor-pointer ${
                      post.isLiked ? "text-red-500" : ""
                    }`}
                    onClick={() => handleLike(post._id, post.isLiked)}
                  />
                  <span className="text-gray-600">{post.likes.length}</span>
                </div>
                <div className="flex items-center">
                  <CommentIcon className="mr-1 text-gray-500" />
                  <span className="text-gray-600">{post.comments.length}</span>
                </div>
                <div className="flex items-center">
                  <ShareIcon
                    className="mr-1 cursor-pointer text-gray-500"
                    onClick={() => handleShare(post._id)}
                  />
                  <span className="text-gray-600">{post.shares.length}</span>
                </div>
              </div>
              <CommentsSection post={post} />
              <div className="mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Post Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const renderProjects = () =>
    projectResults.length === 0 ? (
      <p className="text-white italic">No projects to show</p>
    ) : (
      projectResults.map((project) => (
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
      ))
    );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="w-full">
        {/* Filter section */}
        <div className="w-full p-4 bg-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4 mt-[70px]">Filters</h2>
          <div className="lg:flex lg:flex-wrap flex-col mb-4">
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
              <label className="block text-white text-sm font-bold mb-2">
                Filter by
              </label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              >
                <option value="profiles">Profiles</option>
                <option value="posts">Posts</option>
                <option value="projects">Projects</option>
              </select>
            </div>
            {activeFilter === "profiles" && (
              <div className="w-full lg:flex lg:flex-row flex-col">
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                  <label className="block px-4 py-1 text-white text-sm font-bold">
                    Industry
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                  >
                    <option value="">Select Industry</option>
                    <option value="AI">AI</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Ecoomerce">Ecommerce</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Consulting">Consulting</option>
                    <option value="AR/VR">AR/VR</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                  <label className="block text-white text-sm font-bold mb-2">
                    Employment
                  </label>
                  <select
                    value={selectedEmploymentStatus}
                    onChange={(e) =>
                      setSelectedEmploymentStatus(e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                  >
                    <option value="">Select Employment Status</option>
                    <option value="Student">Student</option>
                    <option value="Self-employed">Working Professional</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                  <label className="block text-white text-sm font-bold mb-2">
                    Skills
                  </label>
                  <select
                    value={selectedSkills}
                    onChange={(e) => setSelectedSkills(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                  >
                    <option value="">Select Skills category</option>
                    <option value="Technical Skills">Technical Skills</option>
                    <option value="Business and Management Skills">
                      Business and Management Skills
                    </option>
                    <option value="Design and Creative Skills">
                      Design and Creative Skills
                    </option>
                    <option value="Legal and Regulatory Skills">
                      Legal and Regulatory Skills
                    </option>
                    <option value="Operational Skills">
                      Operational Skills
                    </option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                  <label className="block text-white text-sm font-bold mb-2">
                    Domain
                  </label>
                  <select
                    value={selectedDomains}
                    onChange={(e) => setSelectedDomains(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                  >
                    <option value="">Select Domain category</option>
                    <option value="Software Development">
                      Software Development
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Content Creation">Content Creation</option>
                    <option value="Animation and Motion Graphics">
                      Animation and Motion Graphics
                    </option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Regulatory Affairs">
                      Regulatory Affairs
                    </option>
                    <option value="Ethics and Compliance">
                      Ethics and Compliance
                    </option>
                    <option value="Project Management">
                      Project Management
                    </option>
                    <option value="Supply Chain Management">
                      Supply Chain Management
                    </option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4 sm:mb-0">
                  <label
                    className="flex text-white text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    Location
                  </label>
                  <Select
                    id="city"
                    options={cityOptions}
                    onInputChange={handleCityInputChange}
                    onChange={handleCityChange}
                    value={selectedCity}
                    placeholder="Start typing a city..."
                    isLoading={isLoading}
                    className="text-gray-700"
                  />
                </div>
              </div>
            )}
            {activeFilter === "posts" && (
              <>
                <div className="w-full lg:flex lg:flex-row flex-col">
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Date</option>
                      <option value="last week">Last week</option>
                      <option value="last month">Last month</option>
                      <option value="last year">Last year</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col mb-4">
                    <label className="text-white text-sm font-bold mb-2">
                      Filter by user
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={selectedusername}
                      onChange={handleusernamechange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    />
                  </div>
                </div>
              </>
            )}
            {activeFilter === "projects" && (
              <>
                <div className="w-full flex flex-wrap ">
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Patents
                    </label>
                    <select
                      value={selectedPatents}
                      onChange={(e) => setSelectedPatents(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Patents</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Funding Status
                    </label>
                    <select
                      value={selectedFundingStatus}
                      onChange={(e) => setSelectedFundingStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Funding Status</option>
                      <option value="Bootstrapped">Bootstrapped</option>
                      <option value="Funded">Funded</option>
                      <option value="Rather Not Say">Rather Not Say</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Startup Stage
                    </label>
                    <select
                      value={selectedStartupStatus}
                      onChange={(e) => setSelectedStartupStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Startup Stage</option>
                      <option value="Ideation">Ideation</option>
                      <option value="Concept and Development">
                        Concept and Development
                      </option>
                      <option value="Seed Stage">Seed Stage</option>
                      <option value="Early Stage(Startup)">
                        Early Stage(Startup)
                      </option>
                      <option value="Growth Stage">Growth Stage</option>
                      <option value="Expansion Stage">Expansion Stage</option>
                      <option value="Maturity Stage">Maturity Stage</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Roles
                    </label>
                    <select
                      value={selectedRolesStatus}
                      onChange={(e) => setSelectedRolesStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Roles</option>
                      <option value="Advisor">Advisor</option>
                      <option value="Cofounder">Cofounder</option>
                      <option value="Founding Member">Founding Member</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Pitch Deck
                    </label>
                    <select
                      value={selectedPitchDeckStatus}
                      onChange={(e) =>
                        setSelectedPitchDeckStatus(e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Pitch Deck</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mr-4 mb-4 sm:mb-0">
                    <label className="block text-white text-sm font-bold mb-2">
                      Skills
                    </label>
                    <select
                      value={selectedSkillsStatus}
                      onChange={(e) => setSelectedSkillsStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Skills</option>
                      <option value="programming languages">
                        Programming Languages
                      </option>
                      <option value="Software engineering">
                        Software Engineering
                      </option>
                      <option value="App development">App Development</option>
                      <option value="Front-end development">
                        Front-end Development
                      </option>
                      <option value="Back-end development">
                        Back-end Development
                      </option>
                      <option value="Web design">Web Design</option>
                      <option value="User experience (UX)">
                        User Experience (UX)
                      </option>
                      <option value="Data analysis">Data Analysis</option>
                      <option value="Machine learning">Machine Learning</option>
                      <option value="Artificial intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="Information security">
                        Information Security
                      </option>
                      <option value="Ethical hacking">Ethical Hacking</option>
                      <option value="Startup experience">
                        Startup Experience
                      </option>
                      <option value="Business development">
                        Business Development
                      </option>
                      <option value="Strategic planning">
                        Strategic Planning
                      </option>
                      <option value="Digital marketing">
                        Digital Marketing
                      </option>
                      <option value="Social media management">
                        Social Media Management
                      </option>
                      <option value="SEO/SEM">SEO/SEM</option>
                      <option value="Content creation">Content Creation</option>
                      <option value="Sales strategy">Sales Strategy</option>
                      <option value="Lead generation">Lead Generation</option>
                      <option value="Customer relationship management (CRM)">
                        Customer Relationship Management (CRM)
                      </option>
                      <option value="Financial planning">
                        Financial Planning
                      </option>
                      <option value="Accounting">Accounting</option>
                      <option value="Investment management">
                        Investment Management
                      </option>
                      <option value="Visual design">Visual Design</option>
                      <option value="Branding">Branding</option>
                      <option value="Adobe Creative Suite proficiency">
                        Adobe Creative Suite Proficiency
                      </option>
                      <option value="User interface (UI) design">
                        User Interface (UI) Design
                      </option>
                      <option value="Product development">
                        Product Development
                      </option>
                      <option value="Prototyping">Prototyping</option>
                      <option value="Writing">Writing</option>
                      <option value="Video production">Video Production</option>
                      <option value="Multimedia storytelling">
                        Multimedia Storytelling
                      </option>
                      <option value="2D/3D animation">2D/3D Animation</option>
                      <option value="Motion design">Motion Design</option>
                      <option value="Legal compliance">Legal Compliance</option>
                      <option value="Intellectual property">
                        Intellectual Property
                      </option>
                      <option value="Contract negotiation">
                        Contract Negotiation
                      </option>
                      <option value="Understanding of industry regulations">
                        Understanding of Industry Regulations
                      </option>
                      <option value="Standards">Standards</option>
                      <option value="Corporate ethics">Corporate Ethics</option>
                      <option value="Compliance programs">
                        Compliance Programs
                      </option>
                      <option value="Risk management">Risk Management</option>
                      <option value="Agile/Scrum methodologies">
                        Agile/Scrum Methodologies
                      </option>
                      <option value="Project planning">Project Planning</option>
                      <option value="Team coordination">
                        Team Coordination
                      </option>
                      <option value="Logistics">Logistics</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Inventory management">
                        Inventory Management
                      </option>
                      <option value="Recruitment">Recruitment</option>
                      <option value="Talent management">
                        Talent Management
                      </option>
                      <option value="Organizational development">
                        Organizational Development
                      </option>
                      <option value="Customer support">Customer Support</option>
                      <option value="Satisfaction management">
                        Satisfaction Management
                      </option>
                      <option value="Service delivery">Service Delivery</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 ml-[-40px]  pl-12">
                    <label className="block text-white text-sm font-bold mb-2">
                      Commitment
                    </label>
                    <select
                      value={selectedCommitmentsStatus}
                      onChange={(e) =>
                        setSelectedCommitmentsStatus(e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Select Commitment</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4 sm:mb-0 lg:ml-5">
                    <label
                      className="flex text-white text-sm font-bold mb-2"
                      htmlFor="city"
                    >
                      Location
                    </label>
                    <Select
                      id="city"
                      options={cityOptions}
                      onInputChange={handleCityInputChangePro}
                      onChange={handleCityChangePro}
                      value={selectedCitypro}
                      placeholder="Start typing a city..."
                      isLoading={isLoadingpro}
                      className="text-gray-700"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row justify-center">
          {/* <div className=" w-4/5  lg:w-1/4 h-1/2 p-5 border-4 rounded-lg text-white m-10">
            <h2 className="text-2xl font-bold mb-4">On this page</h2>
            <ul className="ml-auto">
              <li
                className="cursor-pointer hover mb-2 font-bold"
                onClick={() => scrollToSection("profiles-section")}
              >
                Profiles
              </li>
              <li
                className="cursor-pointer hover mb-2 font-bold"
                onClick={() => scrollToSection("posts-section")}
              >
                Posts
              </li>
              <li
                className="cursor-pointer hover mb-2 font-bold"
                onClick={() => scrollToSection("projects-section")}
              >
                Projects
              </li>
            </ul>
          </div> */}
          <div className="w-full lg:w-3/4 p-4">
            {activeFilter === "profiles" && (
              <div id="profiles-section" className="mb-8 mx-auto">
                <h2 className="text-2xl font-bold mb-2 text-center text-white">Profiles</h2>
                {renderProfiles()}
              </div>
            )}
            {activeFilter === "posts" && (
              <div id="posts-section" className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-center text-white">Posts</h2>
                {renderPosts()}
              </div>
            )}
            {activeFilter === "projects" && (
              <div id="projects-section">
                <h2 className="text-2xl font-bold mb-2 text-center text-white">Projects</h2>
                {renderProjects()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
