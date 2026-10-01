import { Link } from "@/i18n/navigation";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

export default function MainButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Button
      asChild
      variant="default"
      className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
    >
      <Link href={href}>
        {label}
        <ArrowRight className="rtl:rotate-180" />
      </Link>
    </Button>
  );
}
