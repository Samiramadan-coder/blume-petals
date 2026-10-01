import { cn } from "@/lib/utils";
import { reveal } from "@/lib/motion";
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
      {...reveal({ y: 12, amount: 0.15 })}
      className={cn(
        "text-xs font-semibold uppercase mb-3 text-secondary tracking-[0.2rem]",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
