// import React, { useState, useContext } from "react";
// import TopBar from "./TopBar";
// import Stories from "../components_lp/Story/Stories";
// import LinkedInPost from "./LinkedInPost";
// import Messaging from "./Messaging"; // Import the Messaging component
// import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext

// export default function MiddleColumn() {
//   const [showMessaging, setShowMessaging] = useState(false);
//   const { theme } = useContext(ThemeContext); // Get the current theme from context

//   const toggleMessaging = () => {
//     setShowMessaging(!showMessaging);
//   };

//   return (
//     <div
//       className={`middle-column ${
//         theme === "dark"
//           ? "bg-darkModeBackground text-white"
//           : "bg-lightModeBackground text-black"
//       }`}
//     >
//       <div className="topbar">
//         {/* Topbar Section */}
//         <TopBar />
//       </div>

//       <div className="stories mt-4">
//         {/* Stories Section */}
//         <Stories />
//       </div>

//       {/* Posts Section */}
//       <div className="posts mt-8">
//         <div className="flex justify-between items-center mb-2">
//           {/* Stories Heading */}
//           <h2 className="text-lg font-semibold mb-4 pl-2 text-white">Feeds</h2>
//           {/* Watch All button */}
//           <p className="text-purple-400 font-bold p-1 rounded-lg pr-2">
//             Watch All
//           </p>
//         </div>

//         <LinkedInPost
//           profilePic="/images/profilepic.jpg"
//           name="John Doe"
//           title="Software Engineer at Example Inc."
//           timestamp="2 hours ago"
//           content="Excited to announce the launch of our new project! #software #engineering"
//           imageUrl="/images/edtech.jpeg"
//           imageCaption="Check out our latest project!"
//         />
//       </div>
//     </div>
//   );
// }


import React, { useContext } from "react";
import TopBar from "./TopBar";
import Stories from "../components_lp/Story/Stories";
import LinkedInPost from "./LinkedInPost";
import { ThemeContext } from "../context/ThemeContext";

export default function MiddleColumn() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`middle-column px-2 md:px-4 lg:px-6 ${
        theme === "dark"
          ? "bg-darkModeBackground text-white"
          : "bg-lightModeBackground text-black"
      }`}
    >
      {/* <div className="topbar">
        <TopBar />
      </div> */}

      <div className="stories mt-4">
        <Stories />
      </div>

      <div className="posts mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold mb-4 pl-2">Feeds</h2>
          <p className="text-purple-400 font-bold p-1 rounded-lg pr-2 cursor-pointer">
            Watch All
          </p>
        </div>
        <div className="z-2">
          <LinkedInPost />

        </div>
      </div>
    </div>
  );
}
