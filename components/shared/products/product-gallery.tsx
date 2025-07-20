"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_IMAGE_ALT } from "@/constants/shared";
import { useCarousel } from "@/hooks/use-carousal";
import { cn } from "@/lib/utils";
import { Product } from "@/types/shared";

type ComponentProps = {
  images: Product["images"];
};

export function ProductGallery({ images }: ComponentProps) {
  const { current, count, scrollTo, setApi } = useCarousel(images);
  return (
    <>
      <ScrollArea className="invisible-scrollbar hidden h-full w-full sm:block">
        <div className="relative flex w-full max-w-[600px] flex-col">
          {images.map((image, idx) => (
            <img
              key={image.url}
              src={image.url}
              alt={image.altText ?? `${DEFAULT_IMAGE_ALT} ${idx + 1}`}
              className="aspect-[2/3] w-full object-cover object-center"
            />
          ))}
        </div>
      </ScrollArea>
      <Carousel setApi={setApi} className="w-full sm:hidden">
        <CarouselContent className="relative ml-0 w-full">
          {images.map((img, idx) => (
            <CarouselItem
              key={img.url}
              className="m-0 flex h-auto w-screen items-center justify-center p-0"
            >
              <img
                src={img.url}
                alt={img.altText ?? `${DEFAULT_IMAGE_ALT} ${idx + 1}`}
                className="aspect-[2/3] w-screen object-cover object-center"
              />
            </CarouselItem>
          ))}
          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  current === index ? "scale-110 bg-white" : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </CarouselContent>
      </Carousel>
    </>
  );
}
