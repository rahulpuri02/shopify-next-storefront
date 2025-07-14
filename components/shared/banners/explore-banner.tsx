import { EXPLORER_BANNER, GENERICS } from "@/constants/shared";
import { SHOPIFY_URL_PREFIXS } from "@/constants/shopify";
import Image from "next/image";
import Link from "next/link";

const ExploreBanner = () => {
  return (
    <Link href={`${SHOPIFY_URL_PREFIXS.collections}/${GENERICS.seeAll}`}>
      <section className="relative flex aspect-video min-h-[414px] w-full flex-col justify-center space-y-6 text-white md:space-y-8">
        <Image
          className="absolute"
          src={EXPLORER_BANNER.imageSrc}
          alt={EXPLORER_BANNER.imgAlt}
          fill
        />
        <header className="z-1 hidden px-8 text-2xl font-semibold tracking-widest sm:block sm:text-3xl md:w-[30%] md:leading-[4rem] lg:text-5xl">
          <h4>{EXPLORER_BANNER.title}</h4>
        </header>
        <p className="z-1 hidden px-8 sm:block md:max-w-[90%]">{EXPLORER_BANNER.description}</p>
        <header className="z-1 flex flex-col items-center justify-center text-2xl font-semibold tracking-widest sm:hidden sm:text-3xl md:w-[30%] md:leading-[4rem] lg:text-5xl">
          <h4>{EXPLORER_BANNER.title}</h4>
          <p className="mx-auto mt-6 w-full max-w-[90%] text-center text-xs font-normal md:mt-0">
            {EXPLORER_BANNER.description}
          </p>
        </header>
      </section>
    </Link>
  );
};

export default ExploreBanner;
