import { getTranslations } from "next-intl/server";

export async function Delivery() {
  const t = await getTranslations("Shop");

  const methods = [
    t("ShippingMethod1"),
    t("ShippingMethod2"),
    t("ShippingMethod3"),
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-foreground">
          {t("EstimatedDeliveryTime")}
        </h3>
        <p className="text-sm text-muted-foreground">{t("workingDays")}</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-base font-semibold text-foreground">
          {t("ShippingMethods")}
        </h4>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
