import { z } from "zod";

const envSchema = z.object({
  Shopify_STORE_DOMAIN: z.string().url(),
  Shopify_Storefront_Access_Token: z.string().min(6),
  Shopify_GRAPHQL_API_ENDPOINT: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv?.error) {
  console.log("Invalid environment variables:", parsedEnv.error.format());
  process.exit();
}

export const environment = parsedEnv.data;
