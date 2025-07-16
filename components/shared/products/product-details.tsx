import FavoriteIcon from "@/components/icons/favorite-icon";
import { GENERICS, SHIPPING_NOTE } from "@/constants/shared";
import type { Product } from "@/types/shared";
import SizeSelector from "./SizeSelector";

type ComponentProps = {
  product: Product;
};

export function ProductDetails({ product }: ComponentProps) {
  const colors = ["bg-blue-700", "bg-slate-300"];

  return (
    <div className="relative mt-10 w-full space-y-6">
      <div className="flex justify-between">
        <h1 className="w-[70%] flex-wrap text-3xl font-normal">{product.title || "test"}</h1>
        <div className="mt-2">
          <FavoriteIcon className="stroke-black" />
        </div>
      </div>

      <div className="border-b pb-8">
        <span className="text-sm">
          {product.variants[0]?.price.amount} {product.variants[0]?.price.currencyCode}
        </span>
      </div>

      <p className="py-2 md:py-3">
        {product.description ||
          "Overshirt made from a fancy fil coupé jacquard in a LENZING™ ECOVERO™ Viscose blend. The shirt has an open collar and patch pockets at the waist."}
      </p>

      <hr />

      <div className="text-sm">
        <span className="mr-1.5 inline-block uppercase">{GENERICS.color}:</span>
        {"Navy Blue #200"}
        <ul className="mt-4 flex gap-3">
          {colors.map((color) => (
            <li className="cursor-pointer rounded-full border border-black" key={color}>
              <p className={`h-6 w-6 ${color} m-0.5 rounded-full`} />
            </li>
          ))}
        </ul>
      </div>
      <SizeSelector />

      <p className="mt-20 w-xs flex-wrap pt-2 text-sm text-gray-500 uppercase">{SHIPPING_NOTE}</p>
    </div>
  );
}
