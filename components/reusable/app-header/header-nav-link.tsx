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
        relative

        after:absolute
        after:inset-s-0
        after:-bottom-1
        after:h-[0.2px]
        after:w-full
        after:origin-left
        after:scale-x-0
        after:bg-primary
        after:transition-transform
        after:duration-300

        hover:after:scale-x-100

        ${isActive ? "text-primary" : ""} 
        ${scrolled || pathname !== "/" ? "text-foreground" : "text-white/92"}
      `}
      href={href}
    >
      {children}
    </Link>
  );
}
