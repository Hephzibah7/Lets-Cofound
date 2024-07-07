import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the arrow-left icon
import { useNavigate } from 'react-router-dom';
const StartupOptions = () => {
  const Navigate = useNavigate();
  const handleContinue = () => {
    // Add your logic for continuing to the next step
    Navigate('/MainSlider')
  };
  const handleBuild = () => {
    // Add your logic for continuing to the next step
    Navigate('/projectform')
  };
  const handleJoin = () => {
    // Add your logic for continuing to the next step
    Navigate('/projectpage')
  };
  const handleback = () => {
    // Add your logic for continuing to the next step
    Navigate('/Login');
  };

  return (
    <div className="bg-gradient-to-r from-black to-purple-950 bg-cover bg-center h-screen flex flex-col">
      <div className="text-white bg-black absolute left-0 mt-10 pl-10 text-3xl font-bold">LetsCoFound</div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-1/2 rounded-lg shadow-lg">
          <div className="text-white cursor-pointer absolute left-30 top-40" onClick={handleback}>
            {/* Use the imported icon */}
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#a923e7", fontSize: "2rem" }} />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">Are you looking to?</h1>
          <h2 className="text-3xl mb-6 text-white">Lead or collaborate to make your startup vision a reality</h2>
          <div className="flex justify-between mb-8 cursor-pointer">
            <div className="w-1/2 bg-opacity-50 bg-purple-300 rounded-lg border border-gray-300 p-4 mb-5" onClick={handleBuild}>
              <h3 className="text-2xl font-semibold text-white">Build a project</h3>
              <h5 className="text-white mt-10">As a founder, you are searching for exceptional talent willing to work in exchange for equity.</h5>
            </div>
            <div className="w-1/2 bg-opacity-50 bg-purple-300 rounded-lg border border-gray-300 p-4 ml-4 mb-5" onClick={handleJoin}>
              <h3 className="text-2xl font-semibold text-white">Join a project</h3>
              <h5 className="text-white mt-10">As a founder, you are searching for exceptional talent willing to work in exchange for equity.</h5>
              <h5></h5>
            </div>
          </div>
          <button className="px-6 py-3 bg-purple-500 text-black rounded-lg font-semibold" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupOptions;
