"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function FooterNavLink({
  href,
  children,
  icon,
  target,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  target?: string;
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
        min-w-0
        flex
        items-center 
        gap-3
        text-white/70
        hover:text-white
        ${isActive ? "text-white" : ""} 
      `}
      href={href}
      target={target}
      prefetch={false}
    >
      {icon}
      {children}
    </Link>
  );
}
