import { environment } from "@/environment";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    host: environment.LIVE_STORE_DOMAIN,
  };
}
