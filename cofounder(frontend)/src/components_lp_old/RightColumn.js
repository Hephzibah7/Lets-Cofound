import React from "react";
// import { ArrowDownward } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const RightColumn = () => {
  return (
    <div className="w-3/3 h-screen bg-black text-white">
      {/* Entrepreneurial News */}
      <div className="mb-8 w-4/5 mt-4 rounded-lg bg-purple-800 transform hover:scale-105 transition-transform duration-300 group-hover:duration-200 p-4 mx-auto">
        <h2 className="text-lg mb-2 text-black bg-white p-1 rounded-full font-bold text-center">
          Entrepreneurial News
        </h2>
        <div
          id="feed-news-module"
          className="news-module--with-game mx-auto"
          data-view-name="news-module"
        >
          <h3 className="news-module__subheader text-body-medium-bold t-19 text-sm  font-bold t-black--light mb-2 flex space-x-8">
            <div className="mx-auto">Top stories</div>
          </h3>
          <div className="stories mb-4 text-sm">
            <h3 className="font-bold">Ola Cabs' CEO Quits</h3>
            <div className="footer-line flex">
              <div className="text-xs text-slate-300">Top Readers &gt;</div>
              <div className="text-xs text-slate-300 ml-2">18,821 readers</div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div className="text-xs text-slate-300">1d ago &gt;</div>
              <div className="text-xs text-slate-300 ml-2">1,621 readers</div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div className="text-xs text-slate-300">1d ago &gt;</div>
              <div className="text-xs text-slate-300 ml-2">1,621 readers</div>
            </div>
          </div>
          <div className="stories mb-2 text-sm">
            <h3 className="font-bold">What is driving content marketing?</h3>
            <div className="footer-line flex">
              <div className="text-xs text-slate-300">1d ago &gt;</div>
              <div className="text-xs text-slate-300 ml-2">1,621 readers</div>
            </div>
          </div>

          <ul
            className="mt-1 list-style-none"
            aria-labelledby="news-module__title-top-stories"
          >
            {/* Insert provided code block here */}
            {/* Note: Please make sure to adjust the class names and styles as per your requirement */}
          </ul>
          <button
            aria-label="Show more"
            aria-expanded="false"
            className="artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary news-module__toggle-storylines--with-game"
          >
            <div className="hover:bg-white hover:text-black p-1 mt-2 rounded-md animate-bounce flex justify-center items-center">
              {/* <KeyboardArrowDownIcon /> */}
              <button class=" bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 border-b-2 border-white hover:border-gray-500 rounded">
                <span className="artdeco-button__text">Show more</span>
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </button>
        </div>
      </div>





      

      {/* Middle Part: Suggested for You */}
      <div className="mb-8 mt-6 w-4/5 bg-purple-800 p-1 pl-3 pr-3 rounded-lg mx-auto transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-sm bg-white rounded-full p-1 mt-2 text-black font-semibold mb-4 text-center">
          Suggested for You
        </h2>
        {/* Contact list */}
        <div className="flex flex-col space-y-2 items-center text-sm mb-4">
          {/* Sample contact */}
          <div className="flex items-center">
            <img
              src="/images/profilepic.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">Software Engineer</p>
            </div>
            <button className="bg-white text-black py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
          <div className="flex items-center">
            <img
              src="/images/profilepic.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">Software Engineer</p>
            </div>
            <button className="bg-white text-black py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
          <div className="flex items-center">
            <img
              src="/images/profilepic.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">Software Engineer</p>
            </div>
            <button className="bg-white text-black py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
          {/* Add more contacts here */}
        </div>
      </div>

      {/* Last Part: Categories */}
      <div className="w-4/5 bg-purple-800 mx-auto mb-6 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
        <h2 className="text-sm bg-white rounded-full p-1 mt-2 text-black font-semibold mb-4 text-center">Categories</h2>
        {/* Category list */}
        <div className="flex flex-col space-y-4">
          {/* Sample category */}
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
          {/* Add more categories here */}
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
