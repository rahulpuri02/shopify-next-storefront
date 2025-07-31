import { ROUTES } from "@/constants/routes";
import {
  FallbackImage,
  GENERICS,
  MENS_CLOTHING_DESCRIPTION,
  MENS_CLOTHING_TITLE,
  NO_IMAGE_FOUND,
} from "@/constants/shared";
import { SHOPIFY_CUSTOM_METAFIELDS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import Image from "next/image";
import Link from "next/link";

async function HighlightCollections() {
  const highlightCollections = await collectionService.getCollections({
    key: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.key,
    value: SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.values.highlights,
  });

  if (!highlightCollections || highlightCollections.length === 0) return null;
  return (
    <div>
      <div className="mx-auto grid w-full grid-cols-2 space-y-10 2xl:max-w-3xl">
        {highlightCollections.map((collection, index) => (
          <Link
            href={ROUTES.collection(collection.handle)}
            className="flex flex-col space-y-3 text-sm"
            key={index}
          >
            <div className="relative aspect-[2/3] w-full">
              <Image
                fill
                src={collection.imageUrl || FallbackImage}
                alt={collection.imageAlt || NO_IMAGE_FOUND}
              />
            </div>
            <div className="flex flex-col space-y-1 pt-2 pl-2 text-xs md:text-sm">
              <div className="uppercase">{collection.title}</div>
              <div>{GENERICS.shopNow}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex w-full flex-col space-y-3 px-2 2xl:px-6">
        <h5 className="font-medium">{MENS_CLOTHING_TITLE}</h5>
        <div>{MENS_CLOTHING_DESCRIPTION}</div>
      </div>
    </div>
  );
}

export default HighlightCollections;
