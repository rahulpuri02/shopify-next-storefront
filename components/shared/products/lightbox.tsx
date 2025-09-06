import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

type ComponentProps = {
  images: { url: string; altText?: string }[];
  initialIndex: number;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: ComponentProps) {
  const [current] = React.useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  if (!images.length) return null;

  return (
    <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <XIcon
        onClick={onClose}
        className="absolute top-6 right-6 h-auto w-6 cursor-pointer text-white"
      />
      <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="relative aspect-square h-full w-full max-w-[500px] 2xl:aspect-[2/3]">
            <Image
              src={images[current].url}
              alt={images[current].altText || `Product image ${current + 1}`}
              fill
              className="rounded-lg object-contain object-center shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
