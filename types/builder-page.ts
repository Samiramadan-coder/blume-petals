export type BuilderFormData = {
  bouquetShape:
    | "circular"
    | "heart"
    | "pyramid"
    | "cascading"
    | "basket"
    | "box";
  size: "small" | "medium" | "large" | "extra-large";
};

export type BouquetShapes = {
  label: "Circular" | "Heart" | "Pyramid" | "Cascading" | "Basket" | "Box";
  value: BuilderFormData["bouquetShape"];
  image: string;
  price: number;
};

export type BouquetSizes = {
  label: "S" | "M" | "L" | "XL";
  value: BuilderFormData["size"];
  price: number;
  numberOfFlowers: number;
};
