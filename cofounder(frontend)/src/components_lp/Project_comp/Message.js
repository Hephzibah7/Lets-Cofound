// src/components/Message.js
import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="flex items-start space-x-4 bg-secondary p-2 rounded-lg">
      <img src={message.avatar} alt={message.username} className="w-12 h-12 rounded-full" />
      <div>
        <div className="text-primary font-bold">{message.username}</div>
        <div className="text-gray-400">{message.time}</div>
        <div className="mt-2 text-white">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
