import { Bell, Globe, Mail, MessageSquare } from "lucide-react";
import { createElement } from "react";

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

export const accountItems = (t: T) => [
  { title: t("EditProfile"), href: "/account/profile" },
  { title: t("SavedAddresses"), href: "/account/addresses" },
  { title: t("PaymentMethods"), href: "/account/payment-methods" },
  { title: t("ChangePassword"), href: "/account/change-password" },
];

export const preferencesItems = (t: T) => [
  {
    title: t("Language"),
    type: "locale",
    icon: createElement(Globe, { className: "size-5 text-primary" }),
  },
  {
    title: t("EmailNotifications"),
    type: "email",
    icon: createElement(Mail, { className: "size-5 text-primary" }),
  },
  {
    title: t("PushAlerts"),
    type: "push",
    icon: createElement(Bell, { className: "size-5 text-primary" }),
  },
  {
    title: t("SMSAlerts"),
    type: "sms",
    icon: createElement(MessageSquare, { className: "size-5 text-primary" }),
  },
];

export const supportItems = (t: T) => [
  { title: t("HelpCenter"), href: "/account/help-center" },
  { title: t("ContactUs"), href: "/account/contact-support" },
  { title: t("PrivacyPolicy"), href: "/account/privacy-policy" },
  { title: t("TermsOfService"), href: "/account/terms-of-service" },
];
