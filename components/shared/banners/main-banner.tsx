import React from "react";
import { BANNER_VIDEO_URL, MAIN_BANNER_POSTER } from "@/constants/shared";

function MainBanner() {
  return (
    <section className="relative h-screen w-full">
      <video
        src={BANNER_VIDEO_URL}
        loop
        muted
        autoPlay
        playsInline
        poster={MAIN_BANNER_POSTER}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
    </section>
  );
}

export default MainBanner;
