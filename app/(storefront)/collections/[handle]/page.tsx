import { collectionService } from "@/services/collection.service";
import { notFound } from "next/navigation";
import React from "react";
import parse from "html-react-parser";
import ProductCard from "@/components/shared/products/product-card";
import { GENERICS } from "@/constants/shared";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};

async function CollectionPage({ params }: ComponentProps) {
  const { handle } = await params;
  const collection = await collectionService.getCollection(handle);
  if (!collection) return notFound();

  return (
    <section className="mt-20 w-full px-6 md:mt-[88px] lg:px-8">
      <header className="flex text-2xl md:text-4xl">
        <h1>{collection.title}</h1>
        <span className="mb-2 ml-1 text-sm">{collection.products.length}</span>
      </header>
      <div className="mt-4 max-w-[550px] text-base md:mt-6">
        {parse(collection.descriptionHtml)}
      </div>
      {collection.products && collection.products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {collection.products.map((product) => (
            <ProductCard product={product} key={product.handle} showFavoriteIcon={true} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500">{GENERICS.notResultFound}</p>
      )}
    </section>
  );
}

export default CollectionPage;
