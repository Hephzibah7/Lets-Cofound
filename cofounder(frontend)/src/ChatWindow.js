// import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import CallIcon from "@mui/icons-material/Call";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { useState } from 'react';
import { useEffect } from 'react';

const socket = io('http://localhost:9003');
socket.on('connect', () => {
  console.log('connected to server');
});

const ChatWindow =  ({chatDetails}) => {

  const currentUser = localStorage.getItem('userId');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
console.log(chatDetails);
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(`http://localhost:9002/messages/${currentUser}/${chatDetails.userId}`, config);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('receiveMessage', (data) => {
      if ((data.sender === currentUser && data.receiver === chatDetails.userId) ||
          (data.sender === chatDetails.userId && data.receiver === currentUser)) {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [currentUser, chatDetails.userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: currentUser, receiver: chatDetails.userId, message };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="w-3/5 bg-black text-white p-4 flex flex-col h-screen border-2 border-black">
      {/* Header */}
      <div className="flex items-center justify-between bg-black p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={`http://localhost:9002/uploads/${chatDetails.profileImage}`}
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white object-cover"
          />
          <div className="ml-3">
            <h2 className="text-xl font-bold">{chatDetails.username}</h2>
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-green-400 mr-2"></div>
              <div className="text-sm text-green-400">Online</div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center bg-purple-200 text-purple-700 px-4 py-2 rounded-full">
            <CallIcon className="mr-1" />
            Call
          </button>
          <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
            <ArchiveIcon className="mr-1" />
            Archive
          </button>
          <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full">
            <AccountCircleIcon className="mr-1" />
            View profile
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-black text-white">
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
              <span className="text-xs text-gray-300">{msg.timestamp}</span>
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
      <div className="bg-black p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={(e) => e.key === 'Enter' ? sendMessage() : null}
            className="w-full p-3 text-black  border rounded-lg focus:outline-none bg-gray-100"
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
