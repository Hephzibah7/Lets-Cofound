import React from 'react'

function Notifications() {
  return (
    <div className="flex flex-row justify-end bg-black text-white h-[115vh] font-alexandria">
    <div className="flex flex-col w-1/2 pl-10 ml-10">
      <img className="m-10  pl-1 w-[40vw] h-[90vh]" src="../Designer1.png"/>
    </div>
  
    <div className="mb-10 pb-10 ml-10 pl-7 flex flex-col w-1/2 justify-center mr-10 pr-10">
      <p><span className="p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 border-radius-2 border-purple-500 border-solid border-2 rounded-full text-2xl">Notification</span></p>
      <p className="mt-5 pt-2 text-7xl font-bold">Elevate Your <span className="text-purple-500"> Career</span> with Your Next
      <span className="text-purple-500" > Major Move</span>, Right Now.</p> 
      <p className=" mt-10 text-2xl "> <span className="gif-container">Gain immediate access to invaluable
       global startup insights, while seizing premier job opportunities 
      and lucrative partnerships.</span><br/><br/></p>
      <div className="ml-[150px]">
        <button className="border-radius-2 border-purple-500 border-solid 
       border-2 rounded-full hover:bg-gradient-to-t from-black to-purple-500 w-[200px] py-5 px-2 rounded-full get-started-button 
        text-xl">Get Started <span>&rarr;</span></button>
        </div>
    </div>   
  </div>
  
  )
}

export default Notifications;