import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { reveal } from "@/lib/motion";

export default function AboutSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      {...reveal({ y: 12, amount: 0.25 })}
      className={cn(
        "text-xs font-semibold uppercase mb-3 tracking-[0.3em] text-primary",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
