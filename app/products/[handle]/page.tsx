import { ProductDetails } from "@/components/shared/products/product-details";
import { ProductGallery } from "@/components/shared/products/product-gallery";
import ProductInfo from "@/components/shared/products/product-info";
import { FallbackImage, NO_IMAGE_FOUND } from "@/constants/shared";
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
  return (
    <section className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-20 overflow-hidden lg:grid-cols-2 xl:max-w-[80%]">
      <div className="mt-12 overflow-auto scroll-smooth">
        <ProductGallery images={product.images} />
      </div>
      <div className="flex flex-col gap-6 overflow-y-auto px-6 py-10">
        <ProductDetails product={product} />
        <ProductInfo />
        <hr />
        <div className="text-sm uppercase">
          <p>STYLE WITH</p>
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
    </section>
  );
}

export default ProductPage;
