import React from "react";

// Importing Components
import TopBar from "./TopBar";
import Stories from "./Stories";

import LinkedInPost from "./LinkedInPost";

export default function MiddleColumn() {
  return (
    <div className="">
      <div className="topbar">
        {/* Topbar Section */}
        <TopBar />
      </div>

      <div className="stories mt-4">
        {/* Stories Section */}
        <Stories />
      </div>

      {/* Posts Section */}
      <div className="posts mt-8">
        <div className="flex justify-between items-center mb-2">
          {/* Stories Heading */}
          <h2 className="text-lg font-semibold mb-4 pl-2 text-white">Feeds</h2>
          {/* Watch All button */}
          <p className="text-purple-400 font-bold p-1 rounded-lg pr-2">
            Watch All
          </p>
        </div>

        <LinkedInPost
          profilePic="/images/profilepic.jpg"
          name="John Doe"
          title="Software Engineer at Example Inc."
          timestamp="2 hours ago"
          content="Excited to announce the launch of our new project! #software #engineering"
          imageUrl="/images/edtech.jpeg"
          imageCaption="Check out our latest project!"
        />
       
      </div>
    </div>
  );
}
