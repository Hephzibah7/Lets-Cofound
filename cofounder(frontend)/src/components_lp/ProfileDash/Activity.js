import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";


const ActivityFeed = ({ activities }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <div className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-lightGray text-black border-4 border-lightPurple'} p-4 shadow-md rounded mt-8 max-w-xl mx-auto`}>
      {/* Activity Feed Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Activity</h2>
          <span className="text-sm text-blue-500">113 followers</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create a post
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button className="text-white bg-green-500 px-4 py-2 rounded">Posts</button>
        <button className="text-gray-500 px-4 py-2 rounded">Comments</button>
      </div>

      {/* Activity Feed Container */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="border-b border-gray-300 pb-4 flex items-center">
            {/* Image */}
            {activity.image && (
              <img src={activity.image} alt="Activity" className="w-14 h-14 rounded-full mr-4" />
            )}
            
            {/* Activity Content */}
            <div>
              {/* Individual Activity Items */}
              <p className="text-gray-800">
                <span className="font-semibold">{activity.user}</span> {activity.action} • {activity.timeAgo}
              </p>
              <p className="text-gray-800 mt-2">
                {activity.content}
              </p>
              <a href={activity.link} className="text-blue-500 mt-2 block font-semibold">
                {activity.linkText}
              </a>
              <p className="text-gray-500 text-sm">{activity.meta}</p>
              
              {/* Interaction Options */}
              {activity.interactionOptions && (
                <div className="flex items-center mt-2">
                  <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5zm0-10l9-5-9-5-9 5 9 5z" /></svg>
                  <span className="text-gray-500">{activity.interactionCount}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center">
        <button className="text-blue-500 flex items-center mx-auto">
          Show all posts
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;