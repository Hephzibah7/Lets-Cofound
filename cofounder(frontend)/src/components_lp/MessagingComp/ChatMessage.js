
// // ChatMessage.js
// import React, { useState } from 'react';
// import ChatWindow from './ChatWindow';
// import MessagingSidebar from './MessagingSidebar';

// const ChatMessage = () => {
//   const currentUser = localStorage.getItem('userId');
//   const [chatDetails, setChatDetails] = useState(null);

//   return (
//     <div className="flex h-screen">
//       <MessagingSidebar currentUser={currentUser} setChatWith={setChatDetails} />
//       {chatDetails && <ChatWindow chatDetails={chatDetails} />}
//     </div>
//   );
// };

// export default ChatMessage;



import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import MessagingSidebar from './MessagingSidebar';

const ChatMessage = () => {
  const currentUser = localStorage.getItem('userId');
  const [chatDetails, setChatDetails] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleSetChatWith = (details) => {
    setChatDetails(details);
    setShowChatWindow(true);
  };

  const handleBackToSidebar = () => {
    setShowChatWindow(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {!showChatWindow && (
        <MessagingSidebar currentUser={currentUser} setChatWith={handleSetChatWith} />
      )}
      {showChatWindow && (
        <ChatWindow chatDetails={chatDetails} onBack={handleBackToSidebar} />
      )}
      {!chatDetails && <div className="hidden md:block md:w-3/5">Select a chat to start messaging</div>}
    </div>
  );
};

export default ChatMessage;

