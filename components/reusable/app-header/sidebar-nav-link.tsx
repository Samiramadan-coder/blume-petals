import { Link, usePathname } from "@/i18n/navigation";

export default function SidebarNavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-foreground text-base ${pathname.startsWith(href) ? "font-semibold text-primary" : ""}`}
    >
      {label}
    </Link>
  );
}
