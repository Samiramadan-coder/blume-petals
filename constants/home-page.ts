import {
  HowItWorksStep,
  BouquetBuilderFeature,
  Review,
} from "@/types/home-page";

export const steps: HowItWorksStep[] = [
  {
    id: 1,
    key: "ChooseShape",
    image: "/images/home/how-it-works/1.webp",
  },
  {
    id: 2,
    key: "PickFlowers",
    image: "/images/home/how-it-works/2.webp",
  },
  {
    id: 3,
    key: "FinishingTouches",
    image: "/images/home/how-it-works/3.webp",
  },
  {
    id: 4,
    key: "CraftAndDeliver",
    image: "/images/home/how-it-works/4.webp",
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

export const reviews: Review[] = [
  {
    name: "Sara A.",
    image: "/images/home/reviews/review.webp",
  },
  {
    name: "Fatima K.",
    image: "/images/home/reviews/review.webp",
  },
  {
    name: "Leila M.",
    image: "/images/home/reviews/review.webp",
  },
  {
    name: "Nour H.",
    image: "/images/home/reviews/review.webp",
  },
  {
    name: "Amira S.",
    image: "/images/home/reviews/review.webp",
  },
];
