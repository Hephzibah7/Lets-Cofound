import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function HeroSection() {
  const Navigate = useNavigate();
  const handleChange = () =>{
    Navigate("/SignUp");
  }
  return (
    
    <div className="flex flex-col justify-center items-center bg-black text-white h-[75vh] font-alexandria">
    <div className="w-[90vw] md:w-[80vw] lg:w-[75vw] mt-[50px] md:mt-[75px] lg:mt-[100px]">
      <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
        <span className="text-purple-500">Unlock</span> your <span className="text-purple-500">startup's potential</span> with 
        <span className="text-purple-500"> LetsCoFound!</span>
      </p>
      <p className="text-lg md:text-2xl lg:text-3xl mt-6 md:mt-8 lg:mt-10 text-center gif-container">
        <span className="gif-container">We provide comprehensive support services, from AI-driven cofounder matchmaking to </span>
        <span className="gif-container">seamless startup registration, web development, marketing solutions, and investor </span>
        <span className="gif-container">fundraising assistance. Join us to transform your innovative ideas into successful </span>
        <span className="gif-container">ventures without the usual hurdles. Let's build the future, together!</span>
      </p>
    </div>
    <div className="m-6 md:m-8 lg:m-10 pt-3 md:pt-4 lg:pt-5 mb-0">
    <Link to="/policy">
      <p className='mb-3'>Please read the terms and policies before getting started</p>
      </Link>
      <button onClick={handleChange} className="hover:bg-gradient-to-t from-black to-purple-500 border-purple-500 border-solid border-2 rounded-full text-lg md:text-xl lg:text-2xl text-white font-bold py-3 md:py-4 lg:py-5 px-5 md:px-6 lg:px-7">
        Get Started 
      </button>
    </div>
  </div>
  )
}
export default HeroSection;