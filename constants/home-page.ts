import {
  HowItWorksStep,
  ShopByCategoryItem,
  BouquetBuilderFeature,
  ShopTheMomentCategory,
  FeaturedCollection,
  AddOnItem,
  Review,
} from "@/types/home-page";

export const collections: ShopByCategoryItem[] = [
  {
    key: "Bouquets",
    image: "/images/home/shop-by-category/1.png",
  },
  {
    key: "Preserved",
    image: "/images/home/shop-by-category/2.png",
  },
  {
    key: "Gifting",
    image: "/images/home/shop-by-category/3.png",
  },
  {
    key: "CustomBuilder",
    image: "/images/home/shop-by-category/4.png",
  },
  {
    key: "Seasonal",
    image: "/images/home/shop-by-category/5.png",
  },
];

export const steps: HowItWorksStep[] = [
  {
    id: 1,
    key: "ChooseShape",
    image: "/images/home/how-it-works/1.png",
  },
  {
    id: 2,
    key: "PickFlowers",
    image: "/images/home/how-it-works/2.png",
  },
  {
    id: 3,
    key: "FinishingTouches",
    image: "/images/home/how-it-works/3.png",
  },
  {
    id: 4,
    key: "CraftAndDeliver",
    image: "/images/home/how-it-works/4.png",
  },
];

export const features: BouquetBuilderFeature[] = [
  {
    key: "ChooseShape",
    icon: "❋",
  },
  {
    key: "SelectStem",
    icon: "⊕",
  },
  {
    key: "PickWrapping",
    icon: "⊛",
  },
  {
    key: "AddMessage",
    icon: "✉",
  },
];

export const categories: ShopTheMomentCategory[] = [
  {
    image: "valantine",
    key: "Valentine",
    className: "md:row-span-2",
    href: "/shop",
  },
  {
    image: "birthday",
    key: "Birthday",
    href: "/shop",
  },
  {
    image: "wedding",
    key: "Wedding",
    href: "/shop",
  },
  {
    image: "eid",
    key: "Eid",
    className: "md:row-span-2",
    href: "/shop",
  },
  {
    image: "anniversary",
    key: "Anniversary",
    href: "/shop",
  },
  {
    image: "mother",
    key: "MothersDay",
    href: "/shop",
  },
];

export const featuredCollections: FeaturedCollection[] = [
  {
    id: "golden-hour",
    itemKey: "GoldenHour",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "moonlight-box",
    itemKey: "MoonlightBox",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "dawn-gift",
    itemKey: "DawnGift",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "signature-build",
    itemKey: "SignatureBuild",
    image: "/images/home/hero/bouquet-of-rose.png",
    rating: 4.9,
    reviews: 142,
  },
];

export const addOns: AddOnItem[] = [
  {
    id: "teddy-bear",
    key: "TeddyBear",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "scented-candle",
    key: "ScentedCandle",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "macaron-box",
    key: "MacaronBox",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "greeting-card",
    key: "GreetingCard",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "silk-ribbon",
    key: "SilkRibbon",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: "chocolate-box",
    key: "ChocolateBox",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
];

export const reviews: Review[] = [
  {
    name: "Sara A.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Fatima K.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Leila M.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Nour H.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Amira S.",
    image: "/images/home/reviews/review.png",
  },
];
