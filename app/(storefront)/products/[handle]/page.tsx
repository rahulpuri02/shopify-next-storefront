import ProductCarousel from "@/components/shared/products/product-carousel";
import { ProductDetails } from "@/components/shared/products/product-details";
import { ProductGallery } from "@/components/shared/products/product-gallery";
import ProductInfo from "@/components/shared/products/product-info";
import { GENERICS } from "@/constants/shared";
import { productService } from "@/services/product.service";
import { notFound } from "next/navigation";
import { cache } from "react";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};

const getProduct = cache((handle: string) => productService.getProduct(handle));

export async function generateMetadata({ params }: ComponentProps) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) {
    return {
      title: "Product Not Found | CN 74®",
    };
  }
  return {
    title: `${product.title} | CN 74®`,
    description: product.description || "No description available",
  };
}

async function ProductPage({ params }: ComponentProps) {
  const { handle } = await params;
  const [product, recommendedProducts] = await Promise.all([
    getProduct(handle),
    productService.getProductRecommendations(handle),
  ]);
  if (!product) return notFound();

  return (
    <section className="flex w-full flex-col gap-20">
      <div className="mx-auto hidden h-full grid-cols-1 gap-10 overflow-hidden px-6 pr-6 sm:mt-6 sm:grid sm:h-screen sm:max-w-6xl sm:grid-cols-2 sm:gap-20 sm:px-4 md:px-0 xl:max-w-[80%]">
        <div className="invisible-scrollbar mt-12 overflow-y-scroll scroll-smooth">
          <ProductGallery images={product.images} />
        </div>
        <div className="invisible-scrollbar flex flex-col gap-6 overflow-y-scroll scroll-smooth px-6 sm:py-10">
          <ProductDetails product={product} />
          <ProductInfo />
          <hr />
        </div>
      </div>
      <div className="sm:hidden">
        <ProductGallery images={product.images} />
        <div className="invisible-scrollbar flex flex-col gap-6 overflow-y-scroll scroll-smooth px-6 sm:py-10">
          <ProductDetails product={product} />
          <ProductInfo />
          <hr />
        </div>
      </div>
      {recommendedProducts && recommendedProducts?.length > 0 && (
        <div className="px-5 md:px-10">
          <ProductCarousel
            items={recommendedProducts}
            className="md:basis-1/3 lg:basis-1/4"
            title={GENERICS.recommendForYou}
          />
        </div>
      )}
    </section>
  );
}

export default ProductPage;
