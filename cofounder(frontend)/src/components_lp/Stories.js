import React from "react";
import Story from "./Story";

export default function Stories() {
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Stories Heading */}
        <h2 className="text-lg font-semibold mb-4 pl-2 text-white">Stories</h2>
        {/* Watch All button */}
        <p className="text-purple-400 font-bold p-1 rounded-lg pr-2">
          Watch All
        </p>
      </div>

      {/* Stories Grid */}
      <div className="flex flex-wrap gap-4 pl-2">
        {/* Story Square */}
        <div className="w-20 h-34 bg-gray-500 rounded-lg border-6 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300">
          {/* Story Image */}
          <img
            src="/images/profilepic.jpg"
            alt="Story 1"
            className="w-full h-full object-cover"
          />
          {/* Blue "+" symbol */}
          <div className="absolute bottom-1 right-1 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-lg">
            +
          </div>
        </div>

        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
}
