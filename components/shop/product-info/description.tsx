import { getTranslations } from "next-intl/server";

export async function Description({ description }: { description: string }) {
  const t = await getTranslations("Shop");

  return (
    <div className="max-w-2xl space-y-7">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-foreground">
          {t("ProductDescription")}
        </h3>
        <div
          className="text-sm md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
