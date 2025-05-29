import { environment } from "@/environment";
import { ExtractVariables } from "@/types/shopify/types";

export const isShopifyError = (error: any): boolean => false;
export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T | never }> {
  try {
    const result = await fetch(environment.SHOPIFY_GRAPHQL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "X-Shopify-Storefront-Access-Token":
          environment.Shopify_Storefront_Access_Token,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { ...variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error: any) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || "Unknown",
        status: error.status || 500,
        message: error.message,
        query,
      };
    }
    throw {
      error,
      query,
    };
  }
}
