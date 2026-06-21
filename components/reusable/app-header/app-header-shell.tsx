"use client";

import { usePathname } from "@/i18n/navigation";
import { useIsScroll } from "@/hooks/use-is-scroll";

export default function AppHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrolled = useIsScroll();

  return (
    <header
      className={`
        ${pathname === "/" ? "fixed" : "sticky"} 
        top-0 
        w-full 
        z-50 
        transition 
        duration-200 
        ${scrolled || pathname !== "/" ? "bg-border shadow-[0_4px_30px_rgba(61,46,0,0.18)]" : ""}
      `}
    >
      {children}
    </header>
  );
}
