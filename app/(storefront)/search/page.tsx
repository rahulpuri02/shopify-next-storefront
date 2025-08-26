import FiltersAndSort from "@/components/shared/filters/filters-and-sort";
import ProductCard from "@/components/shared/products/product-card";
import { GENERICS } from "@/constants/shared";
import { productService } from "@/services/product.service";

type ComponentProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function SearchPage({ searchParams }: ComponentProps) {
  const query = await searchParams;
  const searchTerm = query.s as string;

  const products = searchTerm && (await productService.getSearchResults(searchTerm));
  return (
    <div className="mt-20 h-full px-6 md:mt-24 lg:px-8">
      <div className="flex h-full flex-col items-center justify-center gap-2 text-xs uppercase">
        {GENERICS.searchResult}
      </div>
      <div className="relative mt-[10px] text-center text-base font-medium uppercase">
        {`“${searchTerm || ""}”`}
        <p className="inline-block pr-1 text-[1px] font-normal">s</p>
        <sup className="absolute top-3 text-[11px] font-normal">
          {searchTerm && products ? products.length : 0}
        </sup>
        <div className="mt-6 flex text-xs font-normal md:mt-16">
          {products?.length && <FiltersAndSort />}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 font-normal md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product.handle} showFavoriteIcon={true} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
