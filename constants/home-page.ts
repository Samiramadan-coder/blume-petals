import {
  HowItWorksStep,
  BouquetBuilderFeature,
  AddOnItem,
  Review,
} from "@/types/home-page";

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
