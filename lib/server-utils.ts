import "server-only";

import { SHOPIFY_URL_PREFIXS, TAGS } from "@/constants/shopify";
import { environment } from "@/environment";
import type { Cart, Collection, ColorGroup, Customer, Menu, Product } from "@/types/shared";
import type {
  ShopifyCartOperation,
  ShopifyCollectionOperation,
  ShopifyCollectionsOperation,
  ShopifyGetCustomerOperation,
  ShopifyMenuOperation,
  ShopifyProductOperation,
  ShopifyProductVariant,
  ShopifyRecommendedProductsOperation,
  ShopifySearchResultsOperation,
  ShopifySearchVariables,
} from "@/types/shopify";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { type SafeParseError } from "zod";
import { formatPrice, getColorCodeByName } from "./utils";

export function getZodFirstErrorMessage<T>(obj: SafeParseError<T>) {
  return (Object.entries(obj.error.flatten().fieldErrors)[0][1] as string[])[0];
}

export function getSearchFilters(query: {
  [key: string]: string | undefined;
}): ShopifySearchVariables {
  const sort = (query.sort as string)?.toUpperCase() === "PRICE" ? "PRICE" : "RELEVANCE";
  const priceFilter = query?.price ? (query?.price === "min" ? { min: 1 } : { max: 200000 }) : null;
  const filters = [];

  if (query.size) {
    filters.push({
      variantOption: { name: "Size", value: query.size },
    });
  }

  if (query.color) {
    filters.push({
      variantOption: { name: "Color", value: query.color },
    });
  }

  if (priceFilter) {
    filters.push({
      price: priceFilter,
    });
  }

  if (query.category) {
    filters.push({
      category: { id: query.category },
    });
  }

  return {
    query: query.s as string,
    productFilters: filters,
    first: 50,
    sortKey: sort,
  };
}

export function reshapeMenus(response: ShopifyMenuOperation): Menu[] {
  const items = response.data.menu?.items;
  if (!items) return [];
  return (
    items.map((item) => ({
      title: item.title.trim(),
      path: item.url
        .replace(environment.Shopify_STORE_DOMAIN ?? "", "")
        .replace(SHOPIFY_URL_PREFIXS.pages, "")
        .replace(SHOPIFY_URL_PREFIXS.collections, ""),
      items:
        item.items?.map((subItem) => ({
          title: subItem.title.trim(),
          path: subItem.url
            .replace(environment.Shopify_STORE_DOMAIN ?? "", "")
            .replace(SHOPIFY_URL_PREFIXS.pages, "")
            .replace(SHOPIFY_URL_PREFIXS.collections, ""),
        })) || [],
    })) || []
  );
}

function getProductVariants(variants: ShopifyProductVariant): ColorGroup[] {
  const colorGroups: Record<string, ColorGroup> = {};

  for (const { node: variant } of variants.edges) {
    const colorOpt = variant?.selectedOptions?.find((opt) => opt.name.toLowerCase() === "color");

    const sizeOpt = variant.selectedOptions?.find((opt) => opt.name.toLowerCase() === "size");

    if (!colorOpt || !sizeOpt) continue;
    const [colorName, initialColorCode] = colorOpt.value.split("|");
    const colorCode = initialColorCode || (getColorCodeByName(colorName) as string);

    const colorKey = colorName.toLowerCase();

    if (!colorGroups[colorKey]) {
      colorGroups[colorKey] = {
        colorName,
        colorCode,
        availableSizes: [],
      };
    }

    if (!variant.availableForSale) continue;

    const sizes = colorGroups[colorKey].availableSizes;
    const existingSize = sizes.find((s) => s.name === sizeOpt.value);

    if (existingSize) {
      existingSize.stock += 1;
    } else {
      sizes.push({ name: sizeOpt.value, stock: 1, variantId: variant.id });
    }
  }

  return Object.values(colorGroups);
}

export function reshapeCollection(response: ShopifyCollectionOperation): Collection | null {
  const collection = response.data.collection;
  if (!collection) return null;

  return {
    title: collection.title.trim(),
    description: collection.description.trim(),
    descriptionHtml: collection.descriptionHtml,
    products: collection.products.edges.map(({ node: product }) => {
      const firstImage = product.images.edges[0]?.node || null;

      const formattedPrice = product.priceRange?.minVariantPrice?.amount
        ? formatPrice(product.priceRange.minVariantPrice)
        : null;

      return {
        id: product.id,
        title: product.title.trim(),
        handle: product.handle,
        imageUrl: firstImage?.url || null,
        imageAlt: firstImage?.altText || null,
        price: formattedPrice,
        variants: getProductVariants(product.variants),
      };
    }),
  };
}

