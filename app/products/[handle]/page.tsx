import { DEFAULT_IMAGE_ALT } from "@/constants/shared";
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
    <section className="mt-16 flex h-auto w-full gap-5 md:mt-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ul>
          {product.images.map((image) => (
            <li key={image.url}>
              <Image
                src={image.url}
                alt={image.altText || DEFAULT_IMAGE_ALT}
                width={"500"}
                height={"500"}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProductPage;
