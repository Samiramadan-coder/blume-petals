"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function FooterNavLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      className={`
        transition-colors 
        duration-200 
        ease-in-out 
        text-sm 
        flex
        items-center 
        gap-3
        text-white/70
        hover:text-white
        ${isActive ? "white" : ""} 
      `}
      href={href}
    >
      {icon}
      {children}
    </Link>
  );
}
