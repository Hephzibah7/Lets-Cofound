import React from 'react';

function Notifications() {
  return (
    <div className="flex flex-col lg:flex-row justify-end bg-black text-white h-[70vh] lg:h-[115vh] font-alexandria">
      {/* <div className="mt-[70px] flex flex-col w-full lg:w-1/2 lg:pl-4 md:pl-8 lg:pl-10 lg:ml-4 md:ml-8 lg:ml-10">
        <img className="mb-5 lg:mb-0 lg:m-4 md:m-8 lg:m-10 w-full lg:w-[40vw] h-auto lg:h-[90vh]" src="../Designer1.png"
         alt="Designer" />
      </div> */}
      <div className="mt-[70px] lg:mt-0 mb-4 md:mb-8 lg:mb-10 pb-4 md:pb-8 lg:pb-10 ml-4 md:ml-8 lg:ml-10 pl-4 md:pl-8 lg:pl-7 
      flex flex-col w-full lg:w-1/2 justify-center mr-4 md:mr-8 lg:mr-10 pr-4 md:pr-8 lg:pr-10">
        <p>
          <span className=" lg:mt-0 p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 border-radius-2 
          border-purple-500 border-solid border-2 rounded-full text-lg md:text-xl lg:text-2xl">Notification</span>
        </p>
        <p className="mt-2 md:mt-4 lg:mt-5 pt-1 md:pt-2 lg:pt-2 text-4xl md:text-6xl lg:text-7xl font-bold">
          Elevate Your <span className="text-purple-500">Career</span> with Your Next
          <span className="text-purple-500"> Major Move</span>, Right Now.
        </p> 
        <p className="mt-4 md:mt-8 lg:mt-10 text-lg md:text-xl lg:text-2xl">
          <span className="gif-container">Gain immediate access to invaluable global startup insights, while seizing premier 
            job opportunities and lucrative partnerships.</span><br/><br/>
        </p>
        <div className="ml-10 md:ml-20 lg:ml-[150px]">
          <button className="border-radius-2 border-purple-500 border-solid border-2 rounded-full hover:bg-gradient-to-t from-black to-purple-500 w-[150px] md:w-[175px] lg:w-[200px] py-3 md:py-4 lg:py-5 px-2 rounded-full get-started-button text-lg md:text-xl lg:text-2xl">
            Get Started <span>&rarr;</span>
          </button>
        </div>
      </div>   
    </div>
  );
}

export default Notifications;
