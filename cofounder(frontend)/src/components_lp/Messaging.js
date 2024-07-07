import React from 'react';

const messages = [
  { from: 'John Doe', content: 'Hey, how are you?', timestamp: '10:00 AM' },
  { from: 'Jane Smith', content: 'I am good, how about you?', timestamp: '10:02 AM' },
  { from: 'John Doe', content: 'Doing well, thanks!', timestamp: '10:05 AM' },
];

export default function Messaging() {
  return (
    <div className="flex h-full bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 rounded bg-gray-700 border-none"
            />
          </div>
          <div className="space-y-4">
            {['John Doe', 'Jane Smith', 'Alice Johnson'].map((name) => (
              <div key={name} className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="/images/profilepic.jpg"
                  alt={name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-400">Active 1h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Messaging Area */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">John Doe</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-end">
                <img
                  src="/images/profilepic.jpg"
                  alt={msg.from}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-gray-700 p-2 rounded-lg">
                  <p>{msg.content}</p>
                  <p className="text-sm text-gray-400">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <input
            type="text"
            placeholder="Message..."
            className="w-full p-2 rounded bg-gray-700 border-none"
          />
        </div>
      </div>
    </div>
  );
}
