import "server-only";

import { SHOPIFY_URL_PREFIXS, TAGS } from "@/constants/shopify";
import { environment } from "@/environment";
import type { Collection, Menu, Product } from "@/types/shared";
import type {
  ShopifyCollectionOperation,
  ShopifyCollectionsOperation,
  ShopifyMenuOperation,
  ShopifyProductOperation,
} from "@/types/shopify";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { formatPrice, getColorCodeByName } from "./utils";

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

      const colorGroups: Record<
        string,
        {
          colorName: string;
          colorCode: string | null;
          availableSizes: { name: string; stock: number }[];
        }
      > = {};

      for (const { node: variant } of product.variants.edges) {
        const colorOption = variant.selectedOptions.find(
          (opt) => opt.name.toLowerCase() === "color"
        );
        const sizeOption = variant.selectedOptions.find((opt) => opt.name.toLowerCase() === "size");

        if (!colorOption || !sizeOption) continue;

        let colorName = colorOption.value;
        let colorCode: string | null = null;

        if (colorName.includes("|")) {
          [colorName, colorCode] = colorName.split("|");
        } else {
          colorCode = getColorCodeByName(colorName);
        }

        const colorKey = colorName.toLowerCase();

        if (!colorGroups[colorKey]) {
          colorGroups[colorKey] = {
            colorName,
            colorCode,
            availableSizes: [],
          };
        }

        if (!variant.availableForSale) continue;

        const sizeList = colorGroups[colorKey].availableSizes;
        const existing = sizeList.find((size) => size.name === sizeOption.value);

        if (existing) {
          existing.stock += 1;
        } else {
          sizeList.push({ name: sizeOption.value, stock: 1 });
        }
      }

      return {
        id: product.id,
        title: product.title.trim(),
        handle: product.handle,
        imageUrl: firstImage?.url || null,
        imageAlt: firstImage?.altText || null,
        price: formattedPrice,
        variants: Object.values(colorGroups),
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

export function reshapeProduct(response: ShopifyProductOperation): Product | null {
  const product = response.data.product;
  if (!product) return null;

  return {
    id: product.id,
    title: product.title.trim(),
    description: product.description.trim(),
    handle: product.handle,
    tags: product.tags,
    images: product.images.edges.map(({ node }) => ({
      url: node.url,
      altText: node.altText,
    })),
    // @ts-expect-error - Variants may not have a colorName or colorCode
    variants: product.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      price: {
        amount: node.price.amount,
        currencyCode: node.price.currencyCode,
      },
    })),
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
  revalidatePath("/");

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
