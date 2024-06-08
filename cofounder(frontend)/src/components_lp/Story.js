import React from "react";

export default function Story({ story }) {
  if (!story.posts || story.posts.length === 0) {
    return null;
  }
  return (
    <div className="w-20 h-20 rounded-full border-4 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300">
      {/* Story Image */}
      <img
        src={`http://localhost:9002/uploads/${story.posts[0].filepath}`}
        alt={story.posts[0].caption}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}
