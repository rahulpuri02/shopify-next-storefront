export const FILTER_OPERATIONS = {
  include: "include",
  exclude: "exclude",
} as const;

export const GENERICS = {
  shop: "shop",
  color: "color",
  about: "about",
  aboutUs: "about us",
  newArrivals: "new arrivals",
  essentials: "essentials",
  freeShipping: "Free Shipping",
  searchPath: "/search",
  searchResult: "Search Result",
  shopNow: "SHOP NOW",
  seeAll: "see all",
  bag: "Bag",
  recommendForYou: "Recommended for you",
  notResultFound: "No results found",
};

export const NO_IMAGE_FOUND = "No image found";
export const DEFAULT_IMAGE_ALT = "image";

export const FallbackImage = "/placeholder.jpg";
export const MAIN_BANNER_POSTER = "/cn74-hero-video_poster.jpg";

export const BANNER_VIDEO_URL =
  "https://res.cloudinary.com/dlt5cfo8m/video/upload/v1748716911/cn74-hero-video_wpyd2i.mp4";

export const FOOTER = {
  signUpNewsletter: "Sign up for CN. 74 newsletter",
  emailPlaceholder: "EMAIL",
  thanksForSubscribing: "Thank you for subscribing!",
  termsLabel: "I have read, understood and accepted the terms and conditions.",
  siteAuthor: "SITE BY RAHUL PURI",
  authorContact: "https://linkedin.com/in/rahulpuri02",
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

export const COLOR_CODES = [
  {
    name: "Denim Grey",
    code: "#4B5563",
  },
  {
    name: "Denim Blue",
    code: "#1E3A8A",
  },
  {
    name: "Dark Denim Blue",
    code: "#1E40AF",
  },
  {
    name: "Black",
    code: "#000000",
  },
  {
    name: "White",
    code: "#FFFFFF",
  },

  {
    name: "Blue",
    code: "#3B82F6",
  },
  {
    name: "Red",
    code: "#EF4444",
  },
  {
    name: "Green",
    code: "#10B981",
  },
  {
    name: "Yellow",
    code: "#F59E0B",
  },
  {
    name: "Grey",
    code: "#9CA3AF",
  },
  {
    name: "Purple",
    code: "#8B5CF6",
  },
];

export const STATIC_MOBILE_MENU_ITEMS = [
  { title: "my account", hasChilds: false, items: [] },
  { title: "About Us", hasChilds: true, items: [], path: "/about" },
];

export const SHIPPING_NOTE =
  "SAME DAY DISPATCH - ORDER BEFORE 3 PM IST / FREE SHIPPING ABOVE ₹ 999";

export const SUGGESTIONS = ["Jeans", "T-shirts", "Trousers", "Jackets", "New Arrivals", "Shirts"];
export const ADD_TO_CART = "Add to Cart";
export const ADDING = "Adding";

export const CUSTOMER_SERVICE = {
  title: "Customer Service",
  description:
    "Seeking answers to your order status, have questions about shipping or returns. You can find answers to frequently asked questions and contact our customer service here.",
  handle: "customer-service-menu",
} as const;

export const CART = {
  currency: "₹",
  total: "Total:",
  goToCheckout: "Go to Checkout",
  leftForFreeShipping: "left for free shipping",
  remove: "Remove",
  emptyCartMessage: "Your cart is empty!",
  continueShopping: "Continue Shopping",
} as const;

export const SIZE_SELECTION_STOCK_NOTE =
  "Note that you can choose a size that is out of stock and get notified whenit gets back in stock.";

export const MENS_CLOTHING_TITLE = "MEN'S CLOTHING";

export const MENS_CLOTHING_DESCRIPTION =
  "Check out all the freshest styles your closet needs in our men's clothing range. Discover our collection of simple and sober men's clothing, perfect for building a versatile wardrobe. We focus on everyday essentials from comfortable tops and T-shirts to classic pants in staple colors. Need a refined touch? Our select blazers and shirts offer understated elegance. When the weather shifts, our jackets provide practical coverage without compromising on a clean aesthetic.";

export const COLLECTION_PRODUCT_IMAGES_COUNT = 2;

export const DEFAULT_PRODUCTS_SEARCH_COUNT = 50;

export const PATHS = {
  CUSTOMER_SERVICE: "customer-service",
  SOCIAL_INDICATOR: "#",
} as const;

export const SOCIAL_DOMAINS = {
  facebook: "facebook",
  twitter: "twitter",
  instagram: "instagram",
  linkedin: "linkedin",
  youtube: "youtube",
} as const;

export const FAQ_PAGE = {
  title: "FAQ",
  items: [
    {
      value: "ordering",
      trigger: "ORDERING",
      content: [
        {
          question: "CAN I CHANGE AN ORDER I HAVE ALREADY PLACED?",
          answer:
            "No, already placed orders cannot be changed. Please place a new order containing the right items and contact customer service to cancel the faulty order.",
        },
      ],
    },
    {
      value: "taxes",
      trigger: "TAXES AND DUTIES",
      content:
        "Duties and taxes may apply depending on your country. You’ll see any applicable charges at checkout.",
    },
    {
      value: "order-status",
      trigger: "ORDER STATUS",
      content:
        "You can check your order status by logging into your account or using the tracking link in your confirmation email.",
    },
  ],
} as const;
