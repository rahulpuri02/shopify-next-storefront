import { BANNER_VIDEO_URL, MAIN_BANNER_POSTER } from "@/constants/shared";
import Image from "next/image";
import { Suspense } from "react";

function MainBanner() {
  return (
    <section className="relative h-screen w-full">
      <Suspense
        fallback={
          <Image
            src={MAIN_BANNER_POSTER}
            alt="main-banner"
            fill
            className="absolute top-0 left-0 object-cover"
            priority
          />
        }
      >
        <video
          src={BANNER_VIDEO_URL}
          loop
          muted
          autoPlay
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </Suspense>
    </section>
  );
}

export default MainBanner;
