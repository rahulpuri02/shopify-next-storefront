"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/useCarousal";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/shared";
import ProductCard from "./product-card";

type ComponentProps = {
  items: Collection["products"];
  title?: string;
  className?: string;
};

export default function ProductCarousel({ items, className, title = "" }: ComponentProps) {
  const { setApi, current, count, scrollTo } = useCarousel(items);
  return (
    <div className="mx-auto w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: false,
        }}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between text-lg uppercase md:mb-7 md:text-2xl">
            <h3>{title}</h3>
            <div className="flex gap-2 md:gap-3">
              <CarouselPrevious className="border-none bg-none shadow-none" />
              <CarouselNext className="border-none bg-none shadow-none" />
            </div>
          </div>
        )}
        <CarouselContent className="-ml-2 w-full md:-ml-4">
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className={cn("basis-1/2 pl-4 sm:basis-1/3 xl:basis-1/4", className)}
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {!title && (
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
      )}
    </div>
  );
}
