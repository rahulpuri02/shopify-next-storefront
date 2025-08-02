"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_IMAGE_ALT } from "@/constants/shared";
import { Product } from "@/types/shared";
import Image from "next/image";

type ComponentProps = {
  images: Product["images"];
};

export function ProductGallery({ images }: ComponentProps) {
  return (
    <>
      <ScrollArea className="invisible-scrollbar hidden h-full w-full sm:block">
        <div className="relative flex w-full max-w-[600px] flex-col">
          {images.map((image, idx) => (
            <div className="relative aspect-[2/3]" key={image.url}>
              <Image
                fill
                src={image.url}
                alt={image.altText ?? `${DEFAULT_IMAGE_ALT} ${idx + 1}`}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Mobile Carousel */}
      <Carousel className="w-full sm:hidden">
        <CarouselContent className="relative ml-0 w-full">
          {images.map((img, idx) => (
            <CarouselItem
              key={img.url}
              className="relative m-0 flex h-auto w-screen items-center justify-center p-0"
            >
              <div className="relative aspect-[2/3] w-screen">
                <Image
                  fill
                  src={img.url}
                  alt={img.altText ?? `${DEFAULT_IMAGE_ALT} ${idx + 1}`}
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
