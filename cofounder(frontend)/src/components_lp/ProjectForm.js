// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const nestedOptions = {
//   "Technical Skills": [
//     "Software Development",
//     "Web Development",
//     "Data Science",
//     "Cybersecurity",
//   ],
//   "Business and Management Skills": [
//     "Entrepreneurship",
//     "Marketing",
//     "Sales",
//     "Finance",
//   ],
//   "Design and Creative Skills": [
//     "Graphic Design",
//     "Product Design",
//     "Content Creation",
//     "Animation and Motion Graphics",
//   ],
//   "Legal and Regulatory Skills": [
//     "Corporate Law",
//     "Regulatory Affairs",
//     "Ethics and Compliance",
//   ],
//   "Operational Skills": [
//     "Project Management",
//     "Supply Chain Management",
//     "Human Resources",
//     "Customer Service",
//   ],
// };

// const selectedOptions = {
//   Cofounder: [
//     "Technical Skills",
//     "Business and Management Skills",
//     "Design and Creative Skills",
//     "Legal and Regulatory Skills",
//     "Operational Skills",
//   ],
//   Advisor: [
//     "Technical Skills",
//     "Business and Management Skills",
//     "Design and Creative Skills",
//     "Legal and Regulatory Skills",
//     "Operational Skills",
//   ],
//   Founder: [
//     "Technical Skills",
//     "Business and Management Skills",
//     "Design and Creative Skills",
//     "Legal and Regulatory Skills",
//     "Operational Skills",
//   ],
// };

// const skillCategories = {
//   "Technical Skills": {
//     "Software Development": [
//       "Programming languages",
//       "Software engineering",
//       "App development",
//     ],
//     "Web Development": [
//       "Front-end development",
//       "Back-end development",
//       "Web design",
//       "User experience (UX)",
//     ],
//     "Data Science": [
//       "Data analysis",
//       "Machine learning",
//       "Artificial intelligence",
//       "Big data",
//     ],
//     Cybersecurity: [
//       "Information security",
//       "Ethical hacking",
//       "Network security",
//     ],
//   },
//   "Business and Management Skills": {
//     Entrepreneurship: [
//       "Startup experience",
//       "Business development",
//       "Strategic planning",
//     ],
//     Marketing: [
//       "Digital marketing",
//       "Social media management",
//       "SEO/SEM",
//       "Content creation",
//     ],
//     Sales: [
//       "Sales strategy",
//       "Lead generation",
//       "Customer relationship management (CRM)",
//     ],
//     Finance: ["Financial planning", "Accounting", "Investment management"],
//   },
//   "Design and Creative Skills": {
//     "Graphic Design": [
//       "Visual design",
//       "Branding",
//       "Adobe Creative Suite proficiency",
//     ],
//     "Product Design": [
//       "User interface (UI) design",
//       "Product development",
//       "Prototyping",
//     ],
//     "Content Creation": [
//       "Writing",
//       "Video production",
//       "Multimedia storytelling",
//     ],
//     "Animation and Motion Graphics": ["2D/3D animation", "Motion design"],
//   },
//   "Legal and Regulatory Skills": {
//     "Corporate Law": [
//       "Legal compliance",
//       "Intellectual property",
//       "Contract negotiation",
//     ],
//     "Regulatory Affairs": [
//       "Understanding of industry regulations",
//       "Standards",
//     ],
//     "Ethics and Compliance": [
//       "Corporate ethics",
//       "Compliance programs",
//       "Risk management",
//     ],
//   },
//   "Operational Skills": {
//     "Project Management": [
//       "Agile/Scrum methodologies",
//       "Project planning",
//       "Team coordination",
//     ],
//     "Supply Chain Management": [
//       "Logistics",
//       "Procurement",
//       "Inventory management",
//     ],
//     "Human Resources": [
//       "Recruitment",
//       "Talent management",
//       "Organizational development",
//     ],
//     "Customer Service": [
//       "Customer support",
//       "Satisfaction management",
//       "Service delivery",
//     ],
//   },
// };

// const desig = ["Advisor", "Cofounder", "Founding Member"];
// const acc = ["Public", "Private"];
// const commitments = ["Part-time", "Full-time"];

