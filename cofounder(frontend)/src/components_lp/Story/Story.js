import React, { useState } from "react";

export default function Story({ story }) {
  const [showStory, setShowStory] = useState(false);

  if (!story.posts || story.posts.length === 0) {
    return null;
  }

  const handleClick = () => {
    setShowStory(true);
  };

  const closeStory = () => {
    setShowStory(false);
  };

  return (
    <div className="relative  ">
      {/* Story Thumbnail */}
      <div
        className="w-20 h-20 rounded-full border-4 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300"
        onClick={handleClick}
      >
        <img
          src={`http://localhost:9002/uploads/${story.profileImage}`}
          className="w-full h-full object-cover rounded-full"
        />
       
      </div>
      <p className="font-bold text-center">{story.username}</p>
   
    </div>
  );
}
