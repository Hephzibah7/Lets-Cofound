import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DetailedProject() {
  const { projectId } = useParams();
  const [projectdetail, setProject] = useState(null);
  const [comments, setComments] = useState([]); // State for comments

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:9002/projectsingle/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:9002/comments/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchProjectDetails();
    fetchComments();
  }, [projectId]);

  if (!projectdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-black to-purple-950 h-[150vh] p-10 flex justify-center items-start">
      <div className="bg-white text-black w-[45vw] rounded-lg shadow-lg p-5 mr-10">
        <div className="flex items-center mb-4">
          <img
            src={projectdetail.profilePic || `http://localhost:9002/uploads/${projectdetail.profileimageUrl}`}
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{projectdetail.username}</h2>
            <h3 className="text-sm text-gray-600">{projectdetail.designation}</h3>
          </div>
        </div>
        <img
          src={`http://localhost:9002/uploads/${projectdetail.postImage}`}
          alt="Project"
          className="w-full rounded-lg mb-4"
        />
        <div className="px-2">
          <p className="font-bold mb-2">{projectdetail.concept}</p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">Problem Statement: </span>
            {projectdetail.problem}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">Solution: </span>
            {projectdetail.solution}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">StartUp-Type: </span>
            {projectdetail.startupType}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">StartUp-Stage: </span>
            {projectdetail.startupStage}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">Employment-Status: </span>
            {projectdetail.employmentStatus}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold text-purple-600">Required Skill-Set: </span>
          </p>
          {projectdetail.skillSet ? (
            <div className="text-sm ml-5">
              <p>Category: {projectdetail.skillSet.category}</p>
              <p>SubCategory: {projectdetail.skillSet.subcategory}</p>
              <p>Skills: {projectdetail.skillSet.skills.join(', ')}</p>
            </div>
          ) : (
            <p className="text-sm ml-5">No skills listed.</p>
          )}
          <div className="flex flex-row mt-3 items-center">
            <p className="font-bold text-lg mr-2">
              <span className="font-bold text-purple-600">Pitch Deck: </span>
            </p>
            <a href={`http://localhost:9002/uploads/${projectdetail.pitchDeck}`} className="text-purple-600 font-bold">Pitch Deck</a>
          </div>
        </div>
      </div>
      <div className="bg-white text-black w-[30vw] rounded-lg shadow-lg p-5">
        <h3 className="text-lg font-bold mb-4">Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.profilePic || `http://localhost:9002/uploads/${comment.profileimageUrl}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <h4 className="text-sm font-bold">{comment.username}</h4>
                </div>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
