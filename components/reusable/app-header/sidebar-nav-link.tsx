import { Link, usePathname } from "@/i18n/navigation";

export default function SidebarNavLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-foreground text-base ${isActive ? "font-semibold text-primary" : ""}`}
    >
      {label}
    </Link>
  );
}
