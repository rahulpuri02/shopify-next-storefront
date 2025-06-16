export const SHOPIFY_URL_PREFIXS = {
  collections: "/collections",
  pages: "/pages",
} as const;

export const TAGS = {
  collections: "collections",
} as const;

export const COLLECTIONS = {
  refreshYourWardrobe: "refresh-your-wardrobe",
  ralphLauren: "ralph-lauren",
} as const;

export const MENUS = {
  mainMenu: "main-menu",
} as const;

export const LEFT_SIDE_MENU = {
  shop: "Shop",
  search: "Search",
};

export const HIGHLIGHT_MENUS = ["essentials", "new arrivals"] as const;

export const STORE_NAME = { shortName: "CN. 74", fullName: "Calm & Noble" } as const;

export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2025-04/graphql.json";

export const DEFAULT_COLLECTIONS_COUNT = 50;
export const DEFAULT_PRODUCTS_COUNT = 50;
export const DEFAULT_IMAGES_COUNT = 10;

export const SHOPIFY_CUSTOM_METAFIELDS = {
  name: "custom",
  collections: {
    homepageType: { key: "homepage_type", values: { highlights: "highlights" } },
  },
};
