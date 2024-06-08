import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  // You'll need to install react-slick and slick-carousel
import Stories from  "./Stories";

export default function StoryViewer({ story, onClose }) {
  if (!story.posts || story.posts.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-lg relative max-w-lg w-full ">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 p-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
        <Slider {...settings}>
          {story.posts.map((post, index) => (
            <div key={index}>
              {post.fileType.startsWith("image/") ? (
                <img
                  src={`http://localhost:9002/${post.filePath}`}
                  alt={post.caption}
                  className="w-[50vw] h-[50vh]"
                />
              ) : (
                <video controls src={`http://localhost:9002/${post.filePath}`} className="max-w-full max-h-full" />
              )}
              <p className="mt-2 text-black">{post.caption}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
