import React, { useState } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const skillCategories = {
  "Technical Skills": {
    "Software Development": ["Programming languages", "Software engineering", "App development"],
    "Web Development": ["Front-end development", "Back-end development", "Web design", "User experience (UX)"],
    "Data Science": ["Data analysis", "Machine learning", "Artificial intelligence", "Big data"],
    "Cybersecurity": ["Information security", "Ethical hacking", "Network security"]
  },
  "Business and Management Skills": {
    "Entrepreneurship": ["Startup experience", "Business development", "Strategic planning"],
    "Marketing": ["Digital marketing", "Social media management", "SEO/SEM", "Content creation"],
    "Sales": ["Sales strategy", "Lead generation", "Customer relationship management (CRM)"],
    "Finance": ["Financial planning", "Accounting", "Investment management"]
  },
  "Design and Creative Skills": {
    "Graphic Design": ["Visual design", "Branding", "Adobe Creative Suite proficiency"],
    "Product Design": ["User interface (UI) design", "Product development", "Prototyping"],
    "Content Creation": ["Writing", "Video production", "Multimedia storytelling"],
    "Animation and Motion Graphics": ["2D/3D animation", "Motion design"]
  },
  "Legal and Regulatory Skills": {
    "Corporate Law": ["Legal compliance", "Intellectual property", "Contract negotiation"],
    "Regulatory Affairs": ["Understanding of industry regulations", "Standards"],
    "Ethics and Compliance": ["Corporate ethics", "Compliance programs", "Risk management"]
  },
  "Operational Skills": {
    "Project Management": ["Agile/Scrum methodologies", "Project planning", "Team coordination"],
    "Supply Chain Management": ["Logistics", "Procurement", "Inventory management"],
    "Human Resources": ["Recruitment", "Talent management", "Organizational development"],
    "Customer Service": ["Customer support", "Satisfaction management", "Service delivery"]
  }
};

