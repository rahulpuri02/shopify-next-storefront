import { EXPLORER_BANNER } from "@/constants/shared";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ExploreBanner = () => {
  return (
    <Link href={"/"}>
      <section className="relative flex h-screen w-full flex-col justify-center space-y-8 px-8 pt-[15%] text-white">
        <Image
          className="absolute object-cover"
          src={EXPLORER_BANNER.imageSrc}
          alt={EXPLORER_BANNER.imgAlt}
          fill
        />
        <header className="z-20 w-[30%] text-5xl font-semibold tracking-widest md:leading-[4rem]">
          <h4>{EXPLORER_BANNER.title}</h4>
        </header>
        <p className="z-2 max-w-[90%]">{EXPLORER_BANNER.description}</p>
      </section>
    </Link>
  );
};

export default ExploreBanner;
