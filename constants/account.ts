type T = (key: string) => string;

export const links = (t: T) => [
  {
    label: t("MyProfile"),
    href: "/account/profile",
  },
  {
    label: t("MyOrders"),
    href: "/account/orders",
  },
  {
    label: t("MyDesigns"),
    href: "/account/designs",
  },
  {
    label: t("SavedAddresses"),
    href: "/account/addresses",
  },
  {
    label: t("Settings"),
    href: "/account/settings",
  },
];
