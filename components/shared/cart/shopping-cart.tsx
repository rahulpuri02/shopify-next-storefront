"use client";

import CompanyLogo from "@/components/icons/company-logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { GENERICS } from "@/constants/shared";
import { useCart } from "@/contexts/cart-context";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { XIcon } from "lucide-react";

export function ShoppingCart() {
  const { showCart, isShowCart, cartItems } = useCart();
  return (
    <Drawer onOpenChange={showCart} open={isShowCart}>
      <DrawerTrigger asChild />
      <DrawerContent className="h-screen w-[93%] rounded-none p-0 md:max-w-3xl">
        <DrawerHeader className="px-6 py-4">
          <DrawerTitle className="relative mt-5 flex items-center justify-center text-2xl font-medium md:mt-6">
            <CompanyLogo className="fill-black" />
            <XIcon
              className="absolute right-0 h-auto w-6 cursor-pointer stroke-1"
              onClick={() => showCart(false)}
            />
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-3 sm:px-4">
          <div className="my-4 mb-5 flex items-center gap-1 text-lg md:text-xl">
            <p className="tracking-wide">{GENERICS.bag}</p>
            <sup className="mt-2">{cartItems.length}</sup>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex gap-1 text-sm">
              <p className="text-slate-900">₹ 399</p>
              <p className="text-muted-foreground">left for free shipping</p>
            </div>
            <Progress className="h-[1px] rounded-none" value={33} />
            <div />
          </div>
          <ScrollArea className="invisible-scrollbar h-auto overflow-y-scroll py-3 pb-10">
            <ul>
              {[1, 2, 3, 4].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollArea>

          <div className="absolute bottom-0 z-100 w-full space-y-4 border-t border-t-gray-200 bg-white p-6">
            <div className="text-muted-foreground text-sm">
              Shipping from <span className="font-medium">20 EUR</span>. Applied at checkout.
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>236 EUR</span>
            </div>
            <Button className="w-full">Go to Checkout</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
