import FiltersAndSort from "@/components/shared/filters/filters-and-sort";
import ProductCard from "@/components/shared/products/product-card";
import { GENERICS } from "@/constants/shared";
import { collectionService } from "@/services/collection.service";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { cache } from "react";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};

const getCollection = cache((handle: string) => collectionService.getCollection(handle));

export const generateMetadata = async ({ params }: ComponentProps) => {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) {
    return {
      title: "Collection Not Found | CN 74®",
    };
  }
  return {
    title: `${collection.title} | CN 74®`,
    description: collection.description || "No description available",
  };
};

async function CollectionPage({ params }: ComponentProps) {
  const { handle } = await params;
  const collection = await getCollection(handle);
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
      <div className="mt-6 flex text-xs font-normal md:mt-16">
        <FiltersAndSort />
      </div>
      {collection.products && collection.products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 font-normal md:mt-8 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
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
