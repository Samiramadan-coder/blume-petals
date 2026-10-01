import { cn } from "@/lib/utils";
import { reveal } from "@/lib/motion";
import * as motion from "motion/react-client";
import { useLocale } from "next-intl";

export default function AboutTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const locale = useLocale();

  return (
    <motion.h2
      {...reveal({ y: 12, delay: 0.06, amount: 0.25 })}
      className={cn(
        "font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8",
        className,
        { "font-heading": locale === "en" },
      )}
    >
      {children}
    </motion.h2>
  );
}
