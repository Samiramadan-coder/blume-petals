"use client";

import { MotionConfig } from "motion/react";

// Makes every motion element below it honour the OS "reduce motion" setting:
// transform animations are skipped, opacity fades are kept.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
