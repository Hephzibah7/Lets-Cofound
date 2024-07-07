import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const CommentsSection = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const handleHideComments = () => {
    setShowAllComments(false);
  };

  const commentsToShow = showAllComments ? post.comments : post.comments.slice(0, 1);

  return (
    <div className="mt-4 rounded p-1 w-full">
      {commentsToShow.map((comment, index) => (
        <div key={index} className="flex items-left text-white p-2 rounded-lg mb-2">
          <div className="flex items-center mb-2">
            <Avatar src={`http://localhost:9002/uploads/${comment.profileimageUrl}`} alt={comment.username} className="mr-2" />
          </div>
          <div className="grid items-left mt-2 w-full p-2 rounded bg-purple-600">
            <div className="text-left w-full">
              <p className="text-xl font-bold">{comment.username}</p>
              <p className="text-sm font-bold">{comment.designation}</p>
            </div>
            <div className="w-full">
              <p className="text-sm mt-2 flex items-left">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
      {post.comments.length > 1 && !showAllComments && (
        <button
          onClick={handleShowMoreComments}
          className="text-sm text-white hover:underline mt-2"
        >
          More Comments
        </button>
      )}
      {showAllComments && (
        <button
          onClick={handleHideComments}
          className="text-sm text-white hover:underline mt-2"
        >
          Hide Comments
        </button>
      )}
    </div>
  );
};

const getUniquePosts = (posts1, posts2) => {
  const combinedPosts = [...posts1, ...posts2];
  const uniquePostsMap = new Map();

  combinedPosts.forEach(post => {
    uniquePostsMap.set(post._id, post);
  });

  return Array.from(uniquePostsMap.values());
};

const LinkedInPost = () => {
  const [postDetails, setPostDetails] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get('http://localhost:9002/api/profiles/getUserDetails', config);
        setUserDetails(userResponse.data);

        const [postResponse1, postResponse2] = await Promise.all([
          axios.get('http://localhost:9002/api/posts/getPostDetails', config),
          axios.get('http://localhost:9002/api/recommend/post', config)
        ]);

        const posts1 = postResponse1.data.posts || [];
        const posts2 = postResponse2.data.posts || [];

        const uniquePosts = getUniquePosts(posts1, posts2);

        // Initialize isLiked property
        const updatedPosts = uniquePosts.map(post => ({
          ...post,
          isLiked: post.likes.includes(userResponse.data.userId._id),
        }));

        setPostDetails(updatedPosts.filter(post => posts1.some(p => p._id === post._id)));
        setRecommendedPosts(updatedPosts.filter(post => posts2.some(p => p._id === post._id)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (postId, isLiked) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (isLiked) {
        // Unlike the post
        const response = await axios.delete(`http://localhost:9002/api/posts/likePost/${postId}`, config);
        setPostDetails(prevDetails =>
          prevDetails.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes, isLiked: false } : post
          )
        );
        setRecommendedPosts(prevDetails =>
          prevDetails.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes, isLiked: false } : post
          )
        );
      } else {
        // Like the post
        const response = await axios.post(`http://localhost:9002/api/posts/likePost/${postId}`, {}, config);
        setPostDetails(prevDetails =>
          prevDetails.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes, isLiked: true } : post
          )
        );
        setRecommendedPosts(prevDetails =>
          prevDetails.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes, isLiked: true } : post
          )
        );
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleShare = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`http://localhost:9002/api/posts/sharePost/${postId}`, {}, config);
      // Update the post details with the new share count
      setPostDetails(prevDetails =>
        prevDetails.map(post =>
          post._id === postId ? { ...post, shares: response.data.shares } : post
        )
      );
      setRecommendedPosts(prevDetails =>
        prevDetails.map(post =>
          post._id === postId ? { ...post, shares: response.data.shares } : post
        )
      );
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`http://localhost:9002/api/posts/commentPost/${postId}`, { comment: newComment }, config);
      // Update the post details with the new comments
      setPostDetails(prevDetails =>
        prevDetails.map(post =>
          post._id === postId ? { ...post, comments: response.data.comments } : post
        )
      );
      setRecommendedPosts(prevDetails =>
        prevDetails.map(post =>
          post._id === postId ? { ...post, comments: response.data.comments } : post
        )
      );
      setNewComment('');
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:9002/api/posts/deletePost/${postId}`, config);
      setPostDetails(prevDetails => prevDetails.filter(post => post._id !== postId));
      setRecommendedPosts(prevDetails => prevDetails.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  if (!Array.isArray(postDetails)) {
    return <p>Follow people to see posts</p>;
  }

  const renderPosts = (posts) => (
    posts.length === 0 ? (
      <p>No posts to show</p>
    ) : (
      <div className="flex flex-col justify-center items-center z-0">
        {posts.slice().reverse().map((post) => (
          <div key={post._id} className="bg-black text-white p-6 m-10 w-full max-w-2xl rounded-lg shadow-lg border-4 border-white mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar src={`http://localhost:9002/uploads/${post.profileimageUrl}`} alt={userDetails?.fullName} className="mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-bold">{post.username}</h3>
                  <h3 className="text-xl text-white w-full">{post.designation}</h3>
                </div>
              </div>
              {userDetails && userDetails.userId._id === post.userId._id && (
                <DeleteIcon 
                  className="cursor-pointer" 
                  onClick={() => handleDelete(post._id)} 
                />
              )}
            </div>
            <p className="text-left text-purple-500 font-bold">{post.tags}</p>
            {/* <p className="text-left text-purple-500 font-bold">Hello</p> */}
            <p className="mb-4 text-left">{post.postContent}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:9002/uploads/${post.imageUrl}`}
                alt="Post"
                className="mb-4 max-w-full h-auto rounded-lg"
              />
            )}
            <div className="flex justify-around mt-4">
              <div className="flex items-center">
                <FavoriteIcon
                  className={`mr-1 cursor-pointer ${post.isLiked ? 'text-red-500' : ''}`}
                  onClick={() => handleLike(post._id, post.isLiked)}
                />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center">
                <CommentIcon className="mr-1" />
                <span>{post.comments.length}</span>
              </div>
              <div className="flex items-center">
                <ShareIcon className="mr-1 cursor-pointer" onClick={() => handleShare(post._id)} />
                <span>{post.shares.length}</span>
              </div>
            </div>
            <CommentsSection post={post} />
            <div className="flex justify-between items-center mt-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="border-2 rounded px-4 py-2 mr-4 w-full bg-white text-black"
              />
              <button
                onClick={() => handleComment(post._id)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-center mt-4">Recommended Posts</h2>
      {renderPosts(recommendedPosts)}
      <h2 className="text-xl font-bold text-center mt-4">Posts</h2>
      {renderPosts(postDetails)}
    </div>
  );
};

export default LinkedInPost;
