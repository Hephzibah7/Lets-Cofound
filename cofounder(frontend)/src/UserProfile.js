import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AddCircleOutline, Edit } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:9002/getUserDetails/${username}`, config);
        setUserDetails(response.data);
        
        // Fetch follow status
        const followStatus = await axios.get(`http://localhost:9002/followStatus/${username}`, config);
        setIsFollowing(followStatus.data.isFollowing);
        console.log(isFollowing);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      console.log(isFollowing);
      if (isFollowing) {
        response = await axios.post(`http://localhost:9002/unfollow/${username}`, {}, config);
      } else {
        response = await axios.post(`http://localhost:9002/follow/${username}`, {}, config);
      }
      alert(response.data.message);
      setIsFollowing(!isFollowing);
      setLoading(false);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      setLoading(false);
    }
  };

  if (loading || !userDetails) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-purple-900 shadow-md rounded mb-8 relative">
            <img
              className="w-full rounded h-1/2 object-cover"
              src={`http://localhost:9002/uploads/${userDetails.backgroundImage}`}
              alt=""
            />
            <div className="flex flex-col p-4 space-y-4">
              <img
                className="w-24 h-24 rounded-full mb-4 absolute left-2 top-14"
                src={`http://localhost:9002/uploads/${userDetails.profileImage}`}
                alt="Profile avatar"
              />
              <div className="">
                <div className="flex text-white font-bold">
                  <h1 className="text-xl">{userDetails.username}</h1>
                  <h1 className="ml-auto flex">
                    {userDetails.designation}
                    <img
                      className="rounded-full w-6 h-6 ml-2"
                      src="/images/google.jpeg"
                      alt=""
                    />
                  </h1>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {userDetails.bio}
                </p>
                <p className="text-gray-300 mt-2">{userDetails.location}</p>
              </div>
              <div className="flex items-center mt-4 text-gray-400 space-x-8 cursor-pointer ">
                <div className="flex gap-2 hover:text-white">
                  <Diversity3Icon />
                  <span className="text-gray-400 hover:text-white">
                    500 Followers
                  </span>
                </div>
                <div className="flex gap-2 hover:text-white">
                  <GroupAddIcon />
                  <span className="text-gray-400 hover:text-white">
                    500+ Connections
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2 mb-2 p-4">
              <button
                onClick={handleFollow}
                className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 ${isFollowing ? 'border-blue-700 hover:border-blue-500' : 'border-green-700 hover:border-green-500'} rounded`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-8 p-4 rounded-lg border-4 border-white text-black">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Experience</h2>
              <div className="text-2xl flex space-x-4">
                <span className="cursor-pointer">
                  <AddCircleOutline />
                </span>
                <span className="cursor-pointer">
                  <Edit />
                </span>
              </div>
            </div>
            <p>{userDetails.experience}</p>
          </div>
          <div className="mb-8 p-4 rounded-lg border-4 border-white text-black">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Education</h2>
              <div className="text-2xl flex space-x-4">
                <span className="cursor-pointer">
                  <AddCircleOutline />
                </span>
                <span className="cursor-pointer">
                  <Edit />
                </span>
              </div>
            </div>
            <p>{userDetails.education}</p>
          </div>
          <div className="mb-8 p-4 rounded-lg border-4 border-white text-black">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Skills</h2>
              <div className="text-2xl flex space-x-4">
                <span className="cursor-pointer">
                  <AddCircleOutline />
                </span>
                <span className="cursor-pointer">
                  <Edit />
                </span>
              </div>
            </div>
            <p>{userDetails.skills}</p>
          </div>
          <div className="mb-8 p-4 rounded-lg border-4 border-white text-black">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Achievements</h2>
              <div className="text-2xl flex space-x-4">
                <span className="cursor-pointer">
                  <AddCircleOutline />
                </span>
                <span className="cursor-pointer">
                  <Edit />
                </span>
              </div>
            </div>
            <p>{userDetails.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
