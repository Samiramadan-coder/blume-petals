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
    <Link href={href}>
      <Button
        variant="default"
        className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
      >
        {label}
        <ArrowRight />
      </Button>
    </Link>
  );
}
