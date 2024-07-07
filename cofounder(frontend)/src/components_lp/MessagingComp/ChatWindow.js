
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import CallIcon from "@mui/icons-material/Call";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeContext } from "../../context/ThemeContext";


const socket = io('http://localhost:9003');
socket.on('connect', () => {
  console.log('connected to server');
});

const ChatWindow = ({ chatDetails, onBack }) => {
  const currentUser = localStorage.getItem('userId');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(`http://localhost:9002/api/messages/${currentUser}/${chatDetails.userId}`, config);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (chatDetails && chatDetails.userId) {
      fetchMessages();
    }

    socket.on('receiveMessage', (data) => {
      if ((data.sender === currentUser && data.receiver === chatDetails.userId) ||
          (data.sender === chatDetails.userId && data.receiver === currentUser)) {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [currentUser, chatDetails]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: currentUser, receiver: chatDetails.userId, message };
      socket.emit('sendChatMessage', newMessage);
      setMessage('');
    }
  };

  if (!chatDetails || !chatDetails.userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full md:w-3/5 ${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-lightGray text-black"
              } p-4 flex flex-col h-screen border-2 border-black`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-lightGray text-black"
              } p-4 border-b border-gray-200`}>
        <div className={`flex items-center`}>
          <button onClick={onBack} className="md:hidden flex items-center  rounded-full">
            <ArrowBackIcon className="mr-1" />
          </button>
          <img
            src={`http://localhost:9002/uploads/${chatDetails.profileImage}`}
            alt="Profile"
            className="h-12 w-12 ml-4 rounded-full border-2 border-white object-cover"
          />
          <div className="ml-3">
            <h2 className="text-xl font-bold">{chatDetails.username}</h2>
            <div className="flex items-center">
              <div className={`p-1 rounded-full bg-green-400 mr-2`}></div>
              <div className={`text-sm ${
                theme === "dark"
                  ? "text-green-400"
                  : "text-green-700"
              }`}>Online</div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full">
            <AccountCircleIcon className="mr-1" />
            View profile
          </button> */}
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 p-4 overflow-y-auto ${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-lightGray text-black"
              }`}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start mb-4 ${msg.sender === currentUser ? 'justify-end' : ''}`}>
            {msg.sender !== currentUser && (
              <img
                src={`http://localhost:9002/uploads/${chatDetails.profileImage}`}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className={`ml-3 ${msg.sender === currentUser ? 'mr-3 text-right' : ''}`}>
              <div className={`p-3 rounded-lg ${msg.sender === currentUser ? 'bg-purple-800 text-white' : 'bg-gray-200 text-black'}`}>
                <p className="text-sm">{msg.message}</p>
              </div>
              <span className={`text-xs ${
                theme === "dark"
                  ? "text-white"
                  : "text-black"
              }`}>{msg.timestamp}</span>
            </div>
            {msg.sender === currentUser && (
              <img
                src="/images/profilepic.jpg"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-lightGray text-white"
              } p-4 border-t border-gray-200`}>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className={`w-full p-3 border rounded-lg focus:outline-none bg-gray-100`}
          />
          <button onClick={sendMessage} className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg">
            <SendIcon className="mr-1" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
