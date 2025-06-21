"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import ProductCard from "./product-card";
import type { Collection } from "@/types/shared";

type ComponentProps = {
  items: Collection["products"];
};

export default function ProductCarousel({ items }: ComponentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api || items.length === 0) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, items]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 pl-4 lg:basis-1/3">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-200",
              current === index ? "bg-primary scale-110" : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
