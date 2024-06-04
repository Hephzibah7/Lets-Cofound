import React from "react";

const Post = ({
  image,
  date,
  category,
  title,
  description,
  authorImage,
  authorName,
  authorRole,
}) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-md overflow-hidden flex m-3 h-1/2">
     <img src={`http://localhost:9002/uploads/${image}`} alt="Post" className="w-1/2 m-1 object-cover" />
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
          <p className="text-gray-700 mb-4">{description}</p>
        </div>
        <div className="ml-auto">
            <button className="bg-purple-800 p-2 rounded-lg text-white">
                Show Interest
            </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
