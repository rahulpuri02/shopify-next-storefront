import { z } from "zod";

const envSchema = z.object({
  Shopify_STORE_DOMAIN: z.string().url(),
  Shopify_Storefront_Access_Token: z.string().min(6),
  NODE_ENV: z.enum(["development", "production", "test"]),
  SHOPIFY_REVALIDATION_SECRET: z.string().min(10),
  OPENAI_API_KEY: z.string().min(10),
  GROQ_API_KEY: z.string().min(10),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv?.error) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit();
}

export const environment = parsedEnv.data;
