import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '@/constants/shopify';
import { environment } from '@/environment';
import type { ExtractVariables } from '@/types/shopify/types';

export async function shopifyFetch<T>({
  cache = 'force-cache',
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
    const endpoint = `${environment.Shopify_STORE_DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': environment.Shopify_Storefront_Access_Token,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });
    const body = await result.json();
    if (!result.ok || body?.errors?.length) {
      throw { status: result.status, message: body?.errors[0].message };
    }
    return {
      status: result.status,
      body,
    };
  } catch (error) {
    throw {
      error,
      query,
    };
  }
}
