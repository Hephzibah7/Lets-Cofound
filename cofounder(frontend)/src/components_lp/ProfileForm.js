import React, { useState } from "react";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    experience: "",
    skills: "",
    education: "",
    achievements: "",
    profileImage: null,
    designation: "",
    company: "",
    backgroundImage: null,
    website: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      await axios.post("http://localhost:9002/profileform", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert(error.response?.data?.message || "Error storing data. Please try again later.");
    }
  };

  const renderIndicators = () => {
    const indicators = [];
    for (let i = 1; i <= 6; i++) {
      indicators.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full mx-1 ${
            i === currentPage ? "bg-white" : "bg-gray-700"
          }`}
        ></div>
      );
    }
    return indicators;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-950 flex flex-col space-y-12 justify-center items-center">
      <h1 className="text-white text-4xl font-bold animate-bounce">
        Unlock the World of Entrepreneurship!!!
      </h1>
      <div className="shadow-lg w-1/3 h-1/2 rounded-lg shadow-white p-12 pt-10 relative">
        <div className="absolute top-0 left-0 mt-2 ml-2">
          {currentPage !== 1 && (
            <button
              className="text-white focus:outline-none"
              onClick={handlePrevPage}
            >
              <KeyboardBackspaceIcon />
            </button>
          )}
        </div>
        <div className="text-white text-2xl font-bold mb-4 text-center">
          Profile Form
        </div>
        <form>
          {currentPage === 1 && (
            <>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
            </>
          )}
          {currentPage === 2 && (
            <>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                  placeholder="Tell us about yourself..."
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                  placeholder="Tell us about your experience..."
                  required
                ></textarea>
              </div>
            </>
          )}
          {currentPage === 3 && (
            <>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="skills"
                >
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your skills..."
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="education"
                >
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your education..."
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="achievements"
                >
                  Achievements
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                  placeholder="Tell us about your achievements..."
                  required
                ></textarea>
              </div>
            </>
          )}
          {currentPage === 4 && (
            <>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
                  placeholder="Your Designation"
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
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
                  placeholder="Your Company"
                />
              </div>
            </>
          )}
          {currentPage === 5 && (
            <>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="backgroundImage"
                >
                  Background Image (1500x400)
                </label>
                <input
                  type="file"
                  id="backgroundImage"
                  name="backgroundImage"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="website"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="https://example.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex text-white text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="City, Country"
                />
              </div>
            </>
          )}
          {currentPage !== 6 ? (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleNextPage}
                className="bg-white w-1/2 mt-5 hover:bg-purple-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline animate-bounce"
              >
                Submit
              </button>
            </div>
          )}
        </form>

        <div className="flex justify-center mt-4">{renderIndicators()}</div>
      </div>
    </div>
  );
};

export default ProfileForm;
