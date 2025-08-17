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
import { cn, formatPrice } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import CartItem from "./cart-item";

export default function EmptyCart() {
  const { showCart } = useCart();
  return (
    <div className="flex h-auto flex-col items-center justify-center space-y-6 pb-6 text-center md:pb-10">
      <div className="rounded-full bg-slate-100 p-6">
        <ShoppingCartIcon className="h-16 w-16 stroke-1 text-slate-400" />
      </div>
      <p className="text-muted-foreground text-lg font-medium">{CART.emptyCartMessage}</p>
      <Button className="cursor-pointer" onClick={() => showCart(false)}>
        {CART.continueShopping}
      </Button>
    </div>
  );
}

export function ShoppingCart() {
  const { showCart, isShowCart, cart } = useCart();

  if (!cart || !cart?.items?.length) return <EmptyCart />;

  const totalPrice = Number(cart.subTotal.amount);

  return (
    <Drawer onOpenChange={showCart} open={isShowCart}>
      <DrawerTrigger asChild />
      <DrawerContent
        className={cn(
          "flex h-screen w-[90%] flex-col rounded-none p-0 md:max-w-md",
          cart?.items.length === 0 ? "h-fit w-[85%] md:h-[320px] md:w-[350px]" : "h-screen"
        )}
      >
        <DrawerHeader className="px-6 py-4">
          <DrawerTitle className="relative mt-5 flex items-center justify-center text-2xl font-medium md:mt-6">
            {cart.items.length > 0 && <CompanyLogo className="fill-black" />}
            <XIcon
              className="absolute right-0 h-auto w-6 cursor-pointer stroke-1"
              onClick={() => showCart(false)}
            />
          </DrawerTitle>
        </DrawerHeader>
        {cart.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="px-3 sm:px-4">
            <div className="my-4 mb-5 flex items-center gap-1 text-lg md:text-xl">
              <p className="tracking-wide">{GENERICS.bag}</p>
              <sup className="mt-2">{cart?.items.length}</sup>
            </div>
            <div className="flex flex-col space-y-3">
              {totalPrice < 1000 ? (
                <div className="flex gap-1 text-sm">
                  <p className="text-slate-900">
                    {CART.currency} {Math.round(999 - totalPrice).toFixed(0)}
                  </p>
                  <p className="text-muted-foreground">{CART.leftForFreeShipping}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">{GENERICS.freeShipping}</p>
              )}
              <Progress
                className="h-[1px] rounded-none"
                value={Math.round((totalPrice / 999) * 100)}
              />
              <div />
            </div>
            <ScrollArea className="invisible-scrollbar h-[calc(100vh-300px)] overflow-y-scroll py-3 pb-0 sm:h-[calc(100vh-300px)]">
              <ul className="flex flex-col space-y-3">
                {cart?.items.map((item) => <CartItem item={item} key={item.id} />)}
              </ul>
            </ScrollArea>
          </div>
        )}
        {cart.items && cart?.items.length > 0 && (
          <div className="sticky right-0 bottom-0 left-0 mt-auto border-t bg-white px-4 py-3 shadow-sm">
            <div className="flex justify-between border-t-gray-200 text-base font-medium">
              <span>{CART.total}</span>
              <span>{formatPrice({ amount: totalPrice.toString(), currencyCode: "INR" })}</span>
            </div>
            <Button className="mt-4 w-full px-4 font-normal">{CART.goToCheckout}</Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
