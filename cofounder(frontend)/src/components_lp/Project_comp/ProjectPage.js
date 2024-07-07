import React, { useState, useContext } from "react";
import Topbar from "./Topbar";
import Sidebar from "../Project_comp/Sidebar";
import Channel from "../Project_comp/Channel";
import MiddleColumn from "./MiddleColumn";
import Navbar from "../Navbar";
import { ThemeContext } from "../../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  const [messages, setMessages] = useState([
    {
      username: "Jane Cooper",
      time: "2:18 AM",
      text: "I don't know, it looks fine to me",
      avatar: "/path/to/avatar1.png",
    },
    {
      username: "Floyd Miles",
      time: "2:18 AM",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
      avatar: "/path/to/avatar2.png",
    },
    // Add more messages as needed
  ]);

  const currentUser = {
    name: "Baki Web Dev",
    username: "bakiwebdev",
    avatar: "/path/to/avatar3.png",
  };

  return (
    <div
      className={`mb-10 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <nav>
        <Navbar />
      </nav>
      <div
        className={`flex flex-col border-r-2 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <MiddleColumn />
      </div>
      {/* <div className={`flex ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        
        
      </div> */}
    </div>
  );
};

export default Home;
