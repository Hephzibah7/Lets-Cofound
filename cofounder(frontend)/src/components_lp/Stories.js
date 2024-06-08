import React, { useState, useEffect } from "react";
import Story from "./Story";
import StoryUploadModal from "./StoryUploadModal";
import StoryViewer from "./StoryViewer";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState("");
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:9002/followers/${userId}` , config); 
        const followersIds = response.data;
        console.log(response);
        const responseUsersfollowers = await axios.post('http://localhost:9002/getChatProfileDetails',{ userIds: followersIds },config);
        setFollowers(responseUsersfollowers.data);
      } catch (err) {
        console.error(err);
      }
    };


    
    fetchFollowing();
  }, []);


  const handleUpload = (newPost) => {
    let updatedStories;
    if (stories.length === 0) {
      // Create a new story if none exist
      const newStory = {
        posts: [newPost],
      };
      updatedStories = [newStory];
    } else {
      // Add to the existing story
      updatedStories = [...stories];
      updatedStories[0].posts.push(newPost);
    }
    setStories(updatedStories);
    setIsUploadModalOpen(false);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9002/stories/${id}`);
      setStories(stories.filter(story => story._id !== id));
    } catch (err) {
      setError("Failed to delete story. Please try again later.");
      console.error("Error deleting story:", err);
    }
  };
console.log(stories);
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Stories Heading */}
        <h2 className="text-lg font-semibold mb-4 pl-2 text-white">Stories</h2>
        {/* Watch All button */}
        <p className="text-purple-400 font-bold p-1 rounded-lg pr-2 cursor-pointer">
          Watch All
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Stories Grid */}
      <div className="flex flex-wrap gap-4 pl-2">
        {/* Add Story Square */}
        <div
          className="w-20 h-20 bg-gray-500 rounded-lg border-6 border-purple-800 overflow-hidden cursor-pointer relative transform hover:scale-110 transition-transform duration-300"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <img
            src="/images/profilepic.jpg"
            alt="Add Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-lg">
            +
          </div>
        </div>

        {stories.map((story, index) => (
          <div key={index} className="relative">
            <div onClick={() => handleStoryClick(story)}>
              <Story story={story} />
            </div>
            <DeleteIcon onClick={() => handleDelete(story._id)} />
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