const ProjectForm = () => {
  const Navigate= useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    concept: "",
    roles: [],
    problem: "",
    solution: "",
    startupType: "",
    startupStage: "",
    patent: "",
    employmentStatus: "",
    skillSet: {
      category: "",
      subcategory: "",
      skills: []
    },
    postImage: null,
    pitchDeck: null
  });

  const [newRole, setNewRole] = useState("");

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const addRole = () => {
    if (newRole && !formData.roles.includes(newRole)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        roles: [...prevFormData.roles, newRole]
      }));
      setNewRole("");
    }
  };

  const handleDeleteRole = (role) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: prevFormData.roles.filter((r) => r !== role)
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skillSet: { ...prev.skillSet, [name]: value }
    }));
  };

  const handleAddSkill = (e) => {
    const skill = e.target.value;
    if (skill && !formData.skillSet.skills.includes(skill) && formData.skillSet.subcategory) {
      setFormData((prev) => ({
        ...prev,
        skillSet: {
          ...prev.skillSet,
          skills: [...prev.skillSet.skills, skill]
        }
      }));
    }
  };

  const handleDeleteSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillSet: {
        ...prev.skillSet,
        skills: prev.skillSet.skills.filter((s) => s !== skill)
      }
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "skillSet") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key === "postImage" || key === "pitchDeck") {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    console.log(formData);
    try {
    
      const token = localStorage.getItem("token");
      const response=await axios.post("http://localhost:9002/projectform", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Form stored successfully");
      Navigate("/projectpage");
     
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderIndicators = () => {
    return (
      <div className="mx-auto">
      <div className="flex space-x-2 mx-auto ">
        {[...Array(5).keys()].map((index) => (
          <div key={index} className={`w-2 h-2 rounded-full ${index + 1 <= currentPage ? "bg-white" : "bg-gray-400"}`}></div>
        ))}
      </div>
      </div>
      
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-950 flex flex-col space-y-12 justify-center items-center">
      <div className="shadow-lg w-1/3 h-3/4 rounded-lg shadow-white p-12 pt-10 relative">
        <div className="absolute top-0 left-0 mt-2 ml-2">
          {currentPage !== 1 && (
            <button className="text-white focus:outline-none" onClick={handlePrevPage}>
              <KeyboardBackspace />
            </button>
          )}
        </div>
        <div className="text-white text-2xl font-bold mb-4 text-center">Project Form</div>
        <form onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="roles">
                  What are you looking for?
                </label>
                <div className="flex mb-2">
                  <select
                    id="roles"
                    name="roles"
                    value={newRole}
                    onChange={handleRoleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Select a role"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="Co-founder">Co-founder</option>
                    <option value="Founder">Founder</option>
                    <option value="Advisor">Advisor</option>
                  </select>
                  <button type="button" onClick={addRole} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded">
                    Add
                  </button>
                </div>
                <div>
                  {formData.roles.map((role, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <p className="text-gray-400">{role}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteRole(role)}
                        className="ml-2 bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="concept">
                  What's the concept of your project?
                </label>
                <textarea
                  type="text"
                  id="concept"
                  name="concept"
                  value={formData.concept}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Describe your project concept"
                  required
                />
              </div>
            </>
          )}
          {currentPage === 2 && (
            <>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="problem">
                  What problem are you solving?
                </label>
                <textarea
                  type="text"
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Describe the problem your project aims to solve"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="solution">
                  What's your solution to the problem?
                </label>
                <textarea
                  type="text"
                  id="solution"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Describe your solution"
                  required
                />
              </div>
            </>
          )}
          {currentPage === 3 && (
            <>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="startupType">
                  Type of startup?
                </label>
                <select
                  id="startupType"
                  name="startupType"
                  value={formData.startupType}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="Tech">Tech</option>
                  <option value="Non-Tech">Non-Tech</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="startupStage">
                  Stage of startup?
                </label>
                <select
                  id="startupStage"
                  name="startupStage"
                  value={formData.startupStage}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select a stage
                  </option>
                  <option value="Idea">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="Scaling">Scaling</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="patent">
                  Do you have a patent?
                </label>
                <select
                  id="patent"
                  name="patent"
                  value={formData.patent}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="employmentStatus">
                  What's your employment status?
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Employed">Employed</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </>
          )}
          {currentPage === 4 && (
            <>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="category">
                  Select a skill category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.skillSet.category}
                  onChange={handleSkillChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {Object.keys(skillCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {formData.skillSet.category && (
                <div className="mb-4">
                  <label className="flex text-white text-sm font-bold mb-2" htmlFor="subcategory">
                    Select a skill subcategory
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.skillSet.subcategory}
                    onChange={handleSkillChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="" disabled>
                      Select a subcategory
                    </option>
                    {Object.keys(skillCategories[formData.skillSet.category]).map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formData.skillSet.subcategory && (
                <div className="mb-4">
                  <label className="flex text-white text-sm font-bold mb-2" htmlFor="skills">
                    Select skills
                  </label>
                  <select
                    id="skills"
                    name="skills"
                    onChange={handleAddSkill}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled>
                      Select a skill
                    </option>
                    {skillCategories[formData.skillSet.category][formData.skillSet.subcategory].map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                {formData.skillSet.skills.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="text-gray-400">{skill}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill)}
                      className="ml-2 bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          {currentPage === 5 && (
            <>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="postImage">
                  Upload Post Image
                </label>
                <input
                  type="file"
                  id="postImage"
                  name="postImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex text-white text-sm font-bold mb-2" htmlFor="pitchDeck">
                  Upload Pitch Deck (PDF)
                </label>
                <input
                  type="file"
                  id="pitchDeck"
                  name="pitchDeck"
                  accept=".pdf"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevPage}
              className={`text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {currentPage < 5 ? (
              <button
                type="button"
                onClick={handleNextPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        <div className="absolute bottom-0 left-0 mb-2 ml-2">{renderIndicators()}</div>
      </div>
    </div>
  );
};

export default ProjectForm;
