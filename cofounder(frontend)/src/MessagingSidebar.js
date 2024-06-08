

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagingSidebar = ({ currentUser, setChatWith }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:9002/followers/${userId}` , config);
        
        const followersIds = response.data;
        console.log(response);
        const responseUsersfollowers = await axios.post('http://localhost:9002/getChatProfileDetails',{ userIds: followersIds },config);
        setFollowers(responseUsersfollowers.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:9002/following/${userId}` , config);
        setFollowing(response.data);
        const followingIds = response.data;
        console.log(response);
        const responseUsersfollowing = await axios.post('http://localhost:9002/getChatProfileDetails',{ userIds: followingIds },config);
        setFollowing(responseUsersfollowing.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, [currentUser]);

console.log(following);

  return (
    <div className="w-2/5 bg-gray-800 text-white p-4 h-screen">
     
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <div className="mb-4">
      {followers.map(user => (
          <div key={user.userId} className="flex items-center mb-2 cursor-pointer" onClick={() => setChatWith(user)}>
            <img src={`http://localhost:9002/uploads/${user.profileImage}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
            <span className="ml-3">{user.username}</span>
          </div>
        ))}
      
      </div>
      <div>
        
        {following.map(user => (
          <div key={user.userId} className="flex items-center mb-2 cursor-pointer" onClick={() => setChatWith(user)}>
            <img src={`http://localhost:9002/uploads/${user.profileImage}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
            <span className="ml-3">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagingSidebar;
