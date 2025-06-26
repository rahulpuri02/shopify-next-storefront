import ProductCarousel from "@/components/shared/products/product-carousel";
import { ProductDetails } from "@/components/shared/products/product-details";
import { ProductGallery } from "@/components/shared/products/product-gallery";
import ProductInfo from "@/components/shared/products/product-info";
import { FallbackImage, GENERICS, NO_IMAGE_FOUND } from "@/constants/shared";
import { COLLECTIONS } from "@/constants/shopify";
import { collectionService } from "@/services/collection.service";
import { productService } from "@/services/product.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};
async function ProductPage({ params }: ComponentProps) {
  const { handle } = await params;
  const product = await productService.getProduct(handle);
  if (!product) return notFound();

  const collection = await collectionService.getCollection(COLLECTIONS.refreshYourWardrobe);
  return (
    <section className="flex w-full flex-col gap-20">
      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-20 overflow-hidden lg:grid-cols-2 xl:max-w-[80%]">
        <div className="mt-12 overflow-auto scroll-smooth">
          <ProductGallery images={product.images} />
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-10">
          <ProductDetails product={product} />
          <ProductInfo />
          <hr />
          <div className="text-sm uppercase">
            <p className="uppercase">{GENERICS.styleWith}</p>
            <ul className="mt-4 flex gap-1.5">
              {[1, 2].map((i) => (
                <Image
                  key={i}
                  width={85}
                  height={128}
                  src={FallbackImage}
                  alt={NO_IMAGE_FOUND}
                  className="aspect-[2/3] opacity-90"
                />
              ))}
            </ul>
          </div>
          <hr className="w-full" />
        </div>
      </div>
      {collection && collection?.products?.length > 0 && (
        <div className="px-5 md:px-10">
          <h2 className="mb-4 text-lg uppercase md:mb-7 md:text-2xl">{GENERICS.recommendForYou}</h2>
          <ProductCarousel items={collection.products} className="md:basis-1/3 lg:basis-1/4" />
        </div>
      )}
    </section>
  );
}

export default ProductPage;
