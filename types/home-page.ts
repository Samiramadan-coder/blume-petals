export type HowItWorksStep = {
  id: number;
  key: "ChooseShape" | "PickFlowers" | "FinishingTouches" | "CraftAndDeliver";
  image: string;
};

export type BouquetBuilderFeature = {
  key: "ChooseShape" | "SelectStem" | "PickWrapping" | "AddMessage";
  icon: string;
};

export type Review = {
  name: string;
  image: string;
};
