import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { FallbackImage } from "@/constants/shared";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";

const dummyProducts = [
  {
    id: 1,
    name: "SHANE",
    description: "DRAWSTRING REGULAR FIT SHORTS",
    color: "NAVY BLUE #200",
    size: 29,
    price: 55,
    originalPrice: 92,
    imageUrl: FallbackImage,
  },
  {
    id: 2,
    name: "PAW",
    description: "FIL-COUPÉ JACQUARD SHORTS",
    color: "NAVY BLUE #200",
    size: 34,
    price: 181,
    originalPrice: null,
    imageUrl: FallbackImage,
  },
  {
    id: 3,
    name: "MILO",
    description: "COTTON TWILL SHORTS",
    color: "BLACK #100",
    size: 32,
    price: 70,
    originalPrice: 100,
    imageUrl: FallbackImage,
  },
  {
    id: 4,
    name: "JAX",
    description: "LINEN BLEND SHORTS",
    color: "BEIGE #300",
    size: 31,
    price: 60,
    originalPrice: 80,
    imageUrl: FallbackImage,
  },
  {
    id: 5,
    name: "REX",
    description: "SLIM FIT CHINO SHORTS",
    color: "OLIVE #400",
    size: 30,
    price: 65,
    originalPrice: null,
    imageUrl: FallbackImage,
  },
  {
    id: 6,
    name: "ACE",
    description: "STRETCH DENIM SHORTS",
    color: "BLUE #500",
    size: 33,
    price: 75,
    originalPrice: 90,
    imageUrl: FallbackImage,
  },
  {
    id: 7,
    name: "MAX",
    description: "CARGO SHORTS",
    color: "KHAKI #600",
    size: 36,
    price: 85,
    originalPrice: 110,
    imageUrl: FallbackImage,
  },
  {
    id: 8,
    name: "FINN",
    description: "ATHLETIC SHORTS",
    color: "GREY #700",
    size: 28,
    price: 50,
    originalPrice: null,
    imageUrl: FallbackImage,
  },
];

export function ShoppingCart({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-screen max-w-2xl rounded-none p-0">
        <DrawerHeader className="border-b px-6 py-4">
          <DrawerTitle className="text-2xl font-medium">
            Bag<sup> {dummyProducts.length}</sup>
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-sm">
            14 EUR left for free shipping
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="invisible-scrollbar h-[400px] overflow-y-scroll px-6 py-4 pb-10">
          <div className="space-y-6">
            {dummyProducts.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded border"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="leading-none font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.color} {item.size}
                      </p>
                    </div>
                    <button className="text-muted-foreground text-sm underline">Remove</button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-2">1</span>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm font-medium">
                      {item.price} EUR
                      {item.originalPrice && (
                        <span className="text-muted-foreground ml-2 line-through">
                          {item.originalPrice} EUR
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      </DrawerContent>
    </Drawer>
  );
}
