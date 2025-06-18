import { FallbackImage, NO_IMAGE_FOUND } from "@/constants/shared";
import { SHOPIFY_CUSTOM_METAFIELDS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import Image from "next/image";
import React from "react";

async function HighlightCollections() {
  const highlightCollections = await collectionService.getCollections({
    key: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.key,
    value: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.values.highlights,
  });

  return (
    <section className="flex w-full flex-col">
      {highlightCollections?.map((collection, i) => (
        <div
          key={collection.handle}
          className={`flex ${i % 2 !== 0 ? "flex-row-reverse" : "flex-row"} h-screen w-full`}
        >
          <div className="relative h-screen w-[50%]">
            <Image
              src={collection.imageUrl || FallbackImage}
              alt={collection.imageAlt || NO_IMAGE_FOUND}
              fill
              className="object-fill"
            />
          </div>
          <div className="flex w-[50%] flex-col items-center justify-center space-y-8 px-5 text-center">
            <h4 className="text-center text-3xl font-medium">{collection.title}</h4>
            <p className="w-[90%]">{collection.description}</p>
            <button className="inline-block cursor-pointer rounded-none border border-gray-400 bg-transparent px-8 py-2.5 text-sm leading-none font-normal text-current uppercase opacity-100 transition-colors duration-700 ease-[cubic-bezier(0.32,0.24,0.15,1)] outline-none select-none hover:border-current hover:opacity-100">
              Explore Now
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default HighlightCollections;
