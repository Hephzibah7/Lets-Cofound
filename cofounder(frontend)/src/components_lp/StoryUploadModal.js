import React, { useState } from "react";
import axios from "axios";

export default function StoryUploadModal({ onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("http://localhost:9002/upload", formData, config);

      if (response.status === 201) {
        onUpload(response.data);
        onClose();
      } else {
        setError("Failed to upload the story. Please try again.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload the story. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg mb-2">Upload Story</h2>
        <input type="file" onChange={handleFileChange} name="image" className="mb-2" />
        <input
          type="text"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Add a caption"
          className="mb-2 p-1 w-full rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleUpload} className="p-2 bg-purple-600 rounded">
          Upload
        </button>
        <button onClick={onClose} className="p-2 bg-gray-600 rounded ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
}
