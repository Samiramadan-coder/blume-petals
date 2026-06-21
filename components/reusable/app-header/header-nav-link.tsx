"use client";

import { useIsScroll } from "@/hooks/use-is-scroll";
import { Link, usePathname } from "@/i18n/navigation";

export default function HeaderNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrolled = useIsScroll();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      className={`
        transition-colors 
        duration-200 
        ease-in-out 
        text-sm 
        ${isActive ? "text-primary" : ""} 
        ${scrolled || pathname !== "/" ? "text-foreground" : "text-white"}
      `}
      href={href}
    >
      {children}
    </Link>
  );
}
