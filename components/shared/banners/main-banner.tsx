"use client";

import { useState } from "react";
import Image from "next/image";
import { BANNER_VIDEO_URL, MAIN_BANNER_POSTER } from "@/constants/shared";

function MainBanner() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {!isVideoLoaded && (
        <Image
          src={MAIN_BANNER_POSTER}
          alt="main-banner"
          fill
          className="absolute top-0 left-0 object-cover"
          priority
        />
      )}
      <video
        src={BANNER_VIDEO_URL}
        loop
        muted
        autoPlay
        playsInline
        poster={MAIN_BANNER_POSTER}
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
    </section>
  );
}

export default MainBanner;
