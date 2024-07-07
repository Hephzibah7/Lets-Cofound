import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";


const interestsData = {
  topVoices: [
    {
      name: "Arsh Goyal",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
      position:
        "Samsung | LinkedIn Top Voice '24 | Gen AI | Ex-ISRO | Gold Medalist - NIT Jalandhar | Educator - Unacademy | CodeChef | 200k+ YouTube & Instagram",
      followers: 244530,
      connectionDegree: "2nd",
    },
    {
      name: "Ankita Mehra",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
      position:
        "LinkedIn Top Voice | 2 Times TEDx Speaker | Employer branding, Diversity and Inclusion | CSR and ERG Expert | India's top 20 Diversity leaders | LGBTQ+ Speaker | 300+ LGBTQ+ Awareness Talks | HR 40under40 | Communications",
      followers: 98476,
      connectionDegree: "3rd",
    },
  ],
  projects: [
    {
      name: "Project A",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
      description: "Description of Project A",
    },
    {
      name: "Project B",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
      description: "Description of Project B",
    },
  ],
  groups: [
    {
      name: "Group X",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
    },
    {
      name: "Group Y",
      profilePicture: "/images/profilepic.jpg", // Replace with actual image URL
    },
  ],
  forum: [
    {
      title: "Discussion 1",
      description: "Description of Discussion 1",
    },
    {
      title: "Discussion 2",
      description: "Description of Discussion 2",
    },
  ],
  // Add data for other sections as needed
};

const Interests = () => {
  const [activeTab, setActiveTab] = useState("topVoices");
  const { theme, toggleTheme } = useContext(ThemeContext); 


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-lightGray text-black border-4 border-lightPurple'} p-4 shadow-md rounded mt-4`}
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {/* Interests Header */}
      <h2 className="text-xl font-bold mb-4">Interests</h2>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "topVoices"
              ? "text-darkPurple border-b-4 border-darkPurple"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("topVoices")}
        >
          Top Voices
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "projects"
              ? "text-darkPurple border-b-4 border-darkPurple"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("projects")}
        >
          Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "groups"
              ? "text-darkPurple border-b-4 border-darkPurple"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("groups")}
        >
          Groups
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "forum"
              ? "text-darkPurple border-b-4 border-darkPurple"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("forum")}
        >
          Forum
        </button>
        {/* Add buttons for other sections */}
      </div>

      {/* Content based on active tab */}
      {activeTab === "topVoices" && (
        <div>
          {/* Top Voices */}
          {interestsData.topVoices.map((voice, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={voice.profilePicture}
                alt={`${voice.name}'s profile`}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-bold flex items-center">
                  {voice.name}
                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold py-1 px-2 rounded">
                    {voice.connectionDegree}
                  </span>
                </p>
                <p className="text-gray-500">{voice.position}</p>
                <p className="text-gray-400 text-sm">
                  {voice.followers.toLocaleString()} followers
                </p>
                <button className="mt-2 py-1 px-4 border-2 border-black rounded text-gray-500 hover:text-gray-800">
                  ✔ Following
                </button>
              </div>
            </div>
          ))}
          {/* Show all button */}
          <div className="mt-4 text-right">
            <button className="text-blue-500 hover:underline">
              Show all Top Voices &rarr;
            </button>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div>
          {/* Projects */}
          {interestsData.projects.map((project, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={project.profilePicture}
                alt={`${project.name}'s profile`}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-bold">{project.name}</p>
                <p className="text-gray-500">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "groups" && (
        <div>
          {/* Groups */}
          {interestsData.groups.map((group, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={group.profilePicture}
                alt={`${group.name}'s profile`}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-bold">{group.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "forum" && (
        <div>
          {/* Forum */}
          {interestsData.forum.map((discussion, index) => (
            <div key={index} className="flex items-center mb-4">
              <div>
                <p className="text-gray-800 font-bold">{discussion.title}</p>
                <p className="text-gray-500">{discussion.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Content for other tabs */}
      {/* Add content for other tabs */}
    </div>
  );
};

export default Interests;
