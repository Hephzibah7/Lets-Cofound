
// src/components/MessagingSidebar.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from "../../context/ThemeContext";


const MessagingSidebar = ({ currentUser, setChatWith }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const { theme } = useContext(ThemeContext);

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
        const response = await axios.get(`http://localhost:9002/api/profiles/followers/${userId}`, config);
        
        const followersIds = response.data;
        const responseUsersFollowers = await axios.post('http://localhost:9002/api/profiles/getChatProfileDetails', { userIds: followersIds }, config);
        setFollowers(responseUsersFollowers.data);
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
        const response = await axios.get(`http://localhost:9002/api/profiles/following/${userId}`, config);
        
        const followingIds = response.data;
        const responseUsersFollowing = await axios.post('http://localhost:9002/api/profiles/getChatProfileDetails', { userIds: followingIds }, config);
        setFollowing(responseUsersFollowing.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      await fetchFollowers();
      await fetchFollowing();
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const mergeUsers = (followers, following) => {
      const allUsers = [...followers, ...following];
      const uniqueUsersMap = new Map();
      allUsers.forEach(user => uniqueUsersMap.set(user.userId, user));
      setUniqueUsers(Array.from(uniqueUsersMap.values()));
    };

    mergeUsers(followers, following);
  }, [followers, following]);

  return (
    <div className={`w-full md:w-2/5 ${
              theme === "dark"
                ? "bg-black text-white"
                : "bg-white text-black"
            } p-4 h-screen md:h-auto`}>
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <div>
        {uniqueUsers.map(user => (
          <div key={user.userId} className={`flex items-center mb-2 p-1 ${
              theme === "dark"
                ? "bg-black text-white border-2 border-white"
                : "bg-lightGray text-black border-2 border-black"
            } rounded-lg cursor-pointer`} onClick={() => setChatWith(user)}>
            <img src={`http://localhost:9002/uploads/${user.profileImage}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
            <span className="ml-3">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagingSidebar;
