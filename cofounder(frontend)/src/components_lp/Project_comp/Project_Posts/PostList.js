import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9002/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token for authentication
          },
        });

        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="">
      {projects.map((project) => {
        return (
          <Post
            projectId={project._id}
            projectOwner={project.userId._id}
            image={project.postImage}
            date={new Date(project.createdAt).toLocaleDateString()}
            category={project.startupType}
            title={project.concept}
            description={project.problem}
            authorImage={project.profileimageUrl}
            authorName={project.username}
            authorRole={project.designation}
          />
        );
      })}
    </div>
  );
};

export default PostList;
