import * as motion from "motion/react-client";

import AppLogo from "../reusable/app-logo";

import { getTranslations } from "next-intl/server";

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
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AppLogo width={120} />
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              x: -8,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-sm italic text-foreground/50"
          >
            {t("Statement")}
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {palette.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -8 : 8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`size-10 rounded-full border-2 border-white shadow-md ${item.className}`}
                />

                <span className="text-[11px] font-medium text-foreground/50">
                  {t(`Palette.${item.key}`)}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="text-xs tracking-wide text-foreground/40"
          >
            {t("Caption")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
