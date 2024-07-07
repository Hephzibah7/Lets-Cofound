// /client/src/StoryViewer.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StoryViewer = ({ story, onClose }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-white rounded-lg p-4 w-3/4 max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Story Viewer</h2>
      <Slider {...settings}>
        {story.posts.map((post, index) => (
          <div key={index} className="story-post mb-4">
            <img src={`http://localhost:9002/uploads/${post.filepath}`} className="w-full rounded" />
            <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
          </div>
        ))}
      </Slider>
        <div className="flex justify-end">
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

export default StoryViewer;
