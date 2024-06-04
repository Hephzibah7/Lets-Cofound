// src/components/Topbar.js
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  return (
    <div className="bg-black p-4 flex items-center justify-between text-white border-white border-b-2">
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold">LetsCoFound</div>
      </div>
      <div className="relative flex items-center w-2/5">
        <input
          type="text"
          placeholder="Search"
          className="bg-white text-black border border-transparent focus:border-white rounded-lg py-2 px-3 pl-10 outline-none w-full"
        />
        <button type="submit" className="absolute left-3">
          <SearchIcon className="h-5 w-5 text-black" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col">
          <span className="mr-4 font-bold text-xl">AYASH KUMAR</span>
          <span className="mr-4 text-gray-400">@kingayash</span>
        </div>
        <img
          src="images/pharmacy.jpeg" // Replace with the actual user profile picture
          alt="User profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