// const ProjectForm = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     concept: "",
//     roles: [],
//     problem: "",
//     solution: "",
//     fundingStatus: "",
//     startupType: "",
//     otherStarupType: "",
//     startupStage: "",
//     patent: "",
//     skillSet: {
//       category: "",
//       subcategory: "",
//       skills: [],
//     },
//     postImage: null,
//     pitchDeck: null,
//     commitments: {},
//   });

//   const [newRole, setNewRole] = useState("");
//   const [nestedTexts, setNestedTexts] = useState({});
//   const [selectedTexts, setSelectedTexts] = useState({});
//   const [activeRole, setActiveRole] = useState("");
//   const [newAcc, setNewAcc] = useState("");

//   const handleAccChange = (event) => {
//     setNewAcc(event.target.value);
//   };

//   const handleRoleChange = (e) => {
//     setNewRole(e.target.value);
//   };

//   const addRole = () => {
//     if (newRole && !formData.roles.includes(newRole)) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         roles: [...prevFormData.roles, newRole],
//       }));
//       setNestedTexts((prevNestedTexts) => ({
//         ...prevNestedTexts,
//         [newRole]: selectedOptions[newRole] || [],
//       }));
//       setNewRole("");
//     }
//   };

//   const handleDeleteRole = (role) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       roles: prevFormData.roles.filter((r) => r !== role),
//     }));
//     setNestedTexts((prevNestedTexts) => {
//       const updatedNestedTexts = { ...prevNestedTexts };
//       delete updatedNestedTexts[role];
//       return updatedNestedTexts;
//     });
//     setSelectedTexts((prevSelectedTexts) => {
//       const updatedSelectedTexts = { ...prevSelectedTexts };
//       delete updatedSelectedTexts[role];
//       return updatedSelectedTexts;
//     });
//     setActiveRole("");
//   };

//   const handleTextClick = (role, text) => {
//     setSelectedTexts((prevSelectedTexts) => ({
//       ...prevSelectedTexts,
//       [role]: text,
//     }));
//     setNestedTexts((prevNestedTexts) => ({
//       ...prevNestedTexts,
//       [role + text]: nestedOptions[text] || [],
//     }));
//     setActiveRole(role);
//   };

//   const handleNestedTextClick = (role, text) => {
//     setSelectedTexts((prevSelectedTexts) => ({
//       ...prevSelectedTexts,
//       [role + selectedTexts[role]]: text,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSkillChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       skillSet: { ...prev.skillSet, [name]: value },
//     }));
//   };

