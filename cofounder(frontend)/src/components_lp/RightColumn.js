import React, { useContext, useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RightColumn = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const navigate = useNavigate();

  const handleClick = (username) => {
    navigate(`/user/${username}`);
  };

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:9002/api/recommend/users",
          config
        );
        console.log(response.data);
        setRecommendedUsers(response.data);
      } catch (error) {
        console.error("Error fetching recommended users:", error);
      }
    };

    fetchRecommendedUsers();
  }, []);

  return (
    <div className={`hidden lg:block w-3/3 h-screen `}>
      {/* Entrepreneurial News */}
      <div
        className={`mb-8 w-4/5 mt-4 rounded-lg ${
          theme === "dark"
            ? "bg-darkPurple text-white"
            : "bg-lightGray text-black border-4 border-lightPurple"
        } transform hover:scale-105 transition-transform duration-300 group-hover:duration-200 p-4 mx-auto`}
      >
        <h2
          className={`text-lg mb-2 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } p-1 rounded-full font-bold text-center`}
        >
          Entrepreneurial News
        </h2>
        <div
          id="feed-news-module"
          className="news-module--with-game mx-auto"
          data-view-name="news-module"
        >
          <h3 className="news-module__subheader text-body-medium-bold t-19 text-sm font-bold mb-2 flex space-x-8">
            <div className="mx-auto">Top stories</div>
          </h3>
          <div className="stories mb-4 text-sm">
            <h3 className="font-bold">Ola Cabs' CEO Quits</h3>
            <div className="footer-line flex">
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Top Readers &gt;
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } ml-2`}
              >
                18,821 readers
              </div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                1d ago &gt;
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } ml-2`}
              >
                1,621 readers
              </div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                1d ago &gt;
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } ml-2`}
              >
                1,621 readers
              </div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                1d ago &gt;
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } ml-2`}
              >
                1,621 readers
              </div>
            </div>
          </div>
          <ul
            className="mt-1 list-style-none"
            aria-labelledby="news-module__title-top-stories"
          ></ul>
          <button
            aria-label="Show more"
            aria-expanded="false"
            className="artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary news-module__toggle-storylines--with-game"
          >
            <div
              className={`hover:bg-white hover:text-black p-1 mt-2 rounded-md animate-bounce flex justify-center items-center ${
                theme === "dark" ? "bg-gray-800" : "bg-black"
              }`}
            >
              <button
                className={`hover:bg-gray-800 text-white font-bold py-2 px-4 border-b-2 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:border-gray-500"
                    : "bg-black hover:border-gray-500"
                } rounded`}
              >
                <span className="artdeco-button__text">Show more</span>
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </button>
        </div>
      </div>

      {/* Middle Part: Suggested for You */}
      <div
        className={`mb-8 mt-6 w-4/5 ${
          theme === "dark"
            ? "bg-darkPurple text-white"
            : "bg-lightGray text-black border-4 border-lightPurple"
        } p-1 pl-3 pr-3 rounded-lg mx-auto transform hover:scale-105 transition-transform duration-300`}
      >
        <h2
          className={`text-sm ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } rounded-full p-1 mt-2 font-semibold mb-4 text-center`}
        >
          Suggested for You
        </h2>

        <div className="flex flex-col space-y-2 items-left text-sm mb-4 text-left">
          {recommendedUsers.map((recommendedUser, index) => (
            <div key={index} className="flex text-left p-3 cursor-pointer" onClick={() => handleClick(recommendedUser.username)}>
              <img
                src={`http://localhost:9002/uploads/${recommendedUser.profileImage}`}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-1">
                <p className="font-semibold p-1">{recommendedUser.fullName}</p>
                <p className="text-sm text-gray-400">
                  {recommendedUser.designation}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Last Part: Categories */}
      <div
        className={`w-4/5 ${
          theme === "dark"
            ? "bg-darkPurple text-white"
            : "bg-lightGray text-black"
        } mx-auto mb-6 p-2 rounded-lg hover:scale-105 transition-transform duration-300`}
      >
        <h2
          className={`text-sm ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } rounded-full p-1 mt-2 font-semibold mb-4 text-center`}
        >
          Categories
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Pharmaceuticals</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/edtech.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">EdTech</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Fintech</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Ecommerce</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
