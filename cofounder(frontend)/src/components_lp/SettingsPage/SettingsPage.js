import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import axios from "axios";

const updateEmail = async (newEmail) => {
  try {
    const response = await axios.post(
      "http://localhost:9002/api/account/updateEmail",
      { email: newEmail },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const updatePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post(
      "http://localhost:9002/api/account/updatePassword",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const updateUsername = async (newUsername) => {
  try {
    const response = await axios.post(
      "http://localhost:9002/api/account/updateUsername",
      { username: newUsername },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isPrivate, setIsPrivate] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const privacyResponse = await axios.get(
          `http://localhost:9002/api/privacy/privacy/${userId}`,
          config
        );
       
        setIsPrivate(privacyResponse.data);

        const blockedUsersResponse = await axios.get(
          `http://localhost:9002/api/block/blockeduserdetails/${userId}`,
          config
        );
        setBlockedUsers(blockedUsersResponse.data || []);

        const projectsResponse = await axios.get(
          `http://localhost:9002/api/projects/interestedprojects/${userId}`,
          config
        );
        setProjects(projectsResponse.data || []);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const togglePrivacy = () => {
    const newPrivacy = !isPrivate;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsPrivate(newPrivacy);
    axios
      .post(
        "http://localhost:9002/api/privacy/privacy",
        { userId, isPrivate: newPrivacy },
        config
      )
      .catch((error) =>
        console.error("Error updating privacy setting:", error)
      );
  };

  const unblockUser = async (userIdToUnblock) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:9002/api/block/unblock/${userIdToUnblock}`,
        {},
        config
      );
      alert("User Unblocked Successfully");
      setBlockedUsers(
        blockedUsers.filter((user) => user.userId !== userIdToUnblock)
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };
  console.log(isPrivate);

  const handleChangeEmail = async (newEmail) => {
    try {
      const response = await updateEmail(newEmail);
      setMessage(response.message);
    } catch (error) {
      setMessage(`Failed to update email: ${error}`);
    }
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      const response = await updatePassword(oldPassword, newPassword);
      setMessage(response.message);
    } catch (error) {
      setMessage(`Failed to update password: ${error}`);
    }
  };

  const handleChangeUsername = async (newUsername) => {
    try {
      const response = await updateUsername(newUsername);
      setMessage(response.message);
    } catch (error) {
      setMessage(`Failed to update username: ${error}`);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-black text-gray-200"
          : "bg-gray-200 text-gray-900"
      } font-sans`}
    >
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={handleHome}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Home
          </button>
        </div>
        <div className="space-y-8">
          {/* Privacy Setting */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <span className="text-lg font-medium">Account Privacy</span>
            <button
              onClick={togglePrivacy}
              className={`px-4 py-2 rounded-full ${
                isPrivate
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-semibold transition duration-300 ease-in-out`}
            >
              {isPrivate ? "Public" : "Private"}
            </button>
          </div>

          {/* Dark Mode Setting */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <span className="text-lg font-medium">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-full ${
                theme === "dark"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-purple-800 hover:bg-purple-600"
              } text-white font-semibold transition duration-300 ease-in-out`}
            >
              {theme === "dark" ? "Disable" : "Enable"}
            </button>
          </div>

          {/* Render AccountSettings component */}
          <AccountSettings
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleChangeUsername={handleChangeUsername}
            message={message}
          />

          {/* Blocked Users List */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Blocked Users</h2>
            <ul className="space-y-2">
              {blockedUsers.length > 0 ? (
                blockedUsers.map(user => (
                  <li key={user.userId} className="flex justify-between items-center bg-purple-500 p-3 rounded">
                    <div className='flex'>
                    <img
                      src={`http://localhost:9002/uploads/${user.profileImage}`}
                      alt="Profile"
                      className="w-14 h-14 rounded-full "
                    />
                    <span className='p-7'>{user.username}</span>
                    </div>
                   
                    <button
                      onClick={() => unblockUser(user.username)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Unblock
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No blocked users</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