export function reshapeCollections(
  response: ShopifyCollectionsOperation,
  { key, value }: Record<string, string>
) {
  const collections = response.data.collections.edges.map((collection) => ({
    id: collection.node.id,
    title: collection.node.title.trim(),
    handle: collection.node.handle,
    imageUrl: collection.node.image?.url || null,
    imageAlt: collection.node.image?.altText || null,
    metafield: collection.node.metafield,
    description: collection.node.description.trim(),
  }));
  return collections.filter(
    (collection) => collection.metafield?.key === key && collection.metafield.value === value
  );
}

export function reshapeProduct(
  response: ShopifyProductOperation
): (Product & { imageUrl: string; imageAlt?: string | null }) | null {
  const product = response.data.product;
  if (!product) return null;
  const formattedPrice = product.priceRange?.minVariantPrice?.amount
    ? formatPrice(product.priceRange.minVariantPrice)
    : null;
  return {
    id: product.id,
    title: product.title.trim(),
    description: product.description.trim(),
    handle: product.handle,
    images: product.images.edges.map(({ node }) => ({
      url: node.url,
      altText: node.altText,
    })),
    imageUrl: product.images.edges[0].node.url,
    imageAlt: product.images.edges[0].node.altText,
    price: formattedPrice,
    variants: getProductVariants(product.variants),
  };
}

export function reshapeProducts(
  response: ShopifyRecommendedProductsOperation
): Collection["products"] {
  if (!response?.data?.productRecommendations.length) return [];
  return response.data.productRecommendations
    .map((product) => {
      if (!product) return null;
      const firstImage = product.images.edges[0]?.node || null;

      const formattedPrice = product.priceRange?.minVariantPrice?.amount
        ? formatPrice(product.priceRange.minVariantPrice)
        : null;

      return {
        id: product.id,
        title: product.title.trim(),
        handle: product.handle,
        imageUrl: firstImage?.url || null,
        imageAlt: firstImage?.altText || null,
        price: formattedPrice,
        variants: getProductVariants(product.variants),
      };
    })
    .filter((item) => item !== null);
}

export function reshapeSearchResults(
  response: ShopifySearchResultsOperation
): Collection["products"] {
  if (!response?.data?.search?.edges?.length) return [];
  return response.data.search.edges
    .map(({ node: product }) => {
      if (!product || !Object.keys(product)?.length) return null;
      const firstImage = product.featuredImage;

      const formattedPrice = product.priceRange?.minVariantPrice
        ? formatPrice(product.priceRange.minVariantPrice)
        : null;

      return {
        id: product.id,
        title: product.title.trim(),
        handle: product.handle,
        imageUrl: firstImage?.url || null,
        imageAlt: firstImage?.altText || null,
        price: formattedPrice,
        variants: getProductVariants(product.variants),
      };
    })
    .filter((item) => item !== null);
}

export function reshapeCart(responseCart: ShopifyCartOperation["data"]["cart"]): Cart {
  const items = responseCart.lines.edges.map(({ node: item }) => ({
    id: item.id,
    title: item.merchandise.product.title,
    price: item.merchandise.price,
    merchandiseId: item.merchandise.id,
    outOfStock: item.merchandise.currentlyNotInStock,
    totalCost: item.estimatedCost.totalAmount,
    subTotal: item.estimatedCost.subtotalAmount,
    imageUrl: item.merchandise.image?.url,
    imageAlt: item.merchandise.image?.altText,
    selectedColor: item.merchandise.selectedOptions.find(
      (opt) => opt.name.toLowerCase() === "color"
    )?.value,
    selectedSize: item.merchandise.selectedOptions.find((opt) => opt.name.toLowerCase() === "size")
      ?.value,
    quantity: item.quantity,
  }));

  return {
    cartId: responseCart.id,
    checkoutUrl: responseCart.checkoutUrl,
    totalAmount: responseCart.cost.totalAmount,
    subTotal: responseCart.cost.subtotalAmount,
    items,
  };
}

export function reshapeCustomer(
  responseCustomer: ShopifyGetCustomerOperation["data"]["customer"]
): Customer {
  const addressEdges = responseCustomer.addresses.edges;
  return {
    ...responseCustomer,
    addresses: addressEdges.map((edge) => edge.node),
    defaultAddress: addressEdges[0]?.node,
  };
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ["collections/create", "collections/delete", "collections/update"];
  const productWebhooks = ["products/create", "products/delete", "products/update"];
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }
  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
