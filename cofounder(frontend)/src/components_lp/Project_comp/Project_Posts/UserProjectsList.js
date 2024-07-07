import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const UserProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get("http://localhost:9002/api/projects/user-projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchUserProjects();
  }, []);

  return (
    <div className="">
      {projects.map((project) => {
        return (
          <Post
            key={project._id}
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
            fundingStatus={project.fundingStatus}
          />
        );
      })}
    </div>
  );
};

export default UserProjectsList;
