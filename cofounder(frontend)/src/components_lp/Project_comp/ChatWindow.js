import React from 'react';

const messages = [
  { id: 1, user: 'Bill Gates', time: '2:18 AM', text: "I don't know, it's look fine for me", avatar: 'images/billgates.jpg' },
  { id: 2, user: 'Elon Musk', time: '2:18 AM', text: "I don't know, it's look fine for me", avatar: 'images/elonmusk.jpg' },
  { id: 3, user: 'Ayash Kumar', time: '2:18 AM', text: "I don't know, it's look fine for me", avatar: 'images/profilepic.jpg', isCurrentUser: true },
  { id: 4, user: 'Jeff Bezos', time: '2:18 AM', text: "I don't know, it's look fine for me", avatar: 'images/jeffbezos.jpeg' },
];

const ChatMessage = ({ user, time, text, avatar, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : ''} mb-4`}>
      {!isCurrentUser && (
        <img src={avatar} alt={`${user} avatar`} className="h-10 w-10 rounded-full mr-4 object-cover" />
      )}
      <div>
        <div className={`text-sm ${isCurrentUser ? 'text-right' : 'text-left'}`}>
          <span className="font-bold">{user}</span>
          <span className="text-gray-400 ml-2">{time}</span>
        </div>
        <div className={`${isCurrentUser ? 'bg-purple-800' : 'bg-gray-700'} text-white rounded-lg p-3 mt-1 max-w-xs`}>
          {text}
          <p className="mt-2 text-gray-300 text-sm">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </div>
      </div>
      {isCurrentUser && (
        <img src={avatar} alt={`${user} avatar`} className="h-10 w-10 rounded-full ml-4 object-cover" />
      )}
    </div>
  );
};

const ChatWindow = () => {
  return (
    <div className="bg-gray-900 h-screen flex flex-col justify-between">
      <div className="p-6 flex-1 overflow-y-auto">
        {messages.map(msg => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
      </div>
      <div className="p-6 bg-gray-800 flex items-center">
        <input type="text" placeholder="Write a message..." className="flex-1 bg-gray-700 text-white p-3 rounded-lg mr-4" />
        <button className="bg-blue-600 text-white p-3 rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
