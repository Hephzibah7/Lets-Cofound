import React from 'react';

const EndingSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-[60vh] lg:h-[90vh] bg-black text-white font-alexandria p-5 md:p-0">
      <div className="flex flex-col md:ml-[200px] text-center md:text-left">
        <h1 className="text-4xl md:text-6xl w-full md:w-2/3 font-bold">
          Access the <span className="text-purple-500">LetsCoFound App</span> and Elevate Your <span className="text-purple-500">Net Worth</span> to New Heights.
        </h1>
        {/* Add your mobile mockup image here */}
        {/* Overlay chat bubbles or other UI elements */}
        <div className="flex flex-col md:flex-row mt-5">
          <a href="/appstore-link" className="flex items-center justify-center px-6 py-3 bg-black text-white border-radius-2 border-purple-500 border-solid border-2 rounded-full m-2">
            Download on the App Store
          </a>
          <a href="/googleplay-link" className="flex items-center justify-center px-6 py-3 bg-black text-white border-radius-2 border-purple-500 border-solid border-2 rounded-full m-2">
            Get it on Google Play
          </a>
        </div>
      </div>
      {/* <div className="m-0 p-0 w-full  md:w-2/3 mt-5 md:mt-0">
        <img src="https://tse3.mm.bing.net/th/id/OIG2.gtI9pKb.I.ZiT6yDvliu?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" className="mx-auto"/>
      </div> */}
    </div>
  );
};

export default EndingSection;
