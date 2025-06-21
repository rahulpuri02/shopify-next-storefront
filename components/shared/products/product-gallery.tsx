import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_IMAGE_ALT } from "@/constants/shared";
import { Product } from "@/types/shared";

type ComponentProps = {
  images: Product["images"];
};

export function ProductGallery({ images }: ComponentProps) {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col">
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image.url}
            alt={image.altText ?? `${DEFAULT_IMAGE_ALT} ${idx + 1}`}
            className="w-full"
          />
        ))}
      </div>
    </ScrollArea>
  );
}
