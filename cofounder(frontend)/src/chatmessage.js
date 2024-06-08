import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import MessageSidebar from "./MessagingSidebar"

const ChatMessage = () => {
  const currentUser = localStorage.getItem('userId');
  const [chatDetails, setChatDetails] = useState(null);
  console.log(chatDetails+ "ayash");
  return (
    <div className="flex h-screen">
      <MessageSidebar currentUser={currentUser} setChatWith={setChatDetails} />
      {chatDetails && <ChatWindow chatDetails={chatDetails} />}
    </div>
  );
};

export default ChatMessage;
