"use client";

import { useEffect, useState } from "react";

export default function AppHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
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
      className={`fixed top-0 w-full z-50 transition duration-200 ${scrolled ? "bg-primary/60" : ""}`}
    >
      {children}
    </header>
  );
}
