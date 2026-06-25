import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

export default function LandingTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={cn(
        "font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12",
        className,
      )}
    >
      {children}
    </motion.h2>
  );
}
