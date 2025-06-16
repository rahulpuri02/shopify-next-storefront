import { FallbackImage, NO_PRODUCT_IMAGE } from "@/constants/shared";
import { Collection } from "@/types/shopify";
import Image from "next/image";
import React from "react";

type ComponentProps = {
  product: Collection["products"][number];
};

function ProductCard({ product }: ComponentProps) {
  const colors = ["bg-red-500", "bg-green-400", "bg-blue-300", "bg-yellow-200", "bg-purple-500"];
  return (
    <div className="h-full w-full">
      <div className="relative h-[434px] w-full">
        <Image
          src={product.imageUrl || FallbackImage}
          alt={product.imageAlt || NO_PRODUCT_IMAGE}
          fill
          className="object-cover md:object-fill"
        />
      </div>
      <div className="mt-4 flex w-full flex-col gap-1 px-2 text-xs text-black uppercase">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            NOLAN - Ribbed Organic Cotton Polo
          </p>
          <div className="flex flex-shrink-0 items-center gap-1">
            {colors.length > 3 ? (
              <>
                {colors.slice(0, 3).map((color, index) => (
                  <span key={index} className={`h-2.5 w-2.5 ${color}`} />
                ))}
                <span className="text-xs">+{colors.length - 3}</span>
              </>
            ) : (
              colors.map((color, index) => <span key={index} className={`h-3 w-3 ${color}`} />)
            )}
          </div>
        </div>
        <p>₹ 3999</p>
      </div>
    </div>
  );
}

export default ProductCard;
