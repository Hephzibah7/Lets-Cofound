import React from 'react'
import './styles.css'

function MainSection() {
  return (
    <div className="flex flex-row bg-black text-white h-[112vh] font-alexandria">
        <div className="slideInRight ml-10 pl-10 flex flex-col w-1/2 justify-center  mr-10 pr-10">
        <p><span className="p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 border-radius-2 border-purple-500 border-solid border-2 rounded-full text-2xl">Explore</span></p>
          <p className="pt-10 text-7xl font-bold">Celebrate your <span className="text-purple-500">achievements</span>; they're the 
          seeds of your <span className="text-purple-500">future accomplishments</span></p> 
        <p className="mt-10 text-2xl "><span className="gif-container">Unlock remarkable financial incentives for each triumphant
         recruitment or business recommendation.</span><br/><br/></p>
        <div className="ml-[150px]">
        <button className="border-radius-2 border-purple-500 border-solid 
       border-2 rounded-full hover:bg-gradient-to-t from-black to-purple-500 w-[200px] py-5 px-2 rounded-full get-started-button 
        text-xl">Get Started <span>&rarr;</span></button>
        </div>
      </div>
      <div className="mt-10 pt-10 flex flex-col w-1/2 ml-10 pl-10 mr-10 pr-10">
<img className="mt-10 pt-10" src="../Designer.png"/>
</div>
    </div>
  )
}

export default MainSection;
