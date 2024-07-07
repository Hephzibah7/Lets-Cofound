import React, { useState } from 'react';
import axios from 'axios';

const StoryUploadModal = ({ onClose, onUpload }) => {
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
 const userId=localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('story', file);
    formData.append('caption', caption);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:9002/api/story/upload-story', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      onUpload(response.data.posts[0]);
    } catch (error) {
      console.error('Error uploading story:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Upload Story</h2>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryUploadModal;
