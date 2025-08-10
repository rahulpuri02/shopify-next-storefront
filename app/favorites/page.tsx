"use client";

import ProductCard from "@/components/shared/products/product-card";
import { useFavorite } from "@/contexts/favorite-context";

function FavoritePage() {
  const { favItems } = useFavorite();
  return (
    <div className="mt-16 px-6 py-8">
      <div className="mb-5 flex items-center gap-1 text-xl md:text-2xl">
        <p className="tracking-wide">Favorites</p>
        <sup className="mt-2 text-sm font-normal">02</sup>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {favItems &&
          favItems.map((product) => <ProductCard product={product} key={product.handle} />)}
      </div>
    </div>
  );
}

export default FavoritePage;
