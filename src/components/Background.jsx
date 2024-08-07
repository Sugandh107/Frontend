import React from 'react';
import video from '../assets/video.mp4';
import logo from '../assets/Banner.png'
function Background() {
  return (
    <div className="relative w-full h-screen overflow-hidden z-0">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        <img  className="absolute w-[600px]  bottom-[250px] left-1/4 transform -translate-x-1/2" src={logo} alt=" logo" />
        <h1 className="absolute bottom-[200px] left-1/4 transform -translate-x-1/2 text-transparent bg-clip-text text-4xl md:text-6xl lg:text-4xl z-10 p-4 rounded-lg">
  <span className="relative">
    Crafted with Passion, Served with Pride
    <span className="absolute top-0 left-0 w-full h-full text-gradient bg-clip-text text-yellow-400 z-[-1]">Crafted with Passion, Served with Pride</span>
    <span className="absolute top-0 left-0 w-full h-full text-gradient bg-clip-text text-red-700 z-[-2]">Crafted with Passion, Served with Pride</span>
    <span className="absolute top-0 left-0 w-full h-full text-gradient bg-clip-text text-red-500 z-[-3]">Crafted with Passion, Served with Pride</span>
    <span className="absolute top-0 left-0 w-full h-full text-gradient bg-clip-text text-red-600 z-[-4]">Crafted with Passion, Served with Pride</span>
    <span className="absolute top-0 left-0 w-full h-full text-gradient bg-clip-text text-white z-[-5]">Crafted with Passion, Served with Pride</span>
  </span>
</h1>


    </div>
  );
}

export default Background;
