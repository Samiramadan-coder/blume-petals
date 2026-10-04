import { cache } from "react";
import { http } from "@/lib/http";
import { AppSettings, Category, Occasion } from "@/types/landing";
import { AboutPageSections, HomePageSections } from "@/types/home-page";

// Fetch categories and app settings from the API with caching.
export const getCategories = cache(async () => {
  const { data, ok } = await http.get<{
    data: { items: Category[] };
  }>("/api/v1/categories", {
    next: { revalidate: 60 },
  });

  if (!ok) {
    throw new Error("Failed to fetch categories");
  }

  return data.data.items;
});

// Fetch app settings from the API with caching.
export const getSettings = cache(async () => {
  const { data, ok } = await http.get<{
    data: AppSettings;
  }>("/api/v1/settings", {
    next: { revalidate: 300 },
  });

  if (!ok) {
    throw new Error("Failed to fetch settings");
  }

  return data.data;
});

// Fetch occasions from the API with caching.
export const getOccasions = cache(async () => {
  const { data, ok } = await http.get<{
    data: { items: Occasion[] };
  }>("/api/v1/occasions", {
    next: { revalidate: 60 },
  });

  if (!ok) {
    throw new Error("Failed to fetch occasions");
  }

  return data.data.items;
});

// Fetch Home Sections from the API with caching.
export const getHomeSections = cache(async () => {
  const { data, ok } = await http.get<{
    data: { sections: HomePageSections };
  }>("/api/v1/pages/home", {
    next: { revalidate: 300 },
  });

  if (!ok) {
    throw new Error("Failed to fetch home sections");
  }

  return data.data.sections;
});

// Fetch About Sections from the API with caching.
export const getAboutSections = cache(async () => {
  const { data, ok } = await http.get<{
    data: { sections: AboutPageSections };
  }>("/api/v1/pages/about", {
    next: { revalidate: 300 },
  });

  if (!ok) {
    throw new Error("Failed to fetch about sections");
  }

  return data.data.sections;
});
