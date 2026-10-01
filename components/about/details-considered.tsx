import * as motion from "motion/react-client";

import AppLogo from "../reusable/app-logo";

import { getTranslations } from "next-intl/server";
import { alternateX, reveal, stagger } from "@/lib/motion";

const palette = [
  {
    key: "Gold",
    className: "bg-primary",
  },
  {
    key: "Sage",
    className: "bg-[#7d947b]",
  },
  {
    key: "Beige",
    className: "bg-border",
  },
  {
    key: "Terracotta",
    className: "bg-[#ed8074]",
  },
] as const;

export default async function DetailsConsidered() {
  const t = await getTranslations("AboutDetailsConsidered");

  return (
    <section className="overflow-hidden bg-border">
      <div className="container max-w-7xl">
        <div className="flex flex-col items-center gap-6 py-20 text-center">
          <motion.div {...reveal({ y: 8, amount: 0.5 })}>
            <AppLogo width={120} preload={false} />
          </motion.div>

          <motion.p
            {...reveal({ x: -10, delay: 0.06, amount: 0.4 })}
            className="text-sm italic text-foreground/50"
          >
            {t("Statement")}
          </motion.p>

          <ul className="flex flex-wrap items-center justify-center gap-6">
            {palette.map((item, index) => (
              <motion.li
                key={item.key}
                {...reveal({
                  x: alternateX(index),
                  delay: stagger(index),
                  amount: 0.3,
                })}
                className="flex flex-col items-center gap-2"
              >
                <div
                  aria-hidden="true"
                  className={`size-10 rounded-full border-2 border-white shadow-md ${item.className}`}
                />

                <span className="text-[11px] font-medium text-foreground/50">
                  {t(`Palette.${item.key}`)}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            {...reveal({ delay: 0.12 })}
            className="text-xs tracking-wide text-foreground/40"
          >
            {t("Caption")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
