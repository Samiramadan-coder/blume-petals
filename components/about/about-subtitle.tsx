import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

export default function AboutSubtitle({
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
        "text-xs font-semibold uppercase mb-3 tracking-[0.3em] text-primary",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
