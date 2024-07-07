import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../../context/ThemeContext";

const Topbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`p-4 flex items-center justify-between border-b-2 ${theme === 'dark' ? 'bg-black text-white border-white' : 'bg-white text-black border-black'}`}>
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold">LetsCoFound</div>
      </div>
      <div className="relative flex items-center w-2/5">
        <input
          type="text"
          placeholder="Search"
          className={`border border-transparent focus:border-${theme === 'dark' ? 'white' : 'black'} rounded-lg py-2 px-3 pl-10 outline-none w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-lightModeBackground text-black'}`}
        />
        <button type="submit" className="absolute left-3">
          <SearchIcon className={`h-5 w-5 ${theme === 'dark' ? 'text-black' : 'text-black'}`} />
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col mr-4">
          <span className="font-bold text-xl">AYASH KUMAR</span>
          <span className="text-gray-400">@kingayash</span>
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
