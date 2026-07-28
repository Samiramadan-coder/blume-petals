import { useTranslations } from "next-intl";

export default function NoDataFounded() {
  const tCommon = useTranslations("Common");

  return (
    <p className="py-4 text-secondary text-sm italic underline">
      {tCommon("NoDataFound")}
    </p>
  );
}
