import React from 'react'
import './styles.css'

function MainSection() {
  return (
//     <div className="flex flex-row bg-black text-white h-[112vh] font-alexandria">
//         <div className="slideInRight ml-10 pl-10 flex flex-col w-1/2 justify-center  mr-10 pr-10">
//         <p><span className="p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 border-radius-2 border-purple-500 border-solid border-2 rounded-full text-2xl">Explore</span></p>
//           <p className="pt-10 text-7xl font-bold">Celebrate your <span className="text-purple-500">achievements</span>; they're the 
//           seeds of your <span className="text-purple-500">future accomplishments</span></p> 
//         <p className="mt-10 text-2xl "><span className="gif-container">Unlock remarkable financial incentives for each triumphant
//          recruitment or business recommendation.</span><br/><br/></p>
//         <div className="ml-[150px]">
//         <button className="border-radius-2 border-purple-500 border-solid 
//        border-2 rounded-full hover:bg-gradient-to-t from-black to-purple-500 w-[200px] py-5 px-2 rounded-full get-started-button 
//         text-xl">Get Started <span>&rarr;</span></button>
//         </div>
//       </div>
//       <div className="mt-10 pt-10 flex flex-col w-1/2 ml-10 pl-10 mr-10 pr-10">
// <img className="mt-10 pt-10" src="../Designer.png"/>
// </div>
//     </div>


<div className=" flex flex-col lg:flex-row bg-black text-white h-auto lg:h-[112vh] font-alexandria">
<div className=" mt-[70px] lg:mt-0 ml-4 md:ml-8 lg:ml-10 pl-4 md:pl-8 lg:pl-10 flex flex-col w-full lg:w-1/2 justify-center mr-4 md:mr-8 lg:mr-10 pr-4 md:pr-8 lg:pr-10">
  <p>
    <span className=" p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 border-radius-2
     border-purple-500 border-solid border-2 rounded-full text-lg md:text-xl lg:text-2xl">Explore</span>
  </p>
  <p className="pt-4 md:pt-8 lg:pt-10 text-4xl md:text-6xl lg:text-7xl font-bold">
    Celebrate your <span className="text-purple-500">achievements</span>; they're the seeds of your <span className="text-purple-500">future accomplishments</span>
  </p> 
  <p className="mt-4 md:mt-8 lg:mt-10 text-lg md:text-xl lg:text-2xl">
    <span className="gif-container">Unlock remarkable financial incentives for each triumphant recruitment or business recommendation.</span><br/><br/>
  </p>
  <div className="ml-10 md:ml-20 lg:ml-[150px]">
    <button className="border-radius-2 border-purple-500 border-solid border-2 rounded-full hover:bg-gradient-to-t from-black to-purple-500 w-[150px] md:w-[175px] lg:w-[200px] py-3 md:py-4 lg:py-5 px-2 rounded-full get-started-button text-lg md:text-xl lg:text-2xl">
      Get Started <span>&rarr;</span>
    </button>
  </div>
</div>
{/* <div className="lg:mt-4 md:mt-8 lg:mt-10 pt-4 md:pt-8 lg:pt-10 flex flex-col w-full lg:w-1/2 lg:ml-4 md:ml-8 lg:ml-10 pl-4 md:pl-8 lg:pl-10 mr-4 md:mr-8 lg:mr-10 pr-4 md:pr-8 lg:pr-10">
  <img className="mt-4 md:mt-8 lg:mt-10 pt-4 md:pt-8 lg:pt-10" src="../Designer.png" alt="Designer" />
</div> */}
</div>
  )
}

export default MainSection;
