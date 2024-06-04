import React from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import MiddleColumn from "./MiddleColumn";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Column */}
      <div className="w-1/5 bg-black fixed top-0 bottom-0">
        {/* Add content for Left Column here */}
        <LeftColumn />
      </div>

      {/* Middle Column */}
      <div className="w-3/5 ml-auto overflow-y-auto">
        <MiddleColumn />
      </div>

      {/* Right Column */}
      <div className="w-1/5 bg-black overflow-y-auto">
        <RightColumn />
      </div>
    </div>
  );
};

export default HomePage;
