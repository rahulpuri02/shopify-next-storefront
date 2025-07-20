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
import { CART, GENERICS } from "@/constants/shared";
import { useCart } from "@/contexts/cart-context";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { XIcon } from "lucide-react";
import CartItem from "./cart-item";

export function ShoppingCart() {
  const { showCart, isShowCart, cartItems } = useCart();
  return (
    <Drawer onOpenChange={showCart} open={isShowCart}>
      <DrawerTrigger asChild />
      <DrawerContent className="h-screen w-[90%] rounded-none p-0 md:max-w-3xl">
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
              <p className="text-slate-900">{CART.currency} 399</p>
              <p className="text-muted-foreground">{CART.leftForFreeShipping}</p>
            </div>
            <Progress className="h-[1px] rounded-none" value={33} />
            <div />
          </div>
          <ScrollArea className="invisible-scrollbar h-[63vh] overflow-y-scroll py-3 pb-0 sm:h-[calc(100vh-300px)]">
            <ul className="flex flex-col space-y-3">
              {cartItems.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </ul>
          </ScrollArea>

          <div className="fixed right-0 bottom-14 z-100 w-full space-y-4 border-t bg-white px-4 py-3 sm:bottom-0">
            <div className="flex justify-between border-t-gray-200 text-base font-medium">
              <span>{CART.total}</span>
              <span>{CART.currency} 2099</span>
            </div>
            <Button className="w-full px-4 font-normal">{CART.goToCheckout}</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
