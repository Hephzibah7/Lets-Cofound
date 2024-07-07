import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = ({
  projectId,
  image,
  date,
  category,
  title,
  description,
  authorImage,
  authorName,
  authorRole,
  projectOwner,
  fundingStatus,
}) => {
  const [interested, setInterested] = useState(null);
  const [invitation, setInvitation] = useState(null);
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Assuming you store user ID in local storage
  const userId = localStorage.getItem("userId");
  // Load the interested state from local storage on component mount
  useEffect(() => {
    const savedInterest = localStorage.getItem(`interested-${userId}-${projectId}`);
    const savedInvitation = localStorage.getItem(`invitation-${userId}-${projectId}`);
    if(savedInvitation === "Approved"){
      setInterested(savedInvitation);
    }
    else
    if (savedInterest === "RequestSent" || savedInterest === "Approved") {
      setInterested(savedInterest);
    }
    
  }, [projectId, userId]);

  const handleShowInterest = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:9002/api/notifications/showinterest/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setInterested("RequestSent");
        localStorage.setItem(`interested-${userId}-${projectId}`, 'RequestSent');
        alert("Request to show interest has been sent successfully.");
      }
    } catch (error) {
      console.error("Error showing interest:", error);
      alert("An error occurred while sending the request.");
    }
  };

  const buttonText = () => {
    if (userId === projectOwner) {
      return "View More";
    }
    switch (interested) {
      case "RequestSent":
        return "Request Sent";
      case "Approved":
        return "View More";
      default:
        return "Show Interest";
    }
  };

  const handleViewMore = () => {
    navigate(`/detailedproject/${projectId}`);
  };
  const handleCheckboxChange = async(event, follower) => {
    if (event.target.checked) {
      try {
        const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
        const response = await axios.post(
          `http://localhost:9002/api/notifications/invitationsent/${projectId}/${follower.userId}`,{}, config);
        if (response.status === 200) {
          setInvitation("InvitationSent");
          localStorage.setItem(`invitation-${follower.userId}-${projectId}`, 'InvitationSent');
          alert(`Your Invitation has been sent successfully to ${follower.username}`);
        }
      } catch (error) {
        console.error("Error showing interest:", error);
        alert("An error occurred while sending the invitation.");
      }
    }
  };

  const handleInvitation= async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:9002/api/profiles/followersdetails/${userId}`, config);
      console.log(response.data.followers);
      setFollowers(response.data.followers);
      setDropdownVisible(true);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  return (
    <div className="bg-white text-black rounded-lg shadow-md overflow-hidden flex m-3 h-1/2">
      <img
        src={`http://localhost:9002/uploads/${image}`}
        alt="Post"
        className="w-1/2 m-1 object-cover"
      />
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div className="flex items-center">
          <img
            src={`http://localhost:9002/uploads/${authorImage}`}
            alt={authorName}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="text-gray-900 font-bold">{authorName}</p>
            <p className="text-gray-600">{authorRole}</p>
            <p className="text-gray-600">{fundingStatus}</p>
            
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{date}</span>
            <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 rounded">
              {category}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {userId === projectOwner ? (
            <p className="text-gray-700 mb-4">{description}</p>
          ) : interested === "Approved" ? (
            <p className="text-gray-700 mb-4">{description}</p>
          ) : (
            <p className="text-gray-700 mb-4">
              Content hidden. Show interest to view more.
            </p>
          )}
        </div>
        
        <div className="ml-auto">
          {userId === projectOwner ? (
            <>
            <button
              className="cursor-pointer bg-purple-800 p-2 rounded-lg text-white"
              onClick={handleViewMore}
            >
              {buttonText()}
            </button>
            <button
              className="cursor-pointer ml-3 bg-purple-800 p-2 rounded-lg text-white"
              onClick={handleInvitation}
            >
              Send an invitation
            </button>
            {dropdownVisible && (
        <div className="absolute right-100 w-1/6 rounded bg-purple-300 shadow-lg z-10 overflow-auto max-h-64 ">
          {followers.length > 0 ? (
            <div className="flex flex-col">
              {followers.map(follower => (
                <div key={follower.userId} className="flex items-center p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(event) => handleCheckboxChange(event, follower, projectId)}
                  />
                  <img src={`http://localhost:9002/uploads/${follower.profileImage}`} className="w-8 h-8 rounded-full mr-2" alt={follower.username} />
                  <span className="font-bold">{follower.username}</span>
                </div>
              ))}
            </div>
          ): (
            <div>No followers found</div>
          )}
        </div>
      )}
            </>
          ) : (
            interested === "Approved" ? (
              <button
                className="cursor-pointer bg-purple-800 p-2 rounded-lg text-white"
                onClick={handleViewMore}
              >
                {buttonText()}
              </button>
              
            ) : (
              <button
                className="cursor-pointer bg-purple-800 p-2 rounded-lg text-white"
                onClick={handleShowInterest}
                disabled={interested === "RequestSent"}
              >
                {buttonText()}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
