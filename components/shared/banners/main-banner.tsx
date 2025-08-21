import { BANNER_VIDEO_URL, MAIN_BANNER_POSTER } from "@/constants/shared";

function MainBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src={BANNER_VIDEO_URL}
        loop
        muted
        autoPlay
        playsInline
        poster={MAIN_BANNER_POSTER}
        className={`absolute top-0 left-0 h-full w-full object-cover`}
        aria-hidden="true"
      />
    </section>
  );
}

export default MainBanner;
