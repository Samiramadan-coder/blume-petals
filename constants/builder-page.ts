import { BouquetShapes, BouquetSizes } from "@/types/builder-page";

export const bouquetShapes: BouquetShapes[] = [
  {
    label: "Circular",
    value: "circular",
    image: "/images/builder/circular.png",
    price: 25,
  },
  {
    label: "Heart",
    value: "heart",
    image: "/images/builder/heart.png",
    price: 30,
  },
  {
    label: "Pyramid",
    value: "pyramid",
    image: "/images/builder/pyramid.png",
    price: 35,
  },
  {
    label: "Cascading",
    value: "cascading",
    image: "/images/builder/cascading.png",
    price: 40,
  },
  {
    label: "Basket",
    value: "basket",
    image: "/images/builder/basket.png",
    price: 45,
  },
  {
    label: "Box",
    value: "box",
    image: "/images/builder/box.png",
    price: 50,
  },
];

export const bouquetSizes: BouquetSizes[] = [
  {
    label: "S",
    value: "small",
    price: 25,
    numberOfFlowers: 8,
  },
  {
    label: "M",
    value: "medium",
    price: 35,
    numberOfFlowers: 12,
  },
  {
    label: "L",
    value: "large",
    price: 45,
    numberOfFlowers: 18,
  },
  {
    label: "XL",
    value: "extra-large",
    price: 55,
    numberOfFlowers: 24,
  },
];
