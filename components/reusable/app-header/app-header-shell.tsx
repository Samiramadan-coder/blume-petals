"use client";

import { useEffect, useState } from "react";

import { usePathname } from "@/i18n/navigation";

export default function AppHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition duration-200 ${scrolled || pathname !== "/" ? "bg-border shadow-[0_4px_30px_rgba(61,46,0,0.18)]" : ""}`}
    >
      {children}
    </header>
  );
}
