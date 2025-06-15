import { environment } from "@/environment";

export default function ScreenIndicator() {
  if (environment.NODE_ENV !== "development") return null;

  return (
    <div className="bg-opacity-70 pointer-events-none fixed right-2 bottom-2 z-[9999] rounded bg-black px-2 py-1 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="3xl:hidden hidden 2xl:block">2xl</div>
      <div className="3xl:block hidden">3xl</div>
    </div>
  );
}
