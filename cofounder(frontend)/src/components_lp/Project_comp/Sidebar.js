// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import SupportIcon from "@mui/icons-material/Support";
import WorkIcon from "@mui/icons-material/Work";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import GroupSection from "./GroupSection";

const Sidebar = () => {
  const groupsData = [
    {
      group: "Technical Skills",
      subGroups: [
        "Software Development",
        "Web Development",
        "Data Science",
        "Cybersecurity",
      ],
    },
    {
      group: "Business and Management Skills",
      subGroups: ["Entrepreneurship", "Marketing", "Sales", "Finance"],
    },
    {
      group: "Design and Creative Skills",
      subGroups: [
        "Graphic Design",
        "Product Design",
        "Content Creation",
        "Animation and Motion Graphics",
      ],
    },
    {
      group: "Legal and Regulatory Skills",
      subGroups: [
        "Corporate Law",
        "Regulatory Affairs",
        "Ethics and Compliance",
      ],
    },
    {
      group: "Operational Skills",
      subGroups: [
        "Project Management",
        "Supply Chain Management",
        "Human Resources",
        "Customer Service",
      ],
    },
    {
      group: "Industry-Specific Interests",
      subGroups: [
        "Healthcare",
        "Education",
        "Fintech",
        "E-commerce",
        "Environmental Tech",
      ],
    },
    {
      group: "Personal Interests",
      subGroups: [
        "Social Impact",
        "Innovation and Research",
        "Travel and Lifestyle",
        "Arts and Culture",
      ],
    },
  ];

  return (
    <div className="bg-secondary text-white w-64 min-h-screen flex flex-col border-white border-r-2">
      <div className="p-4">
        {/* {groupsData.map((group, index) => (
          <GroupSection
            key={index}
            group={group.group}
            subGroups={group.subGroups}
          />
        ))} */}
      </div>
      <div className="p-4">
        <div className="text-gray-400 uppercase text-sm">General</div>
        <NavLink
          to="/announcements"
          className="block p-2 hover:bg-primary rounded"
        >
          <AnnouncementIcon className="inline mr-2" /> Announcements
        </NavLink>
        <NavLink to="/members" className="block p-2 hover:bg-primary rounded">
          <GroupIcon className="inline mr-2" /> Members
        </NavLink>
        <NavLink to="/settings" className="block p-2 hover:bg-primary rounded">
          <SettingsIcon className="inline mr-2" /> Settings
        </NavLink>
      </div>
      <div className="p-4">
        <div className="text-gray-400 uppercase text-sm">Channel</div>
        <NavLink to="/general" className="block p-2 hover:bg-primary rounded">
          <ChatIcon className="inline mr-2" /> General Chat
        </NavLink>
        <NavLink
          to="/design-support"
          className="block p-2 hover:bg-primary rounded"
        >
          <SupportIcon className="inline mr-2" /> Design Support
        </NavLink>
        <NavLink
          to="/product-showcase"
          className="block p-2 hover:bg-primary rounded"
        >
          <WorkIcon className="inline mr-2" /> Product Showcase
        </NavLink>
        <NavLink
          to="/bots-games"
          className="block p-2 hover:bg-primary rounded"
        >
          <SportsEsportsIcon className="inline mr-2" /> Bots & Games
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
