// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import {
//   Home,
//   PeopleAlt,
//   Work,
//   Message,
//   Notifications,
// } from "@mui/icons-material";
// import ExploreIcon from "@mui/icons-material/Explore";

// import { ThemeContext } from "../context/ThemeContext";

// import { useState } from "react";

// function Navbar() {

//   const { theme, toggleTheme } = useContext(ThemeContext); 

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-lightGray text-black'} flex justify-between items-center py-4 px-6`}>
//       {/* Logo and Search */}
//       <div className="flex items-center">
//         <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-3xl`}>
//           <span className="text-3xl font-bold">L</span>ets
//           <span className="text-3xl font-bold">C</span>o
//           <span className="text-3xl font-bold">F</span>ound
//         </h1>
//       </div>

//       {/* NavLinks */}
//       <div className="flex justify-center items-center space-x-10">
//         <Link
//           to="/home"
//           className="text-white bg-gradient-to-br from-blue-800 to-purple-500 p-2 rounded-full hover:font-bold flex items-center"
//         >
//           <Home />
//           <span>Home</span>
//         </Link>
//         <Link
//           to="/network"
//           className="text-white bg-gradient-to-br from-blue-800 to-purple-500 p-2 rounded-full hover:font-bold flex items-center"
//         >
//           <PeopleAlt />
//           <span>Network</span>
//         </Link>
//         <Link
//           to="/jobs"
//           className="text-white bg-gradient-to-br from-blue-800 to-purple-500 p-2 rounded-full hover:font-bold flex items-center"
//         >
//           <ExploreIcon />
//           <span>Explore</span>
//         </Link>
//         {/* <Link
//           to="/messaging"
//           className="text-white bg-gradient-to-br from-blue-800 to-purple-500 p-2 rounded-full hover:font-bold flex items-center"
//         >
//           <Message />
//           <span>Messaging</span>
//         </Link> */}
//         <Link
//           to="/notifications"
//           className="text-white bg-gradient-to-br from-blue-800 to-purple-500 p-2 rounded-full hover:font-bold flex items-center"
//         >
//           <Notifications />
//           <span>Notifications</span>
//         </Link>
//       </div>
//       {/* <div className="relative">
//         <input
//           className="search-global-typeahead__input pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Search"
//           role="combobox"
//           aria-autocomplete="list"
//           aria-label="Search"
//           aria-activedescendant=""
//           aria-expanded="false"
//           type="text"
//           data-sider-insert-id="39d20013-ae47-4938-8b07-eebb04e7ea01"
//           data-sider-select-id="856f5d3b-2f91-49ad-b0ae-380626c0344e"
//         />
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <svg
//             className="h-5 w-5 text-gray-400"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M14.32 13.97a8 8 0 111.414-1.414l4.243 4.243a1 1 0 11-1.415 1.414l-4.242-4.243zm-.28-1.414a6 6 0 10-8.486-8.486 6 6 0 008.486 8.486z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//       </div> */}
//     </nav>

   
//   );
// }

// export default Navbar;


// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { Home, PeopleAlt, Notifications } from "@mui/icons-material";
// import ExploreIcon from "@mui/icons-material/Explore";
// import { ThemeContext } from "../context/ThemeContext";

// function Navbar() {
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav
//       className={`${
//         theme === "dark" ? "bg-black text-white" : "bg-lightGray text-black"
//       } bg-black  flex justify-between items-center w-full py-4 px-6 fixed 
//        top-0 left-0 right-0 z-50 `}
//     >
//       {/* Logo */}
//       <div className="flex items-center">
//         <h1 className="text-3xl font-bold">
//           <span className="text-blue-500">L</span>ets
//           <span className="text-purple-500">C</span>o
//           <span className="text-blue-500">F</span>ound
//         </h1>
//       </div>

//       {/* Hamburger Icon for Mobile */}
//       <button
//         onClick={toggleDropdown}
//         className="lg:hidden text-3xl focus:outline-none"
//       >
//         {isDropdownOpen ? "✖" : "☰"}
//       </button>

//       {/* NavLinks */}
//       <div
//         className={`${
//           isDropdownOpen ? "block" : "hidden"
//         } lg:flex flex-col lg:flex-row lg:space-x-6 justify-center
//           items-center w-full lg:w-auto absolute lg:static top-16 left-0 
//           bg-black lg:top-0 p-4 lg:p-0`}
//       >
//         <Link
//           to="/home"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 
//           rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <Home />
//           <span className="ml-2">Home</span>
//         </Link>
//         <Link
//           to="/network"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <PeopleAlt />
//           <span className="ml-2">Network</span>
//         </Link>
//         <Link
//           to="/jobs"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <ExploreIcon />
//           <span className="ml-2">Explore</span>
//         </Link>
//         <Link
//           to="/notifications"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <Notifications />
//           <span className="ml-2">Notifications</span>
//         </Link>
//         <Link
//           to="/notifications"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <Notifications />
//           <span className="ml-2">Projects</span>
//         </Link>
//         <Link
//           to="/notifications"
//           className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full  flex items-center m-2 lg:m-0"
//         >
//           <Notifications />
//           <span className="ml-2">Messaging</span>
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





















import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Home, PeopleAlt, Notifications } from "@mui/icons-material";
import ExploreIcon from "@mui/icons-material/Explore";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-lightGray text-black"
      } flex justify-between items-center w-full py-4 px-6 fixed top-0 left-0 right-0 z-50`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">
          <span className="">L</span>ets
          <span className="">C</span>o
          <span className="">F</span>ound
        </h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={toggleDropdown}
        className="lg:hidden text-3xl focus:outline-none"
      >
        {isDropdownOpen ? "✖" : "☰"}
      </button>

      {/* NavLinks */}
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row lg:space-x-6 justify-center items-center w-full lg:w-auto absolute lg:static top-16 left-0 bg-black lg:bg-transparent p-4 lg:p-0`}
      >
        <Link
          to="/home"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          <Home />
          <span className="ml-2">Home</span>
        </Link>
        <Link
          to="/network"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          <PeopleAlt />
          <span className="ml-2">Network</span>
        </Link>
        <Link
          to="/jobs"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          <ExploreIcon />
          <span className="ml-2">Explore</span>
        </Link>
        <Link
          to="/notifications"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          <Notifications />
          <span className="ml-2">Notifications</span>
        </Link>
        <Link
          to="/projects"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          Projects
        </Link>
        <Link
          to="/messaging"
          className="text-white bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center m-2 lg:m-0"
        >
          Messaging
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
