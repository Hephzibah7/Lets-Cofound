

import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9002/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token for authentication
          },
        });
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="">
      {posts.map((post) => (
        <Post
          key={post._id}
          image={post.postImage}
          date={new Date(post.createdAt).toLocaleDateString()}
          category={post.startupType}
          title={post.concept}
          description={post.problem}
          authorImage={post.profileimageUrl}
          authorName={post.username}
          authorRole={post.designation}
        />
      ))}
    </div>
  );
};

export default PostList;
