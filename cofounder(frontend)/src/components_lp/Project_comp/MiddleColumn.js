// import React, { useState, useContext } from "react";
// import ChatWindow from "./ChatWindow";
// import GroupSection from "./GroupSection";
// import PostList from "./Project_Posts/PostList";
// import CommunitiesSection from "./CommunitiesSection";
// import { ThemeContext } from "../../context/ThemeContext";


// const middleColumnData = {
//   all: [
//     {
//       title: "All Item 1",
//       description: "Description of All Item 1",
//     },
//     {
//       title: "All Item 2",
//       description: "Description of All Item 2",
//     },
//   ],
//   projects: [
//     {
//       title: "Project A",
//       description: "Description of Project A",
//     },
//     {
//       title: "Project B",
//       description: "Description of Project B",
//     },
//   ],
//   groups: [
//     {
//       title: "Group X",
//       description: "Description of Group X",
//     },
//     {
//       title: "Group Y",
//       description: "Description of Group Y",
//     },
//   ],
//   discussion: [
//     {
//       title: "Discussion 1",
//       description: "Description of Discussion 1",
//     },
//     {
//       title: "Discussion 2",
//       description: "Description of Discussion 2",
//     },
//   ],
// };

// const MiddleColumn = () => {

//   const { theme } = useContext(ThemeContext);
//   const [activeTab, setActiveTab] = useState("projects");

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} p-4 shadow-md w-full max-w-4xl mx-auto`}>
//       {/* Tabs */}
//       <div className="flex border-b mb-4">
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "all"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("all")}
//         >
//           All
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "projects"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("projects")}
//         >
//           Projects
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "groups"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("groups")}
//         >
//           Groups
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "discussion"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("discussion")}
//         >
//           Discussion
//         </button>
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === "all" && (
//         <div>
//           {/* All */}
//           {middleColumnData.all.map((item, index) => (
//             <div key={index} className="mb-4">
//               <p className="text-gray-300 font-bold">{item.title}</p>
//               <p className="text-gray-500">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === "projects" && (
//         <div>
//           {/* Projects */}
//           <PostList />
//         </div>
//       )}

//       {activeTab === "groups" && (
//         <div>
//           {/* Groups */}
//           <CommunitiesSection />
//           {/* <GroupSection /> */}
//         </div>
//       )}

//       {activeTab === "discussion" && (
//         <div>
//           {/* Discussion */}
//           <ChatWindow />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MiddleColumn;



// import React, { useState, useContext, useEffect } from "react";
// import ChatWindow from "./ChatWindow";
// import GroupSection from "./GroupSection";
// import CommunitiesSection from "./CommunitiesSection";
// import { ThemeContext } from "../../context/ThemeContext";

// import PostList from "./Project_Posts/PostList";


// const middleColumnData = {
//   projects: [
//     {
//       title: "Project A",
//       description: "Description of Project A",
//     },
//     {
//       title: "Project B",
//       description: "Description of Project B",
//     },
//   ],
//   myProjects: [
//     {
//       title: "My Project 1",
//       description: "Description of My Project 1",
//     },
//     {
//       title: "My Project 2",
//       description: "Description of My Project 2",
//     },
//   ],
//   invitedProjects: [
//     {
//       title: "Requested Project 1",
//       description: "Description of Requested Project 1",
//     },
//     {
//       title: "Requested Project 2",
//       description: "Description of Requested Project 2",
//     },
//   ],
//   approvedProjects: [
//     {
//       title: "Approved Project 1",
//       description: "Description of Approved Project 1",
//     },
//     {
//       title: "Approved Project 2",
//       description: "Description of Approved Project 2",
//     },
//   ],
// };

// const MiddleColumn = () => {
//   const { theme } = useContext(ThemeContext);
//   const [activeTab, setActiveTab] = useState("projects");
//   const [projects, setProjects] = useState([]);
//   const [myProjects, setMyProjects] = useState([]);
//   const [invitedProjects, setinvitedProjects] = useState([]);
//   const [approvedProjects, setApprovedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:9002/api/projects");
//       setProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchMyProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:9002/api/projects/user-projects");
//       setMyProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching my projects:", error);
//     }
//   };

//   const fetchInvitedProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:9002/api/projects/invited-projects");
//       setinvitedProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching invited projects:", error);
//     }
//   };

//   const fetchApprovedProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:9002/api/projects/approved-projects");
//       setApprovedProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching approved projects:", error);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     if (activeTab === "projects") {
//       fetchProjects();
//     } else if (activeTab === "myProjects") {
//       fetchMyProjects();
//     } else if (activeTab === "invitedProjects") {
//       fetchInvitedProjects();
//     } else if (activeTab === "approvedProjects") {
//       fetchApprovedProjects();
//     }
//     setLoading(false);
//   }, [activeTab]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} p-4 shadow-md w-full max-w-4xl mx-auto`}>
//       {/* Tabs */}
//       <div className="flex border-b mb-4">
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "projects"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("projects")}
//         >
//           Projects
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "myProjects"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("myProjects")}
//         >
//           My Projects
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "invitedProjects"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("invitedProjects")}
//         >
//           Invited Projects
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "approvedProjects"
//               ? "bg-purple-800 text-white rounded-lg"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleTabClick("approvedProjects")}
//         >
//           Approved Projects
//         </button>
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === "projects" && (
//         <div>
//           {/* Projects */}
//           <PostList />
//         </div>
//       )}

//       {activeTab === "myProjects" && (
//         <div>
//           {/* My Projects */}
//           {middleColumnData.myProjects.map((item, index) => (
//             <div key={index} className="mb-4">
//               <p className="text-gray-300 font-bold">{item.title}</p>
//               <p className="text-gray-500">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === "invitedProjects" && (
//         <div>
//           {/* Requested Projects */}
//           {middleColumnData.invitedProjects.map((item, index) => (
//             <div key={index} className="mb-4">
//               <p className="text-gray-300 font-bold">{item.title}</p>
//               <p className="text-gray-500">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === "approvedProjects" && (
//         <div>
//           {/* Approved Projects */}
//           {middleColumnData.approvedProjects.map((item, index) => (
//             <div key={index} className="mb-4">
//               <p className="text-gray-300 font-bold">{item.title}</p>
//               <p className="text-gray-500">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MiddleColumn;



import React, { useState } from "react";
import PostList from "./Project_Posts/PostList";
import UserProjectsList from "./Project_Posts/UserProjectsList";
import InterestRequests from "./Project_Posts/InterestRequests";
import ApprovedProjectsList from "./Project_Posts/ApprovedProjectsList";

const MiddleColumn = () => {
  const [activeTab, setActiveTab] = useState("All Projects");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-black text-white p-4 shadow-md w-full h-screen max-w-4xl mt-20 mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "All Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("All Projects")}
        >
          All Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Projects")}
        >
          My Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Requested Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Requested Projects")}
        >
          My Requested Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Approved Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Approved Projects")}
        >
          My Approved Projects
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "All Projects" && (
        <div>
          <PostList />
        </div>
      )}

      {activeTab === "My Projects" && (
        <div>
          <UserProjectsList />
        </div>
      )}

      {activeTab === "My Requested Projects" && (
        <div>
          <InterestRequests />
        </div>
      )}
      
      {activeTab === "My Approved Projects" && (
        <div>
          <ApprovedProjectsList />
        </div>
      )}
    </div>
  );
};

export default MiddleColumn;