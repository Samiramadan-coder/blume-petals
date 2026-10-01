import { cn } from "@/lib/utils";
import { reveal } from "@/lib/motion";
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
      {...reveal({ y: 12, delay: 0.06, amount: 0.15 })}
      className={cn(
        "font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12",
        className,
        { "font-heading": locale === "en" },
      )}
    >
      {children}
    </motion.h2>
  );
}
