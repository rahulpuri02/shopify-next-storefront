import React from "react";
import Navbar from "../layout/navbar/navbar";
import { BANNER_VIDEO_URL, MAIN_BANNER_POSTER } from "@/constants/shared";

function MainBanner() {
  return (
    <section className="relative h-screen w-full">
      <Navbar />
      <video
        src={BANNER_VIDEO_URL}
        loop
        muted
        autoPlay
        playsInline
        poster={MAIN_BANNER_POSTER}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 z-10 w-full text-white">
        <Navbar />
      </div>
    </section>
  );
}

export default MainBanner;
