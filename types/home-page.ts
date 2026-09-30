export type HowItWorksStep = {
  id: number;
  key: "ChooseShape" | "PickFlowers" | "FinishingTouches" | "CraftAndDeliver";
  image: string;
};

export type BouquetBuilderFeature = {
  key: "ChooseShape" | "SelectStem" | "PickWrapping" | "AddMessage";
  icon: string;
};

export type HomePageSections = {
  hero: {
    description: string | null;
    image: null | string;
    subtitle: string | null;
    title: string | null;
  };
  categories: {
    title: string | null;
    subtitle: null | string;
  };
  how_it_works: {
    title: string | null;
    subtitle: null | string;
    items: {
      description: string | null;
      image: null | string;
      title: string | null;
    }[];
  };
  bouquet_builder: {
    subtitle: string | null;
    title: string | null;
    description: string | null;
    items: [];
  };
  shop_the_moment: {
    title: string | null;
    subtitle: null | string;
  };
  our_selection: {
    title: string | null;
    subtitle: null | string;
  };
  real_creations: {
    title: string | null;
    subtitle: null | string;
    description: string | null;
  };
};
