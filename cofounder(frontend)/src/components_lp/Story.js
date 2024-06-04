import React from "react";

export default function Story() {
  return (
    <div className="w-20 h-34 bg-gray-500 rounded-full border-4 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300">
      {/* Story Image */}
      <img
        src="/images/profilepic.jpg"
        alt="Story 1"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