//   const handleAddSkill = (e) => {
//     const skill = e.target.value;
//     if (
//       skill &&
//       !formData.skillSet.skills.includes(skill) &&
//       formData.skillSet.subcategory
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         skillSet: {
//           ...prev.skillSet,
//           skills: [...prev.skillSet.skills, skill],
//         },
//       }));
//     }
//   };

//   const handleDeleteSkill = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skillSet: {
//         ...prev.skillSet,
//         skills: prev.skillSet.skills.filter((s) => s !== skill),
//       },
//     }));
//   };

//   const handleCommitmentChange = (role, e) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       commitments: { ...prev.commitments, [role]: value },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();

//       // Append all fields except files and nested objects directly
//       Object.keys(formData).forEach((key) => {
//         if (
//           key !== "postImage" &&
//           key !== "pitchDeck" &&
//           key !== "roles" &&
//           key !== "skillSet" &&
//           key !== "commitments"
//         ) {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Convert roles, skillSet, and commitments to JSON strings
//       if (formData.roles) {
//         formDataToSend.append("roles", JSON.stringify(formData.roles));
//       }

//       if (formData.skillSet) {
//         // Debug: Log skillSet before appending
//         console.log("SkillSet:", formData.skillSet);
//         formDataToSend.append("skillSet", JSON.stringify(formData.skillSet));
//       }

//       if (formData.commitments) {
//         formDataToSend.append("commitments", JSON.stringify(formData.commitments));
//       }

//       // Append files if they exist
//       if (formData.postImage) {
//         formDataToSend.append("postImage", formData.postImage);
//       }

//       if (formData.pitchDeck) {
//         formDataToSend.append("pitchDeck", formData.pitchDeck);
//       }

//       // Log the entire FormData for debugging
//       for (let pair of formDataToSend.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//       }
//       console.log(formDataToSend);
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:9002/projectform",
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Project Form stored successfully");
//       navigate("/projectpage");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       if (error.response) {
//         console.error("Error data:", error.response.data);
//         console.error("Error status:", error.response.status);
//         console.error("Error headers:", error.response.headers);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-black to-purple-950 flex flex-col space-y-12 justify-center items-center">
//       <div className=" w-2/3 rounded-lg p-12 pt-10 border-4 border-purple-800 bg-gray-800">
//         <div className="mt-5 text-white text-4xl font-bold mb-4 text-center">
//           Project Form
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="text-white grid grid-cols-2 gap-10"
//         >
// <div className="col-span-2 mb-4">
//   <label className="block mb-1 font-bold ">
//     Select your Account Type
//   </label>
//   <select
//     value={newAcc}
//     onChange={handleAccChange}
//     className="w-full text-black p-2 rounded"
//   >
//     <option value="">Select account type</option>
//     {acc.map((accountType, index) => (
//       <option key={index} value={accountType}>
//         {accountType}
//       </option>
//     ))}
//   </select>
// </div>

//           <div className="col-span-1">
//             <label className="block mb-1 font-bold ">
//               Concept of the Project
//             </label>
//             <textarea
//               name="concept"
//               value={formData.concept}
//               onChange={handleChange}
//               className="w-full h-24 p-2 text-black rounded"
//               placeholder="Describe your project concept"
//             ></textarea>
//           </div>

//           <div className="col-span-1">
//             <label className="block mb-1 font-bold ">Problem Statement</label>
//             <textarea
//               name="problem"
//               value={formData.problem}
//               onChange={handleChange}
//               className="w-full h-24 p-2 text-black rounded"
//               placeholder="State your problem statement"
//             ></textarea>
//           </div>

//           <div className="col-span-1">
//             <label className="block mb-1 font-bold ">Solution</label>
//             <textarea
//               name="solution"
//               value={formData.solution}
//               onChange={handleChange}
//               className="w-full h-24 p-2 rounded text-black"
//               placeholder="What can be the steps to solve it?"
//             ></textarea>
//           </div>

// <div className="mb-4">
//   <label
//     className="flex text-white text-sm font-bold mb-2"
//     htmlFor="startupType"
//   >
//     What is the funding state of your startup?
//   </label>
//   <div className="flex mb-2">
//     <select
//       id="fundingStatus"
//       name="fundingStatus"
//       value={formData.fundingStatus}
//       onChange={handleChange}
//       className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//     >
//       <option value="" disabled>
//         Select a type
//       </option>
//       <option value="Bootstrapped">Bootstrapped</option>
//       <option value="Funded">Funded</option>
//       <option value="Rather Not Say">Rather Not say</option>
//     </select>
//   </div>
// </div>
//           <div className="mb-4">
//             <label
//               className="flex text-white text-sm font-bold mb-2"
//               htmlFor="startupType"
//             >
//               What is the field of your startup?
//             </label>
//             <div className="flex flex-col">
//               <div className="flex mb-2">
//                 <select
//                   id="startupType"
//                   name="startupType"
//                   value={formData.startupType}
//                   onChange={handleChange}
//                   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="" disabled>
//                     Select a type
//                   </option>
//                   <option value="AI">AI</option>
//                   <option value="Fintech">Fintech</option>
//                   <option value="Marketing">Marketing</option>
//                   <option value="E-Commerce">E-Commerce</option>
//                   <option value="IT Services">IT Services</option>
//                   <option value="Consulting">Consulting</option>
//                   <option value="Design">Design</option>
//                   <option value="AR/VR">AR/VR</option>
//                   <option value="Others">Others</option>
//                 </select>
//               </div>
//               {formData.startupType === "Others" && (
//                 <input
//                   type="text"
//                   id="otherStartupType"
//                   name="otherStartupType"
//                   value={formData.otherStartupType}
//                   onChange={handleChange}
//                   placeholder="Please specify"
//                   className="px-4 py-2 bg-black border-2 border-purple-700 rounded-lg text-white mt-2"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               className="flex text-white text-sm font-bold mb-2"
//               htmlFor="startupStage"
//             >
//               What is the Stage of your startup?
//             </label>
//             <select
//               id="startupStage"
//               name="startupStage"
//               value={formData.startupStage}
//               onChange={handleChange}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="" disabled>
//                 Select a stage
//               </option>
//               <option value="Ideation">Ideation</option>
//               <option value="Concept and Development">
//                 Concept and Development
//               </option>
//               <option value="Seed Stage">Seed Stage</option>
//               <option value="Early Stage(Startup)">Early Stage(Startup)</option>
//               <option value="Growth Stage">Growth Stage</option>
//               <option value="Expansion Stage">Expansion Stage</option>
//               <option value="Maturity Stage">Maturity Stage</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label
//               className="flex text-white text-sm font-bold mb-2"
//               htmlFor="patent"
//             >
//               Do you own any patent in relation to startup?
//             </label>
//             <select
//               id="patent"
//               name="patent"
//               value={formData.patent}
//               onChange={handleChange}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="" disabled>
//                 Select an option
//               </option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>

//           <div className="col-span-2">
//             <label className="block mb-1">Add Roles</label>
//             <div className="flex space-x-4">
//               <select
//                 value={newRole}
//                 onChange={handleRoleChange}
//                 className="w-full text-black p-2 rounded"
//               >
//                 <option value="">Select role</option>
//                 {desig.map((role, index) => (
//                   <option key={index} value={role}>
//                     {role}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={addRole}
//                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Add Role
//               </button>
//             </div>
//           </div>

//           {formData.roles.map((role, index) => (
//             <div
//               key={index}
//               className="col-span-2 bg-gray-800 p-4 rounded-lg mb-2"
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">{role}</h3>
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteRole(role)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//               <div className="mt-2">
//                 <h4 className="text-md font-semibold mb-1">
//                   Select Skill Category
//                 </h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {(nestedTexts[role] || []).map((text, textIndex) => (
//                     <button
//                       key={textIndex}
//                       type="button"
//                       onClick={() => handleTextClick(role, text)}
//                       className={`p-2 rounded-lg ${
//                         selectedTexts[role] === text
//                           ? "bg-purple-700"
//                           : "bg-gray-600"
//                       }`}
//                     >
//                       {text}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {selectedTexts[role] && (
//                 <div className="mt-2">
//                   <h4 className="text-md font-semibold mb-1">
//                     Select Specific Skills
//                   </h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {(nestedTexts[role + selectedTexts[role]] || []).map(
//                       (nestedText, nestedTextIndex) => (
//                         <button
//                           key={nestedTextIndex}
//                           type="button"
//                           onClick={() =>
//                             handleNestedTextClick(role, nestedText)
//                           }
//                           className={`p-2 rounded-lg ${
//                             selectedTexts[role + selectedTexts[role]] ===
//                             nestedText
//                               ? "bg-purple-700"
//                               : "bg-gray-600"
//                           }`}
//                         >
//                           {nestedText}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}
//               {selectedTexts[role + selectedTexts[role]] && (
//                 <div className="mt-2">
//                   <h4 className="text-md font-semibold mb-1">
//                     Select Subcategories
//                   </h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {(
//                       skillCategories[selectedTexts[role]]?.[
//                         selectedTexts[role + selectedTexts[role]]
//                       ] || []
//                     ).map((skill, skillIndex) => (
//                       <label key={skillIndex} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           value={skill}
//                           onChange={(e) => {
//                             const { checked, value } = e.target;
//                             setFormData((prevFormData) => {
//                               const updatedSkills = checked
//                                 ? [...prevFormData.skillSet.skills, value]
//                                 : prevFormData.skillSet.skills.filter(
//                                     (s) => s !== value
//                                   );
//                               return {
//                                 ...prevFormData,
//                                 skillSet: {
//                                   ...prevFormData.skillSet,
//                                   skills: updatedSkills,
//                                 },
//                               };
//                             });
//                           }}
//                         />
//                         <span className="ml-2">{skill}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="mt-4">
//                 <label className="block mb-1">Commitment</label>
//                 <select
//                   value={formData.commitments[role] || ""}
//                   onChange={(e) => handleCommitmentChange(role, e)}
//                   className="w-full text-black p-2 rounded"
//                 >
//                   <option value="">Select commitment</option>
//                   {commitments.map((commitment, index) => (
//                     <option key={index} value={commitment}>
//                       {commitment}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           ))}

//           <div>
//             <label className="block mb-1">Upload Project Image</label>
//             <input
//               type="file"
//               name="postImage"
//               onChange={handleChange}
//               className="w-full text-white"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Upload Pitch Deck</label>
//             <input
//               type="file"
//               name="pitchDeck"
//               onChange={handleChange}
//               className="w-full text-white"
//             />
//           </div>

//           <div className="col-span-2">
//             <button
//               type="submit"
//               className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ThemeContext } from "../context/ThemeContext";

const nestedOptions = {
  "Technical Skills": [
    "Software Development",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "Rather not specify",
    "All of the above"
  ],
  "Business and Management Skills": [
    "Entrepreneurship",
    "Marketing",
    "Sales",
    "Finance",
    "Rather not specify",
    "All of the above"
  ],
  "Design and Creative Skills": [
    "Graphic Design",
    "Product Design",
    "Content Creation",
    "Animation and Motion Graphics",
    "Rather not specify",
    "All of the above"
  ],
  "Legal and Regulatory Skills": [
    "Corporate Law",
    "Regulatory Affairs",
    "Ethics and Compliance",
    "Rather not specify",
    "All of the above"
  ],
  "Operational Skills": [
    "Project Management",
    "Supply Chain Management",
    "Human Resources",
    "Customer Service",
    "Rather not specify",
    "All of the above"
  ],
};


const selectedOptions = {
  Cofounder: [
    "Technical Skills",
    "Business and Management Skills",
    "Design and Creative Skills",
    "Legal and Regulatory Skills",
    "Operational Skills",
  ],
  Advisor: [
    "Technical Skills",
    "Business and Management Skills",
    "Design and Creative Skills",
    "Legal and Regulatory Skills",
    "Operational Skills",
  ],
  "Founding Member": [
    "Technical Skills",
    "Business and Management Skills",
    "Design and Creative Skills",
    "Legal and Regulatory Skills",
    "Operational Skills",
  ],
};

const skillCategories = {
  "Technical Skills": {
    "Software Development": [
      "Programming languages",
      "Software engineering",
      "App development",
    ],
    "Web Development": [
      "Front-end development",
      "Back-end development",
      "Web design",
      "User experience (UX)",
    ],
    "Data Science": [
      "Data analysis",
      "Machine learning",
      "Artificial intelligence",
      "Big data",
    ],
    Cybersecurity: [
      "Information security",
      "Ethical hacking",
      "Network security",
    ],
  },
  "Business and Management Skills": {
    Entrepreneurship: [
      "Startup experience",
      "Business development",
      "Strategic planning",
    ],
    Marketing: [
      "Digital marketing",
      "Social media management",
      "SEO/SEM",
      "Content creation",
    ],
    Sales: [
      "Sales strategy",
      "Lead generation",
      "Customer relationship management (CRM)",
    ],
    Finance: ["Financial planning", "Accounting", "Investment management"],
  },
  "Design and Creative Skills": {
    "Graphic Design": [
      "Visual design",
      "Branding",
      "Adobe Creative Suite proficiency",
    ],
    "Product Design": [
      "User interface (UI) design",
      "Product development",
      "Prototyping",
    ],
    "Content Creation": [
      "Writing",
      "Video production",
      "Multimedia storytelling",
    ],
    "Animation and Motion Graphics": ["2D/3D animation", "Motion design"],
  },
  "Legal and Regulatory Skills": {
    "Corporate Law": [
      "Legal compliance",
      "Intellectual property",
      "Contract negotiation",
    ],
    "Regulatory Affairs": [
      "Understanding of industry regulations",
      "Standards",
    ],
    "Ethics and Compliance": [
      "Corporate ethics",
      "Compliance programs",
      "Risk management",
    ],
  },
  "Operational Skills": {
    "Project Management": [
      "Agile/Scrum methodologies",
      "Project planning",
      "Team coordination",
    ],
    "Supply Chain Management": [
      "Logistics",
      "Procurement",
      "Inventory management",
    ],
    "Human Resources": [
      "Recruitment",
      "Talent management",
      "Organizational development",
    ],
    "Customer Service": [
      "Customer support",
      "Satisfaction management",
      "Service delivery",
    ],
  },
};

const desig = ["Advisor", "Cofounder", "Founding Member"];
const acc = ["Public", "Private"];
const commitments = ["Part-time", "Full-time"];
const indust = [
  "AI",
  "Fintech",
  "Marketing",
  "Ecommerce",
  "IT Services",
  "Consulting",
  "Design",
  "AR/VR",
];

const ProjectForm = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    postPrivacy: "",
    concept: "",
    problem: "",
    solution: "",
    fundingStatus: "",
    // startupType: "",
    // otherStarupType: "",
    startupStage: "",
    patent: "",
    roles: [],
    industries: [],
    postImage: null,
    pitchDeck: null,
    location: "",
  });

  const [check, setChecking] = useState("");
  const [checksub, setCheckingSub] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [newRole, setNewRole] = useState("");
  const [nestedTexts, setNestedTexts] = useState({});
  const [selectedTexts, setSelectedTexts] = useState({});
  const [activeRole, setActiveRole] = useState("");
  const [newAcc, setNewAcc] = useState("");
  const [subNestedTexts, setSubNestedTexts] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCities = async (inputValue) => {
    if (!inputValue) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get("http://api.geonames.org/searchJSON", {
        params: {
          q: inputValue,
          maxRows: 10,
          username: "hephzibah", // Replace with your Geonames username
        },
      });
      console.log(response);
      const options = response.data.geonames.map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(options);
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
    setIsLoading(false);
  };

  const handleCityInputChange = (inputValue) => {
    fetchCities(inputValue);
  };

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption ? selectedOption.value : "" });
  };


  const handleAccChange = (event) => {
    setNewAcc(event.target.value);
  };

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  // Industry(StartUp type)
  const handleIndustryChange = (e) => {
    const value = e.target.value;
    setNewIndustry(value);
    setShowCustomInput(value === "Others");
  };

  const handleCustomIndustryChange = (e) => {
    setCustomIndustry(e.target.value);
  };

  const addIndustry = () => {
    const industryToAdd = showCustomInput ? customIndustry : newIndustry;

    if (industryToAdd && !formData.industries.includes(industryToAdd)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        industries: [...prevFormData.industries, industryToAdd],
      }));
      setNewIndustry("");
      setCustomIndustry("");
      setShowCustomInput(false);
    }
  };

  const handleDeleteIndustry = (industry) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      industries: prevFormData.industries.filter((i) => i !== industry),
    }));
  };

  const addRole = () => {
    if (newRole && !formData.roles.some((role) => role.name === newRole)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        roles: [
          ...prevFormData.roles,
          { name: newRole, skills: [], commitments: "" },
        ],
      }));
      setNestedTexts((prevNestedTexts) => ({
        ...prevNestedTexts,
        [newRole]: selectedOptions[newRole] || [],
      }));
      setNewRole("");
    }
  };

  const handleDeleteRole = (roleName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: prevFormData.roles.filter((role) => role.name !== roleName),
    }));
    setNestedTexts((prevNestedTexts) => {
      const updatedNestedTexts = { ...prevNestedTexts };
      delete updatedNestedTexts[roleName];
      return updatedNestedTexts;
    });
    setSelectedTexts((prevSelectedTexts) => {
      const updatedSelectedTexts = { ...prevSelectedTexts };
      Object.keys(updatedSelectedTexts).forEach((key) => {
        if (key.startsWith(roleName)) {
          delete updatedSelectedTexts[key];
        }
      });
      return updatedSelectedTexts;
    });
    setActiveRole("");
  };

  const handleTextClick = (roleName, text) => {
    setChecking(text);

    setSelectedTexts((prevSelectedTexts) => ({
      ...prevSelectedTexts,
      [roleName]: text,
    }));
    setNestedTexts((prevNestedTexts) => ({
      ...prevNestedTexts,
      [roleName + text]: nestedOptions[text] || [],
    }));
    setActiveRole(roleName);
  };

  const handleNestedTextClick = (roleName, text) => {
    setCheckingSub(text);
    if (text === "All of the above" || text === "Rather not specify") {
      if (check) {
        let newSkills = [];
        const existingSkills2 = nestedOptions[check];
        const updatedRoles = formData.roles.map((role) => {
          if (role.name === roleName) {
            const existingSkills = nestedOptions[check];
            existingSkills.forEach((category) => {
              newSkills.push(skillCategories[check][category]);
            });
            // Flatten the array if newSkills contains nested arrays
            newSkills = newSkills.flat();
            const concatenatedArray = [...newSkills, ...existingSkills2];

            const filteredSkills = concatenatedArray.filter(skill => skill !== undefined);

            console.log(filteredSkills);

            return { ...role, skills: filteredSkills };
          }
          return role;
        });
        setFormData({ ...formData, roles: updatedRoles });
      }
    }
    setSelectedTexts((prevSelectedTexts) => ({
      ...prevSelectedTexts,
      [roleName + selectedTexts[roleName]]: text,
    }));
  };
  const handleSubNestedSkillChange = (roleName, e) => {
    // handle change for sub-nested skills
    const updatedRoles = formData.roles.map((role) => {
      if (role.name === roleName) {
        const newSkills = e.target.checked
          ? [...role.skills, e.target.value]
          : role.skills.filter((skill) => skill !== e.target.value);
        return { ...role, skills: newSkills };
      }
      return role;
    });
    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillChange = (roleName, e) => {
    const { checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: prevFormData.roles.map((role) =>
        role.name === roleName
          ? {
              ...role,
              skills: checked
                ? [...role.skills, value]
                : role.skills.filter((skill) => skill !== value),
            }
          : role
      ),
    }));
  };

  const handleCommitmentChange = (roleName, e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: prevFormData.roles.map((role) =>
        role.name === roleName ? { ...role, commitments: value } : role
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all fields except files and roles directly
      Object.keys(formData).forEach((key) => {
        if (key !== "postImage" && key !== "pitchDeck" && key !== "roles") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Convert roles to JSON string
      if (formData.roles) {
        formDataToSend.append("roles", JSON.stringify(formData.roles));
      }

      // Append files if they exist
      if (formData.postImage) {
        formDataToSend.append("postImage", formData.postImage);
      }

      if (formData.pitchDeck) {
        formDataToSend.append("pitchDeck", formData.pitchDeck);
      }

      console.log(formDataToSend);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:9002/api/projects/projectform",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Project Form submitted successfully");
      navigate("/projectpage");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const renderSkills = (roleName) => {
    const skills =
      skillCategories[selectedTexts[roleName]]?.[
        selectedTexts[roleName + selectedTexts[roleName]]
      ] || [];

    return (
      <div className="skills-options mt-2 space-y-2">
        {skills.map((skill) => (
          <div key={skill} className="skill-option flex items-center">
            <input
              type="checkbox"
              id={`${roleName}-${skill}`}
              value={skill}
              checked={formData.roles
                .find((role) => role.name === roleName)
                ?.skills.includes(skill)}
              onChange={(e) => handleSubNestedSkillChange(roleName, e)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <label
              htmlFor={`${roleName}-${skill}`}
              className="ml-2 text-gray-700"
            >
              {skill}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}>
      <div
        className={`max-w-4xl mx-auto p-8 shadow-lg rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Create New Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="col-span-2 mb-4">
            <label
              className={`block mb-1 font-bold ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Select your Account Type
            </label>
            <select
              className={`border rounded px-3 py-2 mb-4 w-1/3 flex items-left text-left ${
                theme === "dark" ? "text-white bg-black" : "text-black bg-white"
              }`}
              name="postPrivacy"
              onChange={handleChange}
              value={formData.postPrivacy}
            >
              <option>Select</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="flex text-white text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <Select
              id="city"
              options={cityOptions}
              onInputChange={handleCityInputChange}
              onChange={handleCityChange}
              value={selectedCity}
              placeholder="Start typing a city..."
              isLoading={isLoading}
              className="text-gray-700"
            />
          </div>
          <div className="col-span-1">
            <label className="flex text-white text-sm font-bold mb-2" htmlFor="location">
              Selected City
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Selected city will appear here"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="concept"
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Concept:
            </label>
            <input
              type="text"
              id="concept"
              name="concept"
              value={formData.concept}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="problem"
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Problem:
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="solution"
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Solution:
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              className={`flex text-sm font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              htmlFor="startupType"
            >
              What is the funding state of your startup?
            </label>
            <div className="flex mb-2">
              <select
                id="fundingStatus"
                name="fundingStatus"
                value={formData.fundingStatus}
                onChange={handleChange}
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  theme === "dark"
                    ? "text-white bg-gray-700 border-gray-600"
                    : "text-gray-700 border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="Bootstrapped">Bootstrapped</option>
                <option value="Funded">Funded</option>
                <option value="Rather Not Say">Rather Not say</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className={`flex text-sm font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              htmlFor="startupStage"
            >
              What is the Stage of your startup?
            </label>
            <select
              id="startupStage"
              name="startupStage"
              value={formData.startupStage}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === "dark"
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-700 border-gray-300"
              }`}
              required
            >
              <option value="" disabled>
                Select a stage
              </option>
              <option value="Ideation">Ideation</option>
              <option value="Concept and Development">
                Concept and Development
              </option>
              <option value="Seed Stage">Seed Stage</option>
              <option value="Early Stage(Startup)">Early Stage(Startup)</option>
              <option value="Growth Stage">Growth Stage</option>
              <option value="Expansion Stage">Expansion Stage</option>
              <option value="Maturity Stage">Maturity Stage</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className={`flex text-sm font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              htmlFor="patent"
            >
              Do you have a patent?
            </label>
            <select
              id="patent"
              name="patent"
              value={formData.patent}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                theme === "dark"
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-700 border-gray-300"
              }`}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Roles:
            </label>
            <div className="role-input-container flex items-center space-x-2 mb-4">
              <select
                value={newRole}
                onChange={handleRoleChange}
                className={`mt-1 p-2 border rounded-md ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Role
                </option>
                {desig.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addRole}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Add Role
              </button>
            </div>
            <div className="selected-roles space-y-4">
              {formData.roles.map((role) => (
                <div
                  key={role.name}
                  className={`role-item border rounded-lg p-4 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{role.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteRole(role.name)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="nested-options space-x-2">
                    {nestedTexts[role.name]?.map((text) => (
                      <button
                        type="button"
                        key={text}
                        className={`nested-option px-4 py-2 rounded-md ${
                          selectedTexts[role.name] === text
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => handleTextClick(role.name, text)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                  {selectedTexts[role.name] && (
                    <div className="sub-nested-options mt-4 space-x-2">
                      {nestedTexts[role.name + selectedTexts[role.name]]?.map(
                        (subText) => (
                          <button
                            type="button"
                            key={subText}
                            className={`sub-nested-option px-4 py-2 rounded-md ${
                              selectedTexts[
                                role.name + selectedTexts[role.name]
                              ] === subText
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() =>
                              handleNestedTextClick(role.name, subText)
                            }
                          >
                            {subText}
                          </button>
                        )
                      )}
                    </div>
                  )}
                  {selectedTexts[role.name + selectedTexts[role.name]] &&
                    renderSkills(role.name)}
                  <select
                    value={role.commitments}
                    onChange={(e) => handleCommitmentChange(role.name, e)}
                    className={`mt-4 p-2 w-full border rounded-md ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select Commitment
                    </option>
                    {commitments.map((commitment) => (
                      <option key={commitment} value={commitment}>
                        {commitment}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 mb-4">
            <label
              className={`block mb-1 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Select your Start-Up type
            </label>
            <select
              value={newIndustry}
              onChange={handleIndustryChange}
              className={`w-full p-2 rounded-lg ${
                theme === "dark"
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-500"
              }`}
            >
              <option value="">Select a start-up type</option>
              {indust.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
              <option value="Others">Others</option>
            </select>

            {showCustomInput && (
              <input
                type="text"
                value={customIndustry}
                onChange={handleCustomIndustryChange}
                placeholder="Please specify"
                className={`w-full mt-2 p-2 rounded-lg ${
                  theme === "dark"
                    ? "text-white bg-gray-700 border-gray-600"
                    : "text-gray-500"
                }`}
              />
            )}

            <button
              type="button"
              onClick={addIndustry}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>

            {/* Display Industries Section */}
            {formData.industries.length > 0 && (
              <div className="mt-4">
                <label
                  className={`block mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Start-Ups
                </label>
                <div className="space-y-2">
                  {formData.industries.map((industry, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{industry}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteIndustry(industry)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="postImage"
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Post Image:
            </label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              onChange={handleChange}
              accept="image/*"
              className={`mt-1 p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pitchDeck"
              className={`block font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Pitch Deck:
            </label>
            <input
              type="file"
              id="pitchDeck"
              name="pitchDeck"
              onChange={handleChange}
              accept=".pdf,.ppt,.pptx"
              className={`mt-1 p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
