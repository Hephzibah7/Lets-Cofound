// src/pages/Home.js
import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "../Project_comp/Sidebar";
import Channel from "../Project_comp/Channel";
// import ChatWindow from "../Project_comp/ChatWindow";
import Profile from "../Project_comp/Profile";
import MiddleColumn from "./MiddleColumn";

const Home = () => {
  const [messages, setMessages] = useState([
    {
      username: "Jane Cooper",
      time: "2:18 AM",
      text: "I don't know, it's look fine for me",
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
    <div className="bg-black">
      <Topbar />
      <div className="flex bg-black">
        <Sidebar />
        <div className="flex-grow flex flex-col border-white border-r-2">
          <MiddleColumn />

        </div>
        <div className="w-1/5 bg-secondary text-white">
          {/* <Profile user={currentUser} /> */}
          <div className="">
            <Channel />
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;
