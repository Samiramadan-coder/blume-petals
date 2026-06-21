"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function HeaderNavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      className={`transition-colors duration-200 ease-in-out text-sm ${isActive ? "text-primary" : ""} text-foreground/60 hover:text-primary ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
