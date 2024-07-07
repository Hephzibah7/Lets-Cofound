// /client/src/Stories.js
import React, { useState, useEffect } from 'react';
import Story from './Story';
import StoryUploadModal from './StoryUploadModal';
import StoryViewer from './StoryViewer';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:9002/api/profiles/getUserDetails', config);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:9002/api/story/stories', config);
        console.log(response.data);
        setStories(response.data);
      } catch (err) {
        console.error('Error fetching stories:', err);
      }
    };
    fetchUserData();
    fetchStories();
  }, []);

  const handleUpload = (newPost) => {
    let updatedStories = [...stories];
    const userStory = stories.find(story => story.userId === newPost.userId);
    console.log(newPost);
    if (userStory) {
      userStory.posts.push(newPost);
    } else {
      const newStory = {
        
        username: newPost.username,
        profileImage: newPost.profileImage,
        posts: [newPost],
      };
      updatedStories.push(newStory);
    }

    setStories(updatedStories);
    setIsUploadModalOpen(false);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:9002/api/story/stories/${id}`, config);
      setStories(stories.filter((story) => story._id !== id));
    } catch (err) {
      setError('Failed to delete story. Please try again later.');
      console.error('Error deleting story:', err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold mb-4 pl-2 text-white">Stories</h2>
        <p className="text-purple-400 font-bold p-1 rounded-lg pr-2 cursor-pointer">Watch All</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4 pl-2">
        <div
          className="w-20 h-20 bg-gray-500 rounded-full border-4 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300"
          onClick={() => setIsUploadModalOpen(true)}
        >
          {/* <img
           src={`http://localhost:9002/uploads/${userDetails.bio}`}
            alt="Add Story"
            className="w-full h-full object-cover rounded-full"
          /> */}
          <p>Add story</p>
          <div className="absolute bottom-1 right-1 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-lg">
            +
          </div>
        </div>

        {stories.map((story, index) => (
          <div key={index} className="relative z-[-20] lg:z-20">
            <div onClick={() => handleStoryClick(story)}>
              <Story story={story} className="" />
            </div>
            <DeleteIcon onClick={() => handleDelete(story._id)} className="absolute top-1 right-1 text-red-500 cursor-pointer" />
          </div>
        ))}
      </div>

      {isUploadModalOpen && (
        <StoryUploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />
      )}

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}
