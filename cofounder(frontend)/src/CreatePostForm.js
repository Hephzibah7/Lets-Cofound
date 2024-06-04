import React, { useState, useRef } from 'react';
import { HiOutlineX, HiPhotograph, HiCalendar } from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const CreatePostForm = () => {
  const Navigate=useNavigate();
  const { userId } = useAuth(); // Access the userId from AuthContext
  const [post, setPost] = useState({
    postPrivacy: '',
    postContent: '',
    image: null, // New state for the image file
  });
  const [username, setUsername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const fileInputRef = useRef(null); // Ref for file input
  const [mediaFormVisible, setMediaFormVisible] = useState(false); // State to track media form visibility

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:9002/getUserDetails', config);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPost({
        ...post,
        image: files[0], // Store the selected image file
      });
      setMediaFormVisible(true); // Show media form when uploading image
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // const formData = new FormData();
      // formData.append('postPrivacy', post.postPrivacy);
      // formData.append('postContent', post.postContent);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      };
  
      const data = {
        postPrivacy: post.postPrivacy,
        postContent: post.postContent,
        image: post.image, // Include the image if it exists
      };
      const response = await axios.post('http://localhost:9002/createPost', data, config);
      // setResponseMessage(response.data.message); // Assuming your server sends a message in the response
      alert('Post created successfully');
      Navigate('/landingpage');
      setPost({
        postPrivacy: '',
        postContent: '',
        image: null, // Clear the image state after posting
      });
      setMediaFormVisible(false); // Hide media form after posting
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again later.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-purple-950 h-screen p-10">
      <div className="text-white mx-auto w-1/2 rounded-lg border border-white shadow-lg shadow-white p-10 m-10">
        {!mediaFormVisible && (
          <>
            <div className="flex pb-5">
              <img src="/path/to/profile/image.jpg" alt="Profile Image" className="h-16 w-16 rounded-full mr-4" />
              <div className="block">
                <h2 className="text-left text-4xl text-white pb-5 font-bold mb-4">{username}</h2>
              </div>
            </div>
            <select
              className="border text-white bg-black rounded px-3 py-2 mb-4 w-1/3 flex items-left text-left"
              name="postPrivacy"
              onChange={handleChange}
              value={post.postPrivacy}
            >
              <option>Select</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <textarea
              className="border text-white bg-black rounded px-3 py-4 mb-4 w-full h-60"
              placeholder="What do you want to talk about?"
              name="postContent"
              onChange={handleChange}
              value={post.postContent}
            ></textarea>
            <div className="flex items-center ">
              {/* Display the file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
              <button className="text-gray-500 hover:text-gray-700 p-5" onClick={handleImageUploadClick}>
                <HiPhotograph className="w-8 h-8" /> <span className="hidden md:inline"></span>
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-5">
                <HiCalendar className="w-8 h-8" /> <span className="hidden md:inline"></span>
              </button>
            </div>
          </>
        )}
        {mediaFormVisible && (
          <>
            {/* Display the added image */}
            <img src={URL.createObjectURL(post.image)}  alt="Added Image" className="h-1/2 w-1/2 mb-4 rounded-lg" />

          </>
        )}
         {/* Display the submit button */}
         <div className="flex items-right p-2 justify-right">
              <button  className="bg-purple-700 text-white px-4 py-3 font-bold rounded ml-auto mb-auto" onClick={handleSubmit}>
                Create Post
              </button>
            </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
