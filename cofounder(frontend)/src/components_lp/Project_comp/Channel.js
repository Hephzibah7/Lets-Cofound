import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ThemeContext } from "../../context/ThemeContext";

const members = [
  { name: 'Hope Hauck', time: '7 min ago', image: 'images/elonmusk.jpg' },
  { name: 'Davian Owen', time: '10 min ago', image: 'images/billgates.jpg' },
  { name: 'Valerie Patel', time: '25 min ago', image: 'images/billgates.jpg' },
  { name: 'Macey Mcmillan', time: '40 min ago', image: 'images/billgates.jpg' },
];

const activities = [
  { description: 'Harper Carr invited you to a chat', time: '20 min ago', image: 'https://via.placeholder.com/40' },
  { description: 'Krystal Riddle started following you', time: '20 min ago', image: 'https://via.placeholder.com/40' },
];

const Channel = () => {
  const { theme } = useContext(ThemeContext); 
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:9002/api/profiles/getProfileDetails",
          config
        );
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []);

  if (!profileDetails) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} w-full h-full p-4`}>
      <div className="text-center mb-8">
        <img src="images/profilepic.jpg" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
        <h2 className="text-lg font-bold">{profileDetails.fullName}</h2>
        <p className="text-sm">{profileDetails.username}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">New Members</h3>
          <a href="#" className="text-sm text-gray-400">See All</a>
        </div>
        {members.map((member, index) => (
          <div key={index} className={`flex items-center mb-4 p-2 ${theme === 'dark' ? 'bg-darkPurple text-white' : 'bg-lightGray text-black'} rounded-lg`}>
            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="font-bold">{member.name}</p>
              <p className="text-sm text-gray-400">{member.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <a href="#" className="text-sm text-gray-400">See All</a>
        </div>
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center mb-4 p-2 bg-purple-800 rounded-lg">
            <img src={activity.image} alt={activity.description} className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="font-bold">{activity.description}</p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
