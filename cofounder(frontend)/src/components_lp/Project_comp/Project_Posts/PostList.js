// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Post from "./Post";

// const PostList = () => {
//   const [projects, setProjects] = useState([]);
//   const [recommendedProjects, setRecommendedProjects] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:9002/api/projects/projects",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token for authentication
//             },
//           }
//         );
//         console.log(response.data);
//         setProjects(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     const fetchRecommendedProjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get(
//           "http://localhost:9002/api/recommend/project",
//           config
//         ); // URL for recommended projects
//         console.log(response.data.projects);
//         setRecommendedProjects(response.data.projects);
//       } catch (error) {
//         console.error("Error fetching recommended projects:", error);
//       }
//     };

//     fetchPosts();
//     fetchRecommendedProjects();
//   }, []);

//   return (
//     <div className="">
//       <h2 className="text-2xl font-semibold mt-8 mb-4">Recommended Projects</h2>
//       {recommendedProjects.map((project) => (
//         <Post
//           projectId={project._id}
//           projectOwner={project.userId._id}
//           image={project.postImage}
//           date={new Date(project.createdAt).toLocaleDateString()}
//           category={project.startupType}
//           title={project.concept}
//           description={project.problem}
//           authorImage={project.profileimageUrl}
//           authorName={project.username}
//           authorRole={project.designation}
//           industries={project.industries}
//         />
//       ))}

//       <h2 className="text-2xl font-semibold mt-8 mb-4">Projects</h2>
//       {projects.map((project) => {
//         return (
//           <Post
//             projectId={project._id}
//             projectOwner={project.userId._id}
//             image={project.postImage}
//             date={new Date(project.createdAt).toLocaleDateString()}
//             category={project.startupType}
//             title={project.concept}
//             description={project.problem}
//             authorImage={project.profileimageUrl}
//             authorName={project.username}
//             authorRole={project.designation}
//             industries={project.industries}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default PostList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9002/api/projects/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token for authentication
          },
        });
        console.log(response.data);
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
            fundingStatus={project.fundingStatus}
          />
        );
      })}
    </div>
  );
};

export default PostList;
