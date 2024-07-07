import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import SupportIcon from "@mui/icons-material/Support";
import WorkIcon from "@mui/icons-material/Work";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { ThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

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
    <div className={`w-64 min-h-screen flex flex-col border-r-2 ${theme === 'dark' ? 'bg-secondary text-white border-white' : 'bg-lightModeBackground text-black border-black'}`}>
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
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <AnnouncementIcon className="inline mr-2" /> Announcements
        </NavLink>
        <NavLink
          to="/members"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <GroupIcon className="inline mr-2" /> Members
        </NavLink>
        <NavLink
          to="/settings"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <SettingsIcon className="inline mr-2" /> Settings
        </NavLink>
      </div>
      <div className="p-4">
        <div className="text-gray-400 uppercase text-sm">Channel</div>
        <NavLink
          to="/general"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <ChatIcon className="inline mr-2" /> General Chat
        </NavLink>
        <NavLink
          to="/design-support"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <SupportIcon className="inline mr-2" /> Design Support
        </NavLink>
        <NavLink
          to="/product-showcase"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <WorkIcon className="inline mr-2" /> Product Showcase
        </NavLink>
        <NavLink
          to="/bots-games"
          className={`block p-2 rounded ${theme === 'dark' ? 'hover:bg-primary' : 'hover:bg-lightPurple'}`}
        >
          <SportsEsportsIcon className="inline mr-2" /> Bots & Games
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
