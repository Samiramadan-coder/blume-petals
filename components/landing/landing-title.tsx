"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import * as motion from "motion/react-client";

export default function LandingTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const locale = useLocale();

  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={cn(
        "font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12",
        className,
        {
          "font-heading": locale === "en",
        },
      )}
    >
      {children}
    </motion.h2>
  );
}
