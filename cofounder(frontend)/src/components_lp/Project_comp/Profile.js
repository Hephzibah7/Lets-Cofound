// src/components/UserProfile.js
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="p-4 bg-secondary text-white rounded-lg flex items-center space-x-4">
      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
      <div>
        <div className="text-xl font-bold text-primary">{user.name}</div>
        <div className="text-gray-400">@{user.username}</div>
      </div>
    </div>
  );
};

export default Profile;
