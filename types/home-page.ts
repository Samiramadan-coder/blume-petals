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
    items: {
      title: string | null;
      subtitle: string | null;
      icon: string | null;
    }[];
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

export type AboutPageSections = {
  hero: {
    image: string | null;
    subtitle: string | null;
    title: string | null;
  };
  who_we_are: {
    description: string | null;
    image: string | null;
    subtitle: string | null;
    title: string | null;
  };
  our_promise: {
    subtitle: string | null;
    title: string | null;
    items: {
      description: string | null;
      icon: string | null;
      title: string | null;
    }[];
  };
};
