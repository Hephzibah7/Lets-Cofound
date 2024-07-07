import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  PeopleAlt,
  Work,
  Message,
  Notifications,
} from "@mui/icons-material";
import ExploreIcon from "@mui/icons-material/Explore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const Navigate= useNavigate();


  const handleOnClick = () => {
    // Add your logic for continuing to the next step
    Navigate('/signup');
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    const vh = window.innerHeight * 0.01;
    const scrollAmount = 165 * vh;
    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleClick1 = () => {
    const vh = window.innerHeight * 0.01;
    const scrollAmount = 280 * vh;
    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };



  const handleClick2 = () => {
    const vh = window.innerHeight * 0.01;
    const scrollAmount = 445 * vh;
    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-gradient-to-b from-black to-purple-950 flex justify-between items-center py-4 px-6">
      {/* Logo and Search */}
      <div className="flex items-center">
        <h1 className="text-white text-3xl">
          <span className="text-3xl font-bold">L</span>ets
          <span className="text-3xl font-bold">C</span>o
          <span className="text-3xl font-bold">F</span>ound
        </h1>
      </div>

      {/* NavLinks */}
      {/* <div className="flex justify-center items-center space-x-8">
        <Link
          to="/"
         
          className="text-white mr-6 hover:text-purple-400 hover:font-bold flex items-center"
        >
          <Home />
          <span>Home</span>
        </Link>
        <Link
          to="/"
          onClick={handleClick1}
          className="text-white mr-6 hover:text-purple-400 hover:font-bold flex items-center"
        >
          <PeopleAlt />
          <span>Network</span>
        </Link>
        <Link
          to="/"
          onClick={handleClick}
          className="text-white mr-6 hover:text-purple-400 hover:font-bold flex items-center"
        >
          <ExploreIcon />
          <span>Explore</span>
        </Link>
    
        <Link
          to="/"
          onClick={handleClick2}
          className="text-white mr-6 hover:text-purple-400 hover:font-bold flex items-center"
        >
          <Notifications />
          <span>Notifications</span>
        </Link>
      </div> */}


      <div>
        <button className="text-white hover:bg-gradient-to-t from-black to-purple-950 w-[190px] py-5 px-2 rounded-full" onClick={handleOnClick}>Signup</button>
      </div>
      
      
     
    </nav>

    
  );
}

export default Navbar;