export const ROUTES = {
  about: "/about",
  essentials: "/essentials",
  favorites: "/favorites",
  newArrivals: "/new-arrivals",
  product: (slug: string) => `/products/${slug}`,
  collection: (slug: string) => `/collections/${slug}`,
  search: (query: string) => `/search?s=${query}`,
} as const;
