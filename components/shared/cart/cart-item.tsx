import { Button } from "@/components/ui/button";
import { CART, NO_IMAGE_FOUND } from "@/constants/shared";
import type { CartItem } from "@/types/shared";
import Image from "next/image";
import React from "react";

type ComponentProps = {
  item: CartItem;
};

function CartItem({ item }: ComponentProps) {
  return (
    <li className="flex items-start gap-4">
      <div className="relative h-[144px] w-[94px] shrink-0 overflow-hidden">
        <Image
          src={item.images?.[0]?.url || NO_IMAGE_FOUND}
          alt="Product"
          fill
          sizes="94px"
          className="aspect-auto"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between text-xs">
        <div className="flex justify-between px-1 py-1.5 text-xs">
          <div className="flex flex-col">
            <p className="text-slate-900 uppercase">{item.title.split("-")[0]}</p>
            <p className="text-muted-foreground">{item.title.split("-")[1]}</p>
            <p className="text-muted-foreground mt-2 text-xs">Croc Green #374</p>
            <p className="text-muted-foreground text-xs">{item.selectedSize}</p>
          </div>
          <button className="text-xs underline underline-offset-4">{CART.remove}</button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Button size="icon" variant="outline" className="h-7 w-7 p-0 text-sm">
              −
            </Button>
            <span className="text-sm">1</span>
            <Button size="icon" variant="outline" className="h-7 w-7 p-0 text-sm">
              +
            </Button>
          </div>
          <div className="text-xs">{item.price}</div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
