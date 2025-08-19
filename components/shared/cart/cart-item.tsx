"use client";

import { removeItem, updateItemQuantity } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { CART, NO_IMAGE_FOUND } from "@/constants/shared";
import { useCart } from "@/contexts/cart-context";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/shared";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

type ComponentProps = {
  item: CartItem;
};

function CartItem({ item }: ComponentProps) {
  const { setCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  async function updateCartItem(item: CartItem, type: "add" | "remove") {
    try {
      setIsProcessing(true);
      const previousCartQuantity = item.quantity;
      const updatedQuantity = type === "add" ? previousCartQuantity + 1 : previousCartQuantity - 1;
      const updatedCart = await updateItemQuantity(item.merchandiseId, updatedQuantity);
      if (typeof updatedCart === "string") return toast(updatedCart);
      setCart(updatedCart);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      setIsProcessing(true);
      const updatedCart = await removeItem(id);
      if (typeof updatedCart === "string") return toast(updatedCart);
      setCart(updatedCart);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <li className={cn("flex items-start gap-4", isProcessing && "pointer-events-none opacity-50")}>
      <div className="relative h-[144px] w-[94px] shrink-0 overflow-hidden">
        <Image
          src={item.imageUrl || NO_IMAGE_FOUND}
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
            <p className="text-muted-foreground mt-2 text-xs">{item.selectedColor}</p>
            <p className="text-muted-foreground text-xs">{item?.selectedSize}</p>
          </div>
          <button
            onClick={() => handleRemoveItem(item.merchandiseId)}
            className="cursor-pointer text-xs underline underline-offset-4"
          >
            {CART.remove}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Button
              onClick={() => updateCartItem(item, "remove")}
              size="icon"
              variant="outline"
              className="h-7 w-7 cursor-pointer p-0 text-sm"
            >
              −
            </Button>
            <span className="text-sm">{item.quantity}</span>
            <Button
              onClick={() => updateCartItem(item, "add")}
              size="icon"
              variant="outline"
              className="h-7 w-7 cursor-pointer p-0 text-sm"
            >
              +
            </Button>
          </div>
          <div className="text-xs">{formatPrice(item.subTotal)}</div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
