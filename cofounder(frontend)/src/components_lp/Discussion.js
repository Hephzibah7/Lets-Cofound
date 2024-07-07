// Chat.js
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// const socket = io('http://localhost:9003');

// export default function Discussion({ projectId }) {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9002/chat/${projectId}`);
//         console.log(response.data);
//         setChatMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching chat messages:', error);
//       }
//     };

//     fetchChatMessages();

//     socket.emit('joinProject', projectId);

//     socket.on('receiveMessage', (message) => {
//       setChatMessages(prevMessages => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, [projectId]);

//   const handleSendMessage = () => {
//     const userId = localStorage.getItem("userId");
//     if (newMessage.trim()) {
//       const message = {
//         projectId,
//         content: newMessage,
//         userId: `${userId}`, // Replace with actual user info
//       };
//       socket.emit('sendMessage', message);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="bg-white text-black w-[30vw] rounded-lg shadow-lg p-5">
//       <h3 className="text-lg font-bold mb-4">Chat</h3>
//       <div className="mb-4">
//         {chatMessages.length > 0 ? (
//           chatMessages.map((message, index) => (
//             <div key={index} className="mb-4">
//               <div className="flex items-center mb-2">
//                 <img
//                   src={message.profilePic || `http://localhost:9002/uploads/${message.profilePic}`}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-2">
//                   <h4 className="text-sm font-bold">{message.username}</h4>
//                 </div>
//               </div>
//               <p className="text-sm">{message.content}</p>
//               <p>{message.timestamp}</p>
//             </div>
//           ))
//         ) : (
//           <p>No chat messages yet.</p>
//         )}
//       </div>
//       <div className="flex mt-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="border border-gray-300 rounded-lg w-full px-2 py-1"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 bg-purple-600 text-white rounded-lg px-4 py-1"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import SendIcon from '@mui/icons-material/Send';

// const socket = io('http://localhost:9003');

// export default function Discussion({ projectId }) {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9002/api/projects/chat/${projectId}`);
//         setChatMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching chat messages:', error);
//       }
//     };

//     fetchChatMessages();

//     socket.emit('joinProject', projectId);

//     socket.on('receiveMessage', (message) => {
//       setChatMessages(prevMessages => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, [projectId]);

//   const handleSendMessage = () => {
//     const userId = localStorage.getItem("userId");
//     if (newMessage.trim()) {
//       const message = {
//         projectId,
//         content: newMessage,
//         userId: `${userId}`, // Replace with actual user info
//       };
//       socket.emit('sendMessage', message);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="bg-white text-black w-[30vw] rounded-lg shadow-lg p-5 flex flex-col border-4 border-purple-600">
//       <h3 className="text-lg font-bold mb-4">Chat</h3>
//       <div className="mb-4 flex-1 overflow-y-auto">
//         {chatMessages.length > 0 ? (
//           chatMessages.map((message, index) => (
//             <div key={index} className="mb-4">
//               <div className="flex items-center mb-2">
//                 <img
//                   src={message.profilePic || `http://localhost:9002/uploads/${message.profilePic}`}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-2">
//                   <h4 className="text-sm font-bold">{message.username}</h4>
//                 </div>
//               </div>
//               <div className="ml-12">
//                 <p className="bg-gray-200 rounded-lg p-2 text-sm">{message.content}</p>
//                 <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No chat messages yet.</p>
//         )}
//       </div>
//       <div className="flex mt-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-purple-500"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center justify-center"
//         >
//           <SendIcon />
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

const socket = io('http://localhost:9003');

export default function Discussion({ projectId }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Get the JWT token from localStorage
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/api/projects/chat/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();

    socket.emit('joinProject', projectId);

    socket.on('receiveMessage', (message) => {
      setChatMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [projectId, token]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        userId,
        content: newMessage,
      };

      try {
        // Send message to backend with authorization header
        const response = await axios.post(
          `http://localhost:9002/api/projects/chat/${projectId}`,
          message,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const savedMessage = response.data;

        // Emit message to socket
        socket.emit('sendMessage', savedMessage);
        
        // Update local state
        setChatMessages(prevMessages => [...prevMessages, savedMessage]);
        setNewMessage("");
      } catch (error) {
        console.error('Error sending chat message:', error);
      }
    }
  };

  return (
    <div className="bg-white text-black w-full sm:w-[80vw] md:w-[60vw] lg:w-[30vw] rounded-lg shadow-lg p-5 flex flex-col border border-gray-300">
      <h3 className="text-lg font-bold mb-4">Chat</h3>
      <div className="flex-1 overflow-y-auto p-2 border-t border-gray-300 max-h-[50vh]">
        {chatMessages.length > 0 ? (
          chatMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
            >
              {message.userId !== userId && (
                <img
                  src={message.profilePic || `http://localhost:9002/uploads/${message.profilePic}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className={`ml-2 ${message.userId === userId ? 'text-right' : 'text-left'}`}>
                <h4 className="text-sm font-bold">{message.username}</h4>
                <p className={`rounded-lg p-2 text-sm ${message.userId === userId ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  {message.content}
                </p>
                <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
              {message.userId === userId && (
                <img
                  src={message.profilePic || `http://localhost:9002/uploads/${message.profilePic}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          ))
        ) : (
          <p>No chat messages yet.</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center justify-center"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
