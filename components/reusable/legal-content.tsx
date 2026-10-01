import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";

// The CMS repeats the page title as a bold first paragraph. The page renders
// its own <h1>, so that duplicate is dropped.
const LEADING_TITLE = /^\s*<p>\s*<strong>[^<]*<\/strong>\s*<\/p>/;

export default async function LegalContent({
  title,
  html,
}: {
  title: string;
  html: string | null;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Common");

  const content = (html ?? "").replace(LEADING_TITLE, "").trim();
  const isEmpty = content.replace(/<[^>]*>/g, "").trim() === "";

  return (
    <main className="container max-w-7xl py-20 min-h-[50vh]">
      <article className="max-w-3xl">
        <h1
          className={cn("text-3xl font-bold", {
            "font-heading": locale === "en",
          })}
        >
          {title}
        </h1>

        {isEmpty ? (
          <p className="mt-6 text-muted-foreground">{t("NoDataFound")}</p>
        ) : (
          <div
            className="rich-content mt-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </article>
    </main>
  );
}
