import React from "react";
import Navbar from "../layout/navbar/navbar";

function MainBanner() {
  return (
    <section className="relative h-screen w-full">
      <Navbar />
      <video
        src="https://res.cloudinary.com/dlt5cfo8m/video/upload/v1748716911/cn74-hero-video_wpyd2i.mp4"
        loop
        muted
        autoPlay
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      ></video>

      <div className="absolute top-0 z-10 w-full text-white">
        <Navbar />
      </div>
    </section>
  );
}

export default MainBanner;
