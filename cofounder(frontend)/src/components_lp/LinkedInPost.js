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

const LinkedInPost = () => {
  const [postDetails, setPostDetails] = useState([]);
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
        const userresponse = await axios.get('http://localhost:9002/getUserDetails', config);
        setUserDetails(userresponse.data);

        const postresponse = await axios.get('http://localhost:9002/getPostDetails', config);
        const posts = postresponse.data.posts || [];
        console.log(postresponse.data);
        // Initialize isLiked property
        const updatedPosts = posts.map(post => ({
          ...post,
          isLiked: post.likes.includes(userresponse.data.userId._id),
        }));
        
        setPostDetails(updatedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(postDetails);
  
  const handleLike = async (postId, isLiked) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(isLiked);
      if (isLiked) {
        // Unlike the post
        const response = await axios.delete(`http://localhost:9002/likePost/${postId}`, config);
        setPostDetails(prevDetails =>
          prevDetails.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes, isLiked: false } : post
          )
        );
      } else {
        // Like the post
        const response = await axios.post(`http://localhost:9002/likePost/${postId}`, {}, config);
        setPostDetails(prevDetails =>
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
      const response = await axios.post(`http://localhost:9002/sharePost/${postId}`, {}, config);
      // Update the post details with the new share count
      setPostDetails(prevDetails =>
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
      const response = await axios.post(`http://localhost:9002/commentPost/${postId}`, { comment: newComment }, config);
      // Update the post details with the new comments
      setPostDetails(prevDetails =>
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
      await axios.delete(`http://localhost:9002/deletePost/${postId}`, config);
      setPostDetails(prevDetails => prevDetails.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  if (!Array.isArray(postDetails)) {
    return <p>Follow people to see posts</p>;
  }

  return (
    <div>
      {postDetails.length === 0 ? (
        <p>Follow people to see posts</p>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {postDetails.slice().reverse().map((post) => (
            <div key={post._id} className="bg-black text-white p-6 m-10 w-1/2 mr-5 rounded-lg shadow-lg border-4 border-white mb-4">
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
              <p className="text-base mb-4 text-left">{post.postContent}</p>
              <div className="mb-4">
                {post.imageUrl && <img src={`http://localhost:9002/uploads/${post.imageUrl}`} alt="Post" className="w-full" />}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 cursor-pointer">
                  <FavoriteIcon
                    onClick={() => handleLike(post._id, post.isLiked)}
                    style={{ color: post.isLiked ? 'red' : 'inherit' }}
                  />
                  <span>{post.likes?.length}</span>
                  <CommentIcon />
                  <span>{post.comments?.length}</span>
                  <ShareIcon onClick={() => handleShare(post._id)} />
                  <span>{post.shares}</span>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 mb-2 text-black cursor-pointer"
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="bg-purple-800 text-white px-4 py-2 rounded-lg"
                >
                  Comment
                </button>
              </div>
              <CommentsSection post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInPost;
