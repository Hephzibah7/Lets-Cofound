import React from 'react'

function Network() {
  return (
    <div className="hidden lg:block flex flex-col justify-center items-center  bg-black h-[172vh] font-alexandria">
       <p><span className="p-2 px-4 hover:bg-gradient-to-t from-black to-purple-500 text-white border-radius-2 border-purple-500 border-solid border-2 rounded-full text-2xl">Network<br/></span></p>
        <div className="w-3/4">
        <p className="pt-5  text-6xl text-white text-center">You're amidst <span className="text-purple-500"> exceptional company</span>,
         where <span className="text-purple-500">greatness thrives.</span></p>
        <p className="mt-5 p-2 text-white text-center text-2xl gif-container ">Join the global community of thousands who adore LetsCoFound.
         You'll quickly see why!</p>
         </div>
        <img className="mt-10" src="https://brahmastack-productions3bucketcompressed987cae76-18oalpdfqbygc.s3.us-east-2.amazonaws.com/landing/network.png"/>
    </div>
  )
}

export default Network;
