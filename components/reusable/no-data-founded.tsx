import { useTranslations } from "next-intl";

export default function NoDataFounded({ label }: { label?: string }) {
  const tCommon = useTranslations("Common");

  return (
    <p className="py-4 text-secondary text-sm italic underline">
      {label ?? tCommon("NoDataFound")}
    </p>
  );
}
