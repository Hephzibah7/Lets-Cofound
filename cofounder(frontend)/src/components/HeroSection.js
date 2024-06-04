import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';
function HeroSection() {
  const Navigate = useNavigate();
  const handleChange = () =>{
    Navigate("/SignUp");
  }
  return (
    <div className="flex flex-col  justify-center items-center bg-black  text-white h-[75vh] font-alexandria ">
      <div className="mb-0 mt-[100px]  pb-10 mb-[-90px]">
       <p className=" font-bold text-7xl text-center">BUILDING <span className="text-purple-500">SUCCESS</span></p>
       </div>
       <div className="m-0 p-0 flex flex-row w-full ml-[680px]">
       <p className=" mt-10 ml-10 pt-3 font-bold text-9xl text-center text-purple-500 ">ON A </p>
       <div className=" mt-12 pt-4 ml-5 flex flex-col">
       <p className="text-6xl font-bold text-center "> FOUNDATION</p>
       <p className=" text-6xl font-bold text-center ">OF EQUITY</p>
       </div>
       </div>
       <p className="mt-10 pt-5 text-2xl text-center"><span className="gif-container">Attract 50,000 global members, conquer.</span><br/></p>
       <p className="m-10 pt-5 mb-0  "><button onClick={handleChange} className=" hover:bg-gradient-to-t from-black to-purple-500 
        border-radius-2 border-purple-500 border-solid 
       border-2 rounded-full
       text-2xl text-white font-bold py-5 px-7 rounded-full">
          Get Started 
        </button></p>
    </div>
  )
}
export default HeroSection;