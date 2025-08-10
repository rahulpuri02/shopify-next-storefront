"use client";

import FavoriteIcon from "@/components/icons/favorite-icon";
import { GENERICS, SHIPPING_NOTE } from "@/constants/shared";
import { useFavorite } from "@/contexts/favorite-context";
import { capitalize, cn, reshapeFavoriteItem } from "@/lib/utils";
import type { Product } from "@/types/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SizeSelector from "./SizeSelector";

type ComponentProps = {
  product: Product;
};

export function ProductDetails({ product }: ComponentProps) {
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color") || product.variants[0]?.colorName.toLowerCase();
  const { handleFavState, isProductInFavorites, favItems } = useFavorite();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isProductInFavorites(reshapeFavoriteItem(product)));
  }, [favItems, product, isProductInFavorites]);

  return (
    <div className="relative mt-10 w-full space-y-6">
      <div className="flex justify-between">
        <h1 className="w-[70%] flex-wrap text-3xl font-normal">{product.title || "test"}</h1>
        <div className="mt-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFavState(reshapeFavoriteItem(product));
            }}
          >
            <FavoriteIcon className={cn("stroke-black", isFavorite && "fill-black")} />
          </div>
        </div>
      </div>

      <div className="border-b pb-8">
        <span className="text-sm">{product.price}</span>
      </div>

      <p className="py-2 md:py-3">
        {product.description ||
          "Overshirt made from a fancy fil coupé jacquard in a LENZING™ ECOVERO™ Viscose blend. The shirt has an open collar and patch pockets at the waist."}
      </p>

      <hr />

      <div className="text-sm">
        <span className="mr-1.5 inline-block uppercase">{GENERICS.color}:</span>
        {capitalize(selectedColor)}
        <div className="mt-4 flex gap-3">
          {product.variants.map((variant) => (
            <Link
              scroll={false}
              href={`?${new URLSearchParams({ color: variant.colorName.toLowerCase() })}`}
              className={cn(
                "cursor-pointer rounded-full",
                selectedColor.toLowerCase() === variant.colorName.toLowerCase()
                  ? "border border-black"
                  : ""
              )}
              key={variant.colorName}
            >
              <p
                className={`m-0.5 h-6 w-6 rounded-full`}
                style={{ backgroundColor: `${variant.colorCode}` }}
              />
            </Link>
          ))}
        </div>
      </div>
      <SizeSelector product={product} selectedColor={selectedColor} />

      <p className="mt-20 w-xs flex-wrap pt-2 text-sm text-gray-500 uppercase">{SHIPPING_NOTE}</p>
    </div>
  );
}
