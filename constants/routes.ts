export const ROUTES = {
  search: "/search",
  essentials: "/essentials",
  newArrivals: "/new-arrivals",
  product: (slug: string) => `/products/${slug}`,
  collection: (slug: string) => `/collections/${slug}`,
} as const;
