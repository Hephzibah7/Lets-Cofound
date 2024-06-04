import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import GroupSection from "./GroupSection";
import PostList from "./Project_Posts/PostList";
import CommunitiesSection from "./CommunitiesSection";

const middleColumnData = {
  all: [
    {
      title: "All Item 1",
      description: "Description of All Item 1",
    },
    {
      title: "All Item 2",
      description: "Description of All Item 2",
    },
  ],
  projects: [
    {
      title: "Project A",
      description: "Description of Project A",
    },
    {
      title: "Project B",
      description: "Description of Project B",
    },
  ],
  groups: [
    {
      title: "Group X",
      description: "Description of Group X",
    },
    {
      title: "Group Y",
      description: "Description of Group Y",
    },
  ],
  discussion: [
    {
      title: "Discussion 1",
      description: "Description of Discussion 1",
    },
    {
      title: "Discussion 2",
      description: "Description of Discussion 2",
    },
  ],
};

const MiddleColumn = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-black text-white p-4 shadow-md w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "all"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("all")}
        >
          All
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("projects")}
        >
          Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "groups"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("groups")}
        >
          Groups
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "discussion"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("discussion")}
        >
          Discussion
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "all" && (
        <div>
          {/* All */}
          {middleColumnData.all.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-300 font-bold">{item.title}</p>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "projects" && (
        <div>
          {/* Projects */}
          <PostList />
        </div>
      )}

      {activeTab === "groups" && (
        <div>
          {/* Groups */}
          <CommunitiesSection />
          {/* <GroupSection /> */}
        </div>
      )}

      {activeTab === "discussion" && (
        <div>
          {/* Discussion */}
          <ChatWindow />
        </div>
      )}
    </div>
  );
};

export default MiddleColumn;
