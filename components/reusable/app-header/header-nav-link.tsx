"use client";

import { Link, usePathname } from "@/i18n/navigation";

import { useState, useEffect } from "react";

export default function HeaderNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setIsScrolled] = useState(false);
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link
      className={`transition-colors duration-200 ease-in-out text-sm ${isActive ? "text-primary" : ""} ${scrolled || pathname !== "/" ? "text-foreground" : "text-white"}`}
      href={href}
    >
      {children}
    </Link>
  );
}
