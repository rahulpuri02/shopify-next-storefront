"use client";

import { addItem } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ADD_TO_CART, ADDING, SIZE_SELECTION_STOCK_NOTE } from "@/constants/shared";
import { useCart } from "@/contexts/cart-context";
import useClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { Product, SizeStock } from "@/types/shared";
import { InfoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type ComponentProps = {
  product: Product;
  selectedColor: string;
};

export default function SizeSelector({ product, selectedColor }: ComponentProps) {
  const selectedVariant = product.variants.find(
    (v) => v.colorName.toLowerCase() === selectedColor.toLowerCase()
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isAddingSize, setIsAddingSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { showCart, setCart } = useCart();

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelectSize = async ({ name, variantId }: SizeStock) => {
    setSelectedSize(name);
    setIsAddingSize(true);
    const updatedCart = await addItem(variantId);
    if (typeof updatedCart === "string") return toast(updatedCart);
    setCart(updatedCart);
    setTimeout(() => {
      if (typeof updatedCart !== "string") {
        setIsAddingSize(false);
        setIsOpen(false);
        showCart(true);
        setSelectedSize("");
      }
    }, 1200);
  };

  return (
    <>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 h-screen bg-black/40 transition-opacity",
            isOpen ? "z-[1000]" : "z-1"
          )}
          aria-hidden="true"
        />
      )}
      <div
        className={cn("absolute bottom-8 w-full outline-none", isOpen ? "z-[1000]" : "z-1")}
        ref={ref}
        tabIndex={-1}
      >
        <Card
          className={cn(
            "w-full",
            isOpen ? "gap-0 border-none py-0 shadow-2xl" : "m-0 gap-0 border-none p-0 py-0",
            isAddingSize && "pointer-events-none"
          )}
        >
          <div className="overflow-hidden transition-all duration-300">
            {isOpen && (
              <CardContent className="animate-in fade-in rounded-md rounded-b-none border-none bg-white p-2 pb-6 shadow-xl transition-all">
                <div className="px-2 pt-4 text-sm">
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm tracking-wide">SIZE</p>
                    <ul className="grid grid-cols-4 gap-4 pr-2 md:grid-cols-5 md:pr-4">
                      {selectedVariant?.availableSizes.map((s) => (
                        <li
                          onClick={() => handleSelectSize(s)}
                          key={s.variantId}
                          className={cn(
                            "cursor-pointer border py-2 text-center uppercase transition-all ease-in-out hover:border-black",
                            selectedSize === s.name ? "border-black bg-gray-100" : "border-gray-300"
                          )}
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex items-start gap-1.5 pb-1 text-sm md:pb-2">
                      <InfoIcon className="mt-[2px] h-4 w-4 shrink-0 stroke-1" />
                      <p>{SIZE_SELECTION_STOCK_NOTE}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </div>
          <Button
            size="lg"
            className={cn(
              "mt-0 w-full cursor-pointer font-normal tracking-wider uppercase",
              isOpen ? "rounded-t-none" : ""
            )}
            onClick={() => setIsOpen(true)}
          >
            {isAddingSize ? ADDING : ADD_TO_CART}
          </Button>
        </Card>
      </div>
    </>
  );
}
