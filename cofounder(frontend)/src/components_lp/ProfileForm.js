import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const indust = [
  "AI",
  "Fintech",
  "Marketing",
  "Ecommerce",
  "IT Services",
  "Consulting",
  "Design",
  "AR/VR",
  "Others",
];

const skillCategories = {
  "Technical Skills": {
    "Software Development": [
      "Proficiency in programming languages",
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
    "All of the above": [],
    "Rather Not Specify": [],
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
    "All of the above": [],
    "Rather Not Specify": [],
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
    "Animation and Motion Graphics": [
      "2D animation",
      "3D animation",
      "Motion design",
    ],
    "All of the above": [],
    "Rather Not Specify": [],
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
    "All of the above": [],
    "Rather Not Specify": [],
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
    "All of the above": [],
    "Rather Not Specify": [],
  },
};

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    experience: "",
    education: "",
    achievements: "",
    profileImage: null,
    designation: "",
    company: "",
    backgroundImage: null,
    website: "",
    location: "",
    industries: [],
    skillSets: [],

    specificSkills: [],
    employment: "",
    specificSkillsOpen: false,
  });

  const [newIndustry, setNewIndustry] = useState("");
  const [check, setCheck] = useState("");
  const [subcat, setSubCat] = useState("");

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


  const handleIndustryChange = (e) => {
    setNewIndustry(e.target.value);
  };

  const addIndustry = () => {
    if (newIndustry && !formData.industries.includes(newIndustry)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        industries: [...prevFormData.industries, newIndustry],
      }));
      setNewIndustry("");
    }
  };

  const handleDeleteIndustry = (industry) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      industries: prevFormData.industries.filter((i) => i !== industry),
    }));
  };

  const handleSkillCategoryChange = (e) => {
    setFormData({
      ...formData,
      skillCategory: e.target.value,
      skillSubcategory: "",
      specificSkills: [],
    });
    setCheck(e.target.value);
    console.log(e.target.value);
  };

  const handleSkillSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSubCat(subcategory);

    if (subcategory === "All of the above" || subcategory === "Rather Not Specify") {
      const allSkills = [];
      Object.values(skillCategories[check]).forEach((skills) => {
        allSkills.push(...skills);
      });

      setFormData({
        ...formData,
        skillSubcategory: subcategory,
        specificSkills: allSkills,
      });
    } else {
      setFormData({
        ...formData,
        skillSubcategory: subcategory,
        specificSkills: [],
      });
    }
  };

  const handleSpecificSkillChange = (e) => {
    const selectedSkills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, specificSkills: selectedSkills });
  };

  const addSkillSet = () => {
    if (
      formData.skillCategory &&
      formData.skillSubcategory &&
      formData.specificSkills.length > 0
    ) {
      const newSkillSet = {
        category: formData.skillCategory,
        subcategory: formData.skillSubcategory,
        skills: formData.specificSkills,
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        skillSets: [...prevFormData.skillSets, newSkillSet],
        skillCategory: "",
        skillSubcategory: "",
        specificSkills: [],
        specificSkillsOpen: false,
      }));
    }
  };

  const handleDeleteSkillSet = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skillSets: prevFormData.skillSets.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteSpecificSkill = (skillSetIndex, skillIndex) => {
    const updatedSkillSets = [...formData.skillSets];
    updatedSkillSets[skillSetIndex].skills.splice(skillIndex, 1);
    if (updatedSkillSets[skillSetIndex].skills.length === 0) {
      updatedSkillSets.splice(skillSetIndex, 1);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      skillSets: updatedSkillSets,
    }));
  };

  // username availability
  const [isAvailable, setIsAvailable] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const checkUsernameAvailability = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:9002/api/profiles/check-username?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.isAvailable);
      setIsAvailable(response.data.isAvailable);
    } catch (error) {
      console.error("Error checking username availability", error);
    }
  };
  useEffect(() => {
    if (formData.username) {
      setIsChecking(true);
      const delayDebounceFn = setTimeout(() => {
        checkUsernameAvailability(formData.username);
        setIsChecking(false);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsAvailable(null);
    }
  }, [formData.username]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAvailable) { 
      try {
        const token = localStorage.getItem("token");
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              if (typeof item === "object") {
                Object.entries(item).forEach(([subKey, subValue]) => {
                  formDataToSend.append(
                    `${key}[${index}][${subKey}]`,
                    subValue
                  );
                });
              } else {
                formDataToSend.append(`${key}[${index}]`, item);
              }
            });
          } else {
            formDataToSend.append(key, value);
          }
        });
        await axios.post(
          "http://localhost:9002/api/profiles/profileform",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Profile submitted successfully");
        navigate("/profiledash");
      } catch (error) {
        console.error("Error submitting profile:", error);
        alert(
          error.response?.data?.message ||
            "Error storing data. Please try again later."
        );
      }
    } else {
      alert("Username is already taken, please choose another one.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col space-y-12 justify-center items-center p-5 lg:p-10 overflow-x-hidden">
      <h1 className="text-white text-4xl font-bold text-center mb-10">
        Unlock the World of Entrepreneurship!!!
      </h1>
      <div className="w-full max-w-4xl border-4 border-lightPurple rounded-lg p-6 lg:p-12 bg-gray-800">
        <div className="text-white text-2xl font-bold mb-6 text-center">
          Profile Form
        </div>
        <div className="text-white text-center mb-4">
          <Link to="/home">
            Already have a profile?
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="johndoe123"
              required
            />
            {isChecking && (
              <span className="text-sm text-gray-500">
                Checking availability...
              </span>
            )}
            {isAvailable === null ? null : isAvailable ? (
              <span className="text-sm text-green-500">
                Username is available
              </span>
            ) : (
              <span className="text-sm text-red-500">Username is taken</span>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tell us about yourself"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Describe your professional experience"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="education"
            >
              Education
            </label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your educational background"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="achievements"
            >
              Achievements
            </label>
            <textarea
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="List your achievements"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="profileImage"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your current designation"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your current company"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="backgroundImage"
            >
              Background Image
            </label>
            <input
              type="file"
              id="backgroundImage"
              name="backgroundImage"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*"
              required
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your website URL"
              required
            />
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
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="employment"
            >
              Employment Status
            </label>
            <select
              id="employment"
              name="employment"
              value={formData.employment}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Employment Status</option>
              <option value="Student">Student</option>
              <option value="Self-employed">Working Professional</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="industries"
            >
              Industries
            </label>
            <div className="flex">
              <select
                id="industries"
                name="industries"
                value={newIndustry}
                onChange={handleIndustryChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              >
                <option value="">Select Industry</option>
                {indust.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addIndustry}
                className="bg-purple-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {formData.industries.map((industry) => (
                <div
                  key={industry}
                  className="bg-purple-600 text-white px-4 py-2 rounded mr-2 mt-2"
                >
                  {industry}
                  <button
                    type="button"
                    onClick={() => handleDeleteIndustry(industry)}
                    className="ml-2"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
              <select
                value={formData.skillCategory}
                onChange={handleSkillCategoryChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Category</option>
                {Object.keys(skillCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={formData.skillSubcategory}
                onChange={handleSkillSubcategoryChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!formData.skillCategory}
              >
                <option value="">Select Subcategory</option>
                {formData.skillCategory &&
                  Object.keys(skillCategories[formData.skillCategory]).map(
                    (subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    )
                  )}
              </select>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      specificSkillsOpen: !prevFormData.specificSkillsOpen,
                    }))
                  }
                  className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  disabled={!formData.skillSubcategory}
                >
                  {formData.specificSkills.length > 0
                    ? formData.specificSkills.join(", ")
                    : "Select Specific Skill"}
                </button>
                {formData.specificSkillsOpen && (
                  <div className="absolute mt-2 w-full border rounded bg-white z-10 max-h-60 overflow-y-auto">
                    {formData.skillCategory &&
                      formData.skillSubcategory &&
                      skillCategories[formData.skillCategory][
                        formData.skillSubcategory
                      ].map((skill) => (
                        <div key={skill} className="px-4 py-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              value={skill}
                              checked={formData.specificSkills.includes(skill)}
                              onChange={(e) => {
                                const { checked, value } = e.target;
                                setFormData((prevFormData) => {
                                  const updatedSkills = checked
                                    ? [...prevFormData.specificSkills, value]
                                    : prevFormData.specificSkills.filter(
                                        (s) => s !== value
                                      );
                                  return {
                                    ...prevFormData,
                                    specificSkills: updatedSkills,
                                  };
                                });
                              }}
                            />
                            <span className="ml-2">{skill}</span>
                          </label>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={addSkillSet}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={
                  !formData.skillCategory ||
                  !formData.skillSubcategory ||
                  formData.specificSkills.length === 0
                }
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {formData.skillSets.map((skillSet, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>
                        {skillSet.category} - {skillSet.subcategory}
                      </strong>
                      <ul className="ml-4 mt-1">
                        {skillSet.skills.map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className="flex justify-between items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteSpecificSkill(index, skillIndex)
                              }
                              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkillSet(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete Set
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2 text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={isAvailable === false || isChecking}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
