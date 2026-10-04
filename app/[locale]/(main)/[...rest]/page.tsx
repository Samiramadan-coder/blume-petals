import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("NotFound");

  return {
    title: t("Eyebrow"),
  };
}

// Unknown URLs don't match any route, so Next.js would answer them with its
// built-in 404. Catching them here renders the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
