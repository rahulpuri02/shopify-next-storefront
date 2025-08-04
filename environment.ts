import { z } from "zod";

const envSchema = z.object({
  Shopify_STORE_DOMAIN: z.string().url(),
  Shopify_Storefront_Access_Token: z.string().min(6),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv?.error) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit();
}

export const environment = parsedEnv.data;
