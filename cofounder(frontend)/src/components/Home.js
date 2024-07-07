import React from 'react'
import HeroSection from './HeroSection'
import  CardContainer  from './CardContainer'
import MainSection from './MainSection'
import Network from './Network'
import Notifications from './Notifications'
import Quotes from './Quotes'
import EndingSection from './EndingSection'
import Footer from './Footer'
// import '../make.css'
import Navbar from './Navbar'
export default function Home() {
  return (
    // <div className="bg-gradient-to-r from-black to-purple-950">
    <div className='overflow-x-hidden lg:min-h-screen h-[330vh]'>
      <Navbar/>
      <HeroSection />
      {/* <CardContainer/> */}
      <MainSection/>
      <Network/>
      <Notifications/>
      <Quotes/>
      <EndingSection/>
      <Footer/>
    </div>
  )
}
