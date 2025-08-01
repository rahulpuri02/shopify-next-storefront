import { ROUTES } from "@/constants/routes";
import { FallbackImage, NO_IMAGE_FOUND } from "@/constants/shared";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";

type ComponentProps = {
  product: Collection["products"][number];
};

function ProductCard({ product }: ComponentProps) {
  return (
    <Link href={ROUTES.product(product.handle)}>
      <div className="relative aspect-[2/3]">
        <Image
          src={product.imageUrl || FallbackImage}
          alt={product.imageAlt || NO_IMAGE_FOUND}
          fill
          className="object-contain"
        />
      </div>
      <div className="mt-4 flex w-full flex-col gap-1 px-2 text-xs text-black uppercase">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</p>
          <div className="flex flex-shrink-0 items-center gap-1">
            {product.variants.length > 3 ? (
              <>
                {product.variants.slice(0, 3).map((variant, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block h-2.5 w-2.5",
                      "transition-transform hover:scale-110"
                    )}
                    style={{ backgroundColor: variant.colorCode || "transparent" }}
                  />
                ))}
                <span className="text-xs text-gray-500">+{product.variants.length - 3}</span>
              </>
            ) : (
              product.variants.map((variant, index) => (
                <span
                  key={index}
                  className={cn("inline-block h-2.5 w-2.5", "transition-transform hover:scale-110")}
                  style={{ backgroundColor: variant.colorCode || "transparent" }}
                />
              ))
            )}
          </div>
        </div>
        <p> {[product.price]}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
