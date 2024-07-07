


import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Discussion from "./Discussion";
import { ThemeContext } from "../context/ThemeContext";

export default function DetailedProject() {
  const { projectId } = useParams();
  const [projectdetail, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9002/api/projects/projectsingle/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9002/comments/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchProjectDetails();
    fetchComments();
  }, [projectId]);

  if (!projectdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen p-4 sm:p-10 flex justify-center items-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className={`relative p-6 border-4 rounded-2xl shadow-lg w-full lg:w-3/5 ${theme === 'dark' ? 'bg-black text-white border-purple-600' : 'bg-lightGray border-lightPurple'}`}>
          <div className="absolute inset-0 rounded-2xl border border-gray-600 opacity-20"></div>
          <div className="flex items-center mb-4 relative z-10">
            <img
              src={
                projectdetail.profilePic ||
                `http://localhost:9002/uploads/${projectdetail.profileimageUrl}`
              }
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-purple-600"
            />
            <div className="ml-4">
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{projectdetail.username}</h2>
              <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{projectdetail.designation}</h3>
            </div>
          </div>
          <div className="relative z-10 mb-4">
            <img
              src={`http://localhost:9002/uploads/${projectdetail.postImage}`}
              alt="Project"
              className="w-full object-contain rounded-lg shadow-lg"
            />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="border-2 border-blue-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-blue-500">Concept: </span>
                {projectdetail.concept}
              </p>
            </div>
            <div className="border-2 border-red-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-red-500">Problem Statement: </span>
                {projectdetail.problem}
              </p>
            </div>
            <div className="border-2 border-green-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-green-500">Solution: </span>
                {projectdetail.solution}
              </p>
            </div>
            <div className="border-2 border-yellow-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-yellow-500">Funding Status: </span>
                {projectdetail.fundingStatus}
              </p>
            </div>
            <div className="border-2 border-purple-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-purple-500">StartUp-Stage: </span>
                {projectdetail.startupStage}
              </p>
            </div>
            <div className="border-2 border-pink-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-pink-500">Patent: </span>
                {projectdetail.patent}
              </p>
            </div>
            <div className="border-2 border-indigo-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-indigo-500">Industries: </span>
                <div className="flex flex-wrap mt-2">
                  {projectdetail.industries.map((industry, index) => (
                    <span key={index} className="bg-indigo-600 text-white px-3 py-1 rounded-full mr-2 mb-2">
                      {industry}
                    </span>
                  ))}
                </div>
              </p>
            </div>
            <div className="border-2 border-teal-500 rounded-lg p-4">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                <span className="font-bold text-teal-500">Roles Required: </span>
                {projectdetail.roles.length > 0 ? (
                  projectdetail.roles.map((role, index) => (
                    <div key={index} className="ml-5 mb-2 bg-gray-700 text-white p-3 rounded-lg">
                      <p><span className="font-bold text-teal-500">Role: </span>{role.name}</p>
                      <p><span className="font-bold text-teal-500">Skills: </span>{role.skills.join(", ")}</p>
                      <p><span className="font-bold text-teal-500">Commitments: </span>{role.commitments}</p>
                    </div>
                  ))
                ) : (
                  <p className="ml-5">No roles listed.</p>
                )}
              </p>
            </div>
            <div className="flex flex-row mt-3 items-center">
              <p className={`font-bold text-lg mr-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <span className="font-bold text-purple-600">Pitch Deck: </span>
              </p>
              <a
                href={`http://localhost:9002/uploads/${projectdetail.pitchDeck}`}
                className="text-purple-600 font-bold"
              >
                {projectdetail.pitchDeck}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 lg:ml-10 mt-10 lg:mt-0">
          <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} sticky top-0`}>
            <Discussion projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
