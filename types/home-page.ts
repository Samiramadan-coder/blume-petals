export type HowItWorksStep = {
  id: number;
  key: "ChooseShape" | "PickFlowers" | "FinishingTouches" | "CraftAndDeliver";
  image: string;
};

export type BouquetBuilderFeature = {
  key: "ChooseShape" | "SelectStem" | "PickWrapping" | "AddMessage";
  icon: string;
};

export type ShopTheMomentCategory = {
  image:
    | "valantine"
    | "birthday"
    | "wedding"
    | "eid"
    | "anniversary"
    | "mother";
  key:
    | "Valentine"
    | "Birthday"
    | "Wedding"
    | "Eid"
    | "Anniversary"
    | "MothersDay";
  className?: string;
  href: string;
};

export type FeaturedCollection = {
  id: string;
  itemKey: "GoldenHour" | "MoonlightBox" | "DawnGift" | "SignatureBuild";
  image: string;
  rating: number;
  reviews: number;
};

export type AddOnItem = {
  id: string;
  key:
    | "TeddyBear"
    | "ScentedCandle"
    | "MacaronBox"
    | "GreetingCard"
    | "SilkRibbon"
    | "ChocolateBox";
  image: string;
};

export type Review = {
  name: string;
  image: string;
};
