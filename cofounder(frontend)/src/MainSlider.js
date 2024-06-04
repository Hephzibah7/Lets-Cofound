import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the arrow-left icon
import { useNavigate } from 'react-router-dom';
const MainSlider = () => {
  const Navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showIndicators, setShowIndicators] = useState(false);

  const handleNextSlide = () => {
    if (currentSlide === 1) {
      setShowIndicators(true); // Show indicators after submitting the main slide
    }
    if(currentSlide === 4)
      Navigate('/ProfileForm');
    setCurrentSlide(currentSlide + 1);

  };

  const handlePreviousSlide = () => {
    if (currentSlide === 2) {
      setShowIndicators(false); // Show indicators after submitting the main slide
    }
    setCurrentSlide(currentSlide - 1);
    
  }

  const renderIndicators = () => {
    const indicators = [];
    for (let i = 2; i <= 4; i++) {
      indicators.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full mx-1 ${currentSlide === i ? 'bg-purple-500' : 'bg-gray-300'}`}
        ></div>
      );
    }
    return indicators;
  };

  return (
    <div className="bg-gradient-to-r from-black to-purple-950 h-screen flex flex-col items-center justify-center">

      <div className="overflow-y-auto transparent border-white border-2 w-1/3 h-2/3 rounded-lg py-3 pl-2 shadow-lg shadow-white relative">
        <div className='sticky'>
          {showIndicators && (
            <div className='sticky'>
              <div className="flex justify-center items-center">
                {renderIndicators()}
              </div>
            </div>
          )}
        </div>
        {currentSlide === 1 && (
          <>
            <div className='p-7'>
              <h1 className='text-white text-5xl font-bold mt-10'>Unlock the potential of your dream team with these key attributes.</h1>
              <h2 className='text-white mt-10 text-2xl'>Embark on a successful entrepreneurial voyage with your perfect match.</h2>
              <button className="text-1xl text-purple-900 rounded-3xl font-bold mt-20 bg-white w-1/2 px-6 py-3" onClick={handleNextSlide}>
                Continue
              </button>
            </div>
          </>
        )}
        {currentSlide === 2 && (
          <>
            <div className=''>
              <div className="text-white cursor-pointer flex ml-5 " onClick={handlePreviousSlide}>
                {/* Use the imported icon */}
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#a923e7", fontSize: "2rem" }} />
              </div>
              <div className='pl-5'>
                <div className='pl-10 pr-10'>
                  <h1 className='text-white text-4xl font-bold mt-1 '>Your ideal team members?</h1>
                  <h3 className='text-purple-200  mt-2'>Select the Dream Team Members Who Share Your Vision and Equity!</h3>
                  <div className='text-white mt-10 border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-2xl'>Advisor</h3>
                    <p>Provides Guidance and expertise in specific area</p>
                  </div>
                  <div className='text-white mt-5 border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-2xl'>Co-founder</h3>
                    <p>Responsible for executing multiple functions</p>
                  </div>
                  <div className='text-white mt-5 border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-2xl'>Founding Member</h3>
                    <p>Responsible for executing a specific function</p>
                  </div>
                  <div className='text-white mt-5 border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-2xl'>Intern</h3>
                    <p>Helps you to carry all your functions</p>
                  </div>
                  <button className="text-1xl text-purple-900 rounded-3xl font-bold mt-5 bg-white w-1/2 px-6 py-3" onClick={handleNextSlide}>
                    Continue
                  </button>
                </div>

              </div>

            </div>
          </>
        )}
        {currentSlide === 3 && (
          <>
            <div>
              <div className="text-white cursor-pointer flex ml-5 " onClick={handlePreviousSlide}>
                {/* Use the imported icon */}
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#a923e7", fontSize: "2rem" }} />
              </div>
              <div>
                <h1 className='text-white text-4xl font-bold mt-3'>Desired time commitment for your ideal team?</h1>
                <p className='text-purple-200 p-6 text-sm '>Choose expected level of availability and dedication to achieve desired outcomes</p>
                <div className='pl-5 '>
                <div className=' text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Part-time or Full time</h3>
                    <p>Open to considering both options</p>
                  </div>
                  <div className='mt-4 text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Part-time</h3>
                    <p>20+ hours per week commitment</p>
                  </div>
                  <div className='mt-4 text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Full time</h3>
                    <p>40+ hours per week commitment</p>
                  </div>
                  <button className="text-1xl text-purple-900 rounded-3xl font-bold mt-5 bg-white w-1/2 px-6 py-3" onClick={handleNextSlide}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {currentSlide === 4 && (
          <>
            <div>
            <div className="text-white cursor-pointer flex ml-5 " onClick={handlePreviousSlide}>
                {/* Use the imported icon */}
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#a923e7", fontSize: "2rem" }} />
              </div>
              <div>
              <h1 className='text-white text-4xl font-bold mt-3'>Desired skills for your ideal team?</h1>
              <p className='text-purple-200 p-6 text-sm '>Choose the complementory skills you need in your dream team members</p>
              <div className='pl-5 '>
                <div className=' text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Product</h3>
                    <p>Manage product lifecycle from conceptualisation to launch </p>
                  </div>
                  <div className='mt-4 text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Finance</h3>
                    <p>Manage finance & profitability to drive sustainable growth</p>
                  </div>
                  <div className='mt-4 text-white border border-white p-6 mr-5  items-left cursor-pointer'>
                    <h3 className=' font-bold text-xl'>Engineering</h3>
                    <p>Bring ambitious product ideas to life through code</p>
                  </div>
                  <button className="text-xl text-purple-900 rounded-3xl font-bold mt-5 bg-white w-1/2 px-6 py-3" onClick={handleNextSlide}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}





      </div>
    </div>
  );
};

export default MainSlider;
