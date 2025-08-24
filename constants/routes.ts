export const ROUTES = {
  root: "/",
  about: "/about",
  account: "/account",
  accountOverview: "/account/overview",
  essentials: "/essentials",
  favorites: "/favorites",
  newArrivals: "/new-arrivals",
  product: (slug: string) => `/products/${slug}`,
  collection: (slug: string) => `/collections/${slug}`,
  search: (query: string) => `/search?s=${query}`,
  customerService: "/customer-service",
} as const;
