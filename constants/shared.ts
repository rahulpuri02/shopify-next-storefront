export const FILTER_OPERATIONS = {
  include: "include",
  exclude: "exclude",
} as const;

export const GENERICS = {
  shop: "shop",
  color: "color",
  newArrivals: "new arrivals",
  essentials: "essentials",
  seeAll: "see all",
  styleWith: "style with",
  bag: "Bag",
  recommendForYou: "Recommended for you",
  notResultFound: "No results found",
};

export const NO_IMAGE_FOUND = "No image found";
export const EXPLORE_NOW = "Explore Now";
export const DEFAULT_IMAGE_ALT = "image";

export const FallbackImage = "/placeholder.jpg";
export const MAIN_BANNER_POSTER = "/cn74-hero-video_poster.jpg";

export const BANNER_VIDEO_URL =
  "https://res.cloudinary.com/dlt5cfo8m/video/upload/v1748716911/cn74-hero-video_wpyd2i.mp4";

export const EXPLORER_BANNER = {
  imageSrc: "/explore-all-banner-2.avif",
  imgAlt: "explore-banner-image",
  title: "Weclome to Our World",
  description: "Browse our complete collection of elevated essentials and modern classics.",
};

export const FOOTER = {
  signUpNewsletter: "Sign up for CN. 74 newsletter",
  emailPlaceholder: "EMAIL",
  termsLabel: "I have read, understood and accepted the terms and conditions.",
  languageSelector: "WORLD WIDE (ENGLISH)",
} as const;

export const PRODUCT_INFO = {
  sections: ["fitDetails", "materialCare", "shippingPayments"] as const,

  titles: {
    fitDetails: "FIT & DETAILS",
    materialCare: "MATERIAL & CARE",
    shippingPayments: "SHIPPING & PAYMENTS",
  },

  content: {
    fitDetails: {
      list: [
        "Regular fit",
        "Fil coupé jacquard",
        "LENZING™ ECOVERO™ Viscose",
        "Style number 2545025511",
        "Made in Turkey",
      ],
      extra: "Model is 186 cm / 6'1 and is wearing a size M",
    },

    materialCare: {
      description:
        "30 degrees – Washing at 30 degrees instead of 40 will save around 40% energy in a year. Air out your clothes. You don’t need to wash your clothes after wearing them just once. Hanging the clothes outside to air is often enough to regain a fresh feeling.",
      list: ["🚫 Do Not Bleach", "🚫 Do Not Tumble Dry"],
    },

    shippingPayments: {
      list: [
        "Google Pay accepted and COD available",
        "Free delivery above ₹ 999",
        "Order before 3 PM for same day dispatch",
        "7-day free return policy",
      ],
    },
  },
};

export const STATIC_MOBILE_MENU_ITEMS = [
  { title: "brand", hasChilds: true },
  { title: "my account", hasChilds: false, items: [] },
  { title: "assistance", hasChilds: true, items: [] },
];
export const SHIPPING_NOTE =
  "SAME DAY DISPATCH - ORDER BEFORE 3 PM IST / FREE SHIPPING ABOVE ₹ 999";

export const ADD_TO_CART = "Add to Cart";
export const ADDING = "Adding";

export const CART = {
  currency: "₹",
  total: "Total:",
  goToCheckout: "Go to Checkout",
  leftForFreeShipping: "left for free shipping",
  remove: "Remove",
} as const;
