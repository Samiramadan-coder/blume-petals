import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";

export default function LandingSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "text-sm font-semibold uppercase mb-3 text-secondary",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
