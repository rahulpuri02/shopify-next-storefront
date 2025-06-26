import React from "react";
import ProductCarousel from "../products/product-carousel";
import type { Collection } from "@/types/shared";

type ComponentProps = {
  collection: Collection | null;
};

function ShowcaseCollection({ collection }: ComponentProps) {
  if (!collection) return null;
  return (
    <section className="mx-auto pt-10 md:max-w-[82%] md:pt-15">
      <header className="pb-5 text-center text-2xl sm:pb-8 md:pb-10 md:text-4xl lg:pb-12">
        <h3>{collection?.title}</h3>
      </header>
      <ProductCarousel
        items={collection.products}
        className="basis-1/2 pl-4 sm:basis-1/3 xl:basis-1/4"
      />
    </section>
  );
}

export default ShowcaseCollection;
