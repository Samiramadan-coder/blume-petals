"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      className={`transition-colors duration-200 ease-in-out text-sm ${isActive ? "text-primary" : ""} hover:text-primary`}
      href={href}
    >
      {label}
    </Link>
  );
}
