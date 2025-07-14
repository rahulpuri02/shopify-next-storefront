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
        <header className="z-1 px-8 text-2xl font-semibold tracking-widest sm:text-3xl md:w-[30%] md:leading-[4rem] lg:text-5xl">
          <h4>{EXPLORER_BANNER.title}</h4>
        </header>
        <p className="z-1 px-8 md:max-w-[90%]">{EXPLORER_BANNER.description}</p>
      </section>
    </Link>
  );
};

export default ExploreBanner;
